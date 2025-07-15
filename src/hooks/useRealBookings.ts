
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookingsService } from '@/services/supabase/bookings';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useUserBookings = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['user-bookings', user?.id],
    queryFn: () => bookingsService.getAll(user!.id),
    enabled: !!user?.id,
  });
};

export const useUpcomingBookings = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['upcoming-bookings', user?.id],
    queryFn: () => bookingsService.getUpcoming(user!.id),
    enabled: !!user?.id,
  });
};

export const useCompletedBookings = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['completed-bookings', user?.id],
    queryFn: () => bookingsService.getCompleted(user!.id),
    enabled: !!user?.id,
  });
};

export const useBooking = (bookingId: string) => {
  return useQuery({
    queryKey: ['booking', bookingId],
    queryFn: () => bookingsService.getById(bookingId),
    enabled: !!bookingId,
  });
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: bookingsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-bookings'] });
      queryClient.invalidateQueries({ queryKey: ['upcoming-bookings'] });
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

export const useUpdateBookingStatus = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ bookingId, status }: { bookingId: string; status: 'pending' | 'confirmed' | 'completed' | 'cancelled' }) =>
      bookingsService.updateStatus(bookingId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-bookings'] });
      queryClient.invalidateQueries({ queryKey: ['upcoming-bookings'] });
      queryClient.invalidateQueries({ queryKey: ['completed-bookings'] });
      queryClient.invalidateQueries({ queryKey: ['booking'] });
      toast({
        title: "Success",
        description: "Booking status updated",
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
};

export const useRescheduleBooking = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ bookingId, newDate, newTime }: { bookingId: string; newDate: string; newTime: string }) =>
      bookingsService.update(bookingId, { 
        booking_date: newDate, 
        booking_time: newTime,
        status: 'pending'
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-bookings'] });
      queryClient.invalidateQueries({ queryKey: ['upcoming-bookings'] });
      queryClient.invalidateQueries({ queryKey: ['booking'] });
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
};
