import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Search, Filter, Heart, Star, Calendar, Plus, Eye } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ProductReviews } from './ProductReviews';
import { useCart } from './CartContext';
import { toast } from 'sonner@2.0.3';

interface ProductsPageProps {
  onPageChange: (page: string) => void;
}

export function ProductsPage({ onPageChange }: ProductsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [eventDate, setEventDate] = useState('');
  const [duration, setDuration] = useState(1);
  const [showProductDialog, setShowProductDialog] = useState(false);
  const { addToCart } = useCart();

  const categories = [
    { id: 'all', name: 'All Categories', count: 48 },
    { id: 'wedding', name: 'Wedding', count: 16 },
    { id: 'corporate', name: 'Corporate', count: 12 },
    { id: 'birthday', name: 'Birthday', count: 8 },
    { id: 'anniversary', name: 'Anniversary', count: 6 },
    { id: 'graduation', name: 'Graduation', count: 6 }
  ];

  const products = [
    {
      id: 1,
      name: 'Elegant Wedding Arch',
      category: 'wedding',
      price: 250,
      rating: 4.9,
      reviews: 47,
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop',
      description: 'Beautiful white wooden arch perfect for outdoor weddings',
      fullDescription: 'Our elegant wedding arch is handcrafted from premium white wood and adorned with fresh seasonal flowers. Perfect for outdoor ceremonies, this arch creates a stunning focal point that will make your special day unforgettable. The arch is weather-resistant and can be customized with your choice of flowers and decorative elements.',
      features: ['White wooden frame', 'Includes floral decorations', 'Delivery & setup included', 'Weather-resistant finish', 'Customizable flower arrangements'],
      availability: 'Available',
      dimensions: '8ft W x 8ft H x 2ft D',
      weight: '45 lbs'
    },
    {
      id: 2,
      name: 'Crystal Chandelier Set',
      category: 'wedding',
      price: 400,
      rating: 5.0,
      reviews: 32,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      description: 'Stunning crystal chandeliers for elegant venues',
      fullDescription: 'Transform your venue with our exquisite crystal chandelier set. Each set includes three chandeliers of varying sizes, featuring premium crystal drops and energy-efficient LED lighting. Perfect for creating an elegant atmosphere for weddings, galas, and special events.',
      features: ['Set of 3 chandeliers', 'LED lighting', 'Professional installation', 'Dimming controls', 'Premium crystal drops'],
      availability: 'Available',
      dimensions: 'Large: 36" diameter, Medium: 24" diameter, Small: 18" diameter',
      weight: '120 lbs total'
    },
    {
      id: 3,
      name: 'Corporate Backdrop',
      category: 'corporate',
      price: 180,
      rating: 4.8,
      reviews: 23,
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop',
      description: 'Professional backdrop for corporate events and conferences',
      fullDescription: 'Create a professional atmosphere with our customizable corporate backdrop. Perfect for conferences, product launches, and business events. The backdrop can be branded with your company logo and colors, and includes professional lighting setup.',
      features: ['Customizable branding', '10ft x 8ft size', 'Step & repeat design', 'Professional lighting', 'Easy assembly'],
      availability: 'Available',
      dimensions: '10ft W x 8ft H',
      weight: '35 lbs'
    },
    {
      id: 4,
      name: 'Birthday Party Package',
      category: 'birthday',
      price: 120,
      rating: 4.7,
      reviews: 56,
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop',
      description: 'Complete birthday decoration package with balloons and banners',
      fullDescription: 'Make any birthday celebration special with our comprehensive party package. Includes balloon arrangements, custom banners, table decorations, and party favors. Perfect for children and adult birthday parties.',
      features: ['Balloon arrangements', 'Birthday banners', 'Table decorations', 'Party favors', 'Customizable themes'],
      availability: 'Available',
      dimensions: 'Various sizes',
      weight: '15 lbs'
    },
    {
      id: 5,
      name: 'Luxury Lounge Set',
      category: 'corporate',
      price: 350,
      rating: 4.9,
      reviews: 28,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
      description: 'Elegant lounge furniture for networking events',
      fullDescription: 'Create a sophisticated networking area with our luxury lounge set. Features premium upholstered seating, stylish coffee tables, and ambient lighting. Perfect for corporate events, cocktail parties, and VIP areas.',
      features: ['4-piece seating set', 'Premium upholstery', 'Coffee table included', 'Ambient lighting', 'Modular design'],
      availability: 'Available',
      dimensions: 'Configurable layout',
      weight: '200 lbs total'
    },
    {
      id: 6,
      name: 'Romantic Anniversary Setup',
      category: 'anniversary',
      price: 200,
      rating: 5.0,
      reviews: 19,
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop',
      description: 'Intimate setup perfect for anniversary celebrations',
      fullDescription: 'Celebrate your love with our romantic anniversary setup. Includes elegant table settings, candles, fresh flowers, and soft lighting to create the perfect intimate atmosphere for your special celebration.',
      features: ['Candlelit ambiance', 'Floral centerpieces', 'Romantic lighting', 'Table settings', 'Custom music playlist'],
      availability: 'Available',
      dimensions: 'Various configurations',
      weight: '25 lbs'
    },
    {
      id: 7,
      name: 'Graduation Stage Setup',
      category: 'graduation',
      price: 300,
      rating: 4.8,
      reviews: 15,
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop',
      description: 'Professional stage setup for graduation ceremonies',
      fullDescription: 'Honor your graduates with our professional stage setup. Includes podium, banner displays, seating arrangements, and sound system setup. Perfect for school graduations, corporate recognition events, and award ceremonies.',
      features: ['Podium included', 'Banner display', 'Sound system ready', 'Seating arrangements', 'Professional lighting'],
      availability: 'Limited',
      dimensions: '12ft W x 8ft D x 3ft H',
      weight: '150 lbs'
    },
    {
      id: 8,
      name: 'Garden Party Decor',
      category: 'birthday',
      price: 160,
      rating: 4.6,
      reviews: 34,
      image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=400&h=300&fit=crop',
      description: 'Fresh and vibrant decorations for outdoor parties',
      fullDescription: 'Bring your garden party to life with our fresh and vibrant decoration package. Features weather-resistant materials, colorful bunting, table settings, and natural elements perfect for outdoor celebrations.',
      features: ['Weather-resistant materials', 'Colorful bunting', 'Table settings', 'Natural elements', 'Outdoor lighting'],
      availability: 'Available',
      dimensions: 'Various sizes',
      weight: '20 lbs'
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = priceRange === 'all' ||
                        (priceRange === 'low' && product.price < 200) ||
                        (priceRange === 'medium' && product.price >= 200 && product.price < 300) ||
                        (priceRange === 'high' && product.price >= 300);
    
    return matchesCategory && matchesSearch && matchesPrice;
  });

  const handleAddToCart = () => {
    if (!selectedProduct) return;
    
    addToCart({
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      image: selectedProduct.image,
      category: selectedProduct.category,
      eventDate,
      duration,
    });
    
    toast.success(`${selectedProduct.name} added to cart!`);
    setShowProductDialog(false);
    setSelectedProduct(null);
    setEventDate('');
    setDuration(1);
  };

  const openProductDialog = (product: any) => {
    setSelectedProduct(product);
    setShowProductDialog(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl mb-4 text-gray-900">Our Products</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our extensive collection of premium ceremony rentals, perfect for every occasion
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="low">Under $200</SelectItem>
                <SelectItem value="medium">$200 - $300</SelectItem>
                <SelectItem value="high">Over $300</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Count */}
          <div className="mb-8">
            <p className="text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
              {selectedCategory !== 'all' && (
                <span> in {categories.find(c => c.id === selectedCategory)?.name}</span>
              )}
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge 
                      variant={product.availability === 'Available' ? 'default' : 'secondary'}
                      className={product.availability === 'Available' ? 'bg-green-600' : 'bg-orange-600'}
                    >
                      {product.availability}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <Button size="sm" variant="ghost" className="bg-white/80 hover:bg-white">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="bg-white/80 hover:bg-white"
                      onClick={() => openProductDialog(product)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {categories.find(c => c.id === product.category)?.name}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{product.rating}</span>
                      <span className="text-sm text-gray-400">({product.reviews})</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <CardDescription className="text-sm">{product.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    <ul className="text-sm text-gray-600 space-y-1">
                      {product.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <div className="text-2xl font-bold text-primary">${product.price}</div>
                        <div className="text-sm text-gray-500">per day</div>
                      </div>
                      <Button 
                        size="sm" 
                        className="bg-primary hover:bg-primary/90"
                        onClick={() => openProductDialog(product)}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Filter className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl text-gray-600 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or browse all categories</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchTerm('');
                  setPriceRange('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Product Details Dialog */}
      {selectedProduct && (
        <Dialog open={showProductDialog} onOpenChange={setShowProductDialog}>
          <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedProduct.name}</DialogTitle>
              <DialogDescription>
                {selectedProduct.description}
              </DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Product Details</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({selectedProduct.reviews})</TabsTrigger>
                <TabsTrigger value="rental">Rental Options</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <ImageWithFallback
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="text-lg font-medium">{selectedProduct.rating}</span>
                      <span className="text-gray-500">({selectedProduct.reviews} reviews)</span>
                    </div>
                    
                    <div className="text-3xl font-bold text-primary">
                      ${selectedProduct.price}<span className="text-base font-normal text-gray-500">/day</span>
                    </div>
                    
                    <p className="text-gray-600">{selectedProduct.fullDescription}</p>
                    
                    <div>
                      <h4 className="font-medium mb-2">Features:</h4>
                      <ul className="space-y-1">
                        {selectedProduct.features.map((feature: string, index: number) => (
                          <li key={index} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Dimensions:</span>
                        <p className="text-gray-600">{selectedProduct.dimensions}</p>
                      </div>
                      <div>
                        <span className="font-medium">Weight:</span>
                        <p className="text-gray-600">{selectedProduct.weight}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews">
                <ProductReviews 
                  productId={selectedProduct.id} 
                  productName={selectedProduct.name} 
                />
              </TabsContent>
              
              <TabsContent value="rental" className="space-y-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="event-date">Event Date</Label>
                      <Input
                        id="event-date"
                        type="date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="duration">Rental Duration (days)</Label>
                      <Select value={duration.toString()} onValueChange={(value) => setDuration(parseInt(value))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7].map(days => (
                            <SelectItem key={days} value={days.toString()}>
                              {days} day{days > 1 ? 's' : ''}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Price per day:</span>
                      <span>${selectedProduct.price}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Duration:</span>
                      <span>{duration} day{duration > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Delivery & Setup:</span>
                      <span>Included</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-medium text-lg">
                        <span>Total:</span>
                        <span className="text-primary">${selectedProduct.price * duration}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleAddToCart}
                    className="w-full bg-primary hover:bg-primary/90"
                    size="lg"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}

      {/* Call to Action */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl mb-4">Need Something Custom?</h2>
          <p className="text-xl mb-8 text-amber-100">
            Can't find exactly what you're looking for? We offer custom design services to create the perfect setup for your event.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-gray-100"
            onClick={() => onPageChange('contact')}
          >
            Request Custom Quote
          </Button>
        </div>
      </section>
    </div>
  );
}