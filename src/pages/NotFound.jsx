import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-2xl"
      >
        <div className="mb-8 flex justify-center">
          <span className="font-display text-[12rem] leading-none text-white/5 font-black">
            404
          </span>
        </div>
        <h1 className="mb-4 font-display text-5xl text-white md:text-6xl -mt-24 relative z-10">
          Lost in the <span className="text-[#f0c94a]">Wilderness</span>
        </h1>
        <p className="mb-10 text-lg text-[#f5efe6]/70 max-w-md mx-auto">
          The page you're looking for seems to have wandered off the trail. Let's get you back on the right path.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex h-14 items-center justify-center rounded-md bg-[#f0c94a] px-8 text-sm font-bold text-[#1a0a00] transition hover:bg-white"
          >
            Return to Homepage
          </Link>
          <Link
            to="/explore"
            className="inline-flex h-14 items-center justify-center rounded-md border border-white/20 bg-white/5 px-8 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/10"
          >
            Explore Destinations
          </Link>
        </div>
      </motion.div>
    </main>
  );
};

export default NotFound;
