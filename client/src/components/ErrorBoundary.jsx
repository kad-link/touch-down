import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#08060D] text-[#F1F1EE] flex items-center justify-center p-6">
          <div className="luxury-card p-8 max-w-md w-full text-center space-y-4 border-violet-500/40">
            <div className="w-12 h-12 rounded-xl bg-violet-600/20 text-[#A78BFA] flex items-center justify-center mx-auto text-xl">
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>
            <h2 className="text-xl font-bold font-display text-white">Experience Interrupted</h2>
            <p className="text-xs text-slate-400">
              An unexpected condition occurred while loading this view.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="btn-primary text-xs py-2.5 px-6 cursor-pointer"
            >
              Reload Experience
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

