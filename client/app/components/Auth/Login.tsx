'use client'

import { useFormik } from 'formik';
import { FC, useState } from 'react';
import * as Yup from 'yup';
import { AiFillGithub, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

interface Props {
    setRoute: (route: string) => void;
}

const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Please enter your email"),
    password: Yup.string().required("Please enter your password").min(6)
})

const Login: FC<Props> = ({ setRoute }) => {
    const [show, setShow] = useState(false);

    const formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: schema,
        onSubmit: async ({ email, password }) => {
            console.log(email, password);
        }
    })
    const { handleSubmit, values, handleChange, errors, touched } = formik;
    return (
        <div className='w-full select-none'>
            <h1 className='title'>Login with web lms</h1>
            <form onSubmit={handleSubmit}>
                <div className='w-full mt-5 mb-1'>
                    <label htmlFor="email" className='label'>Enter your email</label>
                    <input type="email" value={values.email} id='email' placeholder='loginemail@gmail.com' onChange={handleChange} className={`input ${errors.email && touched.email && 'border-red-500'}`} />
                    {errors.email && touched.email && (
                        <span className='text-red-500 pt-2 block'>{errors.email}</span>
                    )}
                </div>
                <div className='w-full relative mt-5 mb-1'>
                    <label htmlFor="password" className='label'>Enter your password</label>
                    <input type={show ? 'text' : 'password'} value={values.password} id='password' placeholder='password@!' onChange={handleChange} className={`input ${errors.password && touched.password && 'border-red-500'}`} />
                    {show ? (
                        <AiOutlineEye className='absolute z-10 cursor-pointer right-2 bottom-2 text-xl' onClick={() => setShow(false)} />
                    ) : (
                        <AiOutlineEyeInvisible className='absolute z-10 cursor-pointer right-2 bottom-2 text-xl' onClick={() => setShow(true)} />
                    )}
                    {errors.password && touched.password && (
                        <span className='text-red-500 pt-2 block'>{errors.password}</span>
                    )}
                </div>
                <div className='w-full mt-5 mb-1'>
                    <input type="submit" value="Login" className='button' />
                </div>
                <p className='text font-poppins pt-4 text-center text-sm'>Or join with</p>
                <div className='text center gap-6 my-3 [&>*]:cursor-pointer text-3xl'>
                    <FcGoogle />
                    <AiFillGithub />
                </div>
                <p className='text font-poppins pt-3 text-center text-sm'>
                    Not have any account? <span className='text-primary pl-1 cursor-pointer' onClick={() => setRoute('signUp')}>Sign Up</span>
                </p>
            </form>
        </div>
    );
};

export default Login;