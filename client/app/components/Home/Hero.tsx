import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { BiSearch } from 'react-icons/bi';

interface Props { }

const Hero: FC<Props> = () => {
    return (
        <div className='layout w-full lg:min-h-[90vh] flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10'>
            {/* <div className='absolute top-[100px] lg:top-[unset] 2xl:h-[700px] h-[50vh] hero_animation '></div> */}
            <div className='w-full lg:w-2/5 center pt-10 lg:pt-0 z-10'>
                <div className='w-80 lg:w-[400px] h-80 lg:h-[400px] center rounded-full hero_animation'>
                    <Image width={400} height={400} src={"https://res.cloudinary.com/dsb7txoad/image/upload/v1698681350/website%20assets/development_zlnmjn.png"} alt='This is hero image' className='object-contain p-10 z-10' />
                </div>
            </div>

            <div className='w-full lg:w-3/5 px-2 lg:pl-12 lg:pr-28 text font-Josefin font-medium'>
                <h2 className='text-2xl w-full lg:text-4xl py-2'>
                    Improve your Online learning Experience better instantly
                </h2>

                <p className='text-base lg:text-lg pr-4 mt-2 lg:mt-4'>
                    We have 40+ online courses & 500+ online registered students, find your desired course from them.
                </p>

                <div className='w-full h-8 lg:h-12 text-sm lg:text-base bg-transparent relative my-6 lg:my-10'>
                    <input type="search" placeholder='Search course....' className=' bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-white rounded-md px-4 py-2 w-full h-full outline-none ' />
                    <div className='absolute center w-8 h-8 lg:w-12 lg:h-12 cursor-pointer right-0 top-0 rounded-r-md bg-[#39c1f3]'>
                        <BiSearch className="text-white text-xl lg:text-3xl" />
                    </div>
                </div>


                <div className='flex items-center'>
                    <Image width={50} height={50} src={'https://res.cloudinary.com/dsb7txoad/image/upload/v1698681029/website%20assets/avatar3_nk2iey.png'} className='rounded-full w-6 lg:w-9 h-6 lg:h-9 object-cover border-2 border-white' alt='This is avatar image' />
                    <Image width={50} height={50} src={'https://res.cloudinary.com/dsb7txoad/image/upload/v1698681087/website%20assets/avatar1_qebz8o.jpg'} className='rounded-full w-6 lg:w-9 h-6 lg:h-9 object-cover border-2 border-white -ml-4' alt='This is avatar image' />
                    <Image width={50} height={50} src={'https://res.cloudinary.com/dsb7txoad/image/upload/v1698681070/website%20assets/avatar2_nnwbqd.jpg'} className='rounded-full w-6 lg:w-9 h-6 lg:h-9 object-cover border-2 border-white -ml-4' alt='This is avatar image' />
                    <p className='font-Josefin text lg:pl-3 text-sm lg:text-lg font-medium'>500+ people already trusted us. <Link href={'/courses'} className='colorText'>View courses</Link></p>
                </div>
                <br />
            </div>
        </div>
    );
};

export default Hero;