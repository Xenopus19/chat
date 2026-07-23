import useUploadImage from "@/hooks/useUploadImage";
import useLogin from "@/hooks/useLogin";
import SignUpForm from "./SignUpForm";
import type { SignUpInfoType } from "./SignUpSchema";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "@/services/userService";

const SignUp = () => {
  const { uploadImage } = useUploadImage();
  const { login } = useLogin();
  const createUserMutation = useMutation({ mutationFn: createUser });
  
  const handleSubmit = async (data: SignUpInfoType) => {
    try {
      const key = await uploadImage(data.avatar[0]);
      console.log("Uploaded image key:", key);
      await createUserMutation.mutateAsync({
        ...data,
        avatarUrl: `${import.meta.env.VITE_BUCKET_URL}/${key}`,
      });
      await login({ username: data.username, password: data.password });
    } catch (error) {
      console.error("Error during sign up:", error);
    }
  };
  return (
    <div>
      <p className="text-2xl mb-5 font-bold text-center">Create account</p>
      <SignUpForm onSubmit={handleSubmit} />
    </div>
  );
};

export default SignUp;
