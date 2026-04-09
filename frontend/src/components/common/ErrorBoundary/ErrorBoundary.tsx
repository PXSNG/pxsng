import { Component, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, errorInfo: string, reset: () => void) => ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: string | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    this.setState({
      errorInfo: errorInfo.componentStack || 'No component stack available',
    });
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.state.errorInfo || '', this.resetError);
      }

      return (
        <div className="p-4 bg-red-900/20 border border-red-500 rounded-lg">
          <h2 className="text-xl font-bold text-red-400 mb-2">Something went wrong</h2>
          <p className="text-sm text-gray-300 mb-4">
            We have encountered an error. Please report this to the developer.
          </p>

          <details className="mb-4">
            <summary className="cursor-pointer text-sm font-semibold text-gray-200 hover:text-white">
              Error Details
            </summary>
            <div className="mt-2 p-2 bg-black/40 rounded text-xs font-mono">
              <div className="text-red-400 mb-2">
                <strong>Error:</strong> {this.state.error.message}
              </div>
              {this.state.error.stack && (
                <pre className="text-gray-400 whitespace-pre-wrap wrap-break-word">
                  {this.state.error.stack}
                </pre>
              )}
              {this.state.errorInfo && (
                <div className="mt-2">
                  <strong className="text-yellow-400">Component Stack:</strong>
                  <pre className="text-gray-400 whitespace-pre-wrap wrap-break-word">
                    {this.state.errorInfo}
                  </pre>
                </div>
              )}
            </div>
          </details>

          <div className="flex gap-2">
            <button
              onClick={this.resetError}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded font-medium"
            >
              Try Again
            </button>
            <button
              onClick={() => location.reload()}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-medium"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
