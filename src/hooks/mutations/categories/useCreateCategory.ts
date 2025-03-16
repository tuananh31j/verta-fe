import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { QUERY_KEY } from '~/constants/queryKey';
import { ADMIN_ROUTES } from '~/constants/router';
import { useToast } from '~/context/ToastProvider';
import { categoryService } from '~/services/category.service';
import { ICategoryFormData } from '~/types/Category';
import { errorResponse } from '~/types/ErrorResponse';
import showMessage from '~/utils/ShowMessage';

export const useMutationCreateCategory = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const toast = useToast();

    return useMutation({
        mutationFn: (payload: ICategoryFormData) => categoryService.createCategory(payload),

        onSuccess: async () => {
            queryClient.refetchQueries({
                predicate: (query) =>
                    query.queryKey.some((element) =>
                        [QUERY_KEY.CATEGORIES, QUERY_KEY.PRODUCTS].includes(element as string)
                    ),
            });
            showMessage('Tạo mới danh mục thành công!', 'success');
            navigate(ADMIN_ROUTES.CATEGORIES, { replace: true });
        },
        onError: (error: errorResponse) => {
            toast('error', error.message);
        },
    });
};
