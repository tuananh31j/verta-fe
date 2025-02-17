import {
    BgColorsOutlined,
    CommentOutlined,
    CrownOutlined,
    LineChartOutlined,
    ProductOutlined,
    ProfileOutlined,
    ShoppingOutlined,
    StarOutlined,
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
        // children: [
        //     { label: 'All', route: ADMIN_ROUTES.ORDERS },
        //     // { label: 'Cancellation', route: ADMIN_ROUTES.ORDERS_CANCELLATION },
        // ],
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
        icon: <CommentOutlined />,
        label: 'Quản lý người dùng',
        children: [
            { label: 'Tất cả người dùng', route: ADMIN_ROUTES.USERS },
            // { label: 'Tạo mới người dùng', route: ADMIN_ROUTES.USERS_CREATE },

            // { label: 'Chat management', route: 'orders/test' },
            // { label: 'Review management', route: ADMIN_ROUTES.PRODUCTS_CREATE },
        ],
    },
    // {
    //     icon: <ShopOutlined />,
    //     label: 'Shop',
    //     children: [
    //         { label: 'Shop information', route: ADMIN_ROUTES.SHOP },
    //         { label: 'Shop settings', route: ADMIN_ROUTES.SHOP_SETTINGS },
    //     ],
    // },
];
