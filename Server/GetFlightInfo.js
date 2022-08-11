const axios = require('axios')
const db = require('./firebase.js').db
const set = require('firebase/database').set
const ref = require('firebase/database').ref
const cheerio = require('cheerio')



async function getDestinations() {

  const mainUrl = "https://www.kayak.com"
  const url = "https://www.kayak.com/s/horizon/exploreapi/destinations?airport=LAX&budget=&duration=&flightMaxStops=&stopsFilterActive=false&topRightLat=38.87232903277115&topRightLon=-93.16170132324271&bottomLeftLat=28.70805890030516&bottomLeftLon=-143.65486538574226&zoomLevel=4&selectedMarker=&themeCode=&selectedDestination=";
  try {

    const { data } = await axios.get(url);
    let jsonData = data["destinations"];
    var destinations = []
    for(let element of jsonData){
      let destination = {
        "city" : element["city"]["name"],
        "country" : element["country"]["name"],
        "price" : element["flightInfo"]["price"],
        "url" : mainUrl + element["clickoutUrl"],
        "img" : ""
      }
      
      destinations.push(destination) 
    }

    destinations = destinations.sort((a, b) => Number(a.price - b.price)).slice(0, 50)

    return destinations

  } catch (err) {
    console.log("ERROR!!!")
    console.error(err);
  }
}


module.exports = async function updateInfo(){
  try{
    let destinations = await getDestinations()
    let bingUrl = 'https://www.bing.com/images/search?q='
    //Bad Request after 65 requets
    for (let destination of destinations){
      const response = await axios.get(bingUrl + destination.city + "," + destination.country)
      const $ = cheerio.load(response.data)
      const d = $('div.imgpt a').attr("m")
      const jsonObj = JSON.parse(d)
      destination.img = jsonObj["murl"]
    }
    let d = new Date()
    let day = d.getDate()
    day = day <= 9 ? '0' + day : day;
    let month = d.getMonth()
    month = month <= 9 ? '0' + month : month;
    let date = d.getFullYear().toString() + month.toString() + day.toString()
    set(ref(db, date),destinations)
    return destinations
  }
  catch (err) {
    console.error(err);
  }
}

//  const getDestinations = async () => {
//   axios.get(url)
//   .then((response) => {
//   //console.log(response.data.token);

//       resData = response.data["destinations"]
//       var destinations = []
//       resData.forEach(element => {

//         var destination = {
//             "city" : element["city"]["name"],
//             "country" : element["country"]["name"],
//             "price" : element["flightInfo"]["price"],
//             "url" : mainUrl + element["clickoutUrl"],
//             "imgUrl" : ""
//         }
//         destinations.push(destination)   
//       });

//       destinations = destinations.sort((a, b) => Number(a.price - b.price))
//       destinations = destinations.slice(0, 100)
//       // console.log(destinations)
//       return destinations;
//   })
//   .catch((error) => {
//       console.log(error);
//   });
// };

// const addImgUrl =  async() => {

//   var destinations = await getDestinations()

//   bingUrl = 'https://www.bing.com/images/search?q='
//   getDestinations()
//   .then((destinations) => {
//     console.log('destinations: '+ destinations)
  //   destinations.forEach(element=> {

  //     axios.get(bingUrl + element.city + "," + element.country)
  //     .then((response) => {
  //       const $ = cheerio.load(response.data)
  //       const d = $('div.imgpt a').attr("m")
  //       // console.log(d)
  //       const jsonObj = JSON.parse(d)
  //       element.imgUrl = jsonObj
  //     })
  // })
  
//     .catch((error) => {
//       console.log(error);
//     });
//   })

//   return destinations;
// };

// const test = addImgUrl()
// console.log(test)

