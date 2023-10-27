import { FC } from 'react';

interface Props { }

const Hero: FC<Props> = () => {
    return (
        <div className='w-full 1000px:flex items-center'>
            <div className='absolute top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1100px:h-[600px]  1100px:w-[600px] h-[50vh] hero_animation '>
                <div className='1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-0 z-10'>

                </div>
                <div className='1000px:w-[60%] flex flex-col text-center items-center mt-[150px] 1000px:text-left'>

                </div>
            </div>
        </div>
    );
};

export default Hero;