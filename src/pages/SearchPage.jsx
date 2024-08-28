import axios from "axios";
import React, { useEffect, useState } from "react";
import SearchResult from "../components/SearchResult";
import { useNavigate } from "react-router-dom";

const SearchPage = ({ user }) => {
  const [loading, setLoading] = useState(false); 
  const [city, setCity] = useState(""); 
  const [cityData, setCityData] = useState(null); 
  const [cityError, setCityError] = useState(null); 
  const navigate = useNavigate();

 
  const handleSearch = async (e) => {
    const apiKey = "2c8fcaff5cmshb30514913395c4fp10f062jsn47dbd8c865d9";
    setLoading(true);
    e.preventDefault();
    axios
      .get(`https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`, {
        headers: {
          "x-rapidapi-key": apiKey,
          "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
        },
      })
      .then((res) => {
        setCityData(res.data);
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

  useEffect(() => {
    setCityError(null);
  }, [city]);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

  return (
    <section className="section-center">
      <h1 className="search-heading">Search Vacation Location</h1>
      <form className="search-form" onSubmit={handleSearch}>
        <div className="search-field-con">
          <input
            type="text"
            placeholder="Search Cities"
            required
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />
          <button className="primary-btn" disabled={loading}>
            {loading ? "Loading..." : "Search"}
          </button>
        </div>
      </form>
      {cityData && <SearchResult data={cityData} displayFavBtn user={user} />}
      {cityError && (
        <div className="location-error">
          <h1>
            {cityError} <span>{city}</span>
          </h1>
        </div>
      )}
    </section>
  );
};

export default SearchPage;
