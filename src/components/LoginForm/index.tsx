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
        Sign In
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
        Password
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
      <button
        type="submit"
        style={{
          padding: "0.7rem",
          borderRadius: 4,
          border: "none",
          background: "var(--button-login)",
          color: "#fff",
          fontWeight: "bold",
          cursor: "pointer",
          marginTop: "1rem",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = "var(--button-login-hover)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = "var(--button-login)";
        }}
      >
        Sign In
      </button>
    </form>
  );
}
