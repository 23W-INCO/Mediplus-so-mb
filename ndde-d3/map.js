// ----------------------------
// Initial Setup
// ----------------------------

// Import utitlities (functions and variables) from utils.js
import { 	worldmap,
	continents,
	countriesInContinents,
	decades,
	disasterImpactMap,
	colorScales
} from './utils.js';

// Global Variables
const svg = d3.select("svg"),
width = svg.attr("width"),
height = svg.attr("height"),
path = d3.geoPath(),
data = d3.map(),
disastersdata = "./csv/hxl-compliant-natural-disasters-decadal-data.csv";

// Year declaration (default: latest decade)
let year = decades[decades.length - 1];

// Variable to hold the currently selected impact data (default)
let selectedImpact = 'Number of deaths from disasters';

// style of geographic projection and scaling
const projection = d3.geoRobinson()
.scale(130)
.translate([width / 2, height / 2]);

// Add tooltip
const tooltip = d3.select("body").append("div")
.attr("class", "tooltip")
.style("opacity", 0);

// Add clickable background
svg.append("rect")
.attr("class", "background")
.attr("width", width)
.attr("height", height)
.on("click", click);



// ----------------------------
// Function Declarations
// ----------------------------

// Function to Update impact selections based on the disaster type
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
updateDisplayMessage();
}

// Invoke Function for Initial population of impact options
updateImpactOptions('all disasters'); // Default to 'all disasters'


// Function to Load external data and boot
function loadAndDisplayData(selectedYear, currentSelectedImpact) {
data.clear(); // Clear the previous data

// Load both JSON and CSV files using Promises
Promise.all([
d3.json(worldmap),
d3.csv(disastersdata)
]).then(function(files) {
const [worldData, disastersData] = files;

// Process your data
disastersData.forEach(d => {
	if (d.Year == selectedYear) {
		// Use the selected impact data for the visualization
		data.set(d['Country code'], +d[currentSelectedImpact]);
	}
});

// Call the ready function with the loaded data
ready(null, worldData); // Pass 'null' as the error argument since Promise.all() would have rejected in case of an error
updateDisplayMessage();
}).catch(function(error) {
console.error('Error loading the data: ', error);
});
}

// Invoke Function for Initial map load with default values
loadAndDisplayData(year, selectedImpact);


// Function to construct and update the display message
function updateDisplayMessage() {
const selectedImpact = document.getElementById('impactSelect').value;
const selectedYear = year;
const countrySelector = document.getElementById("countrySelector");
const selectedCountryCode = countrySelector.value;
const selectedCountryLabel = countrySelector.options[countrySelector.selectedIndex].label || "";

// Exit the function if no country is selected or if it is the placeholder value
if (!selectedCountryCode || selectedCountryCode.trim() === "") {
document.getElementById('displayMessage').innerHTML = '';
return;
}

// Fetch the data for the selected country from your JSON file
d3.json('./json/hxl-compliant-natural-disasters-decadal-data.json').then(function(data) {
// Find the data for the selected country and year
const countryData = data.find(item => item['Country code'] === selectedCountryCode && item.Year == selectedYear);

let value = "Unknown";
if (countryData && countryData[selectedImpact]) {
	value = Math.round(countryData[selectedImpact]).toLocaleString();
}

// Convert a string to title case
const toTitleCase = (str) => str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

let message;

if (selectedImpact.includes("economic")) {
	message = `<strong>${selectedImpact}</strong> in ${selectedCountryLabel} between ${selectedYear - 10} and ${selectedYear} was <strong>${value}</strong>`;
} else {
	const capitalizedImpact = toTitleCase(selectedImpact);
	message = `<strong>Total ${capitalizedImpact}</strong> in ${selectedCountryLabel} between ${selectedYear - 10} and ${selectedYear} was <strong>${value}</strong>`;
}

const displayMessageDiv = document.getElementById('displayMessage');
displayMessageDiv.innerHTML = message;

// Show the clear button
const clearButton = document.getElementById('clearButton');
clearButton.style.display = 'inline';
});
}



// ----------------------------
// Time Lapse Control
// ----------------------------

let timeLapseInterval;
const timeLapseDelay = 750; // Delay in milliseconds for time lapse
let timeLapseStoppedByUser = false; // Flag to track if time lapse was stopped by the user
let currentTimeLapseYearIndex = 0; // Variable to store the current year index of the time lapse

// Function to Update the map for a given year
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

// Function to Toggle between Play and Pause
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

// Function to Stop the Time lapse
function stopTimeLapse() {
clearTimeout(timeLapseInterval);
timeLapseStoppedByUser = true; // Set the flag to indicate user manual stop
document.getElementById('playTimeLapseButton').textContent = 'Play Time-Lapse';
currentTimeLapseYearIndex = 0; // Reset the year index
}

// Function to Handle double click and reset to the latest year
function resetToLatestYear() {
clearTimeout(timeLapseInterval); // Stop any ongoing time lapse
currentTimeLapseYearIndex = decades.length - 1; // Set to last index of decades
updateTimeLapse(currentTimeLapseYearIndex);
document.getElementById('playTimeLapseButton').textContent = 'Play Time-Lapse';
timeLapseStoppedByUser = true; // Indicate that the reset was user-initiated
}



// ----------------------------
// Event Listeners
// ----------------------------

// Event listener for disaster type selection change
document.getElementById('disasterTypeSelect').addEventListener('change', function() {
// Get the current selected index from the impactSelect dropdown
const currentSelectedImpactIndex = document.getElementById('impactSelect').selectedIndex;
// Update impact options based on the selected disaster type and the current selected impact index
updateImpactOptions(this.value, currentSelectedImpactIndex);
updateDisplayMessage();
});


// Event listener for impact selection change
document.getElementById('impactSelect').addEventListener('change', function() {
selectedImpact = this.value;
loadAndDisplayData(year, selectedImpact);
updateDisplayMessage();
});


// Event Listener to Update map based on year input change
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

updateDisplayMessage();
});


// Event Listener to Update map based on year slider change
document.getElementById('yearSlider').addEventListener('input', function() {
year = parseInt(this.value);
document.getElementById('yearInput').value = year; // Update the number input
loadAndDisplayData(year, selectedImpact);
updateDisplayMessage();
});


// Event Listener for playTimeLapseButton functionalities
document.addEventListener('DOMContentLoaded', function() {
const playTimeLapseButton = document.getElementById('playTimeLapseButton');

// Set initial text for the button
playTimeLapseButton.textContent = 'Play Time-Lapse';

// Event listener for single click to the Play/Pause button
playTimeLapseButton.addEventListener('click', toggleTimeLapse);

// Event listener for double click to reset to the latest year
playTimeLapseButton.addEventListener('dblclick', resetToLatestYear);
});


// Event listener for country selection change
document.getElementById('countrySelector').addEventListener('change', function() {
updateDisplayMessage(this.value);
});


// Add an event listener to the "x" button
document.getElementById('clearButton').addEventListener('click', function() {
// Clear the display message
const displayMessageDiv = document.getElementById('displayMessage');
displayMessageDiv.innerHTML = '';

// Reset the dropdown to "Select Country"
const countrySelector = document.getElementById('countrySelector');
countrySelector.selectedIndex = 0;

// Hide the clear button
this.style.display = 'none';
});


// -------------------------------
// Declare the ``world´´ variable
// -------------------------------

const world = svg.append("g")
		.attr("class", "world");



// ----------------------------
// Start of Choropleth drawing
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
// Start of Zoom Behaviour Definition
// -----------------------------------

// Define the zoom behavior
const zoom = d3.zoom()
.scaleExtent([1, 4]) // This controls the zoom levels (min, max)
.on('zoom', zoomed);

// Apply the zoom behavior to the SVG
svg.call(zoom);

function zoomed() {
// 'd3.event.transform' contains the information about the zoom and pan event
// It includes the current translation (x and y) and the current scale (k)
const { x, y, k } = d3.event.transform;

// Apply the transformation to the world group
world.attr('transform', d3.event.transform);

// Adjust the stroke width based on the zoom level to keep the map borders visually consistent
world.selectAll('path').style('stroke-width', 1 / k);
}


// Define the click behaviour
let centered;

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


// Zoom to Country's Continent
function zoomToCountryContinent(countryCode) {
// Find the continent that contains the selected country code
let continent;
for (const key in countriesInContinents) {
if (countriesInContinents[key].some(country => country.code === countryCode)) {
	continent = key;
	break;
}
}

if (continent) {
// Zoom to the continent
zoomToContinent(continent);

// Update the continentSelect dropdown to select the corresponding continent option
document.getElementById('continentSelect').value = continent;
}
}


// Event Listener for the select element when the page loads
document.addEventListener('DOMContentLoaded', function() {
const countrySelect = document.getElementById('countrySelector');
const clearButton = document.getElementById('clearButton');

// Event listener for the "change" event
countrySelect.addEventListener('change', function() {
if (this.value) {
	// If a country is selected, zoom to it
	zoomToCountryContinent(this.value);
} else {
	// If the selection is cleared, zoom to "World"
	zoomToWorld();
}
});

// Event listener for the "click" event on the clear button
clearButton.addEventListener('click', function() {
// Clear the selection in the country select element
countrySelect.selectedIndex = 0;
// Zoom back to "World"
zoomToWorld();
// Update the continentSelect dropdown to select the corresponding continent option
document.getElementById('continentSelect').value = 'World';
});

// Handle the initial value (when the page loads)
if (countrySelect.selectedIndex === 0) {
zoomToWorld(); // Call the zoomToWorld function when the default option is selected
}
});


// Function to zoom back to "World"
function zoomToWorld() {
zoomToContinent('World')
}
