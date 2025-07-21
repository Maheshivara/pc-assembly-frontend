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
    <div className="w-full h-20 bg-[var(--top-bar)] flex items-center px-6 box-border font-bold text-[1.2rem]">
      <Link href="/" className="flex items-center no-underline">
        <div className="bg-white rounded-[10%] p-[1px]">
          <Image src="/logo.svg" alt="Logo" width={60} height={60} />
        </div>
        <div className="text-white flex flex-col justify-center h-full ml-2.5">
          <div>PC</div>
          <div>Assembly</div>
        </div>
      </Link>
      {username ? (
        <div className="ml-auto text-white flex items-center">
          <span>Bem-vindo, {username}!</span>
          <button
            className="bg-[var(--button-logout)] text-white border-none rounded-md px-5 py-2 font-bold cursor-pointer transition-colors ml-3"
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
        <div className="ml-auto flex gap-3">
          {showLoginButton && (
            <button
              className="bg-[var(--button-login)] text-white border-none rounded-md px-5 py-2 font-bold cursor-pointer transition-colors"
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "var(--button-login-hover)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--button-login)")
              }
              onClick={() => (window.location.href = "/login")}
            >
              Entrar
            </button>
          )}
          {showSignupButton && (
            <button
              className="bg-[var(--button-signup)] text-white border-none rounded-md px-5 py-2 font-bold cursor-pointer transition-colors"
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "var(--button-signup-hover)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--button-signup)")
              }
              onClick={() => (window.location.href = "/signup")}
            >
              Cadastrar-se
            </button>
          )}
        </div>
      )}
    </div>
  );
}
