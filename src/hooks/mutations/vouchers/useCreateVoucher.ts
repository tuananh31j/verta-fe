import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import { useToast } from '~/context/ToastProvider';
import { voucherService } from '~/services/voucher.service';
import { IVoucherDTO } from '~/types/Voucher';

export const useCreateVoucher = () => {
    const queryClient = useQueryClient();
    const toast = useToast();
    return useMutation({
        mutationFn: (newVoucher: IVoucherDTO) => voucherService.createVoucher(newVoucher),
        onError: (err) => {
            toast('error', err.message);
        },
        onSuccess: () => {
            toast('success', 'Đã cập nhật trạng thái sản phẩm!');

            queryClient.refetchQueries({
                predicate: (query) => query.queryKey.includes(QUERY_KEY.VOUCHER),
            });
        },
    });
};
