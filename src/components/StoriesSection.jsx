import { motion } from "framer-motion";
import StoryPreview from "./StoryPreview";
// image sets for each story card
import peace1 from "../pages/state/kerala/backwater/pexels-optically-challenged-21717677.webp";
import peace2 from "../pages/state/kerala/munnar/pexels-harsh-14730465.webp";
import peace3 from "../pages/state/kerala/wayanad/pexels-george-thomas-2159810613-36982207.webp";
import adv1 from "../pages/state/karnataka/coorg/j.webp";
import adv2 from "../pages/state/karnataka/hampi/image.webp";
import adv3 from "../pages/state/andhra/araku/h.webp";
import food1 from "../pages/state/kerala/kochi/pexels-jeyzen-24200331.webp";
import road1 from "../pages/state/andhra/rkbeach/image.webp";
import road2 from "../pages/state/tamilnadu/puducherry/pexels-gautham-reghu-1029880-30238510.webp";
import romantic1 from "../pages/state/tamilnadu/ooty/pexels-alexander-savchuk-108847177-9659261.webp";
import hidden1 from "../pages/state/karnataka/gokarna/image.webp";

const imageSets = [
  [adv1, adv2, adv3],
  [peace1, peace2, peace3],
  [road1, road2],
  [romantic1, hidden1, food1],
];

const stories = [
  {
    title: "The Lantern Trail",
    location: "Kochi",
    duration: "4 Days",
    preview: "Market alleys, spice stalls and tucked-away cafes.",
    imageSetIndex: 0, // adventure set
  },
  {
    title: "Monsoon Coastline",
    location: "Varkala",
    duration: "3 Days",
    preview: "Cliffside beaches, monsoon skies and slow seaside walks.",
    imageSetIndex: 1, // peaceful/mood set
  },
  {
    title: "Sunrise Tea Route",
    location: "Meghamalai",
    duration: "2 Days",
    preview: "Misty tea gardens, early walks and soft golden light.",
    imageSetIndex: 2, // road / landscapes
  },
  {
    title: "Temple Echoes",
    location: "Tirupati",
    duration: "5 Days",
    preview: "Sacred corridors, local rituals and quieter discoveries.",
    imageSetIndex: 3, // romantic/hidden/food mix
  },
];

const StoriesSection = () => {
  return (
    <section className="section stories-section">
      <div className="section-heading">
        <p className="eyebrow">Journey Stories</p>
        <h2>Your next South India chapter</h2>
      </div>
      <div className="stories-grid">
        {stories.map((story) => (
          <motion.article
            key={story.title}
            className="story-card"
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <StoryPreview className="story-card-media" images={imageSets[story.imageSetIndex % imageSets.length]} />
            <div className="story-card-body">
              <div className="story-card-meta">
                <span>{story.location}</span>
                <span>{story.duration}</span>
              </div>
              <h3>{story.title}</h3>
              <p>{story.preview}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default StoriesSection;
