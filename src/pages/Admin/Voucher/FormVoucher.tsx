import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Form, Input, InputNumber, DatePicker, Switch, Button } from 'antd';
import { ADMIN_ROUTES } from '~/constants/router';
import WrapperPageAdmin from '../_common';
import moment from 'moment';
import WrapperCard from '~/components/_common/WrapperCard';
import { useGetDetailsVoucher } from '~/hooks/queries/vouchers/useGetDetailsVoucher';
import { useCreateVoucher } from '~/hooks/mutations/vouchers/useCreateVoucher';
import { useUpdateVoucher } from '~/hooks/mutations/vouchers/useUpdateVoucher';
import { IVoucherDTO } from '~/types/Voucher';

const FormVoucher = () => {
    const [form] = Form.useForm();
    const { id } = useParams<{ id: string }>();
    const { data: voucherDetails } = useGetDetailsVoucher(id!);
    const [isLoading, setIsLoading] = useState(false);
    const { mutateAsync: createVoucher } = useCreateVoucher();
    const { mutateAsync: updateVoucher } = useUpdateVoucher();
    const [isResetCode, setIsResetCode] = useState(false);

    const handleUpdateAndResetCode = () => {
        setIsResetCode(true);
        form.setFieldsValue({ resetCode: true });
    };

    const handleSubmit = async (values: IVoucherDTO) => {
        setIsLoading(true);
        values.status = !!values.status;
        values.isOnlyForNewUser = !!values.isOnlyForNewUser;
        try {
            if (id) {
                await updateVoucher({ id, newVOucher: values });
            } else {
                await createVoucher(values);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        if (voucherDetails) {
            const { name } = voucherDetails;
            form.setFieldsValue({
                name,
                startDate: moment(voucherDetails.startDate),
                endDate: moment(voucherDetails.endDate),
                voucherDiscount: voucherDetails.voucherDiscount,
                minimumOrderPrice: voucherDetails.minimumOrderPrice,
                status: voucherDetails.status,
                maxUsage: voucherDetails.maxUsage,
                isOnlyForNewUser: voucherDetails.isOnlyForNewUser,
                usagePerUser: voucherDetails.usagePerUser,
            });
        }
    }, [voucherDetails, form]);

    return (
        <WrapperPageAdmin
            title={`${id}` ? 'Cập nhật voucher' : 'Tạo voucher'}
            option={
                <Link to={ADMIN_ROUTES.VOUCHER} className='underline'>
                    Quay lại
                </Link>
            }
        >
            <Form form={form} onFinish={handleSubmit} layout='vertical' className='flex flex-col gap-4'>
                <WrapperCard title='Thông tin voucher'>
                    <Form.Item name='resetCode' className='hidden' hidden>
                        <Input type='hidden' />
                    </Form.Item>
                    <Form.Item<IVoucherDTO>
                        label='Tên Voucher'
                        name='name'
                        rules={[{ required: true, message: 'Vui lòng đền tên voucher!' }]}
                    >
                        <Input size='large' placeholder='Nhập tên voucher...' />
                    </Form.Item>
                    <Form.Item<IVoucherDTO>
                        label='Giá trị giảm giá'
                        name='voucherDiscount'
                        rules={[{ required: true, message: 'Vui lòng nhập giá trị giảm giá!' }]}
                    >
                        <InputNumber size='large' style={{ width: '100%' }} placeholder='Nhập giá trị giảm giá' />
                    </Form.Item>
                    <Form.Item<IVoucherDTO>
                        label='Giá trị đơn hàng tối thiểu'
                        name='minimumOrderPrice'
                        rules={[
                            { required: true, message: 'Vui lòng nhập giá trị đơn hàng tối thiểu!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || value > getFieldValue('voucherDiscount')) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('Giá trị đơn hàng tối thiểu phải lớn hơn giá trị giảm giá');
                                },
                            }),
                        ]}
                    >
                        <InputNumber
                            style={{ width: '100%' }}
                            size='large'
                            placeholder='Nhập giá trị đơn hàng tối thiểu'
                        />
                    </Form.Item>
                    <Form.Item<IVoucherDTO>
                        label='Số lượng'
                        name='maxUsage'
                        rules={[{ required: true, message: 'Tổng số lượng voucher!' }]}
                    >
                        <InputNumber
                            size='large'
                            style={{ width: '100%' }}
                            placeholder='Nhập số lượng cho voucher này'
                        />
                    </Form.Item>
                    <Form.Item<IVoucherDTO>
                        label='Số lượng dùng trên mỗi người'
                        name='usagePerUser'
                        rules={[{ required: true, message: 'Só lượng sử dụng trên một người tối thiếu là 1!' }]}
                    >
                        <InputNumber
                            size='large'
                            style={{ width: '100%' }}
                            placeholder='Nhập số lượng cho voucher này'
                        />
                    </Form.Item>
                </WrapperCard>
                <WrapperCard title='Thời gian áp dụng'>
                    <Form.Item<IVoucherDTO>
                        label='Ngày bắt đầu'
                        name='startDate'
                        rules={[
                            { required: true, message: 'Vui lòng chọn ngày bắt đầu!' },
                            {
                                validator: (_, value) =>
                                    value && value.isBefore(moment())
                                        ? Promise.reject('Ngày bắt đầu phải lớn hơn ngày hiện tại')
                                        : Promise.resolve(),
                            },
                        ]}
                    >
                        <DatePicker showTime placeholder='Chọn thời gian bắt đầu' />
                    </Form.Item>
                    <Form.Item<IVoucherDTO>
                        label='Ngày kết thúc'
                        name='endDate'
                        rules={[
                            { required: true, message: 'Vui lòng chọn ngày bắt đầu!' },
                            {
                                validator: (_, value) =>
                                    value && value.isBefore(moment())
                                        ? Promise.reject('Ngày kết thúc phải lớn hơn ngày hiện tại')
                                        : Promise.resolve(),
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || value.isAfter(getFieldValue('startDate'))) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('Ngày kết thúc phải lớn hơn ngày bắt đầu');
                                },
                            }),
                        ]}
                    >
                        <DatePicker showTime placeholder='Chọn thời gian kết thúc' />
                    </Form.Item>
                </WrapperCard>
                <WrapperCard title='Cài đặt voucher'>
                    <Form.Item<IVoucherDTO> label='Công khai' name='status' valuePropName='checked'>
                        <Switch />
                    </Form.Item>

                    <Form.Item<IVoucherDTO>
                        label='Dành cho người dùng mới'
                        name='isOnlyForNewUser'
                        valuePropName='checked'
                    >
                        <Switch />
                    </Form.Item>
                </WrapperCard>
                <Form.Item>
                    <div className='flex gap-2'>
                        <Button
                            loading={isLoading && !isResetCode}
                            disabled={isLoading}
                            type='primary'
                            htmlType='submit'
                        >
                            {`${id}` ? 'Cập nhật' : 'Tạo mới'}
                        </Button>
                        {id && (
                            <Button
                                loading={isLoading && isResetCode}
                                disabled={isLoading}
                                type='dashed'
                                htmlType='submit'
                                onClick={handleUpdateAndResetCode}
                            >
                                Cập nhật và reset mã voucher
                            </Button>
                        )}
                    </div>
                </Form.Item>
            </Form>
        </WrapperPageAdmin>
    );
};

export default FormVoucher;
