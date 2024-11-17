import React from "react";

export default function VoteDetails() {
  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">

      {/* Project Header */}
      <div className="bg-gray-800 border-b border-blue-500/30"
        style={{ backgroundImage: `url('/financialbg.jpg')` }}
>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-4 mb-2">
                <h1 className="text-3xl font-bold"
                style={{ color: "#111827" }}>Decentralized Education Platform</h1>
                <span className="px-3 py-1 bg-blue-500/50 text-white-300 rounded-full text-sm">
                  Education
                </span>
              </div>
              <p className="mt-2"
               style={{ color: "#45526C" }}>
                Building Web3 learning infrastructure for the next generation
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-400">42,156</div>
              <div className="text-sm"  style={{ color: "#45526C" }}>Total Votes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Project Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-800 rounded-xl p-4 border border-blue-500/30">
                <div className="text-sm text-gray-400 mb-1">Ranking</div>
                <div className="text-2xl font-bold text-blue-400">#1</div>
              </div>
              <div className="bg-gray-800 rounded-xl p-4 border border-blue-500/30">
                <div className="text-sm text-gray-400 mb-1">Requested</div>
                <div className="text-2xl font-bold text-blue-400">500,000 USDC</div>
              </div>
              <div className="bg-gray-800 rounded-xl p-4 border border-blue-500/30">
                <div className="text-sm text-gray-400 mb-1">Time Left</div>
                <div className="text-2xl font-bold text-blue-400">5 Days</div>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">About This Project</h2>
              <div className="prose prose-invert">
                <p className="text-gray-300">
                  The Decentralized Education Platform aims to revolutionize blockchain education by creating an interactive learning environment powered by Web3 technology. Our platform will provide comprehensive courses, hands-on labs, and real-world project experience.
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-2">Key Features:</h3>
                <ul className="list-disc pl-5 text-gray-300 space-y-2">
                  <li>Interactive coding environments for blockchain development</li>
                  <li>Peer-to-peer learning and mentorship opportunities</li>
                  <li>Web3 credential system for course completion</li>
                  <li>Integration with major blockchain networks for practical experience</li>
                </ul>

                <h3 className="text-lg font-semibold mt-6 mb-2">Fund Allocation:</h3>
                <ul className="list-disc pl-5 text-gray-300 space-y-2">
                  <li>Platform Development: 40% (200,000 USDC)</li>
                  <li>Content Creation: 30% (150,000 USDC)</li>
                  <li>Marketing & Community: 20% (100,000 USDC)</li>
                  <li>Operations: 10% (50,000 USDC)</li>
                </ul>
              </div>
            </div>

            {/* Project Updates */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Project Updates</h2>
              <div className="space-y-4">
                <div className="border-l-2 border-blue-500 pl-4">
                  <div className="text-sm text-gray-400">November 15, 2024</div>
                  <div className="font-semibold mb-1">Development Milestone Reached</div>
                  <p className="text-gray-300">
                    Completed the initial prototype of our interactive coding environment. Check out the demo video below.
                  </p>
                </div>
                <div className="border-l-2 border-blue-500 pl-4">
                  <div className="text-sm text-gray-400">November 12, 2024</div>
                  <div className="font-semibold mb-1">Partnership Announcement</div>
                  <p className="text-gray-300">
                    Partnered with leading blockchain academies to provide certified course content.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Voting Interface */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Voting Card */}
              <div className="bg-gray-800 rounded-xl p-6 border border-blue-500/30">
                <h2 className="text-xl font-bold mb-4">Cast Your Vote</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-blue-400">84.3%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "84.3%" }}></div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-700 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-400">Your Voting Power</span>
                      <span className="text-sm font-bold">1,000 VP</span>
                    </div>
                    <input
                      type="range"
                      className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                      min="0"
                      max="1000"
                      value="500"
                    />
                    <div className="flex justify-between mt-2">
                      <span className="text-sm text-gray-400">Amount to Vote</span>
                      <span className="text-sm font-bold">500 VP</span>
                    </div>
                  </div>

                  <button
          type="submit"
          className="w-full py-3 rounded-lg bg-gradient-to-r from-[#7d57a3] to-[#536ca9] text-white font-semibold hover:from-[#563477] hover:to-[#3a4e80] transition-transform transform hover:scale-105 shadow-lg"
          >
          Cast Vote
        </button>
                </div>
              </div>

              {/* Team Card */}
              <div className="bg-gray-800 rounded-xl p-6 border border-blue-500/30">
                <h2 className="text-xl font-bold mb-4">Project Team</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 font-bold">
                      JD
                    </div>
                    <div className="ml-3">
                      <div className="font-semibold">John Doe</div>
                      <div className="text-sm text-gray-400">Project Lead</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 font-bold">
                      AS
                    </div>
                    <div className="ml-3">
                      <div className="font-semibold">Alice Smith</div>
                      <div className="text-sm text-gray-400">Lead Developer</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 font-bold">
                      TB
                    </div>
                    <div className="ml-3">
                      <div className="font-semibold">Tom Brown</div>
                      <div className="text-sm text-gray-400">Marketing Manager</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-center text-gray-400 py-4">
        <div>© 2024 DeFiAid - All Rights Reserved</div>
      </footer>
    </div>
  );
}
