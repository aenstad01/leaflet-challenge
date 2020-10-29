// Same process as Activity 17.3:
function createMap(earthquakes) {

  // Create the tile layer that will be the background of our map
  var satelliteMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "satellite-streets-v11",
    accessToken: API_KEY
  });

  // Create the Greyscale Layer
  var greyscaleMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  });

  // Create the Outdoors Layer
  var outdoorsMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "outdoors-v11",
    accessToken: API_KEY
  });

  // Create a baseMaps object to hold the satellite layer
  var baseMaps = {
    "Satellite": satelliteMap,
    "Greyscale": greyscaleMap,
    "Outdoors": outdoorsMap
  };

  // Create an overlayMaps object to hold the Earthquakes
  var overlayMaps = {
    "Earthquakes": earthquakes,
  };

  // Create the map object with options
  var map = L.map("map-id", {
    center: [40.73, -74.0059],
    zoom: 3,
    layers: [satelliteMap, earthquakes]
  });


  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}

// Create the map markers
function createMarkers(response) {

  // Pull the "features" property off of response.data
  var locations = response.features;

  // Initialize an array to hold bike markers
  var earthquakeMarkers = [];

  // Loop through the earthquakes array
  for (var index = 0; index < locations.length; index++) {

    var earthquake = locations[index];
    lon = earthquake.geometry.coordinates[0];
    lat = earthquake.geometry.coordinates[1];
    depth = earthquake.geometry.coordinates[2];
    magnitude = earthquake.properties.mag;
    detailLink = earthquake.properties.detail;

    // Logic to decide what colors the bubbles are
    if (depth > 8) {
      color = "red";
    }
    else if (depth > 5) {
      color = "orange";
    }
    else if (depth > 3) {
      color = "yellow";
    }
    else {
      color = "#FFFFC2";
    }

    // For each earthquake location, create a marker and bind a popup with the earthquakes's name
    var earthquakeMarker = L.circle(([lat, lon]), {
      radius: (magnitude * 20000),
      color: color,
      fillColor: color

    }).bindPopup("<h3> Location: " + earthquake.properties.place + "</h3><h3>Magnitude: " + magnitude + "</h3>" + "</h3><h3>Depth: " + depth + "</h3>" + "</h3><h3><a href='" + detailLink + "' target='_blank'>See Details</a></h3>");

    // Add the marker to the bikeMarkers array
    earthquakeMarkers.push(earthquakeMarker);
  }

  // Create a layer group made from the earthquake markers array, pass it into the createMap function
  createMap(L.layerGroup(earthquakeMarkers));

}

//Add a legend (see 2.4 activity)


// Perform the API call to retrieve earthquake info
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(createMarkers);


  //\\//\\ Bonus Section //\\//\\

// // Techtonic plates
// d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(createTechtonicPlates);


// function createTechtonicPlates(response) {
//   var coordinates = response.features[0].geometry.coordinates;
//   var geometry = response.features[0].geometry;

//   var techtonicPlates = [geometry];

//   console.log(techtonicPlates);

//   L.geoJSON(techtonicPlates, {
//   }).addTo(map);
// }








// Code from Niharika (not working)

// function addTechtonicPlates(techtonicPlates) {
// d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json", function(tdata) {
//   L.geoJSON(tdata, {
//   }).addTo(techtonicPlates);
//   techtonicPlates.addTo(map);
