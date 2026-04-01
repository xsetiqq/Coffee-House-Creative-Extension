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
import { useRegisterUser } from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";
import type { AxiosError } from "axios";
import { LoaderCircle } from "lucide-react";
import { motion } from "framer-motion";
import {
  registrationSchema,
  RegisterFormValues,
} from "@/lib/validation/auth.schema";
import { RegisterRequest } from "@/lib/api/auth";

export default function SignUpForm() {
  const router = useRouter();
  const { mutate: registerUser, isPending } = useRegisterUser();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registrationSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      login: "",
      password: "",
      confirmPassword: "",
      city: "",
      street: "",
      houseNumber: undefined,
      paymentMethod: "cash",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = form;

  const onSubmit = (data: RegisterFormValues) => {
      const payload: RegisterRequest = {
        login: data.login,
        password: data.password,
        confirmPassword: data.confirmPassword,
        city: data.city,
        street: data.street,
        houseNumber: data.houseNumber, 
        paymentMethod: data.paymentMethod,
      };
    registerUser(payload, {
      onSuccess: (response) => {
        localStorage.setItem("authToken", response.data.access_token);
        localStorage.setItem("userProfile", JSON.stringify(response.data.user));
        window.dispatchEvent(
          new CustomEvent("auth:change", {
            detail: { user: response.data.user },
          })
        );
        toast.success(response?.message || "Registration successful!");
        router.back();
      },
      onError: (error: AxiosError<{ error?: string }>) => {
        const message =
          error?.response?.data?.error ||
          error?.message ||
          "Registration failed. Please try again.";
        toast.error(message);
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-[1200px] mx-auto "
    >
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FormField
              control={control}
              name="login"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Login</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Placeholder"
                      onFocus={() => form.clearErrors("login")}
                      className={`selection:text-white${
                        errors.login
                          ? "border-red-500 focus-visible:ring-red-500 "
                          : ""
                      }`}
                    />
                  </FormControl>
                  <FormMessage className="h-10" />
                  {!errors.login && <div className="h-10" />}
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
                      placeholder="Placeholder"
                      onFocus={() => form.clearErrors("password")}
                      className={` selection:text-white${
                        errors.password
                          ? "border-red-500 focus-visible:ring-red-500"
                          : ""
                      }`}
                    />
                  </FormControl>
                  <FormMessage className="h-10" />
                  {!errors.password && <div className="h-10" />}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Placeholder"
                      onFocus={() => form.clearErrors("confirmPassword")}
                      className={`selection:text-white ${
                        errors.confirmPassword
                          ? "border-red-500 focus-visible:ring-red-500"
                          : ""
                      }`}
                    />
                  </FormControl>
                  <FormMessage className="h-10" />
                  {!errors.confirmPassword && <div className="h-10" />}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Placeholder"
                      onFocus={() => form.clearErrors("city")}
                      className={`selection:text-white${
                        errors.city
                          ? "border-red-500 focus-visible:ring-red-500"
                          : ""
                      }`}
                    />
                  </FormControl>
                  <FormMessage className="h-10" />
                  {!errors.city && <div className="h-10" />}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Placeholder"
                      onFocus={() => form.clearErrors("street")}
                      className={`selection:text-white ${
                        errors.street
                          ? "border-red-500 focus-visible:ring-red-500"
                          : ""
                      }`}
                    />
                  </FormControl>
                  <FormMessage className="h-10" />
                  {!errors.street && <div className="h-10" />}
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-4">
              <FormField
                control={control}
                name="houseNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>House number</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="Placeholder"
                        onChange={(e) => {
                          const value = e.target.value;

                          field.onChange(value === "" ? "" : Number(value));
                        }}
                        value={field.value || ""}
                        onFocus={() => form.clearErrors("houseNumber")}
                        className={`selection:text-white${
                          errors.houseNumber
                            ? "border-red-500 focus-visible:ring-red-500"
                            : ""
                        }`}
                      />
                    </FormControl>
                    <FormMessage className="h-10" />
                    {!errors.houseNumber && <div className="h-10" />}
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-center flex-col items-center gap-8">
            <FormField
              control={control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pay by</FormLabel>
                  <div className="flex items-center gap-6 mt-2">
                    <label className="flex items-center gap-2 cursor-pointer text-primary">
                      <div className="relative">
                        <input
                          type="radio"
                          value="cash"
                          checked={field.value === "cash"}
                          onChange={() => field.onChange("cash")}
                          className="sr-only"
                        />
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center dark:text-white justify-center  transition-colors ${
                            field.value === "cash"
                              ? "bg-foreground border-foreground text-primary-foreground dark:border-primary"
                              : "border-ring"
                          }`}
                        >
                          {field.value === "cash" && (
                            <div className="w-2 h-2 bg-primary-foreground dark:bg-white rounded-full"></div>
                          )}
                        </div>
                      </div>
                      Cash
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-primary">
                      <div className="relative">
                        <input
                          type="radio"
                          value="card"
                          checked={field.value === "card"}
                          onChange={() => field.onChange("card")}
                          className="sr-only"
                        />
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center dark:text-white justify-center  transition-colors ${
                            field.value === "card"
                              ? "bg-foreground border-foreground text-primary-foreground dark:border-primary"
                              : "border-ring"
                          }`}
                        >
                          {field.value === "card" && (
                            <div className="w-2 h-2 bg-primary-foreground dark:bg-white rounded-full"></div>
                          )}
                        </div>
                      </div>
                      Card
                    </label>
                  </div>
                  <FormMessage className="h-10" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={!isValid || isPending}
              className="w-40 rounded-full"
            >
              {isPending ? (
                <>
                  <LoaderCircle className="animate-spin w-4 h-4 mr-2" />
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
