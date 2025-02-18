import { ADMIN_ROUTES } from '~/constants/router';
import { useMutationCreateSize } from '~/hooks/Sizes/Mutations/useCreateSize';
import { ISizeFormData } from '~/types/Size';
import { sizeNameValidator } from '~/validations/size/validator';
import { PlusSquareOutlined, ArrowLeftOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Button, Form, FormProps, Input, theme, Card, Alert } from 'antd';
import { Link } from 'react-router-dom';
import WrapperPageAdmin from '../_common/WrapperPageAdmin';

const CreateSize = () => {
    const [form] = Form.useForm<ISizeFormData>();
    const { mutate: createSize, isPending } = useMutationCreateSize();
    const { token } = theme.useToken();

    const onFinish: FormProps<ISizeFormData>['onFinish'] = (values) => {
        createSize(values);
    };

    const onFinishFailed: FormProps<ISizeFormData>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <WrapperPageAdmin
            title='Tạo mới kích cỡ'
            option={
                <Link
                    to={ADMIN_ROUTES.SIZES}
                    className='text-primary hover:text-primary/80 flex items-center gap-2 transition-all duration-300'
                >
                    <ArrowLeftOutlined />
                    <span className='border-b border-dashed border-current'>Quay lại danh sách</span>
                </Link>
            }
        >
            <div className='rounded-xl border border-gray-100 bg-white py-4 shadow-sm dark:border-gray-800'>
                <Form form={form} layout='vertical' className='p-6' onFinish={onFinish} onFinishFailed={onFinishFailed}>
                    <div className='grid grid-cols-1 gap-8 lg:grid-cols-12'>
                        <div className='space-y-6 lg:col-span-8'>
                            <Card
                                className='border border-gray-100 shadow-sm transition-shadow duration-300 hover:shadow-md'
                                title={<span className='text-base font-medium text-gray-800'>Thông tin kích cỡ</span>}
                            >
                                <Form.Item<ISizeFormData>
                                    label={<span className='text-gray-700'>Tên kích cỡ</span>}
                                    name='name'
                                    rules={sizeNameValidator}
                                    validateFirst
                                    tooltip={{
                                        title: 'Tên kích cỡ sẽ hiển thị trong danh sách sản phẩm',
                                        icon: <InfoCircleOutlined className='text-gray-400' />,
                                    }}
                                >
                                    <Input
                                        placeholder='Ví dụ: S, M, L, XL, XXL...'
                                        size='large'
                                        className='hover:border-primary/50 focus:border-primary rounded-lg transition-colors'
                                    />
                                </Form.Item>
                            </Card>
                        </div>

                        <div className='lg:col-span-4 lg:border-l lg:border-gray-100 lg:pl-8 lg:dark:border-gray-800'>
                            <div className='sticky top-6 space-y-6'>
                                <Alert
                                    message='Lưu ý quan trọng'
                                    description={
                                        <ul className='list-disc space-y-1 pl-4 text-sm'>
                                            <li>Tên kích cỡ nên ngắn gọn, dễ hiểu</li>
                                            <li>Đảm bảo tên không trùng với kích cỡ đã có</li>
                                            <li>Có thể chỉnh sửa sau khi tạo</li>
                                        </ul>
                                    }
                                    type='info'
                                    showIcon
                                    className='border-blue-100 bg-blue-50/50'
                                />

                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    icon={<PlusSquareOutlined />}
                                    loading={isPending}
                                    disabled={isPending}
                                    size='large'
                                    block
                                    className='mt-3 h-12 text-base font-medium shadow-md transition-all duration-300 hover:shadow-lg'
                                    style={{
                                        backgroundColor: token.colorPrimary,
                                        borderColor: token.colorPrimary,
                                    }}
                                >
                                    {isPending ? 'Đang xử lý...' : 'Thêm kích cỡ mới'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </WrapperPageAdmin>
    );
};

export default CreateSize;
