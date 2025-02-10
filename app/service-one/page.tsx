'use client'
import { useRef, useState } from "react";

function CommomHero() {
    return (
        <>
            <section className="page-hero py-16">
                <div className="mx-auto px-3 max-w-[1202px]">
                    <div className="text-center">
                        <ul className="breadcrumb inline-flex h-8 items-center justify-center space-x-2 rounded-3xl bg-theme-light px-4 py-2">
                            <li className="leading-none text-dark border">
                                <a className="inline-flex items-center text-center align-middle text-primary" href="#">
                                    <svg className="mr-1.5 -mt-1" width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.1769 15.0588H10.3533V9.41178H5.64744V15.0588H2.82391V6.58825H1.88274V16H14.118V6.58825H13.1769V15.0588ZM6.58862 15.0588V10.353H9.41215V15.0588H6.58862ZM15.8084 6.09225L15.2512 6.85178L8.00038 1.52472L0.749559 6.8499L0.192383 6.09131L8.00038 0.357666L15.8084 6.09225Z" fill="black"></path>
                                    </svg>
                                    <span className="text-sm leading-none text-orange-600 font-medium">Home</span>
                                </a>
                            </li>
                            <li className="leading-none text-dark border">
                                <span className="text-sm leading-none">/ How It Works</span>
                            </li>
                        </ul>
                    </div>
                    <div className="page-hero-content mx-auto max-w-[768px] text-center">
                        <h1 className="mb-5 mt-8">Career In Pinwheel</h1>
                        <p>
                            Donec sollicitudin molestie malesda. Donec sollitudin molestie malesuada
                            Mauris pellentesque nec egestas non nisi Cras
                        </p>
                    </div>
                    <div className="mt-14 flex justify-center">
                        <div className="relative">
                            <img src="assets/services/services-one/career-hero-img-1.png" alt="" />
                            <img className="absolute -left-[8%] bottom-[12%] z-[-1] h-20 w-20 -rotate-90 lg:-left-8 lg:bottom-4 lg:h-[150px] lg:w-[150px]" src="assets/shape.svg" alt="" />
                        </div>
                        <div className="relative -ml-[10%] mt-[10%] lg:-ml-[6%] lg:mt-[6%]">
                            <img src="assets/services/services-one/career-hero-img-2.png" alt="" />
                            <img className="absolute -right-4 -bottom-4 z-[-1] h-16 w-16 -rotate-90" src="assets/shape.svg" alt="" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

function Content() {
    return (
        <section className="pt-16">
            <div className="mx-auto px-3 max-w-[1202px]">
                <div className="flex flex-wrap">
                    <div className="mx-auto text-center lg:w-[66.67%]">
                        <h2 className="text-4xl text-gray-900">Competitive salary</h2>
                        <p className="mt-4 text-gray-500">
                            Pellentesque in ipsum id orci porta dapibus. Lorem ipsum dolor amet,
                            consectetur adipiscing elit. Praesent sapien massa, convallis a
                            pellentesque
                        </p>
                    </div>
                </div>
                <div className="flex flex-wrap mt-14 text-center">
                    <div className="mb-10 sm:w-1/2 lg:w-[33.33%]">
                        <img className="mx-auto" src="assets/services/icon-1.png" width="100" height="90" alt="" />
                        <h3 className="h4 mt-8 mb-4">Competitive salary</h3>
                        <p>
                            Nulla porttitor acmsan tinci dunt. posuere cubilia Cudfrae Donec velit
                            neque, autor sit amet aliuam vel
                        </p>
                    </div>
                    <div className="mb-10 sm:w-1/2 lg:w-[33.33%]">
                        <img className="mx-auto" src="assets/services/icon-2.png" width="100" height="90" alt="" />
                        <h3 className="h4 mt-8 mb-4">100% remote</h3>
                        <p>
                            Nulla porttitor acmsan tinci dunt. posuere cubilia Cudfrae Donec velit
                            neque, autor sit amet aliuam vel
                        </p>
                    </div>
                    <div className="mb-10 sm:w-1/2 lg:w-[33.33%]">
                        <img className="mx-auto" src="assets/services/icon-3.png" width="100" height="90" alt="" />
                        <h3 className="h4 mt-8 mb-4">Unlimited PTO</h3>
                        <p>
                            Nulla porttitor acmsan tinci dunt. posuere cubilia Cudfrae Donec velit
                            neque, autor sit amet aliuam vel
                        </p>
                    </div>
                    <div className="mb-10 sm:w-1/2 lg:w-[33.33%]">
                        <img className="mx-auto" src="assets/services/icon-4.png" width="100" height="90" alt="" />
                        <h3 className="h4 mt-8 mb-4">Flexible hours</h3>
                        <p>
                            Nulla porttitor acmsan tinci dunt. posuere cubilia Cudfrae Donec velit
                            neque, autor sit amet aliuam vel
                        </p>
                    </div>
                    <div className="mb-10 sm:w-1/2 lg:w-[33.33%]">
                        <img className="mx-auto" src="assets/services/icon-5.png" width="100" height="90" alt="" />
                        <h3 className="h4 mt-8 mb-4">Medical insurance</h3>
                        <p>
                            Nulla porttitor acmsan tinci dunt. posuere cubilia Cudfrae Donec velit
                            neque, autor sit amet aliuam vel
                        </p>
                    </div>
                    <div className="mb-10 sm:w-1/2 lg:w-[33.33%]">
                        <img className="mx-auto" src="assets/services/icon-6.png" width="100" height="90" alt="" />
                        <h3 className="h4 mt-8 mb-4">Career growth</h3>
                        <p>
                            Nulla porttitor acmsan tinci dunt. posuere cubilia Cudfrae Donec velit
                            neque, autor sit amet aliuam vel
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Pictures(){
    const img1 = useRef<HTMLDivElement>(null);
    const img2 = useRef<HTMLDivElement>(null);
    const img3 = useRef<HTMLDivElement>(null);

    // Estado local para gestionar qué div mostrar
    const [divToShow, setDivToShow] = useState(1);

    // Función para manejar el clic en los botones
    const showDiv = (divNumber: number) => {
        setDivToShow(divNumber);
    }

    return (
        <section className="pt-0 features pb-0">
            <div className="mx-auto px-3 max-w-[1202px]">              

                <div className="flex flex-wrap mt-[120px] items-center" data-tab-group="features-tab">
                    <div className="w-[66.66%] mx-auto mb-10 text-center">
                        <h2 className="text-[2.25rem] font-bold leading-tight text-gray-900 font-serif">
                            Payment gateway for every stage <br />
                            of your business growth
                        </h2>
                    </div>
                    <div className="lg:w-1/2" data-tab-content="">
                        <div className={`block relative active ${divToShow == 1 ? 'block' : 'hidden' }`}>
                            <img className="w-full object-contain" src="assets/features/feature-img-2.png" />
                        </div>
                        <div className={`features-tab-penel relative ${divToShow == 2 ? 'block' : 'hidden' }`}>
                            <img className="w-full object-contain" src="assets/features/feature-img-1.png" />
                        </div>
                        <div className={`features-tab-penel relative ${divToShow == 3 ? 'block' : 'hidden' }`}>
                            <img className="w-full object-contain" src="assets/features/feature-img-2.png" />
                        </div>
                    </div>
                    <div className="mt-6 lg:w-1/2 lg:mt-0">
                        <div className="lg:max-w-[473px]" data-tab-nav="">
                            <div className="cursor-pointer border-l border-l-black pl-6" onClick={() => showDiv(1)} data-tab="0">
                                <h2 className={`lg:text-2xl font-bold ${divToShow == 1 ? 'text-gray-900' : 'text-gray-500'}`}>
                                    Transaction from Anyone with <br />
                                    a world to Anywhere
                                </h2>
                                <p className={`mt-4 text-gray-500 ${divToShow == 1 ? 'block' : 'hidden'}`}>
                                    Donec sollicitudin molestie malesda. Donec sollitudin molestie
                                    malesuada. Mauris pellentesque nec, egestas non nisi. Cras
                                    ultricies ligula sed
                                </p>
                            </div>
                            <div className="cursor-pointer border-l border-l-black pl-6 mt-9" onClick={() => showDiv(2)} data-tab="1">
                                <h2 className={`lg:text-2xl font-bold ${divToShow == 2 ? 'text-gray-900' : 'text-gray-500'}`}>
                                    Integrate Checkout with Process Smoothly
                                </h2>
                                <p className={`mt-4 text-gray-500 ${divToShow == 2 ? 'block' : 'hidden'}`}>
                                    Donec sollicitudin molestie malesda. Donec sollitudin molestie
                                    malesuada. Mauris pellentesque nec, egestas non nisi. Cras
                                    ultricies ligula sed
                                </p>
                            </div>
                            <div className="cursor-pointer border-l border-l-black pl-6 mt-9" onClick={() => showDiv(3)} data-tab="3">
                                <h2 className={`lg:text-2xl font-bold ${divToShow == 3 ? 'text-gray-900' : 'text-gray-500'}`}>Transaction Safely process and Securely</h2>
                                <p className={`mt-4 text-gray-500 ${divToShow == 3 ? 'block' : 'hidden'}`}>
                                    Donec sollicitudin molestie malesda. Donec sollitudin molestie
                                    malesuada. Mauris pellentesque nec, egestas non nisi. Cras
                                    ultricies ligula sed
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Flyer() {
    return (
        <section className="px-5 py-20 xl:py-[120px]">
            <div className="mx-auto px-3 max-w-[1202px] 2xl:max-w-[1536px] xl:max-w-[1280px] lg:max-w-[1024px] md:max-w-[768px] sm:max-w-[640px]">
                <div className="bg-gradient-to-t from-[#fee140] to-[#fa709a] flex flex-wrap mt-0 justify-center rounded-b-[80px] rounded-t-[20px] px-[30px] pb-[75px] pt-16">
                    <div className="lg:w-[91.67%]">
                        <div className="flex flex-wrap mt-0">
                            <div className="lg:w-[58.33%]">
                                <h2 className="text-3xl lg:text-5xl font-serif font-bold leading-tight text-white">Helping teams in the world with focus</h2>
                                <a className="inline-block h-[52px] border px-8 py-2 text-sm font-medium leading-9 min-w-[150px] rounded-[50px] border-white bg-white text-center mt-8" href="#">Download The Theme</a>
                            </div>
                            <div className="mt-8 lg:w-[41.67%] lg:mt-0">
                                <p className="text-white">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                                    egestas Werat viverra id et aliquet. vulputate egestas
                                    sollicitudin .
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function serviceOne() {
    return (
        <>
            <CommomHero />

            <Content />

            <Pictures />

            <Flyer />
        </>
    );
}