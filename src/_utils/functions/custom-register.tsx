import { ReactElement } from "react";
import { FieldErrors, FieldPath, FieldValues, InternalFieldName, UseFormRegister, UseFormRegisterReturn } from "react-hook-form";

export type CustomRegisterType<TFieldName extends InternalFieldName> = UseFormRegisterReturn<TFieldName> & {
    error?: boolean;
    helperText?: string | ReactElement;
    inputProps?: Record<string, unknown>;
};

export default function CustomRegister<
    TFieldValues extends FieldValues = FieldValues,
    TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
    register: UseFormRegister<TFieldValues>,
    errors: FieldErrors<TFieldValues>,
): (name: TFieldName, noHelper?: boolean) => CustomRegisterType<TFieldName> {
    const errorComponents = (name: TFieldName) => (
        <div>
            {errors[name]?.message?.toString()}
        </div>
    );

    return (name: TFieldName, nohelpers?: boolean) => {
        return {
            ...register(name),
            ...(nohelpers ? {} : { helperText: errors[name]?.message ? errorComponents(name) : "", error: !!errors[name] }),
            inputProps: { className: errors[name] ? "error" : "" },
        };
    };
}
