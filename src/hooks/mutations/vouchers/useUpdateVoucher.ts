import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { QUERY_KEY } from '~/constants/queryKey';
import { ADMIN_ROUTES } from '~/constants/router';
import { useToast } from '~/context/ToastProvider';
import { voucherService } from '~/services/voucher.service';
import { IVoucherDTO } from '~/types/Voucher';

export const useUpdateVoucher = () => {
    const queryClient = useQueryClient();
    const toast = useToast();
    const naviagate = useNavigate();
    return useMutation({
        mutationFn: async (data: { newVOucher: IVoucherDTO; id: string }) =>
            voucherService.updateVoucher(data.id, data.newVOucher),

        onSuccess: () => {
            toast('success', 'Cập nhật voucher thành công!');

            queryClient.refetchQueries({
                predicate: (query) => query.queryKey.includes(QUERY_KEY.VOUCHER),
            });
            naviagate(ADMIN_ROUTES.VOUCHER, { replace: true });
        },
        onError: (err) => {
            toast('error', err.message);
        },
    });
};
