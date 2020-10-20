// Creating map object
var myMap = L.map('map').setView([37.8, -96], 4);

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/light-v10",
  accessToken: API_KEY
}).addTo(myMap);

var geoData = "static/data/ozone.geojson";
var geojson;

// load GeoJSON from an external file
d3.json(geoData,function(data){
  // add GeoJSON layer to the map once the file is loaded
  var ozoneData = L.geoJson(data,{
    pointToLayer: function(feature,latlng){
      var marker = L.marker(latlng);
      marker.bindPopup(' City: ' + feature.properties.cityName + '<br/>' + 'Average Ozone Index: ' + feature.properties.arithmeticMean);
      return marker;
    }
  });
  var clusters = L.markerClusterGroup();
  clusters.addLayer(ozoneData);
  myMap.addLayer(clusters);
});
// -------------------------------------------------------------------------------------------------
// NEED TO SOMEHOW GET THE ACTUAL READINGS TO HAVE DIFFERENT COLORS TO HIGHLIGHT HIGHEST AND LOWEST
// THIS MAP SHOWS THE LOCATION OF WHERE TESTING WAS DONE, AND RESULTS ARE GENERATED UPON A CLICK.
// -------------------------------------------------------------------------------------------------


// // Creating map object
// var myMap = L.map('map').setView([37.8, -96], 4);

// // Adding tile layer
// L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//   attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//   tileSize: 512,
//   maxZoom: 18,
//   zoomOffset: -1,
//   id: "mapbox/light-v10",
//   accessToken: API_KEY
// }).addTo(myMap);

// // Load in geojson data
// var geoData = "static/data/ozone.geojson";

// // var geojson;

// // Grab data with d3
// d3.json(geoData, function(data) {
//   console.log(data)

//   // Create a new marker cluster group
//   markers = L.markerClusterGroup();

//   // Loop through the data
//   for (var i = 0; i < data.length; i++) {

//     // set the GEOMETRY location property to a variable
//     var geometry = data[i].features.geometry;

//     // check for GEOMETRY location property
//     if (geometry) {

//       // Add a new marker to the cluster group and bind a pop-up
//       markers.addLayer(L.marker([features.geometry.coordinates[0][1], features.geometry.coordinates[0][1]])
//         .bindPopup(data[i].descriptor));
//     }
//   }

//   // Add marker cluster layer to the map
//   myMap.addLayer(markers);

// });
// --------------------------------------------------------------------------------------------------