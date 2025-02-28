const convertApiResponseToFileList = ({ url, urlRef, isArr }: { url: string; urlRef: string; isArr?: boolean }) => {
    if (!url) return [];

    if (isArr) return [{ name: 'image.png', uid: urlRef, status: 'done', url }];
    return {
        name: 'image.png',
        uid: urlRef,
        status: 'done',
        url,
    };
};

export default convertApiResponseToFileList;
