import "../globals.css";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import Provider from "@/lib/Provider";
import ReactQueryProvider from "@/lib/ReactQueryProvider";
import AnimatePresenceProvider from "@/lib/AnimatePresenceProvider";

export const metadata = {
  title: "Bloggy",
  description: "Where your dreams comes true",
};

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <body className="flex flex-col w-[full]">
        <AnimatePresenceProvider>
          <ReactQueryProvider>
            <Provider session={session}>
              <div className=" flex flex-col w-full md:w-[80%] mx-auto p-6 md:p-4">
                <Navbar />
                {children}
                <Toaster />
              </div>
            </Provider>
          </ReactQueryProvider>
        </AnimatePresenceProvider>
      </body>
    </html>
  );
}
