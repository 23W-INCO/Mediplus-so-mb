import express from 'express';
import fetch from 'node-fetch';
import { DateTime } from 'luxon';

const app = express();
app.use(express.static('public')); // Serve static files from the 'public' directory
const port = 3000; // or some other port conventionally used for development: 3001, 5000, 8080, 8000
const NEWS_API_KEYS = ["31cc0b19279e436eb30c0e434e379a28", "e1891e03afba41dc8ee7ccd2d5cdb23c"]; // two keys for fault-tolerance

// Function to fetch relevant infos from IP
async function fetchIpInfo() {
    try {
        const response = await fetch('https://ipinfo.io/json');
        const data = await response.json();
        const tzStr = data.timezone;
        const now = DateTime.now().setZone(tzStr);
        const ipAddress = data.ip;
        const city = data.city;
        const region = data.region;
        return { now, tzStr, ipAddress, city, region };
    } catch (error) {
        console.error('Error fetching timezone and time:', error);
        return { now: null, tzStr: null, ipAddress: null };
    }
}

// Function to determine greeting based on time of day
function getGreeting(date) {
    const hour = date.hour;
    if (hour < 12) return 'Good Morning';
    else if (hour < 18) return 'Good Afternoon';
    else return 'Good Evening';
}

// Function for retrieving country info from IP
async function fetchCountryInfo() {
    try {
        const response = await fetch('https://ipinfo.io/json');
        const data = await response.json();
        return { country: data.country.toLowerCase(), region: data.region };
    } catch (error) {
        console.error('Error fetching country info:', error);
        return { country: null, region: null };
    }
}

// Function for fetching disasterType news
async function getTopHeadlines(countryCode, disasterType = 'natural disasters', skip = 0) {
    if (!countryCode) return 'No country code provided for fetching news';
    
    let data = null;
    
    for (const apiKey of NEWS_API_KEYS) {
        const url = `https://newsapi.org/v2/everything?q=${disasterType}&apiKey=${apiKey}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`API call failed with status: ${response.status}`);
            
            data = await response.json();
            if (data.articles) {
                data.articles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
                return data.articles.slice(skip, skip + 10);
            }
        } catch (error) {
            console.error(`Error fetching news with API key ${apiKey}:`, error, '. Reverting to next backup API key...');
            // Continue to the next API key if there's an error
        }
    }
    
    // If none of the API keys worked, return an empty list or throw an error
    if (!data || !data.articles) {
        console.error('All NEWS API keys failed or no articles found.');
        return [];
    }
}

// Function for formatting date and time as 'DD.MM.YYYY at HH:MM:SS'
function dateTimeFormatter(dateStr) {
    const dateObj = new Date(dateStr);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const formattedDate = new Intl.DateTimeFormat('de-DE', options).format(dateObj);
    return formattedDate.replace(',', ' at');
}


// Function to Fetch Weather Data
async function fetchWeatherData(ipAddress) {
    const WEATHER_API_KEY = '17873d767696d100d30b8835d70a56e9';

    const response = await fetch('https://ipinfo.io/json');
    const data = await response.json();

    const location = data.loc.split(',');
    const lat = parseFloat(location[0]);
    const lon = parseFloat(location[1]);

    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    const weatherData = await weatherResponse.json();
    return weatherData;
}


// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', './public/views');

// Route
app.get('/', async (req, res) => {
    const skip = parseInt(req.query.skip) || 0;
    const disasterType = req.query.disasterType || 'natural disasters';
    const { country } = await fetchCountryInfo();
    const headlines = await getTopHeadlines(country, disasterType, skip);
    const isLastPage = headlines.length < 10;
    const { now, tzStr, ipAddress, city, region } = await fetchIpInfo();
    const greeting = getGreeting(now);
    const weatherData = await fetchWeatherData(ipAddress);

    const nextSkip = headlines.length === 10 ? skip + 10 : null;
    const prevSkip = skip - 10 >= 0 ? skip - 10 : null;

    res.render('index', {
        headlines: headlines,
        disasterType: disasterType,
        skip: skip,
        prevSkip: prevSkip,
        nextSkip: nextSkip,
        isLastPage: isLastPage,
        greeting: greeting,
        dateTimeFormatter: dateTimeFormatter,
        time: now,
        timezone: tzStr,
        ipAddress: ipAddress,
        city: city,
        region: region,
        weatherData: weatherData
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
