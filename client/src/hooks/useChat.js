import { useState, useCallback, useEffect, useRef } from 'react';
import { sendMessage } from '../services/groqService';

const STORAGE_KEY = 'tawba-chat-history';

const loadHistory = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const useChat = () => {
  const [messages, setMessages] = useState(loadHistory);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [streamingContent, setStreamingContent] = useState('');
  const loadingRef = useRef(false);
  const messagesRef = useRef(messages);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // localStorage full or unavailable
    }
  }, [messages]);

  const sendUserMessage = useCallback(async (content) => {
    if (loadingRef.current) return;

    const userMessage = {
      role: 'user',
      content,
      id: (typeof window !== 'undefined' && window.crypto?.randomUUID) ? window.crypto.randomUUID() : Date.now().toString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setError(null);
    setIsLoading(true);
    loadingRef.current = true;

    try {
      const history = [...messagesRef.current, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await sendMessage(history, (partial) => {
        setStreamingContent(partial);
      });

      const assistantMessage = {
        role: 'assistant',
        content: response || '',
        id: (typeof window !== 'undefined' && window.crypto?.randomUUID) ? window.crypto.randomUUID() : (Date.now() + 1).toString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setStreamingContent('');
    } catch (err) {
      console.error('[Chat] API Error:', err);
      setError(err?.message || String(err) || 'An unknown error occurred');
      setStreamingContent('');
    } finally {
      setIsLoading(false);
      loadingRef.current = false;
    }
  }, []);

  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
    setStreamingContent('');
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const retry = useCallback(() => {
    const msgs = messagesRef.current;
    const lastUserMsg = [...msgs].reverse().find((m) => m.role === 'user');

    if (lastUserMsg && !loadingRef.current) {
      setMessages((prev) => {
        const withoutLastAssistant = prev
          .slice(0, -1)
          .filter((m) => m.id !== lastUserMsg.id);
        return withoutLastAssistant;
      });
      setError(null);
      sendUserMessage(lastUserMsg.content);
    }
  }, [sendUserMessage]);

  return {
    messages,
    isLoading,
    error,
    streamingContent,
    sendMessage: sendUserMessage,
    clearChat,
    retry,
  };
};
