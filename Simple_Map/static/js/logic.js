// Add console.log to check to see if our code is working.
console.log("I am logic.js , what do you want?");

const mapCenter = [37.5, -122.5]
// [55.7428868441541, 37.615418005983436];

// Create the map object with a center and zoom level.
let map = L.map('mapid').setView(mapCenter, 10);

// adding GeoJSON data from data.js
// one-feature easy way: L.geoJSON(sanFranAirport).addTo(map);
L.geoJSON(sanFranAirport, {
    // // We turn each feature into a marker on the map.
    // pointToLayer: function(feature, latlng) {
    //   console.log(feature);
    //   return L.marker(latlng)
    //   .bindPopup("<h2>" + feature.properties.city + "</h2>");
    // }
    onEachFeature: function(feature, layer) {
        console.log(layer);
        layer.bindPopup("Airport code: " + feature.properties.faa +
            "<hr> Airport name: " + feature.properties.name);
       }
  }).addTo(map);

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
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);












