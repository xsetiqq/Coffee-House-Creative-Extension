"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useLoginUser } from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";
import type { AxiosError } from "axios";
import { LoaderCircle } from "lucide-react";
import { motion } from "framer-motion";
import { LoginFormValues, loginSchema } from "@/lib/validation/auth.schema";

export default function RegistrationForm() {
  const router = useRouter();
  const { mutate: loginUser, isPending } = useLoginUser();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    loginUser(data, {
      onSuccess: (response) => {
        localStorage.setItem("authToken", response.data.access_token);
        localStorage.setItem("userProfile", JSON.stringify(response.data.user));
        window.dispatchEvent(
          new CustomEvent("auth:change", {
            detail: { user: response.data.user },
          })
        );
        toast.success(response.message || "Login successful!");
        router.back();
      },
      onError: (error: AxiosError<{ error?: string }>) => {
        const message =
          error?.response?.data?.error ||
          error?.message ||
          "Login failed. Please try again.";

        toast.error(message);
      },
    });
  };

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = form;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1,
        ease: "backOut",
      }}
    >
      {" "}
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 w-full max-w-sm mx-auto flex flex-col gap-0"
        >
          <FormField
            control={control}
            name="login"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Login</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter your login"
                    onFocus={() => form.clearErrors("login")}
                    className={`${
                      errors.login
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }`}
                  />
                </FormControl>
                <FormMessage />
                {!errors.login && <div className="h-5" />}
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Enter your password"
                    onFocus={() => form.clearErrors("password")}
                    className={`${
                      errors.password
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }`}
                  />
                </FormControl>
                <FormMessage />
                {!errors.password && <div className="h-5" />}
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={!isValid || isPending}
            className="cursor-pointer w-40 rounded-full mx-auto"
          >
            {isPending ? (
              <>
                <LoaderCircle className="animate-spin w-4 h-4" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
}
