import { MinusCircleOutlined } from '@ant-design/icons';
import { TinyColor } from '@ctrl/tinycolor';
import { Button, ConfigProvider, Tag } from 'antd';
import { OrderStatus } from '~/constants/enum';
import RateBtn from './RateBtn';

const colorsArr = ['#fc6076', '#ff9a44', '#ef9d43', '#e75516'];
const getHoverColors = (colors: string[]) => colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors: string[]) => colors.map((color) => new TinyColor(color).darken(5).toString());

const ActionLink = ({ status, orderId }: { status: OrderStatus; orderId: string }) => {
    switch (status) {
        case OrderStatus.pending:
            return (
                <Button type='primary' danger disabled>
                    Xác nhận hủy
                </Button>
            );

        case OrderStatus.confirmed:
        case OrderStatus.shipping:
            return <></>;

        case OrderStatus.delivered:
            return <Button type='primary'>Tôi đã nhận được hàng</Button>;

        case OrderStatus.cancelled:
            return (
                <Button type='primary' danger disabled>
                    Đã bị hủy
                </Button>
            );

        case OrderStatus.done:
            return (
                <ConfigProvider
                    theme={{
                        components: {
                            Button: {
                                colorPrimary: `linear-gradient(90deg,  ${colorsArr.join(', ')})`,
                                colorPrimaryHover: `linear-gradient(90deg, ${getHoverColors(colorsArr).join(', ')})`,
                                colorPrimaryActive: `linear-gradient(90deg, ${getActiveColors(colorsArr).join(', ')})`,
                                lineWidth: 0,
                            },
                        },
                    }}
                >
                    {/* <RateBtn productId='đá' orderId={orderId} handleRate={() => {}} /> */}
                </ConfigProvider>
            );

        default:
            return (
                <Tag icon={<MinusCircleOutlined />} color='default'>
                    Lỗi!!
                </Tag>
            );
    }
};

export default ActionLink;
