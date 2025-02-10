'use client' 

import Header from './components/header/header'
import HeaderLanding from './components/header/landingHeader'
import Footer from './components/footer'
import { usePathname } from "next/navigation"
import Whatsapp from './components/whatsapp'

function Bubbles() {
    return (
      <>
        <img className="floating-bubble-1 absolute right-0 top-0 -z-[1]" src="assets/bubbles/floating-bubble-1.png" width="103" height="98" alt="" />
        <img className="floating-bubble-2 absolute left-0 top-[387px] -z-[1]" src="assets/bubbles/floating-bubble-2.png" alt="" width="33" height="66" />
        <img className="floating-bubble-3 absolute right-0 top-[605px] -z-[1]" src="assets/bubbles/floating-bubble-3.png" alt="" width="50" height="99" />
      </>
    );
  }

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const isLandingPage = pathName === "/";

  return (
    <>
      { isLandingPage ? <HeaderLanding/> : <Header/>}
        <main className='pt-14'>
          <Bubbles />
          {children}
        </main>
        <Footer />
        {/* <Whatsapp /> */}
    </>
  );
}
