
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookingsService } from '@/services/supabase/bookings';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useUserBookings = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['user-bookings', user?.id],
    queryFn: () => {
      console.log('useUserBookings: Fetching bookings for user:', user?.id);
      return bookingsService.getAll(user!.id);
    },
    enabled: !!user?.id,
    refetchOnWindowFocus: true,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};

export const useUpcomingBookings = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['upcoming-bookings', user?.id],
    queryFn: () => {
      console.log('useUpcomingBookings: Fetching upcoming bookings for user:', user?.id);
      return bookingsService.getUpcoming(user!.id);
    },
    enabled: !!user?.id,
    refetchOnWindowFocus: true,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};

export const useCompletedBookings = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['completed-bookings', user?.id],
    queryFn: () => {
      console.log('useCompletedBookings: Fetching completed bookings for user:', user?.id);
      return bookingsService.getCompleted(user!.id);
    },
    enabled: !!user?.id,
    refetchOnWindowFocus: true,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};

export const useBooking = (bookingId: string) => {
  return useQuery({
    queryKey: ['booking', bookingId],
    queryFn: () => {
      console.log('useBooking: Fetching booking:', bookingId);
      return bookingsService.getById(bookingId);
    },
    enabled: !!bookingId,
  });
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (bookingData: any) => {
      console.log('useCreateBooking: Creating booking with data:', bookingData);
      return bookingsService.create(bookingData);
    },
    onSuccess: (data) => {
      console.log('useCreateBooking: Booking created successfully:', data);
      queryClient.invalidateQueries({ queryKey: ['user-bookings'] });
      queryClient.invalidateQueries({ queryKey: ['upcoming-bookings'] });
      toast({
        title: "Success",
        description: "Booking created successfully",
      });
    },
    onError: (error: any) => {
      console.error('useCreateBooking: Error creating booking:', error);
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
    mutationFn: ({ bookingId, status }: { bookingId: string; status: 'pending' | 'confirmed' | 'completed' | 'cancelled' }) => {
      console.log('useUpdateBookingStatus: Updating booking status:', { bookingId, status });
      return bookingsService.updateStatus(bookingId, status);
    },
    onSuccess: (data) => {
      console.log('useUpdateBookingStatus: Status updated successfully:', data);
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
      console.error('useUpdateBookingStatus: Error updating booking status:', error);
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
    mutationFn: ({ bookingId, newDate, newTime }: { bookingId: string; newDate: string; newTime: string }) => {
      console.log('useRescheduleBooking: Rescheduling booking:', { bookingId, newDate, newTime });
      return bookingsService.update(bookingId, { 
        booking_date: newDate, 
        booking_time: newTime,
        status: 'pending'
      });
    },
    onSuccess: (data) => {
      console.log('useRescheduleBooking: Booking rescheduled successfully:', data);
      queryClient.invalidateQueries({ queryKey: ['user-bookings'] });
      queryClient.invalidateQueries({ queryKey: ['upcoming-bookings'] });
      queryClient.invalidateQueries({ queryKey: ['booking'] });
      toast({
        title: "Success",
        description: "Booking rescheduled successfully",
      });
    },
    onError: (error: any) => {
      console.error('useRescheduleBooking: Error rescheduling booking:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to reschedule booking",
        variant: "destructive",
      });
    },
  });
};
