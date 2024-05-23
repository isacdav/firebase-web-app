import { LoaderCircle } from 'lucide-react';

import { cn } from '@/lib/utils';

interface Props {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
  containerClassName?: string;
  iconClassName?: string;
}

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-12 w-12',
  lg: 'h-16 w-16',
};

export const Loader = ({ containerClassName, iconClassName, fullScreen, size = 'sm' }: Props) => {
  return (
    <div className={cn('flex items-center justify-center', fullScreen ? 'h-screen w-full' : null, containerClassName)}>
      <LoaderCircle className={cn(sizeClasses[size], 'animate-spin text-primary', iconClassName)} />
    </div>
  );
};
