'use client'
import { useRef, useState } from "react";

function Content() {
    return (
        <section className="py-16">
            <div className="mx-auto px-3 max-w-[1202px]">
                <ul className="breadcrumb mb-8 inline-flex h-8 items-center justify-center space-x-2 rounded-3xl bg-theme-light px-4 py-2 lg:hidden">
                    <li className="leading-none text-dark">
                        <a className="inline-flex items-center  text-center align-middle text-primary" href="#">
                            <svg className="mr-1.5" width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.1769 15.0588H10.3533V9.41178H5.64744V15.0588H2.82391V6.58825H1.88274V16H14.118V6.58825H13.1769V15.0588ZM6.58862 15.0588V10.353H9.41215V15.0588H6.58862ZM15.8084 6.09225L15.2512 6.85178L8.00038 1.52472L0.749559 6.8499L0.192383 6.09131L8.00038 0.357666L15.8084 6.09225Z" fill="black"></path>
                            </svg>
                            <span className="text-sm leading-none text-orange-600 font-medium">Home</span>
                        </a>
                    </li>
                    <li className="leading-none text-dark">
                        <span className="text-sm leading-none">/ Contact</span>
                    </li>
                </ul>
                <div className="flex flex-wrap ">
                    <div className="lg:w-1/2 lg:order-2">
                        <img className="mx-auto" src="assets/features-banner-img.png" width="412" height="483" alt="" />
                    </div>
                    <div className="mt-10 lg:w-1/2 lg:order-1 lg:mt-0">
                        <ul className="breadcrumb mb-8 hidden h-8 items-center justify-center space-x-2 rounded-3xl bg-theme-light px-4 py-2 lg:inline-flex">
                            <li className="leading-none text-dark">
                                <a className="inline-flex items-center text-center align-middle text-primary" href="#">
                                    <svg className="mr-1.5" width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.1769 15.0588H10.3533V9.41178H5.64744V15.0588H2.82391V6.58825H1.88274V16H14.118V6.58825H13.1769V15.0588ZM6.58862 15.0588V10.353H9.41215V15.0588H6.58862ZM15.8084 6.09225L15.2512 6.85178L8.00038 1.52472L0.749559 6.8499L0.192383 6.09131L8.00038 0.357666L15.8084 6.09225Z" fill="black"></path>
                                    </svg>
                                    <span className="text-sm leading-none text-orange-600 font-medium">Home</span>
                                </a>
                            </li>
                            <li className="leading-none text-dark">
                                <span className="text-sm leading-none">/ Contact</span>
                            </li>
                        </ul>
                        <h1 className="font-serif text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
                            Connects with all your other tools to create a smooth experience.
                        </h1>
                        <p className="mt-6 text-base text-gray-500">
                            Donec sollicitudin molestie malesda. Donec sollitudin molestie
                            malesuada. Mauris pellentesque nec, egestas non nisi. Cras ultricies
                            ligula sed magna dictum porta. Lorem
                        </p>
                        <a className="mt-6 inline-block h-[52px] px-8 py-2 text-sm cursor-pointer rounded-[50px] text-center font-medium text-white bg-gradient-to-t from-[#fee140] to-[#fa709a] my-4 leading-9 sm:inline-block" href="#">Download The Theme</a>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ContentSecondary() {

    return (
        <section className="pt-16 features pb-0">
            <div className="mx-auto px-3 max-w-[1202px]">
                <div className="flex flex-wrap">
                    <div className="mx-auto text-center lg:col-7">
                        <h2 className="text-4xl font-serif font-bold leading-tight text-gray-900">
                            Build collaborative workspaces <br />
                            for your team
                        </h2>
                        <p className="mt-4 text-gray-500">
                            Donec sollicitudin molestie malesda. Donec sollitudin molestie
                            malesuada. <br />
                            Mauris pellentesque nec, egestas non nisi. Cras ultricies .
                        </p>
                    </div>
                </div>

                <div className="mt-14 rounded-xl bg-white px-6 py-10 shadow-lg lg:px-12 lg:py-16">
                    <div className="flex flex-wrap">
                        <div className="lg:w-1/2 px-4">
                            <div className="h-full rounded-lg bg-[#FAFAFA] p-6 lg:p-8">
                                <h3 className="text-xl mb-8 font-bold leading-tight text-gray-900 px-2">Project Management</h3>
                                <div className="flex flex-wrap">
                                    <div className="w-1/2 mb-6 px-4">
                                        <div className="flex flex-col items-center justify-center rounded-xl bg-white p-5 shadow-sm">
                                            <img src="assets/avatar-1.png" alt="" />
                                            <svg className="mt-2.5" width="112" height="25" viewBox="0 0 112 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="16" width="80" height="10" rx="5" fill="#ECECEC"></rect>
                                                <rect y="18" width="112" height="7" rx="3.5" fill="#ECECEC"></rect>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="w-1/2 mb-6 px-4">
                                        <div className="flex flex-col items-center justify-center rounded-xl bg-white p-5 shadow-sm">
                                            <img src="assets/avatar-2.png" alt="" />
                                            <svg className="mt-2.5" width="112" height="25" viewBox="0 0 112 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="16" width="80" height="10" rx="5" fill="#ECECEC"></rect>
                                                <rect y="18" width="112" height="7" rx="3.5" fill="#ECECEC"></rect>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="w-1/2 mb-6 px-4">
                                        <div className="flex flex-col items-center justify-center rounded-xl bg-white p-5 shadow-sm">
                                            <img src="assets/avatar-3.png" alt="" />
                                            <svg className="mt-2.5" width="112" height="25" viewBox="0 0 112 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="16" width="80" height="10" rx="5" fill="#ECECEC"></rect>
                                                <rect y="18" width="112" height="7" rx="3.5" fill="#ECECEC"></rect>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="w-1/2 mb-6 px-4">
                                        <div className="flex flex-col items-center justify-center rounded-xl bg-white p-5 shadow-sm">
                                            <img src="assets/avatar-4.png" alt="" />
                                            <svg className="mt-2.5" width="112" height="25" viewBox="0 0 112 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="16" width="80" height="10" rx="5" fill="#ECECEC"></rect>
                                                <rect y="18" width="112" height="7" rx="3.5" fill="#ECECEC"></rect>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <a className="h-[52px] px-8 py-2 text-sm leading-9 cursor-pointer rounded-[50px] text-center text-white bg-gradient-to-t from-[#fee140] to-[#fa709a] block w-full font-bold capitalize" href="#">view all tasks</a>
                            </div>
                        </div>
                        <div className="mt-10 lg:w-1/2 px-4 lg:mt-0">
                            <div className="mb-6 flex items-center space-x-4 rounded-lg bg-[#fafafa] px-6 py-8">
                                <div className="relative inline-flex h-24 w-24 items-center justify-center p-3">
                                    <img src="assets/icons/feature-icon-1.svg" alt="" />
                                    <svg className="absolute left-0 top-0 h-full w-full" width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path opacity="0.1" fillRule="evenodd" clip-rule="evenodd" d="M42.8833 0.00928958C63.2143 -0.38584 82.2759 11.853 88.3264 31.1979C94.1797 49.9121 84.027 68.9907 68.0244 80.3913C52.4387 91.4948 31.5679 93.9094 16.0849 82.6642C0.66775 71.4667 -3.27813 50.9537 2.58684 32.8642C8.48561 14.6704 23.699 0.382132 42.8833 0.00928958Z" fill="#FFCC99"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold leading-tight text-gray-900 font-primary">Boost engagement</h3>
                                    <p className="mt-4 text-gray-500">
                                        Encourage frequent &amp; timely recognition integrating with
                                        communication tools
                                    </p>
                                </div>
                            </div>
                            <div className="mb-6 flex items-center space-x-4 rounded-lg bg-[#fafafa] px-6 py-8">
                                <div className="relative inline-flex h-24 w-24 items-center justify-center p-3">
                                    <img src="assets/icons/feature-icon-8.svg" alt="" />
                                    <svg className="absolute left-0 top-0 h-full w-full" width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path opacity="0.1" fillRule="evenodd" clip-rule="evenodd" d="M42.8833 0.00928958C63.2143 -0.38584 82.2759 11.853 88.3264 31.1979C94.1797 49.9121 84.027 68.9907 68.0244 80.3913C52.4387 91.4948 31.5679 93.9094 16.0849 82.6642C0.66775 71.4667 -3.27813 50.9537 2.58684 32.8642C8.48561 14.6704 23.699 0.382132 42.8833 0.00928958Z" fill="#FFCC99"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold leading-tight text-gray-900 font-primary">Reduce friction</h3>
                                    <p className="mt-4 text-gray-500">
                                        Encourage frequent &amp; timely recognition integrating with
                                        communication tools
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 rounded-lg bg-[#fafafa] px-6 py-8">
                                <div className="relative inline-flex h-24 w-24 items-center justify-center p-3">
                                    <img src="assets/icons/feature-icon-9.svg" alt="" />
                                    <svg className="absolute left-0 top-0 h-full w-full" width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path opacity="0.1" fillRule="evenodd" clip-rule="evenodd" d="M42.8833 0.00928958C63.2143 -0.38584 82.2759 11.853 88.3264 31.1979C94.1797 49.9121 84.027 68.9907 68.0244 80.3913C52.4387 91.4948 31.5679 93.9094 16.0849 82.6642C0.66775 71.4667 -3.27813 50.9537 2.58684 32.8642C8.48561 14.6704 23.699 0.382132 42.8833 0.00928958Z" fill="#FFCC99"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold leading-tight text-gray-900 font-primary">Discover strengths</h3>
                                    <p className="mt-4 text-gray-500">
                                        Encourage frequent &amp; timely recognition integrating with
                                        communication tools
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gx-5 mt-16 items-center">
                    <div className="lg:w-1/2 lg:order-2">
                        <div className="relative">
                            <img className="w-full object-contain" src="assets/features/feature-img-1.png" />
                        </div>
                    </div>
                    <div className="mt-6 lg:w-1/2 lg:order-1 lg:mt-0">
                        <div className="">
                            <h2 className="text-3xl font-bold text-gray-900 font-serif lg:text-4xl">
                                Accept payments from devices any country in this universe
                            </h2>
                            <p className="mt-4 text-gray-500">
                                Donec sollicitudin molestie malesda. Donec sollitudin molestie
                                malesuada. Mauris pellentesque nec, egestas non nisi. Cras ultricies
                                ligula sed
                            </p>
                            <ul className="mt-6 text-dark lg:-ml-4">
                                <li className="mb-2 flex items-center rounded px-4">
                                    <img className="mr-3" src="assets/icons/checkmark-circle.svg" alt="" />
                                    Supporting more than 119 country world
                                </li>
                                <li className="mb-2 flex items-center rounded px-4">
                                    <img className="mr-3" src="assets/icons/checkmark-circle.svg" alt="" />
                                    Open transaction with more than currencies
                                </li>
                                <li className="flex items-center rounded px-4">
                                    <img className="mr-3" src="assets/icons/checkmark-circle.svg" alt="" />
                                    Customer Service with 79 languages
                                </li>
                            </ul>
                            <div className="mt-11 flex flex-wrap">
                                <a className="mt-6 block h-[52px] px-8 py-2 text-sm cursor-pointer rounded-[50px] text-center font-medium text-white bg-gradient-to-t from-[#fee140] to-[#fa709a] my-4 leading-9 w-full sm:w-auto" href="#">Download The Theme</a>
                                <a className="mt-6 block h-[52px] px-8 py-2 text-sm cursor-pointer rounded-[50px] text-center border border-orange-400 bg-transparent  items-center text-gray-900 btn-outline-primary leading-9 m-3 w-full min-w-[160px] sm:w-auto" href="#">Learn more</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Questions() {
    return (
        <section className="faqs py-16">
            <div className="mx-auto px-3 max-w-[1230px]">
                <div className="flex flex-wrap">
                    <div className="text-center lg:w-[33.33%] lg:text-start px-2">
                        <h2 className="text-4xl text-gray-900 font-bold">Frequently Asked Questions</h2>
                        <p className="mt-6 lg:max-w-[404px] text-gray-500">
                            Vestibulum ante ipsum primis in faucibus orci luctus ultrices posuere
                            cubilia Curae Donec
                        </p>
                    </div>
                    <div className="mt-8 lg:w-[66.66%] lg:mt-0 px-2">
                        <div className="rounded-xl bg-white px-5 py-5 shadow-lg lg:px-10 lg:py-8">
                            <div className="bg-white border-b border-border">
                                <div className="flex justify-between items-center p-4 cursor-pointer relative pl-6 text-lg font-semibold text-dark" data-accordion="">
                                    How can I integrate Avocode to my current tool stack?
                                    <svg className="w-[0.78em] h-[0.78em] absolute left-0 top-[22px]" x="0px" y="0px" viewBox="0 0 512 512" xmlSpace="preserve">
                                        <path fill="currentColor" d="M505.755,123.592c-8.341-8.341-21.824-8.341-30.165,0L256.005,343.176L36.421,123.592c-8.341-8.341-21.824-8.341-30.165,0 s-8.341,21.824,0,30.165l234.667,234.667c4.16,4.16,9.621,6.251,15.083,6.251c5.462,0,10.923-2.091,15.083-6.251l234.667-234.667 C514.096,145.416,514.096,131.933,505.755,123.592z"></path>
                                    </svg>
                                </div>
                                <div className="max-h-0 overflow-hidden py-0 px-4 pl-6">
                                    <p>
                                        The Service is provided for free during this pilot project, and
                                        is provided "as is" with is not committed to any level of
                                        service or availability of the Service.
                                    </p>
                                    <p>
                                        If you enter into this agreement on behalf of a company, you
                                        hereby agree that the company is responsible under this
                                        Agreement for all actions and
                                    </p>
                                </div>
                            </div>
                            <div className="bg-white border-b border-border">
                                <div className="flex justify-between items-center p-4 cursor-pointer relative pl-6 text-lg font-semibold text-dark" data-accordion="">
                                    How can I use Avocode with cloud documents?
                                    <svg className="w-[0.78em] h-[0.78em] absolute left-0 top-[22px]" x="0px" y="0px" viewBox="0 0 512 512" xmlSpace="preserve">
                                        <path fill="currentColor" d="M505.755,123.592c-8.341-8.341-21.824-8.341-30.165,0L256.005,343.176L36.421,123.592c-8.341-8.341-21.824-8.341-30.165,0 s-8.341,21.824,0,30.165l234.667,234.667c4.16,4.16,9.621,6.251,15.083,6.251c5.462,0,10.923-2.091,15.083-6.251l234.667-234.667 C514.096,145.416,514.096,131.933,505.755,123.592z"></path>
                                    </svg>
                                </div>
                                <div className="max-h-0 overflow-hidden py-0 px-4 pl-6">
                                    <p>
                                        The Service is provided for free during this pilot project, and
                                        is provided "as is" with is not committed to any level of
                                        service or availability of the Service.
                                    </p>
                                    <p>
                                        If you enter into this agreement on behalf of a company, you
                                        hereby agree that the company is responsible under this
                                        Agreement for all actions and
                                    </p>
                                </div>
                            </div>
                            <div className="bg-white border-b border-border">
                                <div className="flex justify-between items-center p-4 cursor-pointer relative pl-6 text-lg font-semibold text-dark" data-accordion="">
                                    If I cancel, can I archive my designs to keep them safe come back?
                                    <svg className="w-[0.78em] h-[0.78em] absolute left-0 top-[22px]" x="0px" y="0px" viewBox="0 0 512 512" xmlSpace="preserve">
                                        <path fill="currentColor" d="M505.755,123.592c-8.341-8.341-21.824-8.341-30.165,0L256.005,343.176L36.421,123.592c-8.341-8.341-21.824-8.341-30.165,0 s-8.341,21.824,0,30.165l234.667,234.667c4.16,4.16,9.621,6.251,15.083,6.251c5.462,0,10.923-2.091,15.083-6.251l234.667-234.667 C514.096,145.416,514.096,131.933,505.755,123.592z"></path>
                                    </svg>
                                </div>
                                <div className="max-h-0 overflow-hidden py-0 px-4 pl-6">
                                    <p>
                                        The Service is provided for free during this pilot project, and
                                        is provided "as is" with is not committed to any level of
                                        service or availability of the Service.
                                    </p>
                                    <p>
                                        If you enter into this agreement on behalf of a company, you
                                        hereby agree that the company is responsible under this
                                        Agreement for all actions and
                                    </p>
                                </div>
                            </div>
                            <div className="bg-white">
                                <div className="flex justify-between items-center p-4 cursor-pointer relative pl-6 text-lg font-semibold text-dark" data-accordion="">
                                    How can I adjust user permissions &amp; admin provileges?
                                    <svg className="w-[0.78em] h-[0.78em] absolute left-0 top-[22px]" x="0px" y="0px" viewBox="0 0 512 512" xmlSpace="preserve">
                                        <path fill="currentColor" d="M505.755,123.592c-8.341-8.341-21.824-8.341-30.165,0L256.005,343.176L36.421,123.592c-8.341-8.341-21.824-8.341-30.165,0 s-8.341,21.824,0,30.165l234.667,234.667c4.16,4.16,9.621,6.251,15.083,6.251c5.462,0,10.923-2.091,15.083-6.251l234.667-234.667 C514.096,145.416,514.096,131.933,505.755,123.592z"></path>
                                    </svg>
                                </div>
                                <div className="max-h-0 overflow-hidden py-0 px-4 pl-6">
                                    <p>
                                        The Service is provided for free during this pilot project, and
                                        is provided "as is" with is not committed to any level of
                                        service or availability of the Service.
                                    </p>
                                    <p>
                                        If you enter into this agreement on behalf of a company, you
                                        hereby agree that the company is responsible under this
                                        Agreement for all actions and
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function questions() {
    return (
        <>
            <Content />

            <ContentSecondary />

            <Questions />
        </>
    );
}