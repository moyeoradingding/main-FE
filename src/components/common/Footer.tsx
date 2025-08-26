function Footer() {
  return (
    <footer className="bg-gray-50 px-6 py-14 text-sm text-gray-600 md:px-10 md:py-12">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-8">
        {/* 상단: 로고 + 링크 */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-4">
            <span className="mb-2 text-xl font-semibold text-gray-700">
              DingDing
            </span>
            <div className="flex gap-4 text-sm text-gray-600">
              <button
                type="button"
                className="hover:cursor-pointer hover:underline"
              >
                GitHub
              </button>
              <button
                type="button"
                className="hover:cursor-pointer hover:underline"
              >
                Notion
              </button>
              <button
                type="button"
                className="hover:cursor-pointer hover:underline"
              >
                API
              </button>
              <button
                type="button"
                className="hover:cursor-pointer hover:underline"
              >
                Contact
              </button>
            </div>
          </div>
        </div>

        {/* 설명 문구: 데스크탑에서만 넓게 표시 */}
        <div className="hidden md:block md:max-w-none">
          <p className="leading-relaxed text-gray-500">
            딩딩은 세 역할을 위한 맞춤형 아이돌 스케줄 관리 플랫폼입니다.
            사용자의 최애 아이돌의 하루를 놓치지 않도록 공개 스케줄을 한 번에
            정리해주고, 실시간 알림으로 소식을 전해드립니다. 매니저는 간편한
            인터페이스로 스케줄 관리의 중심을 잡습니다. 아이돌과 매니저는 1:1
            채팅을 통해 빠르게 소통하며 일정을 조율할 수 있습니다.
            <br />
            <br />
            모두의 일정이 하나로 연결되는 따뜻한 경험, 딩딩에서 만나보세요.
          </p>
        </div>

        {/* 하단 저작권 */}
        <div className="border-t pt-10 pb-2 text-center text-xs text-gray-400">
          © 2025 OZ 5팀 모여라 딩딩
        </div>
      </div>
    </footer>
  );
}

export default Footer;
