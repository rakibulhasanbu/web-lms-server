import { FC } from 'react';

interface Props { }

const Loader: FC<Props> = () => {
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='loader'></div>
        </div>
    );
};

export default Loader;