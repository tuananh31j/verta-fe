import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import { useToast } from '~/context/ToastProvider';
import { voucherService } from '~/services/voucher.service';

export const useUpdateStatusVoucher = () => {
    const queryClient = useQueryClient();
    const toast = useToast();

    return useMutation({
        mutationFn: async (id: string) => voucherService.updateStatus(id),

        onSuccess: () => {
            toast('success', 'Tạo voucher thành công!');
            queryClient.refetchQueries({
                predicate: (query) => query.queryKey.includes(QUERY_KEY.VOUCHER),
            });
        },
    });
};
