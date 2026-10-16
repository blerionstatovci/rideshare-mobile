import type { Metadata } from "next";
import Pwa from "@/components/Pwa";
import "./globals.css";

export const metadata: Metadata = {
  title: "RideShare | Udhëtime për AAB",
  description: "Gjej një udhëtim të përbashkët drejt Kolegjit AAB.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="sq">
      <body>
        <Pwa />
        {children}
      </body>
    </html>
  );
}
