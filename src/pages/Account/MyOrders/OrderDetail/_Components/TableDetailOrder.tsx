import { Button, Flex, Table, Tooltip } from 'antd';
import { TableProps } from 'antd/lib';
import { Link } from 'react-router-dom';
import { formatCurrency } from '~/utils/formatCurrrency';
import RateBtn from '../../Components/RateBtn';

interface DataType {
    key?: number;
    image: string;
    name: string;
    color: string[] | string;
    size: string[] | string;
    price: number;
    quantity: number[] | number;
    productId: string;
    total?: number;
    isReviewed: boolean;
}

interface Props {
    orderItems: DataType[];
    status: string;
    orderId: string;
    showModal: (variantId: string) => void;
}

const TableDetailOrder = ({ orderItems, status, showModal }: Props) => {
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
            render: (colors) => (
                <div className='flex flex-wrap gap-2'>
                    {colors.map((color: string) => (
                        <button
                            style={{ backgroundColor: `${color}` }}
                            className={`relative overflow-hidden rounded-full border px-2 py-2 text-sm transition-all`}
                        ></button>
                    ))}
                </div>
            ),
        },
        {
            title: 'Kích cỡ',
            dataIndex: 'size',
            key: 'size',
            render: (size) => <div className='flex flex-wrap gap-2'>{size.join(' ')}</div>,
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
            render: (quantity) => <p>{(quantity as number[]).reduce((acc: number, cur: number) => acc + cur, 0)}</p>,
        },
        {
            title: 'Tổng Tiền',
            dataIndex: 'total',
            key: 'total',
            render: (_, record) => (
                <p>
                    {formatCurrency(
                        record.price * (record.quantity as number[]).reduce((acc: number, cur: number) => acc + cur, 0)
                    )}
                </p>
            ),
        },
        ...(status === 'done'
            ? [
                  {
                      title: 'Đánh giá',
                      key: 'action',
                      render: (_: number, record: DataType) => {
                          console.log(record.isReviewed);
                          return (
                              <>
                                  {!record.isReviewed && <RateBtn showModal={() => showModal(record.productId)} />}
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
    const orderMap = new Map<string, DataType>();

    orderItems.forEach((item) => {
        const newOrderItems = orderItems.filter((itemFilter) => itemFilter.productId === item.productId);
        const commonAttribute = newOrderItems[0];

        if (!orderMap.has(item.productId)) {
            orderMap.set(item.productId, {
                key: orderMap.size,
                name: commonAttribute.name,
                image: commonAttribute.image,
                color: newOrderItems.map(({ color }) => color) as string[],
                size: newOrderItems.map(({ size }) => size) as string[],
                price: commonAttribute.price,
                quantity: newOrderItems.map(({ quantity }) => quantity) as number[],
                productId: commonAttribute.productId,
                isReviewed: newOrderItems.every(({ isReviewed }) => isReviewed === true),
            });
        }
    });

    const orderDetailData: DataType[] = Array.from(orderMap.values());

    return (
        <Table
            className='mt-5 w-full'
            rowKey='productId'
            columns={columns}
            dataSource={orderDetailData}
            pagination={false}
        />
    );
};

export default TableDetailOrder;
