import { cn } from '../lib/css.utils.js';
import * as React from 'react';

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className: classNameProp, variant, children, ...props }, ref) => {
    const className = cn(
      'mt-2 text-foreground',
      variant === 'h1' && 'text-3xl font-extrabold mt-4 mb-3',
      variant === 'h2' && 'text-2xl font-bold mt-3 mb-2',
      variant === 'h3' && 'text-xl font-bold',
      variant === 'h4' && 'text-lg font-bold',
      variant === 'h5' && 'text-lg font-bold',
      variant === 'h6' && 'text-lg font-bold',
      classNameProp
    );
    const Tag = variant;

    return (
      <Tag ref={ref} className={className} {...props}>
        {children}
      </Tag>
    );
  }
);
Heading.displayName = 'Heading';

export { Heading };
