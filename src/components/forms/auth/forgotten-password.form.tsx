import { AuthFormEnum } from "@utils/enums/auth-form.enum";

interface ForgottenPasswordFormProps {
    handleChangeState: (state: AuthFormEnum) => void;
}

export const ForgottenPasswordForm = (props: ForgottenPasswordFormProps) => {
    const { handleChangeState } = props;

    return (
        <div className="flex flex-col justify-center h-[600px]">
            <h1 className="text-xl font-semibold">Mot de passe oublié</h1>
            <form className="flex flex-col gap-4">
                <input type="email" placeholder="Email" className="input input-bordered" />
                <button className="btn btn-accent">Envoyer</button>
            </form>
            <div className="flex justify-between">
                <span className="cursor-pointer" onClick={() => handleChangeState(AuthFormEnum.LOGIN)}>Retour</span>
                <span className="cursor-pointer" onClick={() => handleChangeState(AuthFormEnum.REGISTER)}>Pas de compte ?</span>
            </div>
        </div>
    )
}