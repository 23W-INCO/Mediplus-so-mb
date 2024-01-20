# WARNING: DO NOT RUN THIS SCRIPT UNLESS ABSOLUTELY NECESSARY
# This script is designed for data sanitizing and may create new files 
# in the project directory. Running this script can affect the files 
# referred to in the project and potentially alter the project's data structure.
# IMPORTANT: Portions of this script that create new files are currently commented out.
# To enable file creation, carefully review and uncomment these sections of the code.
# Proceed with caution and ensure you have a backup of your data before running this script.


import pandas as pd
import pycountry
import csv
import json


# Snippet for removing unsupported entities and adding codes to unrecognized countries 
csv_file_path = './csv/archive/natural-disasters-decadal-raw.csv'

def get_country_code(country_name, custom_mappings):
    if country_name in custom_mappings:
        return custom_mappings[country_name]

    try:
        return pycountry.countries.get(name=country_name).alpha_3
    except:
        return None

def add_country_codes(csv_file_path, output_file_path):
    # Custom mappings for unrecognized countries
    custom_mappings = {
        'Bolivia': 'BOL',
        'British Virgin Islands': 'VGB',
        'Brunei': 'BRN',  # Brunei Darussalam,BRN
        'Cape Verde': 'CPV',
        "Cote d'Ivoire": "CIV",  # Ivory Coast a.k.a Côte d'Ivoire,CIV
        'Democratic Republic of Congo': 'COD',  # Democratic Republic of the Congo,COD
        'East Timor': 'TLS',  # Timor-Leste,TLS
        'Iran': 'IRN',  # Islamic Republic of Iran,IRN
        'Laos': 'LAO',  # Lao People's Democratic Republic,LAO
        'Micronesia (country)': 'FSM',  # Federated States of Micronesia,FSM
        'Moldova': 'MDA',  # Republic of Moldova,MDA
        'Netherlands Antilles': 'ANT',
        'North Korea': 'PRK',  # Democratic People's Republic of Korea,PRK
        'Palestine': 'PSE',
        'Reunion': 'REU',  # Department of Réunion,REU
        'Russia': 'RUS',
        'Saint Barthelemy': 'BLM',  # Saint Barthélemy,BLM
        'Saint Helena': 'SHN',
        'South Korea': 'KOR',  # Republic of Korea,KOR
        'Syria': 'SYN',  # Syrian Arab Republic,SYR
        'Taiwan': 'TWN',
        'Tanzania': 'TZA',  # United Republic of Tanzania,TZA
        'Turkey': 'TUR',
        'United States Virgin Islands': 'VIR',
        'Venezuela': 'VEN',
        'Vietnam': 'VNM'  # Viet Nam,VNM
    }

    # Entities to be removed
    entities_to_remove = [
        'Africa', 'Asia', 'Czechoslovakia', 'East Germany', 'Europe',
        'European Union (27)', 'High-income countries', 'Low-income countries',
        'Lower-middle-income countries', 'North America', 'North Yemen', 'Oceania',
        'Serbia and Montenegro', 'South America', 'South Yemen', 'USSR',
        'Upper-middle-income countries', 'West Germany', 'World', 'Yugoslavia'
    ]

    # Read the CSV file
    df = pd.read_csv(csv_file_path)

    # Filter out the rows with entities to be removed
    df = df[~df['Country name'].isin(entities_to_remove)]

    # Create a new column for country codes with 3-letter codes
    df['Country code'] = df['Country name'].apply(lambda x: get_country_code(x, custom_mappings))

    # Move the 'Country code' column to be right after 'Country name'
    country_code_col = df.pop('Country code')
    df.insert(df.columns.get_loc('Country name') + 1, 'Country code', country_code_col)

    # Write to a new CSV file
    df.to_csv(output_file_path, index=False)


# Uncomment to Run
# output_file_path = 'natural-disasters-decadal.csv'
# add_country_codes(csv_file_path, output_file_path)



# Snippet for adding row with HXL hashtags to enforce HXL-compliance
# HXL hashtags for specific columns
hxl_hashtags = {
    'Country name': '#country+name',
    'Country code': '#country+code',
    'Year': '#date+year',

    # all disasters
    'Number of deaths from disasters': '#affected+dead+disasters',
    'Number of people injured from disasters': '#affected+injured+disasters',
    'Number of total people affected by disasters': '#affected+total+disasters',
    'Number of people left homeless from disasters': '#affected+homeless+disasters',
    'Total economic damages from disasters as a share of GDP': '#impact+econ+gdp+disasters',
    
    # droughts
    'Number of deaths from drought': '#affected+dead+drought',
    'Number of people injured from drought': '#affected+injured+drought',
    'Number of total people affected by drought': '#affected+total+drought',
    'Number of people left homeless from drought': '#affected+homeless+drought',
    'Total economic damages from drought as a share of GDP': '#impact+econ+gdp+drought',

    # earthquakes
    'Number of deaths from earthquakes': '#affected+dead+earthquake',
    'Number of people injured from earthquakes': '#affected+injured+earthquake',
    'Number of total people affected by earthquakes': '#affected+total+earthquake',
    'Number of people left homeless from earthquakes': '#affected+homeless+earthquake',
    'Total economic damages from earthquakes as a share of GDP': '#impact+econ+gdp+earthquake',

    # volcanoes
    'Number of deaths from volcanic activity': '#affected+dead+volcanic',
    'Number of people injured from volcanic activity': '#affected+injured+volcanic',
    'Number of total people affected by volcanic activity': '#affected+total+volcanic',
    'Number of people left homeless from volcanic activity': '#affected+homeless+volcanic',
    'Total economic damages from volcanic activity as a share of GDP': '#impact+econ+gdp+volcanic',

    # floods
    'Number of deaths from floods': '#affected+dead+floods',
    'Number of people injured from floods': '#affected+injured+floods',
    'Number of total people affected by floods': '#affected+total+floods',
    'Number of people left homeless from floods': '#affected+homeless+floods',
    'Total economic damages from floods as a share of GDP': '#impact+econ+gdp+floods',

    # mass movements
    'Number of deaths from mass movements': '#affected+dead+massmovement',
    'Number of people injured from mass movements': '#affected+injured+massmovement',
    'Number of total people affected by mass movements': '#affected+total+massmovement',
    'Number of people left homeless from mass movements': '#affected+homeless+massmovement',
    'Total economic damages from mass movements as a share of GDP': '#impact+econ+gdp+massmovement',

    # storms
    'Number of deaths from storms': '#affected+dead+storms',
    'Number of people injured from storms': '#affected+injured+storms',
    'Number of total people affected by storms': '#affected+total+storms',
    'Number of people left homeless from storms': '#affected+homeless+storms',
    'Total economic damages from storms as a share of GDP': '#impact+econ+gdp+storms',

    # landslides
    'Number of deaths from landslides': '#affected+dead+landslide',
    'Number of people injured from landslides': '#affected+injured+landslide',
    'Number of total people affected by landslides': '#affected+total+landslide',
    'Number of people left homeless from landslides': '#affected+homeless+landslide',
    'Total economic damages from landslides as a share of GDP': '#impact+econ+gdp+landslide',

    # wildfires
    'Number of deaths from wildfires': '#affected+dead+fire',
    'Number of people injured from wildfires': '#affected+injured+fire',
    'Number of total people affected by wildfires': '#affected+total+fire',
    'Number of people left homeless from wildfires': '#affected+homeless+fire',
    'Total economic damages from wildfires as a share of GDP': '#impact+econ+gdp+fire',

    # extreme temperatures
    'Number of deaths from extreme temperatures': '#affected+dead+temperature',
    'Number of people injured from extreme temperatures': '#affected+injured+temperature',
    'Number of total people affected by extreme temperatures': '#affected+total+temperature',
    'Number of people left homeless from extreme temperatures': '#affected+homeless+temperature',
    'Total economic damages from extreme temperatures as a share of GDP': '#impact+econ+gdp+temperature'
}

csv_file_path_2 = './csv/archive/natural-disasters-decadal.csv'

# Read the CSV file
df = pd.read_csv(csv_file_path_2)

# Uncomment to Run
# Create a new row for HXL hashtags
# hxl_row = [hxl_hashtags.get(col, '') for col in df.columns]

# Insert the row of HXL hashtags at the second position (index 1)
# df.loc[-1] = hxl_row  # add a row at the end of the DataFrame
# df.index = df.index + 1  # shift the index
# df = df.sort_index()  # sort by index

# Write to a new CSV file
# df.to_csv('hxl-compliant-' + csv_file_path_2 + '-data', index=False)



# Function for determining min_year and max_year from csv data
def create_decades_array(csvData):
    # Read the "Year" column
    years = pd.read_csv(csvData)['Year']

    # Find the smallest and largest year
    min_year = years.min()
    max_year = years.max()

    # Create an array of decades
    decades = list(range(min_year, max_year + 1, 10))

    return decades

# Uncomment to Run
# decades = create_decades_array(csv_file_path)
# print(decades)



# Function for converting csv file to csv file
# CSV file path
csv_file_path_3 = './csv/hxl-compliant-natural-disasters-decadal-data.csv'

# JSON file path
json_file_path = './json/hxl-compliant-natural-disasters-decadal-data.json'

# Read CSV and convert to JSON
data = []
# with open(csv_file_path, 'r') as csv_file:
#     csv_reader = csv.DictReader(csv_file)
#     for row in csv_reader:
#         data.append(row)

# Write the JSON data to a file
# with open(json_file_path, 'w') as json_file:
#     json.dump(data, json_file)

# print("CSV file has been converted to JSON.")



# Function to create 'country name: country' code dict

def read_csv_to_dict(file_path):
    with open(file_path, mode='r', encoding='utf-8') as file:
        reader = csv.reader(file)
        next(reader)  # Skip the header row if your CSV has one
        country_dict = {}
        for row in reader:
            country_name, country_code = row[0], row[1]
            if country_name not in country_dict:
                country_dict[country_name] = country_code
    return country_dict

# Uncomment to Run
# country_code_dict = read_csv_to_dict(csv_file_path_2)
# print(country_code_dict)



# Snippet to create 'countries-selector' HTML dropdown
data = {
    "Afghanistan": "AFG",
    "Albania": "ALB",
    "Algeria": "DZA",
    "American Samoa": "ASM",
    "Angola": "AGO",
    "Anguilla": "AIA",
    "Antigua and Barbuda": "ATG",
    "Argentina": "ARG",
    "Armenia": "ARM",
    "Australia": "AUS",
    "Austria": "AUT",
    "Azerbaijan": "AZE",
    "Bahamas": "BHS",
    "Bangladesh": "BGD",
    "Barbados": "BRB",
    "Belarus": "BLR",
    "Belgium": "BEL",
    "Belize": "BLZ",
    "Benin": "BEN",
    "Bermuda": "BMU",
    "Bhutan": "BTN",
    "Bolivia": "BOL",
    "Bosnia and Herzegovina": "BIH",
    "Botswana": "BWA",
    "Brazil": "BRA",
    "British Virgin Islands": "VGB",
    "Brunei": "BRN",
    "Bulgaria": "BGR",
    "Burkina Faso": "BFA",
    "Burundi": "BDI",
    "Cambodia": "KHM",
    "Cameroon": "CMR",
    "Canada": "CAN",
    "Cape Verde": "CPV",
    "Cayman Islands": "CYM",
    "Central African Republic": "CAF",
    "Chad": "TCD",
    "Chile": "CHL",
    "China": "CHN",
    "Colombia": "COL",
    "Comoros": "COM",
    "Congo": "COG",
    "Cook Islands": "COK",
    "Costa Rica": "CRI",
    "Cote d'Ivoire": "CIV",
    "Croatia": "HRV",
    "Cuba": "CUB",
    "Cyprus": "CYP",
    "Czechia": "CZE",
    "Democratic Republic of Congo": "COD",
    "Denmark": "DNK",
    "Djibouti": "DJI",
    "Dominica": "DMA",
    "Dominican Republic": "DOM",
    "East Timor": "TLS",
    "Ecuador": "ECU",
    "Egypt": "EGY",
    "El Salvador": "SLV",
    "Eritrea": "ERI",
    "Estonia": "EST",
    "Eswatini": "SWZ",
    "Ethiopia": "ETH",
    "Fiji": "FJI",
    "Finland": "FIN",
    "France": "FRA",
    "French Guiana": "GUF",
    "French Polynesia": "PYF",
    "Gabon": "GAB",
    "Gambia": "GMB",
    "Georgia": "GEO",
    "Germany": "DEU",
    "Ghana": "GHA",
    "Greece": "GRC",
    "Grenada": "GRD",
    "Guadeloupe": "GLP",
    "Guam": "GUM",
    "Guatemala": "GTM",
    "Guinea": "GIN",
    "Guinea-Bissau": "GNB",
    "Guyana": "GUY",
    "Haiti": "HTI",
    "High-income countries": "",
    "Honduras": "HND",
    "Hong Kong": "HKG",
    "Hungary": "HUN",
    "Iceland": "ISL",
    "India": "IND",
    "Indonesia": "IDN",
    "Iran": "IRN",
    "Iraq": "IRQ",
    "Ireland": "IRL",
    "Isle of Man": "IMN",
    "Israel": "ISR",
    "Italy": "ITA",
    "Jamaica": "JAM",
    "Japan": "JPN",
    "Jordan": "JOR",
    "Kazakhstan": "KAZ",
    "Kenya": "KEN",
    "Kiribati": "KIR",
    "Kuwait": "KWT",
    "Kyrgyzstan": "KGZ",
    "Laos": "LAO",
    "Latvia": "LVA",
    "Lebanon": "LBN",
    "Lesotho": "LSO",
    "Liberia": "LBR",
    "Libya": "LBY",
    "Lithuania": "LTU",
    "Luxembourg": "LUX",
    "Macao": "MAC",
    "Madagascar": "MDG",
    "Malawi": "MWI",
    "Malaysia": "MYS",
    "Maldives": "MDV",
    "Mali": "MLI",
    "Malta": "MLT",
    "Marshall Islands": "MHL",
    "Martinique": "MTQ",
    "Mauritania": "MRT",
    "Mauritius": "MUS",
    "Mexico": "MEX",
    "Micronesia (country)": "FSM",
    "Moldova": "MDA",
    "Mongolia": "MNG",
    "Montenegro": "MNE",
    "Montserrat": "MSR",
    "Morocco": "MAR",
    "Mozambique": "MOZ",
    "Myanmar": "MMR",
    "Namibia": "NAM",
    "Nepal": "NPL",
    "Netherlands": "NLD",
    "Netherlands Antilles": "ANT",
    "New Caledonia": "NCL",
    "New Zealand": "NZL",
    "Nicaragua": "NIC",
    "Niger": "NER",
    "Nigeria": "NGA",
    "Niue": "NIU",
    "North Korea": "PRK",
    "North Macedonia": "MKD",
    "Northern Mariana Islands": "MNP",
    "Norway": "NOR",
    "Oman": "OMN",
    "Pakistan": "PAK",
    "Palau": "PLW",
    "Palestine": "PSE",
    "Panama": "PAN",
    "Papua New Guinea": "PNG",
    "Paraguay": "PRY",
    "Peru": "PER",
    "Philippines": "PHL",
    "Poland": "POL",
    "Portugal": "PRT",
    "Puerto Rico": "PRI",
    "Qatar": "QAT",
    "Reunion": "REU",
    "Romania": "ROU",
    "Russia": "RUS",
    "Rwanda": "RWA",
    "Saint Barthelemy": "BLM",
    "Saint Helena": "SHN",
    "Saint Kitts and Nevis": "KNA",
    "Saint Lucia": "LCA",
    "Saint Martin (French part)": "MAF",
    "Saint Vincent and the Grenadines": "VCT",
    "Samoa": "WSM",
    "Sao Tome and Principe": "STP",
    "Saudi Arabia": "SAU",
    "Senegal": "SEN",
    "Serbia": "SRB",
    "Seychelles": "SYC",
    "Sierra Leone": "SLE",
    "Sint Maarten (Dutch part)": "SXM",
    "Slovakia": "SVK",
    "Slovenia": "SVN",
    "Solomon Islands": "SLB",
    "Somalia": "SOM",
    "South Africa": "ZAF",
    "South Korea": "KOR",
    "South Sudan": "SSD",
    "Spain": "ESP",
    "Sri Lanka": "LKA",
    "Sudan": "SDN",
    "Suriname": "SUR",
    "Sweden": "SWE",
    "Switzerland": "CHE",
    "Syria": "SYN",
    "Taiwan": "TWN",
    "Tajikistan": "TJK",
    "Tanzania": "TZA",
    "Thailand": "THA",
    "Togo": "TGO",
    "Tokelau": "TKL",
    "Tonga": "TON",
    "Trinidad and Tobago": "TTO",
    "Tunisia": "TUN",
    "Turkey": "TUR",
    "Turkmenistan": "TKM",
    "Turks and Caicos Islands": "TCA",
    "Tuvalu": "TUV",
    "Uganda": "UGA",
    "Ukraine": "UKR",
    "United Arab Emirates": "ARE",
    "United Kingdom": "GBR",
    "United States": "USA",
    "United States Virgin Islands": "VIR",
    "Uruguay": "URY",
    "Uzbekistan": "UZB",
    "Vanuatu": "VUT",
    "Venezuela": "VEN",
    "Vietnam": "VNM",
    "Wallis and Futuna": "WLF",
    "Yemen": "YEM",
    "Zambia": "ZMB",
    "Zimbabwe": "ZWE",
}

# Start building the HTML code
html_code = '<select>\n'

# Add the placeholder option as the first option
html_code += '    <option value="" label="Select">Select</option>\n'

# Iterate through the JSON data and create <option> elements
for country_name, country_code in data.items():
    # Skip the entry with an empty country code
    if country_code != "":
        # Create the <option> element
        option = f'    <option value="{country_code}" label="{country_name}">{country_name}</option>'
        html_code += option + '\n'

# <select> close tag
html_code += '</select>'

# Uncomment to Print the generated HTML code
# print(html_code)
