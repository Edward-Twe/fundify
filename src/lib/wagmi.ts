import { http, cookieStorage, createConfig, createStorage, WagmiProvider } from 'wagmi';
import { base } from 'wagmi/chains'; // add baseSepolia for testing
import { coinbaseWallet } from 'wagmi/connectors';

import { RPC_URL } from '@/app/constants/contracts';

export const sepoliaTestnet = {
  id: 11155111, // Chain ID for Sepolia Testnet
  name: 'Sepolia Testnet',
  network: 'sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: [RPC_URL], // Replace with your Infura URL or other RPC URL
    },
    public: {
      http: [RPC_URL], // Match the `default` URL structure
    },
  },
  blockExplorers: {
    default: {
      name: 'Etherscan',
      url: 'https://eth-sepolia.blockscout.com',
    },
  },
  testnet: true,
};
 
export function getConfig() {
  return createConfig({
    chains: [sepoliaTestnet], // add baseSepolia for testing
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