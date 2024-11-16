"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Heart } from "lucide-react";
import {
  ABI,
  CROWDFUNDING_FACTORY,
  DONATE_ABI,
  NETWORK_ID,
  RPC_URL,
} from "@/app/constants/contracts";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useRef } from "react";

type CampaignState = "Active" | "Successful" | "Failed";

interface CampaignCardProps {
  campaignAddress: string;
}

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

export function CampaignCard({ campaignAddress }: CampaignCardProps) {
  const router = useRouter();

  const handleCardClick = (e: React.MouseEvent) => {
    router.push(`/donationdetails/${campaignAddress}`);
  };

  const provider = new ethers.providers.JsonRpcProvider(RPC_URL, NETWORK_ID);
  const contract = new ethers.Contract(campaignAddress, DONATE_ABI, provider);

  const fetchCampaign = async () => {
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
      setCampaign({
        name: campaignName,
        description: campaignDescription,
        goal: campaignGoal,
        deadline: new Date(campaignDeadline * 1000),
        owner: campaignOwner,
        paused: campaignPaused,
        state: campaignState as CampaignState,
        currentAmount: currentAmount,
      });
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    }
  };

  const [campaign, setCampaign] = useState<Campaign | undefined>();

  useEffect(() => {
    fetchCampaign(); // This will be called when the component mounts
  }, [campaignAddress]);

  if (!campaign) {
    return <div>Loading...</div>;
  }
  const progress = Math.min(
    (campaign.currentAmount / campaign.goal) * 100,
    100
  );
  //   const daysLeft = Math.max(Math.ceil((deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24)), 0)

  return (
    <motion.div
      onClick={handleCardClick}
      className="cursor-pointer"
      whileHover={{ scale: 1.05 }} // Slight zoom on hover
      whileTap={{ scale: 0.95 }} // Slightly shrink on tap
      transition={{ type: "spring", stiffness: 300, damping: 20 }} // Smooth spring animation
    >
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>{campaign.name}</span>
            <span
              className={`text-sm px-2 py-1 rounded ${
                campaign.state === "Active"
                  ? "bg-yellow-100 text-yellow-800"
                  : campaign.state === "Successful"
                  ? "bg-blue-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {
                campaign.state === "Active"
                  ? "In Progress"
                  : campaign.state === "Successful"
                  ? "Successful"
                  : "Failed"
              }
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground truncate" 
  style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {campaign.description}
          </p>
          <div>
            <Progress value={progress} className="h-2 mb-2" />
            <div className="flex justify-between text-sm">
              <span>${campaign.currentAmount.toLocaleString()} raised</span>
              <span>${campaign.goal.toLocaleString()} goal</span>
            </div>
          </div>
          <div className="flex justify-between text-sm">
            {/* <span>{campaign.daysLeft} days left</span> */}
            <span>
              by {campaign.owner.slice(0, 6)}...{campaign.owner.slice(-4)}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
