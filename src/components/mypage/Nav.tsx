import { ChevronRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useLocation, useNavigate } from 'react-router-dom';

const MYPAGE_NAV = [
  { label: '내 프로필', path: '/mypage/myprofile' },
  { label: '즐겨찾기한 일정', path: '/mypage/myschedule' },
];
const DesktopButtonStyle =
  'md:inline-flex md:justify-between md:border-none md:w-auto md:rounded-md md:px-4 md:py-4 md:transition-colors md:hover:bg-gray-200';

export default function Nav({ className }: { className?: string }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClickButton = (path: string) => {
    navigate(path);
  };

  return (
    <nav
      className={clsx(
        'items-strech flex w-full md:w-auto md:flex-col md:pb-10',
        className,
      )}
    >
      {MYPAGE_NAV.map(({ label, path }) => {
        const isActive = location.pathname === path;

        return (
          <button
            key={label}
            className={clsx(
              'w-1/2 border-b-2 py-4',
              DesktopButtonStyle,
              isActive
                ? 'border-gray-700 font-semibold md:bg-gray-100 md:font-semibold'
                : 'border-gray-200 md:bg-white',
            )}
            type="button"
            onClick={() => handleClickButton(path)}
          >
            <p>{label}</p>
            <ChevronRightIcon className="hidden w-5 md:block" />
          </button>
        );
      })}
    </nav>
  );
}
