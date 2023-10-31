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
            <div className='hidden lg:flex'>
                {navItemData && navItemData.map((item, index) => (
                    <Link href={item.url} key={item.name} passHref>
                        <span className={`${activeItem === index ? "dark:text-[#37a39a] text-[crimson]" : "text"} text-lg px-6 font-poppins`}>{item.name}</span>
                    </Link>
                ))}
            </div>
            {isMobile && (
                <div className='lg:hidden mt-5'>
                    <div className='w-full text-center py-6'>
                        <Link href={'/'} className={`text-[25px] font-poppins font-medium text`}>WEB LMS</Link>
                    </div>
                    {navItemData && navItemData.map((item, index) => (
                        <Link href={item.url} key={item.name} passHref>
                            <div className={`${activeItem === index ? "dark:text-[#37a39a] text-[crimson]" : "text"} text-lg px-6 font-poppins`}>{item.name}</div>
                        </Link>
                    ))}
                </div>
            )}
        </>
    );
};

export default NavItems;