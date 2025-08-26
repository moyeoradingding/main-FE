import axios from 'axios';
import { useState } from 'react';

import { loginUser } from '@/api/authApi';
import type { LoginFormValues } from '@/schemas/loginSchema';
import { useFavoritesStore } from '@/stores/favoritesStore';
import { useUserStore } from '@/stores/userStore';
import { showErrorToast, showSuccessToast } from '@/utils/toastUtils';

import { usePageNav } from './usePageNav';

export const useLogin = () => {
  const { navigateToRoleBasedPage } = usePageNav();
  const { login } = useUserStore();
  const { fetchFavorites } = useFavoritesStore();
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const { user, accessToken, refreshToken } = await loginUser(data);

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
      fetchFavorites();

      showSuccessToast('로그인 성공!');
      navigateToRoleBasedPage(user.role);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        showErrorToast(
          error.response.data.message ||
            '로그인 또는 프로필 조회에 실패했습니다.',
        );
      } else {
        showErrorToast('로그인 중 네트워크 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { submit, isLoading };
};
