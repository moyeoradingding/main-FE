import { ClockIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef, useState } from 'react';

import { useClickOutside } from '@/hooks/useClickOutside';

import DefaultInput from './DefaultInput';
import { iconStyle, timeStyle } from './input.styles';
import type { InputProps } from './input.types';

// 'HH:mm' → {h, m}
function splitHm(v?: string | number | readonly string[]) {
  if (!v || typeof v !== 'string')
    return { h: null as string | null, m: null as string | null };
  const [h, m] = v.split(':');
  return { h: h ?? null, m: m ?? null };
}

function TimeInput({ label, className, ...rest }: InputProps) {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const { h: initH, m: initM } = splitHm(rest.value as string);

  const [selectedHour, setSelectedHour] = useState<string | null>(initH);
  const [selectedMinute, setSelectedMinute] = useState<string | null>(initM);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, setIsFocus);

  useEffect(() => {
    const { h, m } = splitHm(rest.value as string);
    setSelectedHour(h);
    setSelectedMinute(m);
  }, [rest.value]);

  // 부모로 'HH:mm' 전달
  function emitChange(nextH: string | null, nextM: string | null) {
    if (nextH == null || nextM == null) return;
    const hh = nextH.padStart(2, '0');
    const mm = nextM.padStart(2, '0');
    const val = `${hh}:${mm}`;
    rest.onChange?.({
      target: { value: val },
      currentTarget: { value: val },
    } as unknown as React.ChangeEvent<HTMLInputElement>);
  }

  const display =
    selectedHour || selectedMinute
      ? `${selectedHour ? selectedHour.padStart(2, '0') : '__'} : ${selectedMinute ? selectedMinute.padStart(2, '0') : '__'}`
      : '';

  return (
    <div ref={ref} className="relative">
      <DefaultInput
        onClick={() => setIsFocus(true)}
        value={display}
        readOnly
        type="text"
        label={label}
        className={className}
        {...rest}
      />
      <ClockIcon className={iconStyle} />
      {isFocus && (
        <div className="flex w-full justify-center">
          <div className="absolute z-100 flex w-fit gap-[8px] bg-white p-5 shadow-lg">
            <div className="flex flex-col gap-[4px]">
              <span className="text-base font-medium text-gray-700">Hour</span>
              <input
                type="number"
                min={0}
                max={23}
                className={timeStyle}
                value={selectedHour ?? ''}
                onChange={e => {
                  const next = e.target.value;
                  setSelectedHour(next);
                  emitChange(next, selectedMinute);
                }}
              />
            </div>
            <div className="flex flex-col gap-[4px]">
              <span className="text-base font-medium text-gray-700">
                Minute
              </span>
              <input
                type="number"
                min={0}
                max={59}
                value={selectedMinute ?? ''}
                onChange={e => {
                  const next = e.target.value;
                  setSelectedMinute(next);
                  emitChange(selectedHour, next);
                }}
                className={timeStyle}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TimeInput;
