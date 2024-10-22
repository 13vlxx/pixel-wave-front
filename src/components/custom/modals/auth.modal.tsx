import { useResponsive } from "@/_utils/use-responsive";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { AuthForm } from "../forms/auth.form";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = (props: AuthModalProps) => {
  const { isOpen, onClose } = props;
  const { isMobile } = useResponsive();

  if (isMobile)
    return (
      <Drawer open={isOpen} onOpenChange={onClose}>
        <DialogTitle className="hidden">Auth</DialogTitle>
        <DrawerContent aria-description="auth form" className="p-4">
          <AuthForm />
        </DrawerContent>
      </Drawer>
    );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTitle className="hidden">Auth</DialogTitle>
      <DialogContent aria-describedby="auth form" className="sm:max-w-[425px]">
        <AuthForm />
      </DialogContent>
    </Dialog>
  );
};
