import { type FieldErrors } from 'react-hook-form';
import { toast, type ToastOptions } from 'react-toastify';

export const showSuccessToast = (message: string, options?: ToastOptions) => {
  toast.success(message, {
    autoClose: 2000,
    hideProgressBar: false,
    position: 'top-right',
    closeOnClick: true,
    theme: 'light',
    ...options,
  });
};

export const showErrorToast = (message: string, options?: ToastOptions) => {
  toast.error(message, {
    autoClose: 2000,
    hideProgressBar: false,
    position: 'top-right',
    closeOnClick: true,
    theme: 'light',
    ...options,
  });
};

export const toastFormErrors = <T extends Record<string, any>>(
  errors: FieldErrors<T>,
) => {
  Object.values(errors).forEach((error: any) => {
    if (error && error.message) {
      showErrorToast(error.message);
    }
  });
};
