import { useQuery } from '@tanstack/react-query';
import { categoryServices } from '~/services/category.service';
import { Params } from '~/types/Api';

export const useGetAllCate = (params: Params) => {
    return useQuery({
        queryKey: ['CATEGORY', ...Object.values(params)],
        queryFn: () => categoryServices.getAllCate(params),
    });
};
