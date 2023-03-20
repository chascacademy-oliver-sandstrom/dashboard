
// Hämta bakgrundsbild och skaparens information från API
async function getBackgroundImage() {
    try {
      const response = await axios.get(`https://api.unsplash.com/photos/random?count=1&client_id=kry-mdhiXYPHMpYyC7DOagXkPDtI6SRMS7N5MabBj8o`);
      
      // Visa bakgrundsbild och information om skaparen
      document.body.style.backgroundImage = `url(${response.data[0].urls.full})`;
      document.getElementById("creator").innerHTML = `Skapad av Unsplash @${response.data[0].user.username}`;
    } catch (error) {
      console.error(error);
      // Visa default-bild om hämtningen misslyckas
      document.body.style.backgroundImage = `https://unsplash.com/photos/B63UmuDkznY`;
    }
  }
  
  // Hämta aktuell position och väderdata från API
  async function getWeatherData() {
    try {
      // Hämta aktuell position
      const position = await getCurrentPosition();
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      
      // Hämta väderdata utifrån aktuell position
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=bb67ecee9380c0be5ecf4c0e55874991&units=metric`);
      const weatherData = response.data;
      
      // Visa väderdata
      document.getElementById("temperature").innerHTML = `${weatherData.main.temp}°C`;
      document.getElementById("weather-condition").innerHTML = weatherData.weather[0].description;
    } catch (error) {
      console.error(error);
      // Visa felmeddelande om hämtningen misslyckas
      document.getElementById("weather-data").innerHTML = "Kan inte hämta väderdata";
    }
  }

  async function getOtherData() {
    try {
    const response1 = await axios.get(`https://type.fit/api/quotes`);
      const data1 = response1.data;
      const rnd = Math.floor((Math.random() * data1.length));
    document.getElementById("data-1").innerHTML = data1[rnd].text;
    } catch (error) {
    console.error(error);
    // Visa felmeddelande om hämtningen misslyckas
    document.getElementById("other-data").innerHTML = "Kan inte visa information från API-resurs 1 och API-resurs 2.";
    }
    }

  // Hämta aktuell position med hjälp av Geolocation Web API
function getCurrentPosition() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }
  
  // Uppdatera tiden och datumet varje sekund
  function updateTime() {
    const now = new Date();
    document.getElementById("time").innerHTML = now.toLocaleTimeString();
    document.getElementById("date").innerHTML = now.toLocaleDateString();
  }
  setInterval(updateTime, 1000);
  
  // Kör alla funktioner när sidan laddas
window.onload = function () {
    getBackgroundImage();
    getWeatherData();
    getOtherData();
}
  