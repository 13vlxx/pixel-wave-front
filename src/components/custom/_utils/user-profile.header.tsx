import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { GetUserDto } from "@/stores/user/user.model";
import { VerifiedBadge } from "./verified.badge";

interface UserProfileHeaderProps {
  bannerColor: string;
  user: GetUserDto;
  onEditClick?: () => void;
}

export const UserProfileHeader = (props: UserProfileHeaderProps) => {
  const { bannerColor, user, onEditClick } = props;

  return (
    <>
      <div style={{ backgroundColor: bannerColor }} className={`h-36 relative px-4`}>
        <section className="absolute -bottom-1/2 -translate-y-1/2 flex items-baseline">
          <Avatar className="size-20 border border-secondary">
            <AvatarImage src={user.profilePicture} />
            <AvatarFallback>UserPP</AvatarFallback>
          </Avatar>
        </section>
      </div>
      <div className="flex justify-between items-baseline pr-4">
        <div className="pt-8 pl-6 flex gap-2 items-center">
          <span className="font-semibold">{user.pseudo}</span>
          <VerifiedBadge role={user.role} />
        </div>
        <Button onClick={onEditClick} variant={"default"} size={"sm"}>
          Modifier le profil
        </Button>
      </div>
    </>
  );
};

export const UserProfileHeaderSkeleton = () => {
  return (
    <>
      <div className="h-36 bg-gray-500/25 relative px-4">
        <section className="absolute -bottom-1/2 -translate-y-1/2 flex items-baseline">
          <Skeleton className="size-20 rounded-full" />
        </section>
      </div>
      <div className="flex justify-between items-baseline pr-4 mt-1">
        <div className="pt-8 pl-6 flex gap-2 items-center">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-5 w-5 rounded-full" />
        </div>
        <Skeleton className="h-8 w-32" />
      </div>
      <div className="h-px mx-auto my-2 w-[96dvw] bg-muted"></div>
    </>
  );
};
