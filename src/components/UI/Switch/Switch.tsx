import { FC, MouseEventHandler } from 'react';

import { ISwitchProps } from './types';

import styles from './Switch.module.scss';

const Switch: FC<ISwitchProps> = ({ label = '', disabled = false, value = false, onChange = () => {}, onClick, className = '', ...props }) => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (onClick) {
      onClick(e);
    }

    onChange(!value);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={value}
      aria-label={label}
      tabIndex={disabled ? -1 : 0}
      disabled={disabled}
      className={`${styles['switch']} ${className}`}
      onClick={handleClick}
      {...props}
    >
      <div className={styles['switch__track']} aria-hidden />
      <div className={styles['switch__thumb']} aria-hidden />
    </button>
  );
};

export default Switch;
