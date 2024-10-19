import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GetUserDto, LiteUserDto } from "@/stores/user/user.model";
import { VerifiedBadge } from "./verified.badge";

interface UserBadgeProps {
  user: GetUserDto | LiteUserDto;
}

export const UserAvatar = (props: UserBadgeProps) => {
  const { user } = props;

  return (
    <section className="flex items-center gap-2">
      <Avatar>
        <AvatarImage src={user.profilePicture} />
        <AvatarFallback>UserPP</AvatarFallback>
      </Avatar>
      <span>@{user.pseudo}</span>
      <VerifiedBadge role={user.role} />
    </section>
  );
};
