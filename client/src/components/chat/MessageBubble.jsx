import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const isUser = (role) => role === 'user';

const CodeBlock = ({ language, code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="my-3 rounded-xl overflow-hidden border border-purple/10 group" dir="ltr">
      <div className="flex items-center justify-between px-4 py-2 bg-[#1a1a2e] border-b border-purple/10">
        <span className="text-xs text-gray-400 font-mono uppercase tracking-wider">
          {language || 'code'}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gold 
                     transition-colors duration-200 py-1 px-2 rounded-lg hover:bg-white/5"
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language={language || 'text'}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          fontSize: '0.8125rem',
          padding: '1rem',
        }}
        showLineNumbers={code.split('\n').length > 3}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

const MarkdownContent = ({ content }) => {
  const safeContent = typeof content === 'string' ? content : '';
  const components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      const code = String(children).replace(/\n$/, '');

      if (!inline && match) {
        return <CodeBlock language={match[1]} code={code} />;
      }

      if (!inline && !match) {
        return <CodeBlock language={null} code={code} />;
      }

      return (
        <code
          className="bg-[#1a1a2e] text-gold px-1.5 py-0.5 rounded text-sm font-mono"
          {...props}
        >
          {children}
        </code>
      );
    },
    pre({ children }) {
      return children;
    },
    p({ children }) {
      return <p className="leading-relaxed mb-2 last:mb-0">{children}</p>;
    },
    ul({ children }) {
      return <ul className="list-disc list-inside space-y-1 mb-2">{children}</ul>;
    },
    ol({ children }) {
      return <ol className="list-decimal list-inside space-y-1 mb-2">{children}</ol>;
    },
    h1({ children }) {
      return <h1 className="text-lg font-bold mb-2 text-gold">{children}</h1>;
    },
    h2({ children }) {
      return <h2 className="text-base font-bold mb-2 text-gold">{children}</h2>;
    },
    h3({ children }) {
      return <h3 className="text-sm font-bold mb-1 text-gold">{children}</h3>;
    },
    a({ href, children }) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer"
           className="text-purple-light hover:text-gold underline transition-colors">
          {children}
        </a>
      );
    },
    blockquote({ children }) {
      return (
        <blockquote className="border-l-2 border-gold pl-4 italic text-gray-400 my-2">
          {children}
        </blockquote>
      );
    },
    table({ children }) {
      return (
        <div className="overflow-x-auto my-2">
          <table className="min-w-full border-collapse border border-purple/20 text-sm">
            {children}
          </table>
        </div>
      );
    },
    th({ children }) {
      return <th className="border border-purple/20 px-3 py-2 bg-dark-light font-medium">{children}</th>;
    },
    td({ children }) {
      return <td className="border border-purple/20 px-3 py-2">{children}</td>;
    },
    hr() {
      return <hr className="border-purple/20 my-3" />;
    },
  };

  return (
    <div className="prose prose-invert max-w-none text-sm leading-relaxed">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={components}
      >
        {safeContent}
      </ReactMarkdown>
    </div>
  );
};

const MessageBubble = ({ message, isStreaming }) => {
  const user = isUser(message.role);

  return (
    <div
      className={`flex items-end gap-2.5 mb-4 animate-fade-in ${
        user ? 'flex-row-reverse' : ''
      }`}
      dir="ltr"
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm ${
          user
            ? 'bg-gradient-to-br from-gold to-gold-dark'
            : 'bg-gradient-to-br from-purple to-purple-light'
        }`}
      >
        {user ? (
          <i className="fas fa-user-graduate text-dark text-xs"></i>
        ) : (
          <i className="fas fa-star-and-crescent text-white text-xs"></i>
        )}
      </div>

      {/* Message content */}
      <div
        className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
          user
            ? 'bg-gradient-to-br from-purple to-purple-dark rounded-br-sm text-white'
            : 'bg-[#2a2a4e] rounded-bl-sm border border-purple/10 text-gray-200'
        }`}
      >
        {user ? (
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {message.content}
          </p>
        ) : (
          <div className="message-content">
            {isStreaming ? (
              <div className="text-sm leading-relaxed">
                <MarkdownContent content={message.content} />
                <span className="inline-block w-1.5 h-4 bg-gold ml-0.5 animate-pulse align-text-bottom" />
              </div>
            ) : (
              <MarkdownContent content={message.content} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
