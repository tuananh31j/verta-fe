import { Button, Result, Watermark } from 'antd';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useUpdateStockOnCancelOrder from '~/hooks/mutations/order/useUpdateStockOnCancelOrder';

export default function OrderErrorPage() {
    const navigate = useNavigate();
    const { orderId } = useParams();
    const { mutate } = useUpdateStockOnCancelOrder();

    useEffect(() => {
        if (orderId) {
            mutate({ orderId });
        }
    }, []);
    return (
        <Watermark content={['VERTA', 'Oops :(!']}>
            <div className='h-[100vh]' />
            <Result
                status='error'
                title='Thanh toán thất bại!'
                subTitle='Liên hệ với chúng tôi để được hỗ trợ.'
                className='bg-gray-3 bg-opacity-65 fixed top-[50%] left-[50%] z-99999 -translate-x-[50%] -translate-y-[50%] rounded-md border border-transparent p-10'
                extra={[
                    <Button
                        key='my-order'
                        onClick={() => {
                            navigate('/', { replace: true });
                        }}
                    >
                        Trang chủ
                    </Button>,
                ]}
            />
        </Watermark>
    );
}
