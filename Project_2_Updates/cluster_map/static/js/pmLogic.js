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

var geoData = "static/data/pm.geojson";
var geojson;

// load GeoJSON from an external file
d3.json(geoData,function(data){
    console.log(data);
  // add GeoJSON layer to the map once the file is loaded
  var pmData = L.geoJson(data,{
    pointToLayer: function(feature,latlng){
      var marker = L.marker(latlng);
      marker.bindPopup(' City: ' + feature.properties.city + '<br/>' + 'Average PM Index: ' + feature.properties.average);
      return marker;
    }
  });
  var clusters = L.markerClusterGroup();
  clusters.addLayer(pmData);
  myMap.addLayer(clusters);
});