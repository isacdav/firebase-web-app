'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { type NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Link } from '@/components';
import { useAuthentication, useToast } from '@/hooks';
import { registerSchema } from '@/lib/schemas/authSchemas';
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

const Register: NextPage = () => {
  const { push } = useRouter();
  const { toast } = useToast();
  const { register } = useAuthentication();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    try {
      const email = values.email;
      const password = values.password;

      await register(email, password);

      toast({
        title: 'Welcome!',
        description: 'You have successfully registered.',
      });

      push('/profile');
    } catch (error) {
      toast({
        description: 'An error occurred. Please try again.',
        variant: 'destructive',
      });
    }
  }

  return (
    <main>
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <a href="#" className="text-t-primary mb-6 flex items-center text-2xl font-semibold">
          Register
        </a>

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
                  Sign Up
                </Button>

                <p className="pt-4 text-sm font-light text-muted-foreground">
                  Have an account?
                  <Link href="/login" className="ml-2">
                    Sign in
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default Register;
