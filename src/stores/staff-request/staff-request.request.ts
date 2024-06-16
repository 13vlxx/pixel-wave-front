import { PixelWaveAxios } from "@api/Axios";
import { CreateStaffRequestDto, LastStaffRequestDto } from "./staff-request.model";

export default {
  getLastStaffRequest: () =>
    PixelWaveAxios.get<LastStaffRequestDto>(`/staff-requests/last`).then((res) => res.data),
  createStaffRequest: (createStaffRequestDto: CreateStaffRequestDto) =>
    PixelWaveAxios.post<LastStaffRequestDto>(`/staff-requests`, createStaffRequestDto).then(
      (res) => res.data
    ),
};
