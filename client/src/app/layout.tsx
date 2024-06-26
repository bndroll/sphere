import type { Metadata } from "next";
import "./globals.scss";
import { ReactNode } from "react";
import Script from "next/script";
import UserStoreContextProvider from "@/utils/context/UserStoreContext";

export const metadata: Metadata = {
  title: "Sphere",
  description: "Social App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
        <UserStoreContextProvider>{children}</UserStoreContextProvider>
      </body>
    </html>
  );
}
