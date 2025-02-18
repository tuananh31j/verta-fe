import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import { shippingService } from '~/services/shipping.service';

export const useGetWards = (provinceId: number) => {
    return useQuery({
        queryKey: [QUERY_KEY.SHIPPING.WARD, provinceId],
        queryFn: () => shippingService.getWard(provinceId),
        select: (data) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return data && data.map((item: any) => ({ label: item.WardName, value: item.WardCode }));
        },
    });
};
