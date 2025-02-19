import { useMutation } from '@tanstack/react-query';
import { useToast } from '~/context/ToastProvider';
import { productServices } from '~/services/product.service';
import { ICreateProductPayload } from '~/types/Product';

export const useCreatePro = () => {
    const toast = useToast();
    return useMutation({
        mutationKey: ['PRODUCT'],
        mutationFn: (data: ICreateProductPayload) => productServices.createProduct(data),
        onSuccess: () => {
            toast('success', 'Thêm sản phẩm thành công!');
        },
    });
};
