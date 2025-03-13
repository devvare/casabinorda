import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { Medicine } from '../../types/medicine';

interface CartButtonProps {
  cartItems: (Medicine & { quantity: number })[];
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  itemVariants: any;
}

const CartButton = ({ cartItems, setIsCartOpen, itemVariants }: CartButtonProps) => {
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Sepet butonuna tıklandığında talep listesini aç
  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  return (
    <motion.div 
      variants={itemVariants}
      className="fixed bottom-6 right-6 z-40"
    >
      <button
        onClick={handleCartClick}
        className="flex items-center justify-center p-4 bg-primary text-white rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
      >
        <ShoppingCart size={24} />
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full">
            {getTotalItems()}
          </span>
        )}
      </button>
    </motion.div>
  );
};

export default CartButton;
