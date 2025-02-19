/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useQueryClient } from '@tanstack/react-query';
import { Form, Select } from 'antd';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { QUERY_KEY } from '~/constants/queryKey';
import { useGetWards } from '~/hooks/queries/shipping/useGetWard';
import { setShippingAddress } from '~/store/slice/checkoutSlice';
import { useTypedSelector } from '~/store/store';

const WardSelectList = ({ districtId }: { districtId: number }) => {
    const { data: wardList } = useGetWards(districtId);
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const shippingAddress = useTypedSelector((state) => state.checkOut.shippingAddress);

    const handleSelectChange = (value: string, option: any) => {
        if (option) {
            dispatch(setShippingAddress({ wardCode: value, ward: option.label }));
        } else {
            dispatch(setShippingAddress({ wardCode: null, ward: '' }));
        }
    };

    useEffect(() => {
        queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.SHIPPING.WARD, districtId],
        });
    }, [districtId]);

    return (
        <Form.Item initialValue={shippingAddress.wardCode} name='wardCode' rules={[{ required: true, message: <></> }]}>
            <Select
                className='min-h-[40px]'
                placeholder='Chọn Phường/ Xã'
                options={wardList}
                allowClear
                onChange={handleSelectChange}
            />
        </Form.Item>
    );
};

export default WardSelectList;
