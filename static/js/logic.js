let newYorkCoords = [40.73, -74.0059];
let mapZoomLevel = 12;

let url = "https://gbfs.citibikenyc.com/gbfs/en/station_information.json"
d3.json(url).then(function(response))

L.map("map-id", {
  center: newYorkCoords,
  zoom: mapZoomLevel
});

// Create the createMap function.
function createMap(bikeStations) {
  d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json").then((data) => {


  // Create the tile layer that will be the background of our map.
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

  // Create a baseMaps object to hold the lightmap layer.
  let baseMap = {
    street: lightmap
  }
  
  
  // Create an overlayMaps object to hold the bikeStations layer.
let overlayMaps = {
  "Bike Stations": bikeStations
};

  // Create the map object with options.
  let myMap = L.map("map-id", {
    center: newYorkCoords,
    zoom: mapZoomLevel,
    layers: [lightmap, bikeStations]
  });

  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMap,overlayMaps).addTo(myMap)  
})
}

// Create the createMarkers function.
function createMarkers(response) {
  // Pull the "stations" property from response.data.
  let stations = response.data.stations
  // Initialize an array to hold the bike markers.
  let bikeMarkers = []
  // Loop through the stations array.
  stations.forEach(d=> {
    // For each station, create a marker, and bind a popup with the station's name.
    let marker = L.marker([d.lat,d.lon])
    // Add the marker to the bikeMarkers array.
    bikeMarkers.push(marker)
  })
  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
  // console.log(L.layerGroup(bikeMarkers))
  
}
// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
// d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json").then((createMarkers) => {
//   console.log(createMarkers);

// });


d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json").then((response) => {
  console.log(response);

});

