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
                toast.success("Registration successfully completed !")
            })
        })
    })

    return (
        <div className="flex flex-col justify-center w-1/2 min-w-[360px] pr-2 h-[700px] text-accent" >
            <h1 className="text-xl font-semibold">S'inscrire</h1>
            <form className="flex flex-col gap-4">
                <input {...register("pseudo")} type="text" placeholder="Pseudo" className="input input-bordered" />
                <input {...register("email")} type="email" placeholder="Email" className="input input-bordered" />
                <input {...register("password")} type="password" placeholder="Password" className="input input-bordered" />
                <button onClick={onSubmit} disabled={!isValid} className="btn btn-accent">S'inscrire</button>
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