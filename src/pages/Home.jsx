import { useState } from "react";

import Rainy from "../images/rainy.gif";
import Cloudy from "../images/cloudy.gif";
import Snowy from "../images/snowy.gif";
import Sunny from "../images/sunny.gif";

const Home = () => {
  const apiKey = "d6cef82cad9b94b3e4f9a9b356ea8cfc";

  const [weather, setWeather] = useState(null);

  const weathers = [
    {
      icon: Rainy,
      image_url:
        "https://images.unsplash.com/photo-1567688993206-43c34131b21f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      id: "Rain",
    },
    {
      icon: Cloudy,
      image_url:
        "https://images.unsplash.com/photo-1469365556835-3da3db4c253b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      id: "Clouds",
    },
    {
      icon: Sunny,
      image_url:
        "https://unsplash.com/photos/silhouette-of-mountains-during-sunset-VDOhTPhJZb0",
      id: "Clear",
    },
    {
      icon: Snowy,
      image_url:
        "https://unsplash.com/photos/white-and-brown-bokeh-lights-FkZz4DfSnXM",
      id: "Snow",
    },
  ];
  const [targetIcon, setTargetIcon] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const weatherSearch = (cityName) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        const iconFind = weathers.find((item) => {
          if (item.id === data.weather[0].main) {
            setTargetIcon(item.icon);
            setBackgroundImage(item.image_url);
          }
        });

        setWeather(data);
      });
  };
  console.log(backgroundImage);

  return (
    <section style={{ backgroundImage: backgroundImage }}>
      <div className="buttons">
        <button onClick={() => weatherSearch("berlin")}>Berlin</button>
        <button onClick={() => weatherSearch("hamburg")}>Hamburg</button>
        <button onClick={() => weatherSearch("köln")}>Köln</button>
        <button onClick={() => weatherSearch("australien")}>Australien</button>
      </div>
      {/* <input type="text" placeholder="please enter a city name" /> */}

      {weather ? (
        <div className="weatherDisplay">
          <h1>{weather.weather[0].description} </h1>
          <div>
            <img src={targetIcon} alt="" />
            <h2>{Math.round(weather.main.temp - 273.15)} °C</h2>
          </div>
          <h3>Windgeschwindigkeit: {weather.wind.speed} m/std</h3>
        </div>
      ) : (
        <p>please choose a city!</p>
      )}
    </section>
  );
};

export default Home;
