'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Tab, TabPanel, TabList, Tabs } from "react-tabs";

function Principal() {
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <>
            <section className=" md:pb-14 h-screen flex flex-col pt-20 pb-10">
                <div className="mx-auto px-3 max-w-[1202px] flex flex-col flex-grow">
                    <h1 className="text-2xl md:text-4xl font-bold text-center mb-4 text-green-700">
                        Bienvenido al Método de Estudio Ponte 100
                    </h1>
                    <div className="flex-grow">
                        <iframe
                            src="https://prezi.com/p/embed/6UefTmliEF1AX0i9Wx6U/"
                            id="iframe_container"
                            allow="autoplay; fullscreen"
                            className="w-full h-full"
                        ></iframe>
                    </div>
                </div>
            </section>

        </>
    )
}

export default function Main() {
    return (
        <>
            <Principal />
        </>
    )
}