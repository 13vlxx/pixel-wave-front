import { useResponsive } from "@/_utils/use-responsive";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { AuthForm } from "../forms/auth.form";

interface DialogDemoProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = (props: DialogDemoProps) => {
  const { isMobile } = useResponsive();
  const { isOpen, onClose } = props;

  if (isMobile)
    return (
      <Drawer open={isOpen} onOpenChange={onClose}>
        <DrawerContent className="p-4">
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
