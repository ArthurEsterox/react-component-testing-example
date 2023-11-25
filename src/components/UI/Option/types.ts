import { IOption } from '../Select/types';

export interface IOptionProps {
  option: IOption;
  selected: boolean;
  onClick?: (key: any) => any;
}
