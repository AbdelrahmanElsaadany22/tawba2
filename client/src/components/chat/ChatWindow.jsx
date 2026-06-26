import { useState, useRef, useEffect, useCallback } from 'react';
import { useChat } from '../../hooks/useChat';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

const ChatWindow = ({ isOpen, onClose }) => {
  const {
    messages,
    isLoading,
    error,
    streamingContent,
    sendMessage,
    clearChat,
    retry,
  } = useChat();

  const [input, setInput] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingContent, scrollToBottom]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      const trimmed = input.trim();
      if (!trimmed || isLoading) return;
      setInput('');
      sendMessage(trimmed);
    }
  };

  const handleClear = () => {
    clearChat();
    setShowClearConfirm(false);
  };

  const hasMessages = messages.length > 0;
  const hasError = error && !streamingContent;
  const showStreaming = streamingContent && isLoading;

  return (
    <div
      className={`fixed bottom-24 right-6 z-40 w-[calc(100vw-2rem)] sm:w-[400px] 
                 transition-all duration-300 ease-out origin-bottom-right
                 ${
                   isOpen
                     ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                     : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
                 }`}
      dir="ltr"
    >
      {/* Chat panel */}
      <div
        className="bg-dark/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple/20 
                   flex flex-col overflow-hidden"
        style={{
          maxHeight: 'min(600px, calc(100vh - 10rem))',
          height: '60vh',
          minHeight: '400px',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-purple/10 bg-dark-light/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple to-purple-light flex items-center justify-center shadow-sm">
              <i className="fas fa-mosque text-white text-sm"></i>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">AI Assistant</h2>
              <p className="text-[10px] text-gray-400">Tawba Academy</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {hasMessages && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowClearConfirm(!showClearConfirm)}
                  className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 
                             transition-all duration-200"
                  title="Clear conversation"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>

                {showClearConfirm && (
                  <div className="absolute top-full left-0 mt-1 bg-dark-light border border-purple/20 
                                  rounded-xl p-3 shadow-xl z-10 min-w-[180px]">
                    <p className="text-xs text-gray-300 mb-2">Clear all messages?</p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleClear}
                        className="flex-1 text-xs bg-red-500/20 text-red-400 hover:bg-red-500/30 
                                   px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Clear
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowClearConfirm(false)}
                        className="flex-1 text-xs bg-purple/20 text-purple-light hover:bg-purple/30 
                                   px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 
                         transition-all duration-200"
              title="Close"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto px-4 py-3 scroll-smooth scrollbar-thin"
        >
          {!hasMessages && !showStreaming ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple/20 to-purple/5 
                              border border-purple/10 flex items-center justify-center mb-4">
                <i className="fas fa-mosque text-purple-light text-2xl"></i>
              </div>
              <h3 className="text-white font-semibold text-sm mb-1">
                How can I help you?
              </h3>
              <p className="text-gray-400 text-xs max-w-[240px]">
                Ask me anything about programming, tech concepts, debugging, or interview prep.
              </p>
            </div>
          ) : (
            <>
              {messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  isStreaming={false}
                />
              ))}

              {showStreaming && (
                <MessageBubble
                  message={{ role: 'assistant', content: streamingContent }}
                  isStreaming={true}
                />
              )}

              {isLoading && !showStreaming && <TypingIndicator />}

              {hasError && (
                <div className="flex flex-col items-center gap-2 py-3 animate-fade-in">
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-center">
                    <p className="text-red-400 text-xs mb-1">{error}</p>
                    <button
                      type="button"
                      onClick={retry}
                      className="text-xs text-gold hover:text-gold-light underline transition-colors"
                    >
                      Try again
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-purple/10 px-4 py-3 flex items-end gap-2">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              rows={1}
              disabled={isLoading}
              className="w-full bg-[#2a2a4e] text-white placeholder-gray-500 text-sm 
                         rounded-xl px-4 py-2.5 resize-none outline-none
                         border border-purple/10 focus:border-purple/40 focus:ring-1 focus:ring-purple/20
                         transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                         scrollbar-thin"
              style={{ maxHeight: '120px' }}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
              }}
            />
          </div>

          <button
            type="button"
            onClick={() => {
              const trimmed = input.trim();
              if (!trimmed || isLoading) return;
              setInput('');
              sendMessage(trimmed);
            }}
            disabled={!input.trim() || isLoading}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple to-purple-light 
                       text-white flex items-center justify-center flex-shrink-0
                       hover:from-purple-light hover:to-purple 
                       disabled:opacity-30 disabled:cursor-not-allowed
                       transition-all duration-200 active:scale-95 shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
