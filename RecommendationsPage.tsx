import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Star, Heart, Calendar, Users, DollarSign, Lightbulb, Palette, Camera } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface RecommendationsPageProps {
  onPageChange: (page: string) => void;
}

export function RecommendationsPage({ onPageChange }: RecommendationsPageProps) {
  const featuredPackages = [
    {
      id: 1,
      name: 'Romantic Garden Wedding',
      description: 'Perfect for intimate outdoor ceremonies with a touch of elegance',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop',
      price: 1250,
      guests: '50-80',
      rating: 4.9,
      reviews: 47,
      items: ['Floral arch', 'Garden lighting', 'Vintage furniture', 'Table settings'],
      style: 'Rustic Elegance',
      season: 'Spring/Summer',
      popular: true
    },
    {
      id: 2,
      name: 'Corporate Gala Package',
      description: 'Sophisticated setup for high-end corporate events and award ceremonies',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=400&fit=crop',
      price: 2100,
      guests: '100-200',
      rating: 5.0,
      reviews: 32,
      items: ['Stage setup', 'Luxury seating', 'Professional lighting', 'Branding displays'],
      style: 'Modern Luxury',
      season: 'All Year',
      popular: false
    },
    {
      id: 3,
      name: 'Fairytale Birthday',
      description: 'Magical themed party setup that brings childhood dreams to life',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=400&fit=crop',
      price: 450,
      guests: '20-40',
      rating: 4.8,
      reviews: 63,
      items: ['Themed decorations', 'Balloon arrangements', 'Character props', 'Photo backdrop'],
      style: 'Whimsical',
      season: 'All Year',
      popular: true
    },
    {
      id: 4,
      name: 'Elegant Anniversary',
      description: 'Sophisticated celebration for milestone anniversaries',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=400&fit=crop',
      price: 800,
      guests: '30-60',
      rating: 4.9,
      reviews: 28,
      items: ['Romantic lighting', 'Floral centerpieces', 'Elegant linens', 'Memory display'],
      style: 'Classic Romance',
      season: 'All Year',
      popular: false
    }
  ];

  const stylingTips = [
    {
      icon: Palette,
      title: 'Color Coordination',
      tip: 'Choose a color palette of 2-3 colors maximum for a cohesive look',
      description: 'Stick to complementary colors and use the 60-30-10 rule: 60% dominant color, 30% secondary, 10% accent.'
    },
    {
      icon: Lightbulb,
      title: 'Lighting Magic',
      tip: 'Layer different types of lighting to create ambiance',
      description: 'Combine ambient, task, and accent lighting. String lights, candles, and uplighting can transform any space.'
    },
    {
      icon: Camera,
      title: 'Photo Opportunities',
      tip: 'Create designated photo spots with interesting backdrops',
      description: 'Consider height variations, interesting textures, and good lighting for Instagram-worthy moments.'
    },
    {
      icon: Users,
      title: 'Flow & Layout',
      tip: 'Plan your space layout for natural guest flow',
      description: 'Create clear pathways, designate areas for different activities, and ensure easy access to essentials.'
    }
  ];

  const seasonalTrends = [
    {
      season: 'Spring 2025',
      trend: 'Sustainable Luxury',
      description: 'Eco-friendly materials meet elegant design',
      colors: ['#7c3aed', '#10b981', '#fbbf24'],
      image: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=400&h=300&fit=crop'
    },
    {
      season: 'Summer 2025',
      trend: 'Maximalist Florals',
      description: 'Bold, oversized floral arrangements',
      colors: ['#ec4899', '#f59e0b', '#10b981'],
      image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=400&h=300&fit=crop'
    },
    {
      season: 'Fall 2025',
      trend: 'Warm Metallics',
      description: 'Copper, bronze, and gold accents',
      colors: ['#f59e0b', '#dc2626', '#7c3aed'],
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop'
    }
  ];

  const testimonialHighlights = [
    {
      package: 'Romantic Garden Wedding',
      client: 'Sarah & James',
      feedback: 'Papela transformed our vision into reality. Every detail was perfect!',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=100&h=100&fit=crop',
      rating: 5
    },
    {
      package: 'Corporate Gala Package',
      client: 'Tech Innovations Inc.',
      feedback: 'Professional, elegant, and flawlessly executed. Our clients were impressed.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-purple-600 to-purple-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl mb-4">Curated Recommendations</h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            Discover our most popular packages, styling tips, and trending designs 
            to inspire your perfect celebration
          </p>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4 text-gray-900">Featured Packages</h2>
            <p className="text-xl text-gray-600">Our most loved complete event solutions</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredPackages.map((pkg) => (
              <Card key={pkg.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <ImageWithFallback
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {pkg.popular && (
                    <Badge className="absolute top-4 left-4 bg-yellow-500 text-black">
                      <Star className="w-3 h-3 mr-1" />
                      Popular
                    </Badge>
                  )}
                  <div className="absolute top-4 right-4">
                    <Button size="sm" variant="ghost" className="bg-white/80 hover:bg-white">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{pkg.style}</Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm">{pkg.rating}</span>
                      <span className="text-sm text-gray-400">({pkg.reviews})</span>
                    </div>
                  </div>
                  <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                  <CardDescription>{pkg.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-purple-600" />
                        <span>{pkg.guests} guests</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-purple-600" />
                        <span>{pkg.season}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Included Items:</h4>
                      <div className="grid grid-cols-2 gap-1 text-sm text-gray-600">
                        {pkg.items.map((item, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-5 h-5 text-purple-600" />
                          <span className="text-2xl font-bold text-purple-600">{pkg.price}</span>
                        </div>
                        <div className="text-sm text-gray-500">starting price</div>
                      </div>
                      <Button 
                        className="bg-purple-600 hover:bg-purple-700"
                        onClick={() => onPageChange('contact')}
                      >
                        Get Quote
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Styling Tips */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4 text-gray-900">Expert Styling Tips</h2>
            <p className="text-xl text-gray-600">Professional advice to elevate your event design</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stylingTips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-purple-600" />
                    </div>
                    <CardTitle className="text-lg">{tip.title}</CardTitle>
                    <CardDescription className="font-medium text-purple-600">
                      {tip.tip}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{tip.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Seasonal Trends */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4 text-gray-900">Seasonal Trends</h2>
            <p className="text-xl text-gray-600">Stay ahead with the latest design trends</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {seasonalTrends.map((trend, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="relative">
                  <ImageWithFallback
                    src={trend.image}
                    alt={trend.trend}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-white text-gray-900">
                    {trend.season}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{trend.trend}</CardTitle>
                  <CardDescription>{trend.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Trending Colors:</h4>
                    <div className="flex space-x-2">
                      {trend.colors.map((color, colorIndex) => (
                        <div
                          key={colorIndex}
                          className="w-8 h-8 rounded-full border-2 border-gray-200"
                          style={{ backgroundColor: color }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Client Highlights */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4 text-gray-900">Client Success Stories</h2>
            <p className="text-xl text-gray-600">See how our recommendations came to life</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonialHighlights.map((highlight, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <ImageWithFallback
                      src={highlight.image}
                      alt={highlight.client}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{highlight.client}</div>
                      <div className="text-sm text-gray-500">{highlight.package}</div>
                      <div className="flex items-center mt-1">
                        {[...Array(highlight.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{highlight.feedback}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl mb-4">Ready to Create Your Perfect Event?</h2>
          <p className="text-xl mb-8 text-purple-100">
            Let our experts help you choose the perfect package and styling for your special occasion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-yellow-500 hover:bg-yellow-400 text-black"
              onClick={() => onPageChange('products')}
            >
              Browse All Products
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-purple-700"
              onClick={() => onPageChange('contact')}
            >
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}