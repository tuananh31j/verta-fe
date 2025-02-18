import { DeleteOutlined } from '@ant-design/icons';
import { Popconfirm, PopconfirmProps } from 'antd';
import useRemoveCartItem from '~/hooks/mutations/cart/useRemoveCartItem';

const RemoveCartItem = ({ variantId }: { variantId: string }) => {
    const { mutate } = useRemoveCartItem();

    const confirm: PopconfirmProps['onConfirm'] = () => {
        mutate(variantId);
    };

    return (
        <>
            <Popconfirm
                title='Xóa sản phẩm'
                placement='topLeft'
                description='Bạn có muốn xóa sản phẩm này khỏi giỏ hàng không?'
                onConfirm={confirm}
                okText='Đồng ý'
                cancelText='Hủy'
            >
                <DeleteOutlined color='#fff' className='cursor-pointer rounded-full p-1 text-base text-white' />
            </Popconfirm>
        </>
    );
};

export default RemoveCartItem;
