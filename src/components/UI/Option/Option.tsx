import { FC } from 'react';

import { IOptionProps } from './types';

import styles from './Option.module.scss';

const Option: FC<IOptionProps> = ({ option, selected, onClick = () => {} }) => {
  return (
    <button
      type="button"
      role="option"
      aria-selected={selected}
      className={styles['option']}
      disabled={option.disabled}
      tabIndex={option.disabled ? -1 : 0}
      onClick={() => onClick(option.key)}
    >
      {option.label}
    </button>
  );
};

export default Option;
