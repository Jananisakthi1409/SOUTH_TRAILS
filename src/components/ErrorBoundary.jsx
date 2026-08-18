import { Component } from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-screen bg-[#064e3b] font-sans text-white flex items-center justify-center px-5">
          <div className="max-w-xl text-center">
            <div className="mx-auto mb-8 grid h-24 w-24 place-items-center rounded-full bg-red-500/20 text-5xl">
              ⚠
            </div>
            <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.9]">
              Something went wrong.
            </h1>
            <p className="mt-6 text-base leading-8 text-white/70">
              An unexpected error occurred. Please try again or return to the home page.
              If this keeps happening, contact our support team.
            </p>
            {this.state.error && (
              <p className="mt-4 rounded-md border border-white/10 bg-white/5 p-4 font-mono text-xs text-white/50 text-left break-all">
                {this.state.error.message}
              </p>
            )}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={this.handleRetry}
                className="inline-flex min-h-14 items-center gap-3 rounded-md bg-[#0b6b43] px-8 text-lg font-black text-[#022c22] shadow-luxury transition hover:-translate-y-1"
              >
                Try Again
              </button>
              <Link
                to="/"
                className="inline-flex min-h-14 items-center rounded-md border border-white/20 bg-white/10 px-8 text-sm font-black uppercase tracking-[0.18em] text-white backdrop-blur-xl transition hover:bg-white hover:text-[#10201e]"
              >
                Go Home
              </Link>
            </div>
            <p className="mt-8 text-sm text-white/40">
              Need help?{" "}
              <Link to="/contact" className="text-[#0b6b43] underline underline-offset-4 hover:text-white transition">
                Contact support
              </Link>
            </p>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
