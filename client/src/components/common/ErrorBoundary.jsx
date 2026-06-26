import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary] Caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-950/50 border border-red-500/30 rounded-2xl text-center max-w-md mx-auto my-10 font-arabic">
          <h2 className="text-xl font-bold text-red-400 mb-2">عذراً، حدث خطأ ما</h2>
          <p className="text-sm text-gray-300 mb-4">
            {this.state.error?.message || String(this.state.error)}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gold text-dark font-bold px-4 py-2 rounded-xl text-sm"
          >
            إعادة تحميل الصفحة
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
