import { Breadcrumb, ConfigProvider } from 'antd';
import { useLocation } from 'react-router-dom';
// import Contact from '~/pages/Clients/Contact';

// dịch pathname sang tiếng việt
const translateToVietnamese = (word: string) => {
    const translations: { [key: string]: string } = {
        Home: 'Trang chủ',
        Account: 'Tài khoản',
        Products: 'Sản phẩm',
        Wishlist: 'Danh sách yêu thích',
        Profile: 'Thông tin tài khoản',
        'My Orders': 'Đơn hàng của tôi',
        Contact: 'Liên hệ',
    };
    return translations[word] || word; // trả về từ được truyền vào nếu không tìm thấy
};

const BreadcrumbDisplay = ({ titleProduct }: { titleProduct?: string }) => {
    const location = useLocation();

    const breadCrumbView = () => {
        // lấy đường dẫn từ url
        const { pathname } = location;

        // viết hoa chữ cái đầu
        const capatilize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

        // tách breadcrumb từ url
        const pathnames = pathname
            .split('/')
            .filter((item) => item)
            .map((item) =>
                item.includes('-')
                    ? item
                          .split('-')
                          .map((word) => capatilize(word))
                          .join(' ')
                    : capatilize(item)
            );

        return (
            <ConfigProvider
                theme={{
                    token: {
                        fontSize: 16,
                    },
                }}
            >
                <div className='breadcrumb-container flex h-[60px] w-full items-center border-t-1 border-b-1 border-[#efeff4] font-semibold'>
                    <Breadcrumb
                        separator='/'
                        items={[
                            pathnames.length <= 0
                                ? { title: translateToVietnamese('Home') }
                                : { title: translateToVietnamese('Home'), href: '/' },

                            ...pathnames.map((name) => ({
                                title:
                                    name === pathnames[pathnames.length - 1] && titleProduct
                                        ? titleProduct
                                        : translateToVietnamese(capatilize(name)),
                            })),
                        ]}
                    />
                </div>
            </ConfigProvider>
        );
    };

    return <>{breadCrumbView()}</>;
};

export default BreadcrumbDisplay;
