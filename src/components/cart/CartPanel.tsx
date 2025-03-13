import React, { useState, useRef, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Plus, Minus, Check, Loader2, FileText, CreditCard, Truck } from 'lucide-react';
import { Medicine } from '../../types/medicine';

interface CartPanelProps {
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  cartItems: (Medicine & { quantity: number })[];
  updateQuantity: (id: number, quantity: number) => void;
  clearCart?: () => void; // Sepeti temizleme fonksiyonu
}

// Sepet öğesi bileşeni
const CartItem = memo(({ 
  item, 
  updateQuantity 
}: { 
  item: Medicine & { quantity: number }, 
  updateQuantity: (id: number, quantity: number) => void 
}) => {
  return (
    <div className="flex border-b pb-4">
      <div className="flex-1">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-sm text-gray-500">{item.activeIngredient}</p>
        <p className="text-xs text-gray-400">{item.manufacturer}</p>
      </div>
      <div className="flex items-center space-x-2">
        <button 
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
        >
          <Minus size={16} />
        </button>
        <span className="w-6 text-center">{item.quantity}</span>
        <button 
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
});

// Process Step component
const ProcessStep = memo(({ 
  icon: Icon, 
  title, 
  isActive = false 
}: { 
  icon: React.ElementType, 
  title: string, 
  isActive?: boolean 
}) => {
  return (
    <div className={`flex flex-col items-center ${isActive ? 'text-primary' : 'text-gray-400'}`}>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${isActive ? 'bg-primary/10' : 'bg-gray-100'}`}>
        <Icon size={20} className={isActive ? 'text-primary' : 'text-gray-400'} />
      </div>
      <span className="text-sm font-medium text-center">{title}</span>
    </div>
  );
});

// Process Steps component
const ProcessSteps = memo(({ currentStep = 1 }: { currentStep?: number }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-6">
      <h3 className="text-center font-medium mb-6">How It Works</h3>
      <div className="grid grid-cols-4 gap-2">
        <ProcessStep 
          icon={FileText} 
          title="Submit your request" 
          isActive={currentStep >= 1} 
        />
        <ProcessStep 
          icon={FileText} 
          title="We'll send you paperwork" 
          isActive={currentStep >= 2} 
        />
        <ProcessStep 
          icon={CreditCard} 
          title="Confirm your order" 
          isActive={currentStep >= 3} 
        />
        <ProcessStep 
          icon={Truck} 
          title="Receive your medicine" 
          isActive={currentStep >= 4} 
        />
      </div>
    </div>
  );
});

// Form bileşeni
const CartForm = memo(({ 
  formRef, 
  isSubmitting, 
  handleSubmit 
}: { 
  formRef: React.RefObject<HTMLFormElement>, 
  isSubmitting: boolean, 
  handleSubmit: (e: React.FormEvent) => Promise<void> 
}) => {
  return (
    <form 
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>
      
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Message (Optional)
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:bg-primary/70 flex items-center justify-center"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin mr-2 h-4 w-4" />
            Sending...
          </>
        ) : (
          'Send Quote Request'
        )}
      </button>
    </form>
  );
});

const CartPanel: React.FC<CartPanelProps> = ({
  isCartOpen,
  setIsCartOpen,
  cartItems,
  updateQuantity,
  clearCart,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [originalCartItems, setOriginalCartItems] = useState<(Medicine & { quantity: number })[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  // Sepet öğelerini metin formatına dönüştür
  const formatCartItems = useCallback(() => cartItems.map(item => 
    `${item.name} - ${item.quantity} units`
  ).join('\n'), [cartItems]);

  // Form gönderme işlemini optimize et
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);

    try {
      const formData = new FormData(formRef.current);
      const name = formData.get('name') as string;
      const email = formData.get('email') as string;
      const phone = formData.get('phone') as string;
      const message = formData.get('message') as string;

      // Save original cart items for display in success message
      setOriginalCartItems([...cartItems]);

      // FormSubmit.co için e-posta gönderimi
      const response = await fetch('https://formsubmit.co/ajax/devvare@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
          _subject: 'New Medicine Request',
          _template: 'table',
          request: formatCartItems()
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
        
        // Önce mesajın gönderildiğini göster, 5 saniye sonra sepeti temizle
        setTimeout(() => {
          // clearCart fonksiyonunu doğrudan çağır
          if (typeof clearCart === 'function') {
            clearCart();
            console.log("Cart cleared successfully");
          } else {
            console.error("clearCart is not a function:", clearCart);
          }
          
          // 2 saniye sonra paneli kapat ve durumu sıfırla
          setTimeout(() => {
            setIsCartOpen(false);
            setIsSubmitted(false);
            setOriginalCartItems([]);
          }, 2000);
        }, 5000);
      } else {
        alert('An error occurred. Please try again later.');
      }
    } catch (error) {
      console.error('Error during form submission:', error);
      alert('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  }, [setIsCartOpen, formatCartItems, clearCart, cartItems]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsCartOpen(false)}
          />
          
          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white shadow-xl z-50 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Quote Request
                </h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100"
                  aria-label="Close panel"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Process Steps Visualization */}
              <ProcessSteps currentStep={1} />
              
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Request Sent!</h3>
                  <p className="text-gray-600 mb-4">
                    Thank you for your request. We'll get back to you shortly with more details.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h4 className="font-medium mb-2 text-left">Your Request:</h4>
                    <div className="space-y-2">
                      {originalCartItems.map(item => (
                        <div key={item.id} className="flex justify-between text-sm text-gray-600 border-b pb-2">
                          <span>{item.name}</span>
                          <span>{item.quantity} units</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 mb-4">
                    Search for medicines and add them to your cart to request a quote.
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                  >
                    Browse Medicines
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    <h3 className="font-medium">Cart Items ({cartItems.length})</h3>
                    {cartItems.map(item => (
                      <CartItem 
                        key={item.id} 
                        item={item} 
                        updateQuantity={updateQuantity} 
                      />
                    ))}
                  </div>
                  
                  <div className="border-t pt-6">
                    <h3 className="font-medium mb-4">Your Information</h3>
                    <CartForm 
                      formRef={formRef}
                      isSubmitting={isSubmitting}
                      handleSubmit={handleSubmit}
                    />
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default memo(CartPanel);
