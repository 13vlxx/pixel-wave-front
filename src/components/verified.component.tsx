import { UserRole } from "@stores/user/user.model";
import { MdVerified } from "react-icons/md";

export interface VerifiedProps {
    role: UserRole
    size?: string
}

const Verified = (props: VerifiedProps) => {
    const { role, size } = props;

    const textsize = size ? `text-[${size}]` : "text-xl";

    switch (role) {
        case UserRole.ADMIN:
            return <span className="tooltip tooltip-neutral tooltip-bottom" data-tip="Administrateur"><MdVerified className={`${textsize} text-error`} /></span>
        case UserRole.MODERATOR:
            return <span className="tooltip tooltip-neutral tooltip-bottom" data-tip="Moderateur"><MdVerified className={`${textsize} text-success`} /></span>
        case UserRole.CERTIFIED:
            return <span className="tooltip tooltip-neutral tooltip-bottom" data-tip="Utilisateur Certifié"><MdVerified className={`${textsize} text-blue-500`} /></span>
    }
}

export default Verified;