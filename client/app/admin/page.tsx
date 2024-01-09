'use client'
import { FC } from 'react';
import Heading from '../utils/Heading';
import DashboardHero from '../components/Admin/DashboardHero';
import AdminSidebar from '../components/Admin/AdminSidebar';
import AdminProtected from '../hooks/useAdminProtected';

interface Props { }

const AdminPage: FC<Props> = () => {
    return (
        <AdminProtected>
            <Heading
                title="web lms - Admin"
                description="web lms is a platform where students can learn important things"
                keywords="machine learning ,programming, MERN"
            />
            <div className='flex min-h-screen'>
                <div className='w-1/5 lg:w-2/12'>
                    <AdminSidebar />
                </div>
                <div className='w-4/5 lg:w-10/12'>
                    <DashboardHero />
                </div>
            </div>
        </AdminProtected>
    );
};

export default AdminPage;