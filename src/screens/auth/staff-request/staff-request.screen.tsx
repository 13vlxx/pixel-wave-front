import Verified from "@components/verified.component";
import { UserRole } from "@stores/user/user.model";

const StaffRequestScreen = () => {
    return (
        <section className="md:w-1/4 md:mx-auto md:text-center p-4 flex flex-col justify-center gap-5">
            <h1 className="text-2xl font-semibold">Rejoindre l'équipe de Pixel Wave</h1>
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
            <button className="btn btn-secondary text-primary">Faire une Demande</button>
        </section>
    );
};

export default StaffRequestScreen;
