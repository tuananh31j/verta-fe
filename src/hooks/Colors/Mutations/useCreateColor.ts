import { QUERY_KEY } from '~/constants/queryKey';
import { ADMIN_ROUTES } from '~/constants/router';
import colorService from '~/services/color.service';
import { IColorFormData } from '~/types/Color';
import { errorResponse } from '~/types/ErrorResponse';
import showMessage from '~/utils/ShowMessage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useMutationCreateColor = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationKey: [QUERY_KEY.COLORS],
        mutationFn: (payload: IColorFormData) => colorService.createColor(payload),

        onSuccess: async () => {
            queryClient.refetchQueries({
                predicate: (query) =>
                    query.queryKey.some((element) =>
                        [QUERY_KEY.COLORS, QUERY_KEY.PRODUCTS].includes(element as string)
                    ),
            });
            showMessage('Tạo mới màu sắc thành công!', 'success');
            navigate(ADMIN_ROUTES.COLORS, { replace: true });
        },
        onError: (error: errorResponse) => {
            showMessage(error.message, 'error');
        },
    });
};
