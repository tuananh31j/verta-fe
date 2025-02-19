import _ from 'lodash';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { setQuery, updateGrid } from '~/store/slice/filterSlice';
import { useTypedSelector } from '~/store/store';
import { Params } from '~/interfaces/api';

const useFilter = () => {
    const dispatch = useDispatch();
    const { query, grid } = useTypedSelector((state) => state.filter);
    const { pathname } = useLocation();
    const [searchParams] = useSearchParams();
    const navigator = useNavigate();
    useEffect(() => {
        const params: Params = {};
        searchParams?.forEach((value, key) => {
            params[key] = value;
        });
        // @dispatch
        dispatch(setQuery(params));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const reset = (isClientFilter: boolean = true) => {
        if (isClientFilter && query['category']) {
            dispatch(setQuery({ category: query['category'] }));
        } else {
            dispatch(setQuery({}));
        }
        navigator(`${pathname}`);
    };
    const updateGridUI = (gridClass: string) => {
        dispatch(updateGrid(gridClass));
    };

    const updateQueryParam = (params: Params) => {
        const newParams = new URLSearchParams(searchParams?.toString());
        const checkedParams = _.omitBy(params, (value) => value === undefined || value === '' || value === null);

        Object.entries(params).forEach(([key, value]) => {
            if (value) newParams.set(key, String(value));
            else {
                newParams.delete(key);
            }
        });
        dispatch(setQuery(checkedParams));
        navigator(`${pathname}?${newParams.toString()}`);
    };

    return { query, grid, updateQueryParam, reset, updateGridUI };
};

export default useFilter;
