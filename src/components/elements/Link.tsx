import { default as NextLink } from 'next/link';

type Props = {
  href: string;
  className?: string;
  children: React.ReactNode;
};

export const Link = ({ href, className, children }: Props) => (
  <NextLink href={href} className={`text-sm font-medium text-primary hover:underline ${className}`}>
    {children}
  </NextLink>
);
