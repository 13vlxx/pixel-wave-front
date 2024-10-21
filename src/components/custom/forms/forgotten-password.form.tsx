import { AuthFormEnum } from "@/_utils/enums/auth-form-state.enum";
import { fieldsValidation } from "@/_utils/yup.utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthRequest from "@/stores/auth/auth.request";
import { yupResolver } from "@hookform/resolvers/yup";
import { LucideLoader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { InferType, object } from "yup";

interface ForgottenPasswordFormProps {
  handleChangeState: (state: AuthFormEnum) => void;
}

export const SendResetPassowrdSchema = object().shape({
  email: fieldsValidation.REQUIRED_EMAIL,
});

export type ResetPassowrdValidationType = InferType<typeof SendResetPassowrdSchema>;

export const ForgottenPasswordForm = (props: ForgottenPasswordFormProps) => {
  const { handleChangeState } = props;

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<ResetPassowrdValidationType>({ resolver: yupResolver(SendResetPassowrdSchema), mode: "all" });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = handleSubmit((formData) => {
    setIsLoading(true);
    AuthRequest.sendRecoveryPasswordEmail(formData)
      .then(() => {
        toast.success("Email envoyé avec succès !");
      })
      .finally(() => {
        setIsLoading(false);
      });
  });

  return (
    <section className="flex flex-col">
      <form className="space-y-4">
        <h1 className="text-lg font-semibold">Mot de passe oublié</h1>
        <div className="form-group grid grid-cols-1 gap-4">
          <Input type="email" placeholder="Adresse email" {...register("email")} />
        </div>
        <Button className="w-full" onClick={onSubmit} disabled={!isValid} type="submit">
          {isLoading ? <LucideLoader2 className="animate-spin" /> : "Recevoir l'email de récupération"}
        </Button>
      </form>
      <Button size={"sm"} variant={"link"} onClick={() => handleChangeState(AuthFormEnum.LOGIN)}>
        Déjà inscrit ? Connectez-vous !
      </Button>
    </section>
  );
};
