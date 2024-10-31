import { fieldsValidation } from "@/_utils/yup.utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import PostRequest from "@/stores/post/post.request";
import { useUserStore } from "@/stores/user/user.store";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { HiOutlinePaperAirplane } from "react-icons/hi2";
import { toast } from "sonner";
import { InferType, object } from "yup";

interface CreateCommentFormProps {
  postId: string;
  onSubmit: () => void;
}

const CreatePostDataSchema = object().shape({
  content: fieldsValidation.REQUIRED_POST_CONTENT,
});

export type CreatePostDataValidationType = InferType<typeof CreatePostDataSchema>;

export const CreateCommentForm = (props: CreateCommentFormProps) => {
  const { postId, onSubmit } = props;
  const { profilePicture } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<CreatePostDataValidationType>({
    resolver: yupResolver(CreatePostDataSchema),
    mode: "all",
    criteriaMode: "all",
  });

  const submit = handleSubmit((data) => {
    PostRequest.createComment(postId, data).then(() => {
      toast.success("Commentaire ajouté avec succes !");
      onSubmit();
    });
  });

  return (
    <section className="flex mt-4 gap-2">
      <Avatar className="size-12 border border-secondary">
        <AvatarImage src={profilePicture ?? ""} />
        <AvatarFallback>UserPP</AvatarFallback>
      </Avatar>
      <form className="w-full space-y-1">
        <Textarea placeholder="Entrez votre réponse ?" className="w-full resize-none" rows={5} {...register("content")} />
        <div className="place-self-end space-x-1">
          <Button onClick={submit} disabled={!isValid} size={"icon"}>
            <HiOutlinePaperAirplane />
          </Button>
        </div>
      </form>
    </section>
  );
};
