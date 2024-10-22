import { useResponsive } from "@/_utils/use-responsive";
import { EditProfileForm } from "@/components/custom/forms/edit-profile.form";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { GetUserDto } from "@/stores/user/user.model";

interface EditProfileModalProps {
  receiveEmails: boolean;
  user: GetUserDto;
  isOpen: boolean;
  onClose: (receiveEmails?: boolean) => void;
  onPfpChange: (pfp: string) => void;
}

export const EditProfileModal = (props: EditProfileModalProps) => {
  const { receiveEmails, user, isOpen, onClose, onPfpChange } = props;
  const { isMobile } = useResponsive();

  if (isMobile)
    return (
      <Drawer open={isOpen} onOpenChange={() => onClose(undefined)}>
        <DialogTitle className="hidden">Auth</DialogTitle>
        <DrawerContent aria-description="auth form" className="p-4">
          <EditProfileForm receiveEmails={receiveEmails} user={user} onPfpChange={onPfpChange} onSave={onClose} />
        </DrawerContent>
      </Drawer>
    );

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose(undefined)}>
      <DialogTitle className="hidden">Edit profile</DialogTitle>
      <DialogContent aria-describedby="edit profile form" className="sm:max-w-[425px]">
        <EditProfileForm receiveEmails={receiveEmails} user={user} onPfpChange={onPfpChange} onSave={onClose} />
      </DialogContent>
    </Dialog>
  );
};
