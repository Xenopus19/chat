import { useQuery } from "@tanstack/react-query";
import UsersList from "./UsersList";
import { getAllUsers } from "@/services/userService";
import { handleApiError } from "@/utils/handleApiError";
import { useAppDispatch } from "@/store/hooks";

const Users = () => {
  const {
    data: users,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  const dispatch = useAppDispatch();

  if (isLoading || !users) {
    return <div>Loading...</div>;
  }

  if(isError) {
    handleApiError(error, dispatch, "Failed to fetch users.");
  }

  return (
    <div>
      <UsersList users={users} />
    </div>
  );
};

export default Users;
