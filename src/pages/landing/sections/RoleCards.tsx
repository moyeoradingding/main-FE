import { motion, useAnimation } from 'framer-motion';

import Card from '@/components/common/card';

const ROLE_CARDS = [
  {
    id: 0,
    title: '팬',
    description: '공개된 스케줄을 모아 중요 일정만 골라 알림을 받을 수 있어요.',
  },
  {
    id: 1,
    title: '매니저',
    description: '일정을 실시간으로 업데이트하고 멤버별 채팅이 가능해요.',
  },
  {
    id: 2,
    title: '아이돌',
    description: '오늘 나의 일정이 무엇인지 한눈에 확인할 수 있어요.',
  },
];

function RoleCards() {
  const controls = useAnimation();

  return (
    <div className="m-auto flex max-w-screen-xl flex-col items-center gap-24 px-4 py-60">
      <motion.h4
        animate={controls}
        initial={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.8 }}
        className="text-center text-2xl font-bold"
      >
        팬·매니저·아이돌, 딩딩이 하나로 연결해 드려요
      </motion.h4>
      <div className="flex scale-100 flex-col gap-8 sm:scale-65 sm:flex-row md:scale-78 lg:scale-100">
        {ROLE_CARDS.map(({ id, title, description }, idx) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 * (idx + 1) }}
            viewport={{ once: true, amount: 1 }}
            onViewportEnter={() => controls.start({ opacity: 1, y: 0 })}
          >
            <Card type="animation" title={title} description={description} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default RoleCards;
