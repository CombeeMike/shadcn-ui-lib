import * as React from 'react';
import { cn } from '../lib/css.utils.js';
import { Loader2Icon } from 'lucide-react';

type Loader2IconProps = React.ComponentProps<typeof Loader2Icon>;

type LoadingSpinnerProps = Loader2IconProps & {
  size?: 'large' | 'inherit';
  className?: string;
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'inherit', className, ...props }) => (
  <Loader2Icon className={cn('animate-spin text-primary', size === 'large' && 'h-12 w-12', className)} {...props} />
);

export { LoadingSpinner };
