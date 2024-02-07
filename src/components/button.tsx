import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import { Loader2Icon, type LucideIcon } from 'lucide-react';
import * as React from 'react';
import { cn } from '../lib/css.utils.js';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        'primary': 'bg-primary text-primary-foreground hover:bg-primary/90',
        'primary-outline': 'text-primary border border-primary/50 bg-background hover:bg-primary/20',
        'destructive': 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        'destructive-outline':
          'border border-destructive text-destructive-strong bg-background hover:bg-destructive/20 focus:bg-destructive/20',
        'outline': 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        'secondary': 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        'ghost': 'hover:bg-accent hover:text-accent-foreground',
        'ghost-primary': 'text-primary hover:bg-primary/20',
        'link': 'text-primary underline-offset-4 hover:underline',
        'round': 'rounded-full bg-primary text-primary-foreground hover:bg-primary/90',
      },
      size: {
        'default': 'h-10 px-4 py-2',
        'sm': 'h-9 rounded-md px-3',
        'lg': 'h-11 rounded-md px-8',
        'icon': 'h-10 w-10',
        'icon-sm': 'h-9 w-9',
        'icon-lg': 'h-14 w-14',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  href?: string;
  icon?: LucideIcon;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, icon, href, children, isLoading = false, disabled, ...props }, ref) => {
    const iconCls = cn({
      'h-5 w-5': size === 'lg' || size === 'icon-lg' || size === 'default' || size === 'icon',
      'h-4 w-4': size === 'sm' || size === 'icon-sm',
      'animate-spin': isLoading,
    });

    const coverContentByLoader = isLoading && !icon;
    const childs = coverContentByLoader
      ? React.Children.map(children, x => {
          // Wrap primitive values in invisible `div` as we can't make them invisible without layout shift otherwise
          const isPrimitiveValue = typeof x === 'string' || typeof x === 'number' || typeof x === 'boolean';
          if (isPrimitiveValue) return <div className="opacity-0">{x}</div>;

          // Leave all other `!ReactElement` childs untouched as we cannot overwrite their classes using `cloneElement`
          if (!React.isValidElement(x)) return x;

          // Make all childs of type `ReactElement` invisible by adding the class `opacity-0`
          const props = { className: cn(x.props.className, 'opacity-0') };
          return React.cloneElement(x, props);
        })
      : children;

    const content = (
      <>
        {icon &&
          React.createElement(isLoading ? Loader2Icon : icon, {
            className: iconCls,
          })}
        {isLoading && !icon && <Loader2Icon className={cn(iconCls, 'absolute')} />}
        {childs}
      </>
    );

    const Comp = asChild || !!href ? Slot : 'button';
    return (
      <Comp
        className={cn('flex gap-2', buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled ?? isLoading}
        {...props}
      >
        {/* TODO: How to inject the next/link here? */}
        {href ? <a href={href}>{content}</a> : content}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
