import { ReactNode } from 'react';
import WrapperList from '~/components/_common/WrapperList';
import { Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import useTable from '~/hooks/_common/useTable';

const WrapperPageAdmin = ({ title, option, children }: { title: string; option?: ReactNode; children: ReactNode }) => {
    const { resetFilter } = useTable();
    const handleResetAll = () => resetFilter();

    return (
        <WrapperList
            title={
                <div className='py-2'>
                    <h1 className='m-0 text-xl font-semibold text-gray-800'>{title}</h1>
                </div>
            }
            lineButtonBox
            className='rounded-lg border border-gray-100 bg-gray-50/50 shadow-sm dark:border-gray-800'
            option={
                <div className='flex items-center gap-3'>
                    {!option ? (
                        <Button
                            onClick={handleResetAll}
                            icon={<ReloadOutlined />}
                            className='hover:border-primary/60 hover:text-primary/80 transition-colors'
                            size='middle'
                        >
                            Đặt lại bộ lọc
                        </Button>
                    ) : (
                        option
                    )}
                </div>
            }
        >
            <div className='min-h-[200px] rounded-lg bg-white p-6 shadow-sm'>{children}</div>
        </WrapperList>
    );
};

export default WrapperPageAdmin;
