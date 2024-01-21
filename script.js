const apiKey = '537494f82c27e796a4a37d7df97fc28c'; // Get your API key from OpenWeatherMap

function getWeather() {
    const locationInput = document.getElementById('locationInput').value;

    if (locationInput) {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${locationInput}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => displayWeather(data))
            .catch(error => console.error('Error fetching weather data:', error));
    } else {
        alert('Please enter a location.');
    }
}

function displayWeather(data) {
    const weatherResult = document.getElementById('weatherResult');
    weatherResult.innerHTML = ''; // Clear previous results

    if (data.cod === '200') {
        const forecast = data.list.slice(0, 20); // Display the forecast for the next 5 days

        forecast.forEach(day => {
            const date = new Date(day.dt * 1000);
            const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });

            const weatherInfo = `
                <div>
                    <strong>${dayOfWeek}</strong>: ${day.main.temp.toFixed(1)}°C, ${day.weather[0].description}
                </div>
            `;
            weatherResult.innerHTML += weatherInfo;
        });
    } else {
        weatherResult.innerHTML = 'Error fetching weather data. Please try again.';
    }
}
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
                .then(response => response.json())
                .then(data => displayWeather(data))
                .catch(error => console.error('Error fetching weather data:', error));
        }, error => console.error('Error getting location:', error));
    } else {
        alert('Geolocation is not supported by your browser.');
    }
}
