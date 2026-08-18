import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative mt-24 border-t border-white/10 bg-[#030a0c] px-6 py-20 text-[#f5efe6] md:px-12 lg:px-24">
      {/* Decorative top border glow */}
      <div className="absolute top-0 left-1/2 h-[1px] w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#f0c94a]/30 to-transparent"></div>

      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <Link to="/" className="inline-block text-3xl font-display text-white transition hover:text-[#f0c94a]" aria-label="Tamil Trails Home">
              Tamil <span className="text-[#f0c94a]">Trails</span>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-[#f5efe6]/70">
              Discover the soul of South India. We curate premium, immersive journeys through Tamil Nadu's ancient temples, serene hills, and vibrant culture.
            </p>
            <div className="mt-8 flex gap-4">
              {['Facebook', 'Instagram', 'Twitter'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-sm text-[#f5efe6]/70 transition hover:bg-[#f0c94a] hover:text-[#030a0c]"
                  aria-label={social}
                >
                  <span className="sr-only">{social}</span>
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-7 sm:grid-cols-3">
            <div>
              <h4 className="mb-6 font-display text-lg text-white">Explore</h4>
              <ul className="space-y-4 text-sm text-[#f5efe6]/60">
                <li><Link to="/explore" className="transition hover:text-[#f0c94a]">Destinations</Link></li>
                <li><Link to="/packages" className="transition hover:text-[#f0c94a]">Tour Packages</Link></li>
                <li><Link to="/oracle" className="transition hover:text-[#f0c94a]">AI Planner</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="mb-6 font-display text-lg text-white">Company</h4>
              <ul className="space-y-4 text-sm text-[#f5efe6]/60">
                <li><Link to="/about" className="transition hover:text-[#f0c94a]">About Us</Link></li>
                <li><Link to="/contact" className="transition hover:text-[#f0c94a]">Contact</Link></li>
                <li><Link to="/help" className="transition hover:text-[#f0c94a]">Help Center</Link></li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h4 className="mb-6 font-display text-lg text-white">Legal</h4>
              <ul className="space-y-4 text-sm text-[#f5efe6]/60">
                <li><Link to="/privacy" className="transition hover:text-[#f0c94a]">Privacy Policy</Link></li>
                <li><Link to="/terms" className="transition hover:text-[#f0c94a]">Terms of Service</Link></li>
                <li><Link to="/faq" className="transition hover:text-[#f0c94a]">FAQ</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-[#f5efe6]/50">
            &copy; {new Date().getFullYear()} Tamil Trails. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-[#f5efe6]/50">
            <span>Made with precision</span>
            <span className="text-[#f0c94a]">✦</span>
            <span>Based in Tamil Nadu</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
