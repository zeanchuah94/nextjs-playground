'use client';
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import React from "react";


export default function LandingPage() {
    const [open, setOpen] = React.useState(1);
 
    const handleOpen = (value:number) => setOpen(open === value ? 0 : value);
 
    return (
    <main className="h-screen font-mono bg-white dark:bg-gray-800">
        <header className="sticky top-0 z-30 flex items-center w-full h-10 sm:h-20 bg-gray-300">
            <div className="container flex items-center justify-between px-6 mx-auto">
                <div className="flex items-center text-3xl font-black text-gray-800 uppercase dark:text-white">
                    <span className="mt-1 ml-3 text-xs">
                        CHARLIE-PRO@DESIGN.COM
                    </span>
                </div>
                <div className="flex items-center">
                    <nav className="items-center hidden text-lg text-gray-800 uppercase font-sen dark:text-white lg:flex">
                        <a href="#" className="flex px-6 py-2 hover:text-black">
                            A
                        </a>
                        <a href="#" className="flex px-6 py-2 hover:text-black">
                            B
                        </a>
                        <a href="#" className="flex px-6 py-2 hover:text-black">
                            C
                        </a>
                        <a href="#" className="flex px-6 py-2 hover:text-black">
                            D
                        </a>
                    </nav>
                    <button className="flex flex-col ml-4 lg:hidden">
                        <span className="w-6 h-1 mb-1 bg-gray-800 dark:bg-white">
                        </span>
                        <span className="w-6 h-1 mb-1 bg-gray-800 dark:bg-white">
                        </span>
                        <span className="w-6 h-1 mb-1 bg-gray-800 dark:bg-white">
                        </span>
                    </button>
                </div>
            </div>
        </header>
        <div className="z-20 flex items-center">
            <div className="container flex flex-col items-center justify-between px-6 py-4 mx-auto">
                <div className="flex flex-col">
                    {/* <img src="null" className="mx-auto rounded-full w-28"/> */}
                    <p className="my-6 text-xl dark:text-white">
                        テストテスト
                    </p>
                    <h2 className="max-w-3xl py-2 mx-auto text-2xl font-bold text-gray-800 md:text-6xl dark:text-white">
                        Building digital products, brands, and experiences.
                    </h2>
                    <div className="flex items-center justify-center mt-4">
                        <a href="#" className="px-4 py-2 my-2 text-gray-800 uppercase bg-transparent border-2 border-gray-800 md:mt-16 dark:text-gray-800 dark:bg-white hover:dark:bg-gray-100  hover:bg-gray-800 hover:text-white text-md rounded-lg">
                            ボタンだよ
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div className="z-20 flex items-center bg-gray-700">
            <div className="container flex flex-col items-center justify-between px-6 py-4 mx-auto">
                <Accordion open={open === 1}>
                    <AccordionHeader onClick={() => handleOpen(1)}>What is Material Tailwind?</AccordionHeader>
                    <AccordionBody className="text-white">
                    We&apos;re not always in the position that we want to be at. We&apos;re constantly
                    growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
                    ourselves and actualize our dreams.
                    </AccordionBody>
                </Accordion>
                <Accordion open={open === 2}>
                    <AccordionHeader onClick={() => handleOpen(2)}>
                    How to use Material Tailwind?
                    </AccordionHeader>
                    <AccordionBody className="text-white">
                    We&apos;re not always in the position that we want to be at. We&apos;re constantly
                    growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
                    ourselves and actualize our dreams.
                    </AccordionBody>
                </Accordion>
                <Accordion open={open === 3}>
                    <AccordionHeader onClick={() => handleOpen(3)}>
                    What can I do with Material Tailwind?
                    </AccordionHeader>
                    <AccordionBody className="text-white">
                    We&apos;re not always in the position that we want to be at. We&apos;re constantly
                    growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
                    ourselves and actualize our dreams.
                    </AccordionBody>
                </Accordion>
            </div>
        </div>
        <div className="z-20 flex items-center bg-gray-600">
            <div className="container flex flex-col items-center justify-between px-6 py-4 mx-auto">
                <div className="flex flex-col">
                    <img src="https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" className="mx-auto rounded-full w-30 h-30"/>
                    <p className="my-6 text-xl text-center dark:text-white">
                        テストテスト
                    </p>
                    <h2 className="max-w-3xl py-2 mx-auto text-2xl font-bold text-gray-800 md:text-6xl dark:text-white">
                        Building digital products, brands, and experiences.
                    </h2>
                    <div className="flex items-center justify-center mt-4">
                        <a href="#" className="px-4 py-2 my-2 text-gray-800 uppercase bg-transparent border-2 border-gray-800 md:mt-16 dark:text-gray-800 dark:bg-white hover:dark:bg-gray-100  hover:bg-gray-800 hover:text-white text-md rounded-lg">
                            ボタンだよ
                        </a>
                    </div>
                </div>
            </div>
        </div>
        
        <div className="z-20 flex items-center bg-gray-400">
            <div className="container flex flex-col items-center justify-between px-6 py-4 mx-auto">
                <div className="flex flex-col">
                    {/* <img src="null" className="mx-auto rounded-full w-28"/> */}
                    <p className="my-6 text-xl dark:text-white">
                        テストテスト
                    </p>
                    <h2 className="max-w-3xl py-2 mx-auto text-2xl font-bold text-gray-800 md:text-6xl dark:text-white">
                        Building digital products, brands, and experiences.
                    </h2>
                    <div className="flex items-center justify-center mt-4">
                        <button className=" @apply px-4 py-2 bg-blue-500 text-white rounded-lg transition-colors duration-300 ease-in-out hover:bg-blue-600">ホバーボタンです</button>
                    </div>
                </div>
            </div>
        </div>
    </main>
);
}
