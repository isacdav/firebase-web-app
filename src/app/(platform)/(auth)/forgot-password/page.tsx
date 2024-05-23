'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { type NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAuthentication, useToast } from '@/hooks';
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
  Typography,
} from '@/ui';

const ForgotPassword: NextPage = () => {
  const { push } = useRouter();
  const { toast } = useToast();
  const { forgotPassword } = useAuthentication();

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
    try {
      const email = values.email;

      await forgotPassword(email);

      toast({
        title: 'Check your email!',
        description: 'We have sent you a link to reset your password.',
      });

      push('/login');
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
        <Typography variant="h2" className="mb-4">
          Forgot Password
        </Typography>

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

export default ForgotPassword;
