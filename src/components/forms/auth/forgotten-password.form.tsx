import { AuthFormEnum } from "@utils/enums/auth-form.enum";
import { FaArrowLeftLong } from "react-icons/fa6";

interface ForgottenPasswordFormProps {
    handleChangeState: (state: AuthFormEnum) => void;
}

export const ForgottenPasswordForm = (props: ForgottenPasswordFormProps) => {
    const { handleChangeState } = props;

    return (
        <div className="flex flex-col justify-center w-1/2 min-w-[360px] pr-2 h-[700px] text-accent" >
            <h1 className="text-xl font-semibold">Mot de passe oublié</h1>
            <form className="flex flex-col gap-4">
                <input type="email" placeholder="Email" className="input input-bordered" />
                <button className="btn btn-accent">Envoyer</button>
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