<template>
  <main>
  <div id="mapContainer" class="w-[100vw] h-[90vh]">
  </div>
  <router-link :to="{ name: 'settings'}" class="absolute top-0 right-0 z-[400] text-3xl"> &#9881; </router-link>
  <button @click="click()" class="absolute top-0 right-8 z-[400] text-white border border-blue-700 bg-darkBlue font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">Feedback</button>
  <div class="grid grid-cols-2 items-center h-[10vh]">
    <div class="flex justify-center" v-if="this.$store.state.deutsch">
      <button @click="changeIcon()" class="text-white border border-blue-700 bg-darkBlue focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center w-[40%]"> Ansicht ändern</button>
    </div>
    <div class="flex justify-center" v-if="this.$store.state.english">
      <button @click="changeIcon()" class="text-white border border-blue-700 bg-darkBlue focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center w-[40%]"> Change view</button>
    </div>
    <div class="slidecontainer relative ">
      <div class="range-value" id="rangeV"></div>
      <input type="range" min="0" value="1" class="slider" id="myRange">
    </div>
  </div>
</main>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Server from '../server'


export default {
  name: "LeafletMap",
  data() {
    return {
    };
  },
  methods:{
    changeIcon(){
      var curIcons = [];
      for (var i=0; i<markersArray.length; i++) {
        curIcons.push(markersOnMap[i].getIcon());
      }
      for (var i=0; i<markersArray.length; i++) {
      if(!curIcons.includes(greenSmile) && !curIcons.includes(yellowSmile) && !curIcons.includes(redSmile)){
            if(markersArray[i][2] - markersArray[i][3] >= 3){
              markersOnMap[i].setIcon(greenSmile)
            }
            if(markersArray[i][2] - markersArray[i][3] <= -3){
              markersOnMap[i].setIcon(redSmile)
            }
            if(markersArray[i][2] - markersArray[i][3] < 3 && markersArray[i][2] - markersArray[i][3] > -3){
              markersOnMap[i].setIcon(yellowSmile)
            }
        }else{
          markersOnMap[i].setIcon(makeDiv(markersArray[i][2], markersArray[i][3]))
        }
      }
    },
    async update(){
      var data = []
      data = await Server.getPosts()
      for(var i=0; i<=data.length-1; i++){
        markers.push([data[i].Latitude, data[i].Longitude, data[i].Positive_Affect, data[i].Negative_Affect, data[i].createdAt,
      [data[i].active, data[i].upset, data[i].hostile, data[i].inspired, data[i].ashamed, data[i].alert, data[i].nervous, data[i].determined, data[i].attentive, data[i].afraid]])
      }
      storeGerman = this.$store.state.deutsch;
      storeEnglish = this.$store.state.english;
      sortDates();
    },
    click(){
      window.open('https://limesurvey.imis.uni-luebeck.de/index.php/551661?lang=de');
    }
  },
  mounted() {
    this.update().then(() => {
      map = L.map("mapContainer", {minZoom: 12, maxZoom: 17}).setView([53.87, 10.68], 15);
      L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      map.addLayer(new GridInfo({minZoom:12, maxZoom:17}));  //minNativeZoom:15, maxNativeZoom:15
      var slider = document.getElementById("myRange");
      var rangeV = document.getElementById('rangeV');
      this.$store.commit('backToMap')
      slider.step = getSteps()
      slider.max = dateList2.length-1
      slider.value = dateList2.length-1;
      const datetoday = new Date();
      rangeV.textContent = getDateInput(datetoday.getMonth(), datetoday.getFullYear());
      slider.addEventListener("input", function(){
        value = slider.value;
        sliderF(value)
        rangeV.textContent = getDate();
      })
      map.on('zoomstart', function(){
        for(var j=0; j< markersOnMap.length; j++){ markersOnMap[j].remove()}
        markersArray = []
        markersOnMap = []
        centerArray = []
        tileBoundsArray = []
        slider.value = dateList2.length-1;
      })
    })    
  },
  onBeforeUnmount() {
    if (map) {
      map.remove();
    }
  },
};
var map; // the map
var storeGerman;
var storeEnglish;
var markersArray = []; // array with the marker variables on the map not marker objects 
var markersOnMap = []; // array with marker objects on the map
var markers = [];      // array with all marker variables from the database
var markersByDate = []; // marker array sorted by date
var centerArray = [];   // center lat lng for all grid tiles on map
var tileBoundsArray = []; // bounds of all tiles on map
var value;  // value of the slider
var currentMarkerDate = []; // date of marker for the slider

var greenSmile = L.icon({
    iconUrl: '/emojis-6684004_12802.png',
    iconSize:     [38, 38], // size of the icon
})
var yellowSmile = L.icon({
    iconUrl: '/emojis-6684004_12801.png',
    iconSize:     [38, 38], // size of the icon
})
var redSmile = L.icon({
    iconUrl: '/emojis-6684004_1280.png',
    iconSize:     [38, 38], // size of the icon
})

  var GridInfo = L.GridLayer.extend({

       createTile: function (coords) { 

        var tile = document.createElement('div');
        //tile.className = "infotile";
        tile.style.outline = '1px solid black';
        tile.style.height = '100px';
        tile.style.width = '100px';

        var tileBounds = this._tileCoordsToBounds(coords);
        var center = tileBounds.getCenter();
        tileBoundsArray.push(tileBounds);
        centerArray.push(center);
        checkBounds(tileBounds, center, markers)
        return tile;
        
        }
      });


function makeDiv(green, red){
       return L.divIcon({html: '<div class="grid grid-cols-2 items-end w-10 h-10"><div class="bg-green col-end-1 w-5" style="height:'+((Math.ceil(green))*2)*4+'px"></div><div class="bg-red w-5" style="height:'+((Math.ceil(red))*2)*4+'px"></div></div><div class="triangle"></div>',
          iconSize:     [40, 40],
          className: 'balken'
        })
      
      }

function makeMarker(lat, lng, green, red, num, werte){
      var marker = L.marker([lat,lng],
        {
        icon: L.divIcon({html: '<div class="grid grid-cols-2 items-end w-10 h-10"><div class="bg-green col-end-1 w-5" style="height:'+((Math.ceil(green))*2)*4+'px"></div><div class="bg-red w-5" style="height:'+((Math.ceil(red))*2)*4+'px"></div></div><div class="triangle"></div>',
        iconSize:     [40, 40],
        className: 'balken'
        }),
        }
      )
      // no markers on map create one
      if(markersOnMap.length === 0){
        marker.addTo(map).bindPopup(makePopup(werte, green, red, num))
        markersArray.push([lat,lng, green, red]);
        markersOnMap.push(marker)
      }
      // check if marker already exists. if not create 
      var markerLat = []
      var markerLng = []
      for(var i=0; i< markersOnMap.length; i++){
        markerLat.push(markersOnMap[i].getLatLng().lat)
        markerLng.push(markersOnMap[i].getLatLng().lng) 
      }
      if(!(markerLat.includes(marker.getLatLng().lat) && markerLng.includes(marker.getLatLng().lng))){
        marker.addTo(map).bindPopup(makePopup(werte, green, red, num))
        markersArray.push([lat,lng, green, red]);
        markersOnMap.push(marker)
        }          
}
function makePopup(werte, green, red, num){
  var popup;
  if(storeGerman){ 
    popup = '<b>Emotionswerte:</b><table><tr><th>Positiv</th><th>Negativ</th></tr><tr><td>Aktiv: '+werte[0]+'</td><td>Verärgert: '+werte[1]+'</td></tr><tr><td>Angeregt: '+werte[3]+'</td><td>Feindselig: '+werte[2]+'</td><tr><td>Alert: '+werte[5]+'</td><td>Ashamed: '+werte[4]+
            '</td></tr><tr><td>Entschlossen: '+werte[7]+' </td><td> Nervös: '+werte[6]+'</td></tr><tr><td>Aufmerksam: '+werte[8]+'</td><td>Ängstlich: '+werte[9]+'</td></tr><tr><td>Durchscnitt: '+green+'/5  </td><td>Durchschnitt: '+red+'/5 </td></tr></table>Anzahl der Teilnehmer: '+num+'';
  }
  if(storeEnglish){
    popup = '<b>Emotional values:</b><table><tr><th>Positive</th><th>Negative</th></tr><tr><td>Active: '+werte[0]+'</td><td>Upset: '+werte[1]+'</td></tr><tr><td>Inspired: '+werte[3]+'</td><td>Hostile: '+werte[2]+'</td><tr><td>Wach: '+werte[5]+'</td><td>Beschämt: '+werte[4]+
            '</td></tr><tr><td>Determined: '+werte[7]+'</td><td>Nervous: '+werte[6]+'</td></tr><tr><td>Attentive: '+werte[8]+'</td><td>Afraid: '+werte[9]+'</td></tr><tr><td>Average: '+green+'</td><td>Average: '+red+'</td></tr></table>Number of participants: '+num+'';
  }
  return popup
}
function checkBounds(bounds, center, markersV){
  var PA = 0;
  var NA = 0;
  var werte = [];
  var j= 0;
  if (markersV.length === 0) { console.log("Array is empty!") }
  for (var i=0; i<markersV.length; i++) {
    var latLng = new L.LatLng(markersV[i][0], markersV[i][1])
    if(bounds.contains(latLng)){
     j+=1
     PA = (PA+markersV[i][2])
     NA = (NA+markersV[i][3])
    if(werte.length === 0){
      for(var k=0; k< markers[i][5].length; k++){
        werte.push(markersV[i][5][k])
      }
    } else{
        for(var k=0; k< markers[i][5].length; k++){
          werte[k] = ((werte[k]+markersV[i][5][k]))
        }
      }
    }
    if(i == markersV.length-1 && PA != 0 && NA != 0){
      for(var q=0; q< werte.length; q++){werte[q] = (werte[q]/j).toFixed(2)}
      PA = PA/j
      NA = NA/j
      makeMarker(center.lat,center.lng, PA.toFixed(2), NA.toFixed(2), j, werte);
      j=0;
     }
  }
}
function sortDates(){
  var temp = markers;
  temp.sort((a, b) => new Date(a[4]) - new Date(b[4]));
  markersByDate = temp;
}
function sliderF(value){
  for(var j=0; j< markersOnMap.length; j++){ markersOnMap[j].remove()}
  markersOnMap = []
  markersArray = []
  var curMark = [];
  for(var i=0; i< markers.length; i++){
      if(markers[i][4].toLocaleDateString(undefined, { month: 'numeric', year: 'numeric'}) <= dateList2[Math.floor(value)]){
        curMark.push(markers[i])
        currentMarkerDate = []
        currentMarkerDate.push( markers[i][4].getMonth(),  markers[i][4].getFullYear())
    }
  }
  for(var m=0; m < centerArray.length; m++){
    checkBounds(tileBoundsArray[m], centerArray[m], curMark);
  }
}
var dateList2 = []
function getSteps(){
  var dateList = [];
  var steps;
  var options = { month: 'numeric', year: 'numeric'};
  for(var i=0; i< markersByDate.length; i++){
    let d = markersByDate[i][4]
    if(!dateList.includes(d.toLocaleDateString(undefined, options))){
      dateList.push(d.toLocaleDateString(undefined, options))
    }
  }
  steps = 1
  dateList2 = dateList;
  return steps
}

function getDate(){
  var monthNames = []
  if(storeGerman){
    monthNames = ["Januar", "Februar", "März", "April", "Mai", "Juni",
    "Juli", "August", "September", "Oktober", "November", "Dezember"];
  }
  if(storeEnglish){
    monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]
  }
  var date = monthNames[currentMarkerDate[0]]+' '+currentMarkerDate[1];
  return date;
}
function getDateInput(month, year){
  var monthNames = []
  if(storeGerman){
    monthNames = ["Januar", "Februar", "März", "April", "Mai", "Juni",
    "Juli", "August", "September", "Oktober", "November", "Dezember"];
  }
  if(storeEnglish){
    monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]
  }
  var date = monthNames[month]+' '+year;
  return date;

}

//https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

</script>

<style>
.slider {
  -webkit-appearance: none;
  width: 80%;
  height: 15px;
  border-radius: 5px;  
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%; 
  background: rgb(0, 106, 163);
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: rgb(0, 106, 163);
  cursor: pointer;
}
.triangle {
   width: 0px;
   height: 0px;
   border-style: solid;
   border-width: 0 20px 10px 20px;
   border-color: transparent transparent #e0f2fe transparent;
   transform: rotate(180deg);
}
td
{
    padding:0 5px 0 5px;
}
</style>