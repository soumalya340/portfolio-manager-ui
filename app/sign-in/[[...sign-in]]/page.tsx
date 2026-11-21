import { SignIn } from "@clerk/nextjs";
import { AuthFrame } from "../../_portfolio/auth-frame";

export default function SignInPage() {
  return (
    <AuthFrame intro="One view for your Solana, EVM, and Sui assets." loading="Loading sign in…">
      <SignIn fallbackRedirectUrl="/portfolio" signUpFallbackRedirectUrl="/portfolio" />
    </AuthFrame>
  );
}
