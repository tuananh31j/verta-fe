import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Flex, Form, Modal, Radio } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import WrapperList from '~/components/_common/WrapperList';
import { ORDER_STATUS } from '~/constants/order';
import useCancelOrder from '~/hooks/mutations/order/useCancelOrder';
import showMessage from '~/utils/ShowMessage';

const schemaFormCancelOrder = z.object({
    reason: z.string({ message: 'You need to tell us the reason!' }),
    description: z.string().optional(),
});

type IFormCancelOrder = z.infer<typeof schemaFormCancelOrder>;

const CancelOrderModal = ({ orderId, status }: { orderId: string; status: string }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [visible, setVisible] = useState(false);
    const { mutateAsync, isSuccess, isPending } = useCancelOrder(orderId);
    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<IFormCancelOrder>({
        resolver: zodResolver(schemaFormCancelOrder),
    });

    const reason = watch('reason');

    useEffect(() => {
        setVisible(reason === 'orther');
    }, [reason]);

    const onSubmit: SubmitHandler<IFormCancelOrder> = async (data) => {
        try {
            if (data.reason === 'orther') {
                const reasonCombined = data.description || '';
                await mutateAsync(reasonCombined);
            } else {
                await mutateAsync(data.reason);
            }

            showMessage('Hủy đơn hàng thành công!', 'success');
            setIsModalOpen(false);
            reset();
        } catch (error) {
            showMessage('Hủy đơn thất bại!', 'error');
        }
    };

    const showModal = () => {
        setIsModalOpen(true);
        reset();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        reset();
    };

    useEffect(() => {
        if (isSuccess) {
            showMessage('Cancel order successfully!', 'success');
            setIsModalOpen(false);
            reset();
        }
    }, [isSuccess, reset]);

    return (
        <>
            <Button onClick={showModal} type='primary' danger>
                Hủy Đơn Hàng
            </Button>
            <Modal open={isModalOpen} footer='' onCancel={handleCancel}>
                <WrapperList classic className='m-0' title='Tại sao bạn muốn hủy đơn hàng này?'>
                    <Form
                        onFinish={handleSubmit(onSubmit)}
                        className='w-full'
                        name='layout-multiple-horizontal'
                        layout='vertical'
                    >
                        <Form.Item
                            validateStatus={errors.reason ? 'error' : ''}
                            help={errors.reason?.message}
                            label='Lí do'
                            name='horizontal'
                            required
                        >
                            <Controller
                                name='reason'
                                control={control}
                                render={({ field }) => (
                                    <Radio.Group {...field} className='flex flex-col'>
                                        {status !== ORDER_STATUS.SHIPPING && (
                                            <>
                                                <Radio value='Đơn hàng bị hoãn'>Đơn hàng bị hoãn</Radio>
                                                <Radio value='Hết hàng'>Hết hàng</Radio>
                                                <Radio value='Sai thông tin sản phẩm'>Sai thông tin sản phẩm</Radio>
                                                <Radio value='Khách hàng yêu cầu hủy đơn'>
                                                    Khách hàng yêu cầu hủy đơn
                                                </Radio>
                                                <Radio value='Lỗi thanh toán'>Lỗi thanh toán</Radio>
                                            </>
                                        )}
                                        {status === ORDER_STATUS.SHIPPING && (
                                            <>
                                                <Radio value='Quá trình vận chuyển xảy ra vấn đề'>
                                                    Quá trình vận chuyển xảy ra vấn đề
                                                </Radio>
                                                <Radio value='Không liên lạc được người nhận'>
                                                    Không liên lạc được người nhận
                                                </Radio>
                                            </>
                                        )}

                                        <Radio value='orther'>Khác:</Radio>
                                    </Radio.Group>
                                )}
                            />
                        </Form.Item>
                        {visible && (
                            <Form.Item
                                validateStatus={errors.description ? 'error' : ''}
                                help={errors.description?.message}
                                label='Lí do khác'
                            >
                                <Controller
                                    name='description'
                                    control={control}
                                    render={({ field }) => (
                                        <TextArea {...field} rows={5} placeholder='Điền lí do khác tại đây ...' />
                                    )}
                                />
                            </Form.Item>
                        )}
                        <Flex align='end' justify='end' gap='small'>
                            <Button onClick={handleCancel} type='text'>
                                Thoát
                            </Button>
                            <Button htmlType='submit' loading={isPending} type='primary'>
                                Hủy Đơn Hàng
                            </Button>
                        </Flex>
                    </Form>
                </WrapperList>
            </Modal>
        </>
    );
};

export default CancelOrderModal;
