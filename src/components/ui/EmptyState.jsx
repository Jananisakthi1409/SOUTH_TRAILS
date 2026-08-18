import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const EmptyState = ({
  icon = "ST",
  title = "Nothing to see here",
  description = "We could not find what you are looking for.",
  actionText,
  actionLink,
  onAction,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className={`empty-state flex flex-col items-center justify-center rounded-lg border border-[#e5e7eb] bg-white p-10 text-center shadow-sm ${className}`}
    >
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-md bg-[#f0fdf4] text-sm font-black text-[#15803d]">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-bold text-[#1f2937]">{title}</h3>
      <p className="mb-7 max-w-md text-sm leading-6 text-[#6b7280]">{description}</p>

      {actionText && actionLink && (
        <Link
          to={actionLink}
          className="inline-flex h-11 items-center justify-center rounded-md bg-[#15803d] px-6 text-sm font-bold text-white transition hover:bg-[#166534]"
        >
          {actionText}
        </Link>
      )}

      {actionText && onAction && !actionLink && (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex h-11 items-center justify-center rounded-md bg-[#15803d] px-6 text-sm font-bold text-white transition hover:bg-[#166534]"
        >
          {actionText}
        </button>
      )}
    </motion.div>
  );
};

export default EmptyState;
