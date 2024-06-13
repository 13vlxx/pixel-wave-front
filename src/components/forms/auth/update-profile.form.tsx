import { yupResolver } from "@hookform/resolvers/yup"
import { GetUserDto } from "@stores/user/user.model"
import dayjs from "@utils/dayjs"
import { fieldsValidation } from "@utils/yup.utils"
import { useForm } from "react-hook-form"
import { InferType, object } from "yup"

interface UpdateProfileFormProps {
    user: GetUserDto
}

const UpdateProfileSchema = object().shape({
    password: fieldsValidation.REQUIRED_PASSWORD
})

export type UpdateProfileValidationType = InferType<typeof UpdateProfileSchema>

const UpdateProfileForm = (props: UpdateProfileFormProps) => {
    const { user } = props

    const {
        register,
        handleSubmit,
    } = useForm<UpdateProfileValidationType>({
        resolver: yupResolver(UpdateProfileSchema), mode: "all", defaultValues: {
            password: "**********"
        }
    })

    return (
        <div className="flex flex-col h-full">
            <section className="text-center flex-1">
                <div className="avatar">
                    <div className="w-24 rounded-full">
                        <img src={user.profilePicture || ""} />
                    </div>
                </div>
                <h1 className="text-xl">@{user.pseudo}</h1>
                <p>Inscrit depuis le {dayjs(user.createdAt).format("DD MMM YYYY")}</p>
            </section>
            <section className="flex flex-col flex-1 gap-2">
                <input disabled className="input input-bordered" type="text" placeholder="test" value={user.pseudo} />
                <input disabled className="input input-bordered" type="text" placeholder="test" value={user.email} />
                <input {...register("password")} className="input input-bordered" type="text" placeholder="test" />
            </section>
            <section className="flex flex-col gap-2">
                <button className="btn btn-outline btn-accent">Demander à intégrer le staff</button>
                <button className="btn btn-outline btn-accent">Confirmer les changements</button>
            </section>
        </div>
    )
}

export default UpdateProfileForm