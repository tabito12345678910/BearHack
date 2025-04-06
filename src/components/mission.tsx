import React from 'react';

const Mission = () => {
  return (
    <section className="w-full bg-gradient-to-br from-purple-900 via-gray-900 to-black px-0">
      <div className="max-w-5xl mx-auto px-6 py-20 flex flex-col items-center text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-pink-500 mb-6">
          Our Mission
        </h2>

        <p className="text-lg md:text-xl text-white leading-relaxed max-w-3xl mb-6">
          In the United States, navigating health insurance is confusing, expensive, and often unfair — millions of people remain
          uninsured or underinsured because they can’t easily compare options or understand what they qualify for.
        </p>

        <p className="text-lg md:text-xl text-white leading-relaxed max-w-3xl mb-6">
          In fact, <span className="font-bold text-pink-400">64.7% of uninsured workers</span> in the U.S. did not receive healthcare benefits through their employer,
          highlighting a major gap in access.
        </p>

        <p className="text-lg md:text-xl text-white leading-relaxed max-w-3xl mb-12">
          At <span className="font-bold text-pink-400">MedOptima</span>, our mission is to change that. We help individuals and families find the
          most cost-effective insurance plans based on their location, income, family size, and medical needs — making access to
          care more transparent, affordable, and equitable for everyone.
        </p>

        <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
          How the Tool Works
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
          <div className="relative bg-neutral-900 p-6 rounded-2xl shadow-lg border border-pink-500/30 overflow-hidden group hover:border-pink-500 hover:shadow-[0_0_10px_#00f0ff50] focus:outline-none focus:ring-2 focus:ring-pink-500 transition transform hover:scale-105 duration-200">
            <div className="absolute inset-0 rounded-2xl border-2 border-pink-500 blur-md opacity-30 group-hover:opacity-70 animate-pulse pointer-events-none z-0" />
            <div className="relative z-10">
              <h4 className="text-xl font-bold text-pink-400 mb-2">1. Input Basic Info</h4>
              <p className="text-white text-sm leading-relaxed">
                Users fill out a short form with details like zip code, age, income, and household size. No signup required.
              </p>
            </div>
          </div>

          <div className="relative bg-neutral-900 p-6 rounded-2xl shadow-lg border border-pink-500/30 overflow-hidden group hover:border-pink-500 hover:shadow-[0_0_10px_#00f0ff50] focus:outline-none focus:ring-2 focus:ring-pink-500 transition transform hover:scale-105 duration-200">
            <div className="absolute inset-0 rounded-2xl border-2 border-pink-500 blur-md opacity-30 group-hover:opacity-70 animate-pulse pointer-events-none z-0" />
            <div className="relative z-10">
              <h4 className="text-xl font-bold text-pink-400 mb-2">2. Personalized Analysis</h4>
              <p className="text-white text-sm leading-relaxed">
                Our backend searches through government datasets to find the best-matched insurance plans by
                coverage, cost, and eligibility for subsidies.
              </p>
            </div>
          </div>

          <div className="relative bg-neutral-900 p-6 rounded-2xl shadow-lg border border-pink-500/30 overflow-hidden group hover:border-pink-500 hover:shadow-[0_0_10px_#00f0ff50] focus:outline-none focus:ring-2 focus:ring-pink-500 transition transform hover:scale-105 duration-200">
            <div className="absolute inset-0 rounded-2xl border-2 border-pink-500 blur-md opacity-30 group-hover:opacity-70 animate-pulse pointer-events-none z-0" />
            <div className="relative z-10">
              <h4 className="text-xl font-bold text-pink-400 mb-2">3. Get Recommendations</h4>
              <p className="text-white text-sm leading-relaxed">
                The user receives a list of top insurance plans with estimated monthly costs, deductible comparisons, and
                links to enroll.
              </p>
            </div>
          </div>
        </div>

          <h4 className="text-xl font-bold text-pink-400 mb-4 mt-10">Important Disclaimer</h4>
          <p className="text-sm leading-relaxed">
            Due to the nature of insurance data availability, <span className="font-bold text-pink-400">some states</span> may not be represented in our dataset. This is because the dataset we rely on only includes certain states, as not all regions have submitted data for the current year.
          </p>
          <p className="text-sm leading-relaxed mt-4">
            While we cannot currently offer recommendations for <span className="font-bold text-pink-400">those states</span>, we continue to improve and expand our coverage, and aim to include all regions in the future. Despite this limitation, our mission remains unchanged: to provide equitable, transparent, and affordable health insurance access to as many people as possible across the nation.
          </p>
      </div>
    </section>
  );
};

export default Mission;