import { Label } from "@/components/ui/label";
import bigLogo from "../../assets/big-logo.png";
import bgHouse from "../../assets/smart-home-bg-concept.png";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  email: z.string().email("Email não é válido"),
  password: z.string().min(1, "Password é obrigatório"),
});
export const Login = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div className="flex flex-1 w-full">
      <div className="flex w-full">
        <img
          src={bgHouse}
          alt="House Manager Logo"
          className="object-fit w-full"
        />
        <img
          src={bigLogo}
          alt="House Manager Logo"
          className="absolute left-1/3 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <div className="min-w-[25%] p-[56px] flex flex-col justify-center">
        <div className="flex gap-1 flex-col mb-2">
          <Label className="text-[32px] text-white">Login</Label>
          <Label className="text-[14px] text-white">
            Preencha os campos abaixo com os seus dados de acesso
          </Label>
        </div>
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
        <Button className="w-full mt-2" variant="default" type="submit">
          Criar minha conta
        </Button>
        <div className="w-full flex align-center my-8">
          <div className="flex flex-1 border border-1 h-0 mt-2" />
          <Label className="flex flex-1 text-nowrap text-[12px] text-white px-2">
            OU CONTINUE COM
          </Label>
          <div className="flex flex-1 border border-1 h-0 mt-2" />
        </div>
        <Button className="w-full" variant="default" type="submit">
          Google
        </Button>
      </div>
    </div>
  );
};
