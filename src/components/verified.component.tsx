import { UserRole } from "@stores/user/user.model";
import { MdVerified } from "react-icons/md";

export interface VerifiedProps {
    role: UserRole
}

const Verified = (props: VerifiedProps) => {
    const { role } = props;

    switch (role) {
        case UserRole.ADMIN:
            return <p className="tooltip tooltip-neutral tooltip-bottom" data-tip="Cet utilisateur est un Administrateur vérifié"><MdVerified className="text-xl text-error" /></p>
        case UserRole.MODERATOR:
            return <p className="tooltip tooltip-neutral tooltip-bottom" data-tip="Cet utilisateur est un Modérateur vérifié"><MdVerified className="text-xl text-success" /></p>
        case UserRole.CERTIFIED:
            return <p className="tooltip tooltip-neutral tooltip-bottom" data-tip="Cet utilisateur est un utilisateur certifié"><MdVerified className="text-xl text-blue-500" /></p>
    }
}

export default Verified;