import { useState } from 'react';
import { Editor, EditorContent } from '@tiptap/react';
import { Image as ImageAntd } from 'antd';
import { Button, Space, Modal, Upload, Skeleton, message } from 'antd';
import {
    BoldOutlined,
    ItalicOutlined,
    UnderlineOutlined,
    AlignLeftOutlined,
    AlignCenterOutlined,
    AlignRightOutlined,
    PictureOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import { uploadService } from '~/services/upload.service';

const ImageSkeleton = () => {
    return (
        <>
            {Array.from({ length: 18 }).map((_, index) => (
                <Skeleton.Image className='w-170 p-4' key={index} active={true} />
            ))}
        </>
    );
};

const EditorComp = ({ editor }: { editor: Editor | null }) => {
    const [isModalOpenImage, setIsModalOpenImage] = useState(false);
    const [images, setImages] = useState<string[]>([]);
    const [loadingImages, setLoadingImages] = useState(false);
    const [loadingModalImage, setLoadingModalImage] = useState(false);

    if (!editor) return null;

    const handleOpenModalImage = async () => {
        setIsModalOpenImage(true);
        try {
            if (images.length === 0) {
                setLoadingImages(true);
                const imagesRes = await uploadService.getImages();
                setImages(imagesRes.map((image) => image.url));
            }
        } catch (error) {
            message.error('Lỗi khi tải ảnh');
        } finally {
            setLoadingImages(false);
        }
    };
    const handleSelectImage = (image: string) => {
        editor.chain().focus().setImage({ src: image }).run();
        setIsModalOpenImage(false);
    };

    const handleUpload = async (file: File) => {
        setLoadingModalImage(true);
        try {
            const formDataThumnail = new FormData();
            formDataThumnail.append('image', file);
            const thumbnailRes = await uploadService.uploadImage(formDataThumnail);
            handleSelectImage(thumbnailRes.downloadURL);
            setImages((prev) => [...prev, thumbnailRes.downloadURL]);
            setIsModalOpenImage(false);

            return false;
        } catch (error) {
            message.error('Lỗi khi tải ảnh');
        } finally {
            setLoadingModalImage(false);
        }
    };

    return (
        <div className='flex h-[40vh] flex-col'>
            <Space className='border-b border-gray-300 bg-gray-100 p-2'>
                <Button
                    icon={<BoldOutlined />}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    type={editor.isActive('bold') ? 'primary' : 'default'}
                />
                <Button
                    icon={<ItalicOutlined />}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    type={editor.isActive('italic') ? 'primary' : 'default'}
                />
                <Button
                    icon={<UnderlineOutlined />}
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    type={editor.isActive('underline') ? 'primary' : 'default'}
                />
                <Button
                    icon={<AlignLeftOutlined />}
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    type={editor.isActive({ textAlign: 'left' }) ? 'primary' : 'default'}
                />
                <Button
                    icon={<AlignCenterOutlined />}
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    type={editor.isActive({ textAlign: 'center' }) ? 'primary' : 'default'}
                />
                <Button
                    icon={<AlignRightOutlined />}
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    type={editor.isActive({ textAlign: 'right' }) ? 'primary' : 'default'}
                />
                <Button icon={<PictureOutlined />} onClick={handleOpenModalImage} />
            </Space>

            <div className='flex-1 overflow-auto p-2'>
                <EditorContent
                    className='border-transparent'
                    editor={editor}
                    style={{ border: 'none', outline: 'none' }}
                />
            </div>

            <Modal
                title='Chọn ảnh'
                centered
                open={isModalOpenImage}
                onOk={() => setIsModalOpenImage(false)}
                onCancel={() => setIsModalOpenImage(false)}
                width={1000}
                height={1000}
                loading={loadingModalImage}
            >
                <Upload showUploadList={false} beforeUpload={handleUpload}>
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
                <hr className='mt-5' />
                {loadingImages ? (
                    <div className='flex-auto'>
                        <ImageSkeleton />
                    </div>
                ) : (
                    <div className='flex-auto'>
                        {images.map((image) => (
                            <ImageAntd
                                onClick={() => handleSelectImage(image)}
                                width={126}
                                className='p-4'
                                src={image}
                                key={image}
                                preview={false}
                            />
                        ))}
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default EditorComp;
