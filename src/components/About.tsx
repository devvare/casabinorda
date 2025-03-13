import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Shield, TrendingUp, Heart, Users } from 'lucide-react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  const features = [
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Reliable Supply",
      description: "All our medicines are supplied in accordance with legal regulations."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-primary" />,
      title: "Wide Product Range",
      description: "We are at your service with our portfolio of 2500+ medicines and active ingredients."
    },
    {
      icon: <Heart className="w-8 h-8 text-primary" />,
      title: "Quality Focused",
      description: "We work meticulously on proper storage and distribution of medicines."
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Professional Team",
      description: "We provide fast and effective solutions to your needs with our expert staff."
    }
  ];

  const containerVariants = {
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
    <section id="about" className="py-16 md:py-24 bg-secondary/50">
      <div className="container-tight">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary mb-4"
          >
            About Us
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            What is CASABINORDA?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-foreground/70"
          >
            CASABINORDA is a reliable wholesale medicine supplier for the healthcare sector. We are a leader in the industry with our wide product range, professional service approach, and customer-oriented philosophy.
          </motion.p>
        </div>
        
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              custom={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
            >
              <div className="w-14 h-14 mb-6 rounded-full flex items-center justify-center bg-primary/10">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-foreground/70">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
