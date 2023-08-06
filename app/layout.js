import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Bloggy",
  description: "Where your dreams comes true",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
