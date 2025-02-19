import { Col, Row } from 'antd';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import BreadcrumbDisplay from '~/components/_common/BreadcrumbDisplay';

const AccountLayout = () => {
    const id = useParams();
    const location = useLocation();
    const isOrderDetailPage = location.pathname === `/my-orders/${id}`;

    return (
        <div className='mx-6 max-w-7xl xl:mx-auto'>
            {isOrderDetailPage && <BreadcrumbDisplay titleProduct='Chi Tiết Đơn Hàng' />}
            <BreadcrumbDisplay />
            <Row justify='space-between'>
                <Col span={6} className='hidden md:block'>
                    {/* <AccountSidebarLeft /> */}
                    Side Bar
                </Col>

                <Col span={17}>
                    <Outlet />
                </Col>
            </Row>
        </div>
    );
};

export default AccountLayout;
