import { motion } from "framer-motion";

export const ErrorState = ({
  title = "Something went wrong",
  message = "We could not load this content. Please try again.",
  onRetry,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center rounded-lg border border-[#bbf7d0] bg-[#f0fdf4] p-8 text-center ${className}`}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-white text-sm font-black text-[#15803d]">
        !
      </div>
      <h3 className="mb-2 text-xl font-bold text-[#1f2937]">{title}</h3>
      <p className="mb-6 max-w-sm text-sm leading-6 text-[#6b7280]">{message}</p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex h-10 items-center justify-center rounded-md bg-[#15803d] px-5 text-sm font-bold text-white transition hover:bg-[#166534]"
        >
          Try Again
        </button>
      )}
    </motion.div>
  );
};

export default ErrorState;
