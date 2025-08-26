import { Bars3Icon, UserIcon } from '@heroicons/react/24/outline';

import { usePageNav } from '@/hooks/usePageNav';
import { useUserStore } from '@/stores/userStore';

import UserDropdown from './UserDropdown';

type MobileMenuProps = {
  isDropdownOpen: boolean;
  onToggleDropdown: () => void;
};

function MobileMenu({ isDropdownOpen, onToggleDropdown }: MobileMenuProps) {
  const { isLoggedIn } = useUserStore();
  const dropdownButtonClass =
    'w-full pl-2 py-2 text-base text-left font-semibold text-gray-700 hover:font-bold hover:text-fuchsia-500';

  const { navigateToLogin, navigateToSignup } = usePageNav();

  return (
    <>
      <div className="md:hidden">
        <button
          type="button"
          onClick={onToggleDropdown}
          className="cursor-pointer"
        >
          {isLoggedIn ? (
            <UserIcon className="h-6 w-6 text-gray-800" />
          ) : (
            <Bars3Icon className="h-6 w-6 text-gray-800" />
          )}
        </button>
      </div>

      {/* 모바일 드롭다운 메뉴 */}
      {isDropdownOpen && (
        <div className="absolute top-16 right-0 z-50 w-52 border border-gray-200 bg-white p-4 shadow md:hidden">
          {isLoggedIn ? (
            <UserDropdown isOpen onToggle={() => {}} isMobile />
          ) : (
            <div className="w-full py-1">
              <button
                type="button"
                onClick={navigateToLogin}
                className={dropdownButtonClass}
              >
                로그인
              </button>
              <hr className="mx-1 my-3 border border-gray-200" />
              <button
                type="button"
                onClick={navigateToSignup}
                className={dropdownButtonClass}
              >
                회원가입
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default MobileMenu;
