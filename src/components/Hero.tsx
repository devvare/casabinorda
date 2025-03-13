import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section id="home" className="pt-28 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="container-tight relative">
        {/* Background decorative element */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto text-center relative z-10"
        >
          <motion.div variants={itemVariants} className="mb-4">
            <span className="inline-block text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
              Wholesale Medicine Supply
            </span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            Reliable and professional <span className="text-primary">medicine supply</span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-foreground/70 mb-8 md:mb-10"
          >
            CASABINORDA provides reliable, fast, and professional wholesale medicine supply services to the healthcare sector.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.a
              href="#search"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-primary text-white rounded-lg font-medium inline-flex items-center justify-center gap-2 shadow-sm shadow-primary/20 hover:shadow-md hover:shadow-primary/30 transition-all"
            >
              Search Medicines
              <ArrowRight size={16} />
            </motion.a>
            
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-white border border-primary/20 text-primary rounded-lg font-medium inline-flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all"
            >
              Contact Us
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Subtle wave decoration */}
      <div className="w-full h-16 mt-16 overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full">
          <path fill="#f1f5f9" fillOpacity="1" d="M0,192L60,181.3C120,171,240,149,360,154.7C480,160,600,192,720,202.7C840,213,960,203,1080,176C1200,149,1320,107,1380,85.3L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
