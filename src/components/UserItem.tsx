import { FC } from "react";
import { User } from "../interfaces";

interface Props {
  user: User;
  deleteUser: (email: string) => void;
}

export const UserItem: FC<Props> = ({ user, deleteUser }) => {
  const handleDelete = (email: string) => () => {
    deleteUser(email);
  };

  return (
    <tr key={user.email}>
      <td>
        <img src={user.picture.thumbnail} alt={user.name.first} />
      </td>
      <td>{user.name.first}</td>
      <td>{user.name.last}</td>
      <td>{user.location.country}</td>
      <td>
        <button className="delete-button" onClick={handleDelete(user.email)}>
          <i className="fa-regular fa-trash-can"></i>
        </button>
      </td>
    </tr>
  );
};
