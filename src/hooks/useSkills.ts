
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { skillsService } from '@/services/supabase/skills';
import { useToast } from '@/hooks/use-toast';

export const useSkills = (filters?: {
  category?: string;
  search?: string;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ['skills', filters],
    queryFn: () => skillsService.getAll(filters),
  });
};

export const useSkill = (id: string) => {
  return useQuery({
    queryKey: ['skill', id],
    queryFn: () => skillsService.getById(id),
    enabled: !!id,
  });
};

export const useTopRatedSkills = (limit?: number) => {
  return useQuery({
    queryKey: ['skills', 'top-rated', limit],
    queryFn: () => skillsService.getTopRated(limit),
  });
};

export const useCreateSkill = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: skillsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      toast({
        title: "Success",
        description: "Skill created successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create skill",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateSkill = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: any }) => 
      skillsService.update(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      toast({
        title: "Success",
        description: "Skill updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update skill",
        variant: "destructive",
      });
    },
  });
};
