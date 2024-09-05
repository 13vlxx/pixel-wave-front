import { PixelWaveAxios } from "@api/Axios";
import { GetNotificationsDto, UpdateReceiveNotificationsDto } from "@stores/user/user.model";

export default {
  getNotifications: () =>
    PixelWaveAxios.get<GetNotificationsDto[]>("/notifications").then((res) => res.data),
  toggleReceiveNotifications: (receiveNotificationsDto: UpdateReceiveNotificationsDto) =>
    PixelWaveAxios.patch("/notifications/receive-notifications", receiveNotificationsDto).then(
      (res) => res.data
    ),
  check: () => PixelWaveAxios.get<boolean>("/notifications/check").then((res) => res.data),
};
