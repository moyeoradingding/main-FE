import axios from 'axios';
import { useState } from 'react';

import { signupUser } from '@/api/authApi';
import type { RegisterFormValues } from '@/schemas/registerSchema';
import { showErrorToast, showSuccessToast } from '@/utils/toastUtils';

import { usePageNav } from './usePageNav';

export const useSignup = () => {
  const { navigateToLogin } = usePageNav();
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('email', data.email);
      formData.append('nickname', data.nickname);
      formData.append('password', data.password);
      formData.append('password_confirm', data.confirmPassword);
      formData.append('userType', 'NORMAL');

      const response = await signupUser(formData);

      showSuccessToast(response.message || '회원가입 성공!');
      navigateToLogin();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response.data;
        let errorMessage = '회원가입 실패';

        if (errorData) {
          const errorKey = Object.keys(errorData)[0];
          if (errorKey && Array.isArray(errorData[errorKey])) {
            [errorMessage] = errorData[errorKey];
          } else if (errorData.message) {
            errorMessage = errorData.message;
          }
        }
        showErrorToast(errorMessage);
      } else {
        showErrorToast('회원가입 중 네트워크 오류가 발생했습니다.');
      }
    }
    setIsLoading(false);
  };

  return { submit, isLoading };
};
