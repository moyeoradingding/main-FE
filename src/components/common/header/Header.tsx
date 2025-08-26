import { useState } from 'react';

import { usePageNav } from '@/hooks/usePageNav';
import { useUserStore } from '@/stores/userStore';

import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';

function Header() {
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const { isLoggedIn, user } = useUserStore();
  const { navigateToRoleBasedPage, navigateToLanding } = usePageNav();

  const handleToggleMobileMenu = () => {
    setIsMobileDropdownOpen(prev => !prev);
  };

  const handleLogoClick = () => {
    if (isLoggedIn && user?.role) {
      navigateToRoleBasedPage(user.role);
    } else {
      navigateToLanding();
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleLogoClick();
    }
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-50 h-16 border-b border-gray-300 bg-white px-6 md:px-10">
      <div className="mx-auto flex h-full max-w-screen-xl items-center justify-between">
        <div
          onClick={handleLogoClick}
          onKeyDown={onKeyDown}
          role="button"
          tabIndex={0}
          className="cursor-pointer text-xl font-bold"
        >
          DingDing
        </div>

        <DesktopMenu />

        <MobileMenu
          isDropdownOpen={isMobileDropdownOpen}
          onToggleDropdown={handleToggleMobileMenu}
        />
      </div>
    </header>
  );
}

export default Header;
