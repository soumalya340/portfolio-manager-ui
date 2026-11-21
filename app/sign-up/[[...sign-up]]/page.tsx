import { SignUp } from "@clerk/nextjs";
import { AuthFrame } from "../../_portfolio/auth-frame";

export default function SignUpPage() {
  return (
    <AuthFrame intro="Create an account to access your portfolio workspace." loading="Loading sign up…">
      <SignUp />
    </AuthFrame>
  );
}
