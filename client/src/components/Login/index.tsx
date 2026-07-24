import type { LoginInfoType } from "./LoginSchema";
import LoginForm from "./LoginForm";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const { login } = useLogin();

  const handleLogin = async (data: LoginInfoType) => {
    try {
      await login(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="relative mx-auto max-w-xl overflow-hidden rounded-3xl border border-emerald-500/20 bg-linear-to-br from-emerald-500/10 via-background to-background p-6 sm:p-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -right-16 h-44 w-44 rounded-full bg-emerald-500/20 blur-3xl"
      />
      <div className="relative">
        <p className="mb-5 text-center text-2xl font-bold text-emerald-700 dark:text-emerald-400">
          Log into existing account
        </p>
      </div>
      <LoginForm onSubmit={handleLogin} />
    </section>
  );
};

export default Login;
