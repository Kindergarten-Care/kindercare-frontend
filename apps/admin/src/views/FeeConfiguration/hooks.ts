import { useState, useEffect } from 'react';
import { FeeConfigService } from '@/services/FeeConfigService';
import { FeePackageModel } from '@/config/types/feeConfig';

export const useFeePackages = () => {
  const [packages, setPackages] = useState<FeePackageModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchPackages = async () => {
      try {
        setIsLoading(true);
        const data = await FeeConfigService.getFeePackages();
        if (isMounted) {
          setPackages(data);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to fetch fee packages');
          setIsLoading(false);
        }
      }
    };

    fetchPackages();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    packages,
    isLoading,
    error
  };
};
