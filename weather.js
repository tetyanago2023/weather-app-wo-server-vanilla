import axios from "axios";

export function getWeather (lat, lon, timezone) {
    return axios.get("https://api.open-meteo.com/v1/forecast?current=temperature_2m,weather_code,wind_speed_10m&hourly=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timeformat=unixtime",
    { params: {
            latitude: lat,
            longitude: lon,
            timezone
        },
    })
        .then(({ data }) => {
        return {
            current: parseCurrentWeather(data),
            // daily: parseDailyWeather(data),
            // hourly: parseCHourlyWeather(data)
        }
    })
}

function parseCurrentWeather({ current, daily }) {
    const {
        temperature_2m: currentTemp,
        wind_speed_10m: windSpeed,
        weather_code: iconCode
    } = current

    const {
        temperature_2m_max: [maxTemp],
        temperature_2m_min: [minTemp],
        apparent_temperature_max: [maxFeelsLike],
        apparent_temperature_min: [minFeelsLike],
        precipitation_sum: [precip]
    } = daily

    return {
        currentTemp: Math.round(currentTemp),
        highTemp: Math.round(maxTemp),
        lowTemp: Math.round(minTemp),
        highFeelsLike: Math.round(maxFeelsLike),
        lowFeelsLike: Math.round(minFeelsLike),
        windSpeed: Math.round(windSpeed),
        precip: Math.round(precip * 100) / 100,
        iconCode,
    }
}

function parseDailyWeather(data) {

}

function parseCHourlyWeather(data) {

}