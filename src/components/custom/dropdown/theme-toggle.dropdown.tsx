import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/_utils/theme-provider";
import { useResponsive } from "@/_utils/use-responsive";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useEffect } from "react";

export const ThemeToggleDropdown = () => {
  const { setTheme } = useTheme();
  const { isMobile } = useResponsive();

  useEffect(() => {
    const handleChangeThemeShortcut = (event: KeyboardEvent) => {
      if (event.shiftKey && event.key === "L") {
        setTheme("light");
      } else if (event.shiftKey && event.key === "D") {
        setTheme("dark");
      } else if (event.shiftKey && event.key === "S") {
        setTheme("system");
      }
    };

    window.addEventListener("keydown", handleChangeThemeShortcut);

    return () => {
      window.removeEventListener("keydown", handleChangeThemeShortcut);
    };
  }, [setTheme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-transparent" variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>Light {!isMobile && <DropdownMenuShortcut>⇧L</DropdownMenuShortcut>}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark {!isMobile && <DropdownMenuShortcut>⇧D</DropdownMenuShortcut>}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>System {!isMobile && <DropdownMenuShortcut>⇧S</DropdownMenuShortcut>}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
