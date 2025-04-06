import sys
import json

def main():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No user input data found."}))
        return

    try:
        user_input = json.loads(sys.argv[1])
    except json.JSONDecodeError:
        print(json.dumps({"error": "Invalid input format."}))
        return

    # Log input (optional for debug)
    print("DEBUG: Parsed user data =", user_input, file=sys.stderr)

    # Generate 5 mock plans
    mock_plans = [
        {
            "planName": "SilverCare Advantage",
            "metalTier": "Silver",
            "planType": "HMO",
            "phoneLocal": "555-123-4567",
            "phoneTollFree": "800-123-4567",
            "phoneTTY": "711",
            "networkURL": "https://www.silvercare.com",
            "totalPremium": "$4,800",
            "dentalAdult": "Yes",
            "dentalChild": "Yes",
            "deductibleDetails": "$2,000 Medical / $500 Drugs",
            "oopDetails": "$8,500 Max / $30 Copay / 20% Coinsurance",
            "estimatedTotalCost": "$6,100"
        },
        {
            "planName": "HealthFirst Gold Plus",
            "metalTier": "Gold",
            "planType": "PPO",
            "phoneLocal": "555-234-5678",
            "phoneTollFree": "800-234-5678",
            "phoneTTY": "711",
            "networkURL": "https://www.healthfirst.com",
            "totalPremium": "$6,000",
            "dentalAdult": "Yes",
            "dentalChild": "Yes",
            "deductibleDetails": "$1,200 Medical / $300 Drugs",
            "oopDetails": "$6,500 Max / $20 Copay / 15% Coinsurance",
            "estimatedTotalCost": "$7,200"
        },
        {
            "planName": "Essential Bronze Basic",
            "metalTier": "Bronze",
            "planType": "EPO",
            "phoneLocal": "555-345-6789",
            "phoneTollFree": "800-345-6789",
            "phoneTTY": "711",
            "networkURL": "https://www.essentialbronze.com",
            "totalPremium": "$3,600",
            "dentalAdult": "No",
            "dentalChild": "Yes",
            "deductibleDetails": "$5,000 Medical / $1,000 Drugs",
            "oopDetails": "$9,000 Max / $40 Copay / 30% Coinsurance",
            "estimatedTotalCost": "$6,800"
        },
        {
            "planName": "FamilyCare Premium",
            "metalTier": "Platinum",
            "planType": "POS",
            "phoneLocal": "555-456-7890",
            "phoneTollFree": "800-456-7890",
            "phoneTTY": "711",
            "networkURL": "https://www.familycare.com",
            "totalPremium": "$7,800",
            "dentalAdult": "Yes",
            "dentalChild": "Yes",
            "deductibleDetails": "$750 Medical / $200 Drugs",
            "oopDetails": "$5,000 Max / $15 Copay / 10% Coinsurance",
            "estimatedTotalCost": "$8,300"
        },
        {
            "planName": "SmartHealth Saver",
            "metalTier": "Silver",
            "planType": "HMO",
            "phoneLocal": "555-567-8901",
            "phoneTollFree": "800-567-8901",
            "phoneTTY": "711",
            "networkURL": "https://www.smarthealth.com",
            "totalPremium": "$4,500",
            "dentalAdult": "No",
            "dentalChild": "No",
            "deductibleDetails": "$2,500 Medical / $750 Drugs",
            "oopDetails": "$7,000 Max / $35 Copay / 25% Coinsurance",
            "estimatedTotalCost": "$6,900"
        }
    ]

    # Output JSON
    print(json.dumps({ "plans": mock_plans }))


if __name__ == "__main__":
    main()