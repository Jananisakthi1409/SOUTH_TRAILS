import { motion } from "framer-motion";

export const ErrorState = ({
  title = "Something went wrong",
  message = "We couldn't load this content. Please try again.",
  onRetry,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center p-8 text-center rounded-xl bg-red-500/10 border border-red-500/20 ${className}`}
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20 text-3xl">
        ⚠
      </div>
      <h3 className="mb-2 font-display text-xl text-white">{title}</h3>
      <p className="mb-6 max-w-sm text-white/70">{message}</p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex h-10 items-center justify-center rounded-md bg-white/10 px-6 text-sm font-bold text-white transition hover:bg-white/20"
        >
          Try Again
        </button>
      )}
    </motion.div>
  );
};

export default ErrorState;
