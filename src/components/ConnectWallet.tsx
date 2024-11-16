import React, { useState } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

const ConnectWalletButton = () => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);

  const connectWallet = async () => {
    const modal = new Web3Modal({
      cacheProvider: true,
      providerOptions: {
        injected: {
          display: {
            name: "MetaMask",
            description: "Connect with the MetaMask Wallet",
          },
          package: null, // Use the default injected provider (MetaMask)
        },
      },
    });

    const instance = await modal.connect();
    const newProvider = new ethers.providers.Web3Provider(instance);
    const newSigner = newProvider.getSigner();

    setProvider(newProvider);
    setSigner(newSigner);

    // Now you can interact with the contract
    console.log("Wallet connected:", await newSigner.getAddress());
  };

  return (
    <div>
      <button onClick={connectWallet}>
        Connect Wallet
      </button>
      {signer && <p>Connected: {signer.getAddress()}</p>}
    </div>
  );
};

export default ConnectWalletButton;
