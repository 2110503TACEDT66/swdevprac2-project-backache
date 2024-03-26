"use client";

import { signOut } from "next-auth/react";

export default function SignOutPage() {
  const handleSignOut = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signOut();
      window.location.href = "/";
    } catch (error) {
      console.error("Error occurred during sign out:", error);
    }
  };

  return (
    <div className="bg-blue-100 p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-blue-700 text-center mb-5">
        Sign Out
      </h1>
      <p className="text-blue-600 text-center mb-8">
        Are you sure you want to end your session?
      </p>
      <form onSubmit={handleSignOut} className="flex justify-center">
        <input type="hidden" name="csrfToken" value="csrf" />
        <button
          id="submitButton"
          type="submit"
          className="bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800 transition-colors"
        >
          Sign Out
        </button>
      </form>
    </div>
  );
}
