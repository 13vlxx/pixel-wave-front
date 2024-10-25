import { AuthFormEnum } from "@/_utils/enums/auth-form-state.enum";
import { fieldsValidation } from "@/_utils/yup.utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthRequest from "@/stores/auth/auth.request";
import { useAuthStore } from "@/stores/auth/auth.store";
import { useUserStore } from "@/stores/user/user.store";
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
  const { setProfilePicture } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginDataValidationType>({
    resolver: yupResolver(LoginDataSchema),
    mode: "all",
    defaultValues: {
      email: "test@gmail.com",
      password: "Test1234*",
    },
  });

  const onSubmit = handleSubmit((formData) => {
    AuthRequest.loginUser(formData).then((x) => {
      login(x);
      setProfilePicture(x.user.profilePicture);
      toast.success("Connexion réussie avec succes !");
    });
  });

  return (
    <section className="flex flex-col">
      <form className="space-y-4">
        <h1 className="text-lg font-semibold">Connexion à Pixel Wave</h1>
        <div className="form-group grid grid-cols-1 gap-4">
          <div>
            <Label htmlFor="email">Adresse email</Label>
            <Input id="email" placeholder="Entrez votre adresse email" {...register("email")} />
          </div>
          <div>
            <Label htmlFor="password">Mot de passe</Label>
            <Input type="password" id="password" placeholder="•••••••••" {...register("password")} />
            <p onClick={() => handleChangeState(AuthFormEnum.FORGOTTEN_PASSWORD)} className="text-[12px] text-primary underline font-semibold">
              Mot de passe oublié ?
            </p>
          </div>
        </div>
        <Button className="w-full" onClick={onSubmit} disabled={!isValid} type="submit">
          Se connecter
        </Button>
      </form>
      <Button size={"sm"} variant={"link"} onClick={() => handleChangeState(AuthFormEnum.REGISTER)}>
        <span className="text-foreground">Pas encore de compte ?</span> Inscrivez-vous
      </Button>
    </section>
  );
};
