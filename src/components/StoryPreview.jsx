import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import peaceImg from "../assets/images/peace/p1.jpg";
import adventureImg from "../assets/images/adventure/pexels-avneet-kaur-669191817-31928086.jpg";
import foodImg from "../assets/images/Food Trails/pexels-ryshy-s-2149956588-35539324.jpg";
import romanticImg from "../assets/images/romatinc_escapes/pexels-asadphoto-5785086.jpg";
import roadImg from "../assets/images/roadtrips/pexels-cottonbro-5329529.jpg";

const DEFAULT_DURATION = 3000; // 3 seconds

const StoryPreview = ({ className, images: propImages }) => {
  const images = propImages && propImages.length ? propImages : [peaceImg, adventureImg, foodImg, romanticImg, roadImg];
  const total = images.length;
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const intervalRef = useRef(null);
  const startTimeRef = useRef(performance.now());
  const pauseStartRef = useRef(null);
  const pausedTimeRef = useRef(0);
  const isHoverRef = useRef(false);

  useEffect(() => {
    setIndex(0);
    setProgress(0);
    pausedTimeRef.current = 0;
    startTimeRef.current = performance.now();
    isHoverRef.current = false;
    pauseStartRef.current = null;

    intervalRef.current = window.setInterval(() => {
      updateProgress();
    }, 50);

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propImages]);

  useEffect(() => {
    if (progress >= 1) {
      setIndex((i) => (i + 1) % total);
      startTimeRef.current = performance.now();
      pausedTimeRef.current = 0;
      setProgress(0);
    }
  }, [progress, total]);

  const updateProgress = () => {
    if (isHoverRef.current) return;

    const now = performance.now();
    const elapsed = now - startTimeRef.current - pausedTimeRef.current;
    const next = Math.min(Math.max(elapsed / DEFAULT_DURATION, 0), 1);
    setProgress(next);
  };

  const handleMouseEnter = () => {
    isHoverRef.current = true;
    if (!pauseStartRef.current) pauseStartRef.current = performance.now();
  };

  const handleMouseLeave = () => {
    if (pauseStartRef.current) {
      pausedTimeRef.current += performance.now() - pauseStartRef.current;
      pauseStartRef.current = null;
    }
    isHoverRef.current = false;
  };

  return (
    <article
      className={`story-preview-card ${className || ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="story-media">
        <AnimatePresence initial={false} mode="wait">
          <motion.img
            key={images[index]}
            src={images[index]}
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
              const isDone = i < index;
              const isCurrent = i === index;
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
