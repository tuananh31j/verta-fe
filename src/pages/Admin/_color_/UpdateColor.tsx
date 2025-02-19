import { ADMIN_ROUTES } from '~/constants/router';
import { useMutationUpdateColor } from '~/hooks/Colors/Mutations/useUpdateColor';
import useGetDetailColor from '~/hooks/Colors/Queries/useGetDetailColor';
import { IColorFormData } from '~/types/Color';
import showMessage from '~/utils/ShowMessage';
import { sizeNameValidator } from '~/validations/size/validator';
import { EditOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { Button, ColorPicker, Form, FormProps, Input, theme } from 'antd';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import WrapperPageAdmin from '../_common/WrapperPageAdmin';
import { colorHexValidator } from '~/validations/color/validator';

const UpdateColor = () => {
    const { id } = useParams();
    const { data: colorRes } = useGetDetailColor(id as string);
    const [form] = Form.useForm<IColorFormData>();
    const { mutate: updateCategory, isPending } = useMutationUpdateColor();
    const { token } = theme.useToken();

    const onFinish: FormProps<IColorFormData>['onFinish'] = (values) => {
        if (id) {
            updateCategory({ id, payload: values });
        } else {
            showMessage('Không tìm thấy _id màu', 'error');
        }
    };
    const onFinishFailed: FormProps<IColorFormData>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        form.setFieldValue('name', colorRes?.name);
        form.setFieldValue('hex', colorRes?.hex);
    }, [colorRes]);

    return (
        <WrapperPageAdmin
            title='Cập nhật thông tin màu'
            option={
                <Link to={ADMIN_ROUTES.CATEGORIES} className='underline'>
                    Quay lại
                </Link>
            }
        >
            {' '}
            <Form
                form={form}
                layout='vertical'
                className='grid grid-cols-12'
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <div className='col-span-8'>
                    <div className='w-full rounded-lg p-2 px-4'>
                        <Form.Item<IColorFormData>
                            label='Tên màu'
                            name='name'
                            className='font-medium text-[#08090F]'
                            rules={sizeNameValidator}
                        >
                            <Input placeholder='Nhập tên cho màu...' />
                        </Form.Item>
                    </div>
                    <div className='w-full rounded-lg p-2 px-4'>
                        <Form.Item<IColorFormData>
                            label='Màu sắc'
                            name='hex'
                            className='font-medium text-[#08090F]'
                            getValueFromEvent={(hex) => hex.toHexString()}
                            rules={colorHexValidator}
                            initialValue={'#fffff'}
                        >
                            <ColorPicker showText />
                        </Form.Item>
                    </div>
                </div>
                <div className='lg:col-span-4 lg:border-l lg:border-gray-100 lg:pl-6 lg:dark:border-gray-800'>
                    <div className='sticky top-6 space-y-6'>
                        <div className='rounded-lg border border-blue-100 bg-blue-50/50 p-4'>
                            <h4 className='mb-2 text-sm font-semibold text-blue-800'>Mẹo:</h4>
                            <p className='text-sm text-blue-700'>
                                Sử dụng tên màu mô tả rõ ràng và chọn mã màu phù hợp
                            </p>
                        </div>
                        <Button
                            type='primary'
                            htmlType='submit'
                            icon={<PlusSquareOutlined />}
                            loading={isPending}
                            disabled={isPending}
                            size='large'
                            block
                            className='h-12 text-base font-medium shadow-md transition-all hover:shadow-lg'
                            style={{
                                backgroundColor: token.colorPrimary,
                                borderColor: token.colorPrimary,
                            }}
                        >
                            Cập nhật
                        </Button>
                    </div>
                </div>
            </Form>
        </WrapperPageAdmin>
    );
};

export default UpdateColor;
