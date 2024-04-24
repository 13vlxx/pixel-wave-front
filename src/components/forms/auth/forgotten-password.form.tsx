import CircleLoader from "@components/loaders/circle-loader.component";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthRequest from "@stores/auth/auth.request";
import { AuthFormEnum } from "@utils/enums/auth-form.enum";
import { fieldsValidation } from "@utils/yup.utils";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowLeftLong } from "react-icons/fa6";
import { toast } from "sonner";
import { InferType, object } from "yup";

interface ForgottenPasswordFormProps {
    handleChangeState: (state: AuthFormEnum) => void;
}

export const SendResetPassowrdSchema = object().shape({
    email: fieldsValidation.REQUIRED_EMAIL
})

export type ResetPassowrdValidationType = InferType<typeof SendResetPassowrdSchema>

export const ForgottenPasswordForm = (props: ForgottenPasswordFormProps) => {
    const { handleChangeState } = props;

    const {
        register,
        handleSubmit,
        formState: { isValid },
    } = useForm<ResetPassowrdValidationType>({ resolver: yupResolver(SendResetPassowrdSchema), mode: "all" });

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = handleSubmit((formData) => {
        setIsLoading(true); // Set loading state to true
        AuthRequest.sendRecoveryPasswordEmail(formData)
            .then(() => {
                toast.success("Email envoyé avec succès !");
            })
            .finally(() => {
                setIsLoading(false);
            });
    });

    return (
        <div className="flex flex-col justify-center h-[600px] md:w-1/2 md:min-w-[360px] md:h-[700px]">
            <h1 className="text-xl font-semibold">Mot de passe oublié</h1>
            <form className="flex flex-col gap-4">
                <input {...register("email")} type="email" placeholder="Adresse email" className="input input-bordered" />
                <button disabled={!isValid || isLoading} onClick={onSubmit} className="btn btn-accent">
                    {isLoading ? <CircleLoader /> : "Envoyer"}
                </button>
            </form>
            <div className="flex justify-between mt-2">
                <span
                    className="underline flex justify-center items-center gap-2 cursor-pointer"
                    onClick={() => handleChangeState(AuthFormEnum.LOGIN)}
                >
                    <FaArrowLeftLong /> Retour
                </span>
            </div>
        </div>
    );
};