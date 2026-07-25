import type { Metadata } from "next";
import SmoothScrolling from "@/components/SmoothScrolling";
import Chatbot from "@/components/Chatbot";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shashwat Shrivastava | Portfolio",
  description: "Associate Software Consultant & Full Stack Developer based in Bengaluru",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-black text-white">
        <SmoothScrolling>
          {children}
        </SmoothScrolling>
        
        {/* The Chatbot stays outside the scroll container so it remains fixed */}
        <Chatbot />
      </body>
    </html>
  );
}