"use client";
import { signIn } from "next-auth/react";

export default function signInPage() {
  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await signIn("credentials", {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
      redirect: false,
    });

    if (response?.ok) {
      window.location.href = "/";
    } else {
      alert("Sign-In failed, Please try again");
    }
  };

  return (
    <div className="bg-blue-100 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full mt-20">
        <h1 className="text-2xl font-semibold text-blue-700 text-center mb-6">
          Sign In
        </h1>
        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="text-blue-700 font-semibold block mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="w-full px-3 py-2 rounded-md border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-blue-700 font-semibold block mb-1"
            >
              Password
            </label>
            <input
              required
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className="w-full px-3 py-2 rounded-md border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800 transition-colors w-full"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
