import { loginUser } from "@/services/userService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

type LoginCredentials = {
  username: string;
  password: string;
};

const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const loginMutation = useMutation({
    mutationFn: (data: LoginCredentials) =>
      loginUser(data.username, data.password),
  });

  const login = async (data: LoginCredentials) => {
    const loginResult = await loginMutation.mutateAsync(data);

    if (loginResult?.token) {
      localStorage.setItem("token", loginResult.token);
      queryClient.invalidateQueries({ queryKey: ["me"] });
      navigate("/");
    }

    return loginResult;
  };

  return {
    login,
    isPending: loginMutation.isPending,
    error: loginMutation.error,
  };
};

export default useLogin;
