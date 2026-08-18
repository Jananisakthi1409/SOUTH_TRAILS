import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const stats = [
  { value: "500+", label: "Curated Packages" },
  { value: "12K+", label: "Happy Travelers" },
  { value: "150+", label: "Local Partners" },
  { value: "98%", label: "Satisfaction Rate" },
];

const values = [
  {
    icon: "🏛️",
    title: "Authenticity",
    desc: "We partner with local guides and communities to provide genuine cultural experiences rooted in the ancient traditions of Tamil Nadu.",
  },
  {
    icon: "🌿",
    title: "Sustainability",
    desc: "Promoting eco-tourism and responsible travel to protect our heritage for generations to come, supporting local livelihoods along the way.",
  },
  {
    icon: "✨",
    title: "Innovation",
    desc: "Leveraging AI and advanced technology to create seamless, personalized travel planning experiences tailored uniquely to you.",
  },
  {
    icon: "🤝",
    title: "Community",
    desc: "Every trip supports local artisans, guides, and small businesses. Travel with us means investing directly in the communities you visit.",
  },
  {
    icon: "🎯",
    title: "Excellence",
    desc: "We obsess over every detail — from handpicked accommodations to perfectly timed itineraries — so you never have to worry.",
  },
  {
    icon: "🔒",
    title: "Trust",
    desc: "Transparent pricing, no hidden fees, and a dedicated team that's always a call away. Your trust is the foundation of everything we do.",
  },
];

const team = [
  {
    name: "Priya Ramasubramanian",
    role: "Founder & CEO",
    bio: "A passionate Tamil Nadu native with 15 years in luxury travel. Priya built South Trails to share the wonders of her homeland with the world.",
    initials: "PR",
  },
  {
    name: "Arjun Krishnaswamy",
    role: "Head of Experiences",
    bio: "Former heritage archaeologist turned experience designer. Arjun curates itineraries that connect travelers to 2,000+ years of living history.",
    initials: "AK",
  },
  {
    name: "Deepa Chandrasekaran",
    role: "AI & Technology Lead",
    bio: "Ex-Google engineer who believes technology should feel human. Deepa powers our AI planner and personalization engine.",
    initials: "DC",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
};

const About = () => {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#1f2937]">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-6 pb-20 pt-28 text-center bg-gradient-to-b from-[#f0fdf4] to-[#f8fafc]">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="relative mx-auto max-w-4xl"
        >
          <span className="mb-4 inline-block rounded-full border border-[#dcfce7] bg-[#dcfce7]/60 px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#166534]">
            Our Story
          </span>
          <h1 className="mb-6 font-display text-4xl font-extrabold leading-tight text-[#1f2937] md:text-6xl">
            Unveiling the Soul of{" "}
            <span className="text-[#15803d]">South India</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#6b7280]">
            South Trails is more than a travel platform — it's a love letter to Tamil Nadu. We curate
            premium, culturally immersive journeys that connect travelers with ancient heritage,
            vibrant festivals, and serene landscapes of the South.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/packages"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-[#15803d] px-6 text-sm font-semibold text-white transition hover:bg-[#166534]"
            >
              Explore Packages
            </Link>
            <Link
              to="/contact"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-[#e5e7eb] bg-white px-6 text-sm font-semibold text-[#1f2937] transition hover:border-[#15803d] hover:text-[#15803d]"
            >
              Get in Touch
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── Stats ── */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 gap-4 rounded-2xl border border-[#e5e7eb] bg-white p-8 shadow-sm lg:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="text-center"
              >
                <p className="font-display text-3xl font-bold text-[#15803d] md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-medium text-[#6b7280]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white p-8 shadow-sm md:p-12">
            <div className="grid gap-10 md:grid-cols-2 md:items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <span className="mb-3 block text-xs font-bold uppercase tracking-wider text-[#15803d]">
                  Our Mission
                </span>
                <h2 className="mb-4 font-display text-2xl font-bold text-[#1f2937] md:text-3xl">
                  Travel that transforms, not just transfers.
                </h2>
                <p className="mb-4 text-sm leading-relaxed text-[#6b7280]">
                  We believe the best journeys don't just show you places — they change how you see the world.
                  Our mission is to elevate tourism in Tamil Nadu by combining world-class technology
                  with deep, authentic local experiences.
                </p>
                <p className="text-sm leading-relaxed text-[#6b7280]">
                  Whether you're exploring the towering gopurams of Madurai, seeking peace in the tea
                  estates of Ooty, or discovering the rich culinary traditions of Chettinad, we are your
                  trusted guides — before, during, and after your journey.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative rounded-xl border border-[#e5e7eb] bg-[#f0fdf4] p-8 text-center"
              >
                <div className="mb-4 text-5xl">🕌</div>
                <p className="font-display text-lg font-semibold text-[#166534]">
                  "Tamil Nadu is not just a destination. It is an experience of a lifetime."
                </p>
                <span className="mt-3 block text-xs font-bold text-[#15803d]">— South Trails Team</span>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-10 text-center"
          >
            <span className="mb-3 block text-xs font-bold uppercase tracking-wider text-[#15803d]">
              What Drives Us
            </span>
            <h2 className="font-display text-2xl font-bold text-[#1f2937] md:text-3xl">
              Our core values
            </h2>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm transition hover:border-[#15803d]/40"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#f0fdf4] text-xl text-[#15803d]">
                  {value.icon}
                </div>
                <h3 className="mb-2 font-display text-lg font-bold text-[#1f2937]">{value.title}</h3>
                <p className="text-xs leading-relaxed text-[#6b7280]">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-10 text-center"
          >
            <span className="mb-3 block text-xs font-bold uppercase tracking-wider text-[#15803d]">
              The People Behind the Magic
            </span>
            <h2 className="font-display text-2xl font-bold text-[#1f2937] md:text-3xl">Meet our team</h2>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="rounded-xl border border-[#e5e7eb] bg-white p-6 text-center shadow-sm"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#15803d] text-lg font-bold text-white">
                  {member.initials}
                </div>
                <h3 className="mb-1 font-display text-base font-bold text-[#1f2937]">{member.name}</h3>
                <p className="mb-3 text-xs font-bold text-[#15803d]">{member.role}</p>
                <p className="text-xs leading-relaxed text-[#6b7280]">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 pb-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mx-auto max-w-4xl rounded-2xl bg-[#166534] p-10 text-center shadow-sm text-white"
        >
          <div className="mb-3 text-4xl">🌅</div>
          <h2 className="mb-4 font-display text-2xl font-bold md:text-3xl">
            Ready to begin your South India story?
          </h2>
          <p className="mx-auto mb-8 max-w-lg text-sm leading-relaxed text-white/80">
            Join thousands of travelers who've discovered the magic of Tamil Nadu with South Trails.
            Let us craft your perfect journey.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/packages"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-white px-6 text-sm font-bold text-[#166534] transition hover:bg-[#f0fdf4]"
            >
              Browse Packages
            </Link>
            <Link
              to="/oracle"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-white/30 px-6 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Try AI Planner
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default About;
