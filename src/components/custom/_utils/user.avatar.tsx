import { PagesAuth } from "@/_utils/router/routes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GetUserDto, LiteUserDto } from "@/stores/user/user.model";
import { Link } from "react-router-dom";
import { VerifiedBadge } from "./verified.badge";

interface UserBadgeProps {
  user: GetUserDto | LiteUserDto;
}

export const UserAvatar = (props: UserBadgeProps) => {
  const { user } = props;

  return (
    <Link onClick={(e) => e.stopPropagation()} to={`/${PagesAuth.PROFILE}/${user.id}`}>
      <section className="flex items-center gap-1">
        <Avatar className="border border-muted-foreground">
          <AvatarImage src={user.profilePicture} />
          <AvatarFallback>UserPP</AvatarFallback>
        </Avatar>
        <span>@{user.pseudo}</span>
        <VerifiedBadge role={user.role} />
      </section>
    </Link>
  );
};
