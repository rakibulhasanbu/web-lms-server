'use client'
import { FC, useState, useRef } from 'react';
import { VscWorkspaceTrusted } from 'react-icons/vsc';

interface Props {
    setRoute: (route: string) => void;
}

interface VerifyNumber {
    "0": string;
    "1": string;
    "2": string;
    "3": string;
}

const Verification: FC<Props> = ({ setRoute }) => {
    const [invalidError, setInvalidError] = useState(false);

    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ]
    const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
        0: '',
        1: '',
        2: '',
        3: ''
    });
    const verificationHandler = async ({ }) => {
        setInvalidError(true)
    }

    const handleInputChange = (index: number, value: string) => {
        setInvalidError(false);
        const newVerifyNumber = { ...verifyNumber, [index]: value }
        setVerifyNumber(newVerifyNumber);

        if (value === "" && index > 0) {
            inputRefs[index - 1].current?.focus();
        } else if (value.length === 1 && index < 3) {
            inputRefs[index + 1].current?.focus();
        }
    }

    return (
        <div className=''>
            <h1 className='title'>Verify your account</h1>
            <div className='w-full center mt-2'>
                <div className='center text-4xl w-20 h-20 rounded-full bg-[#497DF2]'>
                    <VscWorkspaceTrusted />
                </div>
            </div>
            <div className='lg:w-10/12 pt-6 m-auto flex items-center justify-around'>
                {Object.keys(verifyNumber).map((key, index) => (
                    <input key={key} type="number" ref={inputRefs[index]} maxLength={1} value={verifyNumber[key as keyof VerifyNumber]} onChange={(e) => handleInputChange(index, e.target.value)} className={`w-12 h-12 bg-transparent border-2 rounded-lg center text text-lg font-semibold font-poppins outline-none text-center ${invalidError ? "shake border-red-500" : "dark:border-white border-[#0000004a]"}`} />
                ))}
            </div>
            <div className='w-full center pt-8'>
                <button className='button' onClick={verificationHandler}>Verify OTP</button>
            </div>
            <p className='text font-poppins pt-3 pb-2 text-center text-sm'>
                Go back to Sign in? <span className='text-primary pl-1 cursor-pointer' onClick={() => setRoute('login')}>Sign In</span>
            </p>
        </div>
    );
};

export default Verification;