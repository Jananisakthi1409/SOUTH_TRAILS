import { Link } from "react-router-dom";

const footerGroups = [
  {
    title: "Explore",
    links: [
      ["Destinations", "/explore"],
      ["Tour Packages", "/packages"],
      ["AI Planner", "/oracle"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About Us", "/about"],
      ["Contact", "/contact"],
      ["Help Center", "/help"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Privacy Policy", "/privacy"],
      ["Terms of Service", "/terms"],
      ["FAQ", "/faq"],
    ],
  },
];

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-[#bbf7d0] bg-[#166534] px-6 py-14 text-white md:px-12 lg:px-20">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link
              to="/"
              className="inline-flex items-center gap-3 text-2xl font-black text-white transition hover:text-[#dcfce7]"
              aria-label="South Trails Home"
            >
              <span className="grid h-10 w-10 place-items-center rounded-md bg-white text-sm font-black text-[#166534]">
                ST
              </span>
              South Trails
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/75">
              Discover South India through curated destination guides, packages, bookings, and practical travel support.
            </p>
            <div className="mt-7 flex gap-3">
              {["Facebook", "Instagram", "Twitter"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-white/15 bg-white/10 text-sm font-bold text-white/80 transition hover:bg-white hover:text-[#166534]"
                  aria-label={social}
                >
                  <span className="sr-only">{social}</span>
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {footerGroups.map((group) => (
              <div key={group.title} className={group.title === "Legal" ? "col-span-2 sm:col-span-1" : ""}>
                <h4 className="mb-4 text-sm font-black uppercase tracking-widest text-[#dcfce7]">
                  {group.title}
                </h4>
                <ul className="space-y-3 text-sm text-white/75">
                  {group.links.map(([label, to]) => (
                    <li key={to}>
                      <Link to={to} className="transition hover:text-white">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-6 sm:flex-row">
          <p className="text-xs text-white/65">
            &copy; {new Date().getFullYear()} South Trails. All rights reserved.
          </p>
          <span className="text-xs text-white/65">Based in South India</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
