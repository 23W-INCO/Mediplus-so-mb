import pandas as pd
import pycountry


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


# Run
# csv_file_path = 'natural-disasters-decadal-raw.csv'
# output_file_path = 'natural-disasters-decadal.csv'
# add_country_codes(csv_file_path, output_file_path)
