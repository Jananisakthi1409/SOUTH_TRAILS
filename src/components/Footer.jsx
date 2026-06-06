import { motion } from "framer-motion";

const links = ["Explore", "Oracle", "Stories", "About", "Contact"];

const Footer = () => {
  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="footer-copy">
        <p className="footer-quote">
          Not every journey needs a destination.
          <br />
          Some begin with a feeling.
        </p>
      </div>
      <div className="footer-links">
        {links.map((link) => (
          <a key={link} href={`#${link.toLowerCase()}`}>
            {link}
          </a>
        ))}
      </div>
    </motion.footer>
  );
};

export default Footer;
