import { FC, MouseEventHandler, useRef, useState } from 'react';

import { useMedia, useOutsideClick } from '../../../hooks';

import { ITooltipProps } from './types';

import styles from './Tooltip.module.scss';

const Tooltip: FC<ITooltipProps> = ({ tooltip, trigger = 'hover', children, className = '', onClick, ...props }) => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({
    top: '0px',
    left: '0px',
  });

  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const isTouchScreen = useMedia('(pointer: coarse)');

  const isClickTrigger = isTouchScreen || trigger === 'click';

  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (onClick) {
      onClick(e);
    }

    if (!isClickTrigger) {
      return;
    }

    handleToggle();
  };

  const handleMouseEnter = () => {
    if (isClickTrigger) {
      return;
    }

    handleOpen();
  };

  const handleMouseLeave = () => {
    if (isClickTrigger) {
      return;
    }

    handleClose();
  };

  const handleOpen = () => {
    if (open) {
      return;
    }

    const tooltipWrapper = tooltipWrapperRef.current;
    const tooltipElement = tooltipRef.current;

    if (!tooltipWrapper || !tooltipElement) {
      return;
    }

    const rect = tooltipWrapper.getBoundingClientRect();
    const tooltipStyles = getComputedStyle(tooltipElement);
    const tooltipWidth = parseFloat(tooltipStyles.width);
    const tooltipHeight = parseFloat(tooltipStyles.height);

    setPosition({
      left: `${rect.left + (rect.width / 2) - (tooltipWidth / 2)}px`,
      top: `${rect.top - tooltipHeight}px`,
    });

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    if (open) {
      handleClose();
    } else {
      handleOpen();
    }
  };

  const tooltipWrapperRef = useOutsideClick<HTMLDivElement>(() => {
    if (isClickTrigger) {
      handleClose();
    }
  });

  return (
    <div
      {...props}
      className={`${styles['tooltip-wrapper']} ${className}`}
      ref={tooltipWrapperRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {children}

      <div
        ref={tooltipRef}
        role="tooltip"
        style={{ top: position.top, left: position.left }}
        className={`${styles['tooltip']} ${open ? styles['tooltip--open'] : ''}`}
      >
        <div className={styles['tooltip__content']}>
          {tooltip}
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
