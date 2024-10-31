import { PaginatedResponse, PaginationOptionsDto } from "@/_utils/paginated-response";
import { PixelWaveAxios } from "@/api/axios";
import { GetMeDto, GetRoleDto, GetUserDto, GetUserProfileDto, UpdateSettingsDto } from "@/stores/user/user.model";

export default {
  getMe: () => PixelWaveAxios.get<GetMeDto>(`/users/me`).then((res) => res.data),
  getRole: () => PixelWaveAxios.get<GetRoleDto>(`/users/me/role`).then((res) => res.data),
  getUserById: (id: string, currentUserId?: string) =>
    PixelWaveAxios.get<GetUserProfileDto>(`/users/${id}?currentUserId=${currentUserId}`).then((res) => res.data),
  updateSettings: (update: UpdateSettingsDto) => PixelWaveAxios.patch(`/users/profile`, update).then((res) => res.data),
  updateProfilePicture: (profilePicture: FormData) => PixelWaveAxios.patch(`/users/profile/picture`, profilePicture).then((res) => res.data),
  getPaginatedUsers: (options?: PaginationOptionsDto) =>
    PixelWaveAxios.get<PaginatedResponse<GetUserDto>>(`/users/paginated?page=${options?.page ?? 1}&limit=${options?.limit ?? 10}`).then((res) => res.data),
};
