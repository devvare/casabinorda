import React from 'react';
import { motion } from 'framer-motion';

const LegalFrameworkSection = () => {
  return (
    <section id="legal-framework" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-primary mb-4">Legal Framework</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Understanding the legal aspects of our pharmaceutical services and how we ensure compliance with regulations.
          </p>
        </motion.div>

        <div className="grid gap-12">
          {/* Legal Status and Licenses Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-md p-8"
          >
            <h3 className="text-2xl font-bold text-primary mb-4">Legal Status and Licenses</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-xl font-semibold mb-2">Who We Are</h4>
                <p className="text-gray-700">
                  Casa Pharmacy is a licensed pharmaceutical service provider operating under the regulations of the Ministry of Health. We are committed to providing safe, legal, and high-quality pharmaceutical services to our customers.
                </p>
              </div>
              
              <div>
                <h4 className="text-xl font-semibold mb-2">Our Licenses and Certifications</h4>
                <p className="text-gray-700">
                  We hold all necessary licenses and certifications required to operate as a pharmaceutical service provider. These include:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                  <li>Pharmaceutical Wholesale License</li>
                  <li>Good Distribution Practice (GDP) Certification</li>
                  <li>Import/Export Authorization</li>
                  <li>Quality Management System Certification</li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Pharmaceutical Supply and Distribution Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-md p-8"
          >
            <h3 className="text-2xl font-bold text-primary mb-4">Pharmaceutical Supply and Distribution</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-xl font-semibold mb-2">Named Patient Import</h4>
                <p className="text-gray-700">
                  We operate under the Named Patient Import regulations, which allow for the import of medicines that aren't available locally when prescribed by a healthcare professional for a specific patient. This legal framework ensures patients can access necessary medications that may not be commercially available in their country.
                </p>
              </div>
              
              <div>
                <h4 className="text-xl font-semibold mb-2">Cross-Border Supply</h4>
                <p className="text-gray-700">
                  Our cross-border pharmaceutical supply services comply with international regulations governing the movement of medicinal products. We ensure all necessary documentation, including certificates of analysis, certificates of pharmaceutical product (CPP), and appropriate customs documentation, accompanies each shipment.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Pharmaceutical Safety and Quality Assurance Section - Condensed */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-md p-8"
          >
            <h3 className="text-2xl font-bold text-primary mb-4">Pharmaceutical Safety and Quality Assurance</h3>
            <div className="space-y-4">
              <p className="text-gray-700">
                We maintain strict quality control measures throughout our supply chain. All medicines are sourced from licensed manufacturers and distributors, and we maintain complete traceability from the manufacturer to the end user. Our temperature-controlled storage and transportation ensure that medicines maintain their efficacy and safety.
              </p>
              <p className="text-gray-700">
                We adhere to pharmacovigilance requirements, monitoring and reporting any adverse events associated with the medicines we supply. Our quality management system includes regular audits and inspections to ensure compliance with all applicable regulations.
              </p>
            </div>
          </motion.section>
        </div>
      </div>
    </section>
  );
};

export default LegalFrameworkSection;
