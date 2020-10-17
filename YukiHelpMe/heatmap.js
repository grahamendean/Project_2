// Creating intital map object
var myMap = L.map("mapid", {
    center: [40.7128, -74.0060],
    zoom: 13
});

// Creating the tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Location of where the data is coming from
var url = "static/data/append_df.json";


// Load data from json
d3.json(url, function(response) {
    console.log(response);
    // Need an array to hold the coordinates we make the loop search for
    // var latitudeList = []
    // var longitudeList = []

    //     response.forEach(coordinates => {
    //         var lat = coordinates.latitude
    //         var lon = coordinates.longitude
    //         latitudeList.push(lat)
    //         longitudeList.push(lon)
    // });

    var heatArray = [];
        for (var i = 0; i <response.length; i ++) {
            var coordinates = response[i].coordinates;
            
            if (coordinates) {
                heatArray.push([coordinates.latitude[1], coordinates.longitude[0]]);
            }
        }
    L.heatLayer(heatArray, {
     radius: 20,
     blur: 35
    }).addTo(myMap);
});