import './style.css'
import { getWeather } from "./weather.js";

getWeather(10, 10, Intl.DateTimeFormat().resolvedOptions().timeZone).then(
    data => {
        console.log(data)
    }
)
