import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback, useMemo, memo } from 'react';
import { Medicine } from '../types/medicine';
import { mockMedicines } from '../data/mockMedicines';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import CartButton from '../components/cart/CartButton';
import CartPanel from '../components/cart/CartPanel';

// Similar medicines component extracted and optimized with memo
const SimilarMedicines = memo(({ medicines, navigate }: { 
  medicines: Medicine[], 
  navigate: (path: string, options?: any) => void 
}) => {
  if (medicines.length === 0) return null;
  
  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-4">Similar Medicines</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {medicines.map(medicine => (
          <div 
            key={medicine.id}
            onClick={() => navigate(`/medicine/${medicine.id}`, { state: { medicine } })}
            className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <h3 className="font-medium">{medicine.name}</h3>
            <p className="text-sm text-gray-500">{medicine.manufacturer || 'Not specified'}</p>
          </div>
        ))}
      </div>
    </div>
  );
});

// Medicine information component extracted and optimized with memo
const MedicineInfo = memo(({ medicine }: { medicine: Medicine }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-gray-900">Medicine Information</h2>
      <div className="space-y-3">
        <div>
          <span className="text-gray-600 font-medium">Active Ingredient:</span> 
          <span className="ml-2 text-gray-900">{medicine.activeIngredient}</span>
          {medicine.activeIngredientDescription && (
            <p className="mt-1 text-sm text-gray-600">{medicine.activeIngredientDescription}</p>
          )}
        </div>
        
        <div>
          <span className="text-gray-600 font-medium">Packaging:</span> 
          <span className="ml-2 text-gray-900">{medicine.packaging || '-'}</span>
        </div>
        
        <div>
          <span className="text-gray-600 font-medium">Manufacturer:</span> 
          <span className="ml-2 text-gray-900">{medicine.manufacturer || '-'}</span>
        </div>
        
        <div>
          <span className="text-gray-600 font-medium">Country of Origin:</span> 
          <span className="ml-2 text-gray-900">{medicine.country || '-'}</span>
        </div>
      </div>
    </div>
  );
});

const MedicineDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [medicine, setMedicine] = useState<Medicine | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState<(Medicine & { quantity: number })[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Optimize localStorage operations
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  }, []);

  // Save to localStorage when cart updates
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cartItems]);

  // Load medicine data
  useEffect(() => {
    if (location.state?.medicine) {
      setMedicine(location.state.medicine);
      setIsLoading(false);
      return;
    }
    
    if (id) {
      const medicineId = parseInt(id);
      const foundMedicine = mockMedicines.find(m => m.id === medicineId);
      
      if (foundMedicine) {
        setMedicine(foundMedicine);
      }
    }
    
    setIsLoading(false);
  }, [id, location.state]);

  // Memoize add to cart function
  const addToCart = useCallback((medicine: Medicine) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === medicine.id);
      
      if (existingItem) {
        return prevItems.map(item => 
          item.id === medicine.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prevItems, { ...medicine, quantity: 1 }];
      }
    });
  }, []);

  // Memoize update quantity function
  const updateQuantity = useCallback((id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      // If quantity is 0 or less, remove the item from cart
      setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    } else {
      // Otherwise update the quantity
      setCartItems(prevItems => 
        prevItems.map(item => 
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  }, []);

  // Memoize animation variants
  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }), []);

  // Memoize similar medicines
  const similarMedicines = useMemo(() => {
    if (!medicine) return [];
    
    return mockMedicines
      .filter(m => 
        m.id !== medicine.id && 
        m.activeIngredient.toLowerCase() === medicine.activeIngredient.toLowerCase()
      )
      .slice(0, 3);
  }, [medicine]);

  if (isLoading) {
    return (
      <div className="container-tight py-16 flex justify-center">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    );
  }

  if (!medicine) {
    return (
      <div className="container-tight py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Medicine not found</h1>
          <button 
            onClick={() => navigate('/')} 
            className="text-primary hover:underline flex items-center justify-center mx-auto"
          >
            <ArrowLeft size={16} className="mr-2" /> Return to home page
          </button>
        </div>
      </div>
    );
  }

  // Create image URL
  const imageUrl = medicine.imageUrl || `/images/medicines/${medicine.id}.jpg`;

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      <CartPanel 
        isCartOpen={isCartOpen} 
        setIsCartOpen={setIsCartOpen}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
      />
      
      <div className="container-tight py-4 md:py-8">
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={() => navigate('/')} 
            className="text-gray-600 hover:text-gray-900 flex items-center"
          >
            <ArrowLeft size={18} className="mr-2" /> Back
          </button>
          
          <CartButton 
            cartItems={cartItems} 
            setIsCartOpen={setIsCartOpen} 
            itemVariants={itemVariants}
          />
        </div>
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          <div className="p-6 md:p-8">
            {/* Image element */}
            {!imageError && (
              <div className="mb-6 flex justify-center">
                <img
                  src={imageUrl}
                  alt={medicine.name}
                  onError={() => setImageError(true)}
                  className="w-64 h-64 object-cover rounded-lg shadow-md"
                />
              </div>
            )}
            
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{medicine.name}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
              <MedicineInfo medicine={medicine} />
              
              <div>
                <h2 className="text-lg font-semibold mb-4 text-gray-900">Order Information</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium">Price</span>
                    <span className="text-lg font-bold">Please inquire</span>
                  </div>
                  
                  <button
                    onClick={() => {
                      addToCart(medicine);
                      setIsCartOpen(true);
                    }}
                    className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center"
                  >
                    <ShoppingCart size={18} className="mr-2" />
                    Add to Cart
                  </button>
                  
                  <p className="text-sm text-gray-500 mt-4">
                    * Please contact us for pricing information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <SimilarMedicines medicines={similarMedicines} navigate={navigate} />
      </div>
    </div>
  );
};

export default MedicineDetail;
