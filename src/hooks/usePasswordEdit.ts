import axios from 'axios';
import { useState } from 'react';

import { changePassword, verifyCurrentPassword } from '@/api/userApi';
import { type NewPasswordFormValues } from '@/schemas/passwordSchema';
import { showErrorToast, showSuccessToast } from '@/utils/toastUtils';

interface UsePasswordEditProps {
  onCancelEdit: () => void;
}

export const usePasswordEdit = ({ onCancelEdit }: UsePasswordEditProps) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleVerifyPassword = async (password: string) => {
    setIsVerifying(true);
    try {
      const response = await verifyCurrentPassword(password);
      showSuccessToast(response.message || '현재 비밀번호가 확인되었습니다.');
      setIsVerified(true);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        showErrorToast(
          error.response.data.message || '비밀번호가 일치하지 않습니다.',
        );
      } else {
        showErrorToast('네트워크 오류가 발생했습니다.');
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleChangePassword = async (data: NewPasswordFormValues) => {
    setIsChanging(true);
    try {
      const response = await changePassword(
        data.newPassword,
        data.confirmNewPassword,
      );
      showSuccessToast(
        response.message || '비밀번호가 성공적으로 변경되었습니다.',
      );
      onCancelEdit();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response.data;
        let errorMessage = '비밀번호 변경에 실패했습니다.';
        if (errorData) {
          const errorKey = Object.keys(errorData)[0];
          if (errorKey && Array.isArray(errorData[errorKey])) {
            [errorMessage] = errorData[errorKey];
          }
        }
        showErrorToast(errorMessage);
      } else {
        showErrorToast('네트워크 오류가 발생했습니다.');
      }
    } finally {
      setIsChanging(false);
    }
  };

  return {
    isVerified,
    isVerifying,
    isChanging,
    handleVerifyPassword,
    handleChangePassword,
  };
};
