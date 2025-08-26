import { z } from 'zod';

export const ProfileEditSchema = z.object({
  nickname: z
    .string()
    .min(2, { message: '닉네임은 최소 2자 이상이어야 합니다.' })
    .max(10, { message: '닉네임은 최대 10자까지 가능합니다.' }),
});

export type ProfileEditFormValues = z.infer<typeof ProfileEditSchema>;
