import { PlusOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, message, Modal, Select, TreeSelect, Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { RcFile } from 'antd/es/upload';
import { UploadFile, UploadProps } from 'antd/lib';
import { UploadChangeParam } from 'antd/lib/upload';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import WrapperCard from '~/components/_common/WrapperCard';
import { ADMIN_ROUTES } from '~/constants/router';
import { useCreatePro } from '~/hooks/mutations/products/useCreatePro';
import { useGetAllCate } from '~/hooks/queries/catrgories/useGetAllCate';
import { useGetProductDetailsForAdmin } from '~/hooks/queries/products/useGetProductDetailsForAdmin';
import WrapperPageAdmin from '~/pages/Admins/_common/WrapperPageAdmin';
import { productServices } from '~/services/product.service';
import { uploadService } from '~/services/upload.service';
import { SizeEnum } from '~/types/enum';
import { ICreateProductPayload } from '~/types/product';
import { ICreateVariant } from '~/types/variant';

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(`Error: ${error}`);
    });

const UpdateProduct = () => {
    const [form] = Form.useForm<any>();
    const { productId } = useParams<{ productId: string }>();
    const navigater = useNavigate();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [category, setCategory] = useState<string | undefined>(undefined);
    const { data: categoryList } = useGetAllCate();
    const { mutateAsync: createPro } = useCreatePro();
    const { data: productDetails } = useGetProductDetailsForAdmin(productId as string);
    console.log(productDetails, 'oooooo');
    const categoriesTreeData = categoryList?.map((cate) => {
        if (cate.items.length === 0) {
            return {
                title: cate.name,
                value: cate._id,
            };
        }
        return {
            title: cate.name,
            value: cate._id,
            children: cate.items.map((item) => ({
                title: item.name,
                value: `${cate._id},${item._id}`,
            })),
        };
    });

    const selectCate = (value: string) => {
        console.log(value);
        setCategory(value);
    };
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
            return false;
        }

        const isLt100M = file.size / 1024 / 1024 < 100;
        if (!isLt100M) {
            message.error('Ảnh phải nhỏ hơn 100MB!');
            return false;
        }

        return false;
    };

    const onFinish = async (values: any) => {
        try {
            const formDataThumnail = new FormData();
            if (values.thumbnail.fileList[0].originFileObj) {
                formDataThumnail.append('image', values.thumbnail.fileList[0].originFileObj);
                const thumbnailRes = await uploadService.uploadImage(formDataThumnail);
                values.thumbnail = thumbnailRes.downloadURL;
            }

            const variantsPayload: ICreateVariant[] = (
                await Promise.all(
                    values.variants.map(async (variant: any) => {
                        const formDataVariant = new FormData();
                        if (variant.image[0].originFileObj) {
                            formDataVariant.append('image', variant.image[0].originFileObj);
                            const variantRes = await uploadService.uploadImage(formDataVariant);
                            variant.image = variantRes.downloadURL;
                        }
                        return variant.properties.map((property: any) => ({
                            size: property.size,
                            stock: property.stock,
                            color: variant.color,
                            image: variant.image,
                        }));
                    })
                )
            ).flat();

            const updatePayload: any = {
                name: values.name,
                price: values.price,
                thumbnail: values.thumbnail,
                summary: values.summary,
                type: { hasColor: true, sizeType: values.sizeType || SizeEnum.FreeSize },
                variants: variantsPayload,
                categories: values.categories.split(','),
            };

            // await updateProduct(updatePayload);
            message.success('Cập nhật sản phẩm thành công!');
            navigater(ADMIN_ROUTES.PRODUCTS);
        } catch (error) {
            console.log(error);
            message.error('Cập nhật sản phẩm thất bại!');
        }
    };
    const [isOK, setIsOk] = useState(false);
    useEffect(() => {
        if (productDetails) {
            const { name, price, summary, categories, thumbnail, variants, type } = productDetails;
            console.log(
                {
                    name,
                    price,
                    summary,
                    categories,
                    sizeType: type.sizeType,
                    thumbnail,
                    variants,
                },
                'ok ko'
            );
            // Điền dữ liệu vào form
            form.setFieldsValue({
                name,
                price,
                summary,
                categories,
                sizeType: type.sizeType,
                thumbnail: thumbnail.fileList,
                variants,
            });
            setIsOk(true);
        }
        console.log(form.getFieldValue('variants'), 'ooooooooooooooooooo');
    }, [productDetails, form, isOK]);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const handleThumbnailChange = (info: UploadChangeParam) => {
        let newFileList = [...info.fileList];

        // Nếu bạn muốn thay thế ảnh cũ khi chọn ảnh mới, giữ lại chỉ 1 file trong list
        if (newFileList.length > 1) {
            newFileList = newFileList.slice(-1); // Giữ lại 1 ảnh cuối cùng
        }

        setFileList(newFileList);

        // Cập nhật lại thumbnail trong form nếu file mới được chọn
        if (newFileList.length > 0) {
            form.setFieldsValue({
                thumbnail: newFileList,
            });
        }
    };
    return (
        <WrapperPageAdmin
            title='Cập nhật sản phẩm'
            option={
                <Link to={ADMIN_ROUTES.PRODUCTS} className='underline'>
                    Quay lại
                </Link>
            }
        >
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt='Preview' style={{ width: '100%' }} src={previewImage} />
            </Modal>
            <Form layout='vertical' form={form} onFinish={onFinish}>
                <div className='grid grid-cols-1 gap-4'>
                    <WrapperCard title='Thông tin cơ bản'>
                        <Form.Item<any>
                            label='Ảnh bìa'
                            name='thumbnail'
                            required
                            className='font-medium text-[#08090F]'
                            dependencies={['images']}
                        >
                            <span className='flex gap-3'>
                                {/* <Upload
                                    name='thumbnail'
                                    listType='picture-card'
                                    beforeUpload={beforeUpload}
                                    maxCount={1}
                                    onPreview={handlePreview}
                                    fileList={isOK ? form.getFieldValue('thumbnail') : []}
                                >
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                </Upload> */}
                                <Upload
                                    name='thumbnail'
                                    listType='picture-card'
                                    beforeUpload={beforeUpload}
                                    maxCount={1}
                                    onPreview={handlePreview}
                                    fileList={form.getFieldValue('thumbnail')}
                                    onChange={handleThumbnailChange}
                                >
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                </Upload>
                            </span>
                        </Form.Item>
                        <Form.Item<any>
                            label='Tên sản phẩm'
                            name='name'
                            required
                            className='font-medium text-[#08090F]'
                        >
                            <Input placeholder='Nhập tên sản phẩm...' size='large' />
                        </Form.Item>
                        <Form.Item<any>
                            label='Danh mục'
                            name='categories'
                            required
                            className='font-medium text-[#08090F]'
                        >
                            <TreeSelect
                                treeData={categoriesTreeData}
                                value={form.getFieldValue('categories')}
                                className='font-medium text-[#08090F]'
                                placeholder='Chọn danh mục sản phẩm...'
                                treeDefaultExpandAll
                                size='large'
                                onChange={(value) => form.setFieldsValue({ categories: value })}
                            />
                        </Form.Item>
                        <Form.Item<any> label='Giá cả' name='price' required className='font-medium text-[#08090F]'>
                            <InputNumber
                                prefix='đ'
                                placeholder='Nhập giá thành...'
                                size='large'
                                style={{ width: '100%' }}
                            />
                        </Form.Item>

                        <Form.Item<any> required label='Mô tả' name='summary' className='font-medium text-[#08090F]'>
                            <TextArea placeholder='Nhập mô tả sản phẩm...' rows={4} className='w-full' />
                        </Form.Item>
                    </WrapperCard>

                    <WrapperCard title='Thông tin biến thể'>
                        <Form.Item name='sizeType' label='Loại cỡ' required>
                            <Select
                                defaultValue={SizeEnum.FreeSize}
                                style={{ width: 120 }}
                                size='large'
                                options={[
                                    { value: SizeEnum.FreeSize, label: 'Free size' },
                                    { value: SizeEnum.NumericSize, label: 'Numeric size' },
                                ]}
                            />
                        </Form.Item>

                        <Form.List name='variants'>
                            {(variants, { add: addVariant, remove: removeVariant }) => (
                                <>
                                    {variants.map((variant, variantIndex) => (
                                        <div
                                            key={variant.key}
                                            className='mb-4 rounded border p-4'
                                            style={{ border: '1px solid #e8e8e8' }}
                                        >
                                            <Form.Item
                                                label={`Màu sắc biến thể (${variantIndex + 1})`}
                                                name={[variant.name, 'color']}
                                                rules={[{ required: true, message: 'Vui lòng chọn màu sắc biến thể' }]}
                                            >
                                                <Select
                                                    placeholder='Chọn màu sắc'
                                                    size='large'
                                                    options={[
                                                        { value: 'Vàng', label: 'Vàng' },
                                                        { value: 'Đỏ', label: 'Đỏ' },
                                                    ]}
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                label={`Ảnh biến thể (${variantIndex + 1})`}
                                                name={[variant.name, 'image']}
                                                valuePropName='fileList'
                                                getValueFromEvent={normFile}
                                            >
                                                <Upload
                                                    listType='picture-card'
                                                    beforeUpload={beforeUpload}
                                                    onPreview={handlePreview}
                                                    maxCount={1}
                                                >
                                                    <div>
                                                        <PlusOutlined />
                                                        <div style={{ marginTop: 8 }}>Upload</div>
                                                    </div>
                                                </Upload>
                                            </Form.Item>

                                            {/* Nested List cho các thuộc tính con */}
                                            <Form.List name={[variant.name, 'properties']}>
                                                {(properties, { add: addProperty, remove: removeProperty }) => (
                                                    <>
                                                        {properties.map((property, propertyIndex) => (
                                                            <div
                                                                key={property.key}
                                                                className='mt-4 ml-4 rounded border p-4'
                                                                style={{ border: '1px solid #f0f0f0' }}
                                                            >
                                                                <Form.Item
                                                                    className='hidden'
                                                                    name={[property.name, '_id']}
                                                                >
                                                                    <Input className='hidden' />
                                                                </Form.Item>
                                                                <Form.Item
                                                                    label={`Size (${propertyIndex + 1})`}
                                                                    name={[property.name, 'size']}
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            message: 'Vui lòng chọn size',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Select
                                                                        placeholder='Chọn kích cỡ'
                                                                        size='large'
                                                                        options={[
                                                                            { value: '30', label: '30' },
                                                                            { value: '31', label: '31' },
                                                                        ]}
                                                                    />
                                                                </Form.Item>

                                                                <Form.Item
                                                                    label={`Tồn kho (${propertyIndex + 1})`}
                                                                    name={[property.name, 'stock']}
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            message: 'Vui lòng nhập số lượng',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <InputNumber
                                                                        placeholder='Nhập số lượng...'
                                                                        size='large'
                                                                        style={{ width: '100%' }}
                                                                    />
                                                                </Form.Item>

                                                                <Button
                                                                    danger
                                                                    htmlType='button'
                                                                    onClick={() => removeProperty(property.name)}
                                                                    className='mb-2'
                                                                >
                                                                    Xóa thuộc tính
                                                                </Button>
                                                            </div>
                                                        ))}

                                                        <Button
                                                            type='dashed'
                                                            style={{ width: 300, display: 'block' }}
                                                            onClick={() => addProperty()}
                                                            className='my-4'
                                                            icon={<PlusOutlined />}
                                                            block
                                                            htmlType='button'
                                                        >
                                                            Thêm thuộc tính
                                                        </Button>
                                                    </>
                                                )}
                                            </Form.List>

                                            <Button
                                                htmlType='button'
                                                danger
                                                onClick={() => removeVariant(variant.name)}
                                                className='mt-2'
                                            >
                                                Xóa biến thể
                                            </Button>
                                        </div>
                                    ))}

                                    <Button
                                        type='dashed'
                                        htmlType='button'
                                        onClick={() => addVariant()}
                                        icon={<PlusOutlined />}
                                        block
                                    >
                                        Thêm biến thể
                                    </Button>
                                </>
                            )}
                        </Form.List>
                    </WrapperCard>
                </div>
                <div className='border-opacity-5 sticky right-0 bottom-0 my-2 flex justify-end rounded-md border-t-2 border-gray-500 bg-white p-4'>
                    <Button
                        type='primary'
                        htmlType='submit'
                        icon={<PlusSquareOutlined />}
                        className='mr-3 px-5'
                        // loading={isPending && !isHide}
                        // disabled={isPending}
                        size='large'
                        // onClick={handleSaveAndShow}
                    >
                        Lưu
                    </Button>
                </div>
            </Form>
        </WrapperPageAdmin>
    );
};
export default UpdateProduct;
