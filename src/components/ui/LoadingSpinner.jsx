import { motion } from "framer-motion";

export const LoadingSpinner = ({ size = "md", fullScreen = false }) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className={`relative ${sizeClasses[size]}`}>
        {/* Outer rotating ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-[#07110f] border-t-[#f0c94a]"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        />
        {/* Inner pulsing circle */}
        <motion.div
          className="absolute inset-2 rounded-full bg-[#f0c94a]/20 blur-sm"
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Inner core */}
        <div className="absolute inset-3 rounded-full bg-[#f0c94a]" />
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#07110f]/80 backdrop-blur-sm">
        {spinner}
      </div>
    );
  }

  return <div className="flex w-full items-center justify-center p-8">{spinner}</div>;
};

export default LoadingSpinner;
