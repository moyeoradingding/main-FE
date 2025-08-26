import { Button } from '@/components/common/Button';

import { ADMIN_BUTTON_WRAP, ADMIN_SECTION, ADMIN_TITLE } from './adminStyles';

type Props = { onOpenMembers: () => void };

export default function MemberActions({ onOpenMembers }: Props) {
  return (
    <section className={ADMIN_SECTION}>
      <h3 className={`${ADMIN_TITLE} mb-4 md:mt-6 md:mb-2`}>회원 관리</h3>
      <div className={`${ADMIN_BUTTON_WRAP} md:mt-10`}>
        <Button
          variant="primary"
          shape="pill"
          size="lg"
          onClick={onOpenMembers}
        >
          회원 목록 조회
        </Button>
      </div>
    </section>
  );
}
