import axios from "axios";
import SearchResult from "../components/SearchResult";



  const viewfavorite = async (location) => {
    const apiKey = "2c8fcaff5cmshb30514913395c4fp10f062jsn47dbd8c865d9";
    
    axios
      .get(`https://weatherapi-com.p.rapidapi.com/current.json?q=${location}`, {
        headers: {
          "x-rapidapi-key": apiKey,
          "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
        },
      })
   
  };

  


export default FavoritePage;
