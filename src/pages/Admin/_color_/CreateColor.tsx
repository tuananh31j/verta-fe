/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { ADMIN_ROUTES } from '~/constants/router';
import { useMutationCreateColor } from '~/hooks/Colors/Mutations/useCreateColor';
import { IColorFormData } from '~/types/Color';
import { colorHexValidator, colorNameValidator } from '~/validations/color/validator';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Button, ColorPicker, Form, FormProps, Input, theme } from 'antd';
import { Link } from 'react-router-dom';
import WrapperPageAdmin from '../_common';
import { useEffect, useState } from 'react';
import { useToast } from '~/context/ToastProvider';

const CreateColors = () => {
    const [form] = Form.useForm<IColorFormData>();
    const { mutate: createColor, isPending } = useMutationCreateColor();
    const { token } = theme.useToken();
    const toast = useToast();

    const [selectedColor, setSelectedColor] = useState<string>('#ffffff');

    useEffect(() => {
        const hex = form.getFieldValue('hex');
        if (hex) {
            setSelectedColor(hex);
        }
    }, [form.getFieldValue('hex')]);

    const normalizeColorName = (colorName: string): string => {
        return colorName.trim().toLowerCase();
    };

    const onFinish: FormProps<IColorFormData>['onFinish'] = (values) => {
        if (values.hex) {
            const normalizedValues = {
                ...values,
                name: normalizeColorName(values.name),
            };

            createColor(normalizedValues, {
                onSuccess: () => {
                    toast('success', 'Tạo màu mới thành công!');
                },
                onError: (error: any) => {
                    const errorMessage = error?.message || 'Có lỗi xảy ra!';
                    toast('error', errorMessage);
                },
            });
        }
    };

    const handleColorChange = (color: any) => {
        const hexColor = color.toHexString?.() || color.toString();
        form.setFieldsValue({ hex: hexColor });
        setSelectedColor(hexColor);
    };

    const handleNameBlur = () => {
        const currentName = form.getFieldValue('name');
        if (currentName) {
            const normalizedName = normalizeColorName(currentName);
            form.setFieldsValue({ name: normalizedName });
        }
    };

    return (
        <WrapperPageAdmin
            title='Tạo mới màu sắc'
            option={
                <Link
                    to={ADMIN_ROUTES.COLORS}
                    className='text-primary hover:text-primary/80 flex items-center gap-2 transition-colors'
                >
                    <span className='border-b border-dashed border-current'>Quay lại danh sách</span>
                </Link>
            }
        >
            <div className='rounded-lg border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-800'>
                <Form form={form} layout='vertical' className='p-6' onFinish={onFinish}>
                    <div className='grid grid-cols-1 gap-6 lg:grid-cols-12'>
                        <div className='space-y-6 lg:col-span-8'>
                            <Form.Item<IColorFormData>
                                label={<span className='text-[15px] font-medium text-gray-800'>Tên màu sắc</span>}
                                name='name'
                                rules={colorNameValidator}
                                validateFirst
                                tooltip='Tên màu sẽ tự động được chuyển thành chữ thường để tránh trùng lặp'
                            >
                                <Input
                                    placeholder='Ví dụ: đỏ cờ, xanh dương đậm...'
                                    size='large'
                                    className='hover:border-primary/50 focus:border-primary rounded-lg'
                                    onBlur={handleNameBlur}
                                />
                            </Form.Item>

                            <Form.Item<IColorFormData>
                                label={<span className='text-[15px] font-medium text-gray-800'>Chọn màu</span>}
                                name='hex'
                                rules={colorHexValidator}
                                getValueFromEvent={(color) => {
                                    if (typeof color === 'string') {
                                        return color;
                                    }
                                    return color.toHexString?.() || color.toString();
                                }}
                            >
                                <div className='flex items-center gap-4'>
                                    <ColorPicker
                                        showText
                                        size='large'
                                        format='hex'
                                        onChange={handleColorChange}
                                        value={selectedColor}
                                        panelRender={(panel) => (
                                            <div className='overflow-hidden rounded-lg shadow-lg'>{panel}</div>
                                        )}
                                    />
                                    <div className='hidden md:block'>
                                        <p className='mb-2 text-sm text-gray-500'>Màu đã chọn:</p>
                                        <div
                                            className='h-20 w-20 rounded-lg border-4 border-white shadow-lg'
                                            style={{
                                                backgroundColor: selectedColor,
                                                transition: 'background-color 0.3s',
                                            }}
                                        />
                                    </div>
                                </div>
                            </Form.Item>
                        </div>
                        <div className='lg:col-span-4 lg:border-l lg:border-gray-100 lg:pl-6 lg:dark:border-gray-800'>
                            <div className='sticky top-6 space-y-6'>
                                <div className='rounded-lg border border-blue-100 bg-blue-50/50 p-4'>
                                    <h4 className='mb-2 text-sm font-semibold text-blue-800'>Mẹo:</h4>
                                    <p className='text-sm text-blue-700'>
                                        Sử dụng tên màu mô tả rõ ràng và chọn mã màu phù hợp. Tên màu sẽ tự động được
                                        chuyển thành chữ thường để tránh trùng lặp.
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
                                    Thêm màu mới
                                </Button>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </WrapperPageAdmin>
    );
};

export default CreateColors;
