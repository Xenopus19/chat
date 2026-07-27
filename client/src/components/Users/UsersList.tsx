import type { User } from "@/types";
import UserCard from "@/components/Users/UserCard";

interface UsersListProps {
  users: User[];
}

const UsersList = ({ users }: UsersListProps) => {
  if (!users?.length) {
    return <p>No users found.</p>;
  }

  return (
    <section>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "grid",
          gap: "12px",
        }}
      >
        {users.map((user) => {
          return (
            <li key={user.id}>
              <UserCard user={user} />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default UsersList;