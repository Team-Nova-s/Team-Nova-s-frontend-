import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Star, Calendar, Users, Award, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomePageProps {
  onPageChange: (page: string) => void;
}

export function HomePage({ onPageChange }: HomePageProps) {
  const services = [
    {
      title: 'Wedding Decor',
      description: 'Elegant decorations for your perfect wedding day',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop',
      price: 'From $500',
      category: 'Wedding'
    },
    {
      title: 'Corporate Events',
      description: 'Professional setups for business gatherings',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop',
      price: 'From $300',
      category: 'Corporate'
    },
    {
      title: 'Birthday Celebrations',
      description: 'Fun and festive decorations for all ages',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop',
      price: 'From $150',
      category: 'Birthday'
    },
    {
      title: 'Anniversary Parties',
      description: 'Romantic and memorable anniversary setups',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop',
      price: 'From $250',
      category: 'Anniversary'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      event: 'Wedding',
      rating: 5,
      comment: 'Papela made our wedding absolutely magical! The attention to detail was incredible.'
    },
    {
      name: 'Michael Chen',
      event: 'Corporate Event',
      rating: 5,
      comment: 'Professional service and stunning decorations. Our clients were impressed!'
    },
    {
      name: 'Emma Davis',
      event: 'Birthday Party',
      rating: 5,
      comment: 'Perfect setup for my daughter\'s birthday. She was over the moon!'
    }
  ];

  const stats = [
    { icon: Calendar, value: '500+', label: 'Events Completed' },
    { icon: Users, value: '1000+', label: 'Happy Clients' },
    { icon: Award, value: '50+', label: 'Awards Won' },
    { icon: Star, value: '4.9', label: 'Average Rating' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-900 via-amber-800 to-amber-700 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl mb-6 bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent">
            Create Unforgettable Moments
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-amber-100 max-w-3xl mx-auto">
            Transform your special occasions with our premium ceremony rental services. 
            From intimate gatherings to grand celebrations, we make every moment magical.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-amber-500 hover:bg-amber-400 text-black"
              onClick={() => onPageChange('products')}
            >
              Browse Our Services
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-amber-700"
              onClick={() => onPageChange('contact')}
            >
              Get Quote
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-amber-800" />
                  </div>
                  <div className="text-3xl font-bold text-amber-800 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4 text-gray-900">Our Featured Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our most popular ceremony rental packages, carefully curated for every special occasion.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-primary">{service.category}</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-primary">{service.price}</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onPageChange('products')}
                    >
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4 text-gray-900">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">Real experiences from real celebrations</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.comment}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.event}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-amber-900 to-amber-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl mb-4">Ready to Plan Your Event?</h2>
          <p className="text-xl mb-8 text-amber-100">
            Let's create something beautiful together. Contact us today for a personalized quote.
          </p>
          <Button 
            size="lg" 
            className="bg-amber-500 hover:bg-amber-400 text-black"
            onClick={() => onPageChange('contact')}
          >
            Start Planning Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}