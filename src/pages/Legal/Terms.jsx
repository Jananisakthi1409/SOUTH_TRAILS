const Terms = () => {
  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-12">
          <h1 className="mb-4 font-display text-4xl text-white md:text-5xl">Terms of Service</h1>
          <p className="text-[#f5efe6]/50 text-sm">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="prose prose-invert max-w-none text-[#f5efe6]/70">
          <h2 className="text-2xl font-display text-white mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="mb-6">
            By accessing and using Tamil Trails ("the Platform"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Platform.
          </p>

          <h2 className="text-2xl font-display text-white mt-12 mb-4">2. Services Description</h2>
          <p className="mb-6">
            Tamil Trails provides curated travel packages, itineraries, and booking services for destinations within Tamil Nadu, India. We act as an intermediary between users and local service providers (hotels, transport, guides).
          </p>

          <h2 className="text-2xl font-display text-white mt-12 mb-4">3. Booking and Payments</h2>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>All bookings are subject to availability.</li>
            <li>Prices are subject to change without notice prior to booking confirmation.</li>
            <li>Full payment or a specified deposit is required to secure a booking.</li>
            <li>Payment processing is handled by secure third-party gateways.</li>
          </ul>

          <h2 className="text-2xl font-display text-white mt-12 mb-4">4. Cancellations and Refunds</h2>
          <p className="mb-6">
            Cancellation policies vary by package and service provider. Generally:
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>Cancellations made 30+ days before travel: Full refund minus processing fees.</li>
            <li>Cancellations made 15-29 days before travel: 50% refund.</li>
            <li>Cancellations made under 15 days before travel: No refund.</li>
          </ul>

          <h2 className="text-2xl font-display text-white mt-12 mb-4">5. Limitation of Liability</h2>
          <p className="mb-8">
            Tamil Trails is not liable for any direct, indirect, incidental, or consequential damages resulting from the use of our services or any issues arising from third-party service providers.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Terms;
