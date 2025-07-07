import { QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';
import { TableProps, Tooltip, Avatar, Progress } from 'antd';
import dayjs from 'dayjs';
import { Currency } from '~/utils';

type TopBuyer = {
    _id: string;
    totalOrders: number;
    totalSpent: number;
    totalItems: number;
    lastOrderDate: string;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
};

export const columns: TableProps<TopBuyer>['columns'] = [
    {
        title: <span className='text-base font-semibold'>#</span>,
        dataIndex: 'index',
        key: 'index',
        align: 'center',
        width: '5%',
        render: (_, __, index) => <div className='text-center font-semibold text-[#0068c9]'>{index + 1}</div>,
    },
    {
        title: <span className='text-base font-semibold'>Khách hàng</span>,
        dataIndex: 'name',
        key: 'name',
        width: '30%',
        render: (_, buyer: TopBuyer) => (
            <div className='flex items-center'>
                <Avatar size={48} src={buyer.avatar} icon={!buyer.avatar && <UserOutlined />} className='mr-3' />
                <div className='flex flex-col'>
                    <span className='text-base font-semibold'>{buyer.name}</span>
                    <span className='text-sm text-[#64748b]'>{buyer.email}</span>
                    <span className='text-sm text-[#64748b]'>{buyer.phone}</span>
                </div>
            </div>
        ),
    },
    {
        title: (
            <Tooltip title='Số lượng đơn hàng mà khách hàng đã mua' color='blue'>
                <span className='text-base font-semibold'>
                    Đơn hàng <QuestionCircleOutlined />
                </span>
            </Tooltip>
        ),
        dataIndex: 'totalOrders',
        key: 'totalOrders',
        align: 'center',
        width: '15%',
        render: (totalOrders) => (
            <div className='text-center'>
                <div className='text-lg font-semibold text-[#0068c9]'>{totalOrders}</div>
                <div className='text-xs text-[#64748b]'>đơn</div>
            </div>
        ),
    },
    {
        title: (
            <Tooltip title='Tổng số tiền khách hàng đã bỏ ra' color='blue'>
                <span className='text-base font-semibold'>
                    Đã chi <QuestionCircleOutlined />
                </span>
            </Tooltip>
        ),
        dataIndex: 'totalSpent',
        key: 'totalSpent',
        align: 'center',
        width: '20%',
        render: (totalSpent) => (
            <div className='text-center'>
                <div className='text-lg font-semibold text-[#3c50e0]'>{Currency.format(totalSpent)}</div>
                <Progress
                    percent={Math.round((totalSpent / 100000000) * 100)}
                    showInfo={false}
                    strokeColor='#3c50e0'
                    trailColor='#e6f7ff'
                />
            </div>
        ),
    },
    {
        title: (
            <Tooltip title='Tổng số sản phẩm khách hàng đã mua' color='blue'>
                <span className='text-base font-semibold'>
                    Sản phẩm <QuestionCircleOutlined />
                </span>
                ,
            </Tooltip>
        ),
        dataIndex: 'totalItems',
        key: 'totalItems',
        align: 'center',
        width: '15%',
        render: (totalItems) => (
            <div className='text-center'>
                <div className='text-lg font-semibold text-[#722ed1]'>{totalItems}</div>
                <div className='text-xs text-[#64748b]'>sản phẩm</div>
            </div>
        ),
    },
    {
        title: <span className='text-base font-semibold'>Đặt lần cuối</span>,
        dataIndex: 'lastOrderDate',
        key: 'lastOrderDate',
        align: 'center',
        width: '15%',
        render: (date) => (
            <div className='text-center'>
                <div className='text-base font-semibold'>{dayjs(date).format('DD/MM/YYYY')}</div>
                <div className='text-xs text-[#64748b]'>{dayjs(date).format('HH:mm')}</div>
            </div>
        ),
    },
];

export const generateUniqueId = (prefix: string) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
