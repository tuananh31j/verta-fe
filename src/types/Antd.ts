export interface IThumbnailAntd extends File {
    uid: string;
    originFileObj: File;
}

export type IAntdImageFiles = {
    file: IThumbnailAntd;
    fileList: FileList;
};
