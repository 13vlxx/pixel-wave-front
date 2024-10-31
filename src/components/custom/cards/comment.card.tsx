import { Card, CardContent } from "@/components/ui/card";
import { CommentDto } from "@/stores/post/post.model";
import { useUserStore } from "@/stores/user/user.store";
import dayjs from "dayjs";
import { FaTrash } from "react-icons/fa";
import { UserAvatar } from "../_utils/user.avatar";

export interface CommentCardProps {
  comment: CommentDto;
  onDelete: (commentId: string) => void;
}

export const CommentCard = (props: CommentCardProps) => {
  const { comment, onDelete } = props;
  const { id } = useUserStore();

  return (
    <Card className="pt-4">
      <CardContent className="space-y-2">
        <section className="flex items-start justify-between">
          <div className="flex items-center gap-1">
            <UserAvatar user={comment.user} />
            <h1 className="max-w-[100%] text-muted-foreground text-[12px] text-ellipsis line-clamp-1">{dayjs(comment.createdAt).fromNow()}</h1>
          </div>
          {id == comment.user.id && (
            <FaTrash onClick={() => onDelete(comment.id)} className="text-sm text-muted-foreground hover:text-foreground transition-all duration-150" />
          )}
        </section>
        <p className="text-sm">{comment.content}</p>
      </CardContent>
    </Card>
  );
};
