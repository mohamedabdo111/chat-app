import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/providers/AuthProviderr";
import { ConfigProvider } from "antd";
import Navbar from "@/components/Navbar";
import ReduxProvider from "@/providers/reduxProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-[100vh]`}
      >
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#0082b9", // Custom primary color
              borderRadius: 4, // Default border radius
            },
          }}
        >
          <ReduxProvider>
            <AuthProvider>
              <Navbar />
              {children}
            </AuthProvider>
          </ReduxProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
