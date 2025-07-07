/* eslint-disable @typescript-eslint/no-explicit-any */
import { CloseOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useEditor } from '@tiptap/react';
import {
    Button,
    Divider,
    Flex,
    Form,
    FormInstance,
    Input,
    InputNumber,
    message,
    Modal,
    Select,
    Tooltip,
    TreeSelect,
    Upload,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { RcFile, UploadProps } from 'antd/es/upload';
import { UploadFile } from 'antd/lib';
import { UploadChangeParam } from 'antd/lib/upload';
import { useEffect, useState } from 'react';
import { Link as LinkReact, useNavigate } from 'react-router-dom';
import WrapperCard from '~/components/_common/WrapperCard';
import { ADMIN_ROUTES } from '~/constants/router';
import useGetAllColors from '~/hooks/Colors/Queries/useGetAllColors';
import { useGetAllCate } from '~/hooks/queries/categories/useGetAllCate';
import { useGetProductDetailsForAdmin } from '~/hooks/queries/products/useGetProductDetailsForAdmin';
import useGetAllSizes from '~/hooks/Sizes/Queries/useGetAllSizes';
import WrapperPageAdmin from '~/pages/Admin/_common';
import Editor from '~/pages/Admin/Product/Editor';
import { SizeEnum } from '~/types/enum';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(`Error: ${error}`);
    });

const FormProduct = (props: {
    productId?: string;
    handleThumbnailChange: (info: UploadChangeParam<UploadFile<any>>) => void;
    form: FormInstance<any>;
    handleSubmit: (values: any) => Promise<void>;
    typeSizeDF?: SizeEnum;
}) => {
    const { productId, handleThumbnailChange, form, handleSubmit, typeSizeDF } = props;
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const editorInstance = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Link.configure({ openOnClick: false }),
            Image,
        ],
        content: '',
        onUpdate: ({ editor }) => {
            handleSetSummary(String(editor.getHTML()));
        },
    });

    const handleSetSummary = (text: string) => {
        form.setFieldsValue({ summary: text });
    };

    const variantsWatch = Form.useWatch('variants', form);

    const [typeSize, setTypeSize] = useState<SizeEnum>(typeSizeDF || SizeEnum.FreeSize);
    const { data: colorList } = useGetAllColors();
    const { data: sizeList } = useGetAllSizes({ type: typeSize });
    const { data: categoryList } = useGetAllCate();
    const { data: productDetails } = useGetProductDetailsForAdmin(productId as string);

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
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const handleCancel = () => setPreviewOpen(false);

    const onFinish = async (values: any) => {
        console.log(values);
        setIsLoading(true);

        try {
            if (!values.variants || values.variants.length === 0) {
                throw Error('Vui lòng thêm biến thể cho sản phẩm!');
            }

            values.variants.map(async (variant: any) => {
                const formDataVariant = new FormData();
                if (!variant.properties || variant.properties.length === 0) {
                    throw Error('Vui lòng thêm thuộc tính cho biến thể!');
                }
                formDataVariant.append('image', variant.image[0].originFileObj);
            });
            await handleSubmit(values);
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

    useEffect(() => {
        if (productDetails) {
            setTypeSize(productDetails.type.sizeType as SizeEnum);
            const { name, price, summary, categories, thumbnail, variants, type } = productDetails;
            editorInstance?.commands.setContent(summary);
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
    }, [productDetails, form, editorInstance]);

    useEffect(() => {
        if (editorInstance) {
            form.setFieldsValue({ summary: String(editorInstance.getHTML()) });
            console.log(String(editorInstance.getHTML()));
        }
    }, [editorInstance, form]);

    return (
        <WrapperPageAdmin
            title={productId ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm'}
            option={
                <LinkReact to={ADMIN_ROUTES.PRODUCTS} className='underline'>
                    Quay lại
                </LinkReact>
            }
        >
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt='Preview' style={{ width: '100%' }} src={previewImage} />
            </Modal>
            <Form layout='vertical' form={form} onFinish={onFinish}>
                <div className='grid grid-cols-1 gap-4'>
                    <WrapperCard title='Thông tin cơ bản'>
                        <Flex gap={10} justify='space-between'>
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
                                className='w-full font-medium text-[#08090F]'
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
                                className='w-full font-medium text-[#08090F]'
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
                                    {
                                        type: 'number',
                                        min: 1,
                                        message: 'Giá thành phải lớn hơn 0',
                                    },
                                ]}
                                name='price'
                                required
                                className='w-full font-medium text-[#08090F]'
                            >
                                <InputNumber
                                    prefix='đ'
                                    placeholder='Nhập giá thành...'
                                    size='large'
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                        </Flex>
                        <Flex gap={10} justify='space-between'>
                            <Form.Item<any>
                                label='Ảnh bìa'
                                name='thumbnail'
                                required
                                className='w-[16%] font-medium text-[#08090F]'
                                dependencies={['images']}
                            >
                                {productId ? (
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
                                            <div style={{ marginTop: 8 }}>Tải ảnh</div>
                                        </div>
                                    </Upload>
                                ) : (
                                    <Upload
                                        listType='picture-card'
                                        beforeUpload={beforeUpload}
                                        maxCount={1}
                                        onPreview={handlePreview}
                                    >
                                        <div>
                                            <PlusOutlined />
                                            <div style={{ marginTop: 8 }}>Tải ảnh</div>
                                        </div>
                                    </Upload>
                                )}
                            </Form.Item>
                            <Form.Item<any>
                                required
                                label='Mô tả'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập mô tả sản phẩm',
                                    },
                                    {
                                        validator: (_, value) =>
                                            value && value.length <= 7
                                                ? Promise.reject('Vui lòng nhập mô tả sản phẩm')
                                                : Promise.resolve(),
                                    },
                                ]}
                                name='summary'
                                className='w-full font-medium text-[#08090F]'
                            >
                                <div className='ms-2 w-full border-l-2 border-dashed border-gray-500 ps-3.5 font-medium text-[#08090F]'>
                                    <TextArea
                                        value={String(editorInstance?.getHTML())}
                                        placeholder='Nhập mô tả sản phẩm...'
                                        rows={4}
                                        className='hidden w-full'
                                        hidden
                                    />
                                    <Editor editor={editorInstance} />
                                </div>
                            </Form.Item>
                        </Flex>
                    </WrapperCard>

                    <WrapperCard title='Thông tin biến thể'>
                        <Form.Item name='sizeType' label='Loại cỡ' required>
                            <Select
                                defaultValue={typeSize}
                                style={{ width: 140 }}
                                onChange={(value) => setTypeSize(value)}
                                disabled={!!productId}
                                size='large'
                                options={[
                                    { value: SizeEnum.FreeSize, label: 'Size chữ' },
                                    { value: SizeEnum.NumericSize, label: 'Size số' },
                                ]}
                            />
                        </Form.Item>
                        <Divider />
                        <Form.List name='variants'>
                            {(variants, { add: addVariant, remove: removeVariant }) => (
                                <div className='space-y-6'>
                                    {/* Table header */}
                                    {variants.length > 0 && (
                                        <div className='grid grid-cols-12 gap-4 border-b-2 border-gray-300 pb-2 font-medium text-gray-700'>
                                            <div className='col-span-1'>STT</div>
                                            <div className='col-span-2'>Màu sắc</div>
                                            <div className='col-span-2'>Ảnh</div>
                                            <div className='col-span-6'>Kích thước & Số lượng</div>
                                            <div className='col-span-1'>Thao tác</div>
                                        </div>
                                    )}

                                    {/* Variants as table rows */}
                                    {variants.map((variant, variantIndex) => (
                                        <div
                                            key={variant.key}
                                            className={`grid grid-cols-12 gap-4 rounded-lg border-2 border-gray-300 p-4 shadow-sm ${
                                                variantIndex % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                                            }`}
                                        >
                                            {/* Variant index */}
                                            <div className='col-span-1 flex items-center justify-center border-r border-gray-200 pr-2'>
                                                <div className='flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-gray-100 font-medium'>
                                                    {variantIndex + 1}
                                                </div>
                                            </div>

                                            {/* Color selection */}
                                            <div className='col-span-2 border-r border-gray-200 pr-2'>
                                                <Form.Item
                                                    name={[variant.name, 'color']}
                                                    rules={[{ required: true, message: 'Chọn màu' }]}
                                                    className='mb-0'
                                                >
                                                    <Select
                                                        placeholder='Chọn màu sắc'
                                                        size='large'
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
                                                                    <div className='flex items-center gap-2'>
                                                                        <Tooltip title={color.hex}>
                                                                            <div
                                                                                className='h-5 w-5 rounded-full border'
                                                                                style={{ backgroundColor: color.hex }}
                                                                            />
                                                                        </Tooltip>
                                                                        <span>{color.name}</span>
                                                                    </div>
                                                                ),
                                                            }))}
                                                    />
                                                </Form.Item>
                                            </div>

                                            {/* Image upload */}
                                            <div className='col-span-2 border-r border-gray-200 pr-2'>
                                                <Form.Item
                                                    name={[variant.name, 'image']}
                                                    valuePropName='fileList'
                                                    getValueFromEvent={normFile}
                                                    className='mb-0'
                                                >
                                                    <Upload
                                                        listType='picture-card'
                                                        beforeUpload={beforeUpload}
                                                        onPreview={handlePreview}
                                                        maxCount={1}
                                                    >
                                                        <div className='flex flex-col items-center'>
                                                            <PlusOutlined />
                                                            <div className='mt-1'>Tải ảnh</div>
                                                        </div>
                                                    </Upload>
                                                </Form.Item>
                                            </div>

                                            {/* Properties table */}
                                            <div className='col-span-6 border-r border-gray-200 pr-2'>
                                                <Form.List name={[variant.name, 'properties']}>
                                                    {(properties, { add: addProperty, remove: removeProperty }) => (
                                                        <>
                                                            {/* Properties header */}
                                                            {properties.length > 0 && (
                                                                <div className='grid grid-cols-8 gap-2 border-b-2 border-gray-300 pb-2 text-sm font-medium'>
                                                                    <div className='col-span-3'>Kích cỡ</div>
                                                                    <div className='col-span-4'>Số lượng</div>
                                                                    <div className='col-span-1'></div>
                                                                </div>
                                                            )}

                                                            {/* Properties list */}
                                                            <div className='rounded-md border border-gray-100 pt-2'>
                                                                {properties.map((property, propertyIndex) => (
                                                                    <div
                                                                        key={property.key}
                                                                        className={`grid grid-cols-8 gap-8 px-2 py-1 ${
                                                                            propertyIndex !== properties.length - 1
                                                                                ? 'border-b border-gray-200'
                                                                                : ''
                                                                        } ${
                                                                            propertyIndex % 2 === 0
                                                                                ? 'bg-white'
                                                                                : 'bg-gray-50'
                                                                        }`}
                                                                    >
                                                                        <div className='col-span-3'>
                                                                            <Form.Item
                                                                                name={[property.name, 'size']}
                                                                                rules={[
                                                                                    {
                                                                                        required: true,
                                                                                        message: 'Chọn size',
                                                                                    },
                                                                                ]}
                                                                                className='mb-0'
                                                                            >
                                                                                <Select
                                                                                    size='large'
                                                                                    placeholder='Chọn size'
                                                                                    options={sizeList
                                                                                        ?.filter((size) => {
                                                                                            if (
                                                                                                !Array.isArray(
                                                                                                    variantsWatch
                                                                                                )
                                                                                            )
                                                                                                return true;
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
                                                                                                    )
                                                                                                    ?.map(
                                                                                                        (p: any) =>
                                                                                                            p.size
                                                                                                    )
                                                                                                    ?.filter(Boolean);
                                                                                            return !selectedSizes?.includes(
                                                                                                size._id
                                                                                            );
                                                                                        })
                                                                                        ?.map((size) => ({
                                                                                            value: size._id,
                                                                                            label: size.value,
                                                                                        }))}
                                                                                />
                                                                            </Form.Item>
                                                                        </div>
                                                                        <div className='col-span-4'>
                                                                            <Form.Item
                                                                                name={[property.name, 'stock']}
                                                                                rules={[
                                                                                    {
                                                                                        required: true,
                                                                                        message: 'Nhập số lượng',
                                                                                    },
                                                                                ]}
                                                                                className='mb-0'
                                                                            >
                                                                                <InputNumber
                                                                                    size='large'
                                                                                    placeholder='Nhập số lượng'
                                                                                    min={0}
                                                                                    style={{ width: '100%' }}
                                                                                />
                                                                            </Form.Item>
                                                                        </div>
                                                                        <div className='col-span-1 flex items-center justify-center'>
                                                                            <Button
                                                                                type='text'
                                                                                danger
                                                                                icon={<DeleteOutlined />}
                                                                                onClick={() =>
                                                                                    removeProperty(property.name)
                                                                                }
                                                                                size='small'
                                                                                className='border border-gray-200 hover:border-red-400'
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>

                                                            {/* Add property button */}
                                                            <Button
                                                                type='dashed'
                                                                onClick={() => addProperty()}
                                                                icon={<PlusOutlined />}
                                                                size='small'
                                                                className='mt-2 w-full border border-gray-300'
                                                                disabled={properties.length >= 8}
                                                            >
                                                                Thêm kích thước
                                                            </Button>
                                                        </>
                                                    )}
                                                </Form.List>
                                            </div>

                                            {/* Actions */}
                                            <div className='col-span-1 flex items-center justify-center'>
                                                <Button
                                                    type='text'
                                                    danger
                                                    icon={<CloseOutlined />}
                                                    onClick={() => removeVariant(variant.name)}
                                                    title='Xóa biến thể'
                                                    className='border border-gray-200 hover:border-red-400'
                                                />
                                            </div>
                                        </div>
                                    ))}

                                    {/* Add variant button */}
                                    <Button
                                        type='dashed'
                                        onClick={() => addVariant()}
                                        icon={<PlusOutlined />}
                                        disabled={variants.length >= 5}
                                        className='h-10 w-full border-2 border-gray-300'
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
                        {productId ? 'Cập nhật' : 'Thêm mới'}
                    </Button>
                </div>
            </Form>
        </WrapperPageAdmin>
    );
};
export default FormProduct;
