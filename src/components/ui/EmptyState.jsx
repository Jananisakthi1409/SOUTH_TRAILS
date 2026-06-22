import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const EmptyState = ({
  icon = "✧",
  title = "Nothing to see here",
  description = "We couldn't find what you're looking for.",
  actionText,
  actionLink,
  onAction,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center p-12 text-center rounded-2xl glass border border-white/5 ${className}`}
    >
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#12302d] text-4xl text-[#f0c94a]">
        {icon}
      </div>
      <h3 className="mb-2 font-display text-2xl text-white">{title}</h3>
      <p className="mb-8 max-w-md text-[#f5efe6]/70">{description}</p>

      {actionText && actionLink && (
        <Link
          to={actionLink}
          className="inline-flex h-12 items-center justify-center rounded-md bg-[#2f7dd3] px-8 text-sm font-bold text-white transition hover:bg-[#3d8ee9] hover:shadow-cta"
        >
          {actionText}
        </Link>
      )}

      {actionText && onAction && !actionLink && (
        <button
          onClick={onAction}
          className="inline-flex h-12 items-center justify-center rounded-md bg-[#2f7dd3] px-8 text-sm font-bold text-white transition hover:bg-[#3d8ee9] hover:shadow-cta"
        >
          {actionText}
        </button>
      )}
    </motion.div>
  );
};

export default EmptyState;
