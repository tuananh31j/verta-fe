import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined,
    ShoppingOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Badge, Button, Card, Empty, Skeleton, Tag, Timeline, Tooltip, Typography } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import useGetDetailStatusAccount from '~/hooks/queries/user/useGetDetailStatusAccount';
import WrapperPageAdmin from '../_common';

dayjs.extend(relativeTime);
dayjs.locale('vi');

const { Title, Text } = Typography;

const BackLog: React.FC = () => {
    const { id } = useParams();
    const { data, isLoading, error } = useGetDetailStatusAccount(id as string);
    const history = data?.data || [];
    const statusConfig = {
        unban: {
            color: 'green',
            icon: <ClockCircleOutlined />,
            label: 'Hoạt động',
        },
        ban: {
            color: 'red',
            icon: <CheckCircleOutlined />,
            label: 'Đã khóa',
        },
    };

    const getFormattedDate = (dateString: string) => {
        const date = dayjs(dateString);
        return {
            relative: date.fromNow(),
            full: date.format('DD/MM/YYYY HH:mm:ss'),
        };
    };

    if (isLoading) {
        return (
            <Card className='w-full shadow-md'>
                <Skeleton active paragraph={{ rows: 6 }} />
            </Card>
        );
    }
    if (error) {
        return (
            <Card className='w-full bg-red-50 shadow-md'>
                <div className='p-4 text-center text-red-500'>
                    <CloseCircleOutlined className='mb-2 text-2xl' />
                    <p>Đã xảy ra lỗi khi tải lịch sử trạng thái</p>
                </div>
            </Card>
        );
    }

    const sortedHistory = history.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return (
        <WrapperPageAdmin
            title=''
            option={
                <Link to={'/admin/users'}>
                    <Button type='dashed'>Trở về danh sách</Button>
                </Link>
            }
        >
            {data && history.length === 0 ? (
                <Card className='w-full shadow-md'>
                    <Empty description='Không có lịch sử cập nhật trạng thái' image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </Card>
            ) : (
                <Card
                    title={
                        <div className='flex items-center'>
                            <ShoppingOutlined className='mr-2 text-blue-500' />
                            <Title level={4} className='m-0'>
                                Lịch sử trạng thái tài khoản
                            </Title>
                        </div>
                    }
                    className='w-full border border-gray-200 shadow-md transition-shadow hover:shadow-lg'
                    headStyle={{ borderBottom: '2px solid #f0f0f0' }}
                >
                    <Timeline
                        mode='left'
                        items={sortedHistory.map((item, index) => {
                            const status = item.action.toLowerCase();
                            const config =
                                status in statusConfig
                                    ? statusConfig[status as keyof typeof statusConfig]
                                    : { color: 'gray', icon: null, label: status };

                            const dateInfo = getFormattedDate(item.timestamp);

                            return {
                                color: config.color,
                                dot: config.icon,
                                children: (
                                    <div className='mb-6 last:mb-0'>
                                        <div className='mb-1 flex flex-col justify-between sm:flex-row sm:items-start'>
                                            <div>
                                                <Tag color={config.color} className='mr-2 text-xs font-semibold'>
                                                    {config.label}
                                                </Tag>
                                                <Tooltip title={dateInfo.full}>
                                                    <Text type='secondary' className='text-xs'>
                                                        {dateInfo.relative}
                                                    </Text>
                                                </Tooltip>
                                            </div>
                                            <div className='mt-2 sm:mt-0'>
                                                <Tooltip title={item.adminEmail}>
                                                    <Badge
                                                        style={{
                                                            backgroundColor: '#108ee9',
                                                        }}
                                                    >
                                                        <Tag icon={<UserOutlined />} className='mr-0'>
                                                            {item.adminName}
                                                        </Tag>
                                                    </Badge>
                                                </Tooltip>
                                            </div>
                                        </div>

                                        <div
                                            className='mt-2 rounded-md border-l-4 bg-gray-50 p-3'
                                            style={{ borderLeftColor: config.color }}
                                        >
                                            <Text>{`Trạng thái cập nhật thành ${config.label}`}</Text>
                                        </div>
                                    </div>
                                ),
                            };
                        })}
                    />
                </Card>
            )}
        </WrapperPageAdmin>
    );
};

export default BackLog;
