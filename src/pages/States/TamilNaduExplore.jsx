import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import ootyImage from "../state/tamilnadu/ooty/pexels-renjith-tomy-pkm-138432405-34327034.webp";
import kodaikanalImage from "../state/tamilnadu/kodaikanal/pexels-rohit-george-1141376880-32236721.webp";
import mahabalipuramImage from "../state/tamilnadu/tamilnadubanner.webp";
import meenakshiImage from "../state/tamilnadu/madurai/pexels-thilina-alagiyawanna-3266092-36609003.webp";
import rameswaramImage from "../state/tamilnadu/rameswaram/pexels-animesh-paul-150064-35620983.webp";
import kanyakumariImage from "../state/tamilnadu/kanyakumari/pexels-prasang-yadav-2151662075-37512272.webp";

const destinations = [
  {
    id: "ooty",
    title: "Ooty",
    label: "Nilgiris",
    image: ootyImage,
    summary: "Blue hills, tea estates, misty lakes, and slow mountain mornings in the Queen of Hill Stations.",
    meta: "23 C / 2 nights",
  },
  {
    id: "kodaikanal",
    title: "Kodaikanal",
    label: "Western Ghats",
    image: kodaikanalImage,
    summary: "Cloud forests, quiet lake roads, waterfall trails, and monsoon light over the Palani hills.",
    meta: "21 C / 3 nights",
  },
  {
    id: "mahabalipuram",
    title: "Mahabalipuram",
    label: "Pallava Coast",
    image: mahabalipuramImage,
    summary: "Shore temples, stone chariots, sea breeze, and ancient sculpture beside the Bay of Bengal.",
    meta: "31 C / 1 night",
  },
  {
    id: "meenakshi-temple",
    title: "Meenakshi Temple",
    label: "Madurai",
    image: meenakshiImage,
    summary: "A sacred city of carved towers, lamp-lit corridors, jasmine markets, and evening rituals.",
    meta: "32 C / heritage walk",
  },
  {
    id: "rameswaram",
    title: "Rameswaram",
    label: "Island Pilgrimage",
    image: rameswaramImage,
    summary: "Pamban blues, temple corridors, coral sands, and a luminous coastline shaped by devotion.",
    meta: "30 C / 2 nights",
  },
  {
    id: "kanyakumari",
    title: "Kanyakumari",
    label: "Land's End",
    image: kanyakumariImage,
    summary: "Where three seas meet: sunrise ferries, coastal shrines, and golden evenings at India's edge.",
    meta: "29 C / sunset stay",
  },
];

const navItems = ["News", "Destinations", "Culture", "Contact"];

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

const TamilNaduExplore = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeDestination = destinations[activeIndex];

  const floatingCards = useMemo(
    () =>
      Array.from({ length: 3 }, (_, index) => {
        const destinationIndex = (activeIndex + index + 1) % destinations.length;
        return {
          ...destinations[destinationIndex],
          destinationIndex,
        };
      }),
    [activeIndex]
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % destinations.length);
    }, 7000);

    return () => window.clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setActiveIndex((index + destinations.length) % destinations.length);
  };

  const moveSlide = (direction) => {
    setActiveIndex((current) => (current + direction + destinations.length) % destinations.length);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07110f] font-sans text-white">
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
          <img
            src={activeDestination.image}
            alt=""
            className="h-full w-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,10,12,0.96)_0%,rgba(3,12,16,0.78)_35%,rgba(4,18,20,0.2)_64%,rgba(4,12,15,0.86)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_64%_48%,rgba(240,201,74,0.14),transparent_30%),linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.76)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-2 bg-[#2a9d8f]" />

      <header className="absolute left-0 right-0 top-2 z-30 flex items-center justify-between px-5 py-6 sm:px-8 lg:px-12">
        <Link to="/" className="flex items-center gap-3 text-2xl font-black tracking-tight">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#f0c94a] text-base text-[#1a0a00] shadow-glow">
            TT
          </span>
          Tamil Trails
        </Link>

        <nav className="hidden items-center gap-11 text-[0.72rem] font-bold uppercase tracking-[0.22em] text-white/75 lg:flex">
          {navItems.map((item) => (
            <a key={item} href={item === "Destinations" ? "#cards" : "#"} className="transition hover:text-white">
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/95 text-[#10201e] shadow-luxury transition hover:scale-105"
            aria-label="Search destinations"
          >
            <span className="text-lg leading-none">⌕</span>
          </button>
          <span className="hidden text-sm font-extrabold tracking-wide sm:inline">Hello, Traveler</span>
        </div>
      </header>

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
                index === activeIndex
                  ? "scale-[2.25] border-white bg-white/90"
                  : "border-white/45 bg-white/35 hover:bg-white"
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

            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Link
                to="/tamil-nadu-packages"
                className="group inline-flex min-h-14 items-center gap-6 rounded-md bg-[#2f7dd3] px-8 text-lg font-black text-white shadow-luxury transition hover:-translate-y-1 hover:bg-[#3d8ee9]"
              >
                Explore
                <span className="text-xl transition group-hover:translate-x-1">-&gt;</span>
              </Link>
              <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-white/65">
                {activeDestination.meta}
              </span>
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
                style={{ animationDelay: `${index * 0.8}s` }}
              >
                <img src={card.image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.72))]" />
                <div className="absolute left-0 right-0 top-0 p-4">
                  <h2 className="text-sm font-black text-white">{card.title}</h2>
                  <div className="mt-2 flex gap-1">
                    {Array.from({ length: 5 }).map((_, dotIndex) => (
                      <span key={dotIndex} className="h-1.5 w-1.5 rounded-full bg-white/85" />
                    ))}
                  </div>
                </div>
                <span className="absolute right-4 top-5 grid h-12 w-12 place-items-center rounded-full bg-white text-[#19312e] shadow-xl">
                  +
                </span>
                <div className="absolute bottom-0 p-4">
                  <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#f0c94a]">
                    {card.label}
                  </p>
                  <p className="mt-2 line-clamp-2 text-sm font-semibold leading-5 text-white/88">
                    {card.summary}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="absolute bottom-9 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 lg:bottom-14">
          <button
            type="button"
            onClick={() => moveSlide(-1)}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/20 text-xl text-white backdrop-blur-xl transition hover:bg-white hover:text-[#12302d]"
            aria-label="Previous destination"
          >
            &lt;
          </button>
          <button
            type="button"
            onClick={() => moveSlide(1)}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/20 text-xl text-white backdrop-blur-xl transition hover:bg-white hover:text-[#12302d]"
            aria-label="Next destination"
          >
            &gt;
          </button>
        </div>

        <div className="absolute bottom-11 right-8 z-20 hidden items-center gap-4 font-mono text-[0.68rem] font-bold text-white/80 lg:flex">
          <span>{String(activeIndex + 1).padStart(2, "0")}</span>
          <div className="h-px w-16 bg-white/30">
            <div
              className="h-px bg-white transition-all duration-500"
              style={{ width: `${((activeIndex + 1) / destinations.length) * 100}%` }}
            />
          </div>
          <span>{String(destinations.length).padStart(2, "0")}</span>
        </div>

        <div className="pointer-events-none absolute bottom-8 left-5 hidden select-none text-[clamp(3rem,8vw,8rem)] font-black uppercase leading-none tracking-tight text-white/[0.035] md:left-24 md:block">
          {destinations[(activeIndex + 1) % destinations.length].title}
        </div>
      </section>
    </main>
  );
};

export default TamilNaduExplore;
