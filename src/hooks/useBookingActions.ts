
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { bookingsService } from '@/services/supabase/bookings';
import { notificationsService } from '@/services/supabase/notifications';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useBookingActions = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateBookingStatus = useMutation({
    mutationFn: async ({ bookingId, status, reason }: { 
      bookingId: string; 
      status: 'confirmed' | 'cancelled' | 'completed'; 
      reason?: string;
    }) => {
      await bookingsService.updateBookingStatus(bookingId, status);
      
      // Create notification for the other party
      const { data: booking } = await bookingsService.getBookingById(bookingId);
      if (booking) {
        const recipientId = booking.client_id === user?.id ? booking.provider_id : booking.client_id;
        if (recipientId) {
          await notificationsService.createNotification({
            user_id: recipientId,
            type: `booking_${status}`,
            title: `Booking ${status}`,
            message: `Your booking has been ${status}${reason ? `: ${reason}` : ''}`,
            data: { booking_id: bookingId },
            read: false
          });
        }
      }
      
      return booking;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-bookings'] });
      queryClient.invalidateQueries({ queryKey: ['booking-details'] });
      toast({
        title: "Success",
        description: "Booking status updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update booking",
        variant: "destructive",
      });
    },
  });

  const rescheduleBooking = useMutation({
    mutationFn: async ({ 
      bookingId, 
      newDate, 
      newTime 
    }: { 
      bookingId: string; 
      newDate: string; 
      newTime: string; 
    }) => {
      return await bookingsService.rescheduleBooking(bookingId, newDate, newTime);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-bookings'] });
      queryClient.invalidateQueries({ queryKey: ['booking-details'] });
      toast({
        title: "Success",
        description: "Booking rescheduled successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to reschedule booking",
        variant: "destructive",
      });
    },
  });

  const callContact = (phone?: string) => {
    if (phone) {
      window.location.href = `tel:${phone}`;
    } else {
      toast({
        title: "No phone number",
        description: "Contact phone number is not available",
        variant: "destructive",
      });
    }
  };

  const getDirections = (location?: string) => {
    if (location && location !== 'Remote') {
      const encodedLocation = encodeURIComponent(location);
      window.open(`https://maps.google.com/?q=${encodedLocation}`, '_blank');
    } else {
      toast({
        title: "No location",
        description: "This is a remote booking",
      });
    }
  };

  const sendMessage = (bookingId: string) => {
    // This would integrate with a messaging system
    toast({
      title: "Messaging",
      description: "Messaging feature coming soon",
    });
  };

  return {
    updateBookingStatus: updateBookingStatus.mutate,
    rescheduleBooking: rescheduleBooking.mutate,
    callContact,
    getDirections,
    sendMessage,
    isUpdating: updateBookingStatus.isPending,
    isRescheduling: rescheduleBooking.isPending,
  };
};
