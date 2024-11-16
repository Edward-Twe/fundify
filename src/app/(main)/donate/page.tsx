"use client"
import { ABI, CROWDFUNDING_FACTORY, RPC_URL, NETWORK_ID } from "@/app/constants/contracts";
import { CampaignCard } from "@/components/CampaignBox";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

export default function Home() {
  interface Campaign {
    campaignAddress: string;
    owner: string;
    name: string;
    creationTime: number;
}
  const CONTRACT_ADDRESS = CROWDFUNDING_FACTORY;
  const CONTRACT_ABI = ABI;

  const provider = new ethers.providers.JsonRpcProvider(RPC_URL, NETWORK_ID);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

  const [campaigns, setCampaigns] = useState<any[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCampaigns = async () => {
    try {
      const campaignData = await contract.getAllCampaings();
      setCampaigns(campaignData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchCampaigns(); 

    const interval = setInterval(() => {
      fetchCampaigns();
    }, 600000);  // Fetch every 600 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading campaigns...</p>  // Show loading text while fetching data
      ) : campaigns.length > 0 ? (
        <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Campaigns</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign: Campaign, index) => (
          <CampaignCard key={campaign.campaignAddress.toString()} {...campaign} />
        ))}
      </div>
    </div>
      ) : (
        <p>No campaigns available</p>  // Display message if no campaigns
      )}
    </div>
  );
}
