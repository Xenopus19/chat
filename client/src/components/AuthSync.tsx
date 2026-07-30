import { useEffect, type ReactNode } from "react";
import useMe from "../hooks/useMe";
import { useAppDispatch } from "../store/hooks";
import { setUser } from "../reducers/user";
import useLogout from "../hooks/useLogout";
import { socket } from "@/socket";

type AuthSyncProps = {
  children: ReactNode;
};

const AuthSync = ({ children }: AuthSyncProps) => {
  const { data: user, isError, isLoading } = useMe();
  const dispatch = useAppDispatch();
  const logoutUser = useLogout();

  useEffect(() => {
    if (user) {
      dispatch(setUser(user));

      const token = localStorage.getItem("token");
      if (token) {
        socket.auth = { token };
        if (!socket.connected) {
          socket.connect();
        }
      }
    } else if (isError || (!isLoading && !user)) {
      if (socket.connected) {
        socket.disconnect();
      }
      logoutUser();
    }
  }, [user, isError, isLoading, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default AuthSync;
