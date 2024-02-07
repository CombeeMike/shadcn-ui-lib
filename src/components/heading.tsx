import * as React from 'react';
import { cn } from '../lib/css.utils.js';

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

    const Comp =
      variant === 'h1'
        ? 'h1'
        : variant === 'h2'
        ? 'h2'
        : variant === 'h3'
        ? 'h3'
        : variant === 'h4'
        ? 'h4'
        : variant === 'h5'
        ? 'h5'
        : 'h6';

    return (
      <Comp ref={ref} className={className} {...props}>
        {children}
      </Comp>
    );
  }
);
Heading.displayName = 'Heading';

export { Heading };
