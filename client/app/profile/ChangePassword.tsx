"use client"
import { useUpdatePasswordMutation } from '@/redux/features/user/userApi';
import { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface Props { }

const ChangePassword: FC<Props> = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [changePassword, { isSuccess, error }] = useUpdatePasswordMutation()

    const passwordChangeHandler = async (e: any) => {
        e.preventDefault();
        if (oldPassword === newPassword || oldPassword === confirmNewPassword) {
            toast.error("Your old password and new Password are similar!")
        } else if (newPassword !== confirmNewPassword) {
            toast.error("Your new password and confirm new Password are not similar!")
        }
        await changePassword({ oldPassword, newPassword });
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success("Password changes successfully!");
            setOldPassword("");
            setNewPassword("")
            setConfirmNewPassword("")
        }
        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData.data.message);
            }
        }
    }, [error, isSuccess]);

    return (
        <div className='w-full pl-7 lg:pl-0 px-2 lg:px-5'>
            <h1 className='block text-black dark:text-white text-2xl lg:text-3xl text-center font-medium font-poppins'>Change Password</h1>
            <form onSubmit={passwordChangeHandler} className='w-full lg:w-2/3 flex flex-col items-center space-y-1 lg:space-y-4 mx-auto pb-4 pt-4 text-black dark:text-white'>
                <div className='w-full '>
                    <label htmlFor="oldPassword" className='block'>Enter your Old password</label>
                    <input type="text" id='oldPassword' required value={oldPassword} onChange={e => setOldPassword(e.target.value)} placeholder='Enter your Old password' className='w-full h-10 border border-[#37a39a] rounded px-1 lg:px-3 bg-transparent' />
                </div>
                <div className='w-full'>
                    <label htmlFor="newPassword" className='block'>Enter your New Password</label>
                    <input type="text" id='newPassword' required value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder='Enter your New Password' className='w-full h-10 border border-[#37a39a] rounded px-1 lg:px-3 bg-transparent' />
                </div>
                <div className='w-full'>
                    <label htmlFor="confirmNewPassword" className='block'>Enter your Confirm New Password</label>
                    <input type="text" id='confirmNewPassword' required value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)} placeholder='Enter your Confirm New Password' className='w-full h-10 border border-[#37a39a] rounded px-1 lg:px-3 bg-transparent' />
                </div>
                <input type="submit" value="Update" className='w-full h-10 border border-[#37a39a] text-center rounded cursor-pointer' />
            </form>
        </div>
    );
};

export default ChangePassword;