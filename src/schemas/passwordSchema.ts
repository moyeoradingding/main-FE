import { z } from 'zod';

const NewPasswordObject = {
  newPassword: z
    .string()
    .min(8, { message: '비밀번호는 8자 이상 20자 이하로 입력해주세요.' })
    .max(20, { message: '비밀번호는 8자 이상 20자 이하로 입력해주세요.' })
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)/,
      '비밀번호는 영문과 숫자를 포함해야 합니다.',
    )
    .regex(/[!@#$%^&*]/, '비밀번호는 특수문자를 포함해야 합니다.'),
  confirmNewPassword: z
    .string()
    .min(1, { message: '새 비밀번호를 다시 입력해주세요.' }),
};

export const NewPasswordSchema = z
  .object(NewPasswordObject)
  .refine(data => data.newPassword === data.confirmNewPassword, {
    path: ['confirmNewPassword'],
    message: '새 비밀번호가 일치하지 않습니다.',
  });

export const PasswordChangeSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: '현재 비밀번호를 입력해주세요.' }),
    ...NewPasswordObject,
  })
  .refine(data => data.newPassword === data.confirmNewPassword, {
    path: ['confirmNewPassword'],
    message: '새 비밀번호가 일치하지 않습니다.',
  });

export type NewPasswordFormValues = z.infer<typeof NewPasswordSchema>;
export type PasswordChangeFormValues = z.infer<typeof PasswordChangeSchema>;
