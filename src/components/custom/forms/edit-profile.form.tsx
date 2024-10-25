import { fieldsValidation } from "@/_utils/yup.utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GetUserDto } from "@/stores/user/user.model";
import UserRequest from "@/stores/user/user.request";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { AiOutlinePicture } from "react-icons/ai";
import { toast } from "sonner";
import { InferType, object, string } from "yup";

interface EditProfileFormProps {
  receiveEmails: boolean;
  user: GetUserDto;
  onPfpChange: (pfp: string) => void;
  onSave: (receiveEmails: boolean) => void;
}

const UpdateProfileSchema = object().shape({
  oldPassword: string()
    .nullable()
    .test("password-match", "Mot de passe incorrect", async (value, context) => {
      if (!value && !context.parent.newPassword) return true;
      if (value) return fieldsValidation.REQUIRED_PASSWORD.isValidSync(value);
      return false;
    }),
  newPassword: string()
    .nullable()
    .test("password-validation", "Mot de passe incorrect", async (value, context) => {
      if (!value && !context.parent.oldPassword) return true;
      if (value) return fieldsValidation.REQUIRED_PASSWORD.isValidSync(value);
      return false;
    }),
  receiveEmails: fieldsValidation.REQUIRED_BOOLEAN,
});

export type UpdateProfileValidationType = InferType<typeof UpdateProfileSchema>;

export const EditProfileForm = (props: EditProfileFormProps) => {
  const { receiveEmails, user, onPfpChange, onSave } = props;

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<UpdateProfileValidationType>({
    resolver: yupResolver(UpdateProfileSchema),
    mode: "all",
    defaultValues: {
      oldPassword: null,
      newPassword: null,
      receiveEmails: receiveEmails,
    },
  });

  const handlePFPChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    const file = event.target.files![0];
    formData.append("profilePicture", file);
    if (file) UserRequest.updateProfilePicture(formData).then(onPfpChange);
  };

  const onSubmit = handleSubmit((formData) => {
    UserRequest.updateSettings({
      oldPassword: formData.oldPassword === "" ? null : formData.oldPassword,
      newPassword: formData.newPassword ?? null,
      receiveEmails: formData.receiveEmails,
    }).then(() => {
      toast.success("Vos paramètres ont été mis à jour");
      onSave(formData.receiveEmails);
    });
  });

  return (
    <section className="flex flex-col">
      <form className="space-y-4">
        <h1 className="text-lg font-semibold">Modification du profil</h1>
        <div className="flex justify-center">
          <label htmlFor="profile-picture-input">
            <Avatar className="size-16 border border-black dark:border-primary relative cursor-pointer">
              <AvatarImage src={user.profilePicture} />
              <AvatarFallback>UserPP</AvatarFallback>
              <AiOutlinePicture className="absolute size-8 bg-secondary/50 backdrop-blur-[1px] w-full h-full p-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </Avatar>
          </label>
          <input id="profile-picture-input" onChange={handlePFPChange} type="file" accept="image/*" className="hidden" />
        </div>
        <div>
          <Label htmlFor="username">Pseudo</Label>
          <Input id="username" value={`@${user.pseudo}`} disabled />
        </div>
        <div>
          <Label htmlFor="email">Adresse email</Label>
          <Input id="email" value={user.email} disabled />
        </div>
        <div>
          <Label htmlFor="lastpassword">Ancien mot de passe</Label>
          <Input type="password" id="lastpassword" placeholder="•••••••" {...register("oldPassword")} />
        </div>
        <div>
          <Label htmlFor="newpassword">Nouveau mot de passe</Label>
          <Input type="password" id="newpassword" placeholder="•••••••" {...register("newPassword")} />
          <p className="text-[12px] text-muted-foreground">
            Le mot de passe doit contenir au moins 8 caractères, 1 majuscule, 1 chiffre et un caractère special.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <input className="accent-primary size-4" type="checkbox" id="accept-emails" {...register("receiveEmails")} />
          <label htmlFor="accept-emails" className="text-[12px] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Je souhaite rester informé par mail à propos des nouvelles sorties ou informations.
          </label>
        </div>
        <section className="flex gap-4">
          <Button disabled={!isValid} onClick={onSubmit} className="flex-1" size={"sm"}>
            Enregistrer
          </Button>
        </section>
      </form>
    </section>
  );
};
