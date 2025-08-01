import { LoadingSpinner } from '@/components/generic/spinner';
import { UnloggedWrapper } from '@/components/generic/unlogged-wrapper';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ActionStatus } from '@/models/enums';
import { useAppDispatch, useAppSelector } from '@/reducers';
import { selectCreateUserLoading } from '@/reducers/loading/selectors';
import { createUser } from '@/reducers/user/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email não é válido'),
  password: z.string().min(1, 'Password é obrigatório'),
  confirmPassword: z.string().min(1, 'Confirme sua senha')
});

export const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isCreatingUser = useAppSelector(selectCreateUserLoading);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    dispatch(createUser(values)).then((response) => {
      if (response.meta.requestStatus === 'fulfilled') {
        navigate('/login');
        form.reset();
      }
    });
  };

  const handleMoveBack = () => {
    navigate('/login');
  };

  return (
    <UnloggedWrapper
      title="Criar Conta"
      description="Preencha os campos abaixo com os seus dados de acesso"
    >
      {isCreatingUser === ActionStatus.LOADING ? (
        <LoadingSpinner size={60} />
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Digite seu nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirme sua senha"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full mt-2" variant="secondary" type="submit">
              Criar Conta
            </Button>
          </form>
        </Form>
      )}
      <Button
        className="w-full mt-2"
        variant="default"
        type="submit"
        onClick={handleMoveBack}
        disabled={isCreatingUser === ActionStatus.LOADING}
      >
        Já possuo uma conta
      </Button>
      {/* <div className="w-full flex align-center my-8">
        <div className="flex flex-1 border border-1 h-0 mt-2" />
        <Label className="flex flex-1 text-nowrap text-[12px] text-zinc-200 px-2">
          OU CONTINUE COM
        </Label>
        <div className="flex flex-1 border border-1 h-0 mt-2" />
      </div> */}
      {/* <Button className="w-full" variant="outline" type="submit">
        Google
      </Button> */}
    </UnloggedWrapper>
  );
};
