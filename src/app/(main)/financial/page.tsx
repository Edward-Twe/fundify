'use client';

import React from "react";
import { useRouter } from "next/navigation";


export default function Financial() {
  const router = useRouter();

  const handleFinancial = () => {
    router.push("/financialdetails"); // Navigate to the desired route
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen z-index-9">

      {/* Hero Banner */}
      <div 
        className="relative bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `url('/financialbg.jpg')`, // Set background image path
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 py-8 sm:py-16 md:py-20 lg:py-24">
            <div className="text-center text-white">
              <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
                <span className="block text-[#3c4454]">Decentralized</span>
                <span className="block">Financial Aids Platform</span>
              </h1>
              <p className="mt-3 text-base sm:text-lg sm:max-w-xl sm:mx-auto md:text-xl">
                Transparent, secure, and accessible financial assistance through blockchain technology
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center">
                <div className="rounded-md shadow">
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-[#151E30] hover:bg-[#1A2739] md:py-4 md:text-lg md:px-10"
                    onClick={handleFinancial}
                    >
                    Apply Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Available Projects */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Available Financial Aids Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Project Cards */}
          <ProjectCard
            title="Education Grant Pool"
            status="Active"
            statusClass="bg-blue-500/20 text-blue-300"
            description="Supporting students in Web3 development and blockchain studies with educational grants."
            totalPool="500,000 USDC"
            applications="125/200"
            progress={62.5}
            onApply={handleFinancial}
          />

          <ProjectCard
            title="Startup Funding"
            status="New"
            statusClass="bg-green-500/20 text-green-300"
            description="Early-stage funding for innovative Web3 startups and DeFi projects."
            totalPool="1,000,000 USDC"
            applications="45/100"
            progress={45}
            onApply={handleFinancial}
          />

          <ProjectCard
            title="Research Grant"
            status="Closing Soon"
            statusClass="bg-red-500/20 text-red-300"
            description="Funding for blockchain research and development in emerging technologies."
            totalPool="750,000 USDC"
            applications="85/100"
            progress={85}
            onApply={handleFinancial}
          />
        </div>
      </div>
    </div>
  );
}

interface ProjectCardProps {
  title: string;
  status: string;
  statusClass: string;
  description: string;
  totalPool: string;
  applications: string;
  progress: number;
  onApply: () => void; 
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  status,
  statusClass,
  description,
  totalPool,
  applications,
  progress,
  onApply,
}) => {
  return (
    <div className="bg-gray-800 rounded-xl p-6 border-4 border-white hover:border-white transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-[#3AA089] text-center w-full"> {/* Added font-bold for bold text */}
          {title}
        </h3>
        <span
          className={`flex items-center justify-center px-3 py-1 rounded-full text-xs whitespace-nowrap ${statusClass}`}
        >
          {status}
        </span>
      </div>
      <p className="text-gray-300 mb-4 text-center">{description}</p>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-400">Total Pool</span>
          <span className="text-[#277F6B]">{totalPool}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Applications</span>
          <span className="text-[#277F6B]">{applications}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
          <div
            className="h-2 rounded-full"
            style={{ width: `${progress}%`, backgroundColor: "#A4F4F4" }}
          ></div>
        </div>
      </div>
      <button
        onClick={onApply}
        className="w-full mt-4 px-3 py-1 bg-[#3AA089] hover:bg-[#3AA089] rounded-lg transition-colors"
      >
        Apply Now
      </button>
    </div>
  );
};

