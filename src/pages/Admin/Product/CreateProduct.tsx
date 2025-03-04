/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from 'antd';
import { useCreatePro } from '~/hooks/mutations/products/useCreatePro';
import FormProduct from '~/pages/Admin/Product/FormProduct';
import { productServices } from '~/services/product.service';
import { uploadService } from '~/services/upload.service';
import { SizeEnum } from '~/types/enum';
import { ICreateProductPayload } from '~/types/Product';
import { ICreateVariant } from '~/types/Variant';

const CreateProduct = () => {
    const [form] = Form.useForm<any>();
    const { mutateAsync: createPro } = useCreatePro();

    const handleSubmit = async (values: any) => {
        const formDataThumnail = new FormData();
        formDataThumnail.append('image', values.thumbnail.fileList[0].originFileObj);
        const thumbnailRes = await uploadService.uploadImage(formDataThumnail);

        const variantsPayload: ICreateVariant[] = (
            await Promise.all(
                values.variants.map(async (variant: any) => {
                    const formDataVariant = new FormData();
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
    };
    return <FormProduct form={form} handleSubmit={handleSubmit} handleThumbnailChange={() => {}} />;
};
export default CreateProduct;
