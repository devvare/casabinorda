import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const footerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <footer className="py-12 bg-white border-t border-gray-100">
      <div className="container-tight">
        <motion.div 
          variants={footerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col md:flex-row justify-between items-center"
        >
          <motion.div variants={itemVariants} className="mb-6 md:mb-0">
            <a href="#" className="text-primary font-display font-bold text-2xl">
              CASABINORDA
            </a>
            <p className="text-gray-500 mt-2">
              Reliable and professional wholesale medicine supplier
            </p>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8"
          >
            <a href="#about" className="text-gray-500 hover:text-primary transition-colors">
              About Us
            </a>
            <a href="#search" className="text-gray-500 hover:text-primary transition-colors">
              Medicine Search
            </a>
            <a href="#contact" className="text-gray-500 hover:text-primary transition-colors">
              Contact
            </a>
          </motion.div>
        </motion.div>
        
        <motion.div
          variants={footerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-12 pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center"
        >
          <motion.p variants={itemVariants} className="text-gray-500 text-sm mb-4 md:mb-0">
            {new Date().getFullYear()} CASABINORDA. All rights reserved.
          </motion.p>
          
          <motion.button
            variants={itemVariants}
            onClick={scrollToTop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
