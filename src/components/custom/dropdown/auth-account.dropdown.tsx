import { PagesAuth, PagesBackoffice } from "@/_utils/router/routes";
import { useResponsive } from "@/_utils/use-responsive";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/stores/auth/auth.store";
import { GetRoleDto, UserRole } from "@/stores/user/user.model";
import UserRequest from "@/stores/user/user.request";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useEffectOnce } from "react-use";

export const AuthAccountDropdown = () => {
  const { logout } = useAuthStore();
  const [role, setRole] = useState<GetRoleDto>();
  const { isMobile } = useResponsive();

  useEffectOnce(() => {
    UserRequest.getRole().then(setRole);
  });

  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-transparent" variant="outline" size="icon">
          <CgProfile className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
          <span className="sr-only">Account dropdown</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => navigate(`/${PagesAuth.PROFILE}/me`)}>Profil</DropdownMenuItem>
        <DropdownMenuItem>Notifications</DropdownMenuItem>
        {(role?.role === UserRole.ADMIN || role?.role === UserRole.MODERATOR) && !isMobile && (
          <DropdownMenuItem onClick={() => navigate(`/${PagesBackoffice.BACKOFFICE}`)}>Backoffice</DropdownMenuItem>
        )}
        <DropdownMenuItem className="text-destructive" onClick={logout}>
          Se deconnecter
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
