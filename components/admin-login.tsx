"use client";

import { useState } from "react";

export function AdminLogin({
  onLogin,
}: {
  onLogin: () => void;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Temporary credentials for testing.
    // We will move these into secure environment variables later.
    if (
      username === "admin" &&
      password === "change-me"
    ) {
      setError("");
      onLogin();
    } else {
      setError("Invalid username or password.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-semibold">
            SONDERspace
          </h1>

          <p className="mt-2 opacity-60">
            Administrator Access
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border p-8"
        >
          <div>
            <label className="mb-2 block text-sm">
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border bg-transparent px-4 py-3 outline-none"
              placeholder="Username"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border bg-transparent px-4 py-3 outline-none"
              placeholder="Password"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-black px-4 py-3 text-white transition-opacity hover:opacity-80"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}