import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-primary mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Understanding our process for wholesale medicine supply and how we can help you get the medicines you need.
          </p>
        </motion.div>

        {/* Main explanation section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="bg-white rounded-lg shadow-md p-8 mb-12"
        >
          <h3 className="text-2xl font-bold text-primary mb-6">Our Process</h3>
          <p className="text-gray-700 mb-8">
            What to expect after you request medicines that aren't readily available in your location.
          </p>

          {/* Process steps */}
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-primary font-bold text-xl">1</span>
              </div>
              <h4 className="font-bold text-lg mb-2">Request Medicines</h4>
              <p className="text-gray-600">
                Search for the medicines you need, add them to your cart, and submit your request with your details.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-primary font-bold text-xl">2</span>
              </div>
              <h4 className="font-bold text-lg mb-2">Receive Quote</h4>
              <p className="text-gray-600">
                We'll provide you with detailed paperwork and a price estimate, including medicine costs and any applicable fees.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-primary font-bold text-xl">3</span>
              </div>
              <h4 className="font-bold text-lg mb-2">Confirm Order</h4>
              <p className="text-gray-600">
                Once you accept the quote, we'll send you an order confirmation with payment instructions to proceed.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-primary font-bold text-xl">4</span>
              </div>
              <h4 className="font-bold text-lg mb-2">Receive Medicines</h4>
              <p className="text-gray-600">
                Our team will source your medicines and arrange safe shipping via trusted specialized carriers.
              </p>
            </div>
          </div>
        </motion.section>

        {/* What We Do Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white rounded-lg shadow-md p-8 mb-12"
        >
          <h3 className="text-2xl font-bold text-primary mb-4">What We Do</h3>
          <div className="space-y-4">
            <p className="text-gray-700">
              We help healthcare providers, pharmacies, and institutions find and import medicines that aren't readily available in their location. Our extensive network of suppliers and manufacturers allows us to source a wide range of pharmaceutical products.
            </p>
            <p className="text-gray-700">
              Whether you need specialty medications, hard-to-find generics, or bulk quantities of essential medicines, our team works diligently to meet your requirements while ensuring compliance with all applicable regulations.
            </p>
          </div>
        </motion.section>

        {/* FAQ Section - Condensed version */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-white rounded-lg shadow-md p-8"
        >
          <h3 className="text-2xl font-bold text-primary mb-6">Frequently Asked Questions</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold mb-2">How long does the process take?</h4>
              <p className="text-gray-700">
                The timeline varies depending on the medicine, source country, and destination. Typically, you can expect to receive a quote within 1-2 business days of your request. Once payment is confirmed, delivery times range from 1-4 weeks, depending on your location.
              </p>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold mb-2">What if I can't find the medicine I need?</h4>
              <p className="text-gray-700">
                If you can't find a specific medicine on our website, please contact us directly. Our extensive network often allows us to source products that aren't listed in our online catalog.
              </p>
            </div>
          </div>
        </motion.section>
      </div>
    </section>
  );
};

export default HowItWorksSection;
