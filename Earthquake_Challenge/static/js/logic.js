// Add console.log to check to see if our code is working.
console.log("I am logic.js , what do you want?");

const dom = [55.7428868441541, 37.615418005983436];
const flyover = [40.7, -94.5];
const moduleCenter = [30,30];

// Create the map object with a center and zoom level.
let map = L.map('mapid').setView(dom, 2);



// another way to load request tiles
// // We create the tile layer that will be the background of our map.
// let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox/streets-v11',
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: API_KEY
// });
 
// We create the tile layer that will be the background of our map.
// styles module want: 'streets-v11', 'dark-v10';

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});



// Then we add our 'graymap' tile layer to the map.
// replacing the following with layer-control
// streets.addTo(map);

// // we get data from github instead of local file - why?  
// // because js in browser has no permissions for local files!
// let airportData = "https://raw.githubusercontent.com/ajawa-took/Mapping_Earthquakes/main/Simple_Map/static/js/majorAirports.json";
// // let airportData = "static/js/majorAirports.json";


// // beware, beware: .then only works with d3.v5 or higher!!
//  d3.json(airportData).then(function(data) {
//     console.log(data);
//     // Creating a GeoJSON layer with the retrieved data.
//   L.geoJSON(data)
//    .bindPopup(function (layer) {
//     return "Airport Code: " + layer.feature.properties.faa +
//     "<hr> Airport name: " + layer.feature.properties.name})
//    .addTo(map);
// });

let quakes_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Retrieve the earthquake GeoJSON data.
d3.json(quakes_url).then(function(data) {

  // why are we defining these functions inside here? weird

  // This function returns the style data for each of the earthquakes we plot on
  // the map. We pass the magnitude of the earthquake into a function
  // to calculate the radius.
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: "#ffae42",
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }

  // This function determines the radius of the earthquake marker based on its magnitude.
  // Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
  function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
  }

  // // Creating a GeoJSON layer with the retrieved data, simplest
  // L.geoJSON(data).addTo(map);
  // Less simple: turn each feature into a circleMarker on the map.
  L.geoJSON(data, 
            {pointToLayer: function(feature, latlng) {
              console.log(data);
              return L.circleMarker(latlng);
              },
            // We set the style for each circleMarker using our styleInfo function.
            style: styleInfo
            }
            ).addTo(map);
});


streets.addTo(map);







