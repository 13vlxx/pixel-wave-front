import { AuthFormEnum } from "@utils/enums/auth-form.enum";

interface LoginFormProps {
    handleChangeState: (state: AuthFormEnum) => void;
}

export const LoginForm = (props: LoginFormProps) => {
    const { handleChangeState } = props;

    return (

        <div className="flex flex-col justify-center h-[600px]" >
            <h1 className="text-xl font-semibold">Se connecter</h1>
            <form className="flex flex-col gap-4">
                <input type="email" placeholder="Email" className="input input-bordered" />
                <input type="password" placeholder="Password" className="input input-bordered" />
                <button className="btn btn-accent">Se connecter</button>
            </form>
            <div className="flex justify-between">
                <span className="underline cursor-pointer" onClick={() => handleChangeState(AuthFormEnum.REGISTER)}>Pas de compte ?</span>
                <span className="underline cursor-pointer" onClick={() => handleChangeState(AuthFormEnum.FORGOTTEN_PASSWORD)}>Mot de passe oublié ?</span>
            </div>
        </div >
    )
}