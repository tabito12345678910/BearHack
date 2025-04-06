import sys
import json
import pandas as pd
import os

def sanitize_dental(value):
    """Only clean dental values: X, blank, or NaN → 'None'"""
    if pd.isna(value) or str(value).strip().upper() == str(value).strip() == "":
        return "None"
    elif pd.isna(value) or str(value).strip().upper() == str(value).strip() == "X":
        return "Yes"
    return str(value)

def sanitize_currency(value):
    """Ensure a single $ sign and strip whitespace (leave blank if empty)"""
    if pd.isna(value) or value == "" or any(char.isalpha() for char in str(value)):  # Check if there's any alphabetic character
        return "N/A"
    value_str = str(value).strip().lstrip("$")
    return f"${value_str}"

def interpolate_premium(row, age):
    """Estimate premium cost using linear interpolation by age"""
    age_cols = {
        14: "Premium Child Age 0-14",
        18: "Premium Child Age 18",
        21: "Premium Adult Individual Age 21",
        27: "Premium Adult Individual Age 27",
        30: "Premium Adult Individual Age 30",
        40: "Premium Adult Individual Age 40",
        50: "Premium Adult Individual Age 50",
        60: "Premium Adult Individual Age 60"
    }

    try:
        values = [row.get(col, 0) for col in age_cols.values()]
        breakpoints = list(age_cols.keys())
    except:
        return 0

    for i in range(len(breakpoints) - 1):
        if breakpoints[i] <= age <= breakpoints[i + 1]:
            x0, x1 = breakpoints[i], breakpoints[i + 1]
            y0, y1 = values[i], values[i + 1]
            return y0 + (y1 - y0) * (age - x0) / (x1 - x0)

    return values[-1]

def format_output_row(row):
    """Format a single row of data for output"""
    deductible_info = f"{sanitize_currency(row.get('Medical Deductible - Individual - Standard'))} Medical / {sanitize_currency(row.get('Drug Deductible - Individual - Standard'))} Drugs"
    
    oop_value = sanitize_currency(row.get('Medical Maximum Out Of Pocket - Individual - Standard'))
    copay_value = sanitize_currency(row.get('Specialist - Standard'))
    coinsurance_value = sanitize_currency(row.get('Generic Drugs - Standard'))

    oop_details = []
    
    if "$" in oop_value and oop_value != "N/A" and not any(char.isalpha() for char in oop_value):
        oop_details.append(f"Out of Pocket Max: {oop_value}")
    
    if "$" in copay_value and copay_value != "N/A" and not any(char.isalpha() for char in copay_value):
        oop_details.append(f"Copay: {copay_value}")
    
    if "$" in coinsurance_value and coinsurance_value != "N/A" and not any(char.isalpha() for char in coinsurance_value):
        coinsurance_value = coinsurance_value.lstrip('$') + '%'
        oop_details.append(f"Coinsurance: {coinsurance_value}")

    oop_details = " / ".join(oop_details) if oop_details else "No Charge after Deductible"

    return {
        "planName": row.get("Plan Marketing Name", ""),
        "metalTier": row.get("Metal Level", ""),
        "planType": row.get("Plan Type", ""),
        "phoneLocal": row.get("Customer Service Phone Number Local", ""),
        "phoneTollFree": row.get("Customer Service Phone Number Toll Free", ""),
        "phoneTTY": row.get("Customer Service Phone Number TTY", "") or "None",
        "networkURL": row.get("Network URL", ""),
        "totalPremium": sanitize_currency(row["Estimated Cost"]),
        "dentalAdult": sanitize_dental(row.get("Adult Dental")),
        "dentalChild": sanitize_dental(row.get("Child Dental")),
        "deductibleDetails": deductible_info,
        "oopDetails": oop_details,
        "estimatedTotalCost": sanitize_currency(row["Estimated Cost"]),
    }

def main():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No user input data found."}))
        return

    try:
        user_input = json.loads(sys.argv[1])
    except json.JSONDecodeError:
        print(json.dumps({"error": "Invalid input format."}))
        return

    print("DEBUG: Parsed user data =", user_input, file=sys.stderr)

    state = user_input.get("state")
    county = user_input.get("county")
    ages = [int(age) for age in user_input.get("ages", [])]
    metal_tiers = user_input.get("metalTiers", "No Preference")

    if not state or not county or not ages:
        print(json.dumps({"error": "Missing required input fields."}))
        return

    file_path = f"public/data/states/{state}/plans.json"
    if not os.path.exists(file_path):
        print(json.dumps({"error": f"No data found for state: {state}"}))
        return

    try:
        df = pd.read_json(file_path)
    except Exception as e:
        print(json.dumps({"error": f"Failed to load data: {str(e)}"}))
        return

    df.columns = df.columns.str.strip()
    df = df[df["County Name"].str.strip() == county]

    if df.empty:
        print(json.dumps({"error": f"No plans found for {county}, {state}"}))
        return

    if metal_tiers != "No Preference":
        df = df[df["Metal Level"] == metal_tiers]

    df["Estimated Cost"] = df.apply(
        lambda row: sum(interpolate_premium(row, age) for age in ages), axis=1
    )

    df = df.sort_values(by="Estimated Cost").head(5)

    output = [format_output_row(row) for _, row in df.iterrows()]
    print(json.dumps({ "plans": output }, indent=2))

if __name__ == "__main__":
    main()