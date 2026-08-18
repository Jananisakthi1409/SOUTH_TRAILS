import { Link, useRouteError } from "react-router-dom";
import { motion } from "framer-motion";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl"
      >
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-red-500/20 text-5xl">
          ⚠
        </div>
        <h1 className="mb-4 font-display text-4xl text-white">Oops! Something broke.</h1>
        <p className="mb-8 text-[#ffffff]/70">
          Sorry, an unexpected error has occurred while trying to load this page.
        </p>
        
        {error && (
          <div className="mb-8 rounded-lg bg-black/40 p-4 text-left text-sm text-red-400 font-mono overflow-auto max-w-full">
            <p>
              <i>{error.statusText || error.message}</i>
            </p>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex h-12 items-center justify-center rounded-md bg-[#0b6b43] px-8 text-sm font-bold text-[#022c22] transition hover:bg-white"
          >
            Try Again
          </button>
          <Link
            to="/"
            className="inline-flex h-12 items-center justify-center rounded-md border border-white/20 bg-white/5 px-8 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/10"
          >
            Go to Homepage
          </Link>
        </div>
      </motion.div>
    </main>
  );
};

export default ErrorPage;
