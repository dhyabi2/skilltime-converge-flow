
import React from 'react';
import { Star, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface Service {
  id: string;
  title: string;
  provider: string;
  image: string;
  rating: number;
  reviews: number;
  price: number;
  duration: number;
  description: string;
}

interface BookingServiceCardProps {
  service: Service;
  isSelected: boolean;
  onSelect: () => void;
}

const BookingServiceCard = ({ service, isSelected, onSelect }: BookingServiceCardProps) => {
  return (
    <Card 
      className={`cursor-pointer transition-all duration-200 ${
        isSelected 
          ? 'border-primary ring-2 ring-primary/20 bg-primary/5' 
          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
      }`}
      onClick={onSelect}
    >
      <CardContent className="p-4">
        <div className="flex gap-4">
          <img
            src={service.image}
            alt={service.provider}
            className="w-16 h-16 rounded-xl object-cover"
          />
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">{service.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{service.provider}</p>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{service.rating}</span>
                <span>({service.reviews})</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{service.duration}min</span>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-lg font-bold text-gray-900">${service.price}</div>
            <div className="text-sm text-gray-500">per hour</div>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mt-3 line-clamp-2">{service.description}</p>
      </CardContent>
    </Card>
  );
};

export default BookingServiceCard;
