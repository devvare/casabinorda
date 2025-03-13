import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerClass = `fixed top-0 w-full z-50 transition-all duration-300 ${
    isScrolled ? 'py-3 bg-white/90 backdrop-blur-md shadow-sm' : 'py-5 bg-transparent'
  }`;

  const logoVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: custom => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: "easeOut",
        delay: custom * 0.1 
      }
    })
  };

  const navItems = [
    { name: 'Home', href: '/', isPageLink: true },
    { name: 'About', href: '/#about', isPageLink: true, isAnchor: true },
    { name: 'Search', href: '/#search', isPageLink: true, isAnchor: true },
    { name: 'How It Works', href: '/#how-it-works', isPageLink: true, isAnchor: true },
    { name: 'Legal Framework', href: '/#legal-framework', isPageLink: true, isAnchor: true },
    { name: 'Contact', href: '/#contact', isPageLink: true, isAnchor: true }
  ];

  // Function to handle smooth scrolling for anchor links
  const handleAnchorClick = (e, href) => {
    e.preventDefault();
    
    // If we're not on the home page, navigate to home page first
    if (location.pathname !== '/') {
      window.location.href = href;
      return;
    }
    
    // Extract the anchor part
    const anchor = href.split('#')[1];
    if (!anchor) return;
    
    const element = document.getElementById(anchor);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={headerClass}>
      <div className="container-tight flex items-center justify-between">
        <motion.div 
          variants={logoVariants}
          initial="hidden"
          animate="visible"
          className="flex-shrink-0"
        >
          <Link 
            to="/" 
            className="font-display font-bold text-2xl"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span className="text-primary">CASA</span>
            <span className="text-foreground">BINORDA</span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              custom={index}
              variants={navItemVariants}
              initial="hidden"
              animate="visible"
            >
              {item.isAnchor ? (
                <a
                  href={item.href}
                  onClick={(e) => handleAnchorClick(e, item.href)}
                  className="text-foreground/80 hover:text-primary transition-colors font-medium"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  to={item.href}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-foreground/80 hover:text-primary transition-colors font-medium"
                >
                  {item.name}
                </Link>
              )}
            </motion.div>
          ))}
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-foreground"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X size={24} className="text-primary" />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white w-full shadow-lg"
        >
          <div className="container-tight py-4 flex flex-col space-y-4">
            {navItems.map((item, index) => (
              item.isAnchor ? (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    handleAnchorClick(e, item.href);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-foreground/80 hover:text-primary py-2 transition-colors font-medium"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-foreground/80 hover:text-primary py-2 transition-colors font-medium"
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
