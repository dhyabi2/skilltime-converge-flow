
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookingsService } from '@/services/supabase/bookings';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useBookings = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['bookings', user?.id],
    queryFn: () => bookingsService.getAll(user!.id),
    enabled: !!user,
  });
};

export const useUpcomingBookings = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['bookings', 'upcoming', user?.id],
    queryFn: () => bookingsService.getUpcoming(user!.id),
    enabled: !!user,
  });
};

export const useCompletedBookings = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['bookings', 'completed', user?.id],
    queryFn: () => bookingsService.getCompleted(user!.id),
    enabled: !!user,
  });
};

export const useBooking = (id: string) => {
  return useQuery({
    queryKey: ['booking', id],
    queryFn: () => bookingsService.getById(id),
    enabled: !!id,
  });
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: bookingsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
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
    mutationFn: ({ id, status }: { id: string; status: 'pending' | 'confirmed' | 'completed' | 'cancelled' }) =>
      bookingsService.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      toast({
        title: "Success",
        description: "Booking status updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update booking status",
        variant: "destructive",
      });
    },
  });
};
