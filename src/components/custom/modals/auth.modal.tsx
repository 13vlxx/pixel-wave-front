import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { AuthForm } from "../forms/auth.form";

interface DialogDemoProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = (props: DialogDemoProps) => {
  const { isOpen, onClose } = props;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTitle className="hidden">Auth</DialogTitle>
      <DialogContent aria-describedby="auth form" className="sm:max-w-[425px]">
        <AuthForm />
      </DialogContent>
    </Dialog>
  );
};
