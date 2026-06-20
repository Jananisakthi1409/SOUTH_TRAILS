import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import peaceImg from "../pages/state/kerala/backwater/pexels-optically-challenged-21717677.webp";
import adventureImg from "../pages/state/karnataka/coorg/j.webp";
import foodImg from "../pages/state/kerala/kochi/pexels-jeyzen-24200331.webp";
import romanticImg from "../pages/state/tamilnadu/ooty/pexels-alexander-savchuk-108847177-9659261.webp";
import roadImg from "../pages/state/andhra/rkbeach/image.webp";

const DEFAULT_DURATION = 3000; // 3 seconds

const StoryPreview = ({ className, images: propImages }) => {
  const images = propImages && propImages.length ? propImages : [peaceImg, adventureImg, foodImg, romanticImg, roadImg];
  const total = images.length;
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const isHoverRef = useRef(false);

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (isHoverRef.current) return;

      setProgress((currentProgress) => {
        const nextProgress = currentProgress + 50 / DEFAULT_DURATION;
        if (nextProgress < 1) return nextProgress;

        setIndex((currentIndex) => (currentIndex + 1) % total);
        return 0;
      });
    }, 50);

    return () => {
      window.clearInterval(interval);
    };
  }, [total]);

  const handleMouseEnter = () => {
    isHoverRef.current = true;
  };

  const handleMouseLeave = () => {
    isHoverRef.current = false;
  };

  const safeIndex = index % total;

  return (
    <article
      className={`story-preview-card ${className || ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="story-media">
        <AnimatePresence initial={false} mode="wait">
          <motion.img
            key={images[safeIndex]}
            src={images[safeIndex]}
            alt="story"
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        </AnimatePresence>
      </div>

      <div className="story-footer">
        <div className="story-progress-wrap">
          <div className="story-progress-bar">
            <motion.div
              className="story-progress-fill"
              style={{ width: `${progress * 100}%` }}
              transition={{ ease: "linear" }}
            />
          </div>

          <div className="story-dots">
            {Array.from({ length: total }).map((_, i) => {
              const isDone = i < safeIndex;
              const isCurrent = i === safeIndex;
              return (
                <motion.span
                  key={i}
                  className={`story-dot ${isDone ? "done" : "future"} ${isCurrent ? "current" : ""}`}
                  animate={isCurrent ? { scale: 1.08 } : { scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </article>
  );
};

export default StoryPreview;
