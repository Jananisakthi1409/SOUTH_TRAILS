import { motion } from "framer-motion";
import keralaVideo from "../assets/videos/kerala.mp4";
import tamilVideo from "../assets/videos/tamilnadu.mp4";
import karnatakaVideo from "../assets/videos/karnataka.mp4";
import apVideo from "../assets/videos/andra.mp4";

const escapes = [
  {
    title: "Kerala",
    highlight: "Backwaters & Hills",
    duration: "3-5 Days",
    video: keralaVideo,
    description: "Houseboats, spice markets and misty hill stations.",
  },
  {
    title: "Tamil Nadu",
    highlight: "Temples & Coast",
    duration: "3-4 Days",
    video: tamilVideo,
    description: "Historic temples, coastal cliffs and vibrant culture.",
  },
  {
    title: "Karnataka",
    highlight: "Coffee & Forests",
    duration: "2-4 Days",
    video: karnatakaVideo,
    description: "Coffee plantations, waterfalls and forest treks.",
  },
  {
    title: "Andhra Pradesh",
    highlight: "Coastline Drives",
    duration: "3-5 Days",
    video: apVideo,
    description: "Scenic coastal roads, temples and regional cuisine.",
  },
];

const FeaturedEscapes = ({ eyebrow = "State Escapes", heading = "Four South India stories" }) => {
  return (
    <section className="section featured-escapes">
      <div className="section-heading">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{heading}</h2>
      </div>
      <div className="escape-row">
        {escapes.map((escape) => (
          <motion.article
            key={escape.title}
            className="escape-card"
            whileHover={{ y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <div className="escape-artboard">
              <video
                src={escape.video}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                onTimeUpdate={(event) => {
                  const currentTime = event.currentTarget.currentTime;
                  if (currentTime >= 5) {
                    event.currentTarget.currentTime = 0;
                  }
                }}
              />
              <div className="escape-state-label">{escape.title}</div>
            </div>
            <div className="escape-card-body">
              <div className="escape-card-meta">
                <span>{escape.highlight}</span>
                <span>{escape.duration}</span>
              </div>
              <h3>{escape.title}</h3>
              <div className="escape-tag">State Guide</div>
              <p>{escape.description}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default FeaturedEscapes;
