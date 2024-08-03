/*const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");
*/const API_KEY2 = "4e814a0b8ac601188ef5f6cd1b98d59e";/*
const createWeatherCard = (weatherItem) => {
	return '<li class="card"><h2>London(2023-06-19)</h2><img src="https://openweathermap.org/img/wn/10d@2x.png" alt="weather-icon"><h4>Temp: 19.10°C</h4><h4>Wind: 4.31 M/S</h4><h4>Humidity: 79%</h4></li>';
}
const getWeatherDetails = (cityName, lat, lon) =>{
	const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid='4e814a0b8ac601188ef5f6cd1b98d59e'`;
	fetch(WEATHER_API_URL).then(res => res.json()).then(data => {
		const uniqueForecastDays = [];
		const fiveDaysForecast = data.list.filter(forecast => {
			const forecastDate = new Date(forecast.dt_txt).getDate();
			if(!uniqueForecastDays.includes(forecastDate)){
				return uniqueForecastDays.push(forecastDate);
			}
		});
        console.log(fiveDaysForecast)
		fiveDaysForecast.forEach(weatherItem => {
			createWeatherCard(weatherItem);
		});
	}).catch(() => {
		alert("An error occured while fetching the weather forecast");
	});
}
const getCityCoordinates = () =>{
	const cityName = cityInput.value.trim();
	if(!cityName) return;
    const GEOCODING_API_URL =`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;
	fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
		if(!data.length) return alert("No coordinates found for ${cityName}");
		const { name, lat, lon } = data[0];
		getWeatherDetails(name,lat,lon);
	}).catch(() => {
		alert("An error occured while fetching the coordinates");
	});
}
searchBtn.addEventListener("click",getCityCoordinates);*/

API_KEY = '22dac4725d084fdd96a51010242306';
//http://api.weatherapi.com/v1/current.json?key=22dac4725d084fdd96a51010242306&q=London&aqi=yes

const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');

const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const windSpeed = document.getElementById('windSpeed');
const humidity = document.getElementById('humidity');
const condition = document.getElementById('current-condition');

async function getData(cityInput){
	const promise = await fetch(`http://api.weatherapi.com/v1/current.json?key=22dac4725d084fdd96a51010242306&q=${cityInput}&aqi=yes`);
	return await promise.json();
}

searchBtn.addEventListener('click',async ()=>{
	const input = cityInput.value;
	const result = await getData(input);
	cityName.innerText = `${result.location.name}, ${result.location.localtime}`;
	temperature.innerText = `Temperature: ${result.current.heatindex_c}°C`;
	windSpeed.innerText = `Wind: ${result.current.wind_kph} Km/h`;
	humidity.innerText = `Humidity: ${result.current.humidity}%`;
	condition.innerText = result.current.condition.text;
})

async function getUserCoordinates(){
	navigator.geolocation.getCurrentPosition(
		position => {
			const {latitude, longitude} = position.coords;
			const REVERSE_GEOCODING_URL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=4e814a0b8ac601188ef5f6cd1b98d59e`;
			fetch(REVERSE_GEOCODING_URL).then(res => res.json()).then(data => {
				const city = data[0].name;
				myCity(city);
			})
		}, error => {
			if(error.code === error.PERMISSION_DENIED){
				alert("Geolocation request denied. Please reset location permission to grant access again.");
			}
		}
	)
}
async function myCity(city){
	const result = await getData(city);
	cityName.innerText = `${result.location.name}, ${result.location.localtime}`;
	temperature.innerText = `Temperature: ${result.current.heatindex_c}°C`;
	windSpeed.innerText = `Wind: ${result.current.wind_kph} Km/h`;
	humidity.innerText = `Humidity: ${result.current.humidity}%`;
	condition.innerText = result.current.condition.text;
}

locationBtn.addEventListener('click',getUserCoordinates)

printData(`London`);
printData(`Paris`);
printData(`Tokyo`);
printData(`Washington`);
printData(`Dubai`);

async function printData(city){
	const result1 = await getData(city);
    const temperature1 = document.querySelector(`#${city} #temperature1`);
	const windSpeed1 = document.querySelector(`#${city} #windSpeed1`);
	const humidity1 = document.querySelector(`#${city} #humidity1`);
	temperature1.innerText = `Temperature: ${result1.current.heatindex_c}°C`;
	windSpeed1.innerText = `Wind: ${result1.current.wind_kph} Km/h`;
	humidity1.innerText = `Humidity: ${result1.current.humidity}%`;
}
