import { HomeFilled, PhoneFilled } from '@ant-design/icons';

const HeaderTop = () => {
    return (
        <div className='bg-black'>
            <div className='sticky top-0 flex justify-between px-6 py-2 text-sm text-white'>
                <div className='flex items-center gap-1'>
                    <HomeFilled />
                    <span>Hệ thống showroom</span>
                </div>
                <div className='flex items-center gap-1'>
                    <PhoneFilled />
                    <div>
                        Mua hàng online: <span>0246.2909098</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderTop;
