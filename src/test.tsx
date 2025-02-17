import React, { useState } from 'react';
import { Form, Input, Button, Space, Upload, message, Modal } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import type { RcFile } from 'antd/es/upload/interface';

interface FieldData {
    fieldName: string;
    fieldValue: string;
    image?: UploadFile[];
}

interface FormValues {
    fields: FieldData[];
}

// Hàm chuyển đổi file thành base64 string
const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const DynamicForm: React.FC = () => {
    const [form] = Form.useForm<FormValues>();
    // State để quản lý preview
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const normFile = (e: any): UploadFile[] => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const beforeUpload: UploadProps['beforeUpload'] = (file) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            message.error('Bạn chỉ có thể upload file ảnh!');
        }

        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Ảnh phải nhỏ hơn 2MB!');
        }

        return false; // Trả về false để ngăn upload tự động lên server
    };

    const onFinish = (values: FormValues) => {
        const formData = new FormData();

        values.fields.forEach((field, index) => {
            formData.append(`fieldName_${index}`, field.fieldName);
            formData.append(`fieldValue_${index}`, field.fieldValue);

            if (field.image && field.image.length > 0) {
                const file = field.image[0].originFileObj;
                if (file) {
                    formData.append(`image_${index}`, file);
                }
            }
        });

        console.log('Form values:', values);
        console.log(form);
        // Xử lý upload formData lên server khi cần
    };

    return (
        <>
            <Form<FormValues> form={form} name='dynamic_form' onFinish={onFinish} autoComplete='off' layout='vertical'>
                <Form.List name='fields'>
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align='baseline'>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'fieldName']}
                                        rules={[{ required: true, message: 'Vui lòng nhập tên trường' }]}
                                    >
                                        <Input placeholder='Tên trường' />
                                    </Form.Item>

                                    <Form.Item
                                        {...restField}
                                        name={[name, 'fieldValue']}
                                        rules={[{ required: true, message: 'Vui lòng nhập giá trị' }]}
                                    >
                                        <Input placeholder='Giá trị' />
                                    </Form.Item>

                                    <Form.Item
                                        {...restField}
                                        name={[name, 'image']}
                                        valuePropName='fileList'
                                        getValueFromEvent={normFile}
                                    >
                                        <Upload
                                            listType='picture-card'
                                            beforeUpload={beforeUpload}
                                            maxCount={1}
                                            onPreview={handlePreview}
                                        >
                                            <div>
                                                <PlusOutlined />
                                                <div style={{ marginTop: 8 }}>Upload</div>
                                            </div>
                                        </Upload>
                                    </Form.Item>

                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                </Space>
                            ))}

                            <Form.Item>
                                <Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
                                    Thêm trường
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>

                <Form.Item>
                    <Button type='primary' htmlType='submit'>
                        Gửi
                    </Button>
                </Form.Item>
            </Form>

            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt='Preview' style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>
    );
};

export default DynamicForm;
