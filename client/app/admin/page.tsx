'use client'
import { FC } from 'react';
import Heading from '../utils/Heading';
import AdminSidebar from './AdminSidebar';

interface Props { }

const AdminPage: FC<Props> = () => {
    return (
        <>
            <Heading
                title="web lms - Admin"
                description="web lms is a platform where students can learn important things"
                keywords="machine learning ,programming, MERN"
            />
            <div className='flex'>
                <div className='w-1/5 lg:w-2/12'>
                    <AdminSidebar />
                </div>
                <div className='w-4/5 lg:w-10/12'>

                </div>
            </div>
        </>
    );
};

export default AdminPage;