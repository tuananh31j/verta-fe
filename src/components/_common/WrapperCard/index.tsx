import { Card } from 'antd';
import clsx from 'clsx';
import { ReactNode } from 'react';

const WrapperCard = ({
    children,
    isLoading,
    title,
    className,
    isOpacity,
}: {
    children: ReactNode;
    isLoading?: boolean;
    title: string;
    className?: string;
    isOpacity?: boolean;
}) => {
    return (
        <Card
            loading={isLoading}
            title={title}
            className={clsx(isOpacity && 'pointer-events-none opacity-60', 'shadow-10 shadow-graydark')}
        >
            {isOpacity && <span className='mb-4 inline-block'>Có thể chỉnh sau khi chọn danh mục</span>}
            {!isOpacity && children}
        </Card>
    );
};

export default WrapperCard;
