'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { type NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Link } from '@/components';
import { useAuthentication, useToast } from '@/hooks';
import { loginSchema } from '@/lib/schemas/authSchemas';
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
  Typography,
} from '@/ui';

const Login: NextPage = () => {
  const { push } = useRouter();
  const { toast } = useToast();
  const { signin } = useAuthentication();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      const email = values.email;
      const password = values.password;

      await signin(email, password);

      toast({
        title: 'Welcome back!',
        description: 'You have successfully logged in.',
      });

      push('/profile');
    } catch (error) {
      toast({
        description: 'Wrong email or password.',
        variant: 'destructive',
      });
    }
  }

  return (
    <main>
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <Typography variant="h2" className="mb-4">
          Login
        </Typography>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full md:w-5/12">
            <Card>
              <CardHeader>
                <CardDescription>Enter your credentials</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4 md:space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="johndoe@mail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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

                <div className="flex">
                  <Link href="/forgot-password">Forgot password?</Link>
                </div>
              </CardContent>

              <CardFooter className="flex-col">
                <Button type="submit" fullWidth>
                  Sign in
                </Button>

                <Typography variant="mutedText" className="pt-4">
                  Don&apos;t have an account yet?
                  <Link href="/register" className="ml-2">
                    Sign up
                  </Link>
                </Typography>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default Login;
