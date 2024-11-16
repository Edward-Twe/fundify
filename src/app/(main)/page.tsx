'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Menu, HandHeart, Wallet, Vote, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';  // Importing Image from Next.js

import mainpagebg from '@/public/mainpagebg.jpg';  // Adjust the path to where the image is stored

export default function Mainpage() {
  const router = useRouter();

  const gotodonation = () => {
    router.push('/donation');
  };

  const gotofinancial = () => {
    router.push('/financial');
  };

  const gotovote = () => {
    router.push('/vote');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Hero Section */}
      <header 
        className="container mx-auto px-4 py-20 text-center"
        style={{
          backgroundImage: `url(${mainpagebg.src})`, // Setting the background image dynamically
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
      >
        <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Empower Change Through Fundify
        </h1>
        <p 
          className="text-xl mb-8 max-w-6xl mx-auto text-justify leading-relaxed"
          style={{ color: '#4C0261' }} 
        >
          Fundify leverages blockchain technology to transform fund distribution with unparalleled transparency.
          By using a secure and immutable ledger, we provide clear, real-time visibility into how funds are
          allocated and utilized. This innovative approach ensures that every transaction is fully traceable
          and verifiable, fostering trust and accountability between donors and recipients.
        </p>
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Donation Card */}
          <Card className="bg-slate-800 border-slate-700 hover:border-blue-500 transition-all cursor-pointer">
            <div onClick={gotodonation} className="flex flex-col items-center p-6">
              <HandHeart className="w-12 h-12 text-blue-500 mb-4" />
              <h2 className="text-2xl text-white">Transparent Donations</h2>
              <p className="text-slate-300 mb-6">
                Make direct cryptocurrency donations with full transparency. Track your impact 
                through blockchain technology.
              </p>
              <Button
                variant="outline"
                className="group border-[#C274C2] text-[#C274C2] hover:bg-[#F096F0] hover:text-[#420354] flex items-center justify-center space-x-2" // Using flex to align the icon
              >
                Start Donating
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Button>

            </div>
          </Card>

          {/* Financial Aid Card */}
          <Card className="bg-slate-800 border-slate-700 hover:border-purple-500 transition-all cursor-pointer">
            <div onClick={gotofinancial} className="flex flex-col items-center p-6">
              <Wallet className="w-12 h-12 text-purple-500 mb-4" />
              <h2 className="text-2xl text-white">Financial Aid</h2>
              <p className="text-slate-300 mb-6">
                Apply for or distribute financial aid using smart contracts. Ensure fair and 
                immediate fund distribution.
              </p>
              <Button
                variant="outline"
                className="group border-[#C274C2] text-[#C274C2] hover:bg-[#F096F0] hover:text-[#420354] flex items-center justify-center space-x-2"
              >
                Explore Aid Programs
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </Card>

          {/* Voting Card */}
          <Card className="bg-slate-800 border-slate-700 hover:border-green-500 transition-all cursor-pointer">
            <div onClick={gotovote} className="flex flex-col items-center p-6">
              <Vote className="w-12 h-12 text-green-500 mb-4" />
              <h2 className="text-2xl text-white">Community Voting</h2>
              <p className="text-slate-300 mb-6">
                Participate in decentralized governance. Vote on proposals and help shape 
                the future of our platform.
              </p>
              <Button
                variant="outline"
                className="group border-[#C274C2] text-[#C274C2] hover:bg-[#F096F0] hover:text-[#420354] flex items-center justify-center space-x-2"
              >
                View Projects
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6">
            <p className="text-4xl font-bold text-blue-500 mb-2">$2.5M+</p>
            <p className="text-slate-300">Total Donations</p>
          </div>
          <div className="p-6">
            <p className="text-4xl font-bold text-purple-500 mb-2">15K+</p>
            <p className="text-slate-300">Aid Recipients</p>
          </div>
          <div className="p-6">
            <p className="text-4xl font-bold text-green-500 mb-2">250+</p>
            <p className="text-slate-300">Active Proposals</p>
          </div>
        </div>
      </section>
    </div>
  );
}
