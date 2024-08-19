import Verified from "@components/verified.component";
import { yupResolver } from "@hookform/resolvers/yup";
import { LastStaffRequestDto, StaffRequestStatusEnum } from "@stores/staff-request/staff-request.model";
import StaffRequest from "@stores/staff-request/staff-request.request";
import { UserRole } from "@stores/user/user.model";
import { fieldsValidation } from "@utils/yup.utils";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { InferType, object } from "yup";

const CreateStaffRequestSchema = object().shape({
    content: fieldsValidation.REQUIRED_STAFF_REQUEST,
})

export type CreateStaffRequestValidationType = InferType<typeof CreateStaffRequestSchema>

const StaffRequestScreen = () => {
    const [data, setData] = useState<LastStaffRequestDto | null>(null);

    useEffect(() => {
        StaffRequest.getLastStaffRequest().then(setData)
    }, []);

    const {
        register,
        handleSubmit,
        formState: { isValid },
    } = useForm<CreateStaffRequestValidationType>({
        resolver: yupResolver(CreateStaffRequestSchema), mode: "all"
    })

    const onSubmit = handleSubmit((formData) => {
        StaffRequest.createStaffRequest(formData).then(() => window.location.reload())
    });

    if (!data) return <div className="mx-auto block mt-4 loading loading-spinner loading-lg"></div>

    if ([UserRole.ADMIN, UserRole.MODERATOR].includes(data.role) || data.request?.status === StaffRequestStatusEnum.ACCEPTED) return (
        <section className="md:w-1/4 md:mx-auto md:text-center p-4 flex flex-col justify-center gap-5">
            <h1 className="text-center text-2xl font-semibold bg-gradient-to-r from-success to-accent bg-clip-text text-transparent">Vous êtes déjà modérateur</h1>
            <span>
                Vous êtes déjà membre de notre équipe de modération.
                Merci pour votre implication et votre travail pour maintenir notre communauté.
            </span>
        </section>
    );

    if (data.request?.status === StaffRequestStatusEnum.WAITING) return (
        <section className="md:w-1/4 md:mx-auto md:text-center p-4 flex flex-col justify-center gap-5">
            <h1 className="text-center text-2xl font-semibold bg-gradient-to-r from-warning to-accent bg-clip-text text-transparent">Votre demande est en attente</h1>
            <span>
                Votre demande datant du <span className="font-semibold">{dayjs(data.request.createdAt).format("DD MMM YYYY")}</span> pour rejoindre notre équipe de modération est en cours de traitement.
                Vous serez notifié dès qu'une décision sera prise.
            </span>
        </section>
    );

    if (!data.request || dayjs(data.request?.createdAt).isBefore(dayjs().subtract(30, "days")))
        return (
            <>
                <section className="md:w-1/4 md:mx-auto md:text-center p-4 flex flex-col justify-center gap-5">
                    <h1 className="text-center text-2xl font-semibold bg-gradient-to-r from-success to-accent bg-clip-text text-transparent">Rejoindre l'équipe de Pixel Wave</h1>
                    <span>
                        Vous êtes passionné par les jeux vidéo et vous avez un intérêt pour la modération en ligne ?
                        Nous recherchons des personnes comme vous pour rejoindre notre équipe de modérateurs.
                    </span>
                    <p className="text-lg font-semibold">
                        En tant que membre du staff, vous aurez l'opportunité de :
                    </p>
                    <ul className="list-disc list-inside mb-6 text-left">
                        <li>Modérer les discussions et les commentaires pour maintenir une communauté saine et respectueuse</li>
                        <li>Collaborer avec d'autres passionnés de jeux vidéo</li>
                        <li>Participer à l'organisation d'événements et de tournois</li>
                        <li>Apporter des idées pour améliorer notre plateforme</li>
                    </ul>
                    <p className="text-lg mb-6">
                        Si vous êtes motivé, rigoureux et souhaitez vous impliquer dans la gestion d'une communauté dynamique,
                        n'hésitez plus et faites votre demande pour rejoindre notre staff !
                    </p>
                    <div className="flex flex-col justify-center items-center gap-4 text-center">
                        <p>En intégrant le staff vous aurez aussi l'icone modérateur sur votre profil </p>
                        <Verified role={UserRole.MODERATOR} size="text-6xl" />
                    </div>
                    <label htmlFor="my-drawer" className="btn btn-secondary text-primary drawer-button">Faire une Demande</label>
                </section>
                <div className="drawer drawer-end z-50">
                    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-side">
                        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                        <section className="menu p-4 w-80 min-h-screen bg-primary">
                            <h1 className="text-xl font-semibold pb-2">Votre demande</h1>
                            <form className="gap-10 flex flex-col">
                                <textarea {...register("content")} className="p-2 flex-1 textarea textarea-sm min-h-[60dvh] textarea-bordered w-full border-secondary" placeholder="Pourquoi voulez-vous rejoindre l'équipe de Pixel Wave ?" />
                                <button data-cy="submit" onClick={onSubmit} disabled={!isValid} className="btn btn-secondary text-primary w-full">Envoyer</button>
                                <p className="text-center">Une fois la demande envoyée, vous pourrez suivre l'avancement de cette dernière en revenant sur cette page</p>
                            </form>
                        </section>
                    </div>
                </div>
            </>
        );

    if (data.request?.status === StaffRequestStatusEnum.REFUSED) return (
        <section className="md:w-1/4 md:mx-auto md:text-center p-4 flex flex-col justify-center gap-5">
            <h1 className="text-center text-2xl font-semibold bg-gradient-to-r from-error to-accent bg-clip-text text-transparent">Votre demande a été refusée</h1>
            <span>
                Votre demande datant du <span className="font-semibold">{dayjs(data.request.createdAt).format("DD MMM YYYY")}</span> pour rejoindre notre équipe de modération a été refusée.
                Vous pouvez refaire une demande dans 30 jours.
            </span>
        </section>
    )
};

export default StaffRequestScreen;
