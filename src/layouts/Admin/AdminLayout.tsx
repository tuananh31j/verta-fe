import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import useDocumentTitle from '~/hooks/_common/useDocumentTitle';
import Header from '~/layouts/_components/Admin/Header';
import Sidebar from '~/layouts/components/Admin/Sidebar';

export default function AdminLayout() {
    useDocumentTitle('Quản trị');

    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div className='flex h-screen overflow-hidden bg-[#F5F5F5] dark:bg-slate-700'>
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className='relative flex flex-1 flex-col overflow-x-hidden overflow-y-auto'>
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <div className='mt-5 px-4'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
