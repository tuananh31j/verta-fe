import { EditOutlined } from '@ant-design/icons';
import { Button, Form, FormProps, Input } from 'antd';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ADMIN_ROUTES } from '~/constants/router';
import { useMutationUpdateSize } from '~/hooks/Sizes/Mutations/useUpdateSize';
import useGetDetailSize from '~/hooks/Sizes/Queries/useGetDetailSize';
import { ISizeFormData } from '~/types/Size';
import showMessage from '~/utils/ShowMessage';
import { sizeNameValidator } from '~/validations/size/validator';
import WrapperPageAdmin from '../_common';

const UpdateSize = () => {
    const { id } = useParams();
    const { data: sizeRes } = useGetDetailSize(id as string);
    const [form] = Form.useForm<ISizeFormData>();
    const { mutate: updateCategory, isPending } = useMutationUpdateSize();

    const onFinish: FormProps<ISizeFormData>['onFinish'] = (values) => {
        if (id) {
            updateCategory({ id, payload: values });
        } else {
            showMessage('Không tìm thấy _id size', 'error');
        }
    };
    const onFinishFailed: FormProps<ISizeFormData>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        form.setFieldValue('value', sizeRes?.value);
    }, [sizeRes]);

    return (
        <WrapperPageAdmin
            title='Cập nhật thông tin kích cỡ'
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
                        <Form.Item<ISizeFormData>
                            label='Tên kích cỡ'
                            name='value'
                            className='font-medium text-[#08090F]'
                            rules={sizeNameValidator}
                        >
                            <Input placeholder='Nhập tên cho kích cỡ...' />
                        </Form.Item>
                    </div>
                </div>
                <div className='border-opacity-20 col-span-4 flex flex-col justify-between border-s border-black px-4'>
                    <div className='border-opacity-5 sticky right-0 bottom-0 my-2 flex justify-end border-t-2 border-black py-4'>
                        <Button
                            type='primary'
                            htmlType='submit'
                            icon={<EditOutlined />}
                            className='px-5'
                            loading={isPending}
                            disabled={isPending}
                            size='large'
                        >
                            Cập nhật
                        </Button>
                    </div>
                </div>
            </Form>
        </WrapperPageAdmin>
    );
};

export default UpdateSize;
