import { ArrowLeftOutlined, MinusCircleOutlined, PlusOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { Alert, Button, Card, Form, FormProps, Input, theme } from 'antd';
import { Link } from 'react-router-dom';
import { ADMIN_ROUTES } from '~/constants/router';
import { useMutationCreateCategory } from '~/hooks/mutations/categories/useCreateCategory';
import { ICategoryFormData } from '~/types/Category';
import WrapperPageAdmin from '../_common';

const CreateCategory = () => {
    const [form] = Form.useForm<ICategoryFormData>();
    const { mutate: createCategory, isPending } = useMutationCreateCategory();
    const { token } = theme.useToken();

    const onFinish: FormProps<ICategoryFormData>['onFinish'] = (values) => {
        if (!values.items) {
            values.items = [];
        } else {
            values.items = values.items.map((item) => item.toLowerCase());
        }

        const payload = {
            name: values.name.toLowerCase(),
            items: values.items,
        };

        createCategory(payload);
    };

    const onFinishFailed: FormProps<ICategoryFormData>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <WrapperPageAdmin
            title='Tạo mới danh mục'
            option={
                <Link
                    to={ADMIN_ROUTES.CATEGORIES}
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
                        <div className='px-3 lg:col-span-8'>
                            <Card
                                className='border border-gray-100 shadow-sm transition-shadow duration-300 hover:shadow-md'
                                title={<span className='text-base font-medium text-gray-800'>Thông tin danh mục</span>}
                            >
                                <Form.Item<ICategoryFormData>
                                    label='Tên danh mục'
                                    name='name'
                                    rules={[{ required: true, message: 'Hãy nhập tên danh mục!' }]}
                                >
                                    <Input placeholder='Nhập tên danh mục tại đây' />
                                </Form.Item>

                                <Form.List name='items'>
                                    {(fields, { add, remove }, { errors }) => (
                                        <>
                                            {fields.map((field, index) => (
                                                <Form.Item label='Tên danh mục con' required={false} key={field.key}>
                                                    <Form.Item
                                                        {...field}
                                                        validateTrigger={['onChange', 'onBlur']}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                whitespace: true,
                                                                message: 'Nhập tên danh mục con hoặc xóa trường này!',
                                                            },
                                                        ]}
                                                        noStyle
                                                    >
                                                        <Input
                                                            placeholder='Nhập tên danh mục con tại đây'
                                                            style={{ width: '80%' }}
                                                        />
                                                    </Form.Item>

                                                    {fields.length >= 1 ? (
                                                        <MinusCircleOutlined
                                                            className='dynamic-delete-button ml-1'
                                                            onClick={() => remove(field.name)}
                                                        />
                                                    ) : null}
                                                </Form.Item>
                                            ))}

                                            <Form.Item>
                                                <Button
                                                    type='dashed'
                                                    onClick={() => add()}
                                                    style={{ width: '60%' }}
                                                    icon={<PlusOutlined />}
                                                >
                                                    Thêm danh mục con
                                                </Button>

                                                <Form.ErrorList errors={errors} />
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>
                            </Card>
                        </div>

                        <div className='lg:col-span-4 lg:border-l lg:border-gray-100 lg:pl-8 lg:dark:border-gray-800'>
                            <div className='sticky top-6 space-y-6'>
                                <Alert
                                    message='Lưu ý quan trọng'
                                    description={
                                        <ul className='list-disc space-y-1 pl-4 text-sm'>
                                            <li>Tên danh mục sẽ trở thành chữ in thường khi được gửi đi</li>
                                            <li>Danh mục con không bắt buộc</li>
                                            <li>
                                                Tên danh mục con không được trùng nhau ở trong cùng một danh mục hoặc ở
                                                trong danh mục khác
                                            </li>
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
                                    {isPending ? 'Đang xử lý...' : 'Thêm danh mục mới'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </WrapperPageAdmin>
    );
};

export default CreateCategory;
