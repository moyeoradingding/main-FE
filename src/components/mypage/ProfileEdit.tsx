import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/common/Button';
import Input from '@/components/common/input';
import { UserAvatarImage } from '@/components/common/UserAvatarImage';
import { useProfileEdit } from '@/hooks/useProfileEdit';
import {
  type ProfileEditFormValues,
  ProfileEditSchema,
} from '@/schemas/profileEditSchema';
import { useUserStore } from '@/stores/userStore';
import { toastFormErrors } from '@/utils/toastUtils';

interface ProfileEditProps {
  onCancelEdit: () => void;
  onSwitchToPasswordEdit: () => void;
}

export default function ProfileEdit({
  onCancelEdit,
  onSwitchToPasswordEdit,
}: ProfileEditProps) {
  const { user } = useUserStore();
  const { submit, isLoading } = useProfileEdit({ onCancelEdit });

  const form = useForm<ProfileEditFormValues>({
    resolver: zodResolver(ProfileEditSchema),
    defaultValues: {
      nickname: user?.nickname || '',
    },
  });

  const { register, handleSubmit } = form;

  return (
    <div className="w-full flex-1 rounded-2xl border border-gray-200 bg-white p-6 shadow-md md:p-10">
      <h2 className="mb-6 text-2xl font-semibold">프로필 수정</h2>
      <form
        onSubmit={handleSubmit(submit, toastFormErrors)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col items-center gap-4">
          <UserAvatarImage
            profileImageUrl={user?.profile_image_url}
            altText="프로필 이미지 미리보기"
            avatarSize="xl"
            className="shadow-sm"
          />
        </div>

        <Input
          type="email"
          label="이메일"
          value={user?.email || ''}
          className="text-gray-500"
          readOnly
          disabled
        />
        <Input type="text" label="닉네임" {...register('nickname')} />

        <div>
          <button
            type="button"
            className="hover:underline"
            onClick={onSwitchToPasswordEdit}
          >
            비밀번호 수정
          </button>

          <div className="mt-6 flex justify-end gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={onCancelEdit}
              disabled={isLoading}
            >
              취소
            </Button>
            <Button type="submit" disabled={isLoading}>
              저장
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
