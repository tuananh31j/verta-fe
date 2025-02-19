/* eslint-disable @typescript-eslint/no-explicit-any */
import { CloseOutlined, DeleteOutlined, PlusOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, message, Modal, Select, TreeSelect, Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { RcFile } from 'antd/es/upload';
import { UploadFile, UploadProps } from 'antd/lib';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import WrapperCard from '~/components/_common/WrapperCard';
import { ADMIN_ROUTES } from '~/constants/router';
import useGetAllColors from '~/hooks/Colors/Queries/useGetAllColors';
import { useCreatePro } from '~/hooks/mutations/products/useCreatePro';
import { useGetAllCate } from '~/hooks/queries/catrgories/useGetAllCate';
import useGetAllSizes from '~/hooks/Sizes/Queries/useGetAllSizes';
import WrapperPageAdmin from '~/pages/Admins/_common/WrapperPageAdmin';
import { productServices } from '~/services/product.service';
import { uploadService } from '~/services/upload.service';
import { SizeEnum } from '~/types/enum';
import { ICreateProductPayload } from '~/types/Product';
import { ICreateVariant } from '~/types/Variant';

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(`Error: ${error}`);
    });

const CreateProduct = () => {
    const [form] = Form.useForm<any>();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const { data: categoryList } = useGetAllCate();
    const { mutateAsync: createPro } = useCreatePro();
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

    const onFinish = async (values: any) => {
        setIsLoading(true);
        if (!values.variants || values.variants.length === 0) {
            message.error('Vui lòng thêm biến thể cho sản phẩm!');
            return setIsLoading(false);
        }

        try {
            const formDataThumnail = new FormData();
            formDataThumnail.append('image', values.thumbnail.fileList[0].originFileObj);
            const thumbnailRes = await uploadService.uploadImage(formDataThumnail);

            const variantsPayload: ICreateVariant[] = (
                await Promise.all(
                    values.variants.map(async (variant: any) => {
                        const formDataVariant = new FormData();
                        if (!variant.properties || variant.properties.length === 0) {
                            throw Error('Vui lòng thêm thuộc tính cho biến thể!');
                        }
                        formDataVariant.append('image', variant.image[0].originFileObj);
                        const variantRes = await uploadService.uploadImage(formDataVariant);

                        return variant.properties.map((property: any) => ({
                            size: property.size,
                            stock: property.stock,
                            color: variant.color,
                            image: variantRes.downloadURL,
                            imageRef: variantRes.urlRef,
                        }));
                    })
                )
            ).flat();

            const variantsRes = await productServices.createMultipleVariant(variantsPayload);

            const variantIds = variantsRes.map((variant) => variant._id);
            const sizeIds = variantsPayload.map((variant) => variant.size);
            const colorIds = variantsPayload.map((variant) => variant.color);
            const imageRefVariants = variantsPayload.map((variant) => variant.imageRef);

            const productParentPayload: ICreateProductPayload = {
                name: values.name,
                price: values.price,
                thumbnail: thumbnailRes.downloadURL,
                thumbnailRef: thumbnailRes.urlRef,
                summary: values.summary,
                type: { hasColor: true, sizeType: values.sizeType || SizeEnum.FreeSize },
                variants: variantIds,
                categories: values.categories.split(','),
                filterSize: sizeIds,
                filterColor: colorIds,
                imageRefVariants,
            };
            await createPro(productParentPayload);
            navigate(ADMIN_ROUTES.PRODUCTS);
        } catch (err) {
            if (err instanceof Error) {
                message.error(err.message);
            } else {
                message.error('Vui lòng điền đầy đủ thông tin!');
            }
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <WrapperPageAdmin
            title='Thêm mới sản phẩm'
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
                        <Form.Item<any>
                            label='Tên sản phẩm'
                            name='name'
                            required
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tên sản phẩm',
                                },
                            ]}
                            className='font-medium text-[#08090F]'
                        >
                            <Input placeholder='Nhập tên sản phẩm...' size='large' />
                        </Form.Item>
                        <Form.Item<any>
                            label='Danh mục'
                            name='categories'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn danh mục sản phẩm',
                                },
                            ]}
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
                        <Form.Item<any>
                            label='Giá cả'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập giá thành sản phẩm',
                                },
                            ]}
                            name='price'
                            required
                            className='font-medium text-[#08090F]'
                        >
                            <InputNumber
                                prefix='đ'
                                placeholder='Nhập giá thành...'
                                size='large'
                                style={{ width: '100%' }}
                            />
                        </Form.Item>

                        <Form.Item<any>
                            required
                            label='Mô tả'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mô tả sản phẩm',
                                },
                            ]}
                            name='summary'
                            className='font-medium text-[#08090F]'
                        >
                            <TextArea placeholder='Nhập mô tả sản phẩm...' rows={4} className='w-full' />
                        </Form.Item>
                    </WrapperCard>

                    <WrapperCard title='Thông tin biến thể'>
                        <Form.Item name='sizeType' label='Loại cỡ' required>
                            <Select
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
                                            className='relative mb-4 rounded border p-4'
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
                                        disabled={variants.length >= 5}
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
                        loading={isLoading}
                        disabled={isLoading}
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
export default CreateProduct;
