/* Leaflet Map */

//create map
const map = L.map('map').setView([51.505, -0.09], 2);
//disable zoom
map.touchZoom.disable();
map.doubleClickZoom.disable();
map.scrollWheelZoom.disable();
map.boxZoom.disable();
map.keyboard.disable();

//add tile layers for map
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiaG9wZXJ3MjA3IiwiYSI6ImNrd3FxYzlmYzBwaHIybnMyNHZ6em96YzIifQ.hcBc103RsNSFn3g8FqpsnA'
}).addTo(map);

//create a MapIcon object from Icon class
const MapIcon = L.Icon.extend({

    options: {
        iconUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Circle_Earth-Yellow_Solid.svg/300px-Circle_Earth-Yellow_Solid.svg.png",
        iconSize:     [20,20],
        shadowSize:   [50, 64],
        shadowAnchor: [4, 62],
    }
});

const japanIcon = new MapIcon();

L.marker([35.6762, 139.6503], {icon: japanIcon}).addTo(map);