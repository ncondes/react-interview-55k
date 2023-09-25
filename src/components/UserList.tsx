import { FC, MouseEventHandler } from "react";
import { SortType, User } from "../interfaces";
import { UserItem } from ".";

interface Props {
  users: User[];
  showColoredRows: boolean;
  deleteUser: (email: string) => void;
  handleSortType: (
    sortType: SortType
  ) => MouseEventHandler<HTMLTableHeaderCellElement> | undefined;
}

export const UserList: FC<Props> = ({
  users,
  showColoredRows,
  deleteUser,
  handleSortType,
}) => {
  return (
    <table width="100%">
      <thead>
        <tr>
          <th>Picture</th>
          <th className="th" onClick={handleSortType(SortType.First)}>
            First Name
          </th>
          <th className="th" onClick={handleSortType(SortType.Last)}>
            Last Name
          </th>
          <th className="th" onClick={handleSortType(SortType.Country)}>
            Country
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody className={showColoredRows ? "table__show-colored-rows" : ""}>
        {users.map((user) => (
          <UserItem key={user.email} user={user} deleteUser={deleteUser} />
        ))}
      </tbody>
    </table>
  );
};
