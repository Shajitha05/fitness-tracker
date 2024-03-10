document.getElementById("weatherButton").addEventListener("click", function() {
    console.log("hello");
    var modal = document.getElementById("weatherModal");
    var span = document.getElementsByClassName("close")[0];
  
    modal.style.display = "block";
  
    span.onclick = function() {
      modal.style.display = "none";
    }
  
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  
    fetchWeather();
  });
  
  function fetchWeather() {
    const apiKey = "daecf63000a49044af2c7c165a509b5c";
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=India&appid=${apiKey}`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        displayWeather(data);
        console.log(data);
      })
      .catch(error => console.log('Error:', error));
  }
  
  function displayWeather(data) {
    const weatherInfo = document.getElementById("weatherInfo");
    weatherInfo.innerHTML = "";
  
    // Loop through the data to display weather for next 3 days
    for (let i = 0; i < 3; i++) {
      const date = new Date(data.list[i].dt * 1000);
      const tempHigh = data.list[i].main.temp_max;
      const tempLow = data.list[i].main.temp_min;
      const weatherIcon = data.list[i].weather[0].icon;
  
      const weatherCard = document.createElement("div");
      weatherCard.classList.add("weather-card");
  
      const dateElement = document.createElement("p");
      dateElement.textContent = date.toDateString();
      weatherCard.appendChild(dateElement);
  
      const tempElement = document.createElement("p");
      tempElement.textContent = `High: ${tempHigh}°C, Low: ${tempLow}°C`;
      weatherCard.appendChild(tempElement);
  
      const iconElement = document.createElement("img");
      iconElement.src = `http://openweathermap.org/img/wn/${weatherIcon}.png`;
      weatherCard.appendChild(iconElement);
  
      weatherInfo.appendChild(weatherCard);
    }
  }
  