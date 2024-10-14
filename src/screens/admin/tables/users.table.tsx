import { useAdminStore } from "../../../stores/admin/admin.store";

export const UsersTable = () => {
  const users = useAdminStore().data?.users;

  return (
    <div className="h-full">
      <div className="overflow-x-auto border rounded-xl max-h-[500px]">
        <table className="table">
          <thead className="bg-neutral">
            <tr>
              <th>Id</th>
              <th>Email</th>
              <th>Pseudo</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr className="hover transition-all duration-150 cursor-pointer" key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.pseudo}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
