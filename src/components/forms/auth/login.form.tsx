import { yupResolver } from "@hookform/resolvers/yup";
import AuthRequest from "@stores/auth/auth.request";
import { useAuthStore } from "@stores/auth/auth.store";
import { AuthFormEnum } from "@utils/enums/auth-form.enum";
import { useForm } from "react-hook-form";
import { fieldsValidation } from "src/_utils/yup.utils";
import { InferType, object } from "yup";

interface LoginFormProps {
    handleChangeState: (state: AuthFormEnum) => void;
}

const LoginDataSchema = object().shape({
    email: fieldsValidation.REQUIRED_EMAIL,
    password: fieldsValidation.REQUIRED_STRING
})

export type RegisterDataValidationType = InferType<typeof LoginDataSchema>

export const LoginForm = (props: LoginFormProps) => {
    const { handleChangeState } = props;
    const { login } = useAuthStore()

    const {
        register,
        handleSubmit,
        formState: { isValid },
    } = useForm<RegisterDataValidationType>({ resolver: yupResolver(LoginDataSchema), mode: "all" })

    const onSubmit = handleSubmit((formData) => {
        AuthRequest.loginUser(formData).then((x) => login(x))
    })

    return (
        <div className="flex flex-col justify-center h-[600px]" >
            <h1 className="text-xl font-semibold">Se connecter</h1>
            <form className="flex flex-col gap-4">
                <input {...register("email")} placeholder="email" type="text" className="input input-bordered" />
                <input {...register("password")} placeholder="password" type="password" className="input input-bordered" />
                <button type="submit" disabled={!isValid} onClick={onSubmit} className="btn btn-accent">Se connecter</button>
            </form>
            <div className="flex justify-between mt-2">
                <span className="underline cursor-pointer" onClick={() => handleChangeState(AuthFormEnum.REGISTER)}>Pas de compte ?</span>
                <span className="underline cursor-pointer" onClick={() => handleChangeState(AuthFormEnum.FORGOTTEN_PASSWORD)}>Mot de passe oublié ?</span>
            </div>
        </div >
    )
}