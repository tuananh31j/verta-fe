import { ADMIN_ROUTES } from '~/constants/router';
import useTable from '~/hooks/_common/useTable';
import useGetSizes from '~/hooks/Sizes/Queries/useGetSizes';
import { ISize } from '~/types/Size';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { Button, Space, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import TableDisplay from '../../../components/_common/TableDisplay';
import WrapperPageAdmin from '../_common/';

const SizeList = () => {
    const { query, onFilter, onSelectPaginateChange, getColumnSearchProps } = useTable<ISize>();
    const { data: sizes } = useGetSizes(query);
    const sizeList = sizes;
    const totalDocs = 1;
    const currentPage = Number(query.page || 1);

    const columns: TableProps<ISize>['columns'] = [
        {
            title: 'Tên kích cỡ',
            dataIndex: 'value',
            key: 'search',
            render: (text) => <h4>{text}</h4>,
            ...getColumnSearchProps('value'),
            width: '20%',
        },

        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Space size={'middle'}>
                    <Tooltip title='Cập nhật kích cỡ'>
                        <Link to={`${ADMIN_ROUTES.SIZE_EDIT}/${record._id}`} className='text-blue-500'>
                            <EditOutlined className='rounded-full bg-blue-100 p-2' style={{ fontSize: '1rem' }} />
                        </Link>
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <WrapperPageAdmin
            title='Quản lý kích cỡ'
            option={
                <Link to={ADMIN_ROUTES.SIZE_CREATE}>
                    <Button icon={<PlusOutlined />} type='primary'>
                        Thêm mới kích cỡ
                    </Button>
                </Link>
            }
        >
            <TableDisplay<ISize>
                onFilter={onFilter}
                columns={columns}
                currentPage={currentPage}
                dataSource={sizeList}
                onSelectPaginateChange={onSelectPaginateChange}
                totalDocs={totalDocs}
            />
        </WrapperPageAdmin>
    );
};

export default SizeList;
