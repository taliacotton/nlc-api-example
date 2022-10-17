let shadow = document.getElementById("shadow");


let zip = "90210";

let myUrl = `https://api.weatherapi.com/v1/current.json?key=b154cb6219034df9987192656221010&q=${zip}&aqi=no`;

fetch(myUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        let windDeg = data.current.wind_degree;
        console.log(windDeg);
        
        let xMultiplier = Math.abs(map(windDeg, 0, 360, -1, 1));

        let skewVal = map(windDeg, 0, 360, 70, -70);
        let translateVal = map(windDeg, 0, 360, -10, 10) * xMultiplier * 12;
        shadow.style.transform = `scaleY(-1) skew(${skewVal}deg) translateX(${translateVal}px)`;

    })
    .catch(function (err) {
        console.log("Something went wrong!", err);
    });






// document.addEventListener("mousemove", function(e){
//     let xMultiplier = Math.abs(map(e.clientX, 0, window.innerWidth, -1, 1));

//     let skewVal = map(e.clientX, 0, window.innerWidth, 70, -70);
//     let translateVal = map(e.clientX, 0, window.innerWidth, -10, 10) * xMultiplier * 12;
//     shadow.style.transform = `scaleY(-1) skew(${skewVal}deg) translateX(${translateVal}px)`;
// })  



function map(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}