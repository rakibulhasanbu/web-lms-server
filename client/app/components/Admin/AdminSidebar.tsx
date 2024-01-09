'use client'
import { FC, useEffect } from 'react';
import { useState } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import avatarDefault from '../../../public/avatar.png';
import { MdArrowBackIosNew, MdLiveTv, MdOutlineArrowForwardIos, MdOutlineCategory, MdVideoCameraFront } from 'react-icons/md';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { LiaFileInvoiceSolid } from "react-icons/lia";
import "react-pro-sidebar/dist/css/styles.css";
import { IoIosPeople, IoMdPeople } from 'react-icons/io';
import Link from 'next/link';
import { AiTwotoneHome } from 'react-icons/ai';
import { TbHelicopterLanding } from "react-icons/tb";
import { BsQuestionDiamondFill } from "react-icons/bs";
import { IoStatsChart } from "react-icons/io5";

interface TProps { }

interface TAdminSidebar {
    title: string;
    to: string;
    icon: JSX.Element;
    selected: string;
    setSelected: any;
}

const Item = ({ title, to, icon, selected, setSelected }: TAdminSidebar) => {
    return (
        <MenuItem
            active={selected === title}
            onClick={() => setSelected(title)}
            icon={icon}
            className='bg-white dark:bg-[#111C43] !important'
        >
            <Typography className='!text-base !font-poppins'>{title}</Typography>
            <Link href={to} />
        </MenuItem>
    );
};

const AdminSidebar: FC<TProps> = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [logout, setLogout] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    const { theme } = useTheme() as { theme: string };
    const { user } = useSelector((state: any) => state.auth);

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return null;
    }
    const logOutHandler = () => {
        setLogout(true)
    }
    return (
        <Box
            className='bg-white dark:bg-[#111C43] !important'
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${theme === "dark" ? "#111C43" : "#fff"} !important`,
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                },
                "& .pro-inner-item:hover": {
                    color: "#868dfb !important",
                },
                "& .pro-menu-item.active": {
                    color: "#6870fa !important",
                },
            }}
        >
            <ProSidebar
                collapsed={isCollapsed}
                style={{
                    position: "fixed",
                    top: "0",
                    left: "0",
                    width: isCollapsed ? "0%" : "16%"
                }}
                className='bg-white dark:bg-[#111C43] !important'>
                <Menu iconShape="square">
                    {/* LOGO AND MENU ICON */}
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MdOutlineArrowForwardIos /> : undefined}
                        style={{
                            margin: "10px 0 20px 0"
                        }}
                        className='bg-white dark:bg-[#111C43] !important'
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                                className='bg-white dark:bg-[#111C43] !important'
                            >
                                <Typography variant="h3">
                                    ADMIN
                                </Typography>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MdArrowBackIosNew />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {!isCollapsed && (
                        <Box mb="25px" className='bg-white dark:bg-[#111C43] !important'>
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <Image src={user.avatar ? user.avatar.url : avatarDefault} alt="avatar image" width={128} height={128} className='w-12 h-12 lg:w-28 lg:h-28 border-2 border-green-400 rounded-full' />
                            </Box>
                            <Box textAlign="center">
                                <Typography
                                    variant="h2"
                                    fontWeight="bold"
                                    sx={{ m: "10px 0 0 0" }}
                                >
                                    {user?.name}
                                </Typography>
                                <Typography variant="h5">
                                    - Admin
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    <Box paddingLeft={isCollapsed ? undefined : "10%"} className='bg-white dark:bg-[#111C43] !important'>
                        <Item
                            title="Dashboard"
                            to="/"
                            icon={<AiTwotoneHome />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography
                            variant="h6"
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            Data
                        </Typography>
                        <Item
                            title="Users"
                            to="/users"
                            icon={<IoIosPeople />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Invoices"
                            to="/invoices"
                            icon={<LiaFileInvoiceSolid />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography
                            variant="h6"
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            Content
                        </Typography>
                        <Item
                            title="Create Course"
                            to="/create-course"
                            icon={<MdVideoCameraFront />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Live Courses"
                            to="/live-courses"
                            icon={<MdLiveTv />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Typography
                            variant="h6"
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            Customization
                        </Typography>
                        <Item
                            title="Hero"
                            to="/customize-hero"
                            icon={<TbHelicopterLanding />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="FAQ"
                            to="/faq"
                            icon={<BsQuestionDiamondFill />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Categories"
                            to="/categories"
                            icon={<MdOutlineCategory />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Typography
                            variant="h6"
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            Controllers
                        </Typography>
                        <Item
                            title="Manage Team"
                            to="/manage-team"
                            icon={<IoMdPeople />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Typography
                            variant="h6"
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            Analysis
                        </Typography>
                        <Item
                            title="Course analysis"
                            to="/course-analysis"
                            icon={<IoStatsChart />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default AdminSidebar;