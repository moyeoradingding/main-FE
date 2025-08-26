export type MainRole = 'fan' | 'idol' | 'manager';

export type GreetingProps = {
  userRole: MainRole;
  title: string;
  subtitle?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightAction?: React.ReactNode;
  titleClassName?: string;
  subtitleClassName?: string;
  leftIconClassName?: string;
};

export type CalendarScheduleLayoutProps = {
  calendar: React.ReactNode;
  daily: React.ReactNode;
  dailyMinWidth?: number;
};
