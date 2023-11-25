import { HTMLProps, PropsWithChildren } from 'react';

export interface ITooltipProps extends PropsWithChildren, HTMLProps<HTMLDivElement> {
  tooltip: string;
  trigger?: TooltipTriggerType;
  className?: string;
}

export type TooltipTriggerType = 'hover' | 'click';
