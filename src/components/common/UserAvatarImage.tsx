import { UserIcon } from '@heroicons/react/24/solid';
import { cva } from 'class-variance-authority';
import clsx from 'clsx';
import { useState } from 'react';

const avatarSizeVariants = cva(
  'inline-block rounded-full overflow-hidden bg-fuchsia-100 text-white flex items-center justify-center',
  {
    variants: {
      size: {
        sm: 'w-8 h-8 text-xs',
        md: 'w-10 h-10 text-sm',
        lg: 'w-14 h-14 text-base',
        xl: 'w-20 h-20 text-lg',
        '2xl': 'w-28 h-28 text-xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

type UserAvatarImageProps = {
  profileImageUrl?: string | null;
  altText?: string;
  avatarSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
};

export function UserAvatarImage({
  profileImageUrl,
  altText = '사용자 프로필 이미지',
  avatarSize = 'md',
  className,
}: UserAvatarImageProps) {
  // 이미지 로드 실패 시 아이콘으로 폴백
  const [isError, setIsError] = useState(false);
  const showIconFallback = !profileImageUrl || isError;

  return (
    <div
      className={clsx(avatarSizeVariants({ size: avatarSize }), className)}
      aria-label={altText}
    >
      {showIconFallback ? (
        <div className="flex h-full w-full items-center justify-center">
          <UserIcon className="mt-2 h-3/4 w-3/4 text-fuchsia-600" />
        </div>
      ) : (
        <img
          src={profileImageUrl}
          alt={altText}
          className="h-full w-full rounded-full object-cover"
          onError={() => setIsError(true)}
        />
      )}
    </div>
  );
}
