import { z } from 'zod';

export const RegisterSchema = z
  .object({
    email: z.string().email({ message: '올바른 이메일 형식이 아닙니다.' }),
    password: z
      .string()
      .min(8, { message: '비밀번호는 8자 이상 20자 이하로 입력해주세요.' })
      .max(20, { message: '비밀번호는 8자 이상 20자 이하로 입력해주세요.' })
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)/,
        '비밀번호는 영문과 숫자를 포함해야 합니다.',
      )
      .regex(/[!@#$%^&*]/, '비밀번호는 특수문자를 포함해야 합니다.'),
    confirmPassword: z.string(),
    nickname: z
      .string()
      .min(2, { message: '닉네임은 2자 이상 10자 이하로 입력해주세요.' })
      .max(10, { message: '닉네임은 2자 이상 10자 이하로 입력해주세요.' }),
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: '비밀번호가 일치하지 않습니다.',
  });

export type RegisterFormValues = z.infer<typeof RegisterSchema>;
