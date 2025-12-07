import { useQuery } from '@tanstack/react-query';
import { getManufacturingModelDefects } from '@/lib/manufacturerApi';

export const useManufacturingModelDefects = (modelId: string) => {
    return useQuery({
        queryKey: ['manufacturingModelDefects', modelId],
        queryFn: () => getManufacturingModelDefects(modelId),
        enabled: !!modelId,
    });
};
