import { yupResolver } from "@hookform/resolvers/yup";
import { fieldsValidation } from "@utils/yup.utils";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { useSearchParam } from "react-use";
import { toast } from "sonner";
import { InferType, object } from "yup";

const ResetPassowrdSchema = object().shape({
    password: fieldsValidation.REQUIRED_PASSWORD
})

type ResetPassowrdValidationType = InferType<typeof ResetPassowrdSchema>

const ResetPasswordScreen = () => {
    const token = useSearchParam("token")
    const expire = useSearchParam("expire")

    const {
        register,
        handleSubmit,
        formState: { isValid },
    } = useForm<ResetPassowrdValidationType>({ resolver: yupResolver(ResetPassowrdSchema), mode: "all" })

    const onSubmit = handleSubmit((formData) => {
        toast(formData.password + token)
    })

    console.log(Date.now())

    if (expire && parseInt(expire) < dayjs().unix())
        return (
            <h1>Token expiré</h1>
        )

    return (
        <div className="flex flex-col justify-center h-[600px] mx-auto text-accent md:max-w-md">
            <h1 className="text-xl font-semibold self-center pb-4">Réinitialisation du mot de passe</h1>
            <form className="flex flex-col gap-4">
                <input {...register("password")} placeholder="Nouveau mot de passe" type="password" className="input input-bordered" />
                <button type="submit" disabled={!isValid} onClick={onSubmit} className="btn btn-accent">Confirmer</button>
            </form>
        </div >
    );
}

export default ResetPasswordScreen;