export const SkeletonLoader = ({ type = "text", count = 1, className = "" }) => {
  const baseClass = "animate-pulse bg-[#0f766e] rounded-md";

  const renderSkeleton = () => {
    switch (type) {
      case "card":
        return (
          <div className={`flex flex-col gap-4 p-4 border border-white/10 rounded-xl glass ${className}`}>
            <div className={`${baseClass} h-48 w-full rounded-lg`}></div>
            <div className={`${baseClass} h-6 w-3/4 mt-2`}></div>
            <div className={`${baseClass} h-4 w-1/2`}></div>
            <div className={`${baseClass} h-10 w-full mt-4`}></div>
          </div>
        );
      case "avatar":
        return <div className={`${baseClass} h-12 w-12 rounded-full ${className}`}></div>;
      case "image":
        return <div className={`${baseClass} h-64 w-full rounded-xl ${className}`}></div>;
      case "text":
      default:
        return (
          <div className={`flex flex-col gap-3 ${className}`}>
            <div className={`${baseClass} h-4 w-full`}></div>
            <div className={`${baseClass} h-4 w-5/6`}></div>
            <div className={`${baseClass} h-4 w-4/6`}></div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>{renderSkeleton()}</div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
