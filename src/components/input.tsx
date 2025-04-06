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

const frequencies = [
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" },
  { label: "One time in the next few months", value: "once_soon" },
  { label: "Two times in the next few months", value: "twice_soon" }
];

const householdSizes = ["1", "2", "3", "4", "5", "6+"];

const Input: React.FC = () => {
  const initialFormData = {
    state: "",
    county: "",
    householdSize: "1",
    income: "",
    ages: [""],
  };

  const [formData, setFormData] = useState(initialFormData);
  const [counties, setCounties] = useState<string[]>([]);
  const [countyData, setCountyData] = useState<Record<string, string[]>>({});
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [selectedServiceType, setSelectedServiceType] = useState("");
  const [selectedDrugType, setSelectedDrugType] = useState("");
  const [selectedMedicalType, setSelectedMedicalType] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const loadCounties = async () => {
      const res = await fetch('/data/us_state_counties.json');
      const data = await res.json();
      setCountyData(data);
    };
    loadCounties();
  }, []);

  useEffect(() => {
    const stateCode = formData.state;
    if (stateCode && countyData[stateCode]) {
      setCounties(countyData[stateCode]);
    } else {
      setCounties([]);
    }
    setFormData((prev) => ({ ...prev, county: "" }));
  }, [formData.state, countyData]);

  const showPopupMessage = (message: string) => {
    setPopupMessage(message);
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setSelectedServiceType("");
    setSelectedDrugType("");
    setSelectedMedicalType("");
    setPopupMessage(null);
    setHasInteracted(false);
  };

  const handleSubmit = async () => {
    const { state, county, householdSize, income, ages } = formData;

    if (!state) return showPopupMessage("Please select a state.");
    if (!county) return showPopupMessage("Please select a county.");
    if (!income) return showPopupMessage("Please enter your income.");
    if (ages.some((age) => !age)) return showPopupMessage("Please fill out all age fields.");
    if (!selectedServiceType) return showPopupMessage("Please select a service type.");
    if (
      (selectedServiceType === "drugs" && !selectedDrugType) ||
      (selectedServiceType === "medical" && !selectedMedicalType)
    ) {
      return showPopupMessage("Please select a specific type of service.");
    }

    setPopupMessage(null);
    setLoading(true);

    const payload = {
      ...formData,
      selectedServiceType,
      selectedDrugType,
      selectedMedicalType,
    };
    console.log("Submitting payload:", payload);
    localStorage.setItem("userInputData", JSON.stringify(payload));

    try {
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
      <div 
        onClick={() => setHasInteracted(true)}
        className="bg-neutral-900 p-8 rounded-2xl shadow-xl w-full max-w-3xl text-white"
      >
        <h2 className="text-2xl mb-6 text-center font-bold">
          {loading ? (
            <div className="flex justify-center">
              <motion.div
                className="flex space-x-1 text-3xl sm:text-5xl font-extrabold text-pink-400 tracking-widest animate-pulse"
                variants={{
                  animate: {
                    transition: {
                      staggerChildren: 0.15,
                      repeat: Infinity,
                      repeatDelay: 0,
                    },
                  },
                }}
                initial="initial"
                animate="animate"
              >
                {['L', 'o', 'a', 'd', 'i', 'n', 'g', '.', '.', '.'].map((char, i) => (
                  <motion.span
                    key={i}
                    className="text-pink-400"
                    variants={{
                      initial: { y: 30, opacity: 0, scale: 0.8 },
                      animate: {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        transition: {
                          type: 'spring',
                          stiffness: 300,
                          damping: 20,
                        },
                      },
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.div>
            </div>
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
              options={usStates.map((s) => ({ label: s, value: s }))}
              value={formData.state}
              onChange={(val) => setFormData((prev) => ({ ...prev, state: val }))}
            />
          </div>

          <div>
            <label className="text-sm">County</label>
            <CustomDropdown
              options={counties.map((c) => ({ label: c, value: c }))}
              value={formData.county}
              onChange={(val) => setFormData((prev) => ({ ...prev, county: val }))}
              disabled={!formData.state}
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
                  ages: Array(size).fill(""),
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
              className="w-full bg-neutral-900 text-white p-2 rounded-md border border-black hover:border-pink-400 hover:shadow-[0_0_10px_#00f0ff50] focus:outline-none focus:ring-2 focus:ring-pink-400 transition transform hover:scale-105 duration-200"
              placeholder="e.g. 52000"
            />
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
                onChange={(val) => setSelectedDrugType(val)}
              />
            </div>
          )}

          {selectedServiceType === "medical" && (
            <div>
              <label className="text-sm">Medical Type</label>
              <CustomDropdown
                options={medicalTypes}
                value={selectedMedicalType}
                onChange={(val) => setSelectedMedicalType(val)}
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
                  className="w-full bg-neutral-900 text-white p-2 rounded-md border border-black hover:border-pink-400 hover:shadow-[0_0_10px_#00f0ff50] focus:outline-none focus:ring-2 focus:ring-pink-400 transition transform hover:scale-105 duration-200"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 text-center flex justify-center gap-4">
          <button
            onClick={handleReset}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-md transition transform hover:scale-105"
          >
            Reset
          </button>
          <button
            onClick={handleSubmit}
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded-md transition transform hover:scale-105"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;