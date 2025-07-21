"use client";
import React, { useState } from "react";
import { z } from "zod";

const loginSchema = z.object({
  email: z.email({ message: "Email Inválido" }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
});

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors: { email?: string; password?: string } = {};
      result.error.issues.forEach((err) => {
        if (err.path[0] === "email") fieldErrors.email = err.message;
        if (err.path[0] === "password") fieldErrors.password = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});

    alert(`Email: ${email}\nPassword: ${password}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-[350px] mx-auto mt-8 p-8 rounded-lg shadow-lg bg-[var(--form-background)] flex flex-col gap-5"
    >
      <h2 className="text-center m-0 font-bold">Entrar</h2>
      <label className="flex flex-col gap-1">
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 mt-1 rounded border border-gray-300"
        />
        {errors.email && (
          <span className="text-red-600 text-sm">{errors.email}</span>
        )}
      </label>
      <label className="flex flex-col gap-1">
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 mt-1 rounded border border-gray-300"
        />
        {errors.password && (
          <span className="text-red-600 text-sm">{errors.password}</span>
        )}
      </label>
      <button
        type="submit"
        className="p-3 rounded border-none bg-[var(--button-login)] text-white font-bold cursor-pointer mt-4 transition-colors"
        onMouseOver={(e) => {
          e.currentTarget.style.background = "var(--button-login-hover)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = "var(--button-login)";
        }}
      >
        Entrar
      </button>
    </form>
  );
}
