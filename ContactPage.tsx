import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Calendar, 
  Send, 
  CheckCircle,
  MessageSquare,
  Users,
  Star
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    guestCount: '',
    budget: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success('Thank you! We\'ll get back to you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      eventType: '',
      eventDate: '',
      guestCount: '',
      budget: '',
      message: ''
    });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+1 (555) 123-4567', '+1 (555) 123-4568'],
      description: 'Call us during business hours'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['hello@papela.com', 'events@papela.com'],
      description: 'We respond within 24 hours'
    },
    {
      icon: MapPin,
      title: 'Address',
      details: ['123 Event Plaza', 'Suite 456, Los Angeles, CA 90210'],
      description: 'Visit our showroom by appointment'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Mon-Fri: 9:00 AM - 6:00 PM', 'Sat: 10:00 AM - 4:00 PM', 'Sun: By appointment'],
      description: 'Extended hours for events'
    }
  ];

  const eventTypes = [
    'Wedding',
    'Corporate Event',
    'Birthday Party',
    'Anniversary',
    'Graduation',
    'Baby Shower',
    'Engagement Party',
    'Other'
  ];

  const budgetRanges = [
    'Under $500',
    '$500 - $1,000',
    '$1,000 - $2,500',
    '$2,500 - $5,000',
    '$5,000 - $10,000',
    'Over $10,000'
  ];

  const faqs = [
    {
      question: 'How far in advance should I book?',
      answer: 'We recommend booking 4-6 weeks in advance for optimal availability, especially during peak wedding season (May-October).'
    },
    {
      question: 'Do you provide setup and breakdown services?',
      answer: 'Yes! All our packages include professional setup and breakdown services. Our team handles everything so you can focus on enjoying your event.'
    },
    {
      question: 'What is your cancellation policy?',
      answer: 'We offer flexible cancellation up to 2 weeks before your event with a full refund. For cancellations within 2 weeks, a 50% refund is provided.'
    },
    {
      question: 'Can you work with my venue\'s restrictions?',
      answer: 'Absolutely! We have experience working with various venue types and their specific requirements. We\'ll coordinate directly with your venue.'
    }
  ];

  const testimonials = [
    {
      name: 'Jennifer Martinez',
      event: 'Wedding',
      text: 'The team at Papela was incredible! They made our wedding planning stress-free.',
      rating: 5
    },
    {
      name: 'David Park',
      event: 'Corporate Event',
      text: 'Professional service and attention to detail. Our annual gala was a huge success!',
      rating: 5
    },
    {
      name: 'Lisa Thompson',
      event: 'Birthday Party',
      text: 'My daughter\'s birthday party was magical. Thank you for making her dreams come true!',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-purple-600 to-purple-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl mb-4">Get In Touch</h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            Ready to start planning your perfect event? We'd love to hear from you and help bring your vision to life.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center space-x-2">
                    <MessageSquare className="w-6 h-6 text-purple-600" />
                    <span>Send Us a Message</span>
                  </CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you within 24 hours with a personalized quote.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          required
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      <div>
                        <Label htmlFor="eventType">Event Type *</Label>
                        <Select value={formData.eventType} onValueChange={(value) => handleInputChange('eventType', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select event type" />
                          </SelectTrigger>
                          <SelectContent>
                            {eventTypes.map(type => (
                              <SelectItem key={type} value={type.toLowerCase()}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="eventDate">Event Date</Label>
                        <Input
                          id="eventDate"
                          type="date"
                          value={formData.eventDate}
                          onChange={(e) => handleInputChange('eventDate', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="guestCount">Guest Count</Label>
                        <Input
                          id="guestCount"
                          type="number"
                          value={formData.guestCount}
                          onChange={(e) => handleInputChange('guestCount', e.target.value)}
                          placeholder="50"
                        />
                      </div>
                      <div>
                        <Label htmlFor="budget">Budget Range</Label>
                        <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select budget" />
                          </SelectTrigger>
                          <SelectContent>
                            {budgetRanges.map(range => (
                              <SelectItem key={range} value={range.toLowerCase()}>
                                {range}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Tell us about your vision for the event..."
                        rows={4}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-purple-600 hover:bg-purple-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>Sending...</>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-purple-100 p-3 rounded-lg">
                          <Icon className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-2">{info.title}</h3>
                          {info.details.map((detail, detailIndex) => (
                            <p key={detailIndex} className="text-gray-600 text-sm">{detail}</p>
                          ))}
                          <p className="text-gray-500 text-xs mt-1">{info.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              {/* Quick Stats */}
              <Card className="bg-purple-50">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Why Choose Papela?</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm text-gray-700">24-hour response guarantee</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm text-gray-700">500+ successful events</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm text-gray-700">Free consultation & quote</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm text-gray-700">Full-service event support</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4 text-gray-900">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Quick answers to common questions</p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4 text-gray-900">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">Real feedback from real celebrations</p>
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
                  <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <Badge variant="outline" className="mt-1">{testimonial.event}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-12 bg-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Calendar className="w-6 h-6" />
            <h2 className="text-2xl">Need Immediate Assistance?</h2>
          </div>
          <p className="text-purple-100 mb-6">
            For urgent event needs or last-minute changes, call our emergency hotline
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Badge className="bg-yellow-500 text-black px-6 py-2 text-lg">
              Emergency: +1 (555) 999-9999
            </Badge>
            <span className="text-purple-100">Available 24/7 during event season</span>
          </div>
        </div>
      </section>
    </div>
  );
}