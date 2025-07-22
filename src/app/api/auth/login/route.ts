// TypeScript
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();
  const { accessToken, refreshToken } = body;
  const cookiesStore = await cookies();

  if (!accessToken || !refreshToken) {
    return new Response(JSON.stringify({ error: "Missing tokens" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  const accessTokenInfo = JSON.parse(atob(accessToken.split(".")[1]));
  cookiesStore.set("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(accessTokenInfo.exp * 1000),
  });

  const refreshTokenInfo = JSON.parse(atob(refreshToken.split(".")[1]));
  cookiesStore.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(refreshTokenInfo.exp * 1000),
  });

  return new Response(null, { status: 204 });
}

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!accessToken || !refreshToken) {
    return new Response(JSON.stringify({ error: "Tokens not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
  return new Response(JSON.stringify({ accessToken, refreshToken }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");

  return new Response(null, { status: 204 });
}
