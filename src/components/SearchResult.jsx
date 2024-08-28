import React, { useState } from "react";
import {
  Cloud,
  Cloudy,
  MapPin,
  Star,
  Sun,
  Thermometer,
  Waves,
  Wind,
} from "lucide-react";
import WeatherDetailsCard from "./WeatherDetailsCard";
import axios from "axios";
import { backendUrl } from "../utils";
const dayData = [3, 7, 10];
const SearchResult = ({ data, displayFavBtn, user }) => {
  const [loading, setLoading] = useState(false);
  const [day, setDay] = useState();
  const { location, current } = data;

  const handleAddToFavorite = async () => {
    setLoading(true);
    await axios
      .post(backendUrl + "/favorite", {
        user,
        location: location.name.trim(),
      })
      .then((res) => {
        if (res.status === 201) {
          alert(res.data.message);
        }
      })
      .catch((error) => {
        alert(error.response.data.message ?? error.message);
      })
      .finally(() => setLoading(false));
  };

  const handleSearch = async (day) => {
    const apiKey = "2c8fcaff5cmshb30514913395c4fp10f062jsn47dbd8c865d9";
    setLoading(true);
    axios
      //   .get(`https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`, {
      .get(
        `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${location.name}&days=${day}'`,
        {
          headers: {
            "x-rapidapi-key": apiKey,
            "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
          },
        }
      )
      .then((res) => {
        // setDay(day);
        // setCityData(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        if (error.response.data.error.code === 1006) {
          setCityError(error.response.data.error.message);
        }
        setCityData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section className="section-center">
      {/* <div>
        {dayData.map((item, i) => (
          <button key={i} onClick={() => handleSearch(item)}>
            {item}
          </button>
        ))}
      </div> */}

      <div className="city-details-con">
        <h1 className="city-details-heading">City details</h1>
        <div>
          <div>
            <MapPin size={30} />
            <h1>{location.name}</h1>
            <p className="location-detail">{location.region}</p>
            <p className="location-detail">{location.country}</p>
            <p className="location-detail">Local time: {location.localtime}</p>
            <p>Last updated: {current.last_updated}</p>
          </div>
          {displayFavBtn && (
            <button
              className="icon-btn"
              onClick={handleAddToFavorite}
              disabled={loading}
            >
              <Star size={40} color="blue" fill="white" />
            </button>
          )}
        </div>
      </div>

      <div className="weather-details-con">
        <h1 className="weather-details-heading">Weather details</h1>
        <div className="weather-details-card-con">
          {/* cards */}
          <WeatherDetailsCard
            heading="Condition"
            image={current.condition.icon}
            valueOne={current.condition.text}
          />
          <WeatherDetailsCard
            heading="Temperature"
            valueOne={current.temp_c}
            unitOne="&deg;C"
            valueTwo={current.temp_f}
            unitTwo="&deg;F"
            icon={<Thermometer size={50} />}
          />
          <WeatherDetailsCard
            heading="Humidity"
            valueOne={current.humidity}
            unitOne="%"
            icon={<Cloudy size={50} />}
          />
        </div>
      </div>
    </section>
  );
};

export default SearchResult;
