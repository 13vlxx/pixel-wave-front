import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoCloseSharp } from "react-icons/io5";
import { toast } from "sonner";
import { InferType, object } from "yup";
import { useResponsive } from "../../_utils/useResponsive";
import { fieldsValidation } from "../../_utils/yup.utils";
import PostRequest from "../../stores/post/post.request";
import { useUserStore } from "../../stores/user/user.store";

export interface PostModalProps {
  handleClose: () => void;
}

const CreatePostDataSchema = object().shape({
  content: fieldsValidation.REQUIRED_POST_CONTENT,
  photo: object().nullable(),
});

export type CreatePostDataValidationType = InferType<
  typeof CreatePostDataSchema
>;

export const PostModal = (props: PostModalProps) => {
  const { handleClose } = props;
  const { isMobile } = useResponsive();
  const { id, profilePicture } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<CreatePostDataValidationType>({
    resolver: yupResolver(CreatePostDataSchema),
    mode: "all",
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    document.body.classList.add("modal-open");

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, []);

  const onSubmit = handleSubmit((formData) => {
    console.log(formData);
    PostRequest.createPost({
      ...formData,
      photo: null,
    }).then(() => {
      setSelectedImage(null);
      toast.success("Post créé avec succès !");
      handleClose();
    });
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string); // Mettre à jour l'état avec l'URL de l'image
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null); // Réinitialiser si aucun fichier n'est sélectionné
    }
  };

  if (isMobile)
    return (
      <div className="bg-base-100 h-screen fixed top-0 left-0 min-w-full z-50">
        <div className="relative py-2 px-4 top-0 flex justify-between items-center">
          <IoCloseSharp
            className="text-5xl cursor-pointer"
            onClick={handleClose}
          />
          <button
            disabled={!isValid}
            onClick={onSubmit}
            className="btn btn-outline btn-sm"
          >
            Poster
          </button>
        </div>
        <div className="h-px w-[95%] mb-2 mx-auto bg-neutral"></div>
        <form className="px-4">
          <div className="flex gap-2 min-h-40">
            <img
              src={profilePicture || "/default-pfp.jpeg"}
              alt={`Photo de profil de ${id}`}
              className="object-cover size-[40px] rounded-full"
            />
            <textarea
              {...register("content")}
              maxLength={255}
              className="w-full outline-none bg-transparent resize-none p-2 rounded-lg"
              placeholder="Quoi de neuf ?"
            ></textarea>
          </div>
          <div>
            <input
              {...register("photo")}
              type="file"
              className="p-2 py-8 w-full border-dotted border-secondary border-2"
              onChange={handleFileChange} // Ajoutez le gestionnaire d'événements ici
            />
          </div>
          {selectedImage && (
            <div className="mt-4">
              <img
                src={selectedImage}
                alt="Aperçu de l'image"
                className="w-1/ mx-auto h-auto rounded-lg"
              />
            </div>
          )}
        </form>
      </div>
    );

  return (
    <div className="bg-black/80 fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center">
      <div className="bg-neutral rounded-lg shadow-lg w-[50%] min-h-[50%] relative overflow-hidden">
        <div className="relative py-4 px-6 top-0 flex justify-between items-center border-b">
          <IoCloseSharp
            className="text-3xl cursor-pointer"
            onClick={handleClose}
          />
          <button
            disabled={!isValid}
            onClick={onSubmit}
            className="btn btn-outline btn-sm"
          >
            Poster
          </button>
        </div>
        <form className="px-6 py-4 h-[calc(100%-80px)] flex flex-col justify-between overflow-y-auto">
          <div className="flex gap-4 min-h-40">
            <img
              src={profilePicture || "/default-pfp.jpeg"}
              alt={`Photo de profil de ${id}`}
              className="object-cover w-[50px] h-[50px] rounded-full"
            />
            <textarea
              {...register("content")}
              maxLength={255}
              className="w-full outline-none bg-transparent resize-none p-2 rounded-lg"
              placeholder="Quoi de neuf ?"
            ></textarea>
          </div>
          <div className="mt-4">
            <input
              {...register("photo")}
              type="file"
              className="p-2 py-8 w-full border-dotted border-2 border-secondary"
              onChange={handleFileChange}
            />
            {selectedImage && (
              <div className="mt-4">
                <img
                  src={selectedImage}
                  alt="Aperçu de l'image"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
