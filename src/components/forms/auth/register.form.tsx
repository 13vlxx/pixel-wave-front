import { AuthFormEnum } from "@utils/enums/auth-form.enum";
import { FaArrowLeftLong } from "react-icons/fa6";

interface RegisterFormProps {
    handleChangeState: (state: AuthFormEnum) => void;
}

export const RegisterForm = (props: RegisterFormProps) => {
    const { handleChangeState } = props;

    return (

        <div className="flex flex-col justify-center h-[600px]">
            <h1 className="text-xl font-semibold">S'inscrire</h1>
            <form className="flex flex-col gap-4">
                <input type="text" placeholder="Pseudo" className="input input-bordered" />
                <input type="email" placeholder="Email" className="input input-bordered" />
                <input type="password" placeholder="Password" className="input input-bordered" />
                <button className="btn btn-accent">S'inscrire</button>
            </form>
            <div className="flex justify-between">
                <span
                    className="underline flex justify-center items-center gap-2 cursor-pointer"
                    onClick={() => handleChangeState(AuthFormEnum.LOGIN)}>
                    <FaArrowLeftLong /> Retour
                </span>
            </div>
        </div>
    )
}