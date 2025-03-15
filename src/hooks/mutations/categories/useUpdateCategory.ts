import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { QUERY_KEY } from '~/constants/queryKey';
import { ADMIN_ROUTES } from '~/constants/router';
import { categoryService } from '~/services/category.service';
import { ICateUpdateFormData } from '~/types/Category';
import { errorResponse } from '~/types/ErrorResponse';
import showMessage from '~/utils/ShowMessage';

export const useMutationUpdateCategory = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: ICateUpdateFormData }) =>
            categoryService.updateCateById(id, payload),
        onSuccess: async () => {
            queryClient.refetchQueries({
                predicate: (query) =>
                    query.queryKey.some((element) =>
                        [QUERY_KEY.CATEGORIES, QUERY_KEY.PRODUCTS].includes(element as string)
                    ),
            });
            showMessage('Đã cập nhật thông tin danh mục!', 'success');
            navigate(ADMIN_ROUTES.CATEGORIES, { replace: true });
        },
        onError: (error: errorResponse) => {
            showMessage(error.message, 'error');
        },
    });
};
