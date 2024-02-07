import * as React from 'react';
import { cn } from '../lib/css.utils';
import { Loader2Icon } from 'lucide-react';

type Loader2IconProps = React.ComponentProps<typeof Loader2Icon>;

type LoadingSpinnerProps = Loader2IconProps & {
  size?: 'large' | 'inherit';
  className?: string;
};
const LoadingSpinner = ({ size = 'inherit', className, ...props }: LoadingSpinnerProps): React.JSX.Element => (
  <Loader2Icon className={cn('animate-spin text-primary', size === 'large' && 'h-12 w-12', className)} {...props} />
);
LoadingSpinner.displayName = 'LoadingSpinner';

export { LoadingSpinner };
