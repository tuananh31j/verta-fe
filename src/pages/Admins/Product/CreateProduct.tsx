import { PlusSquareOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Form, Link } from 'react-router-dom';
import { ADMIN_ROUTES } from '~/constants/router';
import WrapperPageAdmin from '~/pages/Admins/_common/WrapperPageAdmin';

const CreateProduct = () => {
    return (
        <WrapperPageAdmin
            title='Thêm mới sản phẩm'
            option={
                <Link to={ADMIN_ROUTES.PRODUCTS_CREATE} className='underline'>
                    Quay lại
                </Link>
            }
        >
            {/* <Form layout='vertical' form={form} onFinish={onFinish}>
                <div className='grid grid-cols-1 gap-4'>
                    <WrapperCard title='Thông tin cơ bản'>
                        <Form.Item name='isHide' className='hidden' hidden>
                            <Input type='hidden' />
                        </Form.Item>
                        <Form.Item<IProductForm>
                            label='Danh mục'
                            name='categoryId'
                            required
                            className='font-medium text-[#08090F]'
                            rules={[categoryValidator()]}
                            validateTrigger={['onChange', 'onBlur']}
                        >
                            <Select
                                size='large'
                                onChange={handleChangeCat}
                                placeholder='Chọn danh mục cho sản phẩm...'
                                className='w-full'
                                options={categories?.map((category) => ({
                                    label: category.name,
                                    value: category._id,
                                }))}
                            />
                        </Form.Item>
                        <Form.Item<IProductForm>
                            label='Thương hiệu'
                            name='brandId'
                            required
                            className='font-medium text-[#08090F]'
                            rules={[brandValidator()]}
                        >
                            <Select
                                size='large'
                                className='w-full normal-case'
                                placeholder='Chọn thương hiệu cho sản phẩm...'
                                options={brands?.map((brand) => ({
                                    label: brand.name,
                                    value: brand._id,
                                }))}
                            />
                        </Form.Item>
                        <Form.Item<IProductForm>
                            label='Hình ảnh sản phẩm'
                            name='images'
                            required
                            className='font-medium text-[#08090F]'
                            dependencies={['images']}
                            rules={[
                                {
                                    validator: imagesValidator,
                                },
                            ]}
                        >
                            <Upload
                                beforeUpload={() => false}
                                listType='picture-card'
                                fileList={imagesfileList}
                                onPreview={(files) => handlePreview(files, true)}
                                onChange={handleChangeImages}
                                maxCount={5}
                                multiple
                            >
                                {imagesfileList.length >= 5 ? null : UploadButton}
                            </Upload>
                        </Form.Item>
                        {previewImages && (
                            <Image
                                wrapperStyle={{ display: 'none' }}
                                preview={{
                                    visible: previewImagesOpen,
                                    onVisibleChange: (visible) => setPreviewImagesOpen(visible),
                                    afterOpenChange: (visible) => !visible && setPreviewImages(''),
                                }}
                                src={previewImages}
                            />
                        )}
                        <Form.Item<IProductForm>
                            label='Ảnh bìa'
                            required
                            name='thumbnail'
                            className='font-medium text-[#08090F]'
                            dependencies={['thumbnail']}
                            rules={[
                                {
                                    validator: thumbnailValidator,
                                },
                            ]}
                        >
                            <Upload
                                beforeUpload={() => false}
                                listType='picture-card'
                                fileList={thumbnailFile}
                                onPreview={(file) => handlePreview(file, false)}
                                onChange={handleChangeThumbnail}
                                maxCount={1}
                            >
                                {thumbnailFile.length >= 1 ? null : UploadButton}
                            </Upload>
                        </Form.Item>
                        {previewThumbnail && (
                            <Image
                                wrapperStyle={{ display: 'none' }}
                                preview={{
                                    visible: previewThumbnailOpen,
                                    onVisibleChange: (visible) => setPreviewThumbnailOpen(visible),
                                    afterOpenChange: (visible) => !visible && setPreviewThumbnail(''),
                                }}
                                src={previewThumbnail}
                            />
                        )}
                        <Form.Item<IProductForm>
                            label='Tên sản phẩm'
                            name='name'
                            required
                            className='font-medium text-[#08090F]'
                            rules={[
                                {
                                    validator: nameValidator,
                                },
                            ]}
                        >
                            <Input placeholder='Nhập tên sản phẩm...' size='large' />
                        </Form.Item>
                        <Form.Item<IProductForm>
                            label='Mô tả'
                            name='description'
                            className='font-medium text-[#08090F]'
                        >
                            <TextArea placeholder='Nhập mô tả sản phẩm...' rows={4} className='w-full' />
                        </Form.Item>
                    </WrapperCard>
                    <WrapperCard
                        isLoading={isAttributeLoading}
                        title='Thông tin chi tiết'
                        isOpacity={!isChooseCategory}
                    >
                        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                            {attributesForProduct?.map((attribute: IAttributesValue, index: number) => (
                                <AttributesItem attribute={attribute} key={index} />
                            ))}
                        </div>
                    </WrapperCard>
                    <WrapperCard
                        isLoading={isAttributeLoading}
                        title='Thông tin bán hàng'
                        isOpacity={!isChooseCategory}
                    >
                        <Form.List
                            name='variations'
                            rules={[
                                {
                                    validator: variationsValidator,
                                },
                            ]}
                        >
                            {(fields, { add, remove }, { errors }) => (
                                <>
                                    {fields.map(({ key, name, ...restField }, index) => {
                                        return (
                                            <VariationItem
                                                key={key}
                                                index={index}
                                                attributesForVariant={attributesForVariant}
                                                fieldName={name}
                                                restField={restField}
                                                variantFile={attributesFile}
                                                handleChangeThumbnail={handleChangeAttributeThumbnail}
                                                handleRemoveThumbnail={handleRemoveAttributeThumbnail}
                                                removeVariation={remove}
                                            />
                                        );
                                    })}
                                    <Form.Item>
                                        <Button
                                            type='dashed'
                                            htmlType='button'
                                            onClick={() => add()}
                                            block
                                            icon={<PlusOutlined />}
                                        >
                                            Thêm biến thể
                                        </Button>
                                    </Form.Item>
                                    {isChooseCategory && errors && (
                                        <Form.ErrorList errors={errors} className='text-red' />
                                    )}
                                </>
                            )}
                        </Form.List>
                    </WrapperCard>
                </div>
                <div className='border-opacity-5 sticky right-0 bottom-0 my-2 flex justify-end rounded-md border-t-2 border-black bg-white p-4'>
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
            </Form> */}
            ok
        </WrapperPageAdmin>
    );
};
export default CreateProduct;
