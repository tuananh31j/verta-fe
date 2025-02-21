import { ADMIN_ROUTES } from '~/constants/router';
import useTable from '~/hooks/_common/useTable';
import { IColor } from '~/types/Color';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { Button, Space, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import TableDisplay from '~/components/_common/TableDisplay';
import WrapperPageAdmin from '../_common';
import useGetColors from '~/hooks/Colors/Queries/useGetColors';

const ColorList = () => {
    const { query, onFilter, onSelectPaginateChange, getColumnSearchProps } = useTable<IColor>();
    const { data } = useGetColors(query);

    const colorList = data || [];
    const totalDocs = data?.totalDocs || 0;
    const currentPage = data?.page || 1;

    const columns: TableProps<IColor>['columns'] = [
        {
            title: 'Tên màu sắc',
            dataIndex: 'name',
            key: 'search',
            render: (text) => <h4>{text}</h4>,
            ...getColumnSearchProps('name'),
            width: '20%',
        },
        {
            title: 'Mã hex',
            dataIndex: 'hex',
            key: 'hex',
            render: (text) => (
                <h4 style={{ color: text }} className='inline-block rounded bg-slate-50 px-3 py-1'>
                    {text}
                </h4>
            ),
            width: '20%',
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Space size={'middle'}>
                    <Tooltip title='Cập nhật màu sắc'>
                        <Link to={`${ADMIN_ROUTES.COLOR_EDIT}/${record._id}`} className='text-blue-500'>
                            <EditOutlined className='rounded-full bg-blue-100 p-2' style={{ fontSize: '1rem' }} />
                        </Link>
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <WrapperPageAdmin
            title='Quản lý màu sắc'
            option={
                <Link to={ADMIN_ROUTES.COLOR_CREATE}>
                    <Button icon={<PlusOutlined />} type='primary'>
                        Thêm mới màu sắc
                    </Button>
                </Link>
            }
        >
            <TableDisplay<IColor>
                onFilter={onFilter}
                columns={columns}
                currentPage={currentPage}
                dataSource={colorList}
                onSelectPaginateChange={onSelectPaginateChange}
                totalDocs={totalDocs}
            />
        </WrapperPageAdmin>
    );
};

export default ColorList;
