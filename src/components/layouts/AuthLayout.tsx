import clsx from 'clsx';
import { Link, Outlet } from 'react-router-dom';

import { mediaQuery } from '@/constants/breakpoints';
import useMediaQuery from '@/hooks/useMediaQuery';

export default function AuthLayout() {
  const isDesktop = useMediaQuery(mediaQuery.tablet);

  return (
    <div className="flex gap-4 p-4">
      <div className="flex w-full flex-col items-center justify-center py-15 md:w-[calc(50%-8px)] md:px-10">
        <div className="flex w-full max-w-[480px] flex-col items-center md:items-start">
          <Link to="/">
            <img
              className="mb-10 inline w-30 md:mb-0 md:w-24"
              src="/logo-text.png"
              alt="logo-text"
            />
          </Link>

          <div className="my-8 w-full rounded-lg border-gray-200 bg-[#fffeff99] px-6 py-8 md:border-y-1 md:px-0">
            <Outlet />
          </div>

          <p className="text-sm text-gray-400">
            &copy; 2025 OZ 5팀 모여라 딩딩
          </p>
        </div>
      </div>

      <div
        className={clsx(
          'fixed bg-[url(/auth-bg.png)] bg-cover bg-center',
          isDesktop
            ? 'top-4 right-4 h-[calc(100%-32px)] w-[calc(50%-24px)] rounded-xl'
            : 'inset-0 z-[-1]',
        )}
      >
        {isDesktop && (
          <div className="flex h-full flex-col items-center justify-center gap-2">
            <img
              className="animate-float animate-blink w-1/8"
              src="/logo-symbol.png"
              alt="logo-symbol"
            />
            <img className="w-1/4" src="/logo-text.png" alt="logo-text" />
          </div>
        )}
      </div>
    </div>
  );
}
