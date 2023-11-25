import { FC, useMemo, useState } from 'react';

import Option from '../Option';

import { useOutsideClick } from '../../../hooks';

import { ISelectProps } from './types';

import styles from './Select.module.scss';

const Select: FC<ISelectProps> = ({ id, placeholder, value, onChange = () => {}, disabled = false, options }) => {
  const [open, setOpen] = useState(false);

  const selectedValue = useMemo(() => {
    return options.find((option) => option.key === value);
  }, [value, options]);

  const labelId = `${id}-label`;
  const containerId = `${id}-container`;

  const handleToggle = () => {
    if (disabled) {
      return;
    }

    setOpen((prevState) => !prevState);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (key: any) => {
    handleClose();

    onChange(key);
  };

  const selectRef = useOutsideClick<HTMLDivElement>(handleClose);

  return (
    <div ref={selectRef} className={`${styles['select']} ${open ? styles['select--open'] : ''}`}>
      <span
        id={labelId}
        className={styles['select__label']}
      >
        {placeholder}
      </span>

      <button
        type="button"
        role="combobox"
        aria-labelledby={labelId}
        aria-expanded={open}
        aria-owns={containerId}
        aria-controls={containerId}
        disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        className={styles['select__button']}
        onClick={handleToggle}
      >
        <span className={styles['select__button-placeholder']}>
          {selectedValue ? selectedValue.label : placeholder}
        </span>

        <svg className={styles['select__button-arrow']} aria-hidden xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="14" height="14"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>
      </button>

      <div
        role="listbox"
        id={containerId}
        aria-labelledby={labelId}
        className={styles['select__popup']}
      >
        {!options.length && (
          <span className={styles['select__popup-empty']}>
            Empty
          </span>
        )}

        {options.map((option) => {
          return (
            <Option
              key={option.key}
              option={option}
              selected={selectedValue?.key === option.key}
              onClick={handleChange}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Select;
