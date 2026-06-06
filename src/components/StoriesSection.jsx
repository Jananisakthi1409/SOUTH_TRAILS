import { motion } from "framer-motion";
import StoryPreview from "./StoryPreview";
// image sets for each story card
import peace1 from "../assets/images/peace/p1.jpg";
import peace2 from "../assets/images/peace/p2.jpg";
import peace3 from "../assets/images/peace/p3.jpg";
import adv1 from "../assets/images/adventure/pexels-avneet-kaur-669191817-31928086.jpg";
import adv2 from "../assets/images/adventure/pexels-cottonbro-5803403.jpg";
import adv3 from "../assets/images/adventure/pexels-jaroslav-maler-917944782-19956640.jpg";
import food1 from "../assets/images/Food Trails/pexels-ryshy-s-2149956588-35539324.jpg";
import food2 from "../assets/images/Food Trails/pexels-ryshy-s-2149956588-35539329.jpg";
import food3 from "../assets/images/Food Trails/pexels-saveurssecretes-10050740.jpg";
import road1 from "../assets/images/roadtrips/pexels-cottonbro-5329529.jpg";
import road2 from "../assets/images/roadtrips/pexels-gocebey-10892819.jpg";
import romantic1 from "../assets/images/romatinc_escapes/pexels-asadphoto-5785086.jpg";
import hidden1 from "../assets/images/hidden/pexels-abel-vj-1747977700-28072038.jpg";

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
        {stories.map((story, idx) => (
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
