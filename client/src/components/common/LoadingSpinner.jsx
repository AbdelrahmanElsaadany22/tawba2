const LoadingSpinner = ({ text = 'جاري التحميل...' }) => (
  <div className="flex flex-col items-center justify-center py-16 gap-4">
    <div className="w-10 h-10 border-4 border-purple border-t-transparent rounded-full animate-spin" />
    <p className="text-gold font-arabic">{text}</p>
  </div>
);

export default LoadingSpinner;
