'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CustomDropdown from '@/components/dropdown';
import { motion } from 'framer-motion';

const usStates = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

const supportedStates = [
  "AL", "AK", "AZ", "AR", "DE", "FL", "IL", "IN", "IA", "KS", "LA", "MI", "MS",
  "MO", "MT", "NE", "NH", "NC", "ND", "OH", "OK", "OR", "SC", "SD", "TN",
  "TX", "UT", "WV", "WI", "WY"
];

const serviceTypes = [
  { label: "Drugs", value: "drugs" },
  { label: "Medical", value: "medical" }
];

const drugTypes = [
  { label: "Generic Drugs", value: "generic" },
  { label: "Preferred Brand Drugs", value: "preferred_brand" },
  { label: "Non-preferred Brand Drugs", value: "non_preferred_brand" },
  { label: "Specialty Drugs", value: "specialty" }
];

const medicalTypes = [
  { label: "Primary Care Physician", value: "primary_care" },
  { label: "Specialist", value: "specialist" },
  { label: "Emergency Room", value: "emergency_room" },
  { label: "In-patient Facility", value: "in_patient_facility" },
  { label: "In-patient Physician", value: "in_patient_physician" }
];

const metalTiers = [
  "No Preference", "Platinum", "Gold", "Silver", "Expanded Bronze", "Bronze", "Catastrophic"
];

const householdSizes = ["1", "2", "3", "4", "5", "6+"];

const Input: React.FC = () => {
  const [formData, setFormData] = useState({
    state: "",
    county: "",
    householdSize: "1",
    income: "",
    ages: [""],
    metalTiers: "No Preference",
  });

  const [counties, setCounties] = useState<string[]>([]);
  const [countyData, setCountyData] = useState<Record<string, string[]>>({});
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [selectedServiceType, setSelectedServiceType] = useState("");
  const [selectedDrugType, setSelectedDrugType] = useState("");
  const [selectedMedicalType, setSelectedMedicalType] = useState("");
  const router = useRouter();
  const [isStateSupported, setIsStateSupported] = useState(true);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const loadCounties = async () => {
      const res = await fetch('/data/us_state_counties.json');
      const data = await res.json();
      setCountyData(data);
    };
    loadCounties();
  }, []);

  useEffect(() => {
    const { state } = formData;
    if (state && supportedStates.includes(state) && countyData[state]) {
      setCounties(countyData[state]);
    } else {
      setCounties([]);
    }
    setFormData((prev) => ({ ...prev, county: "" }));
  }, [formData.state, countyData]);

  const showPopupMessage = (message: string) => {
    setPopupMessage(message);
  };
  const handleHelpClick = () => {
    setShowHelp(!showHelp); 
  };

  const handleReset = () => {
    setFormData({
      state: "",
      county: "",
      householdSize: "1",
      income: "",
      ages: [""],
      metalTiers: "",
    });
    setSelectedServiceType("");
    setSelectedDrugType("");
    setSelectedMedicalType("");
    setPopupMessage(null);
    setHasInteracted(false);
  };

  const handleSubmit = async () => {
    const { state, county, householdSize, income, ages, metalTiers } = formData;

    if (!state) return showPopupMessage("Please select a state.");
    if (!supportedStates.includes(state)) return showPopupMessage("This state is currently not supported.");
    if (!county) return showPopupMessage("Please select a county.");
    if (!income) return showPopupMessage("Please enter your income.");
    if (ages.some((age) => !age)) return showPopupMessage("Please fill out all age fields.");
    if (!selectedServiceType) return showPopupMessage("Please select a service type.");
    if (
      (selectedServiceType === "drugs" && !selectedDrugType) ||
      (selectedServiceType === "medical" && !selectedMedicalType)
    ) return showPopupMessage("Please select a specific type of service.");

    const payload = {
      ...formData,
      selectedServiceType,
      selectedDrugType,
      selectedMedicalType
    };

    localStorage.setItem("userInputData", JSON.stringify(payload));

    try {
      setPopupMessage(null);
      setLoading(true);
      const res = await fetch("/api/input-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push("/output");
      } else {
        showPopupMessage("Error submitting form.");
        setLoading(false);
      }
    } catch (err) {
      console.error("Request error:", err);
      showPopupMessage("Network error.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black px-4 py-10 flex items-center justify-center">
      <div onClick={() => setHasInteracted(true)} className="bg-neutral-900 p-8 rounded-2xl shadow-xl w-full max-w-3xl text-white">
        <h2 className="text-2xl mb-6 text-center font-bold">
          {loading ? (
            <motion.div
              className="flex justify-center space-x-1 text-3xl sm:text-5xl font-extrabold text-pink-400 animate-pulse"
              variants={{ animate: { transition: { staggerChildren: 0.15, repeat: Infinity }}}}
              initial="initial"
              animate="animate"
            >
              {[...'Loading...'].map((char, i) => (
                <motion.span
                  key={i}
                  className="text-pink-400"
                  variants={{
                    initial: { y: 30, opacity: 0, scale: 0.8 },
                    animate: {
                      y: 0,
                      opacity: 1,
                      scale: 1,
                      transition: { type: 'spring', stiffness: 300, damping: 20 },
                    },
                  }}
                >{char}</motion.span>
              ))}
            </motion.div>
          ) : popupMessage && !hasInteracted ? (
            <div className="bg-red-500 text-white text-sm font-bold py-2 px-4 rounded-md animate-pulse inline-block">
              {popupMessage}
            </div>
          ) : (
            <span className="text-white font-semibold">Health Coverage Estimator</span>
          )}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm">State</label>
            <CustomDropdown
              options={usStates.map((s) => ({
                label: supportedStates.includes(s) ? s : `${s} (Not Supported)`,
                value: s
              }))}
              value={formData.state}
              onChange={(val) => {
                const supported = supportedStates.includes(val);
                setIsStateSupported(supported);
                setFormData((prev) => ({ ...prev, state: val, county: "" }));
              
                if (!supported) {
                  setPopupMessage("This state is currently not supported.");
                } else {
                  setPopupMessage(null);
                }
              }}
            />
          </div>

          <div>
            <label className="text-sm">County</label>
            <CustomDropdown
              options={counties.map((c) => ({ label: c, value: c }))}
              value={formData.county}
              onChange={(val) => setFormData((prev) => ({ ...prev, county: val }))}
              disabled={!formData.state || !isStateSupported}
            />
          </div>

          <div>
            <label className="text-sm">Household Size</label>
            <CustomDropdown
              options={householdSizes.map((s) => ({ label: s, value: s }))}
              value={formData.householdSize}
              onChange={(val) => {
                const size = val === "6+" ? 6 : parseInt(val);
                setFormData((prev) => ({
                  ...prev,
                  householdSize: val,
                  ages: Array(size).fill("")
                }));
              }}
            />
          </div>

          <div>
            <label className="text-sm">Annual Income ($)</label>
            <input
              type="number"
              value={formData.income}
              onChange={(e) => setFormData((prev) => ({ ...prev, income: e.target.value }))}
              className="w-full bg-neutral-900 text-white p-2 rounded-md border border-black focus:ring-2 focus:ring-pink-400"
              placeholder="e.g. 52000"
            />
          </div>

          <div>
          <label className="text-sm">Minimum Coverage Type</label>
              <CustomDropdown
                options={metalTiers.map((tier) => ({
                  label: tier,
                  value: tier
                }))}
                value={formData.metalTiers}
                onChange={(val) => setFormData((prev) => ({ ...prev, metalTiers: val }))}
              />
              <button onClick={handleHelpClick} className="ml-2 mt-3">
                <img src="/help.webp" alt="Help" className="w-6 h-6 cursor-pointer transition transform hover:scale-120 duration-200 ease-in-out" />
              </button>

            {showHelp && (
              <div className="fixed absolute top-0 left-0 right-0 p-4 bg-neutral-800 text-white rounded-lg mt-10 shadow-lg max-w-md mx-auto z-50">
                <h3 className="font-bold text-pink-400">Minimum Coverage Type (Metal Tier)</h3>
                <p className="mt-2 text-sm">
                  The metal tiers represent the percentage of healthcare costs that the insurance plan covers.
                  <ul className="list-disc ml-4">
                    <li><strong>Platinum:</strong> Covers 90% of costs, leaving you with 10% responsibility.</li>
                    <li><strong>Gold:</strong> Covers 80% of costs, leaving you with 20% responsibility.</li>
                    <li><strong>Silver:</strong> Covers 70% of costs, leaving you with 30% responsibility.</li>
                    <li><strong>Expanded Bronze:</strong> Covers about 60% of costs, leaving you with 40% responsibility. This plan offers **slightly better coverage** than the standard Bronze plan, with a bit more coverage while keeping premiums lower than Silver and Gold.</li>
                    <li><strong>Bronze:</strong> Covers 60% of costs, leaving you with 40% responsibility. This plan is ideal if you expect low medical costs but need to protect yourself against very high medical expenses.</li>
                    <li><strong>Catastrophic:</strong> Covers only essential health benefits for individuals under 30 or those who qualify for a hardship or affordability exemption.</li>
                  </ul>
                  <button
                    onClick={handleHelpClick}
                    className="mt-4 bg-pink-500 hover:bg-pink-600 text-white font-bold py-1 px-4 rounded-md"
                  >
                    Close
                  </button>
                </p>
              </div>
            )}
          </div>

          <div>
            <label className="text-sm">Type of Service Needed</label>
            <CustomDropdown
              options={serviceTypes}
              value={selectedServiceType}
              onChange={(val) => {
                setSelectedServiceType(val);
                setSelectedDrugType("");
                setSelectedMedicalType("");
              }}
            />
          </div>

          {selectedServiceType === "drugs" && (
            <div>
              <label className="text-sm">Drug Type</label>
              <CustomDropdown
                options={drugTypes}
                value={selectedDrugType}
                onChange={setSelectedDrugType}
              />
            </div>
          )}

          {selectedServiceType === "medical" && (
            <div>
              <label className="text-sm">Medical Type</label>
              <CustomDropdown
                options={medicalTypes}
                value={selectedMedicalType}
                onChange={setSelectedMedicalType}
              />
            </div>
          )}

          <div className="md:col-span-2">
            <label className="text-sm">Ages of Household Members</label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              {formData.ages.map((age, idx) => (
                <input
                  key={idx}
                  type="number"
                  value={age}
                  onChange={(e) => {
                    const newAges = [...formData.ages];
                    newAges[idx] = e.target.value;
                    setFormData((prev) => ({ ...prev, ages: newAges }));
                  }}
                  placeholder={`Member ${idx + 1}`}
                  className="w-full bg-neutral-900 text-white p-2 rounded-md border border-black focus:ring-2 focus:ring-pink-400"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 text-center flex justify-center gap-4">
          <button
            onClick={handleReset}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-md"
          >
            Reset
          </button>
          <button
            onClick={handleSubmit}
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded-md"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;