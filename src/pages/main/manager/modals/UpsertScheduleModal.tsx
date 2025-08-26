import ScheduleFormModal from '@/components/common/modal/ScheduleFormModal';

type ScheduleFormValues = {
  title: string;
  date: string;
  time: string;
  place: string;
  description: string;
  isPublic: boolean;
};

type Props = {
  open: boolean;
  mode: 'create' | 'edit';
  onClose: () => void;
  onSubmit?: (values: ScheduleFormValues) => void | Promise<void>;
  initialValues?: Partial<ScheduleFormValues>;
  scheduleId?: number | null;
};

export default function UpsertScheduleModal({
  open,
  mode,
  onClose,
  onSubmit,
  initialValues,
  scheduleId,
}: Props) {
  const title = mode === 'create' ? '일정 등록' : '일정 수정';

  return (
    <div data-schedule-id={scheduleId ?? undefined}>
      <ScheduleFormModal
        isOpen={open}
        onClose={onClose}
        title={title}
        onSubmit={onSubmit}
        initialValues={initialValues}
      />
    </div>
  );
}
