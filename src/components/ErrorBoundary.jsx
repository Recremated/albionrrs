import React from "react";
import { Crown } from "lucide-react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo */}
            <div className="flex items-center justify-center mb-8">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-full mr-4">
                <Crown className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Albion Market Tracker
                </h1>
              </div>
            </div>

            <div className="bg-red-500/10 border-2 border-red-500/50 rounded-xl p-8 backdrop-blur-sm">
              <div className="bg-red-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-red-400 mb-4">
                Bir Hata Oluştu
              </h2>
              <p className="text-gray-300 mb-6 text-lg">
                Uygulama beklenmeyen bir hata ile karşılaştı. Lütfen sayfayı
                yenileyin.
              </p>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => window.location.reload()}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Sayfayı Yenile
                </button>
                <button
                  onClick={() =>
                    this.setState({ hasError: false, error: null })
                  }
                  className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Tekrar Dene
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
