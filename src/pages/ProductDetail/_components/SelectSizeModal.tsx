import { Modal } from 'antd';
import React, { useState } from 'react';
import sizeImg from '~/assets/SizeSelect.png';
export default function SelectSizeModal({ children }: { children: React.ReactNode }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <div onClick={showModal}>{children}</div>
            <Modal open={isModalOpen} onOk={handleOk} footer={<></>} width={'60vw'} onCancel={handleCancel}>
                <div className='flex justify-center'>
                    <img src={sizeImg} alt='' />
                </div>
            </Modal>
        </>
    );
}
