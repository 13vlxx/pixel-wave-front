import { useNavigate, useRouteError } from "react-router-dom";
import { useEffectOnce } from "react-use";
import { HandleRequestError } from "../handle-request-error";

const RouterError = ({ path }: { path: string }) => {
  const error = useRouteError();
  const navigate = useNavigate();

  useEffectOnce(() => {
    HandleRequestError(error);
    console.log(`Error on path: ${path}`);
    navigate(path);
  });

  return <></>;
};

export default RouterError;
