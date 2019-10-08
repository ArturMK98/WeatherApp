window.addEventListener('load', () => {

    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temp-description");
    let temperatureDegree = document.querySelector(".temp-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let unit = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span')

    if(navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(position => {

            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/4a1a121498e826d154d515eee68b618a/${lat},${long}`;
            //console.log(position);

            fetch(api)
            .then(response =>  {

                return response.json();
            })
            .then(data => {

                console.log(data);
                const {temperature, summary, icon} = data.currently;

                //set DOM Elements from API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;

                // Formula to convert to celsius
                let celsius = (temperature - 32) * (5/9);

                setIcons(icon, document.querySelector('.icon'));

                // Change unit (Celcius/Farenheit)
                unit.addEventListener('click', () => {

                    if(temperatureSpan.textContent === "°F") {

                        temperatureSpan.textContent = "°C";
                        temperatureDegree.textContent = Math.floor(celsius);

                    } else {

                        temperatureSpan.textContent = "°F";
                        temperatureDegree.textContent = Math.floor(temperature);
                    }
                })
            });
        });

    } else {

        h1.textContent = "Please allow the website to access your locatoin."
    }

    function setIcons(icon, iconID) {

        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});