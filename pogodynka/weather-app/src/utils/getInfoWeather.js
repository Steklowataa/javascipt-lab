import { text } from './text';

export function getInfoWeather(str) {
    let info = "";

    switch (true) {
        case str.includes('sun'):
        case str.includes("clear"):
            info = text['sun-info'];
            break;
        case str.includes("clouds"):
            info = text['clouds-info'];
            break;
        case str.includes('light rain'):
            info = text['light-rain-info'];
            break;
        case str.includes('moderate rain'):
            info = text['moderate-rain-info'];
            break;
        case str.includes('snow'):
            info = text['snow-info'];
            break;
        case str.includes('mist'):
            info = text['mist-info'];
            break;
        default:
            info = ""; 
    }

    return info;
}
