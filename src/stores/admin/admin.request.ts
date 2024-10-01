import { PixelWaveAxios } from "../../api/Axios";
import { GetAdminDataDto } from "./admin.model";

export default {
  getData: () => PixelWaveAxios.get<GetAdminDataDto>("/admin").then((res) => res.data),
};
