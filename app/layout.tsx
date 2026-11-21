import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import "@astryxdesign/core/reset.css";
import "@astryxdesign/core/astryx.css";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Orbit | Multichain Portfolio",
  description: "A clear view of your Solana, EVM, and Sui portfolio.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-theme="dark" data-astryx-theme="gothic">
      <body>
        <ClerkProvider>
          <Providers>{children}</Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
