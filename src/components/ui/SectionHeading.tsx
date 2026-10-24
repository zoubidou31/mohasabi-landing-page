import type { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  titleId: string;
  subtitle?: string;
  align?: 'start' | 'center';
  tone?: 'light' | 'inverse';
  children?: ReactNode;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  titleId,
  subtitle,
  align = 'center',
  tone = 'light',
  children,
}) => {
  const inverse = tone === 'inverse';
  return (
    <header
      className={`${align === 'center' ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl'} mb-10 md:mb-12`}
    >
      {eyebrow ? (
        <p
          className={`badge mb-4 ${
            inverse ? 'bg-white/10 text-primary-light' : 'bg-primary/10 text-primary'
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={titleId}
        className={`text-section font-bold text-balance ${
          inverse ? 'text-white' : 'text-neutral-900'
        }`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`mt-4 text-lead leading-relaxed ${
            inverse ? 'text-white/75' : 'text-neutral-600'
          }`}
        >
          {subtitle}
        </p>
      ) : null}
      {children}
    </header>
  );
};
