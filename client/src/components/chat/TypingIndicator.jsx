const TypingIndicator = () => (
  <div className="flex items-end gap-2 mb-4 animate-fade-in" dir="ltr">
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple to-purple-light flex items-center justify-center flex-shrink-0">
      <i className="fas fa-star-and-crescent text-white text-xs"></i>
    </div>
    <div className="bg-[#2a2a4e] rounded-2xl rounded-bl-sm px-5 py-3.5 shadow-sm border border-purple/10">
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 bg-purple-light rounded-full animate-bounce-dot" style={{ animationDelay: '0ms' }} />
        <span className="w-2 h-2 bg-purple-light rounded-full animate-bounce-dot" style={{ animationDelay: '150ms' }} />
        <span className="w-2 h-2 bg-purple-light rounded-full animate-bounce-dot" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  </div>
);

export default TypingIndicator;
