import { useQuery } from '@tanstack/react-query';
import { getManufacturingOverview } from '@/lib/manufacturerApi';
import type { ManufacturingOverviewParams } from '@/lib/types';

export const useManufacturingOverview = (params?: ManufacturingOverviewParams) => {
    return useQuery({
        queryKey: ['manufacturingOverview', params],
        queryFn: () => getManufacturingOverview(params),
    });
};
