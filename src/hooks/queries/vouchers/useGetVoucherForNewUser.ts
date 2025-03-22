import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { QUERY_KEY } from '~/constants/queryKey';
import { voucherService } from '~/services/voucher.service';
import { useTypedSelector } from '~/store/store';

export const useGetVoucherNewUser = (userOld: string | undefined) => {
    const isBefore = dayjs().isBefore(dayjs(userOld));
    const userId = useTypedSelector((state) => state.auth.user?._id);
    return useQuery({
        queryKey: [QUERY_KEY.VOUCHER, 'NEW', userId],
        queryFn: () => voucherService.getVoucherForNewAccount(),
        enabled: isBefore,
    });
};
