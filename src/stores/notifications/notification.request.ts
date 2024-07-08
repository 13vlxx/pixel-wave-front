import { PixelWaveAxios } from "@api/Axios";
import { UpdateReceiveNotificationsDto } from "@stores/user/user.model";

export default {
  toggleReceiveNotifications: (receiveNotificationsDto: UpdateReceiveNotificationsDto) =>
    PixelWaveAxios.patch("/notifications/receive-notifications", receiveNotificationsDto).then(
      (res) => res.data
    ),
  getNotifications: () => PixelWaveAxios.get("/notifications").then((res) => res.data),
};
