import { ButtonHTMLAttributes } from 'react';

export interface ISwitchProps extends Omit<Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'>, 'onChange'> {
  value?: boolean;
  onChange?: (value: boolean) => any;
  label?: string;
}
