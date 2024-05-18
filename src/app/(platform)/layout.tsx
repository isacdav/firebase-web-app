import Providers from '@/app/(platform)/providers';

interface Props {
  children: React.ReactNode;
}

const PlatformLayout = ({ children }: Props): JSX.Element => {
  return <Providers>{children}</Providers>;
};

export default PlatformLayout;
