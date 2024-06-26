import { yupResolver } from "@hookform/resolvers/yup"
import { GetUserDto, UserRole } from "@stores/user/user.model"
import UserRequest from "@stores/user/user.request"
import dayjs from "@utils/dayjs"
import { PagesAuth } from "@utils/router/routes"
import { fieldsValidation } from "@utils/yup.utils"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { FaEye } from "react-icons/fa"
import { Link } from "react-router-dom"
import { toast } from "sonner"
import { InferType, object, string } from "yup"

interface UpdateProfileFormProps {
    user: GetUserDto
    receiveEmails: boolean
    hideHeader?: boolean
    handleClose: () => void
}

const UpdateProfileSchema = object().shape({
    password: string()
        .nullable()
        .notRequired()
        .test(
            (value) => {
                if (!value) return true;
                return fieldsValidation.REQUIRED_PASSWORD.isValidSync(value);
            }
        ),
    receiveEmails: fieldsValidation.REQUIRED_BOOLEAN,
});


export type UpdateProfileValidationType = InferType<typeof UpdateProfileSchema>

const UpdateProfileForm = (props: UpdateProfileFormProps) => {
    const { user, receiveEmails, hideHeader, handleClose } = props
    const [isPasswordEditable, setIsPasswordEditable] = useState(false)
    const [isPasswordShown, setIsPasswordShown] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { isValid },
    } = useForm<UpdateProfileValidationType>({
        resolver: yupResolver(UpdateProfileSchema), mode: "all", defaultValues: {
            password: null,
            receiveEmails: receiveEmails
        }
    })

    const onSubmit = handleSubmit((formData) => {
        UserRequest.updateSettings(formData).then(() => {
            toast.success("Vos paramètres ont été mis à jour")
            handleClose()

        })
    });

    const handleShowPasswordClick = () => setIsPasswordShown(!isPasswordShown)

    const handleOnEditPasswordClick = () => {
        setIsPasswordEditable(!isPasswordEditable)
    }

    return (
        <form className="flex flex-col h-full">
            {!hideHeader &&
                (<section className="text-center flex-1">
                    <div className="avatar">
                        <div className="w-24 rounded-full">
                            <img src={user.profilePicture || ""} />
                        </div>
                    </div>
                    <h1 className="text-xl">@{user.pseudo}</h1>
                    <p>Inscrit depuis le {dayjs(user.createdAt).format("DD MMM YYYY")}</p>
                </section>)}
            <section className="flex flex-col flex-1 gap-2">
                <input disabled className="input input-bordered" type="text" placeholder="Pseudo" value={user.pseudo} />
                <input disabled className="input input-bordered" type="text" placeholder="Adresse Email" value={user.email} />
                <div className="flex flex-col gap-2">
                    {isPasswordEditable && (
                        <>
                            <p className="ml-auto w-min select-none px-2 rounded-full bg-accent tooltip tooltip-accent tooltip-left" data-tip="Le mot de passe doit contenir une majuscule, un chiffre et 6 caracteres">?</p>
                            <div className="relative">
                                <input disabled={!isPasswordEditable} {...register("password")} className="input input-bordered w-full" type={`${isPasswordShown ? "text" : "password"}`} placeholder="Nouveau mot de passe" />
                                <FaEye onClick={handleShowPasswordClick} className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer size-6" />
                            </div>
                        </>
                    )}
                    {!isPasswordEditable && (<p className="cursor-pointer underline" onClick={handleOnEditPasswordClick}>Modifier le mot de passe</p>)}
                </div>
                <div className="form-control">
                    <label className="label cursor-pointer flex flex-row-reverse gap-2">
                        <span className="label-text">Je souhaite rester informé par mail à propos des nouvelles sorties ou informations.</span>
                        <input className="checkbox checkbox-accent" {...register("receiveEmails")} type="checkbox" />
                    </label>
                </div>
            </section>
            <section className="flex flex-col gap-2">
                {
                    [UserRole.USER, UserRole.CERTIFIED].includes(user.role) && (
                        <Link className="btn btn-outline btn-accent" to={`/${PagesAuth.STAFF_REQUEST}`}>Demander à intégrer le staff</Link>
                    )
                }
                <button disabled={!isValid} onClick={onSubmit} className="btn btn-outline btn-accent">Confirmer les changements</button>
            </section>
        </form>
    )
}

export default UpdateProfileForm