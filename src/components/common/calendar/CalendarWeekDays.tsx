const WEEK_DAYS: string[] = ['일', '월', '화', '수', '목', '금', '토'];

function CalendarWeekDays() {
  return (
    <>
      {WEEK_DAYS.map(weekDay => (
        <div
          key={weekDay}
          className="font-regular py-4 text-center text-sm text-gray-500"
        >
          {weekDay}
        </div>
      ))}
    </>
  );
}

export default CalendarWeekDays;
