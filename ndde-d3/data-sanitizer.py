# WARNING: DO NOT RUN THIS SCRIPT UNLESS ABSOLUTELY NECESSARY
# This script is designed for data sanitizing and may create new files 
# in the project directory. Running this script can affect the files 
# referred to in the project and potentially alter the project's data structure.
# IMPORTANT: Portions of this script that create new files are currently commented out.
# To enable file creation, carefully review and uncomment these sections of the code.
# Proceed with caution and ensure you have a backup of your data before running this script.


import pandas as pd
import pycountry


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
        'European Union (27)', 'High-Income countries', 'Low-income countries',
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
