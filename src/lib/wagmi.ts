import { http, cookieStorage, createConfig, createStorage, WagmiProvider } from 'wagmi';
import { base } from 'wagmi/chains'; // add baseSepolia for testing
import { coinbaseWallet } from 'wagmi/connectors';

import { RPC_URL } from '@/app/constants/contracts';

export const scrollSepolia = {
  id: 534351, // Chain ID for Scroll Sepolia
  name: 'Scroll Sepolia',
  network: 'scroll-sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: [RPC_URL], // RPC URL must be an array
    },
    public: {
      http: [RPC_URL], // Match the `default` URL structure
    },
  },
  blockExplorers: {
    default: {
      name: 'Scroll Explorer',
      url: 'https://sepolia-blockscout.scroll.io',
    },
  },
  testnet: true,
};



 
export function getConfig() {
  return createConfig({
    chains: [scrollSepolia], // add baseSepolia for testing
    connectors: [
      coinbaseWallet({
        appName: "OnchainKit",
        preference: 'smartWalletOnly',
        version: '4',
      }),
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [base.id]: http(), 
    },
  });
}
 
declare module 'wagmi' {
  interface Register {
    config: ReturnType<typeof getConfig>;
  }
}