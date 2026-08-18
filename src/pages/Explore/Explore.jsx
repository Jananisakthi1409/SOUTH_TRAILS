import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import chennaiImg from "../state/tamilnadu/chennai/pexels-logalongwithme-28668658.webp";
import maduraiImg from "../state/tamilnadu/madurai/pexels-thilina-alagiyawanna-3266092-36609003.webp";
import ootyImg from "../state/tamilnadu/ooty/pexels-alexander-savchuk-108847177-9659261.webp";
import kodaikanalImg from "../state/tamilnadu/kodaikanal/pexels-rohit-george-1141376880-32236721.webp";
import rameswaramImg from "../state/tamilnadu/rameswaram/pexels-animesh-paul-150064-35620983.webp";
import kanyakumariImg from "../state/tamilnadu/kanyakumari/pexels-renjith-tomy-pkm-138432405-34327034.webp";
import chettinadImg from "../state/tamilnadu/chettinad/pexels-logalongwithme-28668658.webp";
import valparaiImg from "../state/tamilnadu/valparai/pexels-sreejith-m-u-322740174-13724240.webp";

const categories = [
  ["Heritage & Temples", "Madurai, Thanjavur, Rameswaram, Kanchipuram", maduraiImg, "/heritage"],
  ["Hill Stations", "Ooty, Kodaikanal, Yercaud, Valparai", ootyImg, "/destinations/ooty"],
  ["Beaches & Coast", "Mahabalipuram, Dhanushkodi, Kanyakumari", kanyakumariImg, "/destinations/kanyakumari"],
  ["Nature & Wildlife", "Mudumalai, Anamalai, Pichavaram, Topslip", valparaiImg, "/eco-tourism"],
  ["Food Trails", "Chettinad, Madurai, Chennai, Kongu Nadu", chettinadImg, "/food-trails"],
  ["Spiritual Routes", "Temple corridors, festivals, rituals, music", rameswaramImg, "/festivals"],
];

const destinations = [
  ["Chennai", "Coast, culture, sabhas, temples, and gateway heritage.", "Nov-Feb", chennaiImg, "/destinations/chennai"],
  ["Madurai", "Temple rituals, food streets, jasmine markets, and living heritage.", "Oct-Mar", maduraiImg, "/destinations/madurai"],
  ["Ooty", "Nilgiri tea gardens, toy train memories, and cool mountain air.", "Oct-Jun", ootyImg, "/destinations/ooty"],
  ["Kodaikanal", "Lake loops, pine forests, mist trails, and weekend retreats.", "Sep-May", kodaikanalImg, "/destinations/kodaikanal"],
  ["Rameswaram", "Sacred corridors, Pamban Bridge, Dhanushkodi, and devotion.", "Oct-Apr", rameswaramImg, "/destinations/rameswaram"],
  ["Kanyakumari", "Sunrise, sunset, rock memorials, and southern coast drama.", "Oct-Mar", kanyakumariImg, "/destinations/kanyakumari"],
];

const Explore = () => {
  const navigate = useNavigate();

  const handleSurpriseMe = () => {
    const pick = destinations[Math.floor(Math.random() * destinations.length)];
    navigate(pick[4]);
  };

  return (
    <main className="min-h-screen bg-[#07110f] font-sans text-white">
      <section className="relative overflow-hidden px-5 py-24 sm:px-8 lg:px-12">
        <img src={rameswaramImg} alt="Rameswaram Temple Corridor" className="absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,17,15,0.98),rgba(7,17,15,0.78),rgba(7,17,15,0.4))]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.55fr] lg:items-end">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-[#f0c94a]">Explore Tamil Nadu</p>
            <h1 className="mt-5 max-w-4xl font-display text-[clamp(4rem,10vw,9rem)] uppercase leading-[0.82]">
              Choose your route.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/70">
              Browse temples, hills, coast, food, festivals, wildlife routes, and package-ready
              destination clusters inside one premium Tamil Nadu tourism platform.
            </p>
          </div>
          <div className="rounded-md border border-white/12 bg-white/10 p-6 shadow-luxury backdrop-blur-xl">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-white/60">Route finder</p>
            <h2 className="mt-3 text-3xl font-black">Let the site pick a destination.</h2>
            <button
              className="mt-6 min-h-14 rounded-md bg-[#f0c94a] px-7 font-black text-[#1a0a00]"
              type="button"
              onClick={handleSurpriseMe}
            >
              Surprise Me
            </button>
          </div>
        </div>
      </section>

      <section className="bg-[#f5efe6] px-5 py-20 text-[#1a0a00] sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-[#c8440a]">Travel categories</p>
          <h2 className="mt-4 max-w-4xl font-display text-[clamp(2.8rem,6vw,5.8rem)] leading-[0.9]">
            Start with the Tamil Nadu experience you want.
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {categories.map(([title, subtitle, image, to]) => (
              <Link key={title} to={to} className="group relative min-h-[330px] overflow-hidden rounded-md bg-black shadow-luxury">
                <img src={image} alt={title} loading="lazy" className="h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <h3 className="text-2xl font-black">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/70">{subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-[#f0c94a]">Featured destinations</p>
              <h2 className="mt-4 font-display text-[clamp(2.8rem,6vw,5.8rem)] leading-[0.9]">Major tourism hubs.</h2>
            </div>
            <Link to="/packages" className="w-fit rounded-md bg-white px-7 py-4 font-black text-[#10201e]">View packages</Link>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {destinations.map(([title, text, season, image, to], index) => (
              <motion.article
                key={title}
                className="overflow-hidden rounded-md border border-white/10 bg-white/5 shadow-luxury"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <Link to={to}>
                  <img src={image} alt={title} loading="lazy" className="h-64 w-full object-cover" />
                  <div className="p-6">
                    <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#f0c94a]">
                      0{index + 1} / Best {season}
                    </p>
                    <h3 className="mt-3 text-2xl font-black">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/65">{text}</p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Explore;
