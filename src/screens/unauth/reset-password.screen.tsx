import { yupResolver } from "@hookform/resolvers/yup";
import { fieldsValidation } from "@utils/yup.utils";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { InferType, object } from "yup";

export const ResetPassowrdSchema = object().shape({
    email: fieldsValidation.REQUIRED_EMAIL
})

export type ResetPassowrdValidationType = InferType<typeof ResetPassowrdSchema>

const ResetPasswordScreen = () => {
    const {
        register,
        handleSubmit,
        formState: { isValid },
    } = useForm<ResetPassowrdValidationType>({ resolver: yupResolver(ResetPassowrdSchema), mode: "all" })

    const onSubmit = handleSubmit((formData) => {
        toast(formData.email)
    })

    return (
        <div className="flex flex-col justify-center h-[600px] mx-auto text-accent md:max-w-md">
            <h1 className="text-xl font-semibold self-center pb-4">Réinitialisation du mot de passe</h1>
            <form className="flex flex-col gap-4">
                <input {...register("email")} placeholder="Adresse email" type="text" className="input input-bordered" />
                <button type="submit" disabled={!isValid} onClick={onSubmit} className="btn btn-accent">Confirmer</button>
            </form>
        </div >
    );
}

export default ResetPasswordScreen;