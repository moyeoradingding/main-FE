import { Button } from '@/components/common/Button';

import { ADMIN_BUTTON_WRAP, ADMIN_SECTION, ADMIN_TITLE } from './adminStyles';

type Props = {
  onCreateIdol: () => void;
  onCreateManager: () => void;
};

export default function AccountActions({
  onCreateIdol,
  onCreateManager,
}: Props) {
  return (
    <section className={ADMIN_SECTION}>
      <h3 className={`${ADMIN_TITLE} mb-4 whitespace-nowrap md:mt-6 md:mb-6`}>
        아이돌/ 매니저 계정 생성
      </h3>

      <div className={ADMIN_BUTTON_WRAP}>
        <Button variant="primary" shape="pill" size="lg" onClick={onCreateIdol}>
          아이돌 계정 생성
        </Button>
        <Button
          variant="primary"
          shape="pill"
          size="lg"
          onClick={onCreateManager}
        >
          매니저 계정 생성
        </Button>
      </div>
    </section>
  );
}
