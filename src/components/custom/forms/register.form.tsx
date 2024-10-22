import { AuthFormEnum } from "@/_utils/enums/auth-form-state.enum";
import { fieldsValidation } from "@/_utils/yup.utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthRequest from "@/stores/auth/auth.request";
import { useAuthStore } from "@/stores/auth/auth.store";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { InferType, object } from "yup";

interface RegisterFormProps {
  handleChangeState: (state: AuthFormEnum) => void;
}

const RegisterDataSchema = object().shape({
  email: fieldsValidation.REQUIRED_EMAIL,
  pseudo: fieldsValidation.REQUIRED_STRING,
  password: fieldsValidation.REQUIRED_PASSWORD,
});

export type RegisterDataValidationType = InferType<typeof RegisterDataSchema>;

export const RegisterForm = (props: RegisterFormProps) => {
  const { handleChangeState } = props;
  const { login } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<RegisterDataValidationType>({ resolver: yupResolver(RegisterDataSchema), mode: "all" });

  const onSubmit = handleSubmit((formData) => {
    AuthRequest.registerUser(formData).then(() => {
      const { email, password } = formData;
      AuthRequest.loginUser({ email, password }).then((x) => {
        login(x);
        toast.success("Inscription réussie avec succes !");
      });
    });
  });

  return (
    <section className="flex flex-col">
      <form className="space-y-4">
        <h1 className="text-lg font-semibold">Inscription sur Pixel Wave</h1>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label htmlFor="email">Adresse email</Label>
            <Input id="email" type="email" placeholder="Entrez votre email" {...register("email")} />
          </div>
          <div>
            <Label htmlFor="username">Nom d'utilisateur</Label>
            <Input id="username" type="text" placeholder="Entrez votre nom d'utilisateur" {...register("pseudo")} />
          </div>
          <div>
            <Label htmlFor="password">Mot de passe</Label>
            <Input id="password" type="password" placeholder="Entrez votre mot de passe" {...register("password")} />
            <p className="text-[12px] text-muted-foreground">
              Le mot de passe doit contenir au moins 8 caractères, 1 majuscule, 1 chiffre et un caractère special.
            </p>
          </div>
        </div>
        <Button className="w-full" onClick={onSubmit} disabled={!isValid} type="submit">
          Se connecter
        </Button>
      </form>
      <Button size={"sm"} variant={"link"} onClick={() => handleChangeState(AuthFormEnum.LOGIN)}>
        <span className="text-foreground">Déjà inscrit ?</span> Connectez-vous !
      </Button>
    </section>
  );
};
