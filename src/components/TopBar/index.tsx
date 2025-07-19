"use client";
import Image from "next/image";
import Link from "next/link";

export interface TopBarProps {
  username?: string;
  showLoginButton?: boolean;
  showSignupButton?: boolean;
}

export function TopBar({
  username,
  showLoginButton = true,
  showSignupButton = true,
}: TopBarProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "80px",
        backgroundColor: "var(--top-bar)",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        boxSizing: "border-box",
        fontWeight: "bold",
        fontSize: "1.2rem",
      }}
    >
      <Link
        href="/"
        style={{
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "10%",
            padding: "1px",
          }}
        >
          <Image src="/logo.svg" alt="Logo" width={60} height={60} />
        </div>
        <div
          style={{
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            marginLeft: "10px",
          }}
        >
          <div>PC</div>
          <div>Assembly</div>
        </div>
      </Link>
      {username ? (
        <div style={{ marginLeft: "auto", color: "white" }}>
          <span>Bem-vindo, {username}!</span>
          <button
            style={{
              backgroundColor: "var(--button-logout)",
              color: "white",
              border: "none",
              borderRadius: "6px",
              padding: "8px 20px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background 0.2s",
              marginLeft: "12px",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor =
                "var(--button-logout-hover)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--button-logout)")
            }
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div style={{ marginLeft: "auto", display: "flex", gap: "12px" }}>
          {showLoginButton && (
            <button
              style={{
                backgroundColor: "var(--button-login)",
                color: "white",
                border: "none",
                borderRadius: "6px",
                padding: "8px 20px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "var(--button-login-hover)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--button-login)")
              }
              onClick={() => (window.location.href = "/login")}
            >
              Sign In
            </button>
          )}
          {showSignupButton && (
            <button
              style={{
                backgroundColor: "var(--button-signup)",
                color: "white",
                border: "none",
                borderRadius: "6px",
                padding: "8px 20px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "var(--button-signup-hover)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--button-signup)")
              }
            >
              Sign Up
            </button>
          )}
        </div>
      )}
    </div>
  );
}
