import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { NewsfeedService, NewsfeedPost } from '../../services/newsfeed';

export const useClassNewsfeed = (classId: number | string) => {
  return useQuery<NewsfeedPost[]>({
    queryKey: ['newsfeed', classId],
    queryFn: () => NewsfeedService.getClassNewsfeed(classId),
    enabled: !!classId,
  });
};

export const useCreateNewsfeedPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ classId, content, mediaUrl, taggedStudentIds }: { classId: number | string; content: string; mediaUrl?: string; taggedStudentIds?: number[] }) => 
      NewsfeedService.createNewsfeedPost(classId, content, mediaUrl, taggedStudentIds),
    onSuccess: (_, { classId }) => {
      queryClient.invalidateQueries({ queryKey: ['newsfeed', classId] });
    },
  });
};

export const useDeleteNewsfeedPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ classId, postId }: { classId: number | string; postId: number | string }) => 
      NewsfeedService.deleteNewsfeedPost(classId, postId),
    onSuccess: (_, { classId }) => {
      queryClient.invalidateQueries({ queryKey: ['newsfeed', classId] });
    },
  });
};
