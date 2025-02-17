import LoginComponent from './_components/LoginComponent';
import RegisterComponent from './_components/RegisterComponent';

export default function AuthPage() {
    return (
        <div className='mt-4 min-h-[100vh]'>
            <div className='border-b border-gray-300 pb-4'>
                <div className='mx-6 flex max-w-7xl items-center gap-2 text-sm font-normal xl:mx-auto'>
                    <h3 className='uppercase'>Trang chủ</h3> / <h3 className='uppercase'>Tài khoản</h3>
                </div>
            </div>
            <div className='relative mx-6 mt-20 grid max-w-7xl grid-cols-2 p-8 xl:mx-auto'>
                <div className='relative flex w-[476px] justify-center'>
                    <LoginComponent />
                </div>

                {/* Thanh dọc chia đôi */}
                <div className='absolute top-0 left-1/2 h-full w-[1px] bg-gray-300'></div>

                <div className='relative ml-24 flex w-[476px] justify-center'>
                    <RegisterComponent />
                </div>
            </div>
        </div>
    );
}
