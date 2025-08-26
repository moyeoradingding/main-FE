export type FieldTypes =
  | 'text'
  | 'email'
  | 'password'
  | 'date'
  | 'time'
  | 'textarea';

interface BaseFieldProps {
  type?: FieldTypes;
  label: string;
}

export interface InputProps
  extends BaseFieldProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {}

export interface TextAreaProps
  extends BaseFieldProps,
    React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
