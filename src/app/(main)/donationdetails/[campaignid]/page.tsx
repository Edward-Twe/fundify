"use client";

import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  CheckCircle,
  Router,
  Users,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { DONATE_ABI, NETWORK_ID, RPC_URL } from "@/app/constants/contracts";
import { Progress } from "@/components/ui/progress";
import Category1 from "@/public/d1.png";
import Category2 from "@/public/d11.png";
import Category3 from "@/public/d2.png";
import DonateDialog from "@/components/success-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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

export default function Component() {
  const params = useParams();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [donationAmount, setDonationAmount] = useState("0");

  const donationInWei = ethers.BigNumber.from(donationAmount);

  const router = useRouter();

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

  async function togglePause() {
    if (!signer) return;
    const contract = new ethers.Contract(
      params.campaignid as string,
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

  async function withraw() {
    if (!signer) return;

    const contract = new ethers.Contract(
      params.campaignid as string,
      DONATE_ABI,
      signer
    );

    try {
      const tx = await contract.withraw();

      const receipt = await tx.wait();
      console.log("Transaction mined:", receipt);
    } catch (error) {
      console.error("Error sending transaction:", error);
    }
  }

  useEffect(() => {
    fetchCampaignDetails(params.campaignid as string).then((data) => {
      setCampaign(data);
      setLoading(false);
      connectWallet();
    });
  }, [params.campaignid]);

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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#D8F9FF] via-[#D8F9FF] to-[#EFE0FF] animate-gradient-bg">
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Project Image and Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {" "}
            {/* Larger gap between image and text */}
            {/* Image Box with rounded edges */}
            <div className="relative flex justify-center items-center">
              <Image
                src={
                  params.campaignid ==
                  "0xD7FD295Fe2f1cdBe6DfCd581Bb5DeeF16D90C6F5"
                    ? Category1
                    : params.campaignid ==
                      "0xA146E5F2fdA9BFB468Ae1fB1E0a7C169a98Cf63c"
                    ? Category2
                    : Category3
                } // Replace with your actual image path
                alt="Project Image"
                width={900} // Set the width to match the image size
                height={500} // Set the height to match the image size
                className="object-cover rounded-md" // Ensures the image fills its container and maintains aspect ratio
              />
            </div>
            {/* Textbox beside the image */}
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold">
                {campaign.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <span>{daysLeft} Days Left</span>
                <span className="flex items-center gap-1">
                  <span>
                    {userAddress == campaign.owner ? (
                      <Button
                        onClick={togglePause}
                        className={
                          campaign.paused
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }
                      >
                        {campaign.paused ? (
                          <AlertTriangle className="h-5 w-5 text-yellow-500" />
                        ) : campaign.state === "Successful" ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : campaign.state === "Failed" ? (
                          <XCircle className="h-5 w-5 text-red-500" />
                        ) : null}
                        <span>
                          {campaign.paused ? "Paused" : campaign.state}
                        </span>
                      </Button>
                    ) : (
                      <p>
                        {campaign.paused ? (
                          <AlertTriangle className="h-5 w-5 text-yellow-500" />
                        ) : campaign.state === "Successful" ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : campaign.state === "Failed" ? (
                          <XCircle className="h-5 w-5 text-red-500" />
                        ) : null}
                      </p>
                    )}
                  </span>
                </span>
              </div>
              <div>
                <Progress value={progress} className="h-2 mb-2" />
                <div className="flex justify-between text-sm">
                  <span>${campaign.currentAmount.toLocaleString()} raised</span>
                  <span>${campaign.goal.toLocaleString()} goal</span>
                </div>
              </div>

              {/* Justified text */}
              <p className="text-gray-600 text-justify">
                Join us in supporting the nation&apos;s growth and development
                through the Tabung Harapan Malaysia. Donations and voluntary
                contributions are now made easier and more accessible with the
                option to contribute through cryptocurrency. By channeling your
                donation to the Accountant General of Malaysia via crypto, you
                are directly supporting government initiatives aimed at
                fostering a better, more prosperous Malaysia. Every contribution
                counts, no matter the size. Your generosity will help fund vital
                national programs, infrastructure projects, and social welfare
                efforts, making a meaningful impact on the lives of Malaysians.
                <strong>
                  {" "}
                  Donate Now and be a part of shaping the future of Malaysia
                  with your support!
                </strong>{" "}
                {/* Make the last sentence bold */}
              </p>
            </div>
          </div>

          {/* Donate Button */}
          <div className="flex justify-center">
            {/* <Button
              className="bg-[#162F2F] hover:bg-[#162F2F]/90 text-white px-6 py-3 rounded-full text-lg"
            >
              Donate Now
            </Button> */}
            {!userAddress || !signer ? (
              <Button className="w-full" onClick={connectWallet}>
                Connect Wallet
              </Button>
            ) : (
              <DonateDialog
                params={params.campaignid as string}
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
            )}
          </div>

          {/* Navigation Buttons */}
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
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="outline" className="rounded-full px-8 py-2">
              Back Home
            </Button>
            {
              userAddress == campaign.owner ? <Button variant="outline" className="rounded-full px-8 py-2" disabled={(campaign.state != "Successful" || campaign.currentAmount != campaign.goal)} onClick={withraw}>
              Withraw
            </Button> : <></>
            }
            
            <Button
              variant="outline"
              className="rounded-full px-8 py-2"
              onClick={() => router.push("/donate")}
            >
              Explore More Projects
            </Button>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-center text-gray-400 py-4">
        <div>
          <p>&copy; 2023 Project Donation Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
