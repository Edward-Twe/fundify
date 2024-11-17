import React from "react";

const EducationGrantPool: React.FC = () => {
  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      

     {/* Project Header */}
<div
  className="bg-cover bg-center border-b border-blue-500/30"
  style={{ backgroundImage: `url('/financialbg.jpg')` }}
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-center space-x-4">
          <h1
            className="text-3xl font-bold"
            style={{ color: "#111827" }} // Updated header text color
          >
            Education Grant 
          </h1>
          <span className="px-3 py-1 bg-blue-500/20 text-white rounded-full text-sm">
            Active
          </span>
        </div>
        <p className="mt-2" style={{ color: "#45526C" }}> {/* Updated <p> text color */}
          Supporting students in Web3 development and blockchain studies
        </p>
      </div>
      <div className="text-right">
        <div className="text-2xl font-bold text-blue-400">500,000 USDC</div>
        <div className="text-sm text-gray-400">Total Fund Size</div>
      </div>
    </div>
  </div>
</div>



      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Project Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">About This Grant</h2>
              <div className="prose prose-invert">
                <p className="text-gray-300">
                  The Education Grant is designed to support ambitious
                  students pursuing education in Web3 development, blockchain
                  technology, and decentralized systems. This program aims to foster
                  the next generation of blockchain innovators.
                </p>
                <h3 className="text-lg font-semibold mt-4 mb-2">What's Covered:</h3>
                <ul className="list-disc pl-5 text-gray-300 space-y-2">
                  <li>Tuition fees for approved blockchain development courses</li>
                  <li>Educational resources and development tools</li>
                  <li>Conference and workshop attendance</li>
                  <li>Practical project development costs</li>
                </ul>
                <h3 className="text-lg font-semibold mt-4 mb-2">
                  Eligibility Criteria:
                </h3>
                <ul className="list-disc pl-5 text-gray-300 space-y-2">
                  <li>Must be enrolled in or accepted to a relevant educational program</li>
                  <li>Demonstrated interest in blockchain technology</li>
                  <li>Clear project or study goals</li>
                  <li>Commitment to contributing to the Web3 ecosystem</li>
                </ul>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Grant Timeline</h2>
              <div className="relative">
                <div className="absolute top-0 left-4 h-full w-0.5 bg-blue-500/30"></div>
                <div className="space-y-6 relative">
                  <div className="flex items-start">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 relative z-10">
                      <div className="w-3 h-3 bg-blue-200 rounded-full"></div>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold">Application Period</h3>
                      <p className="text-gray-400">Nov 16 - Dec 15, 2024</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-700 relative z-10">
                      <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold">Review Process</h3>
                      <p className="text-gray-400">Dec 16 - Dec 31, 2024</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-700 relative z-10">
                      <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold">Grant Distribution</h3>
                      <p className="text-gray-400">January 15, 2025</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Application Form */}
          <div className="lg:col-span-1">
  <div 
    className="rounded-xl p-6 sticky top-8" 
    style={{
      background: "linear-gradient(135deg, #C4C7FE, #D8F9FF)",
    }}
  >
    <h2 className="text-xl font-bold mb-4" style={{ color: "#283E75" }}>
      Apply for Grant
    </h2>
    <form className="space-y-4">
      <div>
        <label
          className="block text-sm font-medium mb-1"
          style={{ color: "#283E75" }}
        >
          Wallet Address
        </label>
        <input
          type="text"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          style={{
            backgroundColor: "#FFFFFF",
            color: "#283E75",
          }}
          placeholder="0x..."
          readOnly
          value="Please connect wallet"
        />
      </div>
      <div>
        <label
          className="block text-sm font-medium mb-1"
          style={{ color: "#283E75" }}
        >
          Full Name
        </label>
        <input
          type="text"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          style={{
            backgroundColor: "#FFFFFF",
            color: "#283E75",
          }}
        />
      </div>
      <div>
        <label
          className="block text-sm font-medium mb-1"
          style={{ color: "#283E75" }}
        >
          Email Address
        </label>
        <input
          type="email"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          style={{
            backgroundColor: "#FFFFFF",
            color: "#283E75",
          }}
        />
      </div>
      <div>
        <label
          className="block text-sm font-medium mb-1"
          style={{ color: "#283E75" }}
        >
          Educational Institution
        </label>
        <input
          type="text"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          style={{
            backgroundColor: "#FFFFFF",
            color: "#283E75",
          }}
        />
      </div>
      <div>
        <label
          className="block text-sm font-medium mb-1"
          style={{ color: "#283E75" }}
        >
          Course/Program Name
        </label>
        <input
          type="text"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          style={{
            backgroundColor: "#FFFFFF",
            color: "#283E75",
          }}
        />
      </div>
      <div>
        <label
          className="block text-sm font-medium mb-1"
          style={{ color: "#283E75" }}
        >
          Requested Amount (USDC)
        </label>
        <input
          type="number"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          style={{
            backgroundColor: "#FFFFFF",
            color: "#283E75",
          }}
        />
      </div>
      <div>
        <label
          className="block text-sm font-medium mb-1"
          style={{ color: "#283E75" }}
        >
          Project Description
        </label>
        <textarea
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-32"
          style={{
            backgroundColor: "#FFFFFF",
            color: "#283E75",
          }}
        ></textarea>
      </div>
      <div className="pt-4">
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-gradient-to-r from-[#1F2F59] to-[#1F2F59] text-white font-semibold hover:from-[#253A6B] hover:to-[#253A6B] transition-transform transform hover:scale-105 shadow-lg"
          >
          Submit Application
        </button>
      </div>
    </form>
  </div>
</div>

        </div>
      </div>
    </div>
  );
};

export default EducationGrantPool;
