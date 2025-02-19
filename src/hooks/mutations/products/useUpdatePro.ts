/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@tanstack/react-query';
import { useToast } from '~/context/ToastProvider';
import { productServices } from '~/services/product.service';

export const useUpdatePro = () => {
    const toast = useToast();
    return useMutation({
        mutationKey: ['PRODUCT'],
        mutationFn: ({ data, id }: { data: any; id: string }) => productServices.updateProduct(data, id),
        onSuccess: () => {
            toast('success', 'Cập nhật sản phẩm thành công!');
        },
    });
};
