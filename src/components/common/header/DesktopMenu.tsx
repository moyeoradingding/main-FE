import { useState } from 'react';

import { Button } from '@/components/common/Button';
import { usePageNav } from '@/hooks/usePageNav';
import { useUserStore } from '@/stores/userStore';

import UserDropdown from './UserDropdown';

function DesktopMenu() {
  const { isLoggedIn } = useUserStore();
  const { navigateToLogin, navigateToSignup } = usePageNav();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggleDropdown = () => setIsDropdownOpen(prev => !prev);

  return (
    <nav className="hidden items-center space-x-3 md:flex">
      {isLoggedIn ? (
        <UserDropdown
          isOpen={isDropdownOpen}
          onToggle={handleToggleDropdown}
          isMobile={false}
        />
      ) : (
        <>
          <Button
            variant="secondary"
            size="md"
            className="w-[96px]"
            onClick={navigateToLogin}
          >
            로그인
          </Button>
          <Button
            variant="primary"
            size="md"
            className="w-[96px]"
            onClick={navigateToSignup}
          >
            회원가입
          </Button>
        </>
      )}
    </nav>
  );
}

export default DesktopMenu;
