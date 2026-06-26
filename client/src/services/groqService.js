const GROQ_BASE_URL = 'https://api.groq.com/openai/v1';

const getApiKey = () => {
  const key = import.meta.env.VITE_GROQ_API_KEY;
  if (!key) {
    throw new Error('Groq API key not configured. Set VITE_GROQ_API_KEY in .env');
  }
  return key;
};

const buildSystemPrompt = () => ({
  role: 'system',
  content:
    'You are a helpful AI coding assistant integrated into Tawba Academy. ' +
    'You help users with programming questions, explain technical concepts, ' +
    'generate quizzes and interview questions, debug code, and provide examples ' +
    'and best practices. Be concise, clear, and thorough. Format your responses ' +
    'using Markdown with proper code blocks, headers, and lists.',
});

export const sendMessage = async (messages, onChunk) => {
  const apiKey = getApiKey();
  const model = import.meta.env.VITE_GROQ_MODEL || 'mixtral-8x7b-32768';

  const body = {
    model,
    messages: [buildSystemPrompt(), ...messages],
    temperature: 0.7,
    max_tokens: 4096,
    stream: Boolean(onChunk),
  };

  const response = await fetch(`${GROQ_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errBody = await response.json().catch(() => ({}));
    throw new Error(
      errBody.error?.message || `API error ${response.status}`
    );
  }

  if (onChunk) {
    const ct = response.headers.get('content-type') || '';
    if (ct.includes('text/event-stream') && response.body) {
      return handleStream(response.body, onChunk);
    }
    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';
    if (content) onChunk(content);
    return content;
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
};

const handleStream = async (body, onChunk) => {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let fullContent = '';
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      const t = line.trim();
      if (!t.startsWith('data: ')) continue;
      const payload = t.slice(6).trim();
      if (payload === '[DONE]') continue;
      try {
        const parsed = JSON.parse(payload);
        const delta = parsed.choices?.[0]?.delta?.content || '';
        if (delta) {
          fullContent += delta;
          onChunk(fullContent);
        }
      } catch {
        // skip malformed chunks
      }
    }
  }

  return fullContent;
};
