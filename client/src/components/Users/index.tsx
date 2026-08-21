import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import UsersList from "./UsersList";
import { getAllUsers } from "@/services/userService";
import { handleApiError } from "@/utils/handleApiError";
import { useAppDispatch } from "@/store/hooks";
import { useState } from "react";
import { Field } from "../ui/field";
import { Input } from "../ui/input";
import Spinner from "@/components/Spinner";

const Users = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);
  const {
    data: users,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["users", debouncedSearch],
    queryFn: () => getAllUsers(debouncedSearch),
    placeholderData: keepPreviousData,
  });
  const dispatch = useAppDispatch();

  if (isLoading || !users) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner />
      </div>
    );
  }

  if(isError) {
    handleApiError(error, dispatch, "Failed to fetch users.");
  }

  return (
    <div className="space-y-4">
      <Field>
        <Input
          placeholder="Find users by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-emerald-500/30 bg-white focus-visible:border-emerald-500 focus-visible:ring-emerald-500/30 dark:bg-slate-900"
        />
      </Field>
      <UsersList users={users} />
    </div>
  );
};

export default Users;

