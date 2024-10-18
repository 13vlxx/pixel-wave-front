import { AuthFormEnum } from "@/_utils/enums/auth-form-state.enum";
import { useState } from "react";
import { ForgottenPasswordForm } from "./forgotten-password.form";
import { LoginForm } from "./login.form";
import { RegisterForm } from "./register.form";

export const AuthForm = () => {
  const [formState, setFormState] = useState(AuthFormEnum.LOGIN);

  const handleChangeState = (state: AuthFormEnum) => setFormState(state);

  return (
    <>
      {formState === AuthFormEnum.LOGIN && <LoginForm handleChangeState={(state) => handleChangeState(state)} />}
      {formState === AuthFormEnum.REGISTER && <RegisterForm handleChangeState={(state) => handleChangeState(state)} />}
      {formState === AuthFormEnum.FORGOTTEN_PASSWORD && <ForgottenPasswordForm handleChangeState={(state) => handleChangeState(state)} />}
    </>
  );
};
