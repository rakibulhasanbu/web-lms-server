/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { FC, useState } from 'react';
import Heading from '../utils/Heading';
import Header from '../components/Header';
import Profile from './Profile';
import { useSelector } from 'react-redux';
import Protected from '../hooks/useProtected';

interface Props { }

const page: FC<Props> = () => {
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(5);
    const [route, setRoute] = useState('login');
    const { user } = useSelector((state: any) => state.auth)

    return (
        <div>
            <Protected>
                <Heading
                    title={`${user?.name}'s profile`}
                    description="web lms is a platform where students can learn important things"
                    keywords="machine learning ,programming, MERN"
                />
                <Header open={open} setOpen={setOpen} activeItem={activeItem} route={route} setRoute={setRoute} />
                <Profile user={user} />
            </Protected>
        </div>
    );
};

export default page;