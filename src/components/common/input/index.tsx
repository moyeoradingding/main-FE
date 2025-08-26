import DateInput from './DateInput';
import DefaultInput from './DefaultInput';
import type { FieldTypes, InputProps, TextAreaProps } from './input.types';
import PasswordInput from './PasswordInput';
import TextArea from './TextArea';
import TimeInput from './TimeInput';

const InputMap: Record<FieldTypes, React.ComponentType<any>> = {
  text: DefaultInput,
  email: DefaultInput,
  password: PasswordInput,
  date: DateInput,
  time: TimeInput,
  textarea: TextArea,
};

type FieldProps = InputProps | TextAreaProps;

export default function Input({ type = 'text', ...props }: FieldProps) {
  const Component = InputMap[type];
  return <Component {...props} />;
}
