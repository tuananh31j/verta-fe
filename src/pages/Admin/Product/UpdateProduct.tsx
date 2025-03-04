/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from 'antd';
import { UploadFile } from 'antd/lib';
import { UploadChangeParam } from 'antd/lib/upload';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUpdatePro } from '~/hooks/mutations/products/useUpdatePro';
import FormProduct from '~/pages/Admin/Product/FormProduct';
import { uploadService } from '~/services/upload.service';
import { ICreateVariant } from '~/types/Variant';

const UpdateProduct = () => {
    const { productId } = useParams<{ productId: string }>();
    const [form] = Form.useForm<any>();
    const [_, setFileList] = useState<UploadFile[]>([]);

    const { mutate: updateProduct } = useUpdatePro();

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

    const handleSubmit = async (values: any) => {
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
        await updateProduct({ id: productId!, data: updatePayload });
    };

    return (
        <FormProduct
            productId={productId}
            handleThumbnailChange={handleThumbnailChange}
            form={form}
            handleSubmit={handleSubmit}
        />
    );
};
export default UpdateProduct;
