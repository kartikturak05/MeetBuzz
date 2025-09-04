import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "MeetBuzz",
  description: "Meeting Scheduling App",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {/* Header */}
          <Header />
          <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white-60">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-gray-100 py-10 items-center flex justify-around">
            <p className="text-gray-700 text-lg ">
              © 2025 MeetBuzz. All rights reserved.
            </p>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
