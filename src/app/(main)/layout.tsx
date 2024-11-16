import Navbar from "@/components/Navbar";
import { ThirdwebProvider } from "@thirdweb-dev/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
      <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="">
        {children}
      </main>
      <footer className="bg-background border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Your Company Name. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
