import Image from 'next/image';
import { FC } from 'react';
import { BiSearch } from 'react-icons/bi';

interface Props { }

const Hero: FC<Props> = () => {
    return (
        <div className='w-full 1000px:flex items-center'>
            <div className='absolute top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1100px:h-[600px]  1100px:w-[600px] h-[50vh] hero_animation '>
                <div className='1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-0 z-10'>
                    <Image src={require("../../../public/assets/development.png")} alt='This is hero image' className='object-contain w-[90%] 1100px:max-w-[90%] 1500px:max-w-[85%] h-auto z-10' />
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
                    <div className=''>
                        <input type="search" placeholder='Search course....' className='bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-white rounded-md p-2 w-full h-full outline-none ' />
                        <div className='center '>
                            <BiSearch className="text-white" size={30} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Hero;