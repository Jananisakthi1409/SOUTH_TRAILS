import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import ootyImage from "../state/tamilnadu/ooty/pexels-renjith-tomy-pkm-138432405-34327034.webp";
import kodaikanalImage from "../state/tamilnadu/kodaikanal/pexels-rohit-george-1141376880-32236721.webp";
import mahabalipuramImage from "../state/tamilnadu/tamilnadubanner.webp";
import meenakshiImage from "../state/tamilnadu/madurai/pexels-thilina-alagiyawanna-3266092-36609003.webp";
import rameswaramImage from "../state/tamilnadu/rameswaram/pexels-animesh-paul-150064-35620983.webp";
import kanyakumariImage from "../state/tamilnadu/kanyakumari/pexels-prasang-yadav-2151662075-37512272.webp";
import chettinadImage from "../state/tamilnadu/chettinad/pexels-logalongwithme-28668658.webp";
import valparaiImage from "../state/tamilnadu/valparai/pexels-sreejith-m-u-322740174-13724240.webp";

const destinations = [
  {
    id: "ooty",
    title: "Ooty",
    label: "Nilgiris",
    image: ootyImage,
    summary: "Blue hills, tea estates, misty lakes, and slow mountain mornings in the Queen of Hill Stations.",
    meta: "23 C / 2 nights",
    to: "/destinations/ooty",
  },
  {
    id: "kodaikanal",
    title: "Kodaikanal",
    label: "Western Ghats",
    image: kodaikanalImage,
    summary: "Cloud forests, quiet lake roads, waterfall trails, and monsoon light over the Palani hills.",
    meta: "21 C / 3 nights",
    to: "/destinations/kodaikanal",
  },
  {
    id: "mahabalipuram",
    title: "Mahabalipuram",
    label: "Pallava Coast",
    image: mahabalipuramImage,
    summary: "Shore temples, stone chariots, sea breeze, and ancient sculpture beside the Bay of Bengal.",
    meta: "31 C / 1 night",
    to: "/states/tamil-nadu",
  },
  {
    id: "meenakshi-temple",
    title: "Meenakshi Temple",
    label: "Madurai",
    image: meenakshiImage,
    summary: "A sacred city of carved towers, lamp-lit corridors, jasmine markets, and evening rituals.",
    meta: "32 C / heritage walk",
    to: "/destinations/madurai",
  },
  {
    id: "rameswaram",
    title: "Rameswaram",
    label: "Island Pilgrimage",
    image: rameswaramImage,
    summary: "Pamban blues, temple corridors, coral sands, and a luminous coastline shaped by devotion.",
    meta: "30 C / 2 nights",
    to: "/destinations/rameswaram",
  },
  {
    id: "kanyakumari",
    title: "Kanyakumari",
    label: "Land's End",
    image: kanyakumariImage,
    summary: "Where three seas meet: sunrise ferries, coastal shrines, and golden evenings at India's edge.",
    meta: "29 C / sunset stay",
    to: "/destinations/kanyakumari",
  },
];

const collections = [
  ["Temple Circuits", "Madurai, Rameswaram, Thanjavur, Kanchipuram", meenakshiImage, "/heritage"],
  ["Hill Escapes", "Ooty, Kodaikanal, Yercaud, Valparai", kodaikanalImage, "/explore"],
  ["Coastal Tamil Nadu", "Mahabalipuram, Rameswaram, Kanyakumari", rameswaramImage, "/explore"],
  ["Food & Craft Trails", "Chettinad kitchens, Madurai nights, artisan streets", chettinadImage, "/food-trails"],
];

const packages = [
  ["Temple Trail", "4 days / Madurai, Rameswaram, Thanjavur", "From Rs. 12,999", meenakshiImage],
  ["Nilgiri Luxe Escape", "3 days / Ooty, Coonoor, tea country", "From Rs. 10,999", ootyImage],
  ["Chettinad Heritage Stay", "2 days / Mansions, craft, cuisine", "From Rs. 9,999", chettinadImage],
];

const testimonials = [
  ["Priya S.", "Madurai, Rameswaram, and Chettinad felt connected instead of rushed."],
  ["Arun K.", "The package filters helped us pick a realistic Ooty and Coonoor weekend."],
  ["Meera R.", "The AI planner balanced temples, food, and family travel beautifully."],
];

const seasonal = [
  ["Monsoon", "Kodaikanal, Courtallam, Valparai", kodaikanalImage],
  ["Winter", "Madurai, Rameswaram, Kanyakumari", rameswaramImage],
  ["Festival", "Pongal, Margazhi, Chithirai routes", meenakshiImage],
];

const navItems = [
  ["Destinations", "/explore"],
  ["Packages", "/packages"],
  ["Planner", "/trip-builder"],
  ["Contact", "/contact"],
];

const slideVariants = {
  enter: { opacity: 0, scale: 1.05 },
  center: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.02 },
};

const contentVariants = {
  enter: { opacity: 0, y: 28 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -18 },
};

const Home = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [lead, setLead] = useState({ name: "", phone: "", interest: "Luxury Tamil Nadu itinerary" });
  const [searchTerm, setSearchTerm] = useState("");
  const activeDestination = destinations[activeIndex];

  const floatingCards = useMemo(
    () =>
      Array.from({ length: 3 }, (_, index) => {
        const destinationIndex = (activeIndex + index + 1) % destinations.length;
        return { ...destinations[destinationIndex], destinationIndex };
      }),
    [activeIndex]
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % destinations.length);
    }, 7000);

    return () => window.clearInterval(interval);
  }, []);

  const goToSlide = (index) => setActiveIndex((index + destinations.length) % destinations.length);
  const moveSlide = (direction) => setActiveIndex((current) => (current + direction + destinations.length) % destinations.length);
  const searchDestinations = (event) => {
    event.preventDefault();
    const query = searchTerm.trim().toLowerCase();
    if (!query) {
      navigate("/explore");
      return;
    }

    const match = destinations.find((item) =>
      [item.id, item.title, item.label, item.summary].join(" ").toLowerCase().includes(query)
    );
    navigate(match?.to || "/explore");
  };

  return (
    <main className="min-h-screen bg-[#07110f] font-sans text-white">
      <section className="relative min-h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDestination.id}
            className="absolute inset-0"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src={activeDestination.image} alt={activeDestination.title} className="h-full w-full object-cover" />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,10,12,0.96)_0%,rgba(3,12,16,0.78)_35%,rgba(4,18,20,0.2)_64%,rgba(4,12,15,0.86)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_64%_48%,rgba(240,201,74,0.14),transparent_30%),linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.76)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-2 bg-[#2a9d8f]" />

        <div className="absolute inset-x-0 top-0 h-2 bg-[#2a9d8f]" />

        <aside className="absolute bottom-24 left-5 top-28 z-20 hidden w-10 flex-col items-center justify-between md:flex">
          <div className="relative h-[58vh] w-px bg-white/20">
            <motion.div
              key={activeDestination.id}
              className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-white"
              style={{ height: `${((activeIndex + 1) / destinations.length) * 100}%` }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
            />
            {destinations.map((destination, index) => (
              <button
                type="button"
                key={destination.id}
                onClick={() => goToSlide(index)}
                aria-label={`View ${destination.title}`}
                className={`absolute left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border transition ${
                  index === activeIndex ? "scale-[2.25] border-white bg-white/90" : "border-white/45 bg-white/35 hover:bg-white"
                }`}
                style={{ top: `${(index / (destinations.length - 1)) * 100}%` }}
              />
            ))}
          </div>
          <span className="-rotate-90 font-mono text-[0.68rem] font-bold uppercase tracking-[0.24em] text-white/70">
            Tamil Nadu
          </span>
        </aside>

        <section className="relative z-10 grid min-h-screen grid-cols-1 items-end gap-8 px-5 pb-10 pt-28 sm:px-8 md:pl-24 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.86fr)] lg:px-12 lg:pb-16 lg:pt-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDestination.id}
              variants={contentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="max-w-4xl"
            >
              <p className="mb-5 font-mono text-xs font-bold uppercase tracking-[0.34em] text-[#f0c94a]">
                {activeDestination.label}
              </p>
              <h1 className="max-w-[820px] font-display text-[clamp(4.2rem,9vw,8.4rem)] uppercase leading-[0.84] tracking-normal text-white drop-shadow-2xl">
                {activeDestination.title}
              </h1>
              <p className="mt-7 max-w-2xl text-sm font-medium leading-7 text-white/78 sm:text-base">
                {activeDestination.summary}
              </p>

              <form onSubmit={searchDestinations} className="mt-7 flex max-w-xl flex-col gap-3 rounded-md border border-white/15 bg-white/10 p-2 shadow-luxury backdrop-blur-xl sm:flex-row">
                <input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  className="min-h-12 flex-1 rounded-md border border-white/10 bg-white/95 px-4 font-bold text-[#10201e] outline-none"
                  placeholder="Search Ooty, Madurai, Rameswaram..."
                  aria-label="Search destinations"
                />
                <button type="submit" className="min-h-12 rounded-md bg-[#f0c94a] px-6 font-black text-[#1a0a00]">
                  Search
                </button>
              </form>

              <div className="mt-9 flex flex-wrap items-center gap-5">
                <Link to="/explore" className="group inline-flex min-h-14 items-center gap-6 rounded-md bg-[#2f7dd3] px-8 text-lg font-black text-white shadow-luxury transition hover:-translate-y-1 hover:bg-[#3d8ee9]">
                  Explore <span className="text-xl transition group-hover:translate-x-1">-&gt;</span>
                </Link>
                <Link to="/trip-builder" className="inline-flex min-h-14 items-center rounded-md border border-white/20 bg-white/10 px-8 text-sm font-black uppercase tracking-[0.18em] text-white backdrop-blur-xl transition hover:bg-white hover:text-[#10201e]">
                  Plan Trip
                </Link>
                <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-white/65">{activeDestination.meta}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          <div id="cards" className="relative hidden min-h-[460px] items-end lg:flex">
            <div className="flex w-full translate-x-4 items-end gap-5 overflow-hidden pb-12">
              {floatingCards.map((card, index) => (
                <motion.button
                  type="button"
                  key={card.id}
                  onClick={() => goToSlide(card.destinationIndex)}
                  className={`group relative shrink-0 overflow-hidden rounded-md border border-white/14 bg-white/10 text-left shadow-luxury outline-none transition hover:-translate-y-3 hover:border-white/50 focus-visible:ring-2 focus-visible:ring-[#f0c94a] ${
                    index === 0 ? "h-[390px] w-[255px]" : "h-[330px] w-[250px]"
                  }`}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.55, ease: "easeOut" }}
                >
                  <img src={card.image} alt={card.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.72))]" />
                  <div className="absolute left-0 right-0 top-0 p-4">
                    <h2 className="text-sm font-black text-white">{card.title}</h2>
                    <div className="mt-2 flex gap-1">
                      {Array.from({ length: 5 }).map((_, dotIndex) => (
                        <span key={dotIndex} className="h-1.5 w-1.5 rounded-full bg-white/85" />
                      ))}
                    </div>
                  </div>
                  <span className="absolute right-4 top-5 grid h-12 w-12 place-items-center rounded-full bg-white text-[#19312e] shadow-xl">+</span>
                  <div className="absolute bottom-0 p-4">
                    <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#f0c94a]">{card.label}</p>
                    <p className="mt-2 line-clamp-2 text-sm font-semibold leading-5 text-white/88">{card.summary}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="absolute bottom-9 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 lg:bottom-14">
            <button type="button" onClick={() => moveSlide(-1)} className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/20 text-xl text-white backdrop-blur-xl transition hover:bg-white hover:text-[#12302d]" aria-label="Previous destination">
              &lt;
            </button>
            <button type="button" onClick={() => moveSlide(1)} className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/20 text-xl text-white backdrop-blur-xl transition hover:bg-white hover:text-[#12302d]" aria-label="Next destination">
              &gt;
            </button>
          </div>

          <div className="absolute bottom-11 right-8 z-20 hidden items-center gap-4 font-mono text-[0.68rem] font-bold text-white/80 lg:flex">
            <span>{String(activeIndex + 1).padStart(2, "0")}</span>
            <div className="h-px w-16 bg-white/30">
              <div className="h-px bg-white transition-all duration-500" style={{ width: `${((activeIndex + 1) / destinations.length) * 100}%` }} />
            </div>
            <span>{String(destinations.length).padStart(2, "0")}</span>
          </div>
        </section>
      </section>

      <section className="bg-[#f5efe6] px-5 py-20 text-[#1a0a00] sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-[#c8440a]">Popular places</p>
            <h2 className="mt-4 font-display text-[clamp(2.8rem,6vw,6rem)] leading-[0.9]">Travel Tamil Nadu by mood, season, and story.</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {collections.map(([title, text, image, to]) => (
              <Link key={title} to={to} className="group relative min-h-[360px] overflow-hidden rounded-md bg-black shadow-luxury">
                <img src={image} alt={title} loading="lazy" className="h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/86 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <h3 className="text-2xl font-black">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/75">{text}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf4] px-5 py-20 text-[#1a0a00] sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-[#c8440a]">Seasonal recommendations</p>
          <h2 className="mt-4 max-w-4xl font-display text-[clamp(2.8rem,6vw,5.8rem)] leading-[0.9]">Right place, right season.</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {seasonal.map(([title, text, image]) => (
              <article key={title} className="overflow-hidden rounded-md bg-white shadow-luxury">
                <img src={image} alt={title} loading="lazy" className="h-56 w-full object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl font-black">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#6b5f55]">{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#07110f] px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-[#f0c94a]">Signature packages</p>
            <h2 className="mt-4 font-display text-[clamp(2.8rem,6vw,5.6rem)] leading-[0.9]">Premium routes, ready to book.</h2>
            <p className="mt-6 max-w-md leading-7 text-white/65">Temple circuits, tea country escapes, coastal pilgrimages, culinary routes, and custom luxury itineraries.</p>
            <Link to="/packages" className="mt-8 inline-flex rounded-md bg-white px-7 py-4 font-black text-[#10201e]">View packages</Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {packages.map(([title, text, price, image]) => (
              <article key={title} className="overflow-hidden rounded-md border border-white/10 bg-white/5 shadow-luxury">
                <img src={image} alt={title} loading="lazy" className="h-56 w-full object-cover" />
                <div className="p-5">
                  <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#f0c94a]">{price}</p>
                  <h3 className="mt-3 text-xl font-black">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/65">{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#12302d] px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.8fr]">
          <div className="relative min-h-[460px] overflow-hidden rounded-md shadow-luxury">
            <img src={valparaiImage} alt="Valparai Hills" loading="lazy" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
            <div className="absolute bottom-0 max-w-xl p-8">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-[#f0c94a]">Concierge form</p>
              <h2 className="mt-4 font-display text-[clamp(2.6rem,6vw,5rem)] leading-[0.9]">Start a custom Tamil Nadu plan.</h2>
            </div>
          </div>
          <form
            className="rounded-md border border-white/12 bg-white/10 p-6 shadow-luxury backdrop-blur-xl"
            onSubmit={(event) => event.preventDefault()}
          >
            <label className="block text-sm font-black">
              Name
              <input
                value={lead.name}
                onChange={(event) => setLead({ ...lead, name: event.target.value })}
                className="mt-3 min-h-12 w-full rounded-md border border-white/15 bg-white/90 px-4 text-[#10201e] outline-none"
                placeholder="Your name"
              />
            </label>
            <label className="mt-5 block text-sm font-black">
              Phone
              <input
                value={lead.phone}
                onChange={(event) => setLead({ ...lead, phone: event.target.value })}
                className="mt-3 min-h-12 w-full rounded-md border border-white/15 bg-white/90 px-4 text-[#10201e] outline-none"
                placeholder="Phone number"
              />
            </label>
            <label className="mt-5 block text-sm font-black">
              Travel Interest
              <select
                value={lead.interest}
                onChange={(event) => setLead({ ...lead, interest: event.target.value })}
                className="mt-3 min-h-12 w-full rounded-md border border-white/15 bg-white/90 px-4 text-[#10201e] outline-none"
              >
                <option>Luxury Tamil Nadu itinerary</option>
                <option>Temple and heritage circuit</option>
                <option>Hills and nature escape</option>
                <option>Food trail and culture</option>
              </select>
            </label>
            <Link
              to="/contact"
              className="mt-7 inline-flex min-h-14 w-full items-center justify-center rounded-md bg-[#f0c94a] px-6 text-center font-black text-[#1a0a00]"
            >
              Continue to enquiry
            </Link>
            <p className="mt-4 text-sm leading-6 text-white/60">This quick form keeps the home page complete while the full enquiry workflow lives on Contact.</p>
          </form>
        </div>
      </section>

      <section className="bg-[#f5efe6] px-5 py-20 text-[#1a0a00] sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-[#c8440a]">Testimonials</p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {testimonials.map(([name, quote]) => (
              <article key={name} className="rounded-md bg-white p-6 shadow-luxury">
                <p className="text-lg font-bold leading-8">"{quote}"</p>
                <strong className="mt-6 block">{name}</strong>
              </article>
            ))}
          </div>
          <div className="mt-12 rounded-md bg-[#07110f] p-8 text-white shadow-luxury">
            <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.9]">Ready to build your Tamil Nadu trip?</h2>
            <Link to="/trip-builder" className="mt-7 inline-flex rounded-md bg-[#f0c94a] px-7 py-4 font-black text-[#1a0a00]">
              Start planning
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
