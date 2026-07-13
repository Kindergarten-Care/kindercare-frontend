import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { ProxyAuthorizationService, ProxyStatus, ProxyAuthorization } from '@/services/ProxyAuthorizationService';

export const PROXY_QUERY_KEY = 'proxyApprovals';

export const useProxyAuthorizations = (status?: ProxyStatus) => {
  return useQuery<ProxyAuthorization[]>({
    queryKey: [PROXY_QUERY_KEY, status],
    queryFn: () => ProxyAuthorizationService.getAll(status),
    staleTime: 30_000,
  });
};

export const useProcessProxyAuthorization = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      authorizationId,
      status,
    }: {
      authorizationId: number;
      status: 'Approved' | 'Rejected';
    }) => ProxyAuthorizationService.process(authorizationId, status),

    onSuccess: (_, variables) => {
      toast.success(
        variables.status === 'Approved'
          ? 'Đã duyệt yêu cầu đón hộ thành công!'
          : 'Đã từ chối yêu cầu đón hộ.'
      );
      queryClient.invalidateQueries({ queryKey: [PROXY_QUERY_KEY] });
    },

    onError: (err: any) => {
      const errMsg =
        err?.response?.data?.error ||
        err?.data?.error ||
        'Có lỗi xảy ra khi xử lý yêu cầu';
      toast.error(errMsg);
    },
  });
};
