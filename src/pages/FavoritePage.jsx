import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../utils";
import { Link, useNavigate } from "react-router-dom";
import { ExternalLink, Trash } from "lucide-react";
import SearchResult from "../components/SearchResult";

const FavoritePage = ({ user }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [_, setLoadingCitityData] = useState(false);
  const [cityData, setCityData] = useState(null);
  const navigate = useNavigate();

  // Get list of favorite locations
  const getFavorites = async () => {
    setLoading(true);
    await axios
      .get(backendUrl + `/favorite/${user}`)
      .then((res) => {
        setFavorites(res.data);
      })
      .catch((error) => {
        alert(error.response.data.message ?? error.message);
      })
      .finally(() => setLoading(false));
  };

  // Get list of favorite locations
  const deleteFavorite = async (id) => {
    await axios
      .delete(backendUrl + `/favorite/${id}/${user}`)
      .then((res) => {
        alert(res.data.message);
        getFavorites();
      })
      .catch((error) => {
        alert(error.response.data.message ?? error.message);
      })
      .finally(() => setLoading(false));
  };

  //  view details of favorite
  const viewfavorite = async (location) => {
    const apiKey = "2c8fcaff5cmshb30514913395c4fp10f062jsn47dbd8c865d9";
    setLoadingCitityData(true);
    axios
      .get(`https://weatherapi-com.p.rapidapi.com/current.json?q=${location}`, {
        headers: {
          "x-rapidapi-key": apiKey,
          "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
        },
      })
      .then((res) => {
        setCityData(res.data);
      })
      .catch((error) => {
        setCityData(null);
      })
      .finally(() => {
        setLoadingCitityData(false);
      });
  };

  useEffect(() => {
    if (!user) navigate("/login");
    getFavorites();
  }, [user]);

  if (favorites.length === 0 && !loading)
    return (
      <section className="section-center">
        <div className="favorite-empty-con">
          <h1>Your Favorites List is Empty</h1>
          <p>
            It looks like you haven't added any items to your favorites yet.
            Start exploring and add your preferred items to this list!
          </p>
          <Link to="/search">
            <button className="primary-btn">Search</button>
          </Link>
        </div>
      </section>
    );
  return (
    <>
      {favorites.length > 0 && (
        <section className="section-center">
          <div>
            <h1 className="search-heading">Favorite List</h1>
            <div className="favorite-con">
              {favorites.map((item) => (
                <div className="favorite-card" key={item._id}>
                  <h1>{item.location}</h1>
                  <div>
                    <Trash
                      color="red"
                      style={{ cursor: "pointer" }}
                      onClick={() => deleteFavorite(item._id)}
                    />
                    <ExternalLink
                      style={{ cursor: "pointer" }}
                      onClick={() => viewfavorite(item.location)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {cityData && <SearchResult data={cityData} user={user} />}
        </section>
      )}
    </>
  );
};

export default FavoritePage;
