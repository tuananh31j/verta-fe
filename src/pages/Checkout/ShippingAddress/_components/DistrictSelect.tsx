/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQueryClient } from '@tanstack/react-query';
import { Form, Select } from 'antd';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { QUERY_KEY } from '~/constants/queryKey';
import { useGetDistrict } from '~/hooks/queries/shipping/useGetDistrict';
import { setShippingAddress } from '~/store/slice/checkoutSlice';
import { useTypedSelector } from '~/store/store';

const DistrictSelectList = ({ provinceId }: { provinceId: number }) => {
    const form = Form.useFormInstance();
    const { data: districtList } = useGetDistrict(provinceId);
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const shippingAddress = useTypedSelector((state) => state.checkOut.shippingAddress);

    useEffect(() => {
        queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.SHIPPING.DISTRICT, provinceId],
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [provinceId]);

    const handleSelectChange = (value: string, option: any) => {
        if (option) {
            dispatch(setShippingAddress({ districtId: +value, district: option.label }));
        } else {
            dispatch(setShippingAddress({ districtId: null, district: '' }));
        }
        dispatch(setShippingAddress({ ward: '', wardCode: '' }));
        form.setFieldsValue({
            wardCode: '',
            ward: '',
        });
    };

    return (
        <>
            <Form.Item
                initialValue={shippingAddress.districtId}
                name='districtId'
                rules={[{ required: true, message: <></> }]}
            >
                <Select
                    className='min-h-[40px]'
                    placeholder='Chọn Quận/ Huyện'
                    options={districtList}
                    allowClear
                    onChange={handleSelectChange}
                />
            </Form.Item>
        </>
    );
};

export default DistrictSelectList;
