import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-white text-gray-800 px-6 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-red-600 mb-4">About SelfShop E-Commerce</h1>
        <p className="text-lg text-gray-600">Empowering your shopping experience — fast, secure, and smart.</p>
        <div className="mt-6 w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Our Story */}
        <section>
          <h2 className="text-2xl font-bold text-red-600 mb-4">Our Story</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Launched in 2025, SelfShope E-Commerce is an innovation-driven platform that redefines online shopping.
            We're passionate about making e-commerce easier, more enjoyable, and trustworthy for everyone —
            whether you're shopping from a metro city or a small town.
          </p>
        </section>

        {/* Our Mission */}
        <section>
          <h2 className="text-2xl font-bold text-red-600 mb-4">Our Mission</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            To revolutionize e-commerce by delivering products faster, providing safe and secure payments,
            and always putting customers first. We strive to blend technology with a human touch in every order.
          </p>
        </section>

        {/* Why Choose Us */}
        <section>
          <h2 className="text-2xl font-bold text-red-600 mb-4">Why Choose Us</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 text-lg">
            <li><span className="font-semibold">🚀 Fast Delivery:</span> We process and ship orders at lightning speed.</li>
            <li><span className="font-semibold">🔐 Secure Transactions:</span> Shop confidently with our encrypted systems.</li>
            <li><span className="font-semibold">📞 24/7 Support:</span> Help is just a click away — anytime, anywhere.</li>
            <li><span className="font-semibold">🌍 Eco-Friendly:</span> We use sustainable packaging and logistics wherever possible.</li>
          </ul>
        </section>

        {/* Meet the Team */}
        <section>
          <h2 className="text-2xl font-bold text-red-600 mb-4">Meet the Team</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Our team of passionate innovators, creative designers, and dedicated support staff work tirelessly
            to deliver a world-class experience. At SelfShope, every customer matters.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
