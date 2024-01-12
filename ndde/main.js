google.charts.load('current', {
    'packages': ['geochart'],
});

let currentYear = "(Year)"; // Default value
let playInterval;
const decades = [1900, 1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020];
let selectedDecade = decades[decades.length - 1]; // Default to the latest decade if no input

const colorConfigurations = {
    'Number of deaths from disasters': {
        colors: ['#9EB7BE', '#FCD49E', '#FDBC84', '#FB8D59', '#EE6547', '#D72F1F', '#990000'],
        values: [0, 1, 10, 100, 1000, 10000, 1000000],
        labels: ['0 - 1', '1 - 10', '10 - 100', '100 - 1,000', '1,000 - 10,000', '10,000 - 1 Million', '1 million - 10 million']
    },
    'Number of people injured from disasters': {
        colors: ['#9EB7BE', '#D4B9DA','#C994C7', '#DF65B0', '#E6298A', '#CE1256', '#91003F'],
        values: [0, 1, 100, 1000, 10000, 100000, 1000000],
        labels: ['0 - 1', '1 - 100', '100 - 1,000', '1,000 - 10,000', '10,000 - 100,000', '100,000 - 1 million', '1 million - 10 million']
    },
    'Number of total people affected by disasters': {
        colors: ['#9EB7BE', '#FEE0D2', '#FCBBA1', '#FC9272', '#FB6A49', '#EF3A2C', '#CA181D', '#99000D'],
        values: [0, 1, 1000, 10000, 100000, 1000000, 10000000, 100000000],
        labels: ['0 - 1', '1 - 1,000', '1,000 - 10,000', '10,000 - 100,000', '100,000 - 1 million', '1 million - 10 million', '10 million - 100 million', '100 million - 1 billion']
    },
    'Number of people left homeless from disasters': {
        colors: ['#9EB7BE', '#E5F4F8', '#CCECE6', '#9AD8C8', '#66C2A4', '#41AE76', '#228B44','#015824'],
        values: [0, 1, 10, 100, 1000, 10000, 100000, 1000000],
        labels: ['0 - 1', '1 - 10', '10 - 100', '100 - 1,000', '1,000 - 10,000', '10,000 - 100,000', '100,000 - 1 million', '1 million - 10 million']
    },
    'Total economic damages from disasters as a share of GDP': {
        colors: ['#FEEDDE', '#FDD0A2', '#FCAD6B', '#FD8D3C', '#F06912', '#D94801', '#8C2D04'],
        values: [0, 0.0001, 0.0005, 0.001, 0.005, 0.01, 0.1],
        labels: ['0 - 0.01%', '0.01 - 0.05%', '0.05 - 0.1%', '0.1 - 0.5%', '0.5 - 1.0%', '1 - 10%', '10 - 50%']
    },
};

const impactLabelMap = {
    'Number of deaths from disasters': 'Deaths',
    'Number of people injured from disasters': 'Injured',
    'Number of total people affected by disasters': 'Affected',
    'Number of people left homeless from disasters': 'Homeless',
    'Total economic damages from disasters as a share of GDP': 'Economic Damages'
};

google.charts.setOnLoadCallback(function() {
    let initialSelection = document.getElementById('impactSelector').value;
    updateChartConfiguration(initialSelection);
});

function drawRegionsMap(selectedImpact, options) {
    currentYear = selectedDecade !== undefined ? `(${selectedDecade})` : "(Year)";

    // Load the data from the JSON file
    $.getJSON('natural-disasters-countries.json', function (jsonData) {
        // Filter data based on the selected year and impact
        let filteredData = jsonData.filter(function (entry) {
            return entry.Year === selectedDecade;
        });

        // Create a DataTable from the filtered data
        let data = new google.visualization.DataTable();
        data.addColumn('string', 'Country');
        data.addColumn('number', 'Impact');
        data.addColumn({type: 'string', role: 'tooltip', 'p': {'html': true}});

        // Formatter for whole numbers
        let wholeNumberFormatter = new google.visualization.NumberFormat(
            {decimalSymbol: '.', groupingSymbol: ',', fractionDigits: 0});

        // Formatter for percentage
        let percentageFormatter = new google.visualization.NumberFormat(
            {pattern: '#,##0.00%', decimalSymbol: '.', groupingSymbol: ','});

        // Add rows to the DataTable
        filteredData.forEach(function (entry) {
            let impactValue = entry[selectedImpact];
            let formattedImpact = impactValue !== undefined && impactValue !== null && impactValue !== "" ? parseFloat(impactValue) : 0;

            let tooltipContent;

            if (selectedImpact === 'Total economic damages from disasters as a share of GDP') {
                formattedImpact /= 100; // Convert to a fraction for percentage formatting
                // Format the impact value for the tooltip using the percentage formatter
                tooltipContent = `
                    <div style="margin-top: -5px;">
                        <span style="color: #636363;">${selectedDecade}</span><br><hr>
                        <span style="color: #636363;">${impactLabelMap[selectedImpact]}:</span> <strong>${percentageFormatter.formatValue(formattedImpact)}</strong>
                    </div>`;
            } else {
                // Format the impact value for the tooltip using the whole number formatter
                tooltipContent = `
                    <div style="margin-top: -5px;">
                        <span style="color: #636363;">${selectedDecade}</span><br><hr>
                        <span style="color: #636363;">${impactLabelMap[selectedImpact]}:</span> <strong>${wholeNumberFormatter.formatValue(formattedImpact)}</strong>
                    </div>`;
            }
            data.addRow([entry.Country, formattedImpact, tooltipContent]);
        });

        let chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
        chart.draw(data, options);
        updateLegend(selectedImpact, options);

        // Update the current year in the header
        document.getElementById('currentYear').textContent = currentYear;
    });
}

function updateChartConfiguration(selectedImpact) {
    let config = colorConfigurations[selectedImpact] || colorConfigurations['Number of deaths']; // Default to 'Number of deaths' if not found
    let options = {
        colorAxis: {
            colors: config.colors,
            values: config.values
        },
        tooltip: { isHtml: true }
    };

    // Hide the legend if the selected impact is 'Total economic damages from disasters as a share of GDP'
    if (selectedImpact === 'Total economic damages from disasters as a share of GDP') {
        options.legend = 'none';
    }
    
    drawRegionsMap(selectedImpact, options);
}

function updateLegend(selectedImpact, options) {
    let legend = document.getElementById('legend');
    legend.innerHTML = ''; // Clear previous legend items

    let colorRange = options.colorAxis.colors;
    let labels = colorConfigurations[selectedImpact].labels; // Fetch labels for the selected impact

    colorRange.forEach(function(color, index) {
        let legendItem = document.createElement('div');
        legendItem.className = 'legend-item';
        let legendColor = document.createElement('div');
        legendColor.className = 'legend-color';
        legendColor.style.backgroundColor = color;
        let legendLabel = document.createElement('span');
        legendLabel.textContent = labels[index];
        legendItem.appendChild(legendColor);
        legendItem.appendChild(legendLabel);
        legend.appendChild(legendItem);
    });
}

document.getElementById('impactSelector').addEventListener('change', function() {
    updateChartConfiguration(this.value);
});

function updateChart() {
    let inputDecade = parseInt(document.getElementById('yearInput').value);

    // Check if the entered value is a valid year within the specified range
    if (decades.includes(inputDecade)) {
        selectedDecade = inputDecade; // Update selectedDecade only if inputDecade is valid
        let selectedImpact = document.getElementById('impactSelector').value;
        updateChartConfiguration(selectedImpact);
    } else {
        alert('Please enter a valid decade within the range 1900, 1910 ... 2000, 2010, 2020.');
        document.getElementById('yearInput').value = "";
    }
}

function playTimeLapse() {
    clearInterval(playInterval); // Clear any existing interval
    let index = 0;
    playInterval = setInterval(function () {
        if (index < decades.length) {
            selectedDecade = decades[index];
            let selectedImpact = document.getElementById('impactSelector').value;
            updateChartConfiguration(selectedImpact);
            index++;
        } else {
        clearInterval(playInterval); // Stop when reaching the end of the array
        }
    }, 750); // Set the interval duration (in milliseconds)
    
    // Clear the input field
    document.getElementById('yearInput').value = "";
}


// Attach the event listeners after the DOM is fully loaded
google.charts.setOnLoadCallback(function() {
    let initialSelection = document.getElementById('impactSelector').value;
    updateChartConfiguration(initialSelection);
    document.getElementById('yearInput').addEventListener('keypress', function(event) {
        if (event.keyCode === 13) { updateChart(); }
    });
    document.getElementById('updateChartButton').addEventListener('click', updateChart);
    document.getElementById('timeLapseButton').addEventListener('click', playTimeLapse);
});
