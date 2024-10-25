import { fieldsValidation } from "@/_utils/yup.utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CreatePostDto } from "@/stores/post/post.model";
import PostRequest from "@/stores/post/post.request";
import { useUserStore } from "@/stores/user/user.store";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaTrash } from "react-icons/fa";
import { HiOutlinePaperAirplane } from "react-icons/hi2";
import { SlPicture } from "react-icons/sl";
import { toast } from "sonner";
import { InferType, mixed, object } from "yup";

interface CreatePostFormProps {
  onSubmit: () => void;
}

const CreatePostDataSchema = object().shape({
  content: fieldsValidation.REQUIRED_POST_CONTENT,
  photo: mixed().nullable(),
});

export type CreatePostDataValidationType = InferType<typeof CreatePostDataSchema>;

export const CreatePostForm = (props: CreatePostFormProps) => {
  const { onSubmit } = props;
  const { profilePicture } = useUserStore();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = useForm<CreatePostDataValidationType>({
    resolver: yupResolver(CreatePostDataSchema),
    mode: "all",
    criteriaMode: "all",
  });

  const submit = handleSubmit((data) => {
    const formData = new FormData();

    formData.append("content", data.content);

    // @ts-expect-error pww
    if (data.photo && data.photo[0]) {
      // @ts-expect-error pww
      formData.append("photo", data.photo[0]);
    }

    PostRequest.createPost(formData as unknown as CreatePostDto).then(() => {
      setSelectedImage(null);
      toast.success("Post créé avec succès !");
      onSubmit();
    });
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
    }
  };

  const handleRemoveImage = () => {
    setValue("photo", null);
    setSelectedImage(null);
  };

  return (
    <section className="flex mt-4 gap-2">
      <Avatar className="size-12 border border-secondary">
        <AvatarImage src={profilePicture ?? ""} />
        <AvatarFallback>UserPP</AvatarFallback>
      </Avatar>
      <form className="w-full space-y-1">
        <Textarea placeholder="Quoi de neuf ?" className="w-full resize-none" rows={5} {...register("content")} />
        <input {...register("photo")} id="photo" type="file" className="sr-only" onChange={handleFileChange} />
        {selectedImage && (
          <AspectRatio ratio={16 / 9}>
            <img src={selectedImage} alt="image" className="h-full w-full rounded-md object-cover border border-secondary" />
            <Button type="button" variant={"destructive"} size={"icon"} onClick={handleRemoveImage} className="absolute top-2 right-2">
              <FaTrash />
            </Button>
          </AspectRatio>
        )}
        <div className="place-self-end space-x-1">
          <Button type="button" size={"icon"}>
            <label htmlFor="photo">
              <SlPicture />
            </label>
          </Button>
          <Button onClick={submit} disabled={!isValid} size={"icon"}>
            <HiOutlinePaperAirplane />
          </Button>
        </div>
      </form>
    </section>
  );
};
