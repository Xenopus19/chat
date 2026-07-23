import { loginUser } from "@/services/userService";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

type LoginCredentials = {
	username: string;
	password: string;
};

const useLogin = () => {
	const navigate = useNavigate();
	const loginMutation = useMutation({
		mutationFn: (data: LoginCredentials) => loginUser(data.username, data.password),
	});

	const login = async (data: LoginCredentials) => {
		const loginResult = await loginMutation.mutateAsync(data);

		if (loginResult?.token) {
			localStorage.setItem("token", loginResult.token);
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
