'use client'
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import avatarDefault from '../../public/avatar.png';
import { IoMdCamera } from "react-icons/io";
import { useEditProfileMutation, useUpdateAvatarMutation } from '@/redux/features/user/userApi';
import { useLoadUserQuery } from '@/redux/features/api/appSlice';
import toast from 'react-hot-toast';

interface Props {
    avatar: string | null;
    user: any
}

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
    const [name, setName] = useState(user && user.name);
    const [loadUser, setLoadUser] = useState(false);
    const [updateAvatar, { error, isSuccess }] = useUpdateAvatarMutation();
    const [editProfile, { isSuccess: editProfileSuccess, error: editProfileError }] = useEditProfileMutation()
    const { } = useLoadUserQuery(undefined, { skip: loadUser ? false : true });

    const imageHandler = async (e: any) => {
        const fileReader = new FileReader();

        fileReader.onload = () => {
            if (fileReader.readyState === 2) {
                const avatar = fileReader.result
                updateAvatar(avatar)
            }
        }
        fileReader.readAsDataURL(e.target.files[0])
    }

    useEffect(() => {
        if (isSuccess) {
            setLoadUser(true)
        }
        if (error) {
            toast.error("error.data.message");
        }
        if (isSuccess) {
            toast.success("Profile image changes successfully!")
        }
    }, [error, isSuccess]);

    useEffect(() => {
        if (editProfileSuccess) {
            setLoadUser(true)
        }
        if (editProfileError) {
            toast.error("error.data.message");
        }
        if (editProfileSuccess) {
            toast.success("Name changes successfully!")
        }
    }, [editProfileSuccess, editProfileError]);

    const submitHandler = async (e: any) => {
        e.preventDefault()
        if (name !== "") {
            await editProfile({ name, email: user?.email })
        }
    }

    return (
        <>
            <div className='w-full flex justify-center'>
                <div className='relative'>
                    <Image src={user.avatar || avatar ? user.avatar.url || avatar : avatarDefault} alt="avatar image" width={128} height={128} className='w-12 h-12 lg:w-32 lg:h-32 border-2 border-green-400 rounded-full' />
                    <input type="file" name='' className='hidden' id='avatar' onChange={imageHandler} accept='image/png,image/jpg,image/jpeg,image/webp' />
                    <label htmlFor='avatar'>
                        <div className='w-7 h-7 bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer'>
                            <IoMdCamera size={20} className="z-10" />
                        </div>
                    </label>
                </div>
            </div>
            <form onSubmit={submitHandler} className='w-1/2 space-y-1 lg:space-y-4 mx-auto block pb-4'>
                <div className='w-full'>
                    <label htmlFor="name" className='block'>Full Name</label>
                    <input type="text" id='name' required value={name} onChange={e => setName(e.target.value)} className='w-full h-10 border border-[#37a39a] dark:text-white text-black rounded px-1 lg:px-3 bg-transparent' />
                </div>
                <div className='w-full'>
                    <label htmlFor="email" className='block'>Email</label>
                    <input type="text" id='email' readOnly value={user?.email} className='w-full h-10 border border-[#37a39a] dark:text-white text-black rounded px-1 lg:px-3 bg-transparent' />
                </div>
                <input type="submit" required value="Update" className='w-full h-10 border border-[#37a39a] text-center dark:text-white text-black rounded cursor-pointer' />
            </form>
        </>
    );
};

export default ProfileInfo;