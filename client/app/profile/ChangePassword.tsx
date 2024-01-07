"use client"
import { FC, useState } from 'react';

interface Props { }

const ChangePassword: FC<Props> = () => {
    const [newPassword, setNewPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const passwordChangeHandler = (e: any) => {
        e.preventDefault();
        console.log(oldPassword, newPassword);
    }

    return (
        <div className='w-full pl-7 lg:pl-0 px-2 lg:px-5'>
            <h1 className='block text-black dark:text-white text-2xl lg:text-3xl text-center font-medium font-poppins'>Change Password</h1>
            <form onSubmit={passwordChangeHandler} className='w-full lg:w-2/3 flex flex-col items-center space-y-1 lg:space-y-4 mx-auto pb-4 pt-4'>
                <div className='w-full'>
                    <label htmlFor="oldPassword" className='block'>Old password</label>
                    <input type="text" id='oldPassword' required value={oldPassword} onChange={e => setOldPassword(e.target.value)} className='w-full h-10 border border-[#37a39a] dark:text-white text-black rounded px-1 lg:px-3 bg-transparent' />
                </div>
                <div className='w-full'>
                    <label htmlFor="newPassword" className='block'>New Password</label>
                    <input type="text" id='newPassword' value={newPassword} onChange={e => setNewPassword(e.target.value)} className='w-full h-10 border border-[#37a39a] dark:text-white text-black rounded px-1 lg:px-3 bg-transparent' />
                </div>
                <input type="submit" required value="Update" className='w-full h-10 border border-[#37a39a] text-center dark:text-white text-black rounded cursor-pointer' />
            </form>
        </div>
    );
};

export default ChangePassword;