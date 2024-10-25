import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GetUserDto, LiteUserDto } from "@/stores/user/user.model";
import { VerifiedBadge } from "./verified.badge";

interface UserBadgeProps {
  user: GetUserDto | LiteUserDto;
}

export const UserAvatar = (props: UserBadgeProps) => {
  const { user } = props;

  return (
    <section className="flex items-center gap-1">
      <Avatar className="border border-muted-foreground">
        <AvatarImage src={user.profilePicture} />
        <AvatarFallback>UserPP</AvatarFallback>
      </Avatar>
      <span>@{user.pseudo}</span>
      <VerifiedBadge role={user.role} />
    </section>
  );
};
