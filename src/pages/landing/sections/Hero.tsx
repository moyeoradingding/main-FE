import { motion } from 'framer-motion';

import { Button } from '@/components/common/Button';
import { usePageNav } from '@/hooks/usePageNav';

function Hero() {
  const { navigateToLogin } = usePageNav();

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: -30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <div className="bg-[url(@/assets/images/placeholder-lg.jpg)] bg-cover bg-center bg-no-repeat">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex flex-col items-center gap-8 bg-white/15 px-[2.5%] py-24 text-white md:p-24"
      >
        <motion.h1
          variants={item}
          className="flex flex-col gap-4 text-center text-4xl font-bold tracking-tight break-keep sm:text-5xl xl:flex-row xl:gap-0"
        >
          <span className="hidden xl:block">최애 아이돌의 스케줄,&nbsp;</span>
          <span className="block xl:hidden">최애 아이돌의 스케줄</span>
          <span>딩딩이 알려드릴게요</span>
        </motion.h1>
        <motion.div
          variants={item}
          className="text-center text-sm/7 font-medium sm:text-base/7"
        >
          <p>최애 아이돌의 스케줄이 궁금하신가요?</p>
          <p>딩딩이 최애 아이돌의 공개 스케줄을 미리 알아보고</p>
          <p>놓치지 않도록 알림으로 알려드릴게요.</p>
        </motion.div>
        <motion.div variants={item}>
          <Button
            variant="primary"
            size="lg"
            shape="pill"
            onClick={navigateToLogin}
          >
            시작하기
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Hero;
