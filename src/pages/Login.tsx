import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { Button } from '@/components/common/Button';
import Input from '@/components/common/input';
import Select from '@/components/common/Select';
import { GoogleIcon, KakaoIcon } from '@/components/SocialIcons';
import { useLogin } from '@/hooks/useLogin';
import { type LoginFormValues, LoginSchema } from '@/schemas/loginSchema';
import { toastFormErrors } from '@/utils/toastUtils';

const USER_TYPE = [
  { id: 'NORMAL', label: '일반 회원 (팬)' },
  { id: 'MANAGER', label: '매니저' },
  { id: 'IDOL', label: '아이돌' },
];

export default function Login() {
  const { submit, isLoading } = useLogin();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { register } = form;

  return (
    <div className="flex flex-col gap-2">
      <div>
        <h1 className="mb-1 text-xl font-bold">로그인</h1>
        <p>사용자 유형을 선택하고, 이메일과 비밀번호를 입력해주세요.</p>
      </div>

      <form
        onSubmit={form.handleSubmit(submit, toastFormErrors)}
        className="flex flex-col gap-2"
      >
        <Controller
          name="userType"
          control={form.control}
          render={({ field: { onChange, value } }) => (
            <Select
              className="mt-8"
              list={USER_TYPE}
              placeholder="사용자 유형"
              value={value}
              onChange={onChange}
            />
          )}
        />

        <Input type="email" label="이메일" {...register('email')} />

        <Input type="password" label="비밀번호" {...register('password')} />

        <div className="my-8 flex flex-col gap-4">
          <Button
            type="submit"
            size="lg"
            className="w-full font-semibold"
            disabled={isLoading}
          >
            로그인
            <ChevronRightIcon className="ml-2 w-5 md:block" />
          </Button>
          <Button
            variant="white"
            size="lg"
            className="w-full border-1 border-gray-300 bg-white font-semibold"
          >
            <GoogleIcon className="absolute left-4" />
            Google로 시작하기
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="bg-kakao-yellow hover:bg-kakao-hover w-full font-semibold"
          >
            <KakaoIcon className="absolute left-4" />
            Kakao로 시작하기
          </Button>
        </div>
      </form>

      <p>
        DingDing 회원이 아니신가요?
        <Link
          to="/auth/register"
          className="block cursor-pointer font-semibold hover:underline md:ml-2 md:inline"
        >
          지금 가입하세요。
        </Link>
      </p>
    </div>
  );
}
