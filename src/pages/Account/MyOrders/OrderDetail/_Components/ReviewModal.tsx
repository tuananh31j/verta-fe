import { Button, Form, Modal, Rate } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { FormProps } from 'antd/lib';
import useCreateReview from '~/hooks/mutations/review/useCreateReview';

type Props = {
    isModalOpen: boolean;
    handleOk: () => void;
    handleCancel: () => void;
    productId: string;
    orderId: string;
};

type FieldType = {
    rating: number;
    content?: string;
};

const ReviewModal = ({ isModalOpen, handleOk, handleCancel, productId, orderId }: Props) => {
    const [form] = Form.useForm();
    const { mutate: createReview, isPending } = useCreateReview();

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        if (productId) {
            createReview(
                {
                    content: values.content || '',
                    rating: values.rating,
                    orderId,
                    productId: productId,
                },
                {
                    onSuccess() {
                        handleCancel();
                    },
                }
            );
        }
    };
    return (
        <Modal
            title='Đánh giá'
            destroyOnClose
            footer={<></>}
            open={isModalOpen}
            onOk={() => {
                form.resetFields();
                handleOk();
            }}
            onCancel={() => {
                form.resetFields();
                handleCancel();
            }}
        >
            <Form form={form} layout='vertical' onFinish={onFinish}>
                <Form.Item<FieldType>
                    name='rating'
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng đánh giá!',
                            validator: (_, value) => {
                                if (!value || value === 0) {
                                    return Promise.reject(new Error('Vui lòng đánh giá!'));
                                }
                                return Promise.resolve();
                            },
                        },
                    ]}
                    label='Đánh giá'
                >
                    <Rate />
                </Form.Item>
                <Form.Item<FieldType> name='content' label='Nội dung'>
                    <TextArea cols={15} rows={4} />
                </Form.Item>
                <Form.Item>
                    <Button disabled={isPending} loading={isPending} type='primary' htmlType='submit'>
                        Đánh giá
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ReviewModal;
