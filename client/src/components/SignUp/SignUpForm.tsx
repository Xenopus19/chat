import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import signUpSchema, { type SignUpInfoType } from "./SignUpSchema";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface SignUpFormProps {
  onSubmit: (data: SignUpInfoType) => void;
}

const SignUpForm = ({ onSubmit }: SignUpFormProps) => {
  const form = useForm<SignUpInfoType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      password: "",
      description: "",
    },
  });

  const submit = async (data: SignUpInfoType) => {
    onSubmit(data);
  };

  return (
    <div className="mx-auto max-w-md">
      <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(submit)}>
        <Field>
          <FieldLabel className="text-emerald-800 dark:text-emerald-200">Username</FieldLabel>
          <Input
            autoComplete="username"
            className="border-emerald-500/30 bg-white focus-visible:border-emerald-500 focus-visible:ring-emerald-500/30 dark:bg-emerald-950/25"
            {...form.register("username")}
          />
          <FieldDescription className="text-emerald-700/80 dark:text-emerald-300/80">
            Public username.
          </FieldDescription>
          {form.formState.errors.username && (
            <FieldError>{form.formState.errors.username.message}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel className="text-emerald-800 dark:text-emerald-200">Password</FieldLabel>
          <Input
            autoComplete="current-password"
            type="password"
            className="border-emerald-500/30 bg-white focus-visible:border-emerald-500 focus-visible:ring-emerald-500/30 dark:bg-emerald-950/25"
            {...form.register("password")}
          />
          <FieldDescription className="text-emerald-700/80 dark:text-emerald-300/80">
            Your password.
          </FieldDescription>
          {form.formState.errors.password && (
            <FieldError>{form.formState.errors.password.message}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel className="text-emerald-800 dark:text-emerald-200">Description</FieldLabel>
          <Textarea
            className="resize-none border-emerald-500/30 bg-white focus-visible:border-emerald-500 focus-visible:ring-emerald-500/30 dark:bg-emerald-950/25"
            {...form.register("description")}
          />
          <FieldDescription className="text-emerald-700/80 dark:text-emerald-300/80">
            Your profile description.
          </FieldDescription>
          {form.formState.errors.description && (
            <FieldError>{form.formState.errors.description.message}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel className="text-emerald-800 dark:text-emerald-200">Date of Birth</FieldLabel>
          <Input
            type="date"
            className="border-emerald-500/30 bg-white focus-visible:border-emerald-500 focus-visible:ring-emerald-500/30 dark:bg-emerald-950/25"
            {...form.register("birthdate")}
          />
          <FieldDescription className="text-emerald-700/80 dark:text-emerald-300/80">
            Your date of birth.
          </FieldDescription>
          {form.formState.errors.birthdate && (
            <FieldError>{form.formState.errors.birthdate.message}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel className="text-emerald-800 dark:text-emerald-200">Profile picture</FieldLabel>
          <Input
            type="file"
            className="border-emerald-500/30 bg-white file:text-emerald-700 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/30 dark:bg-emerald-950/25 dark:file:text-emerald-300"
            {...form.register("avatar")}
          />
          <FieldDescription className="text-emerald-700/80 dark:text-emerald-300/80">
            Your avatar.
          </FieldDescription>
          {form.formState.errors.avatar && (
            <FieldError>{form.formState.errors.avatar.message as string}</FieldError>
          )}
        </Field>

        <Button
          type="submit"
          className="bg-emerald-600 text-white hover:bg-emerald-700"
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
