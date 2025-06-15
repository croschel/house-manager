import { Label } from '@/components/ui/label';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UnloggedWrapper } from '@/components/generic/unlogged-wrapper';
import { useNavigate } from 'react-router-dom';
import { PageType } from '@/models/enums/pages';
import { useAppDispatch } from '@/reducers';
import { login } from '@/reducers/user/actions';

const formSchema = z.object({
  email: z.string().email('Email não é válido'),
  password: z.string().min(1, 'Password é obrigatório')
});
export const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    dispatch(login(values)).then((action) => {
      if (login.fulfilled.match(action)) {
        navigate(PageType.ExpenseControl);
      }
    });
  };

  const handleCreateAccount = () => {
    navigate(PageType.SignUp);
  };

  return (
    <UnloggedWrapper
      title="Login"
      description="Preencha os campos abaixo com os seus dados de acesso"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Digite seu email" {...field} />
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
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Digite sua senha"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full mt-2" variant="secondary" type="submit">
            Acessar
          </Button>
        </form>
      </Form>
      <Button
        className="w-full mt-2"
        variant="default"
        type="submit"
        onClick={handleCreateAccount}
      >
        Criar minha conta
      </Button>
      <div className="w-full flex align-center my-8">
        <div className="flex flex-1 border border-1 h-0 mt-2" />
        <Label className="flex flex-1 text-nowrap text-[12px] text-zinc-200 px-2">
          OU CONTINUE COM
        </Label>
        <div className="flex flex-1 border border-1 h-0 mt-2" />
      </div>
      <Button className="w-full" variant="outline" type="submit">
        Google
      </Button>
    </UnloggedWrapper>
  );
};
