import { LoginForm } from "@/components/LoginForm";
import { TopBar } from "@/components/TopBar";

export default function LoginPage() {
  return (
    <div>
      <TopBar showLoginButton={false} />
      <div>
        <LoginForm />
      </div>
    </div>
  );
}
