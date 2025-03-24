import {
    BarcodeOutlined,
    BgColorsOutlined,
    CommentOutlined,
    LineChartOutlined,
    ProductOutlined,
    ProfileOutlined,
    ShoppingOutlined,
    StarFilled,
} from '@ant-design/icons';
import { ADMIN_ROUTES } from '~/constants/router';

export type IChildrenItem = {
    label: string;
    route: string;
};
export type IMenuItem = {
    icon: JSX.Element;
    label: string;
    route?: string;
    children?: IChildrenItem[];
};

export const menuGroups: IMenuItem[] = [
    {
        icon: <LineChartOutlined />,
        label: 'Thống kê',
        route: ADMIN_ROUTES.DASHBOARD,
    },
    {
        icon: <ProfileOutlined />,
        label: 'Quản lý đơn hàng',
        route: ADMIN_ROUTES.ORDERS,
    },
    {
        icon: <ShoppingOutlined />,
        label: 'Quản lý sản phẩm',
        children: [
            { label: 'Tất cả sản phẩm', route: ADMIN_ROUTES.PRODUCTS },
            { label: 'Tạo mới sản phẩm', route: ADMIN_ROUTES.PRODUCTS_CREATE },
        ],
    },
    {
        icon: <BarcodeOutlined />,
        label: 'Quản lý voucher',
        children: [
            { label: 'Tất cả voucher', route: ADMIN_ROUTES.VOUCHER },
            { label: 'Tạo mới voucher', route: ADMIN_ROUTES.VOUCHER_CREATE },
        ],
    },
    {
        icon: <BgColorsOutlined />,
        label: 'Quản lý thuộc tính',
        children: [
            { label: 'Màu sắc', route: ADMIN_ROUTES.COLORS },
            { label: 'Kích cỡ', route: ADMIN_ROUTES.SIZES },
        ],
    },
    {
        icon: <ProductOutlined />,
        label: 'Quản lý danh mục',
        children: [
            { label: 'Tất cả danh muc', route: ADMIN_ROUTES.CATEGORIES },
            { label: 'Tạo mới danh mục', route: ADMIN_ROUTES.CATEGORIES_CREATE },
        ],
    },
    {
        icon: <StarFilled />,
        label: 'Quản lý đánh giá',
        children: [{ label: 'Tất cả đánh giá', route: ADMIN_ROUTES.REVIEWS }],
    },
    {
        icon: <CommentOutlined />,
        label: 'Quản lý người dùng',
        children: [{ label: 'Tất cả người dùng', route: ADMIN_ROUTES.USERS }],
    },
];
