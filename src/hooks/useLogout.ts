import { logoutUser } from '@/api/authApi';
import { usePageNav } from '@/hooks/usePageNav';
import { useUserStore } from '@/stores/userStore';
import { showErrorToast } from '@/utils/toastUtils';

export const useLogout = () => {
  const { logout } = useUserStore();
  const { navigateToLanding } = usePageNav();

  const handleLogout = async () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      try {
        await logoutUser();
      } catch (error) {
        showErrorToast('서버 로그아웃 처리 중 오류가 발생했습니다.');
        // console.error('Logout API failed:', error);
      } finally {
        logout();
        navigateToLanding();
      }
    }
  };

  return { handleLogout };
};
