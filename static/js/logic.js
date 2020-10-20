// Store our API endpoint inside queryUrl
var queryUrl = "../Data/merge2.json";

// Perform a GET request to the query URL
d3.json(queryUrl, function (data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.feature);
  var cooridnates = [(data.latitude) , (data.longitude)]
  console.log(cooridnates)
  console.log(data.feature)
});


//createFeatures function to have pop up and also create the circles 
function createFeatures(stateData) {
    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>Place: " + feature.cooridnates + "<h3>Magnitude: " + feature.ozone + "</h3>" +
          "</h3>")
      }
      var states = L.geoJSON(stateData, {
          onEachFeature: onEachFeature
    // pointToLayer: function (feature, cord) {
    //   return new L.circle(cord,
    //     {
    //       radius: findRadius(feature.ozone_mean),
    //       fillColor: findColor(feature.cooridnates),
    //       fillOpacity: .5,
    //       color: "white",
    //       stroke: true,
    //       weight: .8
    //     })
    // }
  });

  // Sending our states layer to the createMap function
  createMap(states);
}

// //color function

// function findColor(depth) {
//   if (depth < 20) {
//     return 'green'
//   } else if (depth < 40) {
//     return 'orange'
//   } else if (depth > 39) {
//     return 'red'
//   };
// };

// // radius function
// function findRadius(magnitude) {
//   return magnitude * 20000;
// };

function createMap(states) {

  // Define streetmap and darkmap layers
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  });
  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Light Map": lightmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    states: states
  };

  // Create our map, giving it the streetmap and states layers to display on load
  var myMap = L.map("mapid", {
    center: [
      37.09, -105.71
    ],
    zoom: 5,
    layers: [lightmap, states]
  });
//   var marker = L.marker([feature.latitude + feature.longitude]).addTo(myMap);

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);


  //legend layer


  // Set up the legend
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function () {
    var div = L.DomUtil.create("div", "info legend");

    // Add min & max
    var legendInfo =
      '<div style="background:green"><h1>< 20</h1></div>\
        <div style="background:orange"><h1>< 40</h1></div>\
        <div style="background:red"><h1>> 40</h1></div>'

    div.innerHTML = legendInfo;

    return div;
  };

  // Adding legend to the map
  legend.addTo(myMap);

}
