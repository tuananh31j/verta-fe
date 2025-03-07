import { ArrowLeftOutlined, MinusCircleOutlined, PlusOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { Alert, Button, Card, Form, FormProps, Input, theme } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ADMIN_ROUTES } from '~/constants/router';
import { useMutationUpdateCategory } from '~/hooks/mutations/categories/useUpdateCategory';
import { useGetCateDetails } from '~/hooks/queries/categories/useGetCateDetails';
import { ICateUpdateFormData } from '~/types/Category';
import WrapperPageAdmin from '../_common';

const UpdateCategory = () => {
    const [form] = Form.useForm<ICateUpdateFormData>();
    const { mutate: updateCategory, isPending } = useMutationUpdateCategory();
    const { token } = theme.useToken();
    const { id } = useParams();

    const [lengthItem, setLengthItem] = useState<number>(1);

    const { data: cateDetails } = useGetCateDetails(id as string);
    console.log(cateDetails);

    const onFinish: FormProps<ICateUpdateFormData>['onFinish'] = (values) => {
        if (!values.items || values.items.length == 0) {
            delete values.items;
        }

        updateCategory({ id: id as string, payload: values });
    };

    const onFinishFailed: FormProps<ICateUpdateFormData>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        if (cateDetails) {
            setLengthItem(cateDetails.items ? cateDetails.items?.length : 0);

            form.setFieldsValue({
                name: cateDetails.name,
                items: cateDetails.items,
            });
        }
    }, [cateDetails, form]);

    return (
        <WrapperPageAdmin
            title='Cập nhật danh mục'
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
                                <Form.Item<ICateUpdateFormData>
                                    label='Tên danh mục'
                                    name='name'
                                    rules={[{ required: true, message: 'Hãy nhập tên danh mục!' }]}
                                >
                                    <Input placeholder='Nhập tên danh mục tại đây' />
                                </Form.Item>

                                <Form.List name='items'>
                                    {(items, { add, remove }, { errors }) => (
                                        <>
                                            {items.map((item, index) => (
                                                <Form.Item label='Tên danh mục phụ' required={false} key={index}>
                                                    <Form.Item
                                                        {...item}
                                                        validateTrigger={['onChange', 'onBlur']}
                                                        name={[item.name, 'name']}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                whitespace: true,
                                                                message: 'Nhập tên danh mục phụ hoặc xóa trường này!',
                                                            },
                                                        ]}
                                                        noStyle
                                                    >
                                                        <Input
                                                            placeholder='Nhập tên danh mục phụ tại đây'
                                                            style={{ width: '80%' }}
                                                        />
                                                    </Form.Item>

                                                    <Form.Item name={[item.name, '_id']} hidden>
                                                        <Input hidden />
                                                    </Form.Item>

                                                    {index + 1 > lengthItem ? (
                                                        <MinusCircleOutlined
                                                            className='dynamic-delete-button ml-1'
                                                            onClick={() => remove(item.name)}
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
                                                    Thêm danh mục phụ
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
                                            <li>Danh mục phụ không bắt buộc</li>
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
                                    {isPending ? 'Đang xử lý...' : 'Cập nhật danh mục'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </WrapperPageAdmin>
    );
};

export default UpdateCategory;
