import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { GetUserDto } from "@/stores/user/user.model";
import dayjs from "dayjs";

interface BackofficeUserTableProps {
  users: GetUserDto[];
}

export const BackofficeUserTable = (props: BackofficeUserTableProps) => {
  const { users } = props;

  return (
    <Table className="border">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Pseudo</TableHead>
          <TableHead>Role</TableHead>
          <TableHead className="text-right">Membre depuis le</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((x) => (
          <TableRow key={x.id}>
            <TableCell className="font-medium">{x.id}</TableCell>
            <TableCell>{x.email}</TableCell>
            <TableCell>{x.pseudo}</TableCell>
            <TableCell>{x.role}</TableCell>
            <TableCell className="text-right">{dayjs(x.createdAt).format("DD MMMM YYYY")}</TableCell>
            <TableCell className="text-right space-y-2 space-x-2">
              <Button size={"sm"}>Modifer</Button>
              <Button variant={"destructive"} size={"sm"}>
                Supprimer
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
