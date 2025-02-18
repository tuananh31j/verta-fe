import { useState, useRef } from 'react';
import { FilterDropdownProps, FilterValue } from 'antd/es/table/interface';
import { Input, Button, Space, InputRef, TableColumnType } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import useFilter from './useFilter';
import { SorterResult } from 'antd/lib/table/interface';
import { convertObject } from '~/utils/convertToQueryParams';

const useTable = <T extends object>() => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const { query, updateQueryParam, reset } = useFilter();
    const searchInput = useRef<InputRef>(null);

    const handleSearch = (selectedKeys: string[], confirm: FilterDropdownProps['confirm'], dataIndex: string) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const resetFilter = () => {
        setSearchText('');
        setSearchedColumn('');
        reset();
    };

    const getSortedInfo = (key: string) => {
        return query.sort
            ? query.sort.includes(key)
                ? query.sort.includes('-')
                    ? 'descend'
                    : 'ascend'
                : undefined
            : undefined;
    };

    const getFilteredValue = (key: string) => {
        return query[key] ? (query[key] as string).split(',') : undefined;
    };

    const handleResetSearch = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
        updateQueryParam({ ...query, page: '1', search: '', rawsearch: '' });
    };
    const onSelectPaginateChange = (page: number) => {
        updateQueryParam({ ...query, page: String(page) });
    };

    const onFilter = (filters: Record<string, FilterValue | null>, sorter: SorterResult<T> | SorterResult<T>[]) => {
        const filterParams = convertObject(filters);
        const sortColumKey = Array.isArray(sorter) ? sorter[0]?.columnKey : sorter?.columnKey;
        const sortOrder = Array.isArray(sorter) ? sorter[0]?.order : sorter?.order;
        let sortParams = '';
        if (sortColumKey && sortOrder) {
            if (sortOrder === 'ascend') {
                sortParams = `${sortColumKey}`;
            } else {
                sortParams = `-${sortColumKey}`;
            }
        }
        updateQueryParam({
            ...query,
            ...filterParams,
            sort: sortParams,
            page: String(1),
        });
    };

    const getColumnSearchProps = (dataIndex: string): TableColumnType<T> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Nhập giá trị tìm kiếm`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type='primary'
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size='small'
                        style={{ width: 90 }}
                    >
                        Tìm kiếm
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleResetSearch(clearFilters)}
                        size='small'
                        style={{ width: 90 }}
                    >
                        Đặt lại
                    </Button>
                    <Button
                        type='link'
                        size='small'
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Lọc
                    </Button>
                    <Button type='link' size='small' onClick={() => close()}>
                        Đóng
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    return {
        query,
        getSortedInfo,
        getFilteredValue,
        onFilter,
        resetFilter,
        getColumnSearchProps,
        onSelectPaginateChange,
    };
};

export default useTable;
