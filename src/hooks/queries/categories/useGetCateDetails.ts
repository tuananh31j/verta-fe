import { useQuery } from '@tanstack/react-query';
import { categoryService } from '~/services/category.service';

export const useGetCateDetails = (id: string) => {
    return useQuery({
        queryKey: ['CATEGORY'],
        queryFn: () => categoryService.getCateById(id),
        enabled: !!id,
    });
};
