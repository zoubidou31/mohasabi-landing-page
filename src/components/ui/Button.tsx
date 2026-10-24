import { Link } from 'react-router-dom';
import type { AnchorHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ' +
  'disabled:opacity-55 disabled:cursor-not-allowed disabled:shadow-none';

const variants: Record<Variant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-dark shadow-[var(--shadow-card)]',
  secondary:
    'bg-surface text-primary border border-primary/30 hover:bg-primary-light hover:border-primary/50',
  ghost: 'bg-transparent text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900',
};

const sizes: Record<Size, string> = {
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonProps = CommonProps &
  (
    | { to: string; href?: never; onClick?: () => void; disabled?: boolean }
    | {
        href: string;
        target?: string;
        rel?: string;
        download?: string | boolean;
        to?: never;
        onClick?: () => void;
        disabled?: boolean;
      }
    | {
        to?: never;
        href?: never;
        onClick?: () => void;
        disabled?: boolean;
        type?: 'button' | 'submit';
        'aria-label'?: string;
        title?: string;
      }
  );

/** Single action primitive so every call to action shares one visual language. */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}) => {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if ('to' in rest && rest.to) {
    return <Link to={rest.to} className={classes}>{children}</Link>;
  }

  if ('href' in rest && rest.href) {
    const anchor = rest as Extract<typeof rest, { href: string }> & AnchorHTMLAttributes<HTMLAnchorElement>;
    const rel = anchor.target === '_blank' ? (anchor.rel ?? 'noopener noreferrer') : anchor.rel;
    return (
      <a
        href={anchor.href}
        target={anchor.target}
        rel={rel}
        download={anchor.download}
        aria-label={anchor['aria-label']}
        title={anchor.title}
        className={classes}
      >
        {children}
      </a>
    );
  }

  const button = rest as {
    onClick?: () => void;
    disabled?: boolean;
    type?: 'button' | 'submit';
    'aria-label'?: string;
    title?: string;
  };
  return (
    <button
      type={button.type ?? 'button'}
      onClick={button.onClick}
      disabled={button.disabled}
      aria-label={button['aria-label']}
      title={button.title}
      className={classes}
    >
      {children}
    </button>
  );
};
