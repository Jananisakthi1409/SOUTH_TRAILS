import { Link } from "react-router-dom";

import ootyImg from "../state/tamilnadu/ooty/pexels-renjith-tomy-pkm-138432405-34327034.webp";
import maduraiImg from "../state/tamilnadu/madurai/pexels-thilina-alagiyawanna-3266092-36609003.webp";
import kodaikanalImg from "../state/tamilnadu/kodaikanal/pexels-rohit-george-1141376880-32236721.webp";
import rameswaramImg from "../state/tamilnadu/rameswaram/pexels-animesh-paul-150064-35620983.webp";
import kanyakumariImg from "../state/tamilnadu/kanyakumari/pexels-prasang-yadav-2151662075-37512272.webp";
import chettinadImg from "../state/tamilnadu/chettinad/pexels-logalongwithme-28668658.webp";
import valparaiImg from "../state/tamilnadu/valparai/pexels-sreejith-m-u-322740174-13724240.webp";

const featureConfigs = {
  itinerary: {
    eyebrow: "Itinerary Builder",
    title: "Day-wise Tamil Nadu schedule builder.",
    copy: "Draft, save, print, and share a complete Tamil Nadu trip plan.",
    image: kodaikanalImg,
    cta: ["Open AI planner", "/trip-builder"],
    cards: [
      ["Day-wise Schedule", "Morning, afternoon, evening plans with route notes and meal stops."],
      ["Save Itinerary", "Persist trip drafts in the browser and connect to profiles later."],
      ["Download PDF", "Print-ready itinerary export using the browser print flow."],
      ["Share with Friends", "Shareable trip summary cards for group planning."],
    ],
  },
  stays: {
    eyebrow: "Hotels & Stays",
    title: "Hotels, resorts, and homestays near every route.",
    copy: "A stay discovery layer with price, rating, and travel-style filters.",
    image: ootyImg,
    cta: ["Request stay help", "/contact"],
    cards: [
      ["Heritage Hotels", "Chettinad mansions, temple-town hotels, and boutique stays."],
      ["Hill Resorts", "Ooty, Kodaikanal, Valparai, Yercaud, and eco retreats."],
      ["Homestays", "Host-led rural stays and food-led cultural experiences."],
      ["Price & Rating Filters", "Budget, premium, luxury, family, and review-based sorting."],
    ],
  },
  food: {
    eyebrow: "Food & Culture",
    title: "Cuisine, festivals, shopping, and living culture.",
    copy: "Tamil Nadu is best explored through meals, music, rituals, craft, and local markets.",
    image: chettinadImg,
    cta: ["Plan food trail", "/trip-builder"],
    cards: [
      ["Famous Foods", "Chettinad meals, Jigarthanda, filter coffee, Kongu cuisine, seafood."],
      ["Traditional Festivals", "Pongal, Chithirai, Karthigai Deepam, Natyanjali, Margazhi."],
      ["Local Culture", "Bharatanatyam, Carnatic music, kolam, bronze craft, silk weaving."],
      ["Shopping Areas", "Kanchipuram silk, Tanjore paintings, Madurai markets, craft streets."],
    ],
  },
  travelInfo: {
    eyebrow: "Travel Information",
    title: "Weather, safety, transport, and essential local guidance.",
    copy: "Practical travel information for confident Tamil Nadu trip planning.",
    image: rameswaramImg,
    cta: ["Build safe route", "/trip-builder"],
    cards: [
      ["Weather", "Hill stations are cool, coastal routes are humid, monsoon routes need buffers."],
      ["Travel Tips", "Carry temple-friendly clothing, book hill stays early, plan long drives by daylight."],
      ["Emergency Contacts", "Police 100, Ambulance 108, Fire 101, Tourism support via enquiry form."],
      ["Local Transport", "Rail, intercity buses, cabs, autos, toy train, ferries, and guided vans."],
    ],
  },
  gallery: {
    eyebrow: "Gallery",
    title: "Photos, videos, and virtual preview moments.",
    copy: "A media wall for cinematic Tamil Nadu travel inspiration.",
    image: kanyakumariImg,
    cta: ["View destinations", "/explore"],
    gallery: [ootyImg, kodaikanalImg, maduraiImg, rameswaramImg, kanyakumariImg, chettinadImg, valparaiImg],
    cards: [
      ["Photos", "Destination photography from hills, temples, coast, craft, and food routes."],
      ["Videos", "Hero-ready visual stories for premium landing pages."],
      ["360 Views", "Virtual tour placeholders ready for Pannellum or embedded panoramas."],
      ["Creator Wall", "Future user-generated photo reviews and travel stories."],
    ],
  },
  blog: {
    eyebrow: "Blog & Guides",
    title: "Guides, hidden gems, travel tips, and festival stories.",
    copy: "Editorial content to help travelers choose the right route and season.",
    image: valparaiImg,
    cta: ["Explore places", "/explore"],
    cards: [
      ["Travel Guides", "3-day Ooty, temple circuit, Chettinad weekend, and coast-to-coast ideas."],
      ["Hidden Gems", "Valparai, Yercaud, Sittanavasal, Pichavaram, Kolli Hills, Dhanushkodi."],
      ["Travel Tips", "Packing, local transport, best seasons, bookings, and etiquette."],
      ["Festival Guides", "Pongal, Margazhi, Chithirai, Karthigai, Natyanjali, and temple calendars."],
    ],
  },
  wishlist: {
    eyebrow: "Wishlist",
    title: "Save, compare, and shortlist trips.",
    copy: "Wishlist workflows connect destination discovery with booking decisions.",
    image: ootyImg,
    cta: ["Open profile", "/profile"],
    cards: [
      ["Save Destinations", "Keep places and routes for later planning."],
      ["Save Packages", "Use the package cards to save favorites after login."],
      ["Compare Trips", "Compare package duration, price, places, and rating."],
      ["Ready to Book", "Move shortlisted plans into the booking flow."],
    ],
  },
  reviews: {
    eyebrow: "Reviews & Ratings",
    title: "Star ratings, user reviews, and photo review readiness.",
    copy: "Trust signals for every destination, package, stay, and trip route.",
    image: maduraiImg,
    cta: ["Open dashboard", "/profile"],
    cards: [
      ["User Reviews", "Travelers can submit reviews from booking history."],
      ["Star Rating", "Package cards already support rating-based filtering."],
      ["Photo Reviews", "Gallery-ready review cards for future uploads."],
      ["Moderation", "Admin review screens are available in the admin panel."],
    ],
  },
  premium: {
    eyebrow: "Premium Features",
    title: "AI chatbot, virtual tour, map, voice, language, dark mode.",
    copy: "A complete premium roadmap with working entry points and frontend-ready experiences.",
    image: rameswaramImg,
    cta: ["Ask AI chatbot", "/oracle"],
    cards: [
      ["AI Chatbot", "Use the South Trails oracle for routes, packages, and travel guidance."],
      ["Virtual Tour", "360 preview pages for temples, coast, and hills."],
      ["Interactive Tamil Nadu Map", "Map explorer connects pins with packages and destination guides."],
      ["Voice, Language, Dark Mode", "Frontend-ready premium controls for future platform integration."],
    ],
  },
};

const TravelFeaturePage = ({ type = "premium" }) => {
  const config = featureConfigs[type] || featureConfigs.premium;

  return (
    <main className="min-h-screen bg-[#064e3b] font-sans text-white">
      <section className="relative overflow-hidden px-5 py-24 sm:px-8 lg:px-12">
        <img src={config.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,17,15,0.98),rgba(7,17,15,0.78),rgba(7,17,15,0.34))]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-[#0b6b43]">{config.eyebrow}</p>
          <h1 className="mt-5 max-w-5xl font-display text-[clamp(3.8rem,9vw,8rem)] uppercase leading-[0.82]">
            {config.title}
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-white/70">{config.copy}</p>
          <Link to={config.cta[1]} className="mt-8 inline-flex rounded-md bg-[#0b6b43] px-7 py-4 font-black text-[#022c22]">
            {config.cta[0]}
          </Link>
        </div>
      </section>

      {config.gallery && (
        <section className="bg-[#ffffff] px-5 py-16 sm:px-8 lg:px-12">
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3 xl:grid-cols-4">
            {config.gallery.map((src, index) => (
              <img key={src} src={src} alt="" className={`h-72 w-full rounded-md object-cover shadow-luxury ${index === 0 ? "md:col-span-2" : ""}`} />
            ))}
          </div>
        </section>
      )}

      <section className="px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-4">
          {config.cards.map(([title, text]) => (
            <article key={title} className="rounded-md border border-white/10 bg-white/5 p-6 shadow-luxury">
              <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#0b6b43]">South Trails</p>
              <h2 className="mt-3 text-2xl font-black">{title}</h2>
              <p className="mt-4 text-sm leading-6 text-white/65">{text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default TravelFeaturePage;
