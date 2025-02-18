import { ReactNode } from 'react';
import TitleDisplay from '../TitleDisplay';
import { cn } from '~/utils';

interface IWrapperListProps {
    children: React.ReactNode;
    hasData?: boolean;
    title: string;
    option?: ReactNode;
    className?: string;
    outline?: boolean;
    classic?: boolean;
    box?: boolean;
    lineButtonBox?: boolean;
    handleClick?: () => void;
}
const WrapperList: React.FC<IWrapperListProps> = ({
    children,
    hasData = true,
    title,
    className,
    handleClick,
    outline,
    lineButtonBox,
    classic,
    box,
    option,
}) => {
    const outlineBoxClass =
        'm-0 rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1';
    const BaseClass = 'my-20 transition-all duration-300 ease-in';
    const BoxClass =
        'm-0 rounded-sm border border-stroke bg-white p-10 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-5';

    const lineButtonBoxClass = 'border border-transparent border-b-slate-500 border-opacity-20 py-5';
    return (
        <div
            className={cn(
                {
                    [outlineBoxClass]: outline,
                    [BaseClass]: classic,
                    [lineButtonBoxClass]: lineButtonBox,
                    [BoxClass]: box,
                },
                className
            )}
        >
            <TitleDisplay onClick={handleClick && handleClick} border={!lineButtonBox} title={title} option={option} />
            {children}
            {/* {!hasData && <Empty />} */}
        </div>
    );
};

export default WrapperList;
