import { useEffect, type ReactNode } from "react";
import useMe from "./hooks/useMe";
import { useAppDispatch } from "./store/hooks";
import { setUser } from "./reducers/user";
import useLogout from "./hooks/useLogout";

type AuthSyncProps = {
  children: ReactNode;
};

const AuthSync = ({ children }: AuthSyncProps) => {
  const { data: user, isError } = useMe();
  const dispatch = useAppDispatch();
  const logoutUser = useLogout();
  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
    } else if (isError) {
      logoutUser();
    }
  }, [user, isError, dispatch]);

  return <>{children}</>;
};

export default AuthSync;
