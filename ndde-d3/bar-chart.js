import { disasterImpactData, decades } from './utils.js';

// Get all keys from disasterImpactData
let impactTypeKeys = Object.keys(disasterImpactData);

async function loadData(selectedYear, selectedCountry, impactType) {
    let rawData = await d3.csv("./csv/hxl-compliant-natural-disasters-decadal-data.csv");
    let dataForYearAndCountry = rawData.filter(d => +d.Year === selectedYear && d['Country code'] === selectedCountry);

    if (dataForYearAndCountry.length > 0) {
        let data = dataForYearAndCountry[0];

        // Check if any key in disasterImpactData is included in impactType
        let matchingImpactType = impactTypeKeys.find(key => impactType.includes(key));

        if (matchingImpactType && disasterImpactData[matchingImpactType]) {
            return disasterImpactData[matchingImpactType](data);
        } else {
            console.error('Invalid impact type:', impactType);
            return {};
        }
    } else {
        return {};
    }
}



// ----------------------------
// Start of Bar Chart drawing
// ----------------------------

function createChart(disasterData, yAxisLabel) {
    if (!disasterData || disasterData.length === 0) {
        console.error('No data available to create the chart.');
        return; // Exit the function if no data is available
    }

    // Clear any existing chart
    const chartContainer = document.getElementById('barChart');
    chartContainer.innerHTML = '';

    const width = 928;
    const height = 600;
    const marginTop = 60;
    const marginRight = 10;
    const marginBottom = 20;
    const marginLeft = 50;


    // Convert object to array of objects for charting
    let chartData = Object.keys(disasterData).map(disasterType => ({
        disasterType: disasterType,
        disasterValue: disasterData[disasterType]
    }));

    // Log the chartData to the console to check the values
    console.log("Chart Data:", chartData);

    // Prepare the scales for positional and color encodings.
    const x = d3.scaleBand()
        .domain(chartData.map(d => d.disasterType))
        .rangeRound([marginLeft, width - marginRight])
        .paddingInner(0.1);

    const color = d3.scaleOrdinal()
        .domain(chartData.map(d => d.disasterType))
        .range(d3.schemeSpectral[chartData.length])
        .unknown("#ccc");

    const maxValue = d3.max(chartData, d => d.disasterValue);
    const yDomain = maxValue > 1 ? [0, maxValue * 1.1] : [0, 1]; // Adjusts the upper limit based on the max value
    let y;

    if (maxValue < 1 && maxValue !== 0) {
        y = d3.scaleLinear()
        .domain(yDomain)
        .rangeRound([height - marginBottom, marginTop]);
    } else {
        y = d3.scaleLinear()
        .domain([0, d3.max(chartData, d => d.disasterValue) * 1.1])
        .rangeRound([height - marginBottom, marginTop]);
    }
    


    // Create the SVG container.
    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto;");
    
    // Select the tooltip element
    const tooltip = d3.select("#barChartTooltip");

    // Append a rect for each disaster type.
    svg.append("g")
        .selectAll("rect")
        .data(chartData)
        .join("rect")
            .attr("x", d => x(d.disasterType))
            .attr("y", d => y(d.disasterValue))
            .attr("width", x.bandwidth())
            .attr("height", d => height - marginBottom - y(d.disasterValue))
            .attr("fill", d => color(d.disasterType))
            .on("mouseover", function(d) {
                tooltip.style("opacity", 1)
                       .html(`${d.disasterType}: ${d.disasterValue.toLocaleString()}`)
                       .style("left", (d3.event.pageX) + "px")
                       .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function() {
                tooltip.style("opacity", 0);
            });

    // Append the horizontal axis.
    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0));

    // Append the vertical axis.
    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y).ticks(null, "s"));
    
    // Append the y-axis label
    svg.append("text")
        .attr("x", marginLeft - 40)
        .attr("y", marginTop - 30)
        .style("text-anchor", "start")
        .style("fill", "#4c4c4c")
        .text(yAxisLabel) // Dynamic label text

    // Append the SVG to the bar chart container
    document.getElementById('barChart').appendChild(svg.node());
}



// ----------------------------
// Draw Empty Chart
// ----------------------------

function createEmptyChart() {
    // Clear any existing chart
    const chartContainer = document.getElementById('barChart');
    chartContainer.innerHTML = '';

    const width = 928;
    const height = 600;
    const marginTop = 60;
    const marginRight = 10;
    const marginBottom = 20;
    const marginLeft = 60;

    // Default categories for the x-axis
    const defaultCategories = [
        "All disasters", "Droughts", "Earthquakes", "Volcanoes", "Floods",
        "Mass movements (dry)", "Storms", "Landslides", "Wildfires", "Extreme temperatures"
    ];

    // Prepare the scales for positional encodings.
    const x = d3.scaleBand()
        .domain(defaultCategories)
        .rangeRound([marginLeft, width - marginRight])
        .paddingInner(0.1);

    const y = d3.scaleLinear()
        .domain([0, 100]) // Placeholder domain for y-axis
        .rangeRound([height - marginBottom, marginTop]);

    // Create the SVG container.
    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto;");

    // Append the horizontal axis with default categories.
    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0));

    // Append the vertical axis.
    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y).ticks(null, "s"));
    
    // Append the y-axis label
    svg.append("text")
        .attr("x", marginLeft - 40)
        .attr("y", marginTop - 30)
        .style("text-anchor", "start")
        .style("fill", "#4c4c4c")
        .text("NO COUNTRY SELECTED");

    // Append the SVG to the chart container
    document.getElementById('barChart').appendChild(svg.node());
}

// Call function when the page loads
createEmptyChart();



// ----------------------------
// Event Listeners
// ----------------------------

// Function to handle all related events and update the chart
function updateChart() {
    let selectedYear = +document.getElementById('yearSlider').value; // or 'yearInput'
    let selectedCountry = document.getElementById('countrySelector').value;
    let selectedImpactType = document.getElementById('impactSelect').value;
    let selectedCountryName = document.getElementById('countrySelector').options[document.getElementById('countrySelector').selectedIndex].textContent;

    if (selectedCountry && selectedImpactType) {
        loadData(selectedYear, selectedCountry, selectedImpactType).then(disasterData => {
            let matchingImpactType = impactTypeKeys.find(key => selectedImpactType.includes(key));
            matchingImpactType = matchingImpactType.toUpperCase()
            let yAxisLabel = matchingImpactType + " (" + selectedCountryName + ", " + selectedYear + ")";

            createChart(disasterData, yAxisLabel);
        });
    }
}

// Event Listener for Country Selector
document.getElementById('countrySelector').addEventListener('change', updateChart);

// Event Listener for Year Input
document.getElementById('yearInput').addEventListener('input', updateChart);

// Event Listener for Year Slider
document.getElementById('yearSlider').addEventListener('input', updateChart);

// Event Listener for Impact Type Selector
document.getElementById('impactSelect').addEventListener('change', updateChart);

// Event Listener for Clear Button
document.getElementById('clearButton').addEventListener('click', createEmptyChart)



// ----------------------------
// Time-Lapse Control
// ----------------------------

// Function to update the chart for a given year
function updateChartForYear(year) {
    let selectedYear = +document.getElementById('yearSlider').value; // or 'yearInput'
    let selectedCountry = document.getElementById('countrySelector').value;
    let selectedImpactType = document.getElementById('impactSelect').value;
    let selectedCountryName = document.getElementById('countrySelector').options[document.getElementById('countrySelector').selectedIndex].textContent;

    if (selectedCountry && selectedImpactType) {
        loadData(year, selectedCountry, selectedImpactType).then(disasterData => {
            let matchingImpactType = impactTypeKeys.find(key => selectedImpactType.includes(key));
            matchingImpactType = matchingImpactType.toUpperCase()
            let yAxisLabel = matchingImpactType + " (" + selectedCountryName + ", " + selectedYear + ")";
    
            createChart(disasterData, yAxisLabel);
        });
    }
}

// Button click handler to play the time-lapse
document.getElementById('playTimeLapseButton').addEventListener('click', function() {
    let index = 0; // Start from the first year

    const interval = setInterval(() => {
        updateChartForYear(decades[index]); // Update the chart with the current year

        index++; // Move to the next year

        // If end of the decades array is reached, clear the interval
        if (index >= decades.length) {
            clearInterval(interval);
        }
    }, 750);
});
