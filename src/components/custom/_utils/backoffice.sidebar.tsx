import { PagesBackoffice } from "@/_utils/router/routes";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ChevronUp, User2 } from "lucide-react";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { IoGameController } from "react-icons/io5";
import { MdCategory, MdLibraryBooks } from "react-icons/md";
import { Link } from "react-router-dom";

export const BackofficeSidebar = () => {
  const items = [
    {
      title: "Accueil",
      url: `/${PagesBackoffice.BACKOFFICE}`,
      icon: <IoMdHome />,
    },
    {
      title: "Utilisateurs",
      url: `/${PagesBackoffice.USERS}`,
      icon: <FaUsers />,
    },
    {
      title: "Posts",
      url: `/${PagesBackoffice.POSTS}`,
      icon: <MdLibraryBooks />,
    },
    {
      title: "Jeux",
      url: `/${PagesBackoffice.GAMES}`,
      icon: <IoGameController />,
    },
    {
      title: "Plateformes",
      url: `/${PagesBackoffice.PLATFORMS}`,
      icon: <BiSolidCategoryAlt />,
    },
    {
      title: "Categories",
      url: `/${PagesBackoffice.CATEGORIES}`,
      icon: <MdCategory />,
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Pixel Wave Backoffice</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Admin
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem>
                  <Link to="/">Quitter</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
