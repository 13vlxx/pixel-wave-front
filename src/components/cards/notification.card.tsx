import Verified from "@components/verified.component";
import {
  GetNotificationsDto,
  NotificationTypeEnum,
} from "@stores/user/user.model";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/user/user.store";

dayjs.locale("fr");
dayjs.extend(relativeTime);

interface NotificationCardProps {
  notification: GetNotificationsDto;
}

const NotificationCard = (props: NotificationCardProps) => {
  const { notification } = props;
  const { id } = useUserStore();
  const navigate = useNavigate();

  const notificationMessage = () => {
    switch (notification.notificationType) {
      case NotificationTypeEnum.NEW_LIKE:
        return "a aimé votre publication";
      case NotificationTypeEnum.NEW_COMMENT:
        return "a commenté votre publication";
    }
  };

  const handleNavigateToDestination = () => {
    navigate(`/posts/${notification.destinationId}`);
  };

  return (
    <div
      onClick={handleNavigateToDestination}
      className="border-b border-black pb-4"
    >
      <div className="flex justify-between items-center">
        <Link
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
          to={`/profile/${notification.user.id === id ? "me" : notification.user.id}`}
          className="avatar"
        >
          <div className="w-12 rounded-full">
            <img
              src={notification.user.profilePicture || "/default-pfp.jpeg"}
            />
          </div>
        </Link>
        {dayjs(notification.createdAt).isBefore(dayjs().subtract(7, "day")) ? (
          <p className="capitalize">
            {dayjs(notification.createdAt).format("DD MMMM")}
          </p>
        ) : (
          <p>{dayjs(notification.createdAt).fromNow()}</p>
        )}
      </div>
      <p className="flex items-center gap-1 text-lg">
        @{notification.user.pseudo}{" "}
        <Verified size="10px" role={notification.user.role} />{" "}
        {notificationMessage()}
      </p>
    </div>
  );
};

export default NotificationCard;
