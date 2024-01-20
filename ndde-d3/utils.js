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





