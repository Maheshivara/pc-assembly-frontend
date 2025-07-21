import { SignupForm } from "@/components/SignupForm";
import { TopBar } from "@/components/TopBar";

export default function SignupPage() {
  return (
    <div>
      <TopBar showSignupButton={false} />
      <div>
        <SignupForm />
      </div>
    </div>
  );
}
