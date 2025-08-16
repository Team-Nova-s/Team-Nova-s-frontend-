import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Separator } from './ui/separator';
import { Star, ThumbsUp, MessageSquare } from 'lucide-react';
import { useAuth } from './AuthContext';
import { toast } from 'sonner@2.0.3';

export interface Review {
  id: string;
  productId: number;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  eventType: string;
  helpful: number;
  verified: boolean;
}

interface ProductReviewsProps {
  productId: number;
  productName: string;
}

export function ProductReviews({ productId, productName }: ProductReviewsProps) {
  const { user, isAuthenticated } = useAuth();
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewData, setReviewData] = useState({
    title: '',
    comment: '',
    eventType: ''
  });

  // Mock reviews data
  const mockReviews: Review[] = [
    {
      id: '1',
      productId: 1,
      userId: 'user1',
      userName: 'Sarah Johnson',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop',
      rating: 5,
      title: 'Perfect for our outdoor wedding!',
      comment: 'This arch was absolutely stunning and exactly what we needed for our garden wedding. The setup was professional and the quality was excellent. Our guests couldn\'t stop complimenting it!',
      date: '2024-09-15',
      eventType: 'Wedding',
      helpful: 12,
      verified: true
    },
    {
      id: '2',
      productId: 1,
      userId: 'user2',
      userName: 'Michael Chen',
      userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
      rating: 4,
      title: 'Great quality, minor setup issues',
      comment: 'The arch itself is beautiful and well-made. The flowers were fresh and the design was elegant. Had a small delay with setup but the team resolved it quickly.',
      date: '2024-08-22',
      eventType: 'Anniversary',
      helpful: 8,
      verified: true
    },
    {
      id: '3',
      productId: 1,
      userId: 'user3',
      userName: 'Emily Rodriguez',
      userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
      rating: 5,
      title: 'Exceeded expectations!',
      comment: 'Absolutely gorgeous! The photos came out amazing and it was the perfect backdrop for our ceremony. Highly recommend for any outdoor event.',
      date: '2024-07-10',
      eventType: 'Wedding',
      helpful: 15,
      verified: false
    }
  ];

  const reviews = mockReviews.filter(review => review.productId === productId);
  const averageRating = reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0;
  const ratingDistribution = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(review => review.rating === star).length,
    percentage: reviews.length > 0 ? (reviews.filter(review => review.rating === star).length / reviews.length) * 100 : 0
  }));

  const handleSubmitReview = () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to write a review');
      return;
    }

    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    if (!reviewData.title.trim() || !reviewData.comment.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    // In a real app, this would make an API call
    toast.success('Review submitted successfully!');
    setShowReviewDialog(false);
    setRating(0);
    setReviewData({ title: '', comment: '', eventType: '' });
  };

  const StarRating = ({ rating, onRatingChange, size = 'w-5 h-5', interactive = false }: {
    rating: number;
    onRatingChange?: (rating: number) => void;
    size?: string;
    interactive?: boolean;
  }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => interactive && onRatingChange?.(star)}
            onMouseEnter={() => interactive && setHoveredRating(star)}
            onMouseLeave={() => interactive && setHoveredRating(0)}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Review Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Customer Reviews</span>
            <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Write Review
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Write a Review</DialogTitle>
                  <DialogDescription>
                    Share your experience with {productName}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div>
                    <Label>Rating</Label>
                    <div className="flex items-center space-x-2 mt-2">
                      <StarRating
                        rating={hoveredRating || rating}
                        onRatingChange={setRating}
                        interactive={true}
                      />
                      <span className="text-sm text-gray-500">
                        {rating ? `${rating} star${rating > 1 ? 's' : ''}` : 'Select rating'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="review-title">Review Title</Label>
                    <input
                      id="review-title"
                      type="text"
                      placeholder="Summarize your experience"
                      value={reviewData.title}
                      onChange={(e) => setReviewData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <Label htmlFor="event-type">Event Type</Label>
                    <input
                      id="event-type"
                      type="text"
                      placeholder="e.g., Wedding, Birthday, Corporate"
                      value={reviewData.eventType}
                      onChange={(e) => setReviewData(prev => ({ ...prev, eventType: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <Label htmlFor="review-comment">Your Review</Label>
                    <Textarea
                      id="review-comment"
                      placeholder="Tell us about your experience..."
                      value={reviewData.comment}
                      onChange={(e) => setReviewData(prev => ({ ...prev, comment: e.target.value }))}
                      rows={4}
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowReviewDialog(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSubmitReview}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Submit Review
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {reviews.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg text-gray-600 mb-2">No reviews yet</h3>
              <p className="text-gray-500">Be the first to review this product!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Rating Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {averageRating.toFixed(1)}
                  </div>
                  <StarRating rating={Math.round(averageRating)} />
                  <p className="text-sm text-gray-500 mt-1">
                    Based on {reviews.length} review{reviews.length > 1 ? 's' : ''}
                  </p>
                </div>

                <div className="space-y-2">
                  {ratingDistribution.map(({ star, count, percentage }) => (
                    <div key={star} className="flex items-center space-x-2">
                      <span className="text-sm w-8">{star}★</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-500 w-8">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Individual Reviews */}
              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id} className="border-l-4 border-l-primary/20">
                    <CardContent className="pt-6">
                      <div className="flex items-start space-x-4">
                        <Avatar>
                          <AvatarImage src={review.userAvatar} alt={review.userName} />
                          <AvatarFallback>
                            {review.userName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-medium">{review.userName}</h4>
                            {review.verified && (
                              <Badge variant="secondary" className="text-xs">
                                Verified Purchase
                              </Badge>
                            )}
                            <Badge variant="outline" className="text-xs">
                              {review.eventType}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center space-x-2 mb-2">
                            <StarRating rating={review.rating} />
                            <span className="text-sm text-gray-500">
                              {formatDate(review.date)}
                            </span>
                          </div>
                          
                          <h5 className="font-medium mb-2">{review.title}</h5>
                          <p className="text-gray-600 mb-3">{review.comment}</p>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <button className="flex items-center space-x-1 hover:text-primary">
                              <ThumbsUp className="w-4 h-4" />
                              <span>Helpful ({review.helpful})</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}