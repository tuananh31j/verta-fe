import useGetAllOrders from '~/hooks/queries/orders/useGetAllOrders';
import useTable from '~/hooks/_common/useTable';
import OrderTable from './OrderTable';
import WrapperPageAdmin from '~/pages/Admin/_common';

const ManageOrder = () => {
    const { query } = useTable();
    const { data } = useGetAllOrders(query);
    const ordersList = data?.orders;
    const totalDocs = data?.totalDocs;

    return (
        <WrapperPageAdmin title='Quản lý đơn hàng'>
            <OrderTable ordersList={ordersList} totalDocs={totalDocs} />
        </WrapperPageAdmin>
    );
};
export default ManageOrder;
