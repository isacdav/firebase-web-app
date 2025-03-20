import { FC, PropsWithChildren } from 'react';

import { default as NextLink } from 'next/link';

interface Props extends PropsWithChildren {
  href: string;
  className?: string;
}

export const Link: FC<Props> = ({ href, className, children }) => (
  <NextLink href={href} className={`text-sm font-medium text-primary hover:underline ${className}`}>
    {children}
  </NextLink>
);
