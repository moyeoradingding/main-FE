import type { CalendarScheduleLayoutProps } from '../types';

function CalendarScheduleLayout({
  calendar,
  daily,
  dailyMinWidth = 420,
}: CalendarScheduleLayoutProps) {
  return (
    <section className="grid grid-cols-1 gap-10 md:gap-14 lg:mb-10 lg:grid-cols-[5fr_4fr] lg:items-start">
      <div className="w-full min-w-0">
        <div className="w-full rounded-2xl bg-white text-sm">{calendar}</div>
      </div>
      <div className="w-full min-w-0">
        <div
          className="w-full rounded-2xl bg-white"
          style={{ minWidth: `${dailyMinWidth}px` }}
        >
          {daily}
        </div>
      </div>
    </section>
  );
}

export default CalendarScheduleLayout;
