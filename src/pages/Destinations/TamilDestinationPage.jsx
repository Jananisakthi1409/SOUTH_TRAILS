import { Link } from "react-router-dom";
import chennaiImg from "../state/tamilnadu/chennai/pexels-logalongwithme-28668658.webp";
import maduraiImg from "../state/tamilnadu/madurai/pexels-thilina-alagiyawanna-3266092-36609003.webp";
import rameswaramImg from "../state/tamilnadu/rameswaram/pexels-animesh-paul-150064-35620983.webp";
import ootyImg from "../state/tamilnadu/ooty/pexels-prasang-yadav-2151662075-37512272.webp";
import kodaikanalImg from "../state/tamilnadu/kodaikanal/pexels-rohit-george-1141376880-32236721.webp";
import kanyakumariImg from "../state/tamilnadu/kanyakumari/pexels-renjith-tomy-pkm-138432405-34327034.webp";
import coimbatoreImg from "../state/tamilnadu/coimbatore/pexels-aravind-ram-704633952-20459277.webp";
import chettinadImg from "../state/tamilnadu/chettinad/pexels-logalongwithme-28668658.webp";
import valparaiImg from "../state/tamilnadu/valparai/pexels-sreejith-m-u-322740174-13724240.webp";
import tamilNaduImg from "../../assets/images/tamilnadu.webp";

const imageMap = {
  Chennai: chennaiImg,
  Madurai: maduraiImg,
  Thanjavur: tamilNaduImg,
  Ooty: ootyImg,
  Kodaikanal: kodaikanalImg,
  Rameswaram: rameswaramImg,
  Kanyakumari: kanyakumariImg,
  Coimbatore: coimbatoreImg,
};

const defaultCopy = {
  Chennai: ["Heritage, coast, and urban culture", "Marina mornings, Kapaleeshwarar Temple, colonial heritage, museums, sabhas, food streets, and gateway drives to Mahabalipuram.", "Nov-Feb", "Most public beaches are free; museums/forts may have nominal fees.", "Sunrise to late evening by attraction."],
  Madurai: ["Temple heritage", "Meenakshi Amman Temple, Nayakkar Palace, jasmine markets, food walks, and living ritual traditions at the cultural heart of Tamil Nadu.", "Oct-Mar", "Temple entry is generally free; special darshan/museums may charge.", "Temple timings vary, commonly morning and evening windows."],
  Thanjavur: ["Chola heritage", "Brihadeeswarar Temple, bronze craft, palace museums, classical music memory, and fertile delta landscapes shaped by the Kaveri.", "Oct-Mar", "Temple entry free; museum/palace tickets apply.", "Daylight hours for monuments; temple rituals vary."],
  Ooty: ["Hill station", "Nilgiri tea gardens, toy train heritage, lake drives, botanical walks, viewpoints, and cool mountain stays.", "Oct-Jun", "Gardens, lake boats, and toy train are ticketed.", "Daytime sightseeing; viewpoints best morning/evening."],
  Kodaikanal: ["Hill station", "Lake loops, pine forests, Coaker's Walk, Pillar Rocks, mist trails, and relaxed weekend retreats.", "Sep-May", "Lake boating and select viewpoints may be ticketed.", "Daytime sightseeing; mist routes best before sunset."],
  Rameswaram: ["Spiritual coast", "Ramanathaswamy Temple, Pamban Bridge, Dhanushkodi, sacred wells, and coastal pilgrimage routes.", "Oct-Apr", "Temple entry free; special rituals and transport extra.", "Temple windows vary; Dhanushkodi is daytime only."],
  Kanyakumari: ["Coastal landmark", "Sunrise and sunset viewpoints, Vivekananda Rock Memorial, coastal temples, and the southern edge of mainland India.", "Oct-Mar", "Viewpoints free; ferry/monument tickets apply.", "Sunrise, ferry daytime, sunset evening."],
  Coimbatore: ["Western Tamil Nadu gateway", "Textiles, food, Marudhamalai, Pollachi drives, Valparai access, and foothill routes into nature and wellness.", "Sep-Mar", "City attractions vary; nature routes may need permits.", "Flexible city hours; hill routes by daylight."],
};

const nearby = ["Local food street", "Heritage walk", "Craft market", "Sunset viewpoint"];
const hotels = ["Premium city hotel", "Heritage stay", "Family resort", "Homestay experience"];
const reviewCards = [
  ["5.0", "Well planned route and clean travel guidance."],
  ["4.8", "Loved the food, culture, and nearby recommendations."],
  ["4.9", "The AI planner made the schedule realistic."],
];

const TamilDestinationPage = ({ name }) => {
  const destination = defaultCopy[name] || defaultCopy.Chennai;
  const image = imageMap[name] || tamilNaduImg;
  const gallery = [image, chettinadImg, valparaiImg, rameswaramImg].filter(Boolean);

  return (
    <main className="destination-detail-page min-h-screen bg-[#064e3b] font-sans text-white">
      <section className="relative min-h-[78vh] overflow-hidden px-5 py-24 sm:px-8 lg:px-12">
        <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-65" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,17,15,0.98),rgba(7,17,15,0.76),rgba(7,17,15,0.22))]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-[#0b6b43]">{destination[0]}</p>
          <h1 className="mt-5 max-w-5xl font-display text-[clamp(4rem,10vw,9rem)] uppercase leading-[0.82]">{name}</h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-white/72">{destination[1]}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/packages" className="rounded-md bg-[#0b6b43] px-7 py-4 font-black text-[#022c22]">View Packages</Link>
            <Link to="/trip-builder" className="rounded-md border border-white/15 bg-white/10 px-7 py-4 font-black text-white">Plan With AI</Link>
          </div>
        </div>
      </section>

      <section className="bg-[#ffffff] px-5 py-16 text-[#022c22] sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-[#0b6b43]">Photos Gallery</p>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {gallery.map((src, index) => (
              <img key={src} src={src} alt="" className={`h-72 w-full rounded-md object-cover shadow-luxury ${index === 0 ? "md:col-span-2" : ""}`} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-md border border-white/10 bg-white/5 p-6 shadow-luxury">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-[#0b6b43]">Overview & History</p>
            <h2 className="mt-3 text-4xl font-black">Why {name} matters</h2>
            <p className="mt-4 leading-8 text-white/70">
              {name} is one of Tamil Nadu's key travel anchors, combining local history,
              ritual, landscape, food, craft, and nearby routes into a package-ready destination.
            </p>
          </article>

          <div className="grid gap-5 sm:grid-cols-2">
            {[
              ["Best Time", destination[2]],
              ["Entry Fee", destination[3]],
              ["Timings", destination[4]],
              ["Rating", "4.9 / 5 traveler score"],
            ].map(([label, text]) => (
              <article key={label} className="rounded-md border border-white/10 bg-white/5 p-5 shadow-luxury">
                <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#0b6b43]">{label}</p>
                <p className="mt-3 text-sm leading-6 text-white/70">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#10201e] px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
          <article className="min-h-[360px] rounded-md border border-white/10 bg-[radial-gradient(circle_at_center,rgba(240,201,74,0.2),transparent_34%),linear-gradient(135deg,#183d39,#064e3b)] p-6 shadow-luxury">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-[#0b6b43]">Google Map</p>
            <h2 className="mt-3 text-3xl font-black">{name} route map</h2>
            <p className="mt-4 text-sm leading-6 text-white/65">Map embed placeholder ready for Google Maps API key integration.</p>
          </article>

          <InfoList title="Nearby Attractions" items={nearby} />
          <InfoList title="Hotels Nearby" items={hotels} />
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-[#0b6b43]">Reviews & Ratings</p>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {reviewCards.map(([rating, text]) => (
              <article key={text} className="rounded-md border border-white/10 bg-white/5 p-6 shadow-luxury">
                <strong className="text-4xl">{rating}</strong>
                <p className="mt-4 text-sm leading-6 text-white/65">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

const InfoList = ({ title, items }) => (
  <article className="rounded-md border border-white/10 bg-white/5 p-6 shadow-luxury">
    <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-[#0b6b43]">{title}</p>
    <div className="mt-5 grid gap-3">
      {items.map((item) => (
        <div key={item} className="rounded-md bg-white/10 p-4 text-sm font-bold text-white/80">{item}</div>
      ))}
    </div>
  </article>
);

export default TamilDestinationPage;
