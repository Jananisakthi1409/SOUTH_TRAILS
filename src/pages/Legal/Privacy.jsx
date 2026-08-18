const Privacy = () => {
  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-12">
          <h1 className="mb-4 font-display text-4xl text-white md:text-5xl">Privacy Policy</h1>
          <p className="text-[#f5efe6]/50 text-sm">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="prose prose-invert max-w-none text-[#f5efe6]/70">
          <p className="text-lg mb-8 text-white">
            Tamil Trails ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by Tamil Trails.
          </p>

          <h2 className="text-2xl font-display text-white mt-12 mb-4">1. Information We Collect</h2>
          <p className="mb-6">
            We collect information from you when you register on our site, place an order, subscribe to our newsletter, respond to a survey, or fill out a form.
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>Name, email address, mailing address, phone number</li>
            <li>Payment information (processed securely through our payment providers)</li>
            <li>Travel preferences and booking history</li>
            <li>Device and usage information through cookies</li>
          </ul>

          <h2 className="text-2xl font-display text-white mt-12 mb-4">2. How We Use Your Information</h2>
          <p className="mb-6">
            Any of the information we collect from you may be used in one of the following ways:
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>To personalize your experience and deliver curated travel recommendations</li>
            <li>To improve our website and customer service</li>
            <li>To process transactions and manage your bookings</li>
            <li>To send periodic emails regarding your order or other products and services</li>
          </ul>

          <h2 className="text-2xl font-display text-white mt-12 mb-4">3. Data Security</h2>
          <p className="mb-8">
            We implement a variety of security measures to maintain the safety of your personal information. All supplied sensitive/credit information is transmitted via Secure Socket Layer (SSL) technology and then encrypted into our Payment gateway providers database.
          </p>

          <h2 className="text-2xl font-display text-white mt-12 mb-4">4. Third-Party Disclosure</h2>
          <p className="mb-8">
            We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
          </p>

          <h2 className="text-2xl font-display text-white mt-12 mb-4">5. Contact Us</h2>
          <p className="mb-8">
            If there are any questions regarding this privacy policy, you may contact us using the information on our Contact page.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Privacy;
