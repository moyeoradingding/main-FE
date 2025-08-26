export default function DashboardHeader() {
  return (
    <header className="mb-10 text-center md:mb-16">
      <h1 className="text-4xl font-semibold">관리자 대시보드</h1>
      <p className="mt-2 text-lg font-normal text-gray-600 max-md:hidden md:mt-3 md:block">
        Welcome, Admin!
      </p>
    </header>
  );
}
