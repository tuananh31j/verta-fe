import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { QUERY_KEY } from '~/constants/queryKey';
import { ADMIN_ROUTES } from '~/constants/router';
import sizeService from '~/services/size.service';
import showMessage from '~/utils/ShowMessage';
import { ISizeFormData } from '~/types/Size';
import { errorResponse } from '~/types/ErrorResponse';

export const useMutationCreateSize = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationKey: [QUERY_KEY.SIZES],
        mutationFn: (payload: ISizeFormData) => sizeService.createSize(payload),

        onSuccess: async () => {
            queryClient.refetchQueries({
                predicate: (query) =>
                    query.queryKey.some((element) => [QUERY_KEY.SIZES, QUERY_KEY.PRODUCTS].includes(element as string)),
            });
            showMessage('Tạo mới kích cỡ thành công!', 'success');
            navigate(ADMIN_ROUTES.SIZES, { replace: true });
        },
        onError: (error: errorResponse) => {
            showMessage(error.message, 'error');
        },
    });
};
