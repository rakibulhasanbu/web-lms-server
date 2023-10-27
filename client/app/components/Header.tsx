"use client"

import Link from 'next/link';
import { FC, useState } from 'react';
import NavItems from '../utils/NavItems';
import { ThemeSwitcher } from '../utils/ThemeSwitcher';

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    activeItem: number;
}

const Header: FC<Props> = ({ activeItem }) => {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [active, setActive] = useState(false);

    if (typeof window !== "undefined") {
        window.addEventListener("scroll", () => {
            if (window.screenY > 85) {
                setActive(true)
            } else {
                setActive(false)
            }
        })
    };
    return (
        <div className='w-full relative'>
            <div className={`${active ? "dark:bg-opacity-50 dark_gradient fixed top-0 left-0 w-full h-20 z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500" : "w-full border-b dark:border-[#ffffff1c] h-20 z-[80] dark:shadow"}`}>
                <div className='w-[95%] 800px:w-[92%] m-auto py-2 h-full'>
                    <div className='w-full h-20 flex items-center justify-between p-3'>
                        <div>
                            <Link href={'/'} className={`text-[25px] font-poppins font-medium text-black dark:text-white`}>WEB LMS</Link>
                        </div>
                        <div className='flex items-center justify-between '>
                            <NavItems activeItem={activeItem} isMobile={false} />
                            <ThemeSwitcher />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;