export function getWeatherIcon(str) {
    switch(true){
        case str === "clear sky":
            return "./icon/sunny.png"
        case str === "few clouds":
            return "./icon/few-clouds.png"
        case str === "light rain":
            return "./icon/clouds-rain.png"
        case str === "Broken Clouds":
        case str === "scattered clouds":
        case str === "overcast clouds":
            return "./icon/cloudsss.png"
        case str === "moderate rain":
            return "./icon/clouds-rain-light.png"
        case str === "mist":
            return './icon/mist.png'
        default:
            return  "./icon/few-clouds.png"
    }
  
}