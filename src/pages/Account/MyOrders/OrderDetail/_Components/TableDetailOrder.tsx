import { Button, Flex, Table, Tooltip } from 'antd';
import { TableProps } from 'antd/lib';
import { Link } from 'react-router-dom';
import { formatCurrency } from '~/utils/formatCurrrency';

interface DataType {
    key?: number;
    image: string;
    name: string;
    color: string;
    size: string;
    price: number;
    quantity: number;
    productId: string;
    total?: number;
    isReviewed: boolean;
}

interface Props {
    orderItems: DataType[];
    status: string;
}

const TableDetailOrder = ({ orderItems, status }: Props) => {
    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'No.',
            dataIndex: 'key',
            key: 'key',
            render: (key) => <p>{key + 1}</p>,
        },
        {
            title: 'Ảnh Sản Phẩm',
            dataIndex: 'image',
            key: 'image',
            render: (image) => <img src={image} alt='product' className='h-20 w-20 object-cover' />,
        },
        {
            title: 'Tên Sản Phẩm',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => {
                return (
                    <>
                        <Flex justify='center' align='center'>
                            <Tooltip title='Xem chi tiết sản phẩm'>
                                <Link to={`/product/${record.productId}`}>
                                    <h3>{record.name}</h3>
                                </Link>
                            </Tooltip>
                        </Flex>
                    </>
                );
            },
        },
        {
            title: 'Màu',
            dataIndex: 'color',
            key: 'color',
            render: (color) => (
                <button
                    style={{ backgroundColor: `${color}` }}
                    className={`relative overflow-hidden rounded-full border px-2 py-2 text-sm transition-all`}
                ></button>
            ),
        },
        {
            title: 'Kích cỡ',
            dataIndex: 'size',
            key: 'size',
            render: (size) => <p>{size}</p>,
        },
        {
            title: 'Giá Tiền',
            dataIndex: 'price',
            key: 'price',
            render: (price) => <p>{formatCurrency(price)}</p>,
        },
        {
            title: 'Số Lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (quantity) => <p>{quantity}</p>,
        },
        {
            title: 'Tổng Tiền',
            dataIndex: 'total',
            key: 'total',
            render: (_, record) => <p>{formatCurrency(record.price * record.quantity)}</p>,
        },
        ...(status === 'done'
            ? [
                  {
                      title: 'Đánh giá',
                      key: 'action',
                      render: (_: number, record: DataType) => {
                          console.log(record);
                          return (
                              <>
                                  {/* {!record.isReviewed && (
                                      <RateBtn
                                          handleRate={handleRateProduct}
                                          productId={record.productId}
                                          orderId={id!}
                                      />
                                  )} */}
                                  {record.isReviewed && (
                                      <Button type='default' disabled>
                                          Đã đánh giá
                                      </Button>
                                  )}
                              </>
                          );
                      },
                  },
              ]
            : []),
    ];

    const data: DataType[] = orderItems.map((item, index) => ({
        key: index,
        image: item.image,
        name: item.name,
        color: item.color,
        size: item.size,
        price: item.price,
        quantity: item.quantity,
        productId: item.productId,
        isReviewed: item.isReviewed,
    }));

    return <Table className='mt-5 w-full' columns={columns} dataSource={data} pagination={false} />;
};

export default TableDetailOrder;
