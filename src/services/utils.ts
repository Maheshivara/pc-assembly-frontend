import { TokensResponse } from "@/types/responses/token";
import axios from "axios";

export async function storeTokens(tokens: TokensResponse): Promise<boolean> {
  try {
    await axios.post("/api/auth/login", {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
    return true;
  } catch (error) {
    console.error("Error storing tokens:", error);
    return false;
  }
}

export async function clearTokens(): Promise<boolean> {
  try {
    await axios.delete("/api/auth/login");
    return true;
  } catch (error) {
    console.error("Error clearing tokens:", error);
    return false;
  }
}
