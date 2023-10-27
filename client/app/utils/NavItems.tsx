import Link from 'next/link';
import { FC } from 'react';

interface Props {
    activeItem: number;
    isMobile: boolean;
}

export const navItemData = [
    {
        name: "Home",
        url: "/"
    },
    {
        name: "Courses",
        url: "/courses"
    },
    {
        name: "About",
        url: "/about"
    },
    {
        name: "Policy",
        url: "/policy"
    },
    {
        name: "FAQ",
        url: "/faq"
    },
]

const NavItems: FC<Props> = ({ activeItem, isMobile }) => {
    return (
        <>
            <div className='hidden 800px:flex'>
                {navItemData && navItemData.map((item, index) => (
                    <Link href={item.url} key={item.name} passHref>
                        <span className={`${activeItem === index ? "dark:text-[#37a39a] text-[crimson]" : "dark:text-white text-black"} text-lg px-6 font-poppins`}>{item.name}</span>
                    </Link>
                ))}
            </div>
            {isMobile && (
                <div className='800px:hidden mt-5'>
                    <div className='w-full text-center py-6'>
                        {navItemData && navItemData.map((item, index) => (
                            <Link href={item.url} key={item.name} passHref>
                                <span className={`${activeItem === index ? "dark:text-[#37a39a] text-[crimson]" : "dark:text-white text-black"} text-lg px-6 font-poppins`}>{item.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default NavItems;