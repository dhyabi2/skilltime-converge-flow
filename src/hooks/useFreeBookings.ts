
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { freeBookingsService } from '@/services/supabase/freeBookings';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useCreateFreeBooking = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: freeBookingsService.create,
    onSuccess: async (booking) => {
      // Invalidate booking queries
      queryClient.invalidateQueries({ queryKey: ['user-bookings'] });
      queryClient.invalidateQueries({ queryKey: ['upcoming-bookings'] });
      
      // Create notification for provider
      if (booking.provider_id && booking.provider_id !== user?.id) {
        try {
          await freeBookingsService.createNotification(
            booking.id,
            booking.provider_id,
            'new_booking',
            `New booking request for ${booking.skills?.title}`
          );
        } catch (error) {
          console.error('Failed to create notification:', error);
        }
      }

      toast({
        title: "Success",
        description: "Booking created successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create booking",
        variant: "destructive",
      });
    },
  });
};

export const useConfirmFreeBooking = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: freeBookingsService.confirmBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-bookings'] });
      queryClient.invalidateQueries({ queryKey: ['upcoming-bookings'] });
      
      toast({
        title: "Success",
        description: "Booking confirmed successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to confirm booking",
        variant: "destructive",
      });
    },
  });
};
