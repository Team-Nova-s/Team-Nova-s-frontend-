import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, Filter, Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number>(0);

  const categories = [
    { id: 'all', name: 'All Events', count: 48 },
    { id: 'wedding', name: 'Weddings', count: 18 },
    { id: 'corporate', name: 'Corporate', count: 12 },
    { id: 'birthday', name: 'Birthdays', count: 8 },
    { id: 'anniversary', name: 'Anniversaries', count: 6 },
    { id: 'graduation', name: 'Graduations', count: 4 }
  ];

  const galleryItems = [
    {
      id: 1,
      title: 'Elegant Garden Wedding',
      category: 'wedding',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop',
      description: 'A romantic outdoor ceremony with floral arches and garden lighting',
      type: 'photo',
      location: 'Malibu Gardens',
      date: '2024-09-15'
    },
    {
      id: 2,
      title: 'Corporate Gala Evening',
      category: 'corporate',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop',
      description: 'Sophisticated business event with professional lighting and staging',
      type: 'photo',
      location: 'Downtown Convention Center',
      date: '2024-08-22'
    },
    {
      id: 3,
      title: 'Whimsical Birthday Party',
      category: 'birthday',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop',
      description: 'Colorful celebration with themed decorations and balloon arrangements',
      type: 'photo',
      location: 'Private Residence',
      date: '2024-07-10'
    },
    {
      id: 4,
      title: 'Golden Anniversary Celebration',
      category: 'anniversary',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=600&fit=crop',
      description: 'Intimate 50th anniversary with golden accents and romantic lighting',
      type: 'photo',
      location: 'Sunset Terrace',
      date: '2024-06-30'
    },
    {
      id: 5,
      title: 'Beach Wedding Ceremony',
      category: 'wedding',
      image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&h=600&fit=crop',
      description: 'Stunning oceanfront wedding with driftwood arches and sea glass details',
      type: 'photo',
      location: 'Santa Monica Beach',
      date: '2024-10-05'
    },
    {
      id: 6,
      title: 'Tech Startup Launch',
      category: 'corporate',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
      description: 'Modern product launch with sleek design and interactive displays',
      type: 'photo',
      location: 'Innovation Hub',
      date: '2024-09-12'
    },
    {
      id: 7,
      title: 'Rustic Barn Wedding',
      category: 'wedding',
      image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&h=600&fit=crop',
      description: 'Country-style wedding with wooden details and wildflower arrangements',
      type: 'photo',
      location: 'Heritage Farm',
      date: '2024-08-18'
    },
    {
      id: 8,
      title: 'Graduation Celebration',
      category: 'graduation',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop',
      description: 'Proud graduation ceremony with academic styling and achievement displays',
      type: 'photo',
      location: 'University Campus',
      date: '2024-05-20'
    },
    {
      id: 9,
      title: 'Princess Birthday Party',
      category: 'birthday',
      image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&h=600&fit=crop',
      description: 'Magical princess-themed party with castle backdrop and royal decorations',
      type: 'photo',
      location: 'Community Center',
      date: '2024-09-03'
    },
    {
      id: 10,
      title: 'Award Ceremony Night',
      category: 'corporate',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop',
      description: 'Prestigious award ceremony with elegant staging and dramatic lighting',
      type: 'photo',
      location: 'Grand Ballroom',
      date: '2024-11-08'
    },
    {
      id: 11,
      title: 'Intimate Wedding Reception',
      category: 'wedding',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
      description: 'Cozy reception with warm lighting and personalized table settings',
      type: 'photo',
      location: 'Private Estate',
      date: '2024-10-12'
    },
    {
      id: 12,
      title: 'Silver Anniversary Dinner',
      category: 'anniversary',
      image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&h=600&fit=crop',
      description: 'Elegant 25th anniversary dinner with silver accents and fine dining setup',
      type: 'photo',
      location: 'Rooftop Restaurant',
      date: '2024-07-25'
    }
  ];

  const filteredItems = galleryItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % filteredItems.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-amber-900 to-amber-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl mb-4">Event Gallery</h1>
          <p className="text-xl text-amber-100 max-w-2xl mx-auto">
            Explore our collection of beautiful events and celebrations. Get inspired by real ceremonies we've brought to life.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white py-8 border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1 max-w-2xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
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
            </div>
            
            <div className="text-sm text-gray-600">
              {filteredItems.length} of {galleryItems.length} events
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Filter className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl text-gray-600 mb-2">No events found</h3>
              <p className="text-gray-500">Try adjusting your search or browse all categories</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchTerm('');
                }}
              >
                Show All Events
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item, index) => (
                <Card 
                  key={item.id} 
                  className="group hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {item.type === 'video' ? (
                          <Play className="w-12 h-12 text-white" />
                        ) : (
                          <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </div>
                    <Badge 
                      className="absolute top-4 left-4 bg-primary text-primary-foreground"
                    >
                      {categories.find(c => c.id === item.category)?.name}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-medium text-gray-900 mb-2 line-clamp-1">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{item.location}</span>
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4 text-gray-900">Featured Events</h2>
            <p className="text-xl text-gray-600">Some of our most memorable celebrations</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="overflow-hidden">
              <div className="aspect-video relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=450&fit=crop"
                  alt="Featured wedding"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <Badge className="mb-3 bg-primary">Wedding</Badge>
                <h3 className="text-xl font-medium mb-2">Sarah & Michael's Dream Wedding</h3>
                <p className="text-gray-600 mb-4">
                  A breathtaking garden ceremony featuring our signature floral arches, romantic lighting, 
                  and custom table settings. This outdoor celebration perfectly captured the couple's vision 
                  of elegant simplicity.
                </p>
                <div className="text-sm text-gray-500">
                  Malibu Gardens • September 15, 2024
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <div className="aspect-video relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=450&fit=crop"
                  alt="Featured corporate event"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <Badge className="mb-3 bg-accent">Corporate</Badge>
                <h3 className="text-xl font-medium mb-2">Tech Innovation Awards</h3>
                <p className="text-gray-600 mb-4">
                  A sophisticated corporate gala featuring modern staging, professional lighting, 
                  and interactive displays. Our team created an atmosphere that perfectly balanced 
                  professionalism with celebration.
                </p>
                <div className="text-sm text-gray-500">
                  Downtown Convention Center • August 22, 2024
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl w-full">
            <Button
              variant="ghost"
              size="sm"
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 bg-black/50 text-white hover:bg-black/70"
            >
              <X className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white hover:bg-black/70"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white hover:bg-black/70"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
            
            <div className="bg-white rounded-lg overflow-hidden">
              <ImageWithFallback
                src={filteredItems[selectedImage]?.image}
                alt={filteredItems[selectedImage]?.title}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-primary">
                    {categories.find(c => c.id === filteredItems[selectedImage]?.category)?.name}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    {selectedImage + 1} of {filteredItems.length}
                  </span>
                </div>
                <h3 className="text-xl font-medium mb-2">{filteredItems[selectedImage]?.title}</h3>
                <p className="text-gray-600 mb-4">{filteredItems[selectedImage]?.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{filteredItems[selectedImage]?.location}</span>
                  <span>{new Date(filteredItems[selectedImage]?.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-amber-900 to-amber-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl mb-4">Ready to Create Your Own Story?</h2>
          <p className="text-xl mb-8 text-amber-100">
            Let us help you create a celebration as beautiful as the ones you see here.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-amber-900 hover:bg-gray-100"
          >
            Start Planning Your Event
          </Button>
        </div>
      </section>
    </div>
  );
}