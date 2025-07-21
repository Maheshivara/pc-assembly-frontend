"use client";
import React, { useState } from "react";
import { z } from "zod";

const loginSchema = z
  .object({
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = loginSchema.safeParse({ email, password, confirmPassword });
    if (!result.success) {
      const fieldErrors: {
        email?: string;
        password?: string;
        confirmPassword?: string;
      } = {};
      result.error.issues.forEach((err) => {
        if (err.path[0] === "email") fieldErrors.email = err.message;
        if (err.path[0] === "password") fieldErrors.password = err.message;
        if (err.path[0] === "confirmPassword")
          fieldErrors.confirmPassword = err.message;
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
      style={{
        maxWidth: 350,
        margin: "2rem auto",
        padding: "2rem",
        borderRadius: 8,
        boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
        background: "var(--login-form-background)",
        display: "flex",
        flexDirection: "column",
        gap: "1.2rem",
      }}
    >
      <h2 style={{ textAlign: "center", margin: 0, fontWeight: "bold" }}>
        Cadastro
      </h2>
      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "0.5rem",
            marginTop: "0.3rem",
            borderRadius: 4,
            border: "1px solid #ccc",
          }}
        />
        {errors.email && (
          <span style={{ color: "red", fontSize: "0.9rem" }}>
            {errors.email}
          </span>
        )}
      </label>
      <label>
        Senha
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "0.5rem",
            marginTop: "0.3rem",
            borderRadius: 4,
            border: "1px solid #ccc",
          }}
        />
        {errors.password && (
          <span style={{ color: "red", fontSize: "0.9rem" }}>
            {errors.password}
          </span>
        )}
      </label>
      <label>
        Confirmar Senha
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "0.5rem",
            marginTop: "0.3rem",
            borderRadius: 4,
            border: "1px solid #ccc",
          }}
        />
        {errors.confirmPassword && (
          <span style={{ color: "red", fontSize: "0.9rem" }}>
            {errors.confirmPassword}
          </span>
        )}
      </label>
      <button
        type="submit"
        style={{
          padding: "0.7rem",
          borderRadius: 4,
          border: "none",
          background: "var(--button-signup)",
          color: "#fff",
          fontWeight: "bold",
          cursor: "pointer",
          marginTop: "1rem",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = "var(--button-signup-hover)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = "var(--button-signup)";
        }}
      >
        Cadastrar
      </button>
    </form>
  );
}
