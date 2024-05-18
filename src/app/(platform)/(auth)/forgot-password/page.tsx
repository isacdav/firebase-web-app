'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { type NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAuthentication } from '@/hooks';
import { forgotPasswordSchema } from '@/lib/schemas/authSchemas';
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
  const { forgotPassword } = useAuthentication();

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
    const email = values.email;

    forgotPassword(email);
  }

  return (
    <main>
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <a href="#" className="text-t-primary mb-6 flex items-center text-2xl font-semibold">
          Forgot Password
        </a>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full md:w-5/12">
            <Card>
              <CardHeader>
                <CardDescription>Enter your email address to reset your password</CardDescription>
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
              </CardContent>

              <CardFooter className="flex-col">
                <Button type="submit" fullWidth>
                  Reset Password
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default Register;
