'use client';

import { type NextPage } from 'next';

import { useAuthContext } from '@/context/authContext';
import { useAuthentication } from '@/hooks';
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Typography } from '@/ui';

const ProfilePage: NextPage = () => {
  const { signout } = useAuthentication();
  const { user } = useAuthContext();

  const onSignOut = () => {
    signout();
  };

  return (
    <main className="mx-10 h-screen pt-[4vh]">
      <Typography variant="h2" className="mb-4">
        Profile
      </Typography>

      <Card className="md:w-6/12">
        <CardHeader>
          <CardTitle>Your personal information</CardTitle>
          <CardDescription>Soon you will be able to update your personal information here</CardDescription>
        </CardHeader>

        <CardContent>
          <Typography variant="mutedText">
            Name:
            <Typography className="ml-2" variant="smallText">
              {user?.displayName}
            </Typography>
          </Typography>

          <Typography variant="mutedText">
            Email:
            <Typography className="ml-2" variant="smallText">
              {user?.email}
            </Typography>
          </Typography>

          <Typography variant="mutedText">
            Phone number:
            <Typography className="ml-2" variant="smallText">
              {user?.phoneNumber}
            </Typography>
          </Typography>
        </CardContent>

        <CardFooter>
          <Button variant="outline" onClick={onSignOut}>
            Sign out
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
};

export default ProfilePage;
