export function changeBackground(str) {
  const date = new Date();
  const hours = date.getHours();
  //console.log(hours)
  const month = date.getMonth();
  let backgroundImg = "";

  const dayCondition = {
    day: {
      sun: "url('/icon/image-clear-sky.jpg')",
      clouds: "url('/icon/image-clouds.jpg')",
      lightRain: "url('/icon/image-light-rain.jpg')",
      moderateRain: "url('/icon/image-moderate-rain.jpg')",
      snow: "url('/icon/image-snow.jpg')",
      mist: "url('/icon/image-mist-day.jpg')",
      thunderstorm: "url('/icon/image-thunderstorm.jpg')",
      rain: "url('/icon/image-rain-night.jpg')",
    },
    night: {
      sun: "url('/icon/image-clear-sky-night.jpg')",
      clouds: "url('/icon//image-clouds-night.jpg')",
      lightRain: "url('/icon/image-rain-night.jpg')",
      moderateRain: "url('/icon/image-rain-night.jpg')",
      snow: "url('/icon/image-snow.jpg')",
      mist: "url('/icon/image-mist-night.jpg')",
      thunderstorm: "url('/icon/image-thunderstorm.jpg')",
      rain: "url('/icon/image-rain-night.jpg')",
    },
  };

  const dayTime =
    (month === 3 || month === 4 || month === 8) && (hours >= 6 && hours <= 19) ||
    (month === 5 || month === 6 || month === 7) && (hours >= 5 && hours <= 21) ||
    (month === 1 || month === 2 || month === 9 || month === 10 || month === 11 || month === 12) && (hours >= 7 && hours <= 16)
      ? 'day'
      : 'night';

  const weatherType = str.includes('clear') || str.includes('sun') ? 'sun' :
                      str.includes('clouds') ? 'clouds' :
                      str.includes('light rain') ? 'lightRain' :
                      str.includes('moderate rain') ? 'moderateRain' :
                      str.includes('thunderstorm') ? 'thunderstorm' :
                      str.includes('snow') ? 'snow' :
                      str.includes('mist') ? 'mist' : 'default';

  backgroundImg = dayCondition[dayTime][weatherType] || '';

  document.body.style.backgroundImage = backgroundImg;
document.body.style.backgroundSize = "cover"; // Tło pokrywa całą stronę
document.body.style.backgroundRepeat = "no-repeat"; // Tło się nie powtarza
document.body.style.backgroundPosition = "center"; // Tło wyśrodkowane
document.body.style.height = "100%"; // Pełna wysokość
document.body.style.width = "100%"; // Pełna szerokość

}

