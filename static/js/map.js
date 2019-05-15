//map object creation
const API_KEY = "pk.eyJ1IjoicmZhZ2dpb2xpIiwiYSI6ImNqdGxrbnc1dDAyaW80OXBkZXR1dXBrZGMifQ.viIT4Q7sPmkN870t_ovBjA";

var myMap = L.map("map", {
   center: [39.8283, -98.5795],
   zoom: 4
 });
 //create dark layer for map
 L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
   maxZoom: 18,
   id: "mapbox.dark",
   accessToken: API_KEY
 }).addTo(myMap);

 //basic simpson icon creation
 var simpIcon = L.icon({
    iconUrl: "../static/images/Simpsons-64.png",
    iconSize: [50,50]
 })
 //easter egg icon creation
 var willieIcon = L.icon({
    iconUrl:"../static/images/willie.png",
    iconSize: [30,30]
 })

//call data for coordinates
d3.json("/Springfield", function(data){
   console.log(data.length);
   //loop through data to pull coordinates
   for(x=0; x<data.length; x++){
      //check for condition to plot correct marker
      if (data[x].country==="USA"){
         //marker creation with pop up
         L.marker([data[x].lat, data[x].lng], {icon: simpIcon})
         .bindPopup(data[x].city + ", " + data[x].state + " " + data[x].country)
         .addTo(myMap);
      }
      else{
         //marker creation with popup
         L.marker([data[x].lat, data[x].lng], {icon: willieIcon})
         .bindPopup(data[x].city + ", " + data[x].state + " " + data[x].country)
         .addTo(myMap);
      }
      
   }


   
})


