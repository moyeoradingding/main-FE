import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { kakaoLoginCallback } from '@/api/authApi';
import { usePageNav } from '@/hooks/usePageNav';
import { useUserStore } from '@/stores/userStore';
import { showErrorToast } from '@/utils/toastUtils';

export default function KakaoCallback() {
  const location = useLocation();
  const code: string | null = new URLSearchParams(location.search).get('code');
  const { login } = useUserStore();
  const { navigateToRoleBasedPage, navigateToLanding } = usePageNav();

  useEffect(() => {
    console.log('Kakao auth code:', code);

    if (code) {
      (async () => {
        try {
          const { user, accessToken, refreshToken } =
            await kakaoLoginCallback(code);
          login(
            {
              user_id: user.id,
              email: user.email,
              nickname: user.nickname,
              profile_image_url: user.profile_image_url,
              role: user.role,
            },
            accessToken,
            refreshToken,
          );
          navigateToRoleBasedPage(user.role);
        } catch (error) {
          console.error('Kakao login failed:', error);
          showErrorToast('카카오 로그인에 실패했습니다.');
          navigateToLanding();
        }
      })();
    } else {
      showErrorToast('카카오 로그인 코드를 찾을 수 없습니다.');
      navigateToLanding();
    }
  }, [code, login, navigateToRoleBasedPage, navigateToLanding]);

  return (
    <div className="flex h-screen items-center justify-center text-lg font-semibold">
      카카오 로그인 처리 중...
    </div>
  );
}
