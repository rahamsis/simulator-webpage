import Link from "next/link";
import Image from "next/image";

function CommonHero() {
    return (
        <>
            <section className="page-hero py-16">
                <div className="mx-auto px-3 max-w-[1202px]">
                    <div className="text-center">
                        <ul className="breadcrumb inline-flex h-8 items-center justify-center space-x-2 rounded-3xl bg-theme-light px-4 py-2">
                            <li className="leading-none text-dark border">
                                <div className="inline-flex items-center text-center align-middle text-primary">
                                    <svg className="mr-1.5 -mt-1" width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.1769 15.0588H10.3533V9.41178H5.64744V15.0588H2.82391V6.58825H1.88274V16H14.118V6.58825H13.1769V15.0588ZM6.58862 15.0588V10.353H9.41215V15.0588H6.58862ZM15.8084 6.09225L15.2512 6.85178L8.00038 1.52472L0.749559 6.8499L0.192383 6.09131L8.00038 0.357666L15.8084 6.09225Z" fill="black"></path>
                                    </svg>
                                    <Link href="/" className="text-sm leading-none text-cyan-600 font-medium">Inicio</Link>
                                </div>
                            </li>
                            <li className="leading-none text-dark border">
                            <Link className="text-sm leading-none" href="/contactanos">/ Contactanos</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="page-hero-content mx-auto max-w-[768px] text-center leading-tight font-serif">
                        <h1 className="mb-5 mt-8 text-5xl font-bold">
                            Veamos un poco de <br />
                            nuestro trabajo.
                        </h1>
                    </div>
                </div>
            </section>
        </>

    );
}

function Content() {
    return (
        <section className="pb-16 pt-0">
            <div className="mx-auto px-3 max-w-[1202px]">
                <h2 className="h4 mb-4 text-[1.55rem] font-serif font-bold leading-tight text-gray-900 px-3">Publicaciones destacadas</h2>
                <div className="featured-posts flex flex-wrap">
                    <div className="mb-8 md:w-1/2 px-3">
                        <div className="lg:flex items-center relative h-full rounded-xl bg-white p-5">
                            <Image className="card-img" width="235" height="304" src="assets/posts/post1.png" alt="" />
                            <div className="pt-6 pb-5 pl-6">
                                <div className="relative left-0 top-0 right-10 z-[1] mb-6">
                                    <a className="inline-block h-8 rounded-3xl border border-cyan-600 bg-btn-featured-post text-cyan-600 px-[0.875rem] py-2 text-sm leading-1" href="#">Development</a>
                                </div>
                                <h3 className="h4 text-2xl mb-4 font-serif font-bold text-gray-900">
                                    <a href="blog-single.html">The Ultimate Guide to Google My Business</a>
                                </h3>
                                <p className="text-gray-500">
                                    Mauris blandit aliquet elit, eget tincidunt nibh dolor sit amet,
                                </p>
                                <div className="pt-0 pb-0 mt-6 flex space-x-4">
                                    <span className="inline-flex items-center text-xs text-[#666]">
                                        <svg className="mr-1.5" width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.5 2H11V0.375C11 0.16875 10.8313 0 10.625 0H9.375C9.16875 0 9 0.16875 9 0.375V2H5V0.375C5 0.16875 4.83125 0 4.625 0H3.375C3.16875 0 3 0.16875 3 0.375V2H1.5C0.671875 2 0 2.67188 0 3.5V14.5C0 15.3281 0.671875 16 1.5 16H12.5C13.3281 16 14 15.3281 14 14.5V3.5C14 2.67188 13.3281 2 12.5 2ZM12.3125 14.5H1.6875C1.58438 14.5 1.5 14.4156 1.5 14.3125V5H12.5V14.3125C12.5 14.4156 12.4156 14.5 12.3125 14.5Z" fill="#939393"></path>
                                        </svg>
                                        21st Sep,2020
                                    </span>
                                    <span className="inline-flex items-center text-xs text-[#666]">
                                        <svg className="mr-1.5" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.65217 0C3.42496 0 0 3.58065 0 8C0 12.4194 3.42496 16 7.65217 16C11.8794 16 15.3043 12.4194 15.3043 8C15.3043 3.58065 11.8794 0 7.65217 0ZM7.65217 14.4516C4.24264 14.4516 1.48107 11.5645 1.48107 8C1.48107 4.43548 4.24264 1.54839 7.65217 1.54839C11.0617 1.54839 13.8233 4.43548 13.8233 8C13.8233 11.5645 11.0617 14.4516 7.65217 14.4516ZM9.55905 11.0839L6.93941 9.09355C6.84376 9.01935 6.78822 8.90323 6.78822 8.78065V3.48387C6.78822 3.27097 6.95484 3.09677 7.15849 3.09677H8.14586C8.34951 3.09677 8.51613 3.27097 8.51613 3.48387V8.05484L10.5773 9.62258C10.7439 9.74839 10.7778 9.99032 10.6575 10.1645L10.0774 11C9.95708 11.171 9.72567 11.2097 9.55905 11.0839Z" fill="#939393"></path>
                                        </svg>
                                        10 Min To Read
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-8 md:w-1/2 px-3">
                        <div className="lg:flex items-center relative h-full rounded-xl bg-white p-5">
                            <Image className="card-img" width="235" height="304" src="assets/posts/post2.png" alt="" />
                            <div className="pt-6 pb-5 pl-6">
                                <div className="relative left-0 top-0 right-10 z-[1] mb-6">
                                    <a className="inline-block h-8 rounded-3xl border border-cyan-600 bg-btn-featured-post text-cyan-600 px-[0.875rem] py-2 text-sm leading-1" href="#">Development</a>
                                </div>
                                <h3 className="h4 text-2xl mb-4 font-serif font-bold text-gray-900">
                                    <a href="blog-single.html">
                                        The Ultimate Guide to Redirects Explained
                                    </a>
                                </h3>
                                <p className="text-gray-500">
                                    Mauris blandit aliquet elit, eget tincidunt nibh dolor sit amet,
                                </p>
                                <div className="pt-0 pb-0 mt-6 flex space-x-4">
                                    <span className="inline-flex items-center text-xs text-[#666]">
                                        <svg className="mr-1.5" width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.5 2H11V0.375C11 0.16875 10.8313 0 10.625 0H9.375C9.16875 0 9 0.16875 9 0.375V2H5V0.375C5 0.16875 4.83125 0 4.625 0H3.375C3.16875 0 3 0.16875 3 0.375V2H1.5C0.671875 2 0 2.67188 0 3.5V14.5C0 15.3281 0.671875 16 1.5 16H12.5C13.3281 16 14 15.3281 14 14.5V3.5C14 2.67188 13.3281 2 12.5 2ZM12.3125 14.5H1.6875C1.58438 14.5 1.5 14.4156 1.5 14.3125V5H12.5V14.3125C12.5 14.4156 12.4156 14.5 12.3125 14.5Z" fill="#939393"></path>
                                        </svg>
                                        21st Sep,2020
                                    </span>
                                    <span className="inline-flex items-center text-xs text-[#666]">
                                        <svg className="mr-1.5" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.65217 0C3.42496 0 0 3.58065 0 8C0 12.4194 3.42496 16 7.65217 16C11.8794 16 15.3043 12.4194 15.3043 8C15.3043 3.58065 11.8794 0 7.65217 0ZM7.65217 14.4516C4.24264 14.4516 1.48107 11.5645 1.48107 8C1.48107 4.43548 4.24264 1.54839 7.65217 1.54839C11.0617 1.54839 13.8233 4.43548 13.8233 8C13.8233 11.5645 11.0617 14.4516 7.65217 14.4516ZM9.55905 11.0839L6.93941 9.09355C6.84376 9.01935 6.78822 8.90323 6.78822 8.78065V3.48387C6.78822 3.27097 6.95484 3.09677 7.15849 3.09677H8.14586C8.34951 3.09677 8.51613 3.27097 8.51613 3.48387V8.05484L10.5773 9.62258C10.7439 9.74839 10.7778 9.99032 10.6575 10.1645L10.0774 11C9.95708 11.171 9.72567 11.2097 9.55905 11.0839Z" fill="#939393"></path>
                                        </svg>
                                        10 Min To Read
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-8 md:w-1/2 px-3">
                        <div className="lg:flex items-center relative h-full rounded-xl bg-white p-5">
                            <Image className="card-img" width="235" height="304" src="assets/posts/post3.png" alt="" />
                            <div className="pt-6 pb-5 pl-6">
                                <div className="relative left-0 top-0 right-10 z-[1] mb-6">
                                    <a className="inline-block h-8 rounded-3xl border border-cyan-600 bg-btn-featured-post text-cyan-600 px-[0.875rem] py-2 text-sm leading-1" href="#">Development</a>
                                </div>
                                <h3 className="h4 text-2xl mb-4 font-serif font-bold text-gray-900">
                                    <a href="blog-single.html">
                                        6 Product Launch theif Email Example
                                    </a>
                                </h3>
                                <p className="text-gray-500">
                                    Mauris blandit aliquet elit, eget tincidunt nibh dolor sit amet,
                                </p>
                                <div className="pt-0 pb-0 mt-6 flex space-x-4">
                                    <span className="inline-flex items-center text-xs text-[#666]">
                                        <svg className="mr-1.5" width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.5 2H11V0.375C11 0.16875 10.8313 0 10.625 0H9.375C9.16875 0 9 0.16875 9 0.375V2H5V0.375C5 0.16875 4.83125 0 4.625 0H3.375C3.16875 0 3 0.16875 3 0.375V2H1.5C0.671875 2 0 2.67188 0 3.5V14.5C0 15.3281 0.671875 16 1.5 16H12.5C13.3281 16 14 15.3281 14 14.5V3.5C14 2.67188 13.3281 2 12.5 2ZM12.3125 14.5H1.6875C1.58438 14.5 1.5 14.4156 1.5 14.3125V5H12.5V14.3125C12.5 14.4156 12.4156 14.5 12.3125 14.5Z" fill="#939393"></path>
                                        </svg>
                                        21st Sep,2020
                                    </span>
                                    <span className="inline-flex items-center text-xs text-[#666]">
                                        <svg className="mr-1.5" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.65217 0C3.42496 0 0 3.58065 0 8C0 12.4194 3.42496 16 7.65217 16C11.8794 16 15.3043 12.4194 15.3043 8C15.3043 3.58065 11.8794 0 7.65217 0ZM7.65217 14.4516C4.24264 14.4516 1.48107 11.5645 1.48107 8C1.48107 4.43548 4.24264 1.54839 7.65217 1.54839C11.0617 1.54839 13.8233 4.43548 13.8233 8C13.8233 11.5645 11.0617 14.4516 7.65217 14.4516ZM9.55905 11.0839L6.93941 9.09355C6.84376 9.01935 6.78822 8.90323 6.78822 8.78065V3.48387C6.78822 3.27097 6.95484 3.09677 7.15849 3.09677H8.14586C8.34951 3.09677 8.51613 3.27097 8.51613 3.48387V8.05484L10.5773 9.62258C10.7439 9.74839 10.7778 9.99032 10.6575 10.1645L10.0774 11C9.95708 11.171 9.72567 11.2097 9.55905 11.0839Z" fill="#939393"></path>
                                        </svg>
                                        10 Min To Read
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-8 md:w-1/2 px-3">
                        <div className="lg:flex items-center relative h-full rounded-xl bg-white p-5">
                            <Image className="card-img" width="235" height="304" src="assets/posts/post4.png" alt="" />
                            <div className="pt-6 pb-5 pl-6">
                                <div className="relative left-0 top-0 right-10 z-[1] mb-6">
                                    <a className="inline-block h-8 rounded-3xl border border-cyan-600 bg-btn-featured-post text-cyan-600 px-[0.875rem] py-2 text-sm leading-1" href="#">Development</a>
                                </div>
                                <h3 className="h4 text-2xl mb-4 font-serif font-bold text-gray-900">
                                    <a href="blog-single.html">
                                        Keep on Top of your With Felix's Slick New
                                    </a>
                                </h3>
                                <p className="text-gray-500">
                                    Mauris blandit aliquet elit, eget tincidunt nibh dolor sit amet,
                                </p>
                                <div className="pt-0 pb-0 mt-6 flex space-x-4">
                                    <span className="inline-flex items-center text-xs text-[#666]">
                                        <svg className="mr-1.5" width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.5 2H11V0.375C11 0.16875 10.8313 0 10.625 0H9.375C9.16875 0 9 0.16875 9 0.375V2H5V0.375C5 0.16875 4.83125 0 4.625 0H3.375C3.16875 0 3 0.16875 3 0.375V2H1.5C0.671875 2 0 2.67188 0 3.5V14.5C0 15.3281 0.671875 16 1.5 16H12.5C13.3281 16 14 15.3281 14 14.5V3.5C14 2.67188 13.3281 2 12.5 2ZM12.3125 14.5H1.6875C1.58438 14.5 1.5 14.4156 1.5 14.3125V5H12.5V14.3125C12.5 14.4156 12.4156 14.5 12.3125 14.5Z" fill="#939393"></path>
                                        </svg>
                                        21st Sep,2020
                                    </span>
                                    <span className="inline-flex items-center text-xs text-[#666]">
                                        <svg className="mr-1.5" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.65217 0C3.42496 0 0 3.58065 0 8C0 12.4194 3.42496 16 7.65217 16C11.8794 16 15.3043 12.4194 15.3043 8C15.3043 3.58065 11.8794 0 7.65217 0ZM7.65217 14.4516C4.24264 14.4516 1.48107 11.5645 1.48107 8C1.48107 4.43548 4.24264 1.54839 7.65217 1.54839C11.0617 1.54839 13.8233 4.43548 13.8233 8C13.8233 11.5645 11.0617 14.4516 7.65217 14.4516ZM9.55905 11.0839L6.93941 9.09355C6.84376 9.01935 6.78822 8.90323 6.78822 8.78065V3.48387C6.78822 3.27097 6.95484 3.09677 7.15849 3.09677H8.14586C8.34951 3.09677 8.51613 3.27097 8.51613 3.48387V8.05484L10.5773 9.62258C10.7439 9.74839 10.7778 9.99032 10.6575 10.1645L10.0774 11C9.95708 11.171 9.72567 11.2097 9.55905 11.0839Z" fill="#939393"></path>
                                        </svg>
                                        10 Min To Read
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="category-filter mb-10 mt-3 rounded-xl bg-[#EEEEEE] px-4 mx-2">
                    <ul className="flex flex-nowrap items-center overflow-auto py-4 list-none">
                        <li>
                            <a className="whitespace-nowrap filter-btn-active inline-block px-8 py-2 text-sm font-medium m-3 rounded-3xl h-11 leading-6 bg-white" href="#">All Categories</a>
                        </li>
                        <li>
                            <a className="whitespace-nowrap inline-block border px-8 py-2 text-sm font-medium border-gray-500 m-3 rounded-3xl h-11 leading-6" href="#">Development</a>
                        </li>
                        <li>
                            <a className="whitespace-nowrap inline-block border px-8 py-2 text-sm font-medium border-gray-500 m-3 rounded-3xl h-11 leading-6" href="#">Updates</a>
                        </li>
                        <li>
                            <a className="whitespace-nowrap inline-block border px-8 py-2 text-sm font-medium border-gray-500 m-3 rounded-3xl h-11 leading-6" href="#">Email Marketing</a>
                        </li>
                        <li>
                            <a className="whitespace-nowrap inline-block border px-8 py-2 text-sm font-medium border-gray-500 m-3 rounded-3xl h-11 leading-6" href="#">Rate Optimization</a>
                        </li>
                    </ul>
                </div>

                <h2 className="h4 mb-4 text-[1.55rem] font-serif font-bold leading-tight text-gray-900 px-2">Publicaciones destacadas</h2>
                <div className="flex flex-wrap lg:-mx-2">
                    <div className="mb-8 md:w-1/2 lg:w-[33.33%] px-4">
                        <div className="relative h-full rounded-xl bg-white p-5 shadow-lg">
                            <Image className="card-img" width="335" height="210" src="assets/posts/post5.png" alt="" />
                            <div className="pt-6">
                                <div className="absolute right-10 top-10 z-[1] mb-6">
                                    <a className="inline-block h-8 rounded-3xl border border-cyan-600 bg-btn-featured-post text-cyan-600 px-[0.875rem] py-2 text-sm leading-1" href="#">Development</a>
                                </div>
                                <h3 className="h4 text-lg mb-4 font-serif font-bold text-gray-900">
                                    <a href="blog-single.html">
                                        How Video Analytics Can Help Understand and Increase
                                    </a>
                                </h3>
                                <p className="text-gray-500">
                                    Mauris blandit aliquet elit, eget tincidunt nibh dolor sit amet,
                                </p>
                                <div className="border-t border-gray-200 pt-6 pb-0 mt-6 flex space-x-4">
                                    <span className="inline-flex items-center text-xs text-[#666]">
                                        <svg className="mr-1.5" width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.5 2H11V0.375C11 0.16875 10.8313 0 10.625 0H9.375C9.16875 0 9 0.16875 9 0.375V2H5V0.375C5 0.16875 4.83125 0 4.625 0H3.375C3.16875 0 3 0.16875 3 0.375V2H1.5C0.671875 2 0 2.67188 0 3.5V14.5C0 15.3281 0.671875 16 1.5 16H12.5C13.3281 16 14 15.3281 14 14.5V3.5C14 2.67188 13.3281 2 12.5 2ZM12.3125 14.5H1.6875C1.58438 14.5 1.5 14.4156 1.5 14.3125V5H12.5V14.3125C12.5 14.4156 12.4156 14.5 12.3125 14.5Z" fill="#939393"></path>
                                        </svg>
                                        21st Sep,2020
                                    </span>
                                    <span className="inline-flex items-center text-xs text-[#666]">
                                        <svg className="mr-1.5" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.65217 0C3.42496 0 0 3.58065 0 8C0 12.4194 3.42496 16 7.65217 16C11.8794 16 15.3043 12.4194 15.3043 8C15.3043 3.58065 11.8794 0 7.65217 0ZM7.65217 14.4516C4.24264 14.4516 1.48107 11.5645 1.48107 8C1.48107 4.43548 4.24264 1.54839 7.65217 1.54839C11.0617 1.54839 13.8233 4.43548 13.8233 8C13.8233 11.5645 11.0617 14.4516 7.65217 14.4516ZM9.55905 11.0839L6.93941 9.09355C6.84376 9.01935 6.78822 8.90323 6.78822 8.78065V3.48387C6.78822 3.27097 6.95484 3.09677 7.15849 3.09677H8.14586C8.34951 3.09677 8.51613 3.27097 8.51613 3.48387V8.05484L10.5773 9.62258C10.7439 9.74839 10.7778 9.99032 10.6575 10.1645L10.0774 11C9.95708 11.171 9.72567 11.2097 9.55905 11.0839Z" fill="#939393"></path>
                                        </svg>
                                        10 Min To Read
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-8 md:w-1/2 lg:w-[33.33%] px-4">
                        <div className="relative h-full rounded-xl bg-white p-5 shadow-lg">
                            <Image className="card-img" width="335" height="210" src="assets/posts/post6.png" alt="" />
                            <div className="pt-6">
                                <div className="absolute right-10 top-10 z-[1] mb-6">
                                    <a className="inline-block h-8 rounded-3xl border border-cyan-600 bg-btn-featured-post text-cyan-600 px-[0.875rem] py-2 text-sm leading-1" href="#">Development</a>
                                </div>
                                <h3 className="h4 text-lg mb-4 font-serif font-bold text-gray-900">
                                    <a href="blog-single.html">
                                        Keep on Top of your To-Do List With Slick New Comment
                                    </a>
                                </h3>
                                <p className="text-gray-500">
                                    Mauris blandit aliquet elit, eget tincidunt nibh dolor sit amet,
                                </p>
                                <div className="border-t border-gray-200 pt-6 pb-0 mt-6 flex space-x-4">
                                    <span className="inline-flex items-center text-xs text-[#666]">
                                        <svg className="mr-1.5" width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.5 2H11V0.375C11 0.16875 10.8313 0 10.625 0H9.375C9.16875 0 9 0.16875 9 0.375V2H5V0.375C5 0.16875 4.83125 0 4.625 0H3.375C3.16875 0 3 0.16875 3 0.375V2H1.5C0.671875 2 0 2.67188 0 3.5V14.5C0 15.3281 0.671875 16 1.5 16H12.5C13.3281 16 14 15.3281 14 14.5V3.5C14 2.67188 13.3281 2 12.5 2ZM12.3125 14.5H1.6875C1.58438 14.5 1.5 14.4156 1.5 14.3125V5H12.5V14.3125C12.5 14.4156 12.4156 14.5 12.3125 14.5Z" fill="#939393"></path>
                                        </svg>
                                        21st Sep,2020
                                    </span>
                                    <span className="inline-flex items-center text-xs text-[#666]">
                                        <svg className="mr-1.5" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.65217 0C3.42496 0 0 3.58065 0 8C0 12.4194 3.42496 16 7.65217 16C11.8794 16 15.3043 12.4194 15.3043 8C15.3043 3.58065 11.8794 0 7.65217 0ZM7.65217 14.4516C4.24264 14.4516 1.48107 11.5645 1.48107 8C1.48107 4.43548 4.24264 1.54839 7.65217 1.54839C11.0617 1.54839 13.8233 4.43548 13.8233 8C13.8233 11.5645 11.0617 14.4516 7.65217 14.4516ZM9.55905 11.0839L6.93941 9.09355C6.84376 9.01935 6.78822 8.90323 6.78822 8.78065V3.48387C6.78822 3.27097 6.95484 3.09677 7.15849 3.09677H8.14586C8.34951 3.09677 8.51613 3.27097 8.51613 3.48387V8.05484L10.5773 9.62258C10.7439 9.74839 10.7778 9.99032 10.6575 10.1645L10.0774 11C9.95708 11.171 9.72567 11.2097 9.55905 11.0839Z" fill="#939393"></path>
                                        </svg>
                                        10 Min To Read
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-8 md:w-1/2 lg:w-[33.33%] px-4">
                        <div className="relative h-full rounded-xl bg-white p-5 shadow-lg">
                            <Image className="card-img" width="335" height="210" src="assets/posts/post7.png" alt="" />
                            <div className="pt-6">
                                <div className="absolute right-10 top-10 z-[1] mb-6">
                                    <a className="inline-block h-8 rounded-3xl border border-cyan-600 bg-btn-featured-post text-cyan-600 px-[0.875rem] py-2 text-sm leading-1" href="#">Development</a>
                                </div>
                                <h3 className="h4 text-lg mb-4 font-serif font-bold text-gray-900">
                                    <a href="blog-single.html">
                                        6 Product Launch Email Examples You’ll Want to Steal
                                    </a>
                                </h3>
                                <p className="text-gray-500">
                                    Mauris blandit aliquet elit, eget tincidunt nibh dolor sit amet,
                                </p>
                                <div className="border-t border-gray-200 pt-6 pb-0 mt-6 flex space-x-4">
                                    <span className="inline-flex items-center text-xs text-[#666]">
                                        <svg className="mr-1.5" width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.5 2H11V0.375C11 0.16875 10.8313 0 10.625 0H9.375C9.16875 0 9 0.16875 9 0.375V2H5V0.375C5 0.16875 4.83125 0 4.625 0H3.375C3.16875 0 3 0.16875 3 0.375V2H1.5C0.671875 2 0 2.67188 0 3.5V14.5C0 15.3281 0.671875 16 1.5 16H12.5C13.3281 16 14 15.3281 14 14.5V3.5C14 2.67188 13.3281 2 12.5 2ZM12.3125 14.5H1.6875C1.58438 14.5 1.5 14.4156 1.5 14.3125V5H12.5V14.3125C12.5 14.4156 12.4156 14.5 12.3125 14.5Z" fill="#939393"></path>
                                        </svg>
                                        21st Sep,2020
                                    </span>
                                    <span className="inline-flex items-center text-xs text-[#666]">
                                        <svg className="mr-1.5" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.65217 0C3.42496 0 0 3.58065 0 8C0 12.4194 3.42496 16 7.65217 16C11.8794 16 15.3043 12.4194 15.3043 8C15.3043 3.58065 11.8794 0 7.65217 0ZM7.65217 14.4516C4.24264 14.4516 1.48107 11.5645 1.48107 8C1.48107 4.43548 4.24264 1.54839 7.65217 1.54839C11.0617 1.54839 13.8233 4.43548 13.8233 8C13.8233 11.5645 11.0617 14.4516 7.65217 14.4516ZM9.55905 11.0839L6.93941 9.09355C6.84376 9.01935 6.78822 8.90323 6.78822 8.78065V3.48387C6.78822 3.27097 6.95484 3.09677 7.15849 3.09677H8.14586C8.34951 3.09677 8.51613 3.27097 8.51613 3.48387V8.05484L10.5773 9.62258C10.7439 9.74839 10.7778 9.99032 10.6575 10.1645L10.0774 11C9.95708 11.171 9.72567 11.2097 9.55905 11.0839Z" fill="#939393"></path>
                                        </svg>
                                        10 Min To Read
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-8 md:w-1/2 lg:w-[33.33%] px-2">
                        <div className="relative h-full rounded-xl bg-white p-5 shadow-lg">
                            <Image className="card-img" width="335" height="210" src="assets/posts/post-8.png" alt="" />
                            <div className="pt-6">
                                <div className="absolute right-10 top-10 z-[1] mb-6">
                                    <a className="inline-block h-8 rounded-3xl border border-cyan-600 bg-btn-featured-post text-cyan-600 px-[0.875rem] py-2 text-sm leading-1" href="#">Development</a>
                                </div>
                                <h3 className="h4 text-lg mb-4 font-serif font-bold text-gray-900">
                                    <a href="blog-single.html">
                                        Learn from the Best: 6 of the Top Automotive Email
                                    </a>
                                </h3>
                                <p className="text-gray-500">
                                    Mauris blandit aliquet elit, eget tincidunt nibh dolor sit amet,
                                </p>
                                <div className="border-t border-gray-200 pt-6 pb-0 mt-6 flex space-x-4">
                                    <span className="inline-flex items-center text-xs text-[#666]">
                                        <svg className="mr-1.5" width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.5 2H11V0.375C11 0.16875 10.8313 0 10.625 0H9.375C9.16875 0 9 0.16875 9 0.375V2H5V0.375C5 0.16875 4.83125 0 4.625 0H3.375C3.16875 0 3 0.16875 3 0.375V2H1.5C0.671875 2 0 2.67188 0 3.5V14.5C0 15.3281 0.671875 16 1.5 16H12.5C13.3281 16 14 15.3281 14 14.5V3.5C14 2.67188 13.3281 2 12.5 2ZM12.3125 14.5H1.6875C1.58438 14.5 1.5 14.4156 1.5 14.3125V5H12.5V14.3125C12.5 14.4156 12.4156 14.5 12.3125 14.5Z" fill="#939393"></path>
                                        </svg>
                                        21st Sep,2020
                                    </span>
                                    <span className="inline-flex items-center text-xs text-[#666]">
                                        <svg className="mr-1.5" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.65217 0C3.42496 0 0 3.58065 0 8C0 12.4194 3.42496 16 7.65217 16C11.8794 16 15.3043 12.4194 15.3043 8C15.3043 3.58065 11.8794 0 7.65217 0ZM7.65217 14.4516C4.24264 14.4516 1.48107 11.5645 1.48107 8C1.48107 4.43548 4.24264 1.54839 7.65217 1.54839C11.0617 1.54839 13.8233 4.43548 13.8233 8C13.8233 11.5645 11.0617 14.4516 7.65217 14.4516ZM9.55905 11.0839L6.93941 9.09355C6.84376 9.01935 6.78822 8.90323 6.78822 8.78065V3.48387C6.78822 3.27097 6.95484 3.09677 7.15849 3.09677H8.14586C8.34951 3.09677 8.51613 3.27097 8.51613 3.48387V8.05484L10.5773 9.62258C10.7439 9.74839 10.7778 9.99032 10.6575 10.1645L10.0774 11C9.95708 11.171 9.72567 11.2097 9.55905 11.0839Z" fill="#939393"></path>
                                        </svg>
                                        10 Min To Read
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-8 md:w-1/2 lg:w-[33.33%] px-2">
                        <div className="relative h-full rounded-xl bg-white p-5 shadow-lg">
                            <Image className="card-img" width="335" height="210" src="assets/posts/post-9.png" alt="" />
                            <div className="pt-6">
                                <div className="absolute right-10 top-10 z-[1] mb-6">
                                    <a className="inline-block h-8 rounded-3xl border border-cyan-600 bg-btn-featured-post text-cyan-600 px-[0.875rem] py-2 text-sm leading-1" href="#">Development</a>
                                </div>
                                <h3 className="h4 text-lg mb-4 font-serif font-bold text-gray-900">
                                    <a href="blog-single.html">
                                        8 E-Commerce Email Marketing Best Practices To
                                    </a>
                                </h3>
                                <p className="text-gray-500">
                                    Mauris blandit aliquet elit, eget tincidunt nibh dolor sit amet,
                                </p>
                                <div className="border-t border-gray-200 pt-6 pb-0 mt-6 flex space-x-4">
                                    <span className="inline-flex items-center text-xs text-[#666]">
                                        <svg className="mr-1.5" width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.5 2H11V0.375C11 0.16875 10.8313 0 10.625 0H9.375C9.16875 0 9 0.16875 9 0.375V2H5V0.375C5 0.16875 4.83125 0 4.625 0H3.375C3.16875 0 3 0.16875 3 0.375V2H1.5C0.671875 2 0 2.67188 0 3.5V14.5C0 15.3281 0.671875 16 1.5 16H12.5C13.3281 16 14 15.3281 14 14.5V3.5C14 2.67188 13.3281 2 12.5 2ZM12.3125 14.5H1.6875C1.58438 14.5 1.5 14.4156 1.5 14.3125V5H12.5V14.3125C12.5 14.4156 12.4156 14.5 12.3125 14.5Z" fill="#939393"></path>
                                        </svg>
                                        21st Sep,2020
                                    </span>
                                    <span className="inline-flex items-center text-xs text-[#666]">
                                        <svg className="mr-1.5" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.65217 0C3.42496 0 0 3.58065 0 8C0 12.4194 3.42496 16 7.65217 16C11.8794 16 15.3043 12.4194 15.3043 8C15.3043 3.58065 11.8794 0 7.65217 0ZM7.65217 14.4516C4.24264 14.4516 1.48107 11.5645 1.48107 8C1.48107 4.43548 4.24264 1.54839 7.65217 1.54839C11.0617 1.54839 13.8233 4.43548 13.8233 8C13.8233 11.5645 11.0617 14.4516 7.65217 14.4516ZM9.55905 11.0839L6.93941 9.09355C6.84376 9.01935 6.78822 8.90323 6.78822 8.78065V3.48387C6.78822 3.27097 6.95484 3.09677 7.15849 3.09677H8.14586C8.34951 3.09677 8.51613 3.27097 8.51613 3.48387V8.05484L10.5773 9.62258C10.7439 9.74839 10.7778 9.99032 10.6575 10.1645L10.0774 11C9.95708 11.171 9.72567 11.2097 9.55905 11.0839Z" fill="#939393"></path>
                                        </svg>
                                        10 Min To Read
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-8 md:w-1/2 lg:w-[33.33%] px-2">
                        <div className="relative h-full rounded-xl bg-white p-5 shadow-lg">
                            <Image className="card-img" width="335" height="210" src="assets/posts/post-10.png" alt="" />
                            <div className="pt-6">
                                <div className="absolute right-10 top-10 z-[1] mb-6">
                                    <a className="inline-block h-8 rounded-3xl border border-cyan-600 bg-btn-featured-post text-cyan-600 px-[0.875rem] py-2 text-sm leading-1" href="#">Development</a>
                                </div>
                                <h3 className="h4 text-lg mb-4 font-serif font-bold text-gray-900">
                                    <a href="blog-single.html">
                                        Learn from These 6 Travel Boost Leads by 162 Percent
                                    </a>
                                </h3>
                                <p className="text-gray-500">
                                    Mauris blandit aliquet elit, eget tincidunt nibh dolor sit amet,
                                </p>
                                <div className="border-t border-gray-200 pt-6 pb-0 mt-6 flex space-x-4">
                                    <span className="inline-flex items-center text-xs text-[#666]">
                                        <svg className="mr-1.5" width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.5 2H11V0.375C11 0.16875 10.8313 0 10.625 0H9.375C9.16875 0 9 0.16875 9 0.375V2H5V0.375C5 0.16875 4.83125 0 4.625 0H3.375C3.16875 0 3 0.16875 3 0.375V2H1.5C0.671875 2 0 2.67188 0 3.5V14.5C0 15.3281 0.671875 16 1.5 16H12.5C13.3281 16 14 15.3281 14 14.5V3.5C14 2.67188 13.3281 2 12.5 2ZM12.3125 14.5H1.6875C1.58438 14.5 1.5 14.4156 1.5 14.3125V5H12.5V14.3125C12.5 14.4156 12.4156 14.5 12.3125 14.5Z" fill="#939393"></path>
                                        </svg>
                                        21st Sep,2020
                                    </span>
                                    <span className="inline-flex items-center text-xs text-[#666]">
                                        <svg className="mr-1.5" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.65217 0C3.42496 0 0 3.58065 0 8C0 12.4194 3.42496 16 7.65217 16C11.8794 16 15.3043 12.4194 15.3043 8C15.3043 3.58065 11.8794 0 7.65217 0ZM7.65217 14.4516C4.24264 14.4516 1.48107 11.5645 1.48107 8C1.48107 4.43548 4.24264 1.54839 7.65217 1.54839C11.0617 1.54839 13.8233 4.43548 13.8233 8C13.8233 11.5645 11.0617 14.4516 7.65217 14.4516ZM9.55905 11.0839L6.93941 9.09355C6.84376 9.01935 6.78822 8.90323 6.78822 8.78065V3.48387C6.78822 3.27097 6.95484 3.09677 7.15849 3.09677H8.14586C8.34951 3.09677 8.51613 3.27097 8.51613 3.48387V8.05484L10.5773 9.62258C10.7439 9.74839 10.7778 9.99032 10.6575 10.1645L10.0774 11C9.95708 11.171 9.72567 11.2097 9.55905 11.0839Z" fill="#939393"></path>
                                        </svg>
                                        10 Min To Read
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-8 md:w-1/2 lg:w-[33.33%] px-2">
                        <div className="relative h-full rounded-xl bg-white p-5 shadow-lg">
                            <Image className="card-img" width="335" height="210" src="assets/posts/post-11.png" alt="" />
                            <div className="pt-6">
                                <div className="absolute right-10 top-10 z-[1] mb-6">
                                    <a className="inline-block h-8 rounded-3xl border border-cyan-600 bg-btn-featured-post text-cyan-600 px-[0.875rem] py-2 text-sm leading-1" href="#">Development</a>
                                </div>
                                <h3 className="h4 text-lg mb-4 font-serif font-bold text-gray-900">
                                    <a href="blog-single.html">
                                        How Video Analytics Can Help Understand and Increase
                                    </a>
                                </h3>
                                <p className="text-gray-500">
                                    Mauris blandit aliquet elit, eget tincidunt nibh dolor sit amet,
                                </p>
                                <div className="border-t border-gray-200 pt-6 pb-0 mt-6 flex space-x-4">
                                    <span className="inline-flex items-center text-xs text-[#666]">
                                        <svg className="mr-1.5" width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.5 2H11V0.375C11 0.16875 10.8313 0 10.625 0H9.375C9.16875 0 9 0.16875 9 0.375V2H5V0.375C5 0.16875 4.83125 0 4.625 0H3.375C3.16875 0 3 0.16875 3 0.375V2H1.5C0.671875 2 0 2.67188 0 3.5V14.5C0 15.3281 0.671875 16 1.5 16H12.5C13.3281 16 14 15.3281 14 14.5V3.5C14 2.67188 13.3281 2 12.5 2ZM12.3125 14.5H1.6875C1.58438 14.5 1.5 14.4156 1.5 14.3125V5H12.5V14.3125C12.5 14.4156 12.4156 14.5 12.3125 14.5Z" fill="#939393"></path>
                                        </svg>
                                        21st Sep,2020
                                    </span>
                                    <span className="inline-flex items-center text-xs text-[#666]">
                                        <svg className="mr-1.5" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.65217 0C3.42496 0 0 3.58065 0 8C0 12.4194 3.42496 16 7.65217 16C11.8794 16 15.3043 12.4194 15.3043 8C15.3043 3.58065 11.8794 0 7.65217 0ZM7.65217 14.4516C4.24264 14.4516 1.48107 11.5645 1.48107 8C1.48107 4.43548 4.24264 1.54839 7.65217 1.54839C11.0617 1.54839 13.8233 4.43548 13.8233 8C13.8233 11.5645 11.0617 14.4516 7.65217 14.4516ZM9.55905 11.0839L6.93941 9.09355C6.84376 9.01935 6.78822 8.90323 6.78822 8.78065V3.48387C6.78822 3.27097 6.95484 3.09677 7.15849 3.09677H8.14586C8.34951 3.09677 8.51613 3.27097 8.51613 3.48387V8.05484L10.5773 9.62258C10.7439 9.74839 10.7778 9.99032 10.6575 10.1645L10.0774 11C9.95708 11.171 9.72567 11.2097 9.55905 11.0839Z" fill="#939393"></path>
                                        </svg>
                                        10 Min To Read
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-8 md:w-1/2 lg:w-[33.33%] px-2">
                        <div className="relative h-full rounded-xl bg-white p-5 shadow-lg">
                            <Image className="card-img" width="335" height="210" src="assets/posts/post-12.png" alt="" />
                            <div className="pt-6">
                                <div className="absolute right-10 top-10 z-[1] mb-6">
                                    <a className="inline-block h-8 rounded-3xl border border-cyan-600 bg-btn-featured-post text-cyan-600 px-[0.875rem] py-2 text-sm leading-1" href="#">Development</a>
                                </div>
                                <h3 className="h4 text-lg mb-4 font-serif font-bold text-gray-900">
                                    <a href="blog-single.html">
                                        Keep on Top of your To-Do List With Slick New Comment
                                    </a>
                                </h3>
                                <p className="text-gray-500">
                                    Mauris blandit aliquet elit, eget tincidunt nibh dolor sit amet,
                                </p>
                                <div className="border-t border-gray-200 pt-6 pb-0 mt-6 flex space-x-4">
                                    <span className="inline-flex items-center text-xs text-[#666]">
                                        <svg className="mr-1.5" width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.5 2H11V0.375C11 0.16875 10.8313 0 10.625 0H9.375C9.16875 0 9 0.16875 9 0.375V2H5V0.375C5 0.16875 4.83125 0 4.625 0H3.375C3.16875 0 3 0.16875 3 0.375V2H1.5C0.671875 2 0 2.67188 0 3.5V14.5C0 15.3281 0.671875 16 1.5 16H12.5C13.3281 16 14 15.3281 14 14.5V3.5C14 2.67188 13.3281 2 12.5 2ZM12.3125 14.5H1.6875C1.58438 14.5 1.5 14.4156 1.5 14.3125V5H12.5V14.3125C12.5 14.4156 12.4156 14.5 12.3125 14.5Z" fill="#939393"></path>
                                        </svg>
                                        21st Sep,2020
                                    </span>
                                    <span className="inline-flex items-center text-xs text-[#666]">
                                        <svg className="mr-1.5" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.65217 0C3.42496 0 0 3.58065 0 8C0 12.4194 3.42496 16 7.65217 16C11.8794 16 15.3043 12.4194 15.3043 8C15.3043 3.58065 11.8794 0 7.65217 0ZM7.65217 14.4516C4.24264 14.4516 1.48107 11.5645 1.48107 8C1.48107 4.43548 4.24264 1.54839 7.65217 1.54839C11.0617 1.54839 13.8233 4.43548 13.8233 8C13.8233 11.5645 11.0617 14.4516 7.65217 14.4516ZM9.55905 11.0839L6.93941 9.09355C6.84376 9.01935 6.78822 8.90323 6.78822 8.78065V3.48387C6.78822 3.27097 6.95484 3.09677 7.15849 3.09677H8.14586C8.34951 3.09677 8.51613 3.27097 8.51613 3.48387V8.05484L10.5773 9.62258C10.7439 9.74839 10.7778 9.99032 10.6575 10.1645L10.0774 11C9.95708 11.171 9.72567 11.2097 9.55905 11.0839Z" fill="#939393"></path>
                                        </svg>
                                        10 Min To Read
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-8 md:w-1/2 lg:w-[33.33%] px-2">
                        <div className="relative h-full rounded-xl bg-white p-5 shadow-lg">
                            <Image className="card-img" width="335" height="210" src="assets/posts/post-13.png" alt="" />
                            <div className="pt-6">
                                <div className="absolute right-10 top-10 z-[1] mb-6">
                                    <a className="inline-block h-8 rounded-3xl border border-cyan-600 bg-btn-featured-post text-cyan-600 px-[0.875rem] py-2 text-sm leading-1" href="#">Development</a>
                                </div>
                                <h3 className="h4 text-lg mb-4 font-serif font-bold text-gray-900">
                                    <a href="blog-single.html">
                                        6 Product Launch Email Examples You’ll Want to Steal
                                    </a>
                                </h3>
                                <p className="text-gray-500">
                                    Mauris blandit aliquet elit, eget tincidunt nibh dolor sit amet,
                                </p>
                                <div className="border-t border-gray-200 pt-6 pb-0 mt-6 flex space-x-4">
                                    <span className="inline-flex items-center text-xs text-[#666]">
                                        <svg className="mr-1.5" width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.5 2H11V0.375C11 0.16875 10.8313 0 10.625 0H9.375C9.16875 0 9 0.16875 9 0.375V2H5V0.375C5 0.16875 4.83125 0 4.625 0H3.375C3.16875 0 3 0.16875 3 0.375V2H1.5C0.671875 2 0 2.67188 0 3.5V14.5C0 15.3281 0.671875 16 1.5 16H12.5C13.3281 16 14 15.3281 14 14.5V3.5C14 2.67188 13.3281 2 12.5 2ZM12.3125 14.5H1.6875C1.58438 14.5 1.5 14.4156 1.5 14.3125V5H12.5V14.3125C12.5 14.4156 12.4156 14.5 12.3125 14.5Z" fill="#939393"></path>
                                        </svg>
                                        21st Sep,2020
                                    </span>
                                    <span className="inline-flex items-center text-xs text-[#666]">
                                        <svg className="mr-1.5" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.65217 0C3.42496 0 0 3.58065 0 8C0 12.4194 3.42496 16 7.65217 16C11.8794 16 15.3043 12.4194 15.3043 8C15.3043 3.58065 11.8794 0 7.65217 0ZM7.65217 14.4516C4.24264 14.4516 1.48107 11.5645 1.48107 8C1.48107 4.43548 4.24264 1.54839 7.65217 1.54839C11.0617 1.54839 13.8233 4.43548 13.8233 8C13.8233 11.5645 11.0617 14.4516 7.65217 14.4516ZM9.55905 11.0839L6.93941 9.09355C6.84376 9.01935 6.78822 8.90323 6.78822 8.78065V3.48387C6.78822 3.27097 6.95484 3.09677 7.15849 3.09677H8.14586C8.34951 3.09677 8.51613 3.27097 8.51613 3.48387V8.05484L10.5773 9.62258C10.7439 9.74839 10.7778 9.99032 10.6575 10.1645L10.0774 11C9.95708 11.171 9.72567 11.2097 9.55905 11.0839Z" fill="#939393"></path>
                                        </svg>
                                        10 Min To Read
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function Blog() {
    return (
        <>
            <CommonHero />

            <Content />
        </>
    )
}