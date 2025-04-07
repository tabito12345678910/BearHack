'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface InsurancePlan {
  planName: string;
  metalTier: string;
  planType: string;
  phoneLocal: string;
  phoneTollFree: string;
  phoneTTY: string;
  networkURL: string;
  totalPremium: string;
  dentalAdult: string;
  dentalChild: string;
  deductibleDetails: string;
  oopDetails: string;
  estimatedTotalCost: string;
}

const Output: React.FC = () => {
  const [plans, setPlans] = useState<InsurancePlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showHelp, setShowHelp] = useState<boolean>(false);


  useEffect(() => {
    const fetchPlans = async () => {
      const stored = localStorage.getItem("userInputData");

      if (!stored) {
        setError("No input data found.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/input-form", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: stored,
        });

        const data = await res.json();
        if (res.ok && Array.isArray(data.plans)) {
          setPlans(data.plans);
        } else {
          setError(data.error || "No plans found");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to connect to server");
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handleHelpClick = () => {
    setShowHelp(!showHelp); 
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white px-6 py-10 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-8 text-center text-pink-400">Loading Your Plans...</h2>

        <div className="flex flex-col space-y-8 w-full max-w-2xl">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-neutral-800 p-6 rounded-xl shadow-md animate-pulse w-full"
            >
              <div className="h-5 bg-neutral-700 rounded w-1/4 mb-3" />
              <div className="h-6 bg-neutral-700 rounded w-2/3 mb-4" />
              <div className="h-4 bg-neutral-700 rounded w-1/2 mb-2" />
              <div className="h-4 bg-neutral-700 rounded w-3/4 mb-2" />
              <div className="h-4 bg-neutral-700 rounded w-full mb-2" />
              <div className="h-4 bg-neutral-700 rounded w-2/5 mb-2" />
              <div className="h-4 bg-neutral-700 rounded w-3/5 mb-2" />
              <div className="h-4 bg-neutral-700 rounded w-1/4 mb-2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 font-bold mt-10">{error}</div>;
  }

  if (plans.length === 0) {
    return <div className="text-center text-white mt-10">No plans were found for your input.</div>;
  }

  const formatDeductibleDetails = (deductibleDetails: string) => {
    if (deductibleDetails.includes("Included in Medical")) {
      return deductibleDetails.replace("$Included in Medical", "Covered under Medical: ");
    }
    if (deductibleDetails.includes("Included in Drugs")) {
      return deductibleDetails.replace("$Included in Drugs", "Covered under Drugs: ");
    }
    return deductibleDetails;
  };




  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black text-white px-6 py-10">
      <h2 className="text-4xl font-bold mb-8 text-center text-white">Top Recommended Insurance Plans
      <button onClick={handleHelpClick} className="ml-2 mt-3">
                <img src="/help.webp" alt="Help" className="w-6 h-6 cursor-pointer transition transform hover:scale-120 duration-200 ease-in-out" />
              </button>

              {showHelp && (
                <div className="fixed absolute top-0 left-0 right-0 p-4 bg-neutral-800 text-white rounded-lg mt-10 shadow-lg max-w-md mx-auto z-50">
                    <h3 className="font-bold text-pink-400 text-xl">Help</h3>
                    <div className="mt-2 text-lg">
                    Definitions
                    <ul className="list-disc ml-4 text-lg">
                        <li><strong>Premium:</strong> Monthly cost you pay for the insurance plan.</li>
                        <li><strong>Deductible:</strong> Amount you pay before your insurance starts helping.</li>
                        <li><strong>OOP (Out of Pocket):</strong> The most you'll pay in a year for covered care.</li>
                        <li><strong>Copay:</strong> Fixed amount you pay for a service (like a doctor visit).</li>
                        <li><strong>Coinsurance:</strong> Percentage you pay after meeting your deductible.</li>
                        <li><strong>Metal Tier:</strong> Plan level (Bronze, Silver, Gold, etc.) — affects cost and coverage.</li>
                        <li><strong>Plan Type:</strong> How you access care — see below.</li>
                        <li><strong>HMO:</strong> Must pick an in-network doctor. Need a referral to see specialists.</li>
                        <li><strong>PPO:</strong> No referral needed. Can see out-of-network doctors (higher cost).</li>
                        <li><strong>POS:</strong> Must pick an in-network doctor. Can go out-of-network (higher cost).</li>
                        <li><strong>EPO:</strong> Must stay in-network. No referral needed for specialists.</li>
                    </ul>
                    <button
                        onClick={handleHelpClick}
                        className="mt-4 bg-pink-500 hover:bg-pink-600 text-white font-bold py-1 px-4 rounded-md"
                    >
                        Close
                    </button>
                    </div>
                </div>
                )}

      </h2>

      <div className="flex flex-col items-center space-y-10">
        {plans.slice(0, 5).map((plan, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-neutral-900 p-8 rounded-xl shadow-xl w-full max-w-2xl border border-pink-400/30 hover:border-pink-400 hover:shadow-[0_0_10px_#00f0ff50] transition transform hover:scale-103 duration-200"
          >
            <div className="text-center mb-6">
              <p className="text-sm uppercase text-gray-400">Rank</p>
              <p className="text-3xl font-extrabold text-pink-400">#{index + 1}</p>
              
            </div>

            <h3 className="text-2xl font-bold text-center text-pink-300 mb-2">{plan.planName}</h3>

            <p className="text-center text-cyan-400 font-semibold text-lg mb-6">
              Estimated Yearly Cost: <span className="font-bold">{plan.estimatedTotalCost}</span>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-sm text-neutral-300">
              <p><strong>Metal Tier:</strong> {plan.metalTier}</p>
              <p><strong>Plan Type:</strong> {plan.planType}</p>
              <p><strong>Phone (Local):</strong> {plan.phoneLocal}</p>
              <p><strong>Phone (Toll Free):</strong> {plan.phoneTollFree}</p>
              <p><strong>Phone (TTY):</strong> {plan.phoneTTY}</p>
              <p><strong>Total Premium:</strong> {plan.totalPremium}</p>
              <p><strong>Dental (Adult):</strong> {plan.dentalAdult === '' || plan.dentalAdult === 'X' ? 'None' : plan.dentalAdult}</p>
              <p><strong>Dental (Child):</strong> {plan.dentalChild === '' || plan.dentalChild === 'X' ? 'None' : plan.dentalChild}</p>
              <p><strong>Deductible Info:</strong> {formatDeductibleDetails(plan.deductibleDetails)}</p>
              <p><strong>OOP / Copay / Coinsurance:</strong> {plan.oopDetails}</p>
              <p className="md:col-span-2">
                <strong>Network URL:</strong>{" "}
                <a href={plan.networkURL} target="_blank" className="text-cyan-400 underline break-all">
                  {plan.networkURL}
                </a>
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Output;