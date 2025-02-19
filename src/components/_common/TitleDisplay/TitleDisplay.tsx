import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import { ReactNode, useState } from 'react';

const TitleDisplay = ({
    option,
    title,
    border,
    onClick,
}: {
    title: React.ReactNode;
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
        <div onClick={handleClick} className={clsx('mb-5 flex items-center justify-between')}>
            <div className='inline-block py-[4px] text-start'>
                <span className='flex items-center gap-3'>
                    {!status && !!onClick && <MinusOutlined />}
                    {status && <PlusOutlined />}
                    <h1 className='text-global text-start text-[16px] font-medium capitalize md:text-[18px]'>
                        {title}
                    </h1>
                </span>
            </div>
            <div className='flex items-center'>{!!option && option}</div>
        </div>
    );
};

export default TitleDisplay;
