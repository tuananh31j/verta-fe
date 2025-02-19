/* eslint-disable @typescript-eslint/no-explicit-any */
import { CloseOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, message, Modal, Select, Tooltip, TreeSelect, Upload } from 'antd';
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
    const variantsWatch = Form.useWatch('variants', form);
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
                            <Upload
                                listType='picture-card'
                                beforeUpload={beforeUpload}
                                maxCount={1}
                                onPreview={handlePreview}
                                onChange={handleThumbnailChange}
                                fileList={form.getFieldValue('thumbnail')}
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
                                <div className='space-y-6'>
                                    {variants.map((variant, variantIndex) => (
                                        <div
                                            key={variant.key}
                                            className='rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md'
                                        >
                                            <div className='mb-6 flex items-center justify-between border-b border-gray-100 pb-4'>
                                                <h3 className='text-lg font-medium text-gray-800'>
                                                    Biến thể {variantIndex + 1}
                                                </h3>
                                                <Button
                                                    danger
                                                    onClick={() => removeVariant(variant.name)}
                                                    className='flex items-center hover:bg-red-50'
                                                    icon={<DeleteOutlined />}
                                                >
                                                    Xóa biến thể
                                                </Button>
                                            </div>

                                            <div className='grid gap-6 lg:grid-cols-2'>
                                                <div className='space-y-6'>
                                                    <Form.Item
                                                        label={
                                                            <span className='font-medium text-gray-700'>Màu sắc</span>
                                                        }
                                                        name={[variant.name, 'color']}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Vui lòng chọn màu sắc biến thể',
                                                            },
                                                        ]}
                                                    >
                                                        <Select
                                                            placeholder='Chọn màu sắc'
                                                            size='large'
                                                            className='w-full'
                                                            options={colorList
                                                                ?.filter((color) => {
                                                                    if (!Array.isArray(variantsWatch)) return true;

                                                                    const selectedColors = variantsWatch
                                                                        ?.filter(
                                                                            (v: any, idx: number) =>
                                                                                idx !== variantIndex && v?.color
                                                                        )
                                                                        ?.map((v: any) => v.color)
                                                                        ?.filter(Boolean);
                                                                    return !selectedColors?.includes(color._id);
                                                                })
                                                                ?.map((color) => ({
                                                                    value: color._id,
                                                                    label: (
                                                                        <div className='flex items-center gap-3 py-1'>
                                                                            <Tooltip title={color.hex}>
                                                                                <div
                                                                                    className='h-6 w-6 rounded-full border border-gray-200 shadow-sm transition-transform hover:scale-110'
                                                                                    style={{
                                                                                        backgroundColor: color.hex,
                                                                                    }}
                                                                                />
                                                                            </Tooltip>
                                                                            <span className='font-medium'>
                                                                                {color.name}
                                                                            </span>
                                                                        </div>
                                                                    ),
                                                                }))}
                                                            optionLabelProp='label'
                                                        />
                                                    </Form.Item>

                                                    <Form.Item
                                                        label={
                                                            <span className='font-medium text-gray-700'>
                                                                Ảnh biến thể
                                                            </span>
                                                        }
                                                        name={[variant.name, 'image']}
                                                        valuePropName='fileList'
                                                        getValueFromEvent={normFile}
                                                    >
                                                        <Upload
                                                            listType='picture-card'
                                                            beforeUpload={beforeUpload}
                                                            onPreview={handlePreview}
                                                            maxCount={1}
                                                            className='hover:border-primary/60 rounded-lg border-2 border-dashed border-gray-200 transition-colors'
                                                        >
                                                            <div className='flex flex-col items-center p-2'>
                                                                <PlusOutlined className='text-xl text-gray-400' />
                                                                <div className='mt-2 text-sm text-gray-500'>
                                                                    Tải ảnh lên
                                                                </div>
                                                            </div>
                                                        </Upload>
                                                    </Form.Item>
                                                </div>

                                                <div className='space-y-4'>
                                                    <Form.List name={[variant.name, 'properties']}>
                                                        {(properties, { add: addProperty, remove: removeProperty }) => (
                                                            <div className='space-y-4'>
                                                                <div className='max-h-[400px] overflow-y-auto pr-2'>
                                                                    {properties.map((property, propertyIndex) => (
                                                                        <div
                                                                            key={property.key}
                                                                            className='mb-4 rounded-lg border border-gray-100 bg-gray-50/50 p-4'
                                                                        >
                                                                            <div className='mb-4 flex items-center justify-between'>
                                                                                <h4 className='font-medium text-gray-700'>
                                                                                    Thuộc tính {propertyIndex + 1}
                                                                                </h4>
                                                                                <Button
                                                                                    type='text'
                                                                                    danger
                                                                                    size='small'
                                                                                    onClick={() =>
                                                                                        removeProperty(property.name)
                                                                                    }
                                                                                    icon={<DeleteOutlined />}
                                                                                    className='flex items-center hover:bg-red-50'
                                                                                >
                                                                                    Xóa
                                                                                </Button>
                                                                            </div>

                                                                            <div className='grid gap-4'>
                                                                                <Form.Item
                                                                                    label={
                                                                                        <span className='text-gray-600'>
                                                                                            Kích cỡ
                                                                                        </span>
                                                                                    }
                                                                                    name={[property.name, 'size']}
                                                                                    rules={[
                                                                                        {
                                                                                            required: true,
                                                                                            message:
                                                                                                'Vui lòng chọn size',
                                                                                        },
                                                                                    ]}
                                                                                >
                                                                                    <Select
                                                                                        placeholder='Chọn kích cỡ'
                                                                                        size='large'
                                                                                        className='w-full'
                                                                                        options={sizeList
                                                                                            ?.filter((size) => {
                                                                                                // Kiểm tra nếu variantsWatch tồn tại và là mảng
                                                                                                if (
                                                                                                    !Array.isArray(
                                                                                                        variantsWatch
                                                                                                    )
                                                                                                )
                                                                                                    return true;

                                                                                                // Lấy tất cả các size đã được chọn trong CÙNG biến thể nhưng ở các thuộc tính KHÁC
                                                                                                const selectedSizes =
                                                                                                    variantsWatch?.[
                                                                                                        variantIndex
                                                                                                    ]?.properties
                                                                                                        ?.filter(
                                                                                                            (
                                                                                                                p: any,
                                                                                                                idx: number
                                                                                                            ) =>
                                                                                                                idx !==
                                                                                                                    propertyIndex &&
                                                                                                                p?.size
                                                                                                        ) // Kiểm tra p tồn tại và có thuộc tính size
                                                                                                        ?.map(
                                                                                                            (p: any) =>
                                                                                                                p.size
                                                                                                        )
                                                                                                        ?.filter(
                                                                                                            Boolean
                                                                                                        );
                                                                                                return !selectedSizes?.includes(
                                                                                                    size._id
                                                                                                );
                                                                                            })
                                                                                            ?.map((size) => ({
                                                                                                value: size._id,
                                                                                                label: (
                                                                                                    <span className='font-medium'>
                                                                                                        {size.value}
                                                                                                    </span>
                                                                                                ),
                                                                                            }))}
                                                                                    />
                                                                                </Form.Item>

                                                                                <Form.Item
                                                                                    label={
                                                                                        <span className='text-gray-600'>
                                                                                            Tồn kho
                                                                                        </span>
                                                                                    }
                                                                                    name={[property.name, 'stock']}
                                                                                    rules={[
                                                                                        {
                                                                                            required: true,
                                                                                            message:
                                                                                                'Vui lòng nhập số lượng',
                                                                                        },
                                                                                    ]}
                                                                                >
                                                                                    <InputNumber
                                                                                        placeholder='Nhập số lượng...'
                                                                                        size='large'
                                                                                        className='w-full'
                                                                                        min={0}
                                                                                        style={{ width: '100%' }}
                                                                                    />
                                                                                </Form.Item>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>

                                                                <Button
                                                                    type='dashed'
                                                                    onClick={() => addProperty()}
                                                                    icon={<PlusOutlined />}
                                                                    disabled={properties.length >= 8}
                                                                    className='mt-2 h-10 w-full'
                                                                >
                                                                    Thêm thuộc tính
                                                                </Button>
                                                            </div>
                                                        )}
                                                    </Form.List>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <Button
                                        type='dashed'
                                        onClick={() => addVariant()}
                                        icon={<PlusOutlined />}
                                        disabled={variants.length >= 5}
                                        className='h-12 w-full text-base'
                                    >
                                        Thêm biến thể mới
                                    </Button>
                                </div>
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
