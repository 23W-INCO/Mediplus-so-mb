'''
import json

# Read the list of countries from the provided string
countries_string = "Afghanistan, Albania, Algeria, American Samoa, Andorra, Angola, Anguilla, Antigua and Barbuda, Argentina, Armenia, Aruba, Australia, Austria, Azerbaijan, Bahamas, Bahrain, Bangladesh, Barbados, Belarus, Belgium, Belize, Benin, Bermuda, Bhutan, Bolivia, Bosnia and Herzegovina, Botswana, Brazil, Brunei, Bulgaria, Burkina Faso, Burundi, Cabo Verde, Cambodia, Cameroon, Canada, Cayman Islands, Central African Republic, Chad, Chile, China, Christmas Island, Cocos (Keeling) Islands, Colombia, Comoros, Congo, Democratic Republic of the (DRC), Congo, Republic of the (ROC), Cook Islands, Costa Rica, Côte d'Ivoire (Ivory Coast), Croatia, Cuba, Curaçao, Cyprus, Czech Republic, Denmark, Djibouti, Dominica, Dominican Republic, East Timor (Timor-Leste), Ecuador, Egypt, El Salvador, England, Equatorial Guinea, Eritrea, Estonia, Eswatini (Swaziland), Ethiopia, Falkland Islands (Islas Malvinas), Faroe Islands, Federated States of Micronesia, Fiji, Finland, France, French Guiana, French Polynesia, Gabon, Gambia, Georgia, Germany, Ghana, Gibraltar, Greece, Greenland, Grenada, Guadeloupe, Guam, Guatemala, Guernsey, Guinea, Guinea-Bissau, Guyana, Haiti, Heard Island and McDonald Islands, Honduras, Hong Kong, Hungary, Iceland, India, Indonesia, Iran, Iraq, Ireland, Isle of Man, Israel, Italy, Jamaica, Japan, Jersey, Jordan, Kazakhstan, Kenya, Kiribati, Kosovo, Kuwait, Kyrgyzstan, Laos, Latvia, Lebanon, Lesotho, Liberia, Libya, Liechtenstein, Lithuania, Luxembourg, Macau, Macedonia, Madagascar, Malawi, Malaysia, Maldives, Mali, Malta, Marshall Islands, Martinique, Mauritania, Mauritius, Mayotte, Mexico, Micronesia, Federated States of, Moldova, Monaco, Mongolia, Montenegro, Montserrat, Morocco, Mozambique, Myanmar (Burma), Namibia, Nauru, Nepal, Netherlands, New Caledonia, New Zealand, Nicaragua, Niger, Nigeria, Niue, Norfolk Island, North Korea, Northern Mariana Islands, Norway, Oman, Pakistan, Palau, Palestine, Palestinian Territories, Panama, Papua New Guinea, Paraguay, Peru, Philippines, Pitcairn Islands, Poland, Portugal, Puerto Rico, Qatar, Republic of the Congo, Réunion, Romania, Russia, Rwanda, Saint Barthélemy, Saint Helena, Ascension and Tristan da Cunha, Saint Kitts and Nevis, Saint Lucia, Saint Martin, Saint Pierre and Miquelon, Saint Vincent and the Grenadines, Samoa, San Marino, São Tomé and Príncipe, Saudi Arabia, Scotland, Senegal, Serbia, Seychelles, Sierra Leone, Singapore, Sint Maarten, Slovakia, Slovenia, Solomon Islands, Somalia, South Africa, South Georgia and the South Sandwich Islands, South Korea, South Sudan, Spain, Sri Lanka, Sudan, Suriname, Svalbard and Jan Mayen, Swaziland (eSwatini), Sweden, Switzerland, Syria, Taiwan, Tajikistan, Tanzania, Thailand, Togo, Tokelau, Tonga, Trinidad and Tobago, Tunisia, Turkey, Turkmenistan, Turks and Caicos Islands, Tuvalu, Uganda, Ukraine, United Arab Emirates (UAE), United Kingdom, United States, Uruguay, Uzbekistan, Vanuatu, Vatican City, Venezuela, Vietnam, Wales, Wallis and Futuna, Western Sahara, Yemen, Zambia, Zimbabwe"
countries_list = [country.strip() for country in countries_string.split(',')]

# Read data from the file
with open("natural-disasters.json", "r") as file:
    json_data = json.load(file)

# Remove countries not present in the countries_list
filtered_data = [entry for entry in json_data if entry["Country"] in countries_list]

# Write the filtered data to a new file
with open("natural-disasters-countries.json", "w") as file:
    json.dump(filtered_data, file, indent=2)

# Print a message indicating success
print("Filtered data saved to new file, natural-disasters-countries.json")
'''

'''
import json

# Step 1: Read the original JSON file
with open('natural-disasters.json', 'r') as file:
    data = json.load(file)

# Step 2: Modify the data
for entry in data:
    if entry.get('Country') == 'South Sudan':
        entry['Country'] = 'South Sudan'

# Step 3: Create a new JSON file
new_data = [entry for entry in data if entry.get('Country') == 'South Sudan']

with open('new_file.json', 'w') as new_file:
    json.dump(new_data, new_file, indent=2)

print("New JSON file created.")
'''

'''
import json

# Read the existing JSON file
with open('natural-disasters-countries.json', 'r') as existing_file:
    existing_data = json.load(existing_file)

# Read the new JSON file
with open('new_file.json', 'r') as new_file:
    new_data = json.load(new_file)

# Add the contents of the new file to the existing data
existing_data.extend(new_data)

# Write the updated data back to the existing JSON file
with open('natural-disasters-countries.json', 'w') as updated_file:
    json.dump(existing_data, updated_file, indent=2)

print("Updated JSON file with new data.")
'''

import json

# Read the JSON file
with open('natural-disasters-countries.json', 'r') as file:
    data = json.load(file)

# Modify the data
for entry in data:
    if entry.get('Country') == 'South Sudan':
        entry['Country'] = 'SS'

# Write the updated data back to the same JSON file
with open('natural-disasters-countries.json', 'w') as file:
    json.dump(data, file, indent=2)

print("JSON file updated.")
