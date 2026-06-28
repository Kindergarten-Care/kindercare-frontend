import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTopLoader } from 'nextjs-toploader';
import { useRequestList } from '@/views/RequestList/hooks/useRequestList';
import { RequestItem } from '@/views/RequestList/types';

export function useRequestDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const loader = useTopLoader();

  const {
    requests,
    loading,
    activeStudent,
    isConfirmOpen,
    setIsConfirmOpen,
    triggerCancelRequest,
    confirmCancelRequest,
    setRequests,
  } = useRequestList();

  useEffect(() => {
    document.title = 'Chi tiết yêu cầu | KinderCare';
  }, []);

  useEffect(() => {
    if (!loading) {
      loader.done();
    }
  }, [loading, loader]);

  const request = requests.find(r => r.id === id);

  const handleStatusUpdate = (updated: RequestItem) => {
    setRequests(prev => prev.map(r => r.id === updated.id ? updated : r));
  };

  const handleBack = () => {
    loader.start();
    router.push('/request');
  };

  return {
    request,
    loading,
    activeStudent,
    isConfirmOpen,
    setIsConfirmOpen,
    triggerCancelRequest,
    confirmCancelRequest,
    handleStatusUpdate,
    handleBack,
  };
}
