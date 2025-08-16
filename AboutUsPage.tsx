import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Heart, Star, Users, Lightbulb, Award, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Passion',
      description: 'We pour our heart into every event, ensuring each celebration is as unique as the people we serve.'
    },
    {
      icon: Star,
      title: 'Excellence',
      description: 'From premium materials to flawless execution, we maintain the highest standards in everything we do.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We work closely with our clients to bring their vision to life, every step of the way.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We stay ahead of trends and continuously evolve our offerings to exceed expectations.'
    }
  ];

  const achievements = [
    { number: '8+', text: 'Years of Experience' },
    { number: '500+', text: 'Successful Events' },
    { number: '1000+', text: 'Happy Clients' },
    { number: '50+', text: 'Industry Awards' }
  ];

  const teamMembers = [
    {
      name: 'Isabella Rodriguez',
      role: 'Founder & Creative Director',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=400&h=400&fit=crop',
      description: 'With over 10 years in event design, Isabella founded Papela to bring artistic vision to life.'
    },
    {
      name: 'Marcus Thompson',
      role: 'Operations Manager',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      description: 'Marcus ensures seamless execution and logistics for every event, no matter the size or complexity.'
    },
    {
      name: 'Sofia Chen',
      role: 'Lead Designer',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      description: 'Sofia specializes in contemporary and luxury event design, creating breathtaking visual experiences.'
    }
  ];

  const services = [
    'Full Event Planning & Coordination',
    'Custom Decor Design & Installation',
    'Lighting & Audio Setup',
    'Floral Arrangements & Centerpieces',
    'Furniture & Linen Rentals',
    'Photography & Videography Coordination',
    'Catering Setup & Service',
    '24/7 Event Support'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-purple-600">Our Story</Badge>
              <h1 className="text-4xl md:text-5xl mb-6 text-gray-900">
                Creating Magic Since 2016
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Papela was born from a simple belief: every celebration deserves to be extraordinary. 
                What started as a small family business has grown into one of the region's most trusted 
                ceremony rental agencies, but our commitment to personal service remains unchanged.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {achievements.map((achievement, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">{achievement.number}</div>
                    <div className="text-gray-600">{achievement.text}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=600&h=400&fit=crop"
                alt="Beautiful wedding ceremony setup"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-yellow-400 p-6 rounded-lg shadow-lg">
                <Award className="w-8 h-8 text-yellow-800 mb-2" />
                <div className="font-bold text-yellow-800">Award Winning</div>
                <div className="text-sm text-yellow-700">Design Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl mb-6 text-gray-900">Our Mission</h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            To transform your most precious moments into unforgettable experiences through exceptional 
            design, meticulous attention to detail, and unwavering dedication to your vision. We believe 
            that every celebration tells a story, and we're here to help you tell yours beautifully.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4 text-gray-900">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-purple-600" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">{value.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4 text-gray-900">Meet Our Team</h2>
            <p className="text-xl text-gray-600">The creative minds behind your perfect celebrations</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="relative mx-auto mb-4">
                    <ImageWithFallback
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full object-cover mx-auto"
                    />
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-purple-600 font-medium">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl mb-6 text-gray-900">What We Offer</h2>
              <p className="text-xl text-gray-600 mb-8">
                From intimate gatherings to grand celebrations, we provide comprehensive event solutions 
                that cover every detail of your special day.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1519741497674-611481863552?w=300&h=300&fit=crop"
                alt="Wedding setup"
                className="rounded-lg shadow-lg"
              />
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=300&h=300&fit=crop"
                alt="Corporate event"
                className="rounded-lg shadow-lg mt-8"
              />
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=300&h=300&fit=crop"
                alt="Birthday party"
                className="rounded-lg shadow-lg -mt-8"
              />
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=300&h=300&fit=crop"
                alt="Anniversary celebration"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl mb-4">Let's Create Something Beautiful Together</h2>
          <p className="text-xl mb-8 text-purple-100">
            Ready to start planning your perfect event? We'd love to hear about your vision and 
            help bring it to life.
          </p>
        </div>
      </section>
    </div>
  );
}