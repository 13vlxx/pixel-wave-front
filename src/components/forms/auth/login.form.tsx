import { yupResolver } from "@hookform/resolvers/yup";
import AuthRequest from "@stores/auth/auth.request";
import { useAuthStore } from "@stores/auth/auth.store";
import { AuthFormEnum } from "@utils/enums/auth-form.enum";
import { useResponsive } from "@utils/useResponsive";
import { fieldsValidation } from "@utils/yup.utils";
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
  const { isMobile } = useResponsive();

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

  if (isMobile)
    return (
      <div className="flex flex-col justify-center h-[600px]">
        <h1 className="text-xl font-semibold">Se connecter</h1>
        <form className="flex flex-col gap-4">
          <input
            {...register("email")}
            placeholder="Adresse email"
            type="text"
            className="input input-bordered"
          />
          <input
            {...register("password")}
            placeholder="Mot de passe"
            type="password"
            className="input input-bordered"
          />
          <button
            type="submit"
            disabled={!isValid}
            onClick={onSubmit}
            className="btn btn-outline btn-accent"
          >
            Se connecter
          </button>
        </form>
        <div className="flex justify-between mt-2">
          <span
            className="underline cursor-pointer"
            onClick={() => handleChangeState(AuthFormEnum.REGISTER)}
          >
            Pas de compte ?
          </span>
          <span
            className="underline cursor-pointer"
            onClick={() => handleChangeState(AuthFormEnum.FORGOTTEN_PASSWORD)}
          >
            Mot de passe oublié ?
          </span>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col justify-center w-1/2 min-w-[360px] pr-2 h-[700px]">
      <h1 className="text-xl font-semibold">Se connecter</h1>
      <form className="flex flex-col gap-4">
        <input
          {...register("email")}
          placeholder="Adresse email"
          type="text"
          className="input input-bordered"
        />
        <input
          {...register("password")}
          placeholder="Mot de passe"
          type="password"
          className="input input-bordered"
        />
        <button
          type="submit"
          disabled={!isValid}
          onClick={onSubmit}
          className="btn btn-outline btn-accent"
        >
          Se connecter
        </button>
      </form>
      <div className="flex justify-between mt-2">
        <span
          data-cy="register"
          className="underline cursor-pointer"
          onClick={() => handleChangeState(AuthFormEnum.REGISTER)}
        >
          Pas de compte ?
        </span>
        <span
          data-cy="forgotten-password"
          className="underline cursor-pointer"
          onClick={() => handleChangeState(AuthFormEnum.FORGOTTEN_PASSWORD)}
        >
          Mot de passe oublié ?
        </span>
      </div>
    </div>
  );
};
