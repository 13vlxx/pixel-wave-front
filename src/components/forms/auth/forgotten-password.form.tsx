import { yupResolver } from "@hookform/resolvers/yup";
import { ResetPassowrdSchema, ResetPassowrdValidationType } from "@screens/unauth/reset-password.screen";
import { AuthFormEnum } from "@utils/enums/auth-form.enum";
import { useForm } from "react-hook-form";
import { FaArrowLeftLong } from "react-icons/fa6";

interface ForgottenPasswordFormProps {
    handleChangeState: (state: AuthFormEnum) => void;
}

export const ForgottenPasswordForm = (props: ForgottenPasswordFormProps) => {
    const { handleChangeState } = props;

    const {
        register,
        handleSubmit,
        formState: { isValid },
    } = useForm<ResetPassowrdValidationType>({ resolver: yupResolver(ResetPassowrdSchema), mode: "all" })

    const onSubmit = handleSubmit((formData) => {
        console.log(formData)
    })

    return (
        <div className="flex flex-col justify-center h-[600px] text-accent md:w-1/2 md:min-w-[360px] md:h-[700px]">
            <h1 className="text-xl font-semibold">Mot de passe oublié</h1>
            <form className="flex flex-col gap-4">
                <input {...register("email")} type="email" placeholder="Adresse email" className="input input-bordered" />
                <button disabled={!isValid} onClick={onSubmit} className="btn btn-accent">Envoyer</button>
            </form>
            <div className="flex justify-between mt-2">
                <span
                    className="underline flex justify-center items-center gap-2 cursor-pointer"
                    onClick={() => handleChangeState(AuthFormEnum.LOGIN)}>
                    <FaArrowLeftLong /> Retour
                </span>
            </div>
        </div>
    )
}