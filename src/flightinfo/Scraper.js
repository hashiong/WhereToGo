const axios = require("axios");

const url = "https://www.kayak.com/s/horizon/exploreapi/destinations?airport=LAX&budget=&duration=&flightMaxStops=&stopsFilterActive=false&topRightLat=38.87232903277115&topRightLon=-93.16170132324271&bottomLeftLat=28.70805890030516&bottomLeftLon=-143.65486538574226&zoomLevel=4&selectedMarker=&themeCode=&selectedDestination=";

async function scrapeData() {
    try {
      // Fetch HTML of the page we want to scrape
      const { data } = await axios.get(url);
      destinations = data["destinations"];
      var sortedData = []
      destinations.forEach(element => {
        var destination = {
            "city" : element["city"]["name"],
            "country" : element["country"]["name"],
            "price" : element["flightInfo"]["price"]
        }
        sortedData.push(destination)
        
        
      });

      sortedData = sortedData.sort((a, b) => Number(a.price - b.price))
      console.log(sortedData)

    } catch (err) {
      console.error(err);
    }
  }
  // Invoke the above function
  scrapeData();