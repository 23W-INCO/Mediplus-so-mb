// ----------------------------
// worldmap
// ----------------------------

export let worldmap;
const GeoJSONUrl = "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";

// Function to check url status of GeoJSONUrl
function checkUrlStatus(url) {
	const xhr = new XMLHttpRequest();
	xhr.open('GET', url);
  
	xhr.onreadystatechange = function () {
	  if (xhr.readyState === 4) {
		if (xhr.status === 200) {
		  return xhr.status;
		} else {
		  console.log("Couldn't load GeoJSON data from url - Reverted to local source file - Status:", xhr.status, "- check URL: ", GeoJSONUrl);
		  return xhr.status;
		}
	  }
	};

	xhr.send();
}

// Assign worldmap based on GeoJSONUrl status or revert to world.geojson file
if (checkUrlStatus(GeoJSONUrl) === "200") {
	worldmap = GeoJSONUrl;
} else {
	worldmap = "world.geojson";
}



// ----------------------------
// continents
// ----------------------------

export const continents = {
    'World': { scale: 1, coordinates: [450, 250] },
    'Africa': { scale: 2.3, coordinates: [240, 100] },
    'North America': { scale: 2.5, coordinates: [-60, -15] },
    'South America': { scale: 2.5, coordinates: [50, 150] },
    'Asia': { scale: 2.4, coordinates: [350, 50] },
    'Europe': { scale: 4, coordinates: [150, -60] },
    'Oceania': { scale: 3, coordinates: [450, 150] }
};



// ----------------------------
// countriesInContinents
// ----------------------------

export const countriesInContinents = {
    "Africa": [
        { country: "Algeria", code: "DZA" },
        { country: "Angola", code: "AGO" },
        { country: "Benin", code: "BEN" },
        { country: "Botswana", code: "BWA" },
        { country: "Burkina Faso", code: "BFA" },
        { country: "Burundi", code: "BDI" },
        { country: "Cameroon", code: "CMR" },
        { country: "Cape Verde", code: "CPV" },
        { country: "Central African Republic", code: "CAF" },
        { country: "Chad", code: "TCD" },
        { country: "Comoros", code: "COM" },
        { country: "Congo", code: "COG" },
        { country: "Democratic Republic of Congo", code: "COD" },
        { country: "Djibouti", code: "DJI" },
        { country: "Egypt", code: "EGY" },
        { country: "Equatorial Guinea", code: "GNQ" },
        { country: "Eritrea", code: "ERI" },
        { country: "Eswatini", code: "SWZ" },
        { country: "Ethiopia", code: "ETH" },
        { country: "Gabon", code: "GAB" },
        { country: "Gambia", code: "GMB" },
        { country: "Ghana", code: "GHA" },
        { country: "Guinea", code: "GIN" },
        { country: "Guinea-Bissau", code: "GNB" },
        { country: "Ivory Coast", code: "CIV" },
        { country: "Kenya", code: "KEN" },
        { country: "Lesotho", code: "LSO" },
        { country: "Liberia", code: "LBR" },
        { country: "Libya", code: "LBY" },
        { country: "Madagascar", code: "MDG" },
        { country: "Malawi", code: "MWI" },
        { country: "Mali", code: "MLI" },
        { country: "Mauritania", code: "MRT" },
        { country: "Mauritius", code: "MUS" },
        { country: "Morocco", code: "MAR" },
        { country: "Mozambique", code: "MOZ" },
        { country: "Namibia", code: "NAM" },
        { country: "Niger", code: "NER" },
        { country: "Nigeria", code: "NGA" },
        { country: "Rwanda", code: "RWA" },
        { country: "Sao Tome and Principe", code: "STP" },
        { country: "Senegal", code: "SEN" },
        { country: "Seychelles", code: "SYC" },
        { country: "Sierra Leone", code: "SLE" },
        { country: "Somalia", code: "SOM" },
        { country: "South Africa", code: "ZAF" },
        { country: "South Sudan", code: "SSD" },
        { country: "Sudan", code: "SDN" },
        { country: "Tanzania", code: "TZA" },
        { country: "Togo", code: "TGO" },
        { country: "Tunisia", code: "TUN" },
        { country: "Uganda", code: "UGA" },
        { country: "Zambia", code: "ZMB" },
        { country: "Zimbabwe", code: "ZWE" }
    ],
    "North America": [
        { country: "Antigua and Barbuda", code: "ATG" },
        { country: "Bahamas", code: "BHS" },
        { country: "Barbados", code: "BRB" },
        { country: "Belize", code: "BLZ" },
        { country: "Canada", code: "CAN" },
        { country: "Costa Rica", code: "CRI" },
        { country: "Cuba", code: "CUB" },
        { country: "Dominica", code: "DMA" },
        { country: "Dominican Republic", code: "DOM" },
        { country: "El Salvador", code: "SLV" },
        { country: "Grenada", code: "GRD" },
        { country: "Guatemala", code: "GTM" },
        { country: "Haiti", code: "HTI" },
        { country: "Honduras", code: "HND" },
        { country: "Jamaica", code: "JAM" },
        { country: "Mexico", code: "MEX" },
        { country: "Nicaragua", code: "NIC" },
        { country: "Panama", code: "PAN" },
        { country: "Saint Kitts and Nevis", code: "KNA" },
        { country: "Saint Lucia", code: "LCA" },
        { country: "Saint Vincent and the Grenadines", code: "VCT" },
        { country: "Trinidad and Tobago", code: "TTO" },
        { country: "United States", code: "USA" },
        { country: "American Samoa", code: "ASM" },
        { country: "Bermuda", code: "BMU" },
        { country: "Greenland", code: "GRL" },
        { country: "Puerto Rico", code: "PRI" },
        { country: "United States Virgin Islands", code: "VIR" }
    ],
    "South America": [
        { country: "Argentina", code: "ARG" },
        { country: "Bolivia", code: "BOL" },
        { country: "Brazil", code: "BRA" },
        { country: "Chile", code: "CHL" },
        { country: "Colombia", code: "COL" },
        { country: "Ecuador", code: "ECU" },
        { country: "Guyana", code: "GUY" },
        { country: "Paraguay", code: "PRY" },
        { country: "Peru", code: "PER" },
        { country: "Suriname", code: "SUR" },
        { country: "Uruguay", code: "URY" },
        { country: "Venezuela", code: "VEN" },
        { country: "French Guiana", code: "GUF" }
    ],
    "Asia": [
        { country: "Afghanistan", code: "AFG" },
        { country: "Armenia", code: "ARM" },
        { country: "Azerbaijan", code: "AZE" },
        { country: "Bahrain", code: "BHR" },
        { country: "Bangladesh", code: "BGD" },
        { country: "Bhutan", code: "BTN" },
        { country: "Brunei", code: "BRN" },
        { country: "Cambodia", code: "KHM" },
        { country: "China", code: "CHN" },
        { country: "East Timor", code: "TLS" },
        { country: "Georgia", code: "GEO" },
        { country: "India", code: "IND" },
        { country: "Indonesia", code: "IDN" },
        { country: "Iran", code: "IRN" },
        { country: "Iraq", code: "IRQ" },
        { country: "Israel", code: "ISR" },
        { country: "Japan", code: "JPN" },
        { country: "Jordan", code: "JOR" },
        { country: "Kazakhstan", code: "KAZ" },
        { country: "Kuwait", code: "KWT" },
        { country: "Kyrgyzstan", code: "KGZ" },
        { country: "Laos", code: "LAO" },
        { country: "Lebanon", code: "LBN" },
        { country: "Malaysia", code: "MYS" },
        { country: "Maldives", code: "MDV" },
        { country: "Mongolia", code: "MNG" },
        { country: "Myanmar", code: "MMR" },
        { country: "Nepal", code: "NPL" },
        { country: "North Korea", code: "PRK" },
        { country: "Oman", code: "OMN" },
        { country: "Pakistan", code: "PAK" },
        { country: "Palestine", code: "PSE" },
        { country: "Philippines", code: "PHL" },
        { country: "Qatar", code: "QAT" },
        { country: "Saudi Arabia", code: "SAU" },
        { country: "Singapore", code: "SGP" },
        { country: "South Korea", code: "KOR" },
        { country: "Sri Lanka", code: "LKA" },
        { country: "Syria", code: "SYR" },
        { country: "Taiwan", code: "TWN" },
        { country: "Tajikistan", code: "TJK" },
        { country: "Thailand", code: "THA" },
        { country: "Turkmenistan", code: "TKM" },
        { country: "United Arab Emirates", code: "ARE" },
        { country: "Uzbekistan", code: "UZB" },
        { country: "Vietnam", code: "VNM" },
        { country: "Yemen", code: "YEM" }
    ],
    "Europe": [
        { country: "Albania", code: "ALB" },
        { country: "Andorra", code: "AND" },
        { country: "Austria", code: "AUT" },
        { country: "Belarus", code: "BLR" },
        { country: "Belgium", code: "BEL" },
        { country: "Bosnia and Herzegovina", code: "BIH" },
        { country: "Bulgaria", code: "BGR" },
        { country: "Croatia", code: "HRV" },
        { country: "Cyprus", code: "CYP" },
        { country: "Czechia", code: "CZE" },
        { country: "Denmark", code: "DNK" },
        { country: "Estonia", code: "EST" },
        { country: "Finland", code: "FIN" },
        { country: "France", code: "FRA" },
        { country: "Germany", code: "DEU" },
        { country: "Greece", code: "GRC" },
        { country: "Hungary", code: "HUN" },
        { country: "Iceland", code: "ISL" },
        { country: "Ireland", code: "IRL" },
        { country: "Italy", code: "ITA" },
        { country: "Kosovo", code: "XK" },
        { country: "Latvia", code: "LVA" },
        { country: "Liechtenstein", code: "LIE" },
        { country: "Lithuania", code: "LTU" },
        { country: "Luxembourg", code: "LUX" },
        { country: "Malta", code: "MLT" },
        { country: "Moldova", code: "MDA" },
        { country: "Monaco", code: "MCO" },
        { country: "Montenegro", code: "MNE" },
        { country: "Netherlands", code: "NLD" },
        { country: "North Macedonia", code: "MKD" },
        { country: "Norway", code: "NOR" },
        { country: "Poland", code: "POL" },
        { country: "Portugal", code: "PRT" },
        { country: "Romania", code: "ROU" },
        { country: "Russia", code: "RUS" },
        { country: "San Marino", code: "SMR" },
        { country: "Serbia", code: "SRB" },
        { country: "Slovakia", code: "SVK" },
        { country: "Slovenia", code: "SVN" },
        { country: "Spain", code: "ESP" },
        { country: "Sweden", code: "SWE" },
        { country: "Switzerland", code: "CHE" },
        { country: "Ukraine", code: "UKR" },
        { country: "United Kingdom", code: "GBR" },
        { country: "Vatican City", code: "VAT" }
    ],
    "Oceania": [
        { country: "Australia", code: "AUS" },
        { country: "Fiji", code: "FJI" },
        { country: "Kiribati", code: "KIR" },
        { country: "Marshall Islands", code: "MHL" },
        { country: "Micronesia (country)", code: "FSM" },
        { country: "Nauru", code: "NRU" },
        { country: "New Zealand", code: "NZL" },
        { country: "Palau", code: "PLW" },
        { country: "Papua New Guinea", code: "PNG" },
        { country: "Samoa", code: "WSM" },
        { country: "Solomon Islands", code: "SLB" },
        { country: "Tonga", code: "TON" },
        { country: "Tuvalu", code: "TUV" },
        { country: "Vanuatu", code: "VUT" },
        { country: "Cook Islands", code: "COK" },
        { country: "Niue", code: "NIU" },
        { country: "Tokelau", code: "TKL" },
        { country: "French Polynesia", code: "PYF" },
        { country: "New Caledonia", code: "NCL" },
        { country: "Wallis and Futuna", code: "WLF" }
    ]
}



// ----------------------------
// decades
// ----------------------------

// Array of years (decades)
// Computed using create_decades_array() function in ./data-sanitizer.py
export const decades = [1900, 1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020];



// ----------------------------
// disasterImpactMap
// ----------------------------

// Object to hold the mapping of disaster types to their respective impacts
export const disasterImpactMap = {
    'all disasters': [
            'Number of deaths from disasters',
            'Number of people injured from disasters',
            'Number of total people affected by disasters',
            'Number of people left homeless from disasters', 
            'Total economic damages from disasters as a share of GDP'
        ],
    'droughts': [
            'Number of deaths from drought',
            'Number of people injured from drought',
            'Number of total people affected by drought',
            'Number of people left homeless from drought',
            'Total economic damages from drought as a share of GDP'
        ],
    'earthquakes': [
            'Number of deaths from earthquakes',
            'Number of people injured from earthquakes',
            'Number of total people affected by earthquakes',
            'Number of people left homeless from earthquakes',
            'Total economic damages from earthquakes as a share of GDP'
        ],
    'volcanoes': [
            'Number of deaths from volcanic activity',
            'Number of people injured from volcanic activity',
            'Number of total people affected by volcanic activity',
            'Number of people left homeless from volcanic activity',
            'Total economic damages from volcanic activity as a share of GDP'
        ],
    'floods': [
            'Number of deaths from floods',
            'Number of people injured from floods',
            'Number of total people affected by floods',
            'Number of people left homeless from floods',
            'Total economic damages from floods as a share of GDP'
        ],
    'mass movements': [
            'Number of deaths from mass movements',
            'Number of people injured from mass movements',
            'Number of total people affected by mass movements',
            'Number of people left homeless from mass movements',
            'Total economic damages from mass movements as a share of GDP'
        ],
    'storms': [
            'Number of deaths from storms',
            'Number of people injured from storms',
            'Number of total people affected by storms',
            'Number of people left homeless from storms',
            'Total economic damages from storms as a share of GDP'
        ],
    'landslides': [
            'Number of deaths from landslides',
            'Number of people injured from landslides',
            'Number of total people affected by landslides',
            'Number of people left homeless from landslides',
            'Total economic damages from landslides as a share of GDP'
        ],
    'wildfires': [
            'Number of deaths from wildfires',
            'Number of people injured from wildfires',
            'Number of total people affected by wildfires',
            'Number of people left homeless from wildfires',
            'Total economic damages from wildfires as a share of GDP'
        ],
    'extreme temperatures': [
            'Number of deaths from extreme temperatures',
            'Number of people injured from extreme temperatures',
            'Number of total people affected by extreme temperatures',
            'Number of people left homeless from extreme temperatures',
            'Total economic damages from extreme temperatures as a share of GDP'
        ],
};



// ----------------------------
// colorScales
// ----------------------------

// Define color scales for each impact type
export const colorScales = {
    // all disasters
	'Number of deaths from disasters': d3.scaleThreshold().domain([1, 10, 100, 1000, 10000, 1000000]).range(['#9EB7BE', '#FCD49E', '#FDBC84', '#FB8D59', '#EE6547', '#D72F1F', '#990000']),
	'Number of people injured from disasters': d3.scaleThreshold().domain([1, 100, 1000, 10000, 100000, 1000000]).range(['#9EB7BE', '#D4B9DA','#C994C7', '#DF65B0', '#E6298A', '#CE1256', '#91003F']),
	'Number of total people affected by disasters': d3.scaleThreshold().domain([1, 1000, 10000, 100000, 1000000, 10000000, 100000000]).range(['#9EB7BE', '#FEE0D2', '#FCBBA1', '#FC9272', '#FB6A49', '#EF3A2C', '#CA181D', '#99000D']),
	'Number of people left homeless from disasters': d3.scaleThreshold().domain([1, 10, 100, 1000, 10000, 100000, 1000000]).range(['#9EB7BE', '#E5F4F8', '#CCECE6', '#9AD8C8', '#66C2A4', '#41AE76', '#228B44','#015824']),
	'Total economic damages from disasters as a share of GDP': d3.scaleThreshold().domain([0.01, 0.05, 0.1, 0.5, 1, 10]).range(['#FEEDDE', '#FDD0A2', '#FCAD6B', '#FD8D3C', '#F06912', '#D94801', '#8C2D04']),

    // droughts
    'Number of deaths from drought': d3.scaleThreshold().domain([1, 100, 1000, 10000, 1000000]).range(['#9EB7BE', '#FCD49E', '#FDBB84', '#FC8D59', '#E34933', '#B30100']),
	'Number of people injured from drought': d3.scaleThreshold().domain([1, 10, 50, 100]).range(['#9EB7BE', '#D7B5D8', '#DF65B0', '#DD1C77', '#980043']),
	'Number of total people affected by drought': d3.scaleThreshold().domain([1, 1000, 10000, 100000, 1000000, 10000000, 100000000]).range(['#9EB7BE', '#FEE0D2', '#FCBBA1', '#FC9272', '#FB6A49', '#EF3A2C', '#CA181D', '#99000D']),
	'Number of people left homeless from drought': d3.scaleThreshold().domain([1, 10, 100, 1000, 10000]).range(['#9EB7BE', '#CCECE6', '#9AD8C8', '#66C2A4', '#2BA25E', '#016C2C']),
	'Total economic damages from drought as a share of GDP': d3.scaleThreshold().domain([0.01, 0.05, 0.1, 0.5, 1, 10]).range(['#FEEDDE', '#FDD0A2', '#FCAD6B', '#FD8D3C', '#F06912', '#D94801', '#8C2D04']),

    // earthquakes
    'Number of deaths from earthquakes': d3.scaleThreshold().domain([1, 100, 1000, 10000]).range(['#9EB7BE', '#FCCC8A', '#FC8D59', '#E34933', '#B30100']),
	'Number of people injured from earthquakes': d3.scaleThreshold().domain([1, 100, 1000, 10000, 100000]).range(['#9EB7BE', '#D4B9DA', '#C994C7', '#DF65B0', '#DD1C77', '#980043']),
	'Number of total people affected by earthquakes': d3.scaleThreshold().domain([1, 100, 1000, 10000, 100000, 1000000, 10000000]).range(['#9EB7BE', '#ECE1F0', '#D0D1E6', '#A5BDDB', '#67A8CF', '#3690C0', '#028189', '#036350']),
	'Number of people left homeless from earthquakes': d3.scaleThreshold().domain([1, 100, 1000, 10000, 100000, 1000000, 10000000]).range(['#9EB7BE', '#FEE6CE', '#FDD0A2', '#FCAD6B', '#FD8D3C', '#F06912', '#D94801', '#8C2D04']),
	'Total economic damages from earthquakes as a share of GDP': d3.scaleThreshold().domain([0.01, 0.05, 0.1, 0.5, 1, 10]).range(['#FEEDDE', '#FDD0A2', '#FCAD6B', '#FD8D3C', '#F06912', '#D94801', '#8C2D04']),

    // volcanoes
    'Number of deaths from volcanic activity': d3.scaleThreshold().domain([1, 10, 100, 1000, 10000]).range(['#9EB7BE', '#FCD49E', '#FDBC84', '#FB8D59', '#E34A33', '#B30200']),
	'Number of people injured from volcanic activity': d3.scaleThreshold().domain([1, 100, 1000, 10000]).range(['#9EB7BE', '#D7B5D9', '#DF64B0', '#DD1C77', '#990043']),
	'Number of total people affected by volcanic activity': d3.scaleThreshold().domain([1, 100, 1000, 10000, 100000, 1000000]).range(['#9EB7BE', '#FCBCA1', '#FC9173', '#FB6A49', '#EF3A2C', '#CA181E', '#99000C']),
	'Number of people left homeless from volcanic activity': d3.scaleThreshold().domain([1, 100, 1000, 10000, 100000]).range(['#9EB7BE', '#CBECE6', '#9BD7C9', '#66C3A5', '#2DA25F', '#006D2D']),
	'Total economic damages from volcanic activity as a share of GDP': d3.scaleThreshold().domain([0.01, 0.05, 0.1, 0.5, 1, 10]).range(['#FEEDDE', '#FDD0A2', '#FCAD6B', '#FD8D3C', '#F06912', '#D94801', '#8C2D04']),

    // floods
    'Number of deaths from floods': d3.scaleThreshold().domain([1, 100, 1000, 10000, 1000000]).range(['#9EB7BE', '#FCD49E', '#FDBC84', '#FB8D59', '#E34A33', '#B30200']),
	'Number of people injured from floods': d3.scaleThreshold().domain([1, 10, 100, 1000, 10000, 100000]).range(['#9EB7BE', '#D5B9DB', '#C994C8', '#DF64B0', '#E7288A', '#CF1255', '#91003F']),
	'Number of total people affected by floods': d3.scaleThreshold().domain([1, 1000, 10000, 100000, 1000000, 10000000, 100000000]).range(['#9EB7BE', '#FEE0D2', '#FCBCA1', '#FC9173', '#FB6A49', '#EF3A2C', '#CA181E', '#99000C']),
	'Number of people left homeless from floods': d3.scaleThreshold().domain([1, 100, 1000, 10000, 100000, 1000000, 10000000]).range(['#9EB7BE', '#E4F5F8', '#CBECE6', '#9BD7C9', '#66C3A5', '#41AE76', '#228B45', '#005823']),
	'Total economic damages from floods as a share of GDP': d3.scaleThreshold().domain([0.01, 0.05, 0.1, 0.5, 1, 10]).range(['#FEEDDE', '#FDD0A2', '#FCAD6B', '#FD8D3C', '#F06912', '#D94801', '#8C2D04']),
    
    // mass movements
    'Number of deaths from mass movements': d3.scaleThreshold().domain([1, 10, 50, 100, 500, 1000, 10000]).range(['#9EB7BE', '#FDE9C9', '#FCD49E', '#FDBC84', '#FB8D59', '#EE6547', '#D72F1F', '#990000']),
	'Number of people injured from mass movements': d3.scaleThreshold().domain([1, 10, 100, 1000]).range(['#9EB7BE', '#D7B5D9', '#DF64B0', '#DD1C77', '#990043']),
	'Number of total people affected by mass movements': d3.scaleThreshold().domain([1, 10, 100, 500, 1000]).range(['#9EB7BE', '#FCBCA1', '#FC9173', '#FB6A49', '#DE2E26', '#A50F16']),
	'Number of people left homeless from mass movements': d3.scaleThreshold().domain([1, 10, 100, 500, 1000]).range(['#9EB7BE', '#CBECE6', '#9BD7C9', '#66C3A5', '#2DA25F', '#006D2D']),
	'Total economic damages from mass movements as a share of GDP': d3.scaleThreshold().domain([0.01, 0.05, 0.1, 0.5, 1, 10]).range(['#FEEDDE', '#FDD0A2', '#FCAD6B', '#FD8D3C', '#F06912', '#D94801', '#8C2D04']),

    // storms
    'Number of deaths from storms': d3.scaleThreshold().domain([1, 10, 100, 1000, 10000, 100000]).range(['#9EB7BE', '#FCD49E', '#FDBC84', '#FB8D59', '#EE6547', '#D72F1F', '#990000']),
	'Number of people injured from storms': d3.scaleThreshold().domain([1, 10, 100, 1000, 10000, 100000]).range(['#9EB7BE', '#D5B9DB', '#C994C8', '#DF64B0', '#E7288A', '#CF1255', '#91003F']),
	'Number of total people affected by storms': d3.scaleThreshold().domain([1, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000]).range(['#9EB7BE', '#FEE0D2', '#FCBBA1', '#FC9272', '#FB6A49', '#EF3A2C', '#CA181D', '#A50E15', '#67000E']),
	'Number of people left homeless from storms': d3.scaleThreshold().domain([1, 100, 1000, 10000, 100000, 1000000, 10000000]).range(['#9EB7BE', '#E5F4F8', '#CCECE6', '#9AD8C8', '#66C2A4', '#41AE76', '#228B44', '#015824']),
	'Total economic damages from storms as a share of GDP': d3.scaleThreshold().domain([0.01, 0.05, 0.1, 0.5, 1, 10]).range(['#FEEDDE', '#FDD0A2', '#FCAD6B', '#FD8D3C', '#F06912', '#D94801', '#8C2D04']),

    // landslides
    'Number of deaths from landslides': d3.scaleThreshold().domain([1, 10, 50, 100, 500, 1000]).range(['#9EB7BE', '#FCD49E', '#FDBC84', '#FB8D59', '#EE6547', '#D72F1F', '#990000']),
	'Number of people injured from landslides': d3.scaleThreshold().domain([1, 10, 100, 1000]).range(['#9EB7BE', '#D7B5D9', '#DF64B0', '#DD1C77', '#990043']),
	'Number of total people affected by landslides': d3.scaleThreshold().domain([1, 10, 100, 1000, 10000, 100000, 1000000]).range(['#9EB7BE', '#FEE0D2', '#FCBBA1', '#FC9272', '#FB6A49', '#EF3A2C', '#CA181D', '#99000D']),
	'Number of people left homeless from landslides': d3.scaleThreshold().domain([1, 10, 100, 1000, 10000, 100000, 1000000]).range(['#9EB7BE', '#E5F4F8', '#CCECE6', '#9AD8C8', '#66C2A4', '#41AE76', '#228B44', '#015824']),
	'Total economic damages from landslides as a share of GDP': d3.scaleThreshold().domain([0.01, 0.05, 0.1, 0.5, 1, 10]).range(['#FEEDDE', '#FDD0A2', '#FCAD6B', '#FD8D3C', '#F06912', '#D94801', '#8C2D04']),

    // wildfires
    'Number of deaths from wildfires': d3.scaleThreshold().domain([1, 10, 50, 100, 500]).range(['#9EB7BE', '#FCD49E', '#FDBC84', '#FB8D59', '#E34A33', '#B30200']),
	'Number of people injured from wildfires': d3.scaleThreshold().domain([1, 10, 100, 1000]).range(['#9EB7BE', '#D7B5D9', '#DF64B0', '#DD1C77', '#990043']),
	'Number of total people affected by wildfires': d3.scaleThreshold().domain([1, 10, 100, 1000, 10000, 100000, 1000000]).range(['#9EB7BE', '#FEE0D2', '#FCBBA1', '#FC9272', '#FB6A49', '#EF3A2C', '#CA181D', '#99000D']),
	'Number of people left homeless from wildfires': d3.scaleThreshold().domain([1, 10, 100, 1000, 10000]).range(['#9EB7BE', '#CCECE6', '#9AD8C8', '#66C2A4', '#2BA25E', '#016C2C']),
	'Total economic damages from wildfires as a share of GDP': d3.scaleThreshold().domain([0.01, 0.05, 0.1, 0.5, 1, 10]).range(['#FEEDDE', '#FDD0A2', '#FCAD6B', '#FD8D3C', '#F06912', '#D94801', '#8C2D04']),

    // extreme temperatures
    'Number of deaths from extreme temperatures': d3.scaleThreshold().domain([1, 10, 50, 100, 500, 1000, 10000]).range(['#9EB7BE', '#FDE9C9', '#FCD49E', '#FDBC84', '#FB8D59', '#EE6547', '#D72F1F', '#990000']),
	'Number of people injured from extreme temperatures': d3.scaleThreshold().domain([1, 10, 100, 1000, 10000, 100000]).range(['#9EB7BE', '#D5B9DB', '#C994C8', '#DF64B0', '#E7288A', '#CF1255', '#91003F']),
	'Number of total people affected by extreme temperatures': d3.scaleThreshold().domain([1, 10, 100, 1000, 10000, 100000, 1000000, 10000000]).range(['#9EB7BE', '#FEE0D2', '#FCBBA1', '#FC9272', '#FB6A49', '#EF3A2C', '#CA181D', '#A50E15', '#67000E']),
	'Number of people left homeless from extreme temperatures': d3.scaleThreshold().domain([1, 10, 100, 1000, 10000, 100000]).range(['#9EB7BE', '#CCECE6', '#9AD8C8', '#66C2A4', '#41AE76', '#228B44', '#015824']),
	'Total economic damages from extreme temperatures as a share of GDP': d3.scaleThreshold().domain([0.01, 0.05, 0.1, 0.5, 1, 10]).range(['#FEEDDE', '#FDD0A2', '#FCAD6B', '#FD8D3C', '#F06912', '#D94801', '#8C2D04'])
};





