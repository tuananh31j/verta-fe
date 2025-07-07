import { Button, Form, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { FormProps } from 'antd/lib';
import { useBanAccount } from '~/hooks/mutations/user/useBanUser';

type Props = {
    isModalOpen: boolean;
    handleOk: () => void;
    handleCancel: () => void;
    userId: string;
};

type FieldType = {
    userId: string;
    reason: string;
};

const BanAccountModal = ({ isModalOpen, handleOk, handleCancel, userId }: Props) => {
    const [form] = Form.useForm();
    const { mutate: banAccount, isPending } = useBanAccount();

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        if (userId) {
            banAccount(
                {
                    userId,
                    reason: values.reason,
                },
                {
                    onSuccess() {
                        form.resetFields();
                        handleOk();
                    },
                }
            );
        }
    };
    return (
        <Modal
            title='Khóa tài khoản'
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
                <Form.Item<FieldType> name='reason' label='Lý do'>
                    <TextArea cols={15} rows={4} />
                </Form.Item>
                <Form.Item>
                    <Button disabled={isPending} loading={isPending} type='primary' htmlType='submit'>
                        Khóa tài khoản
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default BanAccountModal;
