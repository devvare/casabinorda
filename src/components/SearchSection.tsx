import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search } from 'lucide-react';
import { Medicine } from '../types/medicine';
import { mockMedicines } from '../data/mockMedicines';
import SearchResults from './search/SearchResults';
import CartPanel from './cart/CartPanel';
import CartButton from './cart/CartButton';

const SearchSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Medicine[]>([]);
  const [cartItems, setCartItems] = useState<(Medicine & { quantity: number })[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [medicines, setMedicines] = useState<Medicine[]>(mockMedicines);
  
  const searchRef = useRef(null);
  const isInView = useInView(searchRef, { once: true, amount: 0.3 });

  // Load cart data from localStorage when page loads
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Save cart data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (searchTerm.length >= 2) {
      const filtered = medicines.filter(
        medicine => 
          medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          medicine.activeIngredient.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (medicine.manufacturer && medicine.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (medicine.country && medicine.country.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, medicines]);

  const addToCart = (medicine: Medicine) => {
    setCartItems(prevItems => {
      // Check if item already exists in cart
      const exists = prevItems.find(item => item.id === medicine.id);
      
      if (exists) {
        // Increment quantity if exists
        return prevItems.map(item => 
          item.id === medicine.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        // Add new item with quantity 1
        return [...prevItems, { ...medicine, quantity: 1 }];
      }
    });
    
    // Open cart after adding product
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    } else {
      setCartItems(prevItems => 
        prevItems.map(item => 
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  // Clear cart function
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

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
    <section id="search" className="py-16 md:py-24">
      <div className="container-tight">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary mb-4"
          >
            Medicine Search
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Wholesale Medicine Catalog
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-foreground/70"
          >
            Search by medicine name or active ingredient to find the products you need and create a request list.
          </motion.p>
        </div>
        
        <motion.div 
          ref={searchRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          <motion.div variants={itemVariants} className="relative mb-6">
            <div className="flex items-center shadow-sm border border-gray-200 rounded-lg overflow-hidden">
              <div className="pl-4">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search medicine name, active ingredient, manufacturer or country..."
                className="w-full px-4 py-3 focus:outline-none text-lg"
              />
            </div>
          </motion.div>

          {/* Search Results */}
          <SearchResults 
            searchResults={searchResults}
            addToCart={addToCart}
          />

          {/* Cart Button */}
          <CartButton 
            cartItems={cartItems}
            setIsCartOpen={setIsCartOpen}
            itemVariants={itemVariants}
          />

          {/* Cart/Quote Request Sliding Panel */}
          <CartPanel 
            isCartOpen={isCartOpen}
            setIsCartOpen={setIsCartOpen}
            cartItems={cartItems}
            updateQuantity={updateQuantity}
            clearCart={clearCart}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default SearchSection;
