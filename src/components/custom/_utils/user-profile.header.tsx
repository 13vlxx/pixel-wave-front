import { GetUserDto } from "@/stores/user/user.model";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { VerifiedBadge } from "./verified.badge";

interface UserProfileHeaderProps {
  user: GetUserDto;
}

export const UserProfileHeader = (props: UserProfileHeaderProps) => {
  const { user } = props;

  return (
    <>
      <div className="h-36 bg-primary/25 relative px-4">
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
        <Button variant={"outline"} size={"sm"}>
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
      <div className="pt-8 pl-6 flex gap-2 items-center">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-5 w-5 rounded-full" />
      </div>
    </>
  );
};
