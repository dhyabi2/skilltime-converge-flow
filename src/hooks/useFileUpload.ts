
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fileUploadService } from '@/services/supabase/fileUpload';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useAvatarUpload = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => fileUploadService.uploadAvatar(file, user!.id),
    onSuccess: (avatarUrl) => {
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
      toast({
        title: "Success",
        description: "Avatar updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to upload avatar",
        variant: "destructive",
      });
    },
  });
};

export const useSkillImageUpload = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ file, skillId }: { file: File; skillId: string }) => 
      fileUploadService.uploadSkillImage(file, skillId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-skills'] });
      toast({
        title: "Success",
        description: "Skill image updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to upload image",
        variant: "destructive",
      });
    },
  });
};
