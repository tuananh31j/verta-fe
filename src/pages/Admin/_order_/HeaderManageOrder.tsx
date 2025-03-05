import { useQueryClient } from '@tanstack/react-query';
import { Button, Space, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const HeaderManageOrder = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const handleResetAll = () => {
        queryClient.refetchQueries({
            queryKey: ['orders'],
        });
        navigate(0);
    };
    return (
        <Space className='flex w-full justify-between rounded-lg bg-[#fff] p-5 text-lg font-semibold'>
            <Typography.Text className='text-lg font-bold'>Order Management</Typography.Text>
            <Button onClick={handleResetAll}>Reset All</Button>
        </Space>
    );
};
export default HeaderManageOrder;
