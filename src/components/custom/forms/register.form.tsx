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
        <h1>Inscription</h1>
        <div className="form-group grid grid-cols-2 gap-4">
          <Input type="email" placeholder="Entrez votre email" {...register("email")} />
          <Input type="text" placeholder="Nom d'utilisateur" {...register("pseudo")} />
          <Input className="col-span-2" type="password" placeholder="Mot de passe" {...register("password")} />
        </div>
        <Button className="w-full" onClick={onSubmit} disabled={!isValid} type="submit">
          Se connecter
        </Button>
      </form>
      <Button size={"sm"} variant={"link"} onClick={() => handleChangeState(AuthFormEnum.LOGIN)}>
        Déjà inscrit ? Connectez-vous !
      </Button>
    </section>
  );
};
