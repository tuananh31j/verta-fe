import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import { ReactNode, useState } from 'react';

const TitleDisplay = ({
    option,
    title,
    border,
    onClick,
}: {
    title: string;
    onClick?: () => void;
    border?: boolean;
    option?: ReactNode;
}) => {
    const [status, setStatus] = useState<boolean>(false);
    const handleClick = () => {
        if (onClick) {
            onClick();
            setStatus(!status);
        }
    };
    return (
        <div
            onClick={handleClick}
            className={clsx({ ['border-b-[1.5px] border-blue-300']: border }, 'mb-5 flex items-center justify-between')}
        >
            <div className='inline-block border-b-[1.5px] border-[#16bcdc] py-[4px] text-start md:border-b-[2.3px]'>
                <span className='flex items-center gap-3'>
                    {!status && !!onClick && <MinusOutlined />}
                    {status && <PlusOutlined />}
                    <h1 className='text-start text-[16px] font-medium text-black capitalize md:text-[18px]'>{title}</h1>
                </span>
            </div>
            <div className='flex items-center'>{!!option && option}</div>
        </div>
    );
};

export default TitleDisplay;
