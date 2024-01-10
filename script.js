
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}

// ===========VisitorCount================

let visitorCount = localStorage.getItem('visitorCount') || 0
    visitorCount++
    localStorage.setItem('visitorCount', visitorCount)
    document.getElementById('visitorCount').innerHTML = visitorCount;

// =============================

function updateTicker() {
    var ticker = document.getElementById("ticker");
    var currentDate = new Date().toLocaleDateString();
    var currentTime = new Date().toLocaleTimeString();
    var location = "Unknown";

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

            
            var apiUrl = "https://api.openweathermap.org/geo/1.0/reverse?lat=" + latitude + "&lon=" + longitude + "&limit=1&appid=4c2a682b3126163ba5db64902b2030f9";
            fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                location = data[0].name + ", " + data[0].country;

                ticker.innerText = currentDate + " " + currentTime + " | " + location;
                ticker.style.width = ticker.clientWidth + "px";

                if (ticker.scrollWidth > ticker.clientWidth) {
                    ticker.animate([
                            { transform: "translateX(0)" },
                            { transform: "translateX(-" + (ticker.scrollWidth - ticker.clientWidth) + "px)" }
                        ], {
                            duration: (ticker.scrollWidth - ticker.clientWidth) * 20,
                            iterations: Infinity
                        });
                }
            })
            .catch(error => {
                console.log(error);
                ticker.innerText = currentDate + " " + currentTime + " | " + location;
                ticker.style.width = ticker.clientWidth + "px";
            });
        }, function(error) {
            console.log(error);
            ticker.innerText = currentDate + " " + currentTime + " | " + location;
            ticker.style.width = ticker.clientWidth + "px";
        });
    } else {
        ticker.innerText = currentDate + " " + currentTime + " | " + location;
        ticker.style.width = ticker.clientWidth + "px";
    }
}

updateTicker();
setInterval(updateTicker, 60000);

function updateDateTimeAndLocation() {
    const currentDate = new Date();
    const dateElement = document.getElementById("date");
    const timeElement = document.getElementById("time");
    const locationElement = document.getElementById("location");
  
    dateElement.textContent = currentDate.toLocaleDateString();
    timeElement.textContent = currentDate.toLocaleTimeString();
  
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
  
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY`)
        .then(response => response.json())
        .then(data => {
          if (data.results && data.results.length > 0) {
            const address = data.results[0].formatted_address;
            locationElement.textContent = address;
          } else {
            locationElement.textContent = ["Location not available"];
          }
        })
        .catch(error => {
          console.error(`Error fetching location: ${error.message}`);
          locationElement.textContent = "Location not available";
        });
    }, (error) => {
      console.error(`Error getting location: ${error.message}`);
      locationElement.textContent = "Location not available";
    });
  }
  
  updateDateTimeAndLocation();
  setInterval(updateDateTimeAndLocation, 1000);