import dayjs, { Dayjs } from 'dayjs';
import { useMemo, useState } from 'react';

import Calendar from '@/components/common/calendar/Calendar';
import DateScheduleList from '@/components/common/dateSchedule/DateScheduleList';
import { useMyScheduleData } from '@/hooks/useMyScheduleData';

export default function MySchedule() {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [viewDate, setViewDate] = useState(dayjs());

  const { mySchedules, isLoading, isError } = useMyScheduleData();

  const monthlySchedules = useMemo(() => {
    return mySchedules.filter(schedule =>
      dayjs(schedule.startTime).isSame(viewDate, 'month'),
    );
  }, [mySchedules, viewDate]);

  const dailySchedules = useMemo(() => {
    return mySchedules.filter(schedule =>
      dayjs(schedule.startTime).isSame(selectedDate, 'day'),
    );
  }, [mySchedules, selectedDate]);

  const handleCalendarDateChange = (date: Dayjs) => {
    setSelectedDate(date);
    if (!date.isSame(viewDate, 'month')) {
      setViewDate(date);
    }
  };

  if (isLoading) {
    return <div>내 스케줄을 불러오는 중...</div>;
  }

  if (isError) {
    return <div>내 스케줄을 불러오는데 실패했습니다.</div>;
  }

  return (
    <>
      <h3 className="mb-10 hidden py-4 text-center text-3xl md:block">
        즐겨찾기한 일정
      </h3>
      <Calendar
        selectedDate={selectedDate}
        onDateChange={handleCalendarDateChange}
        schedules={monthlySchedules}
      />
      <DateScheduleList
        userRole="favorites"
        selectedDate={selectedDate.format('YYYY-MM-DD')}
        schedules={dailySchedules}
      />
    </>
  );
}
