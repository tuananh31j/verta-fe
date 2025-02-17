import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, InputNumber } from 'antd';
import { useEffect, useMemo, useState } from 'react';
// import useUpdateCartQuantity from '~/hooks/mutations/cart/useUpdateCartQuantity';
import _ from 'lodash';

type Props = {
    quantityValue: number;
    productId: string;
    stock: number;
};

const CartDetailQuantityItem = ({ quantityValue, productId, stock }: Props) => {
    const [debouncedQuantity, setDebounceQuantity] = useState<number | null>(null);
    const [quantity, setQuantity] = useState(quantityValue);

    // const { mutate } = useUpdateCartQuantity();

    const handleDebouncedUpdateQuantity = useMemo(() => {
        // return _.debounce((itemData) => {
        //     mutate(itemData);
        // }, 800);
    }, []);

    const handleDecreaseQuantity = () => {
        const newQuantity = quantity - 1;

        setQuantity(newQuantity);
        setDebounceQuantity(newQuantity);
    };

    const handleIncreaseQuantity = () => {
        const newQuantity = quantity + 1;

        setQuantity(newQuantity);
        setDebounceQuantity(newQuantity);
    };

    // useEffect(() => {
    //     if (debouncedQuantity) {
    //         handleDebouncedUpdateQuantity({ productId, quantity: debouncedQuantity });
    //     }
    //     return () => {
    //         handleDebouncedUpdateQuantity.cancel();
    //     };
    // }, [debouncedQuantity, handleDebouncedUpdateQuantity, productId]);

    useEffect(() => {
        if (quantityValue != quantity) {
            setQuantity(quantityValue);
        }
    }, [quantityValue]);

    return (
        <div className='mt-2 flex items-center'>
            <Button
                type='default'
                disabled={quantity < 2}
                onClick={handleDecreaseQuantity}
                icon={<MinusOutlined className='transform transition duration-500 hover:rotate-180' />}
            />
            <ConfigProvider
                theme={{
                    token: {
                        colorBgContainerDisabled: 'white',
                        colorTextDisabled: 'black',
                    },
                }}
            >
                <InputNumber min={1} disabled={true} value={quantity} className='' />
            </ConfigProvider>

            <Button
                type='default'
                onClick={handleIncreaseQuantity}
                disabled={quantity === stock}
                icon={<PlusOutlined className='transform transition duration-500 hover:rotate-180' />}
            />
        </div>
    );
};

export default CartDetailQuantityItem;
