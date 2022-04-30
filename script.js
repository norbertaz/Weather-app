const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')


const API_KEY = 'c4ee24ea5fb9809abf0faf20d083fedb'

const URL = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`

async function getWeatherBycity(city) {
    const res = await fetch(URL(city))
    const resData = await res.json();

    console.log(resData, KelvinToCelcius(resData.main.temp))

    addWeatherToPage(resData);
}

// getWeatherBycity('Warsaw')

function addWeatherToPage(data){
    const temp = KelvinToCelcius(data.main.temp)

    const weather = document.createElement('div')
    weather.classList.add('weather')
    weather.innerHTML = `
        <h1>${search.value}</h1>
        <h2>${temp}</h2>
    `
    search.value = ''
    main.appendChild(weather)
    if(main) {
        main.replaceChild(weather)
    }
}

function KelvinToCelcius(K) {
    return (K - 273.15).toFixed(1) + ' °C'
}



form.addEventListener('submit', (e)=>{
    e.preventDefault();

    const city = search.value

    if(city) return getWeatherBycity(city);
})