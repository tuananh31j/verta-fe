import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import { voucherService } from '~/services/voucher.service';

export const useGetDetailsVoucher = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEY.VOUCHER, id],
        queryFn: async () => voucherService.getDetails(id),
    });
};
