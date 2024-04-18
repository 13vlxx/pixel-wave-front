import { toast } from "sonner";
import { ERRORS } from "../constants/errors.constants";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const HandleRequestError = (error: any) => {
  const msg =
    ERRORS[error?.message] ||
    ERRORS[error?.response?.data?.message] ||
    error?.response?.data?.message ||
    error?.message;
  console.error(msg);
  toast.error(msg);
};
