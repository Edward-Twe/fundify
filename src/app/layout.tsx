import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import { Providers } from "./providers";
import '@coinbase/onchainkit/styles.css';
import { cookieToInitialState } from 'wagmi';
import { getConfig } from "@/lib/wagmi";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "thirdweb SDK + Next starter",
  description:
    "Starter template for using thirdweb SDK with Next.js App router",
};

export default function RootLayout(props: {
  children: React.ReactNode;
}) {
  const initialState = cookieToInitialState(
    getConfig(),
    headers().get('cookie')
  );
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThirdwebProvider>
          <Providers initialState={initialState}>{props.children}</Providers>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
