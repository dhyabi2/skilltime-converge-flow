
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { bookingsService } from '@/services/supabase/bookings';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useRealTimeBookings = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const query = useQuery({
    queryKey: ['user-bookings', user?.id],
    queryFn: () => bookingsService.getAll(user!.id),
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (!user?.id) return;

    const channel = supabase
      .channel('bookings-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookings',
          filter: `or(client_id.eq.${user.id},provider_id.eq.${user.id})`
        },
        (payload) => {
          console.log('Booking update received:', payload);
          
          // Invalidate and refetch bookings
          queryClient.invalidateQueries({ queryKey: ['user-bookings', user.id] });
          queryClient.invalidateQueries({ queryKey: ['upcoming-bookings', user.id] });
          
          // Show notification based on event type
          if (payload.eventType === 'INSERT') {
            toast({
              title: "New Booking",
              description: "You have a new booking request",
            });
          } else if (payload.eventType === 'UPDATE') {
            const booking = payload.new;
            if (booking.status === 'confirmed') {
              toast({
                title: "Booking Confirmed",
                description: "Your booking has been confirmed",
              });
            } else if (booking.status === 'cancelled') {
              toast({
                title: "Booking Cancelled",
                description: "A booking has been cancelled",
                variant: "destructive",
              });
            }
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'payment_transactions'
        },
        (payload) => {
          console.log('Payment update received:', payload);
          
          if (payload.eventType === 'UPDATE' && payload.new.status === 'succeeded') {
            toast({
              title: "Payment Successful",
              description: "Your payment has been processed successfully",
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id, queryClient, toast]);

  return query;
};

export const useRealTimeAvailability = (skillId: string, date: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!skillId || !date) return;

    const channel = supabase
      .channel(`availability-${skillId}-${date}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'available_time_slots',
          filter: `and(skill_id.eq.${skillId},date.eq.${date})`
        },
        () => {
          // Invalidate availability queries when slots change
          queryClient.invalidateQueries({ 
            queryKey: ['skill-available-slots', skillId, date] 
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [skillId, date, queryClient]);
};
