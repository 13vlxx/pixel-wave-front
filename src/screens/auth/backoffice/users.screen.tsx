import { PaginatedResponse } from "@/_utils/paginated-response";
import { PaginationComponent } from "@/components/custom/_utils/pagination.component";
import { BackofficeUserTable } from "@/components/custom/tables/backoffice-users.table";
import { GetUserDto } from "@/stores/user/user.model";
import UserRequest from "@/stores/user/user.request";
import { useEffect, useState } from "react";

export const BackofficeUsersScreen = () => {
  const [data, setData] = useState<PaginatedResponse<GetUserDto>>();

  useEffect(() => {
    UserRequest.getPaginatedUsers({ page: 1, limit: 10 }).then(setData);
  }, []);

  const handlePageChange = (page: number) => {
    UserRequest.getPaginatedUsers({ page, limit: 10 }).then(setData);
  };

  if (data)
    return (
      <div>
        <h1>Liste des utilisateurs ({data.meta.numberOfItems})</h1>
        <BackofficeUserTable users={data.data} />
        <PaginationComponent currentPage={data.meta.page} totalPages={data.meta.totalPages} onPageChange={handlePageChange} />
      </div>
    );
};
