import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { BiSearch } from 'react-icons/bi';

interface Props { }

const Hero: FC<Props> = () => {
    return (
        <div className='layout w-full lg:flex items-center'>
            <div className='absolute top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1100px:h-[600px]  1100px:w-[600px] h-[50vh] hero_animation '>
            </div>
            <div className='1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-0 z-10'>
                <Image width={500} height={500} src={"https://res.cloudinary.com/dsb7txoad/image/upload/v1698681350/website%20assets/development_zlnmjn.png"} alt='This is hero image' className='object-contain w-[90%] 1100px:max-w-[90%] 1500px:max-w-[85%] h-auto z-10' />
            </div>
            <div className='1000px:w-[60%] flex flex-col text-center items-center mt-[150px] 1000px:mt-0  1000px:text-left'>
                <h2 className='text text-3xl px-3 w-full 1000px:text-7xl font-medium font-Josefin py-2 1000px:leading-[75px] '>
                    Improve your Online learning Experience better instantly
                </h2>
                <br />
                <p className='text font-Josefin font-medium text-lg 1500px:!w-[55%] 1100px:!w-[78%]'>
                    We have 40+ online courses & 500+ online registered students, find your desired course from them.
                </p>
                <br />
                <br />
                <div className='1500px:w-[55%] 1100px:w-[78%] w-[90%] h-[50px] bg-transparent relative'>
                    <input type="search" placeholder='Search course....' className='bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-white rounded-md p-2 w-full h-full outline-none ' />
                    <div className='absolute center w-[50px] h-[50px] cursor-pointer right-0 top-0 rounded-r-md bg-[#39c1f3]'>
                        <BiSearch className="text-white" size={30} />
                    </div>
                </div>

                <br />
                <br />
                <div className='1500px:w-[55%] 1100px:w-[78%] w-[90%] flex items-center'>
                    <Image width={50} height={50} src={'https://res.cloudinary.com/dsb7txoad/image/upload/v1698681029/website%20assets/avatar3_nk2iey.png'} className='rounded-full' alt='This is avatar image' />
                    <Image width={50} height={50} src={'https://res.cloudinary.com/dsb7txoad/image/upload/v1698681087/website%20assets/avatar1_qebz8o.jpg'} className='rounded-full ml-[-20px]' alt='This is avatar image' />
                    <Image width={50} height={50} src={'https://res.cloudinary.com/dsb7txoad/image/upload/v1698681070/website%20assets/avatar2_nnwbqd.jpg'} className='rounded-full ml-[-20px]' alt='This is avatar image' />
                    <p className='font-Josefin text 1000px:pl-3 text-lg font-medium'>500+ people already trusted us. <Link href={'/courses'} className='colorText'>View courses</Link></p>
                </div>
                <br />
            </div>
        </div>
    );
};

export default Hero;