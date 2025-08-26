import { useCallback, useEffect, useMemo, useState } from 'react';

import { Button } from '../Button';
import Input from '../input';
import ToggleButton from '../ToggleButton';
import Modal from './Modal';

interface ScheduleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  initialValues?: {
    title?: string;
    date?: string; // YYYY-MM-DD
    time?: string; // HH:mm
    place?: string;
    description?: string;
    isPublic?: boolean;
  };
  onSubmit?: (form: {
    title: string;
    date: string;
    time: string;
    place: string;
    description: string;
    isPublic: boolean;
  }) => void | Promise<void>;
}

export default function ScheduleFormModal({
  isOpen,
  onClose,
  title,
  initialValues,
  onSubmit,
}: ScheduleFormModalProps) {
  const EMPTY = useMemo(
    () => ({
      title: '',
      date: '',
      time: '',
      place: '',
      description: '',
      isPublic: false,
    }),
    [],
  );

  const [values, setValues] = useState(EMPTY);

  useEffect(() => {
    if (!isOpen) return;
    setValues({ ...EMPTY, ...initialValues });
  }, [isOpen, initialValues, EMPTY]);

  const handleSave = useCallback(async () => {
    if (!values.title.trim()) {
      // eslint-disable-next-line no-console
      console.warn('제목을 입력해 주세요.');
      return;
    }
    if (!values.date || !values.time) {
      // eslint-disable-next-line no-console
      console.warn('날짜와 시간을 입력해 주세요.');
      return;
    }
    try {
      await onSubmit?.(values);
      onClose();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('저장 중 오류가 발생했습니다.', err);
    }
  }, [values, onSubmit, onClose]);

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues(s => ({ ...s, title: e.target.value }));
    },
    [],
  );

  const handleDateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues(s => ({ ...s, date: e.target.value }));
    },
    [],
  );

  const handleTimeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues(s => ({ ...s, time: e.target.value }));
    },
    [],
  );

  const handlePlaceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues(s => ({ ...s, place: e.target.value }));
    },
    [],
  );

  const handleDescriptionChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValues(s => ({ ...s, description: e.target.value }));
    },
    [],
  );

  const handleToggleChange = useCallback((next: boolean) => {
    setValues(s => ({ ...s, isPublic: next }));
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="flex w-full flex-col gap-3">
        <Input
          type="text"
          label="제목"
          value={values.title}
          onChange={handleTitleChange}
        />
        <Input
          type="date"
          label="날짜"
          value={values.date}
          onChange={handleDateChange}
        />
        <Input
          type="time"
          label="시간"
          value={values.time}
          onChange={handleTimeChange}
        />
        <Input
          type="text"
          label="장소"
          value={values.place}
          onChange={handlePlaceChange}
        />
        <Input
          type="textarea"
          label="설명"
          value={values.description}
          onChange={handleDescriptionChange}
        />

        <div className="mt-1 mr-[2px] flex items-center justify-between">
          <p>공개 여부</p>
          <ToggleButton
            checked={values.isPublic}
            onChange={handleToggleChange}
          />
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <Button onClick={handleSave}>저장하기</Button>
      </div>
    </Modal>
  );
}
