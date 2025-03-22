import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import { voucherService } from '~/services/voucher.service';
import { useTypedSelector } from '~/store/store';

export const useGetVoucherUser = () => {
    const userId = useTypedSelector((state) => state.auth.user?._id);
    return useQuery({
        queryKey: [QUERY_KEY.VOUCHER, userId],
        queryFn: () => voucherService.getVoucherUser(),
    });
};
