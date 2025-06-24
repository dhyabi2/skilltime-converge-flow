
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { skillsService } from '@/services/supabase/skills';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useMySkills = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  return useQuery({
    queryKey: ['my-skills', user?.id],
    queryFn: async () => {
      try {
        return await skillsService.getByProvider(user!.id);
      } catch (error: any) {
        console.error('Error fetching my skills:', error);
        toast({
          title: "Error",
          description: "Failed to load your skills",
          variant: "destructive",
        });
        throw error;
      }
    },
    enabled: !!user?.id,
  });
};

export const useCreateMySkill = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (skillData: any) => {
      if (!user) throw new Error('User not authenticated');
      
      const skillToCreate = {
        ...skillData,
        provider_id: user.id,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      return skillsService.create(skillToCreate);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-skills'] });
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      toast({
        title: "Success",
        description: "Skill created successfully",
      });
    },
    onError: (error: any) => {
      console.error('Error creating skill:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create skill",
        variant: "destructive",
      });
    },
  });
};
