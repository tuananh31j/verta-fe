/* eslint-disable @typescript-eslint/no-explicit-any */
import { CloseOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, message, Modal, Select, TreeSelect, Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { RcFile } from 'antd/es/upload';
import { UploadFile, UploadProps } from 'antd/lib';
import { UploadChangeParam } from 'antd/lib/upload';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import WrapperCard from '~/components/_common/WrapperCard';
import { ADMIN_ROUTES } from '~/constants/router';
import useGetAllColors from '~/hooks/Colors/Queries/useGetAllColors';
import { useUpdatePro } from '~/hooks/mutations/products/useUpdatePro';
import { useGetAllCate } from '~/hooks/queries/catrgories/useGetAllCate';
import { useGetProductDetailsForAdmin } from '~/hooks/queries/products/useGetProductDetailsForAdmin';
import useGetAllSizes from '~/hooks/Sizes/Queries/useGetAllSizes';
import WrapperPageAdmin from '~/pages/Admin/_common/WrapperPageAdmin';
import { uploadService } from '~/services/upload.service';
import { SizeEnum } from '~/types/enum';
import { ICreateVariant } from '~/types/Variant';

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(`Error: ${error}`);
    });

const UpdateProduct = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm<any>();
    const { productId } = useParams<{ productId: string }>();
    const navigate = useNavigate();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [_, setFileList] = useState<UploadFile[]>([]);

    const { mutate: updateProduct } = useUpdatePro();

    const { data: categoryList } = useGetAllCate();
    const { data: productDetails } = useGetProductDetailsForAdmin(productId as string);
    const [typeSize, setTypeSize] = useState<SizeEnum>(SizeEnum.FreeSize);
    const { data: colorList } = useGetAllColors();
    const { data: sizeList } = useGetAllSizes({ type: typeSize });
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
    const handleThumbnailChange = (info: UploadChangeParam) => {
        let newFileList = [...info.fileList];

        if (newFileList.length > 1) {
            newFileList = newFileList.slice(-1);
        }

        setFileList(newFileList);

        if (newFileList.length > 0) {
            form.setFieldsValue({
                thumbnail: newFileList,
            });
        }
    };

    const onFinish = async (values: any) => {
        setIsLoading(true);
        if (!values.variants || values.variants.length === 0) {
            message.error('Vui lòng thêm biến thể cho sản phẩm!');
            return setIsLoading(false);
        }

        try {
            const formDataThumnail = new FormData();
            const thumb: any = {
                thumbnail: null,
                thumbnailRef: null,
            };
            if (values.thumbnail[0] && values.thumbnail[0].originFileObj) {
                formDataThumnail.append('image', values.thumbnail[0].originFileObj);
                const thumbnailRes = await uploadService.uploadImage(formDataThumnail);
                thumb.thumbnail = thumbnailRes.downloadURL;
                thumb.thumbnailRef = thumbnailRes.urlRef;
            }

            const variantsPayload: ICreateVariant[] = (
                await Promise.all(
                    values.variants.map(async (variant: any) => {
                        const formDataVariant = new FormData();
                        if (!variant.properties || variant.properties.length === 0) {
                            throw Error('Vui lòng thêm thuộc tính cho biến thể!');
                        }
                        if (variant.image[0].originFileObj) {
                            formDataVariant.append('image', variant.image[0].originFileObj);
                            const variantRes = await uploadService.uploadImage(formDataVariant);
                            return variant.properties.map((property: any) => ({
                                _id: property._id || null,
                                size: property.size,
                                stock: property.stock,
                                color: variant.color,
                                image: variantRes.downloadURL,
                                imageRef: variantRes.urlRef,
                            }));
                        }
                        console.log(variant.image, 'variant.image');
                        return variant.properties.map((property: any) => ({
                            _id: property._id || null,
                            size: property.size,
                            stock: property.stock,
                            color: variant.color,
                            image: variant.image[0].url,
                            imageRef: variant.image[0].name,
                        }));
                    })
                )
            ).flat();
            const imageRefVariants = [...variantsPayload.map((variant) => variant.imageRef), thumb.thumbnailRef].filter(
                (item) => item
            );

            const updatePayload: any = {
                name: values.name,
                price: values.price,
                thumbnail: thumb.thumbnail,
                thumbnailRef: thumb.thumbnailRef,
                summary: values.summary,
                variants: variantsPayload,
                categories: values.categories.split(','),
                imageRefVariants,
            };
            console.log(updatePayload);
            await updateProduct({ id: productId!, data: updatePayload });
            navigate(ADMIN_ROUTES.PRODUCTS);
        } catch (err) {
            if (err instanceof Error) {
                message.error(err.message);
            } else {
                message.error('Vui lòng điền đầy đủ thông tin!');
            }
        }
    };

    useEffect(() => {
        if (productDetails) {
            const { name, price, summary, categories, thumbnail, variants, type } = productDetails;
            form.setFieldsValue({
                name,
                price,
                summary,
                categories,
                sizeType: type.sizeType,
                thumbnail,
                variants,
            });
        }
        setFileList([]);
    }, [productDetails, form]);

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
                                disabled
                                defaultValue={SizeEnum.FreeSize}
                                style={{ width: 140 }}
                                onChange={(value) => setTypeSize(value)}
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
                                                    options={colorList?.map((color) => {
                                                        return {
                                                            value: color._id,
                                                            label: <p>{color.name}</p>,
                                                        };
                                                    })}
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
                                                                {/* @ID */}
                                                                <Form.Item
                                                                    className='hidden'
                                                                    name={[property.name, '_id']}
                                                                >
                                                                    <Input />
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
                                                                        options={sizeList?.map((size) => ({
                                                                            value: size._id,
                                                                            label: <p>{size.value}</p>,
                                                                        }))}
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
                                                                    icon={<CloseOutlined />}
                                                                    onClick={() => removeProperty(property.name)}
                                                                    className='mb-2'
                                                                >
                                                                    Xóa thuộc tính
                                                                </Button>
                                                            </div>
                                                        ))}

                                                        <Button
                                                            type='dashed'
                                                            style={{ width: 300 }}
                                                            onClick={() => addProperty()}
                                                            className='my-4'
                                                            icon={<PlusOutlined />}
                                                            block
                                                            htmlType='button'
                                                            disabled={properties.length >= 8}
                                                        >
                                                            Thêm thuộc tính
                                                        </Button>
                                                    </>
                                                )}
                                            </Form.List>

                                            <div className='flex justify-end'>
                                                <Button
                                                    htmlType='button'
                                                    danger
                                                    icon={<DeleteOutlined />}
                                                    onClick={() => removeVariant(variant.name)}
                                                    className='text mt-2'
                                                >
                                                    Xóa biến thể
                                                </Button>
                                            </div>
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
                        icon={<EditOutlined />}
                        className='mr-3 px-5'
                        loading={isLoading}
                        disabled={isLoading}
                        size='large'
                        // onClick={handleSaveAndShow}
                    >
                        Cập nhật
                    </Button>
                </div>
            </Form>
        </WrapperPageAdmin>
    );
};
export default UpdateProduct;
