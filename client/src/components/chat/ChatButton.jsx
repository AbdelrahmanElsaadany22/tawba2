const ChatButton = ({ isOpen, onClick, unread }) => (
  <>
    {/* Glow ring behind button */}
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
        isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
      }`}
    >
      <div className="w-20 h-20 -ml-3 -mt-3 rounded-full bg-purple/20 animate-ping-slow pointer-events-none" />
    </div>

    {/* Main button */}
    <button
      type="button"
      onClick={onClick}
      className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-xl flex items-center justify-center
                 shadow-2xl transition-all duration-300 cursor-pointer outline-none border-0
                 ${
                   isOpen
                     ? 'bg-red-500 hover:bg-red-600 scale-90 rotate-90 shadow-red-500/30'
                     : 'bg-gradient-to-br from-purple to-purple-light hover:from-purple-light hover:to-purple shadow-purple/30 hover:shadow-purple/50 hover:shadow-xl hover:scale-105 active:scale-95'
                 }`}
      aria-label={isOpen ? 'Close chat' : 'Open chat'}
    >
      {isOpen ? (
        <svg className="w-6 h-6 text-white transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      ) : (
        <i className="fas fa-star-and-crescent text-white text-xl"></i>
      )}
    </button>

    {/* Unread badge */}
    {unread > 0 && !isOpen && (
      <span className="fixed bottom-[4.5rem] right-6 z-50 bg-red-500 text-white text-xs font-bold 
                       w-5 h-5 rounded-full flex items-center justify-center 
                       animate-bounce-in shadow-lg">
        {unread > 9 ? '9+' : unread}
      </span>
    )}
  </>
);

export default ChatButton;
