import { useNavigate } from "react-router-dom";
import type { LoginInfoType } from "./LoginSchema";
import LoginForm from "./LoginForm";
import useLogin from "../../hooks/useLogin";
import { useAppDispatch } from "../../store/hooks";
import { makeMessage } from "../../reducers/message";

const Login = () => {
  const {login} = useLogin()
  const dispatch = useAppDispatch();

  const handleLogin = async (data: LoginInfoType) => {
    try {
      await login(data)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div >
      <p className="text-2xl mb-5 font-bold text-center">Log into existing account</p>
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default Login;
