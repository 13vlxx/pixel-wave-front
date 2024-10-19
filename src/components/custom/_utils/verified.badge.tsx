import { UserRole } from "@/stores/user/user.model";
import { MdVerified } from "react-icons/md";

export interface VerifiedBadgeProps {
  role: UserRole;
  size?: string;
}

export const VerifiedBadge = (props: VerifiedBadgeProps) => {
  const { role, size } = props;

  const textsize = size ? `text-[${size}]` : "text-xl";

  switch (role) {
    case UserRole.ADMIN:
      return <MdVerified className={`${textsize} text-red-500`} />;
    case UserRole.MODERATOR:
      return <MdVerified className={`${textsize} text-green-500`} />;
    case UserRole.CERTIFIED:
      return <MdVerified className={`${textsize} text-blue-500`} />;
  }
};
