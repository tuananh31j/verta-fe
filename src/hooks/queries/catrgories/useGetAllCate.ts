import { useQuery } from '@tanstack/react-query';
import { categoryServices } from '~/services/category.service';

export const useGetAllCate = () => {
    return useQuery({
        queryKey: ['CATEGORY'],
        queryFn: () => categoryServices.getAllCate(),
    });
};
