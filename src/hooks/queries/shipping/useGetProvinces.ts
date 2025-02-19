import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import { shippingService } from '~/services/shipping.service';

export const useGetProvinces = () => {
    return useQuery({
        queryKey: [QUERY_KEY.SHIPPING.PROVINCE],
        queryFn: () => shippingService.getProvinces(),
        select: (data) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return data && data.map((item: any) => ({ label: item.ProvinceName, value: item.ProvinceID }));
        },
    });
};
