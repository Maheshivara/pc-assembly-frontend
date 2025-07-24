"use client";
import { useAuth } from "@/hooks/auth";
import React, { useState } from "react";
import { z } from "zod";

const loginSchema = z
  .object({
    username: z.string().min(5).max(100),
    email: z.email({ message: "Email Inválido" }),
    password: z
      .string()
      .min(8, { message: "A senha deve ter pelo menos 8 caracteres" })
      .max(20, { message: "A senha não pode ter mais de 20 caracteres" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Confirmação de senha é obrigatória" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
  });

export function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
    username?: string;
  }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = loginSchema.safeParse({
      email,
      password,
      confirmPassword,
      username,
    });
    if (!result.success) {
      const fieldErrors: {
        email?: string;
        password?: string;
        confirmPassword?: string;
        username?: string;
      } = {};
      result.error.issues.forEach((err) => {
        if (err.path[0] === "email") fieldErrors.email = err.message;
        if (err.path[0] === "password") fieldErrors.password = err.message;
        if (err.path[0] === "confirmPassword")
          fieldErrors.confirmPassword = err.message;
        if (err.path[0] === "username") fieldErrors.username = err.message;
      });

      setErrors(fieldErrors);
      return;
    }
    useAuth.Register(username, email, password);
    setErrors({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-[350px] mx-auto mt-8 p-8 rounded-lg shadow-lg bg-[var(--form-background)] flex flex-col gap-5"
    >
      <h2 className="text-center m-0 font-bold">Cadastro</h2>
      <label className="flex flex-col gap-1">
        Nome de Usuário
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full p-2 mt-1 rounded border border-gray-300"
        />
        {errors.username && (
          <span className="text-red-600 text-sm">{errors.username}</span>
        )}
      </label>
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
        Senha
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
      <label className="flex flex-col gap-1">
        Confirmar Senha
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full p-2 mt-1 rounded border border-gray-300"
        />
        {errors.confirmPassword && (
          <span className="text-red-600 text-sm">{errors.confirmPassword}</span>
        )}
      </label>
      <button
        type="submit"
        className="p-3 rounded border-none bg-[var(--button-signup)] text-white font-bold cursor-pointer mt-4 transition-colors hover:bg-[var(--button-signup-hover)]"
        onClick={(e) => handleSubmit(e)}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "var(--button-signup-hover)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "var(--button-signup)";
        }}
      >
        Cadastrar
      </button>
    </form>
  );
}
