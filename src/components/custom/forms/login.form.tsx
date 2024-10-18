import { AuthFormEnum } from "@/_utils/enums/auth-form-state.enum";
import { fieldsValidation } from "@/_utils/yup.utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthRequest from "@/stores/auth/auth.request";
import { useAuthStore } from "@/stores/auth/auth.store";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { InferType, object } from "yup";

interface LoginFormProps {
  handleChangeState: (state: AuthFormEnum) => void;
}

const LoginDataSchema = object().shape({
  email: fieldsValidation.REQUIRED_EMAIL,
  password: fieldsValidation.REQUIRED_PASSWORD,
});

export type LoginDataValidationType = InferType<typeof LoginDataSchema>;

export const LoginForm = (props: LoginFormProps) => {
  const { handleChangeState } = props;
  const { login } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginDataValidationType>({
    resolver: yupResolver(LoginDataSchema),
    mode: "all",
    defaultValues: {
      email: "test@gmail.com",
      password: "Test1234**",
    },
  });

  const onSubmit = handleSubmit((formData) => {
    AuthRequest.loginUser(formData).then((x) => {
      login(x);
      toast.success("Connexion réussie avec succes !");
    });
  });

  return (
    <section className="flex flex-col">
      <form className="space-y-4">
        <h1>Connexion à Pixel Wave</h1>
        <div className="form-group grid grid-cols-2 gap-4">
          <Input type="email" placeholder="Entrez votre email" {...register("email")} />
          <Input type="password" placeholder="Mot de passe" {...register("password")} />
        </div>
        <Button className="w-full" onClick={onSubmit} disabled={!isValid} type="submit">
          Se connecter
        </Button>
      </form>
      <Button size={"sm"} variant={"link"} onClick={() => handleChangeState(AuthFormEnum.REGISTER)}>
        Pas encore de compte ? Inscrivez-vous
      </Button>
      <Button size={"sm"} variant={"link"} onClick={() => handleChangeState(AuthFormEnum.FORGOTTEN_PASSWORD)}>
        Mot de passe oublié ?
      </Button>
    </section>
  );
};
