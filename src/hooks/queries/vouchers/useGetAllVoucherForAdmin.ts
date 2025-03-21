import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import { voucherService } from '~/services/voucher.service';
import { Params } from '~/types/Api';

export const useGetALlVoucherForAdmin = (params: Params) => {
    return useQuery({
        queryKey: [QUERY_KEY.VOUCHER, ...Object.values(params || {}), ...Object.keys(params || {})],
        queryFn: () => voucherService.getAllVoucherForAdmin(params),
    });
};
