import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoCloseSharp } from "react-icons/io5";
import { InferType, object } from "yup";
import { useResponsive } from "../../_utils/useResponsive";
import { fieldsValidation } from "../../_utils/yup.utils";
import { PostDto } from "../../stores/post/post.model";
import { useUserStore } from "../../stores/user/user.store";
import PostCard from "../cards/post.card";

export interface CommentModalProps {
  post: PostDto;
  handleClose: () => void;
}

const CreateCommentDataSchema = object().shape({
  content: fieldsValidation.REQUIRED_POST_CONTENT,
});

export type CreatePostDataValidationType = InferType<
  typeof CreateCommentDataSchema
>;

export const CommentModal = (props: CommentModalProps) => {
  const { post, handleClose } = props;
  const { isMobile } = useResponsive();
  const { id, profilePicture } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<CreatePostDataValidationType>({
    resolver: yupResolver(CreateCommentDataSchema),
    mode: "all",
  });

  useEffect(() => {
    document.body.classList.add("modal-open");

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, []);

  const onSubmit = handleSubmit((formData) => {
    console.log(formData);
  });

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
            Commenter
          </button>
        </div>
        <div className="h-px w-[95%] mb-2 mx-auto bg-neutral"></div>
        <form className="px-4">
          <PostCard
            hideActions={true}
            onDelete={() => {}}
            onNewComment={() => {}}
            post={post}
          />
          <div className="flex flex-col min-h-40">
            <div className="h-5 bg-secondary w-px ml-4"></div>
            <div className="flex">
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
          </div>
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
            Commenter
          </button>
        </div>
        <form className="px-6 py-4 h-[calc(100%-80px)] flex flex-col justify-between overflow-y-auto">
          <PostCard
            hideActions={true}
            onDelete={() => {}}
            onNewComment={() => {}}
            post={post}
          />
          <div className="flex flex-col min-h-40">
            <div className="h-5 bg-secondary w-px ml-4"></div>
            <img
              src={profilePicture || "/default-pfp.jpeg"}
              alt={`Photo de profil de ${id}`}
              className="object-cover w-[50px] h-[50px] rounded-full"
            />
            <textarea
              {...register("content")}
              maxLength={255}
              className="w-full outline-none bg-transparent h-40 mt-2 resize-none p-2 rounded-lg"
              placeholder="Quoi de neuf ?"
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
};
