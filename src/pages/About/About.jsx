import { motion } from "framer-motion";

const About = () => {
  return (
    <main className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="relative px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-4xl"
        >
          <span className="mb-4 block text-sm font-bold uppercase tracking-[0.2em] text-[#f0c94a]">
            Our Story
          </span>
          <h1 className="mb-6 font-display text-5xl text-white md:text-7xl">
            Unveiling the Soul of <br className="hidden md:block" />
            <span className="text-[#f0c94a]">South India</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-[#f5efe6]/70 leading-relaxed">
            Tamil Trails is more than a travel platform; it's a love letter to Tamil Nadu. We curate premium, culturally immersive journeys that connect travelers with the ancient heritage, vibrant festivals, and serene landscapes of the South.
          </p>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl rounded-3xl bg-[#030a0c] p-10 md:p-20 shadow-luxury border border-white/5">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-6 font-display text-3xl text-white md:text-4xl">Our Mission</h2>
              <p className="mb-6 text-[#f5efe6]/70 leading-relaxed">
                We believe that travel should be transformative. Our mission is to elevate tourism in Tamil Nadu by combining world-class technology with authentic local experiences.
              </p>
              <p className="text-[#f5efe6]/70 leading-relaxed">
                Whether you're exploring the towering gopurams of Madurai, seeking peace in the tea estates of Ooty, or discovering the rich culinary traditions of Chettinad, we are your trusted guides.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square overflow-hidden rounded-2xl bg-[#12302d]"
            >
              {/* Fallback image container since we don't have absolute paths to actual assets yet */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#12302d] to-[#07110f]">
                <span className="font-display text-9xl text-white/5">TT</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="mb-16 font-display text-3xl text-white md:text-4xl">What Drives Us</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Authenticity",
                desc: "We partner with local guides and communities to provide genuine cultural experiences.",
              },
              {
                title: "Sustainability",
                desc: "Promoting eco-tourism and responsible travel to protect our heritage for future generations.",
              },
              {
                title: "Innovation",
                desc: "Using AI and advanced technology to create seamless, personalized travel planning.",
              },
            ].map((value, idx) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-8 text-left glass"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#2f7dd3]/20 text-[#2f7dd3]">
                  ✦
                </div>
                <h3 className="mb-3 font-display text-xl text-white">{value.title}</h3>
                <p className="text-sm text-[#f5efe6]/70 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
