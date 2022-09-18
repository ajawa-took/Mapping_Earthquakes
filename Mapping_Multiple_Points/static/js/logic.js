// Add console.log to check to see if our code is working.
console.log("I am logic.js , what do you want?");

const dom = [55.7428868441541, 37.615418005983436];
const flyover = [40.7, -94.5];
const centerLA = [34.0522, -118.2437];
const offCenter = [34.05, -118.24];

// Create the map object with a center and zoom level.
let map = L.map('mapid').setView(flyover, 4);

cities.forEach(city => {
    console.log(city);
    L.circleMarker(city.location, {radius: city.population/100000})
    .bindPopup("<h2>" + city.city + ", " + city.state +
     "</h2> <hr>  <h3>Population " + city.population.toLocaleString() +
     "</h3>")
    .addTo(map);
});

// //  Add a marker to the map for Los Angeles, California.
// let marker = L.marker(centerLA).addTo(map);

// // radius in meters
// L.circle(centerLA, {
//     color: 'black',
//     fillColor: 'yellow',
//     radius: 300
//  }).addTo(map);

//  // radius in pixels
//  L.circleMarker(offCenter, {
//     color: 'black',
//     fillColor: 'green',
//     radius: 30
//  }).addTo(map);

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
// flavor of map -- streets, dark, terrain -- is in the first url after "/mapbox/"
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);












