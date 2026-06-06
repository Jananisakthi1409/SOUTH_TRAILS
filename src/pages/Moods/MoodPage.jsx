import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const moodContent = {
  peace: {
    hero: "Find Your Peace",
    spots: ["Meghamalai", "Valparai", "Munnar", "Gavi", "Vagamon"],
  },
  adventure: {
    hero: "Find Your Adventure",
    spots: ["Kolli Hills", "Coorg", "Kodaikanal", "Yelagiri", "Araku"],
  },
  "hidden-gems": {
    hero: "Discover Hidden Gems",
    spots: ["Kondaveedu", "Golconda", "Chettinad", "Varkala", "Wayanad"],
  },
  "food-trails": {
    hero: "Taste the Trails",
    spots: ["Madurai", "Coimbatore", "Trivandrum", "Vizag", "Ooty"],
  },
  "road-trips": {
    hero: "Hit the Open Road",
    spots: ["Kanyakumari", "Munnar", "Yercaud", "Gokarna", "Pondicherry"],
  },
  "romantic-escapes": {
    hero: "Find Your Romance",
    spots: ["Alleppey", "Varkala", "Ooty", "Munnar", "Yelagiri"],
  },
};

const MoodPage = () => {
  const { mood } = useParams();
  const data = moodContent[mood] || {
    hero: "Find Your Mood",
    spots: ["Meghamalai", "Munnar", "Vagamon", "Kolli Hills", "Yercaud"],
  };

  return (
    <main className="app-shell explore-page">
      <section className="section explore-header">
        <div className="section-heading">
          <p className="eyebrow">Mood Page</p>
          <h2>{data.hero}</h2>
          <p className="section-copy">Curated trips grouped by experience, not by state.</p>
        </div>
      </section>

      <section className="section explore-mood-section">
        <div className="destination-grid">
          {data.spots.map((spot) => (
            <motion.article key={spot} className="destination-card" whileHover={{ y: -6 }} transition={{ duration: 0.3 }}>
              <h3>{spot}</h3>
              <p>Experience a quiet, immersive stay in {spot}.</p>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default MoodPage;
