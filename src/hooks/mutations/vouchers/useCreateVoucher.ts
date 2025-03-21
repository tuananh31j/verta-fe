import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { QUERY_KEY } from '~/constants/queryKey';
import { ADMIN_ROUTES } from '~/constants/router';
import { useToast } from '~/context/ToastProvider';
import { voucherService } from '~/services/voucher.service';
import { IVoucherDTO } from '~/types/Voucher';

export const useCreateVoucher = () => {
    const queryClient = useQueryClient();
    const toast = useToast();
    const naviagate = useNavigate();

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
            naviagate(ADMIN_ROUTES.VOUCHER, { replace: true });
        },
    });
};
