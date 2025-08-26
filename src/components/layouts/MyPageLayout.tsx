import { Outlet } from 'react-router-dom';

import Footer from '@/components/common/Footer';
import { Header } from '@/components/common/header';
import BottomNav from '@/components/mypage/BottomNav';
import Nav from '@/components/mypage/Nav';
import { mediaQuery } from '@/constants/breakpoints';
import useMediaQuery from '@/hooks/useMediaQuery';

export default function MyPageLayout() {
  const isDesktop = useMediaQuery(mediaQuery.tablet);

  return (
    <>
      <Header />
      <div className="m-auto mt-16 flex max-w-[1360px] flex-col items-center px-6 md:flex-row md:items-stretch md:px-10">
        {isDesktop ? (
          <aside className="flex w-55 flex-shrink-0 flex-col justify-between pr-4">
            <div>
              <h2 className="py-10 text-3xl font-semibold">마이페이지</h2>
              <Nav />
            </div>
            <BottomNav />
          </aside>
        ) : (
          <Nav className="w-full" />
        )}

        <main className="w-full flex-1 py-4 md:min-w-0 md:py-10 md:pl-4">
          <Outlet />
        </main>

        {!isDesktop && <BottomNav />}
      </div>
      <Footer />
    </>
  );
}
