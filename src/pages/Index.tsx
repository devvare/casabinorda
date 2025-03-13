import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import SearchSection from '../components/SearchSection';
import HowItWorksSection from '../components/HowItWorksSection';
import LegalFrameworkSection from '../components/LegalFrameworkSection';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

const Index = () => {
  // Initialize animations visibility detection
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animated-element').forEach(element => {
      observer.observe(element);
    });

    return () => {
      document.querySelectorAll('.animated-element').forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen overflow-x-hidden"
    >
      <Header />
      <Hero />
      <About />
      <SearchSection />
      <HowItWorksSection />
      <LegalFrameworkSection />
      <Contact />
      <Footer />
    </motion.div>
  );
};

export default Index;
