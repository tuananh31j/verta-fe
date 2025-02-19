import useTable from '~/hooks/common/useTable';
import { orderColumns, DataType } from './_helper';

import { ColumnsType } from 'antd/es/table';
import TableDisplay from '~/components/TableDisplay';

const OrderTable: React.FC = () => {
    const { query, onFilter, onSelectPaginateChange, getColumnSearchProps } = useTable<DataType>();
    // const { data } = useGetMyOrders(query);
    // const myOrders = data?.data.data.orders;
    // const totalDocs = data?.data.data.totalDocs;
    const columns: ColumnsType<DataType> = orderColumns({ getColumnSearchProps, query }) || [];

    return (
        <>
            <TableDisplay
                onFilter={onFilter}
                onSelectPaginateChange={onSelectPaginateChange}
                columns={columns}
                totalDocs={100}
                dataSource={[]}
                currentPage={Number(query.page || 1)}
            ></TableDisplay>
        </>
    );
};

export default OrderTable;
