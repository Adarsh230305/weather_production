
let chart;

async function getweather() {
  const city = document.querySelector('#CityName').value.trim();
  const temp = document.querySelector('#temp');
  const pres = document.querySelector('#pres');
  const humid = document.querySelector('#humid');
  const wind = document.querySelector('#wind');
  const weatherInfo = document.querySelector('.weather');

  if (!city) {
    alert("⚠️ Please enter a city name");
    return;
  }

  // Use 5-day forecast API (not current weather)

  try {
    const response = await fetch(`http://localhost:3000/api/weather?city=${city}`);
    if (!response.ok) throw new Error("City not found"); //The Response object has a property .ok which is true if the HTTP status code is 200–299 (successful response).
    const data = await response.json();

    const labels = [];
    const temps = [];

  // console.log(data);

  // your UI update logic here


   
    for (let i = 0; i < data.list.length; i += 8) {
      const forecast = data.list[i];
      const date = new Date(forecast.dt_txt);
      labels.push(date.toDateString());
      temps.push(forecast.main.temp);
    }

    drawchart(labels, temps);
    
    // Use the first item for displaying other data
    const weather = data.list[0].weather[0];
    const main = data.list[0].main;
    const windData = data.list[0].wind;

    const icon = weather.icon;
    const desc = weather.description;
updatebg(weather.main);
    weatherInfo.innerHTML = `
      <h2>📍 ${data.city.name}</h2>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}" />
      <p><strong>🌥️ Description:</strong> ${desc.charAt(0).toUpperCase() + desc.slice(1)}</p>
    `;

    temp.innerHTML = `<p><strong>🌡️ Temperature:</strong> ${main.temp}°C</p>`;
    pres.innerHTML = `<p><strong>Pressure:</strong> ${main.pressure} hPa</p>`;
    humid.innerHTML = `<p><strong>💧 Humidity:</strong> ${main.humidity}%</p>`;
    wind.innerHTML = `<p><strong>💨 Wind Speed:</strong> ${windData.speed} m/s</p>`;

  } catch (error) {
    document.querySelector('.weather').innerHTML = "❌ City not found or network error.";
    console.error(error);
  }
}

function drawchart(labels, temps) {
  const ctx = document.querySelector('#chart').getContext('2d');
  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Temperature (°C)',
        data: temps,
        borderColor: '#36a2eb',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension:0.5,
        pointRadius:5,
        fill:true
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: '5-Day Temperature Forecast'
        }
      },
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  });
}
const videos = {

    clear: "https://res.cloudinary.com/dn5pyvypb/video/upload/v1778409647/clear_qqqirt.mp4",

    clouds: "https://res.cloudinary.com/dn5pyvypb/video/upload/v1778409640/cloud_qaoemk.mp4",

    rain: "https://res.cloudinary.com/dn5pyvypb/video/upload/v1778409599/rain_rflm41.mp4",

    drizzle: "https://res.cloudinary.com/dn5pyvypb/video/upload/v1778409599/rain_rflm41.mp4",

    snow: "https://res.cloudinary.com/dn5pyvypb/video/upload/v1778411783/14034847-hd_1080_1920_24fps_ldonan.mp4",

    thunderstorm: "https://res.cloudinary.com/dn5pyvypb/video/upload/v1778411882/14040736_3840_2160_60fps_rexspm.mp4",

    mist: "https://res.cloudinary.com/dn5pyvypb/video/upload/v1778411783/14034847-hd_1080_1920_24fps_ldonan.mp4",

    haze: "https://res.cloudinary.com/dn5pyvypb/video/upload/v1778411783/14034847-hd_1080_1920_24fps_ldonan.mp4",

    fog: "https://res.cloudinary.com/dn5pyvypb/video/upload/v1778409627/fog_ktqrik.mp4"
};
function updatebg(condition) {
  const video = document.getElementById('bgvideo');
  const weather = condition.toLowerCase();
  const videoFile = videos[weather];
    if (videoFile) {
        video.src = videoFile;

        video.load();

        video.play();

        video.style.display = 'block';

    } else {

        video.style.display = 'none';

    }
}

