"use client"

import React, { FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Home/Hero";

interface Props { }

const Page: FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState('login');

  return (
    <>
      <Heading
        title="Web lms"
        description="web lms is a platform where students can learn important things"
        keywords="machine learning ,programming, MERN"
      />
      <Header open={open} setOpen={setOpen} activeItem={activeItem} route={route} setRoute={setRoute} />
      <Hero />
    </>
  );
};

export default Page;