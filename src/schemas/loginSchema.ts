import { z } from 'zod';

export const LoginSchema = z.object({
  userType: z.enum(['NORMAL', 'MANAGER', 'IDOL'], {
    message: '사용자 유형을 선택해주세요.',
  }),
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
});

export type LoginFormValues = z.infer<typeof LoginSchema>;
