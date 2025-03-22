import { MinusCircleOutlined } from '@ant-design/icons';
import { TinyColor } from '@ctrl/tinycolor';
import { Button, ConfigProvider, Flex, Form, Modal, Radio, Tag } from 'antd';
import { OrderStatus } from '~/constants/enum';
import useFinishOrderClient from '~/hooks/mutations/order/useFinishOrderClient';
import { useToast } from '~/context/ToastProvider';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useCancelOrder from '~/hooks/mutations/order/useCancelOrder';
import WrapperList from '~/components/_common/WrapperList';
import { ORDER_STATUS } from '~/constants/order';
import TextArea from 'antd/es/input/TextArea';

const schemaFormCancelOrder = z.object({
    reason: z.string({ message: 'You need to tell us the reason!' }),
    description: z.string().optional(),
});

type IFormCancelOrder = z.infer<typeof schemaFormCancelOrder>;

const colorsArr = ['#fc6076', '#ff9a44', '#ef9d43', '#e75516'];
const getHoverColors = (colors: string[]) => colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors: string[]) => colors.map((color) => new TinyColor(color).darken(5).toString());

const ActionLink = ({ status, orderId }: { status: OrderStatus; orderId: string }) => {
    const toast = useToast();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [visible, setVisible] = useState(false);

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

    const { mutateAsync, isSuccess, isPending: cancelPending } = useCancelOrder(orderId);

    const { mutateAsync: finishOrder, isPending } = useFinishOrderClient();
    const handleFinishOrder = async () => {
        const res = await finishOrder(orderId);

        if (res) {
            toast('success', 'Thank you for confirming!');
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
            toast('success', 'Hủy đơn hàng thành công!');
            setIsModalOpen(false);
            reset();
        }
    }, [isSuccess, reset, toast]);

    const onSubmit: SubmitHandler<IFormCancelOrder> = async (data) => {
        try {
            if (data.reason === 'orther') {
                const reasonCombined = data.description || '';
                await mutateAsync(reasonCombined);
            } else {
                await mutateAsync(data.reason);
            }

            toast('success', 'Hủy đơn hàng thành công!');
            setIsModalOpen(false);
            reset();
        } catch (error) {
            toast('error', 'Hủy đơn thất bại!');
        }
    };

    switch (status) {
        case OrderStatus.pending:
            return (
                <>
                    <Button onClick={showModal} type='primary' loading={cancelPending} danger>
                        Xác nhận hủy
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
                                                        <Radio value='Sai thông tin sản phẩm'>
                                                            Sai thông tin sản phẩm
                                                        </Radio>
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
                                                <TextArea
                                                    {...field}
                                                    rows={5}
                                                    placeholder='Điền lí do khác tại đây ...'
                                                />
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

        case OrderStatus.confirmed:
        case OrderStatus.shipping:
            return <></>;

        case OrderStatus.delivered:
            return (
                <Button onClick={() => handleFinishOrder()} loading={isPending} type='primary'>
                    Tôi đã nhận được hàng
                </Button>
            );

        case OrderStatus.cancelled:
            return (
                <Button type='primary' danger disabled>
                    Đã bị hủy
                </Button>
            );

        case OrderStatus.done:
            return (
                <ConfigProvider
                    theme={{
                        components: {
                            Button: {
                                colorPrimary: `linear-gradient(90deg,  ${colorsArr.join(', ')})`,
                                colorPrimaryHover: `linear-gradient(90deg, ${getHoverColors(colorsArr).join(', ')})`,
                                colorPrimaryActive: `linear-gradient(90deg, ${getActiveColors(colorsArr).join(', ')})`,
                                lineWidth: 0,
                            },
                        },
                    }}
                >
                    {/* <RateBtn productId='đá' orderId={orderId} handleRate={() => {}} /> */}
                </ConfigProvider>
            );

        default:
            return (
                <Tag icon={<MinusCircleOutlined />} color='default'>
                    Lỗi!!
                </Tag>
            );
    }
};

export default ActionLink;
