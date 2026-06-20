import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import { chatWithOracle } from "../../services/aiTourismService";
import { getReviews } from "../../services/reviewService";
import tamilnaduImg from "../../assets/images/tamilnadu.webp";
import keralaImg from "../../assets/images/kerala.webp";
import karnatakaImg from "../../assets/images/karnataka.webp";
import andhraImg from "../../assets/images/andhra.webp";
import munnarImg from "../state/kerala/munnar/pexels-harsh-14730465.webp";
import hampiImg from "../state/karnataka/hampi/image.webp";
import backwaterImg from "../state/kerala/backwater/pexels-optically-challenged-21717677.webp";
import kochiImg from "../state/kerala/kochi/pexels-jeyzen-24200331.webp";
import maduraiImg from "../state/tamilnadu/madurai/pexels-thilina-alagiyawanna-3266092-36609003.webp";
import coorgImg from "../state/karnataka/coorg/image.webp";
import ootyImg from "../state/tamilnadu/ooty/pexels-prasang-yadav-2151662075-37512272.webp";
import alleppeyImg from "../state/kerala/allapey/pexels-vishnudas-20074792.webp";
import templeImg from "../state/andhra/tirumala/image.webp";
import cuisineImg from "../state/tamilnadu/chettinad/pexels-logalongwithme-28668658.webp";

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.12 },
  },
};

const stateCards = [
  {
    name: "Tamil Nadu",
    label: "Temple towns, coastlines, Chettinad mansions",
    to: "/states/tamil-nadu",
    image: tamilnaduImg,
  },
  {
    name: "Kerala",
    label: "Backwaters, tea country, wellness retreats",
    to: "/states/kerala",
    image: keralaImg,
  },
  {
    name: "Karnataka",
    label: "Hampi ruins, coffee estates, royal palaces",
    to: "/states/karnataka",
    image: karnatakaImg,
  },
  {
    name: "Andhra Pradesh",
    label: "Sacred routes, valleys, coastal heritage",
    to: "/states/andhra-pradesh",
    image: andhraImg,
  },
];

const experiences = [
  {
    title: "Heritage Circuits",
    text: "Walk through temple corridors, palace courtyards, and living craft streets with local context.",
    image: hampiImg,
    to: "/packages",
  },
  {
    title: "Backwater Slow Travel",
    text: "Houseboats, village dining, canoe rides, and unhurried Kerala mornings.",
    image: backwaterImg,
    to: "/kerala-packages",
  },
  {
    title: "Mountain Retreats",
    text: "Tea gardens, coffee estates, mist trails, campfire evenings, and scenic drives.",
    image: munnarImg,
    to: "/trip-builder",
  },
];

const featuredDestinations = [
  { name: "Ooty", mood: "Blue hills and old-world mountain charm", image: ootyImg, to: "/tamil-nadu-packages" },
  { name: "Munnar", mood: "Tea country, mist, and slow mornings", image: munnarImg, to: "/kerala-packages" },
  { name: "Coorg", mood: "Coffee estates and forest air", image: coorgImg, to: "/karnataka-packages" },
  { name: "Alleppey", mood: "Backwaters, boats, and village kitchens", image: alleppeyImg, to: "/kerala-packages" },
  { name: "Madurai", mood: "Temple rituals and living heritage", image: maduraiImg, to: "/tamil-nadu-packages" },
  { name: "Hampi", mood: "Boulder landscapes and empire ruins", image: hampiImg, to: "/karnataka-packages" },
];

const experienceCategories = [
  { title: "Adventure", text: "Waterfalls, viewpoints, forest drives, and highland trails.", image: ootyImg, to: "/mood-quiz" },
  { title: "Nature", text: "Backwaters, tea estates, beaches, and quiet hill mornings.", image: munnarImg, to: "/packages" },
  { title: "Culture", text: "Palaces, dance, food streets, architecture, and local craft.", image: hampiImg, to: "/marketplace" },
  { title: "Spiritual", text: "Temple corridors, sacred towns, rituals, and pilgrim routes.", image: templeImg, to: "/packages" },
  { title: "Luxury", text: "Private stays, wellness blocks, boutique routes, and slow pacing.", image: backwaterImg, to: "/trip-builder" },
  { title: "Family", text: "Balanced routes with comfort, safety, easy transfers, and memories.", image: coorgImg, to: "/packages" },
];

const packages = [
  {
    name: "Kerala Backwater Escape",
    detail: "2 days | Houseboat | Wellness",
    price: "Rs. 12,999",
    image: backwaterImg,
    to: "/packages",
  },
  {
    name: "Hampi Heritage Trail",
    detail: "3 days | Architecture | Culture",
    price: "Rs. 9,499",
    image: hampiImg,
    to: "/packages",
  },
  {
    name: "Coorg Coffee Country",
    detail: "4 days | Estates | Nature",
    price: "Rs. 10,999",
    image: coorgImg,
    to: "/packages",
  },
];

const cultureStories = [
  {
    title: "Temple Heritage",
    text: "Sacred corridors, ancient rituals, sculpted gopurams, and routes that respect the rhythm of each town.",
    image: templeImg,
    to: "/packages",
  },
  {
    title: "Traditional Arts",
    text: "Dance, music, local crafts, and guide-led encounters that turn sightseeing into cultural memory.",
    image: maduraiImg,
    to: "/guides",
  },
  {
    title: "Festivals & Local Cuisine",
    text: "Seasonal celebrations, food trails, market walks, and Chettinad flavors woven into the journey.",
    image: cuisineImg,
    to: "/events",
  },
  {
    title: "Community Tourism",
    text: "Homestays, artisans, eco scores, and rural experiences that bring local communities into the platform.",
    image: kochiImg,
    to: "/homestays",
  },
];

const defaultReviews = [
  {
    quote: "It felt like a premium magazine itinerary, but with a booking flow that was simple enough for my family.",
    author: "Priya S.",
    city: "Mumbai",
  },
  {
    quote: "The Oracle helped us choose a Kerala route with the right balance of culture, food, and rest.",
    author: "Aarav K.",
    city: "Delhi",
  },
  {
    quote: "South Trails made Hampi, Mysore, and Coorg feel connected instead of like separate trips.",
    author: "Nandini R.",
    city: "Bangalore",
  },
];

const HeroInfoCard = ({ align = "left", title, text, image }) => (
  <motion.article
    className={`hero-info-card hero-info-card--${align}`}
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut", delay: align === "left" ? 0.65 : 0.8 }}
  >
    <div className="hero-info-card__image" style={{ backgroundImage: `url(${image})` }} />
    <div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  </motion.article>
);

const HeroSection = () => (
  <section className="home-hero" aria-label="Explore South India">
    <div className="home-hero__image" style={{ backgroundImage: `url(${backwaterImg})` }} />
    <div className="home-hero__overlay" />

    <motion.div
      className="home-hero__content"
      variants={stagger}
      initial="hidden"
      animate="visible"
    >
      <motion.p className="home-hero__kicker" variants={fadeUp}>
        Luxury journeys across the peninsula
      </motion.p>
      <motion.h1 variants={fadeUp}>
        <span>Explore</span>
        <span>South India</span>
      </motion.h1>
      <motion.p className="home-hero__subtitle" variants={fadeUp}>
        Discover ancient temples, misty mountains, lush backwaters, vibrant culture,
        and unforgettable journeys.
      </motion.p>
      <motion.div className="home-hero__actions" variants={fadeUp}>
        <Link to="/packages" className="home-luxury-button home-luxury-button--primary">
          Explore Packages
        </Link>
        <Link to="/trip-builder" className="home-luxury-button home-luxury-button--ghost">
          Build My Trip
        </Link>
      </motion.div>
    </motion.div>

    <HeroInfoCard
      align="left"
      title="Heritage & Culture"
      text="Temple towns, palace corridors, classical arts, and curated local stories."
      image={hampiImg}
    />
    <HeroInfoCard
      align="right"
      title="People & Traditions"
      text="Guides, hosts, artisans, festivals, and living communities behind every route."
      image={maduraiImg}
    />
  </section>
);

const SectionHeader = ({ eyebrow, title, text, align = "left" }) => (
  <motion.div
    className={`home-section-header home-section-header--${align}`}
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.35 }}
  >
    <span>{eyebrow}</span>
    <h2>{title}</h2>
    {text && <p>{text}</p>}
  </motion.div>
);

const StateShowcase = () => (
  <section id="destinations" className="home-section home-section--cream">
    <div className="home-section__inner">
      <SectionHeader
        eyebrow="Explore States"
        title="Four southern worlds, one cinematic journey."
        text="Keep the existing state routes intact while presenting them like destination editorials."
        align="center"
      />
      <motion.div
        className="home-state-grid"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {stateCards.map((state) => (
          <motion.article key={state.name} className="home-state-card" variants={fadeUp}>
            <Link to={state.to} aria-label={`Explore ${state.name}`}>
              <img src={state.image} alt={`${state.name} travel landscape`} loading="lazy" />
              <div className="home-state-card__shade" />
              <div className="home-state-card__copy">
                <span>Destination</span>
                <h3>{state.name}</h3>
                <p>{state.label}</p>
              </div>
            </Link>
          </motion.article>
        ))}
      </motion.div>
    </div>
  </section>
);

const FeaturedDestinations = () => (
  <section className="home-section home-section--black">
    <div className="home-section__inner">
      <SectionHeader
        eyebrow="Featured Destinations"
        title="Iconic places, composed like a travel magazine."
        text="Ooty, Munnar, Coorg, Alleppey, Madurai, and Hampi become immersive discovery cards before users enter the package flow."
      />
      <motion.div
        className="home-destination-masonry"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.16 }}
      >
        {featuredDestinations.map((place, index) => (
          <motion.article
            key={place.name}
            className={`home-destination-card ${index === 1 || index === 4 ? "home-destination-card--tall" : ""}`}
            variants={fadeUp}
          >
            <Link to={place.to}>
              <img src={place.image} alt={`${place.name} destination`} loading="lazy" />
              <div>
                <span>Explore</span>
                <h3>{place.name}</h3>
                <p>{place.mood}</p>
              </div>
            </Link>
          </motion.article>
        ))}
      </motion.div>
    </div>
  </section>
);

const SignatureJourneySection = () => (
  <section className="home-section home-section--white">
    <div className="home-section__inner">
      <SectionHeader
        eyebrow="Signature Journeys"
        title="Designed for travelers who want fewer clicks and deeper stories."
        text="The cards link into your existing package and AI routes, so the current booking workflow stays untouched."
      />
      <div className="home-experience-layout">
        {experiences.map((item, index) => (
          <motion.article
            key={item.title}
            className={`home-experience-card ${index === 0 ? "home-experience-card--wide" : ""}`}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.08 }}
          >
            <Link to={item.to}>
              <img src={item.image} alt={item.title} loading="lazy" />
              <div className="home-experience-card__copy">
                <span>0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

const ExperienceSection = () => (
  <section className="home-section home-section--surface">
    <div className="home-section__inner">
      <SectionHeader
        eyebrow="Experiences"
        title="Choose the feeling first. Book when the story feels right."
        text="Adventure, nature, culture, spiritual, luxury, and family journeys are expressed as immersive cards, not small utility tiles."
        align="center"
      />
      <div className="home-category-grid">
        {experienceCategories.map((category) => (
          <motion.article
            key={category.title}
            className="home-category-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <Link to={category.to}>
              <img src={category.image} alt={`${category.title} travel`} loading="lazy" />
              <div>
                <h3>{category.title}</h3>
                <p>{category.text}</p>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

const OracleSection = () => {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("Ask for a mood, budget, season, or family-friendly route.");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!prompt.trim()) return;
    setLoading(true);
    const { data, error } = await chatWithOracle({ message: prompt, language: "English" });
    if (data?.answer) {
      setAnswer(data.answer);
    } else if (data?.message) {
      setAnswer(data.message);
    } else {
      setAnswer(error?.message || "Try Kerala backwaters, Hampi heritage, Coorg coffee trails, or Tamil Nadu temple routes.");
    }
    setLoading(false);
  };

  return (
    <section className="home-oracle-section">
      <div className="home-oracle-section__image" style={{ backgroundImage: `url(${munnarImg})` }} />
      <div className="home-oracle-section__shade" />
      <motion.div
        className="home-oracle-panel"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
      >
        <span>AI Travel Oracle</span>
        <h2>Tell South Trails what you feel like doing.</h2>
        <p>
          Ask in natural language. The Oracle uses the existing destination and package data,
          then nudges travelers back into the current package and booking flow.
        </p>
        <form onSubmit={handleSubmit} className="home-oracle-form">
          <input
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder="Example: 4 days, peaceful Kerala trip with culture and backwaters"
          />
          <button type="submit" disabled={loading}>
            {loading ? "Thinking" : "Ask Oracle"}
          </button>
        </form>
        <div className="home-oracle-answer">
          <strong>Oracle Preview</strong>
          <p>{answer}</p>
        </div>
        <Link to="/oracle" className="home-inline-link">
          Open full Oracle
        </Link>
      </motion.div>
    </section>
  );
};

const PackageSection = () => (
  <section className="home-section home-section--charcoal">
    <div className="home-section__inner">
      <SectionHeader
        eyebrow="Curated Packages"
        title="Premium routes that still lead into the existing booking flow."
        text="These highlights are editorial entry points. The real browsing, package details, and booking pages remain unchanged."
      />
      <div className="home-package-grid">
        {packages.map((pkg) => (
          <motion.article
            key={pkg.name}
            className="home-package-card"
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Link to={pkg.to}>
              <img src={pkg.image} alt={pkg.name} loading="lazy" />
              <div>
                <span>{pkg.detail}</span>
                <h3>{pkg.name}</h3>
                <p>From {pkg.price}</p>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
      <div className="home-section-actions">
        <Link to="/packages" className="home-luxury-button home-luxury-button--light">
          View All Packages
        </Link>
        <Link to="/recommendations" className="home-luxury-button home-luxury-button--outline-light">
          AI Recommendations
        </Link>
      </div>
    </div>
  </section>
);

const CultureSection = () => (
  <section className="home-section home-section--white home-culture-story-section">
    <div className="home-section__inner">
      <SectionHeader
        eyebrow="Culture & Heritage"
        title="Not just places. Living traditions."
        text="Temple heritage, traditional arts, festivals, cuisine, and community tourism create the emotional layer around the booking platform."
      />
      <div className="home-culture-stories">
        {cultureStories.map((story, index) => (
          <motion.article
            key={story.title}
            className={`home-culture-story ${index % 2 ? "home-culture-story--reverse" : ""}`}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
          >
            <Link to={story.to} className="home-culture-story__media">
              <img src={story.image} alt={story.title} loading="lazy" />
            </Link>
            <div className="home-culture-story__copy">
              <span>0{index + 1}</span>
              <h3>{story.title}</h3>
              <p>{story.text}</p>
              <Link to={story.to}>Explore Story</Link>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

const ReviewSection = ({ reviews }) => (
  <section className="home-section home-section--cream">
    <div className="home-section__inner">
      <SectionHeader
        eyebrow="Testimonials"
        title="Travel stories with enough detail to feel real."
        text="Static testimonials merge with existing review data when the backend is available."
        align="center"
      />
      <div className="home-review-grid">
        {reviews.map((review) => (
          <motion.article
            key={`${review.author}-${review.quote}`}
            className="home-review-card"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <p>"{review.quote}"</p>
            <div>
              <strong>{review.author}</strong>
              <span>{review.city}</span>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

const Home = () => {
  const [reviews, setReviews] = useState(defaultReviews);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await getReviews();
        const dynamicReviews = (data || []).map((review) => ({
          quote: review.text || review.comment || "A thoughtful South India journey with smooth booking support.",
          author: review.name || review.userName || "Verified Guest",
          city: review.location || "India",
        }));
        setReviews([...defaultReviews, ...dynamicReviews].slice(0, 6));
      } catch (error) {
        console.error("Error loading reviews", error);
      }
    };

    loadReviews();
  }, []);

  return (
    <>
      <main className="home-luxury">
        <HeroSection />
        <StateShowcase />
        <FeaturedDestinations />
        <SignatureJourneySection />
        <ExperienceSection />
        <OracleSection />
        <PackageSection />
        <CultureSection />
        <ReviewSection reviews={reviews} />
      </main>
      <Footer />
    </>
  );
};

export default Home;
