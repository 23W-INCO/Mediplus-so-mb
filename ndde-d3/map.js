// initial setup
const svg = d3.select("svg"),
	width = svg.attr("width"),
	height = svg.attr("height"),
	path = d3.geoPath(),
	data = d3.map(),
	GeoJSONUrl = "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson",
	disastersdata = "natural-disasters-decadal.csv";

let centered, world, worldmap;

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

// Assign worldmap based on GeoJSONUrl status (improves Fault-Tolerance)
if (checkUrlStatus(GeoJSONUrl) === "200") {
	worldmap = GeoJSONUrl;
} else {
	worldmap = "world.geojson";
}

// Array of years (decades) computed using create_decades_array() function in ./data-sanitizer.py
const decades = [1900, 1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020]; 
// Year declaration (default: latest decade)
let year = decades[decades.length - 1];

// Variable to hold the currently selected impact data (default)
let selectedImpact = 'Number of deaths from disasters';

// style of geographic projection and scaling
const projection = d3.geoRobinson()
	.scale(130)
	.translate([width / 2, height / 2]);

// Object to hold the mapping of disaster types to their respective impacts
const disasterImpactMap = {
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

// Function to update impact selections based on the disaster type
function updateImpactOptions(disasterType, currentSelectedImpactIndex) {
    const impacts = disasterImpactMap[disasterType];
    const impactSelect = document.getElementById('impactSelect');
    impactSelect.innerHTML = ''; // Clear existing options

    // Populate the dropdown with the new disaster's impacts
    impacts.forEach((impact, index) => {
        const option = document.createElement('option');
        option.value = impact;
        option.textContent = impact;
        impactSelect.appendChild(option);
    });

    // If the current selected index is within the new disaster's impact array, select it
    if (currentSelectedImpactIndex < impacts.length) {
        impactSelect.selectedIndex = currentSelectedImpactIndex;
    } else {
        // If not, default to the first one
        impactSelect.selectedIndex = 0;
    }

    // Trigger the update of the visualization
    loadAndDisplayData(year, impacts[impactSelect.selectedIndex]);
}

// Event listener for disaster type selection change
document.getElementById('disasterTypeSelect').addEventListener('change', function() {
    // Get the current selected index from the impactSelect dropdown
    const currentSelectedImpactIndex = document.getElementById('impactSelect').selectedIndex;
    // Update impact options based on the selected disaster type and the current selected impact index
    updateImpactOptions(this.value, currentSelectedImpactIndex);
});

// Event listener for impact selection change
document.getElementById('impactSelect').addEventListener('change', function() {
    selectedImpact = this.value;
    loadAndDisplayData(year, selectedImpact);
});

// Initial population of impact options
updateImpactOptions('all disasters'); // Default to 'all disasters'

// Define color scales for each impact type
const colorScales = {
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

// add tooltip
const tooltip = d3.select("body").append("div")
	.attr("class", "tooltip")
	.style("opacity", 0);

// Add clickable background
svg.append("rect")
  .attr("class", "background")
	.attr("width", width)
	.attr("height", height)
	.on("click", click);

// Load external data and boot
function loadAndDisplayData(selectedYear, currentSelectedImpact) {
    data.clear(); // Clear the previous data
    d3.queue()
        .defer(d3.json, worldmap)
        .defer(d3.csv, disastersdata, function(d) {
            if(d.Year == selectedYear) {
                // Use the selected impact data for the visualization
                data.set(d['Country code'], +d[currentSelectedImpact]);
            }
        })
        .await(ready);
}

// Initial map load with default values
loadAndDisplayData(year, selectedImpact);

// Update map based on year input change
document.getElementById('yearInput').addEventListener('change', function() {
	year = parseInt(document.getElementById('yearInput').value);
	document.getElementById('yearSlider').value = year; // Update the year slider
	let revertToYear;

	function revertAction() {
		alert('Please enter a valid decade within the range 1900, 1910 ... 2000, 2010, 2020.');
		document.getElementById('yearInput').value = revertToYear;
		loadAndDisplayData(revertToYear, selectedImpact);
	}
	
	if (decades.includes(year)) {
		loadAndDisplayData(year, selectedImpact);
	} else if (year < decades[0]) {
		revertToYear = decades[0];
		revertAction();	// revert to the highest decade if decade entered is lower than last decade
	} else if (year > decades[decades.length - 1]) {
		revertToYear = decades[decades.length - 1];
		revertAction();	// revert to the highest decade if decade entered is lower than last decade
	} else {
		for (let i = 0; i < decades.length - 1; i++) {
			if (year >= decades[i] && year <= decades[i + 1]) {
			  // Check which decade is closer and revert to it
			  if (year - decades[i] <= decades[i + 1] - year) {
				revertToYear = decades[i];
				revertAction();
			  } else {
				revertToYear = decades[i + 1];
				revertAction();
			  }
			}
		}
	}
});

// Update map based on year slider change
document.getElementById('yearSlider').addEventListener('input', function() {
    year = parseInt(this.value);
    document.getElementById('yearInput').value = year; // Update the number input
    loadAndDisplayData(year, selectedImpact);
});

// Declare world variable
world = svg.append("g")
.attr("class", "world");


// Time Lapse control
let timeLapseInterval;
const timeLapseDelay = 750; // Delay in milliseconds for time lapse
let timeLapseStoppedByUser = false; // Flag to track if time lapse was stopped by the user
let currentTimeLapseYearIndex = 0; // Variable to store the current year index of the time lapse

// Function to update the map for a given year
function updateTimeLapse(yearIndex) {
    if (yearIndex >= decades.length) {
        stopTimeLapse();
        return;
    }

    const year = decades[yearIndex];
    document.getElementById('yearInput').value = year;
	document.getElementById('yearSlider').value = year;
    loadAndDisplayData(year, selectedImpact);

    // Set the next update if the current year is not the last one
    timeLapseInterval = setTimeout(() => {
        updateTimeLapse(yearIndex + 1);
    }, timeLapseDelay);

    // Update the current time lapse year index
    currentTimeLapseYearIndex = yearIndex;
}

// Function to toggle between Play and Pause
function toggleTimeLapse() {
    const button = document.getElementById('playTimeLapseButton');
    if (button.textContent === 'Play Time-Lapse') {
        // If the current time lapse year index is at the end, start from the beginning
        if (currentTimeLapseYearIndex >= decades.length) {
            currentTimeLapseYearIndex = 0;
        }
        button.textContent = 'Pause Time-Lapse';
        updateTimeLapse(currentTimeLapseYearIndex);
    } else {
        // Pause the time lapse
        button.textContent = 'Play Time-Lapse';
        clearTimeout(timeLapseInterval);
        timeLapseStoppedByUser = true;
    }
}

// Stop the Time lapse
function stopTimeLapse() {
    clearTimeout(timeLapseInterval);
    timeLapseStoppedByUser = true; // Set the flag to indicate user manual stop
    document.getElementById('playTimeLapseButton').textContent = 'Play Time-Lapse';
    currentTimeLapseYearIndex = 0; // Reset the year index
}

// Function to handle double click and reset to the latest year
function resetToLatestYear() {
	clearTimeout(timeLapseInterval); // Stop any ongoing time lapse
    currentTimeLapseYearIndex = decades.length - 1; // Set to last index of decades
    updateTimeLapse(currentTimeLapseYearIndex);
    document.getElementById('playTimeLapseButton').textContent = 'Play Time-Lapse';
    timeLapseStoppedByUser = true; // Indicate that the reset was user-initiated
}

// Attach event listeners
document.addEventListener('DOMContentLoaded', function() {
    const playTimeLapseButton = document.getElementById('playTimeLapseButton');

    // Set initial text for the button
    playTimeLapseButton.textContent = 'Play Time-Lapse';

    // Event listener for single click to the Play/Pause button
    playTimeLapseButton.addEventListener('click', toggleTimeLapse);

    // Event listener for double click to reset to the latest year
    playTimeLapseButton.addEventListener('dblclick', resetToLatestYear);
});



// ----------------------------
//Start of Choropleth drawing
// ----------------------------

function ready(error, topo) {
	// topo is the data received from the d3.queue function (the world.geojson)
	if (error) throw error;

	// Clear previous map paths (if any)
    world.selectAll("path").remove();

	// Determine the correct impactText based on selectedImpact
	let impactText = "";

	if (selectedImpact.includes("deaths")) {
		impactText = "deaths";
	} else if (selectedImpact.includes("injured")) {
		impactText = "injured";
	} else if (selectedImpact.includes("affected")) {
		impactText = "affected";
	} else if (selectedImpact.includes("homeless")) {
		impactText = "homeless";
	} else if (selectedImpact.includes("economic")) {
		impactText = "%";
	}

	let mouseOver = function(d) {
		d3.selectAll(".Country")
			.transition()
			.duration(200)
			.style("opacity", .5)
			.style("stroke", "transparent");
		d3.select(this)
			.transition()
			.duration(200)
			.style("opacity", 1)
			.style("stroke", "black");

		let rawValue = data.get(d.id);

		// Formatting the number (for GDP percentages)
		let displayText = "";

		if (impactText === "%") {
			if (rawValue === 0 || rawValue === undefined || rawValue === null) {
				displayText = d.properties.name + ': 0' + impactText;
			} else if (rawValue > 0 && rawValue < 0.01) {
				displayText = d.properties.name + ': < 0.01' + impactText;
			} else {
				displayText = d.properties.name + ': ' + rawValue.toFixed(2) + impactText;
			}
		} else if (impactText === "deaths") {
			if (rawValue === 0 || rawValue === undefined || rawValue === null) {
				displayText = d.properties.name + ': 0 ' + impactText.slice(0, -1);
			} else if (rawValue > 0 && rawValue < 1) {
				displayText = d.properties.name + ': < 1 ' + impactText.slice(0, -1);
			} else if (Math.round(rawValue) === 1) {
				displayText = d.properties.name + ': 1 ' + impactText.slice(0, -1);
			}
			else {
				displayText = d.properties.name + ': ' + (Math.round(rawValue)).toLocaleString() + ' ' + impactText;
			}
		} else {
			if (rawValue === 0 || rawValue === undefined || rawValue === null) {
				displayText = d.properties.name + ': 0 ' + impactText;
			} else if (rawValue > 0 && rawValue < 1) {
				displayText = d.properties.name + ': < 1 ' + impactText;
			} else if (Math.round(rawValue) === 1) {
				displayText = d.properties.name + ': 1 ' + impactText;
			}
			else {
				displayText = d.properties.name + ': ' + (Math.round(rawValue)).toLocaleString() + ' ' + impactText;
			}
		}

		tooltip.style("left", (d3.event.pageX + 15) + "px")
				.style("top", (d3.event.pageY - 28) + "px")
				.transition().duration(400)
				.style("opacity", 1)
				.text(displayText); // Text displayed for selectedImpact
	}

	let mouseLeave = function() {
		d3.selectAll(".Country")
			.transition()
			.duration(200)
			.style("opacity", 1)
			.style("stroke", "transparent");
		tooltip.transition().duration(300)
			.style("opacity", 0);
	}

	// Draw the map
	world.selectAll("path")
		.data(topo.features)
		.enter()
		.append("path")
		// draw each country
		// d3.geoPath() is a built-in function of d3 v4 and takes care of showing the map from a properly formatted geojson file, if necessary filtering it through a predefined geographic projection
		.attr("d", d3.geoPath().projection(projection))

		//retrieve the name of the country from data
		.attr("data-name", function(d) {
			return d.properties.name
		})

		// set the color of each country
		.attr("fill", function(d) {
			let value = data.get(d.id) || 0;
			return colorScales[selectedImpact](value);
		})

		// add a class, styling and mouseover/mouseleave and click functions
		.style("stroke", "transparent")
		.attr("class", function(d) {
			return "Country"
		})
		.attr("id", function(d) {
			return d.id
		})
		.style("opacity", 1)
		.on("mouseover", mouseOver)
		.on("mouseleave", mouseLeave)
		.on("click", click);
  
	// Legend
	const x = d3.scaleLinear()
	.domain([2.6, 75.1])
	.rangeRound([600, 860]);

	// Update the legend based on the current color scale
	function updateLegend(currentScale) {
	// Clear any existing legend before drawing a new one
	svg.select("#legend").remove();

	// Assume the first color in the range is for zero occurrences
	let zeroColor = '#9EB7BE';
	let extendedDomain = [0].concat(currentScale.domain());
	let extendedRange = [zeroColor].concat(currentScale.range());

	// Use the extended domain and range for creating the legend
	const legendScale = d3.scaleThreshold()
		.domain(extendedDomain)
		.range(extendedRange);

	// Draw a new legend based on the updated color scale
	const legend = svg.append("g")
		.attr("id", "legend");

	const legend_entry = legend.selectAll("g.legend_entry")
		.data(legendScale.range().map(function(color) {
			const d = legendScale.invertExtent(color);
			if (d[0] == null) d[0] = legendScale.domain()[0];
			if (d[1] == null) d[1] = legendScale.domain()[1];
			return d;
		}))
		.enter().append("g")
		.attr("class", "legend_entry");

	const ls_w = 20,
		ls_h = 20;

	legend_entry.append("rect")
		.attr("x", 0)
		.attr("y", function(d, i) {
			return height - (i * ls_h) - 2 * ls_h;
		})
		.attr("width", ls_w)
		.attr("height", ls_h)
		.style("fill", function(d) {
			return legendScale(d[0]);
		})
		.style("opacity", 0.8);

	function formatNumberForLegend(d) {
		let value = +d;
		if (value >= 1e9) {
			return (value / 1e9) + " billion";
		} else if (value >= 1e6) {
			return (value / 1e6) + " million";
		} else if (value >= 1e3) {
			return value.toLocaleString();
		}
		return value.toString(); // return as is for values less than a thousand
	}

	if (selectedImpact.includes('economic')) {
		legend_entry.append("text")
			.attr("x", 30)
			.attr("y", function(d, i) {
				return height - (i * ls_h) - ls_h - 6;
			})
			.text(function(d, i) {
				let formattedLower = formatNumberForLegend(d[0]);
				let formattedUpper = formatNumberForLegend(d[1]);

				if (i === 0) return formattedUpper + impactText;
				if (d[0] === 0) {
					return "< 0.01" + impactText; // for lower decimal values
				};
				return formattedLower + " - " + formattedUpper + impactText;
			});
	} else {
		legend_entry.append("text")
			.attr("x", 30)
			.attr("y", function(d, i) {
				return height - (i * ls_h) - ls_h - 6;
			})
			.text(function(d, i) {
				let formattedLower = formatNumberForLegend(d[0]);
				let formattedUpper = formatNumberForLegend(d[1]);

				if (i === 0) { // for legend '0'
					if (selectedImpact.includes('deaths')) {
						return formattedUpper + " " + impactText.slice(0, -1);
					} else {
						return formattedUpper + " " + impactText;
					}
				}
				if (d[0] === 0) { // for legend '0 - 1'
					if (selectedImpact.includes('deaths')) {
						return "< 1 " + impactText.slice(0, -1);
					} else {
						return "< 1 " + impactText;
					}
				}
				if (d[1] < d[0]) return "over " + formattedLower + " " + impactText;
				return formattedLower + " - " + formattedUpper + " " + impactText;
			});
	}

	legend.append("text")
		.attr("x", 0)
		.attr("y", function(d, i) {
			return height - (i * ls_h) - 2.5; // Note to self: to place above --> ´ .attr("y", 300) ´; // adjust to fit
		})
		.text(document.getElementById('impactSelect').value);
	}

	// Call updateLegend function with the correct scale after map is drawn
	updateLegend(colorScales[selectedImpact]);
}



// -----------------------------------
//Start of Zoom Behaviour Definition
// -----------------------------------

// Define the zoom behavior
const zoom = d3.zoom()
    .scaleExtent([1, 4]) // This controls the zoom levels (min, max)
    .on('zoom', zoomed);

// Apply the zoom behavior to the SVG
svg.call(zoom);

function zoomed() {
    // 'd3.event.transform' contains the information about the zoom and pan event. It includes the current translation (x and y) and the current scale (k)
    const { x, y, k } = d3.event.transform;

    // Apply the transformation to the world group
    world.attr('transform', d3.event.transform);

    // Adjust the stroke width based on the zoom level to keep the map borders visually consistent
    world.selectAll('path').style('stroke-width', 1 / k);
}

// Define the click behaviour
function click(d) {
	var x, y, k;
  
	if (d && centered !== d) {
	  var centroid = path.centroid(d);
	  x = -(centroid[0] * 6);
	  y = (centroid[1] * 6);
	  k = 3;
	  centered = d;
	} else {
	  x = 0;
	  y = 0;
	  k = 1;
	  centered = null;
	}
  
	world.selectAll("path")
		.classed("active", centered && function(d) { return d === centered; });
  
	world.transition()
		.duration(750)
		.attr("transform", "translate(" + x + "," + y + ") scale(" + k + ")" );
}

// Zoom to contienent
const continents = {
    'World': { scale: 1, coordinates: [450, 250] },
    'Africa': { scale: 2.3, coordinates: [240, 100] },
    'North America': { scale: 2.5, coordinates: [-60, -15] },
    'South America': { scale: 2.5, coordinates: [50, 150] },
    'Asia': { scale: 2.4, coordinates: [350, 50] },
    'Europe': { scale: 4, coordinates: [150, -60] },
    'Oceania': { scale: 3, coordinates: [450, 150] }
};

document.getElementById('continentSelect').addEventListener('change', function() {
    zoomToContinent(this.value);
});

function zoomToContinent(continent) {
    const { scale, coordinates } = continents[continent];
    const [x, y] = coordinates;

    // Calculate the transformation needed to zoom and center the continent
    const transform = d3.zoomIdentity
        .translate(svg.attr('width') / 2, svg.attr('height') / 2)
        .scale(scale)
        .translate(-x, -y);

    svg.transition()
        .duration(750)
        .call(zoom.transform, transform);
}
