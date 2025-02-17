export default function ErrorPage() {
    return (
        <div className='flex h-[100vh] flex-col items-center justify-center'>
            <div className='flex justify-center'>
                <img
                    className='w-[80%]'
                    loading='lazy'
                    src='https://demo-morata.myshopify.com/cdn/shop/files/404_720x.png?v=1704425830'
                    alt=''
                />
            </div>
            <div className='mt-[15px] flex flex-col items-center gap-5'>
                <h1 className='text-center text-[28px] leading-[40px] font-bold xl:text-4xl'>Ối! Xảy ra lỗi rồi!</h1>
                <p className='text-center text-[12px] text-[#777777] xl:text-base'>
                    Xin lỗi có vẻ\ đã có vài lỗi xảy ra. Xin lỗi vì trải nghiệm k tốt của bạn.
                </p>
            </div>
        </div>
    );
}
