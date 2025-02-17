import { ReactNode } from 'react';
import { Button } from 'antd';
import WrapperList from '~/components/_common/WrapperList';
import useTable from '~/hooks/_common/useTable';

const WrapperPageAdmin = ({ title, option, children }: { title: string; option?: ReactNode; children: ReactNode }) => {
    const { resetFilter } = useTable();
    const handleResetAll = () => resetFilter();
    return (
        <WrapperList
            title={title}
            lineButtonBox
            className='p-0'
            option={!option ? <Button onClick={handleResetAll}>Đặt lại bộ lọc</Button> : option}
        >
            {children}
        </WrapperList>
    );
};

export default WrapperPageAdmin;
