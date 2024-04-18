const LoginForm = (
    <>
        <div className="flex flex-col justify-center h-[700px]">
            <h1 className="text-xl font-semibold">Se connecter</h1>
            <form className="flex flex-col gap-4">
                <input type="email" placeholder="Email" className="input input-bordered" />
                <input type="password" placeholder="Password" className="input input-bordered" />
                <button className="btn btn-accent">Login</button>
            </form>
            <div className="flex justify-between">
                <span>Pas de compte ?</span>
                <span>Mot de passe oublié ?</span>
            </div>
        </div>
    </>
)

const AuthForm = () => {

    return LoginForm
}

export default AuthForm;