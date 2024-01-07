import Image from 'next/image';
import { FC } from 'react';
import avatarDefault from '../../public/avatar.png';
import { MdLockPerson, MdOutlineAdminPanelSettings } from "react-icons/md";
import { SiCoursera } from "react-icons/si";
import { PiCertificateFill } from "react-icons/pi";
import { RiLogoutCircleLine } from "react-icons/ri";
import Link from 'next/link';

interface Props {
    user: any;
    active: number;
    avatar: string | null;
    setActive: (active: number) => void;
    logoutHandler: any;
}

const SidebarProfile: FC<Props> = ({ user, active, setActive, logoutHandler, avatar }) => {
    return (
        <div className='w-full'>
            <div onClick={() => setActive(1)} className={`w-full flex items-center px-3 py-4 cursor-pointer hover:dark:bg-slate-800 hover:bg-slate-300 ${active === 1 ? "dark:bg-slate-800 bg-slate-300" : "bg-transparent"}`}>
                <Image src={user.avatar || avatar ? user.avatar.url || avatar : avatarDefault} width={32} height={32} alt="avatar image" className='w-5 h-5 lg:w-8 lg:h-8 cursor-pointer rounded-full' />
                <h4 className='pl-2 hidden lg:block font-poppins font-semibold dark:text-white text'>My Account</h4>
            </div>
            <div onClick={() => setActive(2)} className={`w-full flex items-center px-3 py-4 cursor-pointer hover:dark:bg-slate-800 hover:bg-slate-300 ${active === 2 ? "dark:bg-slate-800 bg-slate-300" : "bg-transparent"}`}>
                <MdLockPerson size={20} className="dark:text-slate-100 text-slate-800" />
                <h4 className='pl-2 hidden lg:block font-poppins font-semibold dark:text-white text'>Change password</h4>
            </div>
            <div onClick={() => setActive(3)} className={`w-full flex items-center px-3 py-4 cursor-pointer hover:dark:bg-slate-800 hover:bg-slate-300 ${active === 3 ? "dark:bg-slate-800 bg-slate-300" : "bg-transparent"}`}>
                <SiCoursera size={20} className="dark:text-slate-100 text-slate-800" />
                <h4 className='pl-2 hidden lg:block font-poppins font-semibold dark:text-white text'>Enrolled Courses</h4>
            </div>
            {
                user?.role === "admin" &&
                (<Link href="/admin" className={`w-full flex items-center px-3 py-4 cursor-pointer hover:dark:bg-slate-800 hover:bg-slate-300`}>
                    <MdOutlineAdminPanelSettings size={20} className="dark:text-slate-100 text-slate-800" />
                    <h4 className='pl-2 hidden lg:block font-poppins font-semibold dark:text-white text'>Admin Dashboard</h4>
                </Link>)
            }
            <div onClick={() => setActive(4)} className={`w-full flex items-center px-3 py-4 cursor-pointer hover:dark:bg-slate-800 hover:bg-slate-300 ${active === 4 ? "dark:bg-slate-800 bg-slate-300" : "bg-transparent"}`}>
                <PiCertificateFill size={20} className="dark:text-slate-100 text-slate-800" />
                <h4 className='pl-2 hidden lg:block font-poppins font-semibold dark:text-white text'>Course Certificate</h4>
            </div>
            <div onClick={logoutHandler} className={`w-full flex items-center px-3 py-4 cursor-pointer bg-transparent hover:dark:bg-slate-800 hover:bg-slate-300`}>
                <RiLogoutCircleLine size={20} className="dark:text-slate-100 text-slate-800" />
                <h4 className='pl-2 hidden lg:block font-poppins font-semibold dark:text-white text'>Logout</h4>
            </div>
        </div>
    );
};

export default SidebarProfile;