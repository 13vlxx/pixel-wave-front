import { yupResolver } from "@hookform/resolvers/yup";
import AuthRequest from "@stores/auth/auth.request";
import { useAuthStore } from "@stores/auth/auth.store";
import { AuthFormEnum } from "@utils/enums/auth-form.enum";
import { fieldsValidation } from "@utils/yup.utils";
import { useForm } from "react-hook-form";
import { FaArrowLeftLong } from "react-icons/fa6";
import { toast } from "sonner";
import { InferType, object } from "yup";

interface RegisterFormProps {
    handleChangeState: (state: AuthFormEnum) => void;
}

const RegisterDataSchema = object().shape({
    email: fieldsValidation.REQUIRED_EMAIL,
    pseudo: fieldsValidation.REQUIRED_STRING,
    password: fieldsValidation.REQUIRED_PASSWORD,
})

export type RegisterDataValidationType = InferType<typeof RegisterDataSchema>

export const RegisterForm = (props: RegisterFormProps) => {
    const { handleChangeState } = props;
    const { login } = useAuthStore()

    const {
        register,
        handleSubmit,
        formState: { isValid },
    } = useForm<RegisterDataValidationType>({ resolver: yupResolver(RegisterDataSchema), mode: "all" })

    const onSubmit = handleSubmit((formData) => {
        AuthRequest.registerUser(formData).then(() => {
            const { email, password } = formData
            AuthRequest.loginUser({ email, password }).then((x) => {
                login(x)
                toast.success("Inscription réussie avec succes !")
            })
        })
    })

    return (
        <div className="flex flex-col justify-center h-[600px] md:w-1/2 md:min-w-[360px] md:h-[700px]">
            <div className="flex items-baseline justify-between font-semibold pb-1">
                <h1 className="text-xl">S'inscrire</h1>
                <p className="select-none px-2 rounded-full bg-accent tooltip tooltip-left" data-tip="Le mot de passe doit contenir une majuscule, un chiffre et 6 caracteres">?</p>
            </div>
            <form className="flex flex-col gap-4">
                <input {...register("pseudo")} type="text" placeholder="Pseudo" className="input input-bordered" />
                <input {...register("email")} type="email" placeholder="Adresse email" className="input input-bordered" />
                <input {...register("password")} type="password" placeholder="Mot de passe" className="input input-bordered" />
                <button type="submit" onClick={onSubmit} disabled={!isValid} className="btn btn-outline btn-accent">S'inscrire</button>
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