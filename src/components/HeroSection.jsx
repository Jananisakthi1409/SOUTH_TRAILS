import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroVideo from "../assets/videos/10211301-hd_2560_1440_30fps.mp4";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const videoVariants = {
  hidden: { scale: 1.05 },
  visible: {
    scale: 1,
    transition: {
      duration: 3,
      ease: "easeOut",
    },
  },
};

const scrollIndicatorVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delay: 1.2,
    },
  },
  animate: {
    y: [0, 8, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const HeroSection = () => {
  return (
    <section className="hero-section">
      <motion.video
        className="hero-video"
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
        variants={videoVariants}
        initial="hidden"
        animate="visible"
      />
      <div className="hero-overlay" />

      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="eyebrow" variants={itemVariants}>
          South India Explorer AI
        </motion.p>

        <motion.h1 variants={itemVariants}>
          Where Will Your Next <span className="text-accent">Story</span> Begin?
        </motion.h1>

        <motion.p className="hero-copy" variants={itemVariants}>
          Discover hidden destinations, road trips, food trails and unforgettable experiences across South India.
        </motion.p>

        <motion.div className="hero-actions" variants={containerVariants}>
          <Link to="/explore" className="button button-primary">
            🌿 Explore by Mood
          </Link>
          <Link to="/explore" className="button button-secondary">
            🗺 Explore South India
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        className="scroll-indicator"
        variants={scrollIndicatorVariants}
        initial="hidden"
        animate={["visible", "animate"]}
      >
        <div className="scroll-line" />
        <span>Scroll to Explore</span>
      </motion.div>
    </section>
  );
};

export default HeroSection;
