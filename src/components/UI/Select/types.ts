export interface ISelectProps {
  disabled?: boolean;
  value?: any;
  onChange?: (value: any) => any;
  options: IOption[];
  id: string;
  placeholder: string;
}

export interface IOption {
  key: any;
  label: string;
  disabled?: boolean;
}
