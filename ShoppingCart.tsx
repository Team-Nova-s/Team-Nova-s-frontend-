import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Separator } from './ui/separator';
import { ShoppingCart as CartIcon, Minus, Plus, Trash2, Calendar, CreditCard, MapPin, User } from 'lucide-react';
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

interface ShoppingCartProps {
  onPageChange?: (page: string) => void;
}

export function ShoppingCart({ onPageChange }: ShoppingCartProps) {
  const { items, updateQuantity, removeFromCart, clearCart, getTotalPrice, getTotalItems } = useCart();
  const { user, isAuthenticated, addOrder } = useAuth();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    specialInstructions: ''
  });

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Please sign in to complete your order');
      onPageChange?.('auth');
      return;
    }

    setIsCheckingOut(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Create order
    const eventDate = items[0]?.eventDate || new Date().toISOString().split('T')[0];
    const orderItems = items.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
      quantity: item.quantity,
      duration: item.duration || 1,
      eventDate: item.eventDate || eventDate
    }));

    addOrder({
      items: orderItems,
      total: getTotalPrice(),
      status: 'pending',
      eventDate,
      deliveryAddress: `${checkoutData.address}, ${checkoutData.city}, ${checkoutData.zip}`,
      specialInstructions: checkoutData.specialInstructions
    });

    toast.success('Order placed successfully! We\'ll contact you within 24 hours to confirm details.');
    clearCart();
    setShowCheckout(false);
    setCheckoutData({
      name: user?.name || '',
      email: user?.email || '',
      phone: '',
      address: '',
      city: '',
      zip: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      specialInstructions: ''
    });
    setIsCheckingOut(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const handleProceedToCheckout = () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to checkout');
      onPageChange?.('auth');
      return;
    }
    setShowCheckout(true);
  };

  const CartContent = () => (
    <div className="space-y-4">
      {items.length === 0 ? (
        <div className="text-center py-8">
          <CartIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg text-gray-600 mb-2">Your cart is empty</h3>
          <p className="text-gray-500 mb-4">Add some beautiful rentals to get started!</p>
          <Button 
            onClick={() => onPageChange?.('products')}
            className="bg-primary hover:bg-primary/90"
          >
            Browse Products
          </Button>
        </div>
      ) : (
        <>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {items.map((item, index) => (
              <Card key={`${item.id}-${index}`} className="p-4">
                <div className="flex items-center space-x-4">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
                    <Badge variant="outline" className="text-xs mt-1">{item.category}</Badge>
                    {item.eventDate && (
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(item.eventDate).toLocaleDateString()}
                      </div>
                    )}
                    <div className="flex items-center space-x-2 mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="text-sm w-8 text-center">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-primary">
                      {formatPrice(item.price * (item.duration || 1) * item.quantity)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatPrice(item.price)} × {item.duration || 1} day{(item.duration || 1) > 1 ? 's' : ''} × {item.quantity}
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFromCart(item.id)}
                      className="mt-1 text-red-500 hover:text-red-700 h-8 w-8 p-0"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal ({getTotalItems()} items)</span>
              <span>{formatPrice(getTotalPrice())}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Delivery & Setup</span>
              <span>Included</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Insurance</span>
              <span>Included</span>
            </div>
            <Separator />
            <div className="flex justify-between font-medium text-lg">
              <span>Total</span>
              <span className="text-primary">{formatPrice(getTotalPrice())}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Button 
              onClick={handleProceedToCheckout}
              className="w-full bg-primary hover:bg-primary/90"
              size="lg"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Proceed to Checkout
            </Button>
            <Button 
              variant="outline" 
              onClick={clearCart}
              className="w-full"
            >
              Clear Cart
            </Button>
          </div>
        </>
      )}
    </div>
  );

  const CheckoutForm = () => (
    <form onSubmit={handleCheckout} className="space-y-6">
      {!isAuthenticated && (
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5 text-amber-600" />
            <div>
              <h4 className="font-medium text-amber-800">Sign in Required</h4>
              <p className="text-sm text-amber-700">Please sign in to complete your order</p>
            </div>
          </div>
        </div>
      )}

      <div>
        <h3 className="text-lg font-medium mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="checkout-name">Full Name *</Label>
            <Input
              id="checkout-name"
              value={checkoutData.name}
              onChange={(e) => setCheckoutData(prev => ({ ...prev, name: e.target.value }))}
              required
              placeholder="Your full name"
            />
          </div>
          <div>
            <Label htmlFor="checkout-email">Email *</Label>
            <Input
              id="checkout-email"
              type="email"
              value={checkoutData.email}
              onChange={(e) => setCheckoutData(prev => ({ ...prev, email: e.target.value }))}
              required
              placeholder="your@email.com"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="checkout-phone">Phone Number *</Label>
            <Input
              id="checkout-phone"
              type="tel"
              value={checkoutData.phone}
              onChange={(e) => setCheckoutData(prev => ({ ...prev, phone: e.target.value }))}
              required
              placeholder="(555) 123-4567"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <MapPin className="w-5 h-5 mr-2" />
          Delivery Address
        </h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="checkout-address">Street Address *</Label>
            <Input
              id="checkout-address"
              value={checkoutData.address}
              onChange={(e) => setCheckoutData(prev => ({ ...prev, address: e.target.value }))}
              required
              placeholder="123 Main Street"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="checkout-city">City *</Label>
              <Input
                id="checkout-city"
                value={checkoutData.city}
                onChange={(e) => setCheckoutData(prev => ({ ...prev, city: e.target.value }))}
                required
                placeholder="Los Angeles"
              />
            </div>
            <div>
              <Label htmlFor="checkout-zip">ZIP Code *</Label>
              <Input
                id="checkout-zip"
                value={checkoutData.zip}
                onChange={(e) => setCheckoutData(prev => ({ ...prev, zip: e.target.value }))}
                required
                placeholder="90210"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <CreditCard className="w-5 h-5 mr-2" />
          Payment Information
        </h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="checkout-card">Card Number *</Label>
            <Input
              id="checkout-card"
              value={checkoutData.cardNumber}
              onChange={(e) => setCheckoutData(prev => ({ ...prev, cardNumber: e.target.value }))}
              required
              placeholder="1234 5678 9012 3456"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="checkout-expiry">Expiry Date *</Label>
              <Input
                id="checkout-expiry"
                value={checkoutData.expiryDate}
                onChange={(e) => setCheckoutData(prev => ({ ...prev, expiryDate: e.target.value }))}
                required
                placeholder="MM/YY"
              />
            </div>
            <div>
              <Label htmlFor="checkout-cvv">CVV *</Label>
              <Input
                id="checkout-cvv"
                value={checkoutData.cvv}
                onChange={(e) => setCheckoutData(prev => ({ ...prev, cvv: e.target.value }))}
                required
                placeholder="123"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="checkout-instructions">Special Instructions</Label>
        <Textarea
          id="checkout-instructions"
          value={checkoutData.specialInstructions}
          onChange={(e) => setCheckoutData(prev => ({ ...prev, specialInstructions: e.target.value }))}
          placeholder="Any special setup requirements or notes..."
          rows={3}
        />
      </div>

      <div className="pt-4 border-t">
        <div className="flex justify-between text-lg font-medium mb-4">
          <span>Total Amount</span>
          <span className="text-primary">{formatPrice(getTotalPrice())}</span>
        </div>
        <Button 
          type="submit" 
          className="w-full bg-primary hover:bg-primary/90"
          size="lg"
          disabled={isCheckingOut || !isAuthenticated}
        >
          {isCheckingOut ? 'Processing Payment...' : `Pay ${formatPrice(getTotalPrice())}`}
        </Button>
      </div>
    </form>
  );

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="relative">
            <CartIcon className="w-4 h-4" />
            {getTotalItems() > 0 && (
              <Badge 
                className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary"
              >
                {getTotalItems()}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Shopping Cart</SheetTitle>
            <SheetDescription>
              Review your rental items and proceed to checkout
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <CartContent />
          </div>
        </SheetContent>
      </Sheet>

      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Checkout</CardTitle>
              <CardDescription>
                Complete your rental booking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CheckoutForm />
              <div className="flex justify-between mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setShowCheckout(false)}
                  disabled={isCheckingOut}
                >
                  Back to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}