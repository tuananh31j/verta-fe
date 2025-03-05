import { EditOutlined } from '@ant-design/icons';
import { Button, Form, FormProps, Input } from 'antd';
import { useEffect, useState } from 'react';
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
    const [sizeType, setSizeType] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const formattedValue = value.trim();
        const finalValue = sizeType === 'numericsize' ? formattedValue : formattedValue.toUpperCase();

        if (finalValue !== value) {
            form.setFieldValue('value', finalValue);
        }
    };

    const onFinish: FormProps<ISizeFormData>['onFinish'] = (values) => {
        if (id) {
            const formattedValues = {
                ...values,
                value: sizeType === 'numericsize' ? values.value.trim() : values.value.trim().toUpperCase(),
            };
            updateCategory({ id, payload: formattedValues });
        } else {
            showMessage('Không tìm thấy _id size', 'error');
        }
    };

    const onFinishFailed: FormProps<ISizeFormData>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        if (sizeRes) {
            form.setFieldValue('value', sizeRes.value);
            setSizeType(/^\d+$/.test(sizeRes.value) ? 'numericsize' : 'freesize');
        }
    }, [sizeRes, form]);

    const extendedSizeValidator = [
        ...sizeNameValidator,
        {
            validator: (_: any, value: any) => {
                if (!value) return Promise.resolve();

                if (value !== value.trim()) {
                    return Promise.reject('Giá trị không được chứa khoảng trắng ở đầu hoặc cuối!');
                }

                if (sizeType === 'numericsize') {
                    const isNumeric = /^\d+$/.test(value);
                    if (!isNumeric) {
                        return Promise.reject('Kích cỡ số phải là một số!');
                    }
                } else {
                    if (value.includes(' ')) {
                        return Promise.reject('Giá trị không được chứa khoảng trắng!');
                    }
                }
                return Promise.resolve();
            },
        },
    ];

    return (
        <WrapperPageAdmin
            title='Cập nhật thông tin kích cỡ'
            option={
                <Link to={ADMIN_ROUTES.SIZES} className='underline'>
                    Quay lại
                </Link>
            }
        >
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
                            rules={extendedSizeValidator}
                            tooltip='Giá trị kích cỡ sẽ tự động chuyển thành chữ in hoa và không được chứa khoảng trắng'
                            getValueFromEvent={(e) => {
                                return e.target.value.trim();
                            }}
                            normalize={(value) => {
                                return sizeType === 'numericsize' ? value : value.toUpperCase();
                            }}
                        >
                            <Input placeholder='Nhập tên cho kích cỡ...' onChange={handleInputChange} />
                        </Form.Item>

                        <div className='mt-2 text-xs text-gray-500'>
                            <ul className='list-disc space-y-1 pl-4'>
                                <li>
                                    Giá trị kích cỡ sẽ tự động chuyển thành chữ in hoa{' '}
                                    {sizeType !== 'numericsize' && '(ví dụ: s → S)'}
                                </li>
                                <li>Không được chứa khoảng trắng trong giá trị kích cỡ</li>
                                {sizeType === 'numericsize' && <li>Kích cỡ số chỉ được nhập số</li>}
                            </ul>
                        </div>
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
