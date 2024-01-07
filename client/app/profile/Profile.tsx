'use client'
import { FC, useState } from 'react';
import SidebarProfile from './SidebarProfile';
import { useLogoutQuery } from '@/redux/features/auth/authApi';
import { signOut } from 'next-auth/react';
import ProfileInfo from './ProfileInfo';
import ChangePassword from './ChangePassword';

interface Props {
    user: any
}

const Profile: FC<Props> = ({ user }) => {
    const [scroll, setScroll] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [active, setActive] = useState(1);
    const [logout, setLogout] = useState(false);

    const { } = useLogoutQuery(undefined, { skip: !logout ? true : false })

    const logoutHandler = async () => {
        // signOut()
        setLogout(true);
    }

    if (typeof window !== 'undefined') {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 85) {
                setScroll(true)
            } else {
                setScroll(false)
            }
        })
    }
    return (
        <div className='w-[85%] mx-auto flex'>
            <div className={`w-16 lg:w-80 h-96 dark:bg-slate-900 bg-slate-100 bg-opacity-90 border dark:border-[#ffffff1d] border-[#0a02021d] rounded shadow-2xl my-20 left-8 sticky ${scroll ? "top-32" : "top-8"}`}>

                <SidebarProfile
                    user={user}
                    active={active}
                    setActive={setActive}
                    avatar={avatar}
                    logoutHandler={logoutHandler}
                />
            </div>
            {
                active === 1 && (
                    <div className='w-full h-full bg-transparent mt-20'>
                        <ProfileInfo avatar={avatar} user={user} />
                    </div>
                )
            }
            {
                active === 2 && (
                    <div className='w-full h-full bg-transparent mt-20'>
                        <ChangePassword />
                    </div>
                )
            }
        </div>
    );
};

export default Profile;