"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Heart,
  Calendar,
  User,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { ethers } from "ethers";
import { DONATE_ABI, NETWORK_ID, RPC_URL } from "@/app/constants/contracts";
import {
  ConnectButton,
  lightTheme,
  TransactionButton,
  useActiveAccount,
  useActiveWallet,
} from "thirdweb/react";
import DonateDialog from "@/components/success-dialog";

type CampaignState = "Active" | "Successful" | "Failed";

interface Campaign {
  name: string;
  description: string;
  goal: number;
  deadline: Date;
  owner: string;
  paused: boolean;
  state: CampaignState;
  currentAmount: number;
}

const fetchCampaignDetails = async (id: string): Promise<Campaign> => {
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL, NETWORK_ID);
  const contract = new ethers.Contract(id, DONATE_ABI, provider);

  try {
    const campaignName = await contract.name();
    const campaignDescription = await contract.description();
    const campaignGoal = await contract.goal();
    const campaignDeadline = await contract.deadline();
    const campaignOwner = await contract.owner();
    const campaignPaused = await contract.paused();
    const campaignStateCode = await contract.getCampaignStatus();
    const currentAmount = await contract.getContractBalance();

    let campaignState: CampaignState;
    switch (campaignStateCode) {
      case 0:
        campaignState = "Active";
        break;
      case 1:
        campaignState = "Successful";
        break;
      case 2:
        campaignState = "Failed";
        break;
      default:
        campaignState = "Failed"; // Fallback, in case of unexpected state
    }

    const campaign: Campaign = {
      name: campaignName,
      description: campaignDescription,
      goal: campaignGoal,
      deadline: new Date(campaignDeadline * 1000),
      owner: campaignOwner,
      paused: campaignPaused,
      state: campaignState,
      currentAmount: currentAmount,
    };

    return campaign;
  } catch (error) {
    console.error("Error fetching campaign details:", error);
    throw new Error("Failed to fetch campaign details.");
  }
};

export default function CampaignDetailsPage() {
  // const address = useActiveWallet();
  const params = useParams();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [donationAmount, setDonationAmount] = useState("0");

  // const provider = new ethers.providers.JsonRpcProvider(RPC_URL, NETWORK_ID);
  // const signer = provider.getSigner();

  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [userAddress, setUserAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request accounts from MetaMask or any browser wallet
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (!accounts || accounts.length === 0) {
          throw new Error("No accounts found");
        }

        // Create an ethers provider using the MetaMask provider
        const ethProvider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(ethProvider);

        // Get the signer (wallet instance)
        const userSigner = ethProvider.getSigner();
        setSigner(userSigner);

        // Get the user address
        const address = await userSigner.getAddress();
        setUserAddress(address);

        console.log("Wallet connected:", address);
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      console.error("MetaMask or another Ethereum wallet not found");
    }
  };

  const donationInWei = ethers.BigNumber.from(donationAmount);

  // async function donate() {
  //   if (!signer) return;
  //   const contract = new ethers.Contract(
  //     params.id as string,
  //     DONATE_ABI,
  //     signer
  //   );
  //   try {
  //     const tx = await contract.fund({
  //       value: donationInWei, // Set the donation value
  //     });

  //     console.log("Transaction sent:", tx.hash);

  //     // Wait for the transaction to be mined
  //     const receipt = await tx.wait();
  //     console.log("Transaction mined:", receipt);


  //   } catch (error) {
  //     console.error("Error sending transaction:", error);
  //   }
  // }

  async function togglePause() {
    if (!signer) return;
    const contract = new ethers.Contract(
      params.id as string,
      DONATE_ABI,
      signer
    );
    try {
      const tx = await contract.togglePause();

      console.log("Transaction sent:", tx.hash);

      // Wait for the transaction to be mined
      const receipt = await tx.wait();
      console.log("Transaction mined:", receipt);
    } catch (error) {
      console.error("Error sending transaction:", error);
    }
  }

  useEffect(() => {
    fetchCampaignDetails(params.id as string).then((data) => {
      setCampaign(data);
      setLoading(false);
    });
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading campaign details...
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="flex justify-center items-center h-screen">
        Campaign not found
      </div>
    );
  }

  const progress = Math.min(
    (campaign.currentAmount / campaign.goal) * 100,
    100
  );
  const daysLeft = Math.max(
    Math.ceil(
      (campaign.deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    ),
    0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span className="text-3xl">{campaign.name}</span>
              <motion.span
                className={`text-sm px-3 py-1 rounded-full ${
                  campaign.state === "Active"
                    ? "bg-yellow-100 text-yellow-800"
                    : campaign.state === "Successful"
                    ? "bg-blue-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.3,
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
              >
                {campaign.state === "Active"
                  ? "In Progress"
                  : campaign.state === "Successful"
                  ? "Successful"
                  : "Failed"}
              </motion.span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">{campaign.description}</p>
            <div>
              <Progress value={progress} className="h-2 mb-2" />
              <div className="flex justify-between text-sm">
                <span>${campaign.currentAmount.toLocaleString()} raised</span>
                <span>${campaign.goal.toLocaleString()} goal</span>
              </div>
            </div>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span>{daysLeft} days left</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-muted-foreground" />
                <span>
                  by {campaign.owner.slice(0, 6)}...{campaign.owner.slice(-4)}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Button onClick={togglePause} className={campaign.paused ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}>
                  {campaign.paused ? (
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  ) : campaign.state === "Successful" ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : campaign.state === "Failed" ? (
                    <XCircle className="h-5 w-5 text-red-500" />
                  ) : null}
                  <span>{campaign.paused ? "Paused" : campaign.state}</span>
                </Button>
              </div>
            </motion.div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="w-full">
              <Label htmlFor="donationAmount">Donation Amount ($)</Label>
              <Input
                id="donationAmount"
                type="number"
                placeholder="Enter amount"
                value={donationAmount}
                onChange={(e) =>
                  setDonationAmount(
                    parseFloat(e.target.value) > 0 ? e.target.value : "0"
                  )
                }
                className="mt-1"
              />
            </div>

            {!userAddress || !signer ? (
              <Button className="w-full" onClick={connectWallet}>
                Connect Wallet
              </Button>
            ) : (
              <DonateDialog
                params={params.id as string}
                signer={signer}
                donationInWei={donationInWei}
                DONATE_ABI={DONATE_ABI}
                disabled={
                      campaign.paused ||
                      campaign.state !== "Active" ||
                      !donationAmount ||
                      parseFloat(donationAmount) <= 0
                    }
              />
              // <Button
              //   className="w-full"
              //   size="lg"
              //   disabled={
              //     campaign.paused ||
              //     campaign.state !== "Active" ||
              //     !donationAmount ||
              //     parseFloat(donationAmount) <= 0
              //   }
              //   onClick={donate}
              // >
              //   <Heart className="mr-2 h-5 w-5" /> Donate Now
              // </Button>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
