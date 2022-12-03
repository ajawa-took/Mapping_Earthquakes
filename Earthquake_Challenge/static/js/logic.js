// Add console.log to check to see if our code is even getting called.
console.log("I am logic.js , what do you want?");

//                      ALL FIXED STUFF, INDEPENDENT OF JSONs

const dom = [55.7428868441541, 37.615418005983436];
const flyover = [40.7, -94.5];
const moduleCenter = [30,30];

// Create the map object with a center and zoom level.
let map = L.map('mapid').setView(dom, 2);

// We create two tile layers that will be the background of our map. styles streets-v11, satellite-v9
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// collect the two background tile-layers that user will choose from
let baseMaps = {"Streets": streets, "Satellite": satelliteStreets };

// Create the earthquake layer for our map.
let earthquakes = new L.layerGroup();

// We define an object that contains the overlays.
let overlays = {  Earthquakes: earthquakes };

// Then we add a control to the map that will allow the user to change which layers are visible.
L.control.layers(baseMaps, overlays).addTo(map);

// next three sttaements build a legend; beware stuff is also needed in css file!
// Create a legend control object.
let legend = L.control({  position: "bottomright" });
// Then add all the details for the legend.
legend.onAdd = function() {
  let div = L.DomUtil.create("div", "info legend");
  const magnitudes = [0, 1, 2, 3, 4, 5];
  const colors = [  "#98ee00",  "#d4ee00",  "#eecc00",  "#ee9c00",  "#ea822c",  "#ea2c2c"  ];
  // Looping through our intervals to generate a label with a colored square for each interval.
  for (var i = 0; i < magnitudes.length; i++) {
    console.log(colors[i]);
    div.innerHTML +=
      "<i style='background: " + colors[i] + "'></i> " +
      magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
  }
  return div;
};
// add legend to map
legend.addTo(map);


//                      NOW WE GET EARTHQUAKES JSON AND DO STUFF WITH IT

let quakes_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Retrieve the earthquake GeoJSON data, then add customized markers to a geoJSON layer,
// add that geoJSON layer to the earthquakes layer, and add the earthquakes layer to map
d3.json(quakes_url).then(function(data) {

  // why are we defining these functions inside here? weird

  // This function returns the style data for each of the earthquakes we plot on the map. 
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.mag), // "#ffae42"
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

  // This function determines the color of the circle based on the magnitude of the earthquake.
  function getColor(magnitude) {
    if (magnitude > 5) {
      return "#ea2c2c";
    }
    if (magnitude > 4) {
      return "#ea822c";
    }
    if (magnitude > 3) {
      return "#ee9c00";
    }
    if (magnitude > 2) {
      return "#eecc00";
    }
    if (magnitude > 1) {
      return "#d4ee00";
    }
    return "#98ee00";
  }  

  // Creating a GeoJSON layer with the retrieved data
  // basic syntax: L.geoJSON(stuff_to_plot, {dictionary of options whose values are functions})
  L.geoJSON(data, 
            {
              // this first option makes circles and logs data in colsole for debugging
              pointToLayer: function(feature, latlng) {
                console.log(data);
                return L.circleMarker(latlng);
                },
              // this second option changes circle colors and sizes styleInfo function.
              style: styleInfo,
              // this third option adds pop-ups to markers
              onEachFeature: function(feature, layer) {
                layer.bindPopup("Magnitude: " + feature.properties.mag + 
                "<br>Location: " + feature.properties.place+
                "<br>Date: " + new Date(feature.properties.time).toLocaleDateString('en-US'));
                }
            }
            ).addTo(earthquakes);
            // the line above adds the markers to the earthquakes layer
  // and then we add that earthquakes layer to the map
  earthquakes.addTo(map);
});

// without the next line, map first displays with no tiles; not sure this is the right way to solve that
streets.addTo(map);








