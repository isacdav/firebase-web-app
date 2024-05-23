'use client';

import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { type NextPage } from 'next';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Link, Loader } from '@/components';
import { useAuthentication, useToast } from '@/hooks';
import { resetPasswordSchema } from '@/lib/schemas/authSchemas';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/ui';

const ResetPassword: NextPage = () => {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const { toast } = useToast();
  const { resetPassword, verifyOobCode } = useAuthentication();
  const [loading, setLoading] = useState(true);
  const [isCodeValid, setIsCodeValid] = useState<Boolean>(true);

  useEffect(() => {
    const verifyAndRedirect = async () => {
      const oobCode = searchParams.get('oobCode');
      if (!oobCode) {
        return push('/forgot-password');
      }

      const isValid = await verifyOobCode(oobCode);
      setIsCodeValid(isValid);
      setLoading(false);
    };

    verifyAndRedirect();
  }, []);

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
    try {
      const password = values.password;
      const oobCode = searchParams.get('oobCode');

      await resetPassword(password, oobCode!);

      toast({
        title: 'Password reset!',
        description: 'You have successfully reset your password.',
      });

      push('/login');
    } catch (error) {
      toast({
        description: 'An error occurred. Please try again. If the error persists, request a new link.',
        variant: 'destructive',
      });
    }
  }

  if (loading) {
    return <Loader fullScreen size="lg" />;
  }

  return (
    <main>
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <a href="#" className="text-t-primary mb-6 flex items-center text-2xl font-semibold">
          Reset Password
        </a>

        {isCodeValid ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full md:w-5/12">
              <Card>
                <CardHeader>
                  <CardDescription>Enter your new password</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 md:space-y-6">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>

                <CardFooter className="flex-col">
                  <Button type="submit" fullWidth>
                    Save new password
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </Form>
        ) : (
          <Card>
            <CardHeader>
              <CardDescription>
                The link you clicked is invalid or has expired. Please request a new link to reset your password.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/forgot-password">Request new link</Link>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
};

export default ResetPassword;
