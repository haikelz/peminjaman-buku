"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { schema } from "~lib/utils/schema";

export default function LoginAdminClient() {
  const {
    getValues,
    formState: { errors },
    setError,
    register,
    handleSubmit,
  } = useForm({
    defaultValues: { username: "", password: "" },
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  async function onSubmit() {
    const response = await signIn("credentials", {
      redirect: false,
      username: getValues("username"),
      password: getValues("password"),
      callbackUrl: "/dashboard",
    });

    if (response?.error) {
      setError("root", { message: "Username or password are wrong!" });
    } else {
      router.push("/dashboard");
    }    
  }

  return (
    <form
      className="flex flex-col justify-center items-center bg-white drop-shadow-lg p-6 rounded-xl"
      onSubmit={handleSubmit(onSubmit)}
      data-cy="login-admin-form"
    >
      <Image src="/logo.svg" alt="logo" width={300} height={300} data-cy="login-admin-logo" />
      <h3 className="text-2xl font-bold text-center my-7 text-black" data-cy="login-admin-title">Login as admin</h3>
      <div className="space-y-3 w-full">
        <div>
          <input
            {...register("username")}
            type="text"
            className="rounded-md w-full"
            placeholder="Username...."
            data-cy="login-admin-input-username"
          />
          {errors.username ? <p className="mt-1">{errors.username.message}</p> : null}
        </div>
        <div>
          <input
            {...register("password")}
            type="password"
            className="rounded-md w-full"
            placeholder="Password...."
            data-cy="login-admin-input-password"
          />
          {errors.password ? <p className="mt-1">{errors.password.message}</p> : null}
        </div>
      </div>
      <button className="bg-primary w-full text-white font-bold rounded-md mt-4 py-2" type="submit" aria-label="submit" data-cy="login-admin-submit-button">
        Submit!
      </button>
      {errors.root ? <p className="mt-2">{errors.root.message}</p> : null}
    </form>
  );
}
