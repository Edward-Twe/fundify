'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

type Project = {
  name: string;
  description: string;
  category: string;
  votes: string;
  requested: string;
  progress: string;
  progressColor: string;
  color: string;
  tagColor: string;
};

const projects: Project[] = [
  {
    name: 'Decentralized Education Platform',
    description: 'Building Web3 learning infrastructure',
    category: 'Education',
    votes: '42,156',
    requested: '500,000 USDC',
    progress: '84.3%',
    progressColor: '#3B82F6',
    color: 'bg-blue-500',
    tagColor: 'bg-blue-500/20 text-blue-300 rounded-full',
  },
  {
    name: 'DeFi Research Initiative',
    description: 'Advanced research in DeFi protocols',
    category: 'Research',
    votes: '38,742',
    requested: '750,000 USDC',
    progress: '77.5%',
    progressColor: '#6366F1',
    color: 'bg-indigo-500',
    tagColor: 'bg-indigo-500/20 text-indigo-300 rounded-full',
  },
  {
    name: 'Web3 Infrastructure Tools',
    description: 'Developer tools for blockchain applications',
    category: 'Infrastructure',
    votes: '35,891',
    requested: '600,000 USDC',
    progress: '71.8%',
    progressColor: '#A855F7',
    color: 'bg-purple-500',
    tagColor: 'bg-purple-500/20 text-purple-300 rounded-full',
  },
  {
    name: 'Blockchain Gaming Studio',
    description: 'Educational games for crypto adoption',
    category: 'Startup',
    votes: '31,267',
    requested: '400,000 USDC',
    progress: '62.5%',
    progressColor: '#EC4899',
    color: 'bg-pink-500',
    tagColor: 'bg-pink-500/20 text-pink-300 rounded-full',
  },
];

export default function Vote() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<string>('All Projects');

  const filteredProjects = projects.filter(
    (project) => activeFilter === 'All Projects' || project.category === activeFilter
  );

  const handleVote = () => {
    router.push("/votedetails"); // Navigate to the desired route
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      {/* Header */}
      <header className="relative border-b border-blue-500/30">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/votingB.png)', // Path to your background image
          backgroundSize: '150%',  // Scale the background image to 150%
          height: '100%', // Ensure the image covers the entire header area
        }}
  />
  
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50" /> {/* Black overlay with 50% opacity */}

        {/* Text and Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 z-10 flex items-center justify-center h-full">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4 text-white">Community Voting</h1>
            <p className="text-xl text-gray-200">
              Support your favorite projects and help them secure funding
            </p>
          </div>
        </div>
      </header>


      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div  className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[ 
            { label: 'Total Votes Cast', value: '147,523' },
            { label: 'Active Projects', value: '42' },
            { label: 'Total USDC Allocated', value: '2.25M USDC' },
          ].map((stat, index) => (
            <StatCard key={index} label={stat.label} value={stat.value} />
          ))}
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap gap-4 mb-8">
          {['All Projects', 'Education', 'Research', 'Startup', 'Infrastructure'].map((filter, index) => (
            <button
              key={index}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-lg ${filter === activeFilter ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'} transition-colors`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Leaderboard */}
        <div onClick={handleVote} className="space-y-4">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={index} project={project} rank={index + 1} />
          ))}
        </div>
      </main>
    </div>
  );
}

// Subcomponents
type StatCardProps = {
  label: string;
  value: string;
};

const StatCard: React.FC<StatCardProps> = ({ label, value }) => (
  <div className="bg-gray-800 rounded-xl p-6 border border-blue-500/30">
    <div className="text-gray-400 text-sm mb-1">{label}</div>
    <div className="text-2xl font-bold text-blue-400">{value}</div>
  </div>
);

type ProjectCardProps = {
  project: Project;
  rank: number;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, rank }) => {
  const progressWidth = parseFloat(project.progress) || 0; // Ensure it is a number
  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-blue-500/30 hover:border-blue-500/60 transition-all transform hover:-translate-y-1">
      <div className="flex items-center gap-4">
        <div className={`flex-shrink-0 w-12 h-12 ${project.color} rounded-xl flex items-center justify-center text-2xl font-bold`}>
          {rank}
        </div>
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-xl font-bold text-blue-400">{project.name}</h3>
              <p className="text-gray-400">{project.description}</p>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold">{project.votes}</div>
              <div className="text-sm text-gray-400">votes</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className={`px-3 py-1 ${project.tagColor} text-sm`}>{project.category}</span>
            <span className="text-gray-400">Requested: {project.requested}</span>
            <div className="flex-grow">
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="h-2 rounded-full"
                  style={{ width: `${progressWidth}%`, backgroundColor: project.progressColor }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => window.location.href = `/project/${encodeURIComponent(project.name)}`}
          className="px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors ml-4"
        >
          Vote
        </button>
      </div>
    </div>
  );
};
