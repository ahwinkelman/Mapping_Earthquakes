// Add console.log to check to see if our code is working.
console.log("working");

// // Create the map object with center and zoom level.
// let map = L.map('mapid').setView([30, 30], 2);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

//Dark view tile layer 
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}',{
  attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY  
});

// Create a base layer that holds both maps.
let baseMaps = {
  Street: streets,
  Dark: dark
};

// Create the map object with center and zoom level.
let map = L.map('mapid',{
  center:[30, 30],
  zoom: 2,
  layers: [streets]
});


//Pass our map layers into our layer control and add the layer control to the map
L.control.layers(baseMaps).addTo(map);


// Accessing the airport GeoJSON URL
let torontoData ="https://raw.githubusercontent.com/ahwinkelman/Mapping_Earthquakes/main/Mapping_GeoJSON_Linestrings/torontoRoutes.json";

// Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data) {
    console.log(data);
// Create a style for the lines.
L.geoJSON(data, {
  color: "#ffffa1",
  weight: 2,
  onEachFeature: function(feature, layer) {
    layer.bindPopup("<h3> Airline: " + feature.properties.airline + "</h3> <hr><h3> Destination : "
    + feature.properties.dst + "</h3>");
  }
})
// let myStyle = {
//   color: "#ffffa1",
//   weight: 2
// }
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data).addTo(map);
});   



