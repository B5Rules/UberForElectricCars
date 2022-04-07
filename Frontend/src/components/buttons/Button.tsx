import React from 'react';
import cx from 'classnames';

import styles from './Button.module.css';

export type ButtonTheme = 'default' | 'primary' | 'secondary';

export type ButtonSize = 'md' | 'sm' | 'text';

export const DEFAULT_THEME = 'default';
export const DEFAULT_SIZE = 'md';

export type ButtonProps = {
  className?: string;
  theme?: ButtonTheme;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconEnd?: React.ReactNode;
  disabled?: boolean;
  underlined?: boolean;
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      icon,
      iconEnd,
      size = DEFAULT_SIZE,
      theme = DEFAULT_THEME,
      disabled,
      underlined,
      ...props
    },
    ref,
  ) => (
    <button
      type="button"
      ref={ref}
      className={cx(
        styles[size],
        {
          [styles.hasIcon]: icon || iconEnd,
          [styles.button]: !underlined,
          [styles[theme]]: !underlined,
          [styles['underlined-button']]: underlined,
          [styles[`underlined-${theme}`]]: underlined,
        },
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {icon}
      {children}
      {iconEnd}
    </button>
  ),
);
