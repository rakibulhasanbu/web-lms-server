'use client'

import { useFormik } from 'formik';
import { FC, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { AiFillGithub, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useRegisterMutation } from '@/redux/features/auth/authApi';
import toast from 'react-hot-toast';

interface Props {
    setRoute: (route: string) => void;
}

const schema = Yup.object().shape({
    name: Yup.string().required("Please enter your name!"),
    email: Yup.string().email("Invalid email syntax").required("Please enter your email"),
    password: Yup.string().required("Please enter your password").min(6)
})

const SignUp: FC<Props> = ({ setRoute }) => {
    const [show, setShow] = useState(false);
    const [register, { isSuccess, data, error }] = useRegisterMutation()

    useEffect(() => {
        if (isSuccess) {
            const message = data?.message || "Registration successful";
            toast.success(message);
            setRoute('verification');
        }
        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData?.data?.message)
            }
        }
    }, [data?.message, error, isSuccess, setRoute]);

    const formik = useFormik({
        initialValues: { name: "", email: "", password: "" },
        validationSchema: schema,
        onSubmit: async ({ name, email, password }) => {
            const data = { name, email, password };
            await register(data)
        }
    })

    const { handleSubmit, values, handleChange, errors, touched } = formik;
    return (
        <div className='w-full select-none'>
            <h1 className='title'>Join to web lms</h1>
            <form onSubmit={handleSubmit}>
                <div className='w-full mt-4 mb-1'>
                    <label htmlFor="name" className='label'>Enter your name</label>
                    <input type="text" value={values.name} id='name' placeholder='John Doe' onChange={handleChange} className={`input ${errors.name && touched.name && 'border-red-500'}`} />
                    {errors.name && touched.name && (
                        <span className='text-red-500 pt-1 block'>{errors.name}</span>
                    )}
                </div>

                <div className='w-full mt-4 mb-1'>
                    <label htmlFor="email" className='label'>Enter your email</label>
                    <input type="email" value={values.email} id='email' placeholder='loginemail@gmail.com' onChange={handleChange} className={`input ${errors.email && touched.email && 'border-red-500'}`} />
                    {errors.email && touched.email && (
                        <span className='text-red-500 pt-1 block'>{errors.email}</span>
                    )}
                </div>

                <div className='w-full relative mt-4 mb-1'>
                    <label htmlFor="password" className='label'>Enter your password</label>
                    <input type={show ? 'text' : 'password'} value={values.password} id='password' placeholder='password@!' onChange={handleChange} className={`input ${errors.password && touched.password && 'border-red-500'}`} />
                    {show ? (
                        <AiOutlineEye className={`absolute z-10 cursor-pointer text-xl right-2 top-9`} onClick={() => setShow(false)} />
                    ) : (
                        <AiOutlineEyeInvisible className={`absolute z-10 cursor-pointer right-2 top-9 text-xl`} onClick={() => setShow(true)} />
                    )}
                    {errors.password && touched.password && (
                        <span className='text-red-500 pt-1 block'>{errors.password}</span>
                    )}
                </div>

                <div className='w-full mt-4 mb-1'>
                    <input type="submit" value="Sign up" className='button' />
                </div>

                <p className='text font-poppins pt-4 text-center text-sm'>Or join with</p>
                <div className='text center gap-6 my-3 [&>*]:cursor-pointer text-3xl'>
                    <FcGoogle />
                    <AiFillGithub />
                </div>

                <p className='text font-poppins pt-3 text-center text-sm'>
                    Already have an account? <span className='text-primary pl-1 cursor-pointer' onClick={() => setRoute('login')}>Sign In</span>
                </p>
            </form>
        </div>
    );
};

export default SignUp;