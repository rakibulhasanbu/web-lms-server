'use client'

import { Josefin_Sans, Poppins } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './utils/ThemeProvider';
import { Toaster } from 'react-hot-toast';
import { Providers } from './Providers';
import { SessionProvider } from 'next-auth/react';
import { FC, ReactNode } from 'react';
import { useLoadUserQuery } from '@/redux/features/api/appSlice';
import Loader from './components/Loader';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font--Poppins"
})

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font--Josefin"
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${josefin.variable} !bg-white bg-no-repeat dark_gradient duration-300 `}>
        <Providers>
          <SessionProvider>
            <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
              <Custom>{children}</Custom>
              <Toaster reverseOrder={false} position='top-right' />
            </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  )
}


const Custom: FC<{ children: ReactNode }> = ({ children }) => {
  const { isLoading } = useLoadUserQuery({});

  return (
    <>
      {isLoading ? <Loader /> : <>{children}</>}
    </>
  );
};