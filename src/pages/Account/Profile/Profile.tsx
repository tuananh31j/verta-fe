/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Form, FormProps, GetProp, Image, Input, Upload, UploadFile, UploadProps } from 'antd';
import { useEffect, useState } from 'react';
import { useMutationUpdateProfle } from '~/hooks/mutations/user/useUpdateProfile';
import useGetProfile from '~/hooks/queries/profile/useGetProfile';
import { uploadService } from '~/services/upload.service';
import { IAntdImageFiles } from '~/types/Antd';
import convertApiResponseToFileList from '~/utils/convertImageUrlToFileList';
import { ErrorMessage } from '~/validations/Message';

type Props = {};

const Profile = (props: Props) => {
    const { mutate: updateProfile, isPending } = useMutationUpdateProfle();

    const [form] = Form.useForm();

    const { data: profile } = useGetProfile();

    const [thumbnailFile, setThumbnailFile] = useState<UploadFile[]>([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    // Function khi submit form
    const onFinish: FormProps<any>['onFinish'] = async (values) => {
        const formDataAvatar = new FormData();

        const avatar: any = {
            avatarSrc: null,
            avatarRef: null,
        };

        if (values.avatar && values.avatar.fileList[0].originFileObj) {
            formDataAvatar.append('image', values.avatar.fileList[0].originFileObj);
            const avatarRes = await uploadService.uploadImage(formDataAvatar);
            avatar.avatarSrc = avatarRes.downloadURL;
            avatar.avatarRef = avatarRes.urlRef;
        }

        const payload = {
            name: values.name,
            email: values.email,
            phone: values.phone,
            avatar: avatar.avatarSrc,
            avatarRef: avatar.avatarRef,
        };

        updateProfile(payload);
    };

    // Fill thông tin vào form nếu api trả về profile thành công
    useEffect(() => {
        if (profile) {
            form.setFieldsValue({
                name: profile.name,
                phone: profile.phone,
                email: profile.email,
            });
        }
    }, [profile, form]);

    useEffect(() => {
        if (profile) {
            const thumbnailConvert = convertApiResponseToFileList({
                url: profile?.avatar,
                urlRef: profile?.avatar,
                isArr: true,
            }) as UploadFile<any>[];

            setThumbnailFile(thumbnailConvert);
        }
    }, [profile]);

    const ACCEPT_FILE_TYPE = ['image/png', 'image/jpeg', 'image/jpg'];
    const MAX_SIZE = 5000000;

    type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

    const getBase64 = (file: FileType): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });

    const thumbnailValidator = async (_: any, thumbnail: IAntdImageFiles) => {
        if (
            thumbnail &&
            thumbnail.fileList &&
            thumbnail.fileList.length > 0 &&
            (thumbnail.fileList[0] as any).originFileObj
        ) {
            if (thumbnail?.fileList?.length < 1 || !thumbnail) {
                return ErrorMessage('Please input your thumbnail!');
            }
            if (thumbnail && thumbnail.file.size && thumbnail?.file.size >= MAX_SIZE) {
                return ErrorMessage('Image size must be smaller than 5MB!');
            }
            if (thumbnail?.file.type && !ACCEPT_FILE_TYPE.includes(thumbnail?.file.type)) {
                return ErrorMessage('Only accept png, jpg and jpeg type!');
            }
        }
        return Promise.resolve();
    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type='button'>
            {/* {loading ? <LoadingOutlined /> : <PlusOutlined />} */}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    const handleChangeThumbnail: UploadProps['onChange'] = ({ fileList: newFileList }) => setThumbnailFile(newFileList);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const customItemRender: UploadProps['itemRender'] = (originNode, file, fileList, actions) => {
        return (
            <div className='ant-upload-list-item ant-upload-list-item-undefined'>
                <img className='' src={file.thumbUrl || file.url} alt={file.name} />
                <span className='ant-upload-list-item-actions'>
                    <span
                        onClick={actions.preview}
                        className='ant-btn css-dev-only-do-not-override-mzwlov ant-btn-text ant-btn-sm ant-btn-icon-only ant-upload-list-item-action text-white'
                    >
                        <EyeOutlined />
                    </span>
                    <span
                        onClick={actions.remove}
                        className='ant-btn css-dev-only-do-not-override-mzwlov ant-btn-text ant-btn-sm ant-btn-icon-only ant-upload-list-item-action text-white'
                    >
                        <DeleteOutlined />
                    </span>
                </span>
            </div>
        );
    };

    return (
        <div>
            {/* PROFILE FORM */}
            <div>
                <div className='w-full border-l-2 border-l-[#efeff4] pl-10'>
                    <Form form={form} layout='vertical' className='w-[582px]' onFinish={onFinish}>
                        {/* FORM INPUTS */}
                        <div className='flex items-center'>
                            <Form.Item<any>
                                label='Avatar'
                                name='avatar'
                                className='mt-1 w-1/5 text-sm text-[#070707]'
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
                                    itemRender={customItemRender}
                                    fileList={thumbnailFile}
                                    onPreview={(file) => handlePreview(file)}
                                    onChange={handleChangeThumbnail}
                                    maxCount={1}
                                >
                                    {thumbnailFile.length >= 1 ? null : uploadButton}
                                </Upload>
                            </Form.Item>

                            {previewImage && (
                                <Image
                                    wrapperStyle={{ display: 'none' }}
                                    preview={{
                                        visible: previewOpen,
                                        onVisibleChange: (visible) => setPreviewOpen(visible),
                                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                    }}
                                    // src={previewThumbnail || StaticImages.userImageDf}
                                />
                            )}

                            <Form.Item<any> label='Email' className='mt-1 w-4/5 text-sm text-[#070707]' name='email'>
                                <Input
                                    placeholder='Email'
                                    style={{ backgroundColor: '#efeff4', borderRadius: 0 }}
                                    className='h-[48px] py-3 text-sm leading-[48px] text-[#070707]'
                                    disabled
                                />
                            </Form.Item>
                        </div>

                        <Form.Item<any>
                            label='Họ tên'
                            className='mt-1 text-sm text-[#070707]'
                            name='name'
                            rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                        >
                            <Input
                                placeholder='Họ tên'
                                style={{ backgroundColor: '#efeff4', borderRadius: 0 }}
                                className='h-[48px] py-3 text-sm leading-[48px] text-[#070707]'
                                required
                            />
                        </Form.Item>

                        <Form.Item<any>
                            label='Số điện thoại'
                            className='mt-1 text-sm text-[#070707]'
                            name='phone'
                            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                        >
                            <Input
                                placeholder='Số điện thoại'
                                style={{ backgroundColor: '#efeff4', borderRadius: 0 }}
                                className='h-[48px] py-3 text-sm leading-[48px] text-[#070707]'
                            />
                        </Form.Item>

                        <Form.Item>
                            <div className='flex flex-wrap justify-between gap-5 md:flex-nowrap'>
                                <Button
                                    className='block w-full rounded-3xl bg-black text-center text-white transition-colors duration-300 ease-linear hover:bg-[#16bcdc]'
                                    size='large'
                                    htmlType='submit'
                                    loading={isPending}
                                >
                                    Cập nhật thông tin
                                </Button>

                                {/* {profile && (
                                            <Button
                                                type='primary'
                                                size='large'
                                                danger
                                                // onClick={showModal}
                                                onClick={() => sendResetPassword({ email: profile.email! })}
                                                className='w-full rounded-3xl'
                                                loading={isPendingPassword}
                                            >
                                                Thay đổi mật khẩu
                                            </Button>
                                        )} */}
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
