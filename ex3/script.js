let shadow = document.getElementById("shadow");

let currentDate = new Date();
console.log(currentDate);
let year = currentDate.getFullYear();
let month = currentDate.getMonth() + 1;
let day = currentDate.getDate();

console.log(year, month, day);

// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '51c0316e31mshee4f7efa52e21a5p1bb922jsnffdf78609987',
// 		'X-RapidAPI-Host': 'sunrise-sunset-times.p.rapidapi.com'
// 	}
// };

// let UTCDate = new Date().toUTCString();
// console.log(UTCDate);

// fetch(`https://sunrise-sunset-times.p.rapidapi.com/getSunriseAndSunset?date=${year}-${month}-${day}&latitude=51.5072&longitude=-0.1276&timeZoneId=America%2FNew_York`, options)
// 	.then(response => response.json())
// 	.then(response => {
//         console.log(response);
//         console.log(response.sunrise)
//         console.log(response.sunrise.slice(11, 16))
//     })
// 	.catch(err => console.error(err));

// USED THIS API
// https://rapidapi.com/mvpcapi/api/geo-services-by-mvpc-com/

let nyLat = 40.7128;
let nyLon = 74.0060;

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '51c0316e31mshee4f7efa52e21a5p1bb922jsnffdf78609987',
		'X-RapidAPI-Host': 'geo-services-by-mvpc-com.p.rapidapi.com'
	}
};

fetch(`https://geo-services-by-mvpc-com.p.rapidapi.com/sun_positions?location=${nyLat}%2C${nyLon}&date=${year}-${month}-${day}`, options)
	.then(response => response.json())
	.then(response => {
		console.log(response)
		console.log(response.data.sunrise);
		// let startTime = Date.parse(response.data.sunrise);
		console.log(new Date(response.data.sunrise), new Date(response.data.sunset))
		let startTime = new Date(response.data.sunrise).getTime() ;

		// console.log(response.data.sunrise, Date.parse(response.data.sunrise), new Date(response.data.sunrise))
		// timestamp
		let endTime = new Date(response.data.sunset).getTime();
		// let currentUTCTime = Date.parse(new Date());
		// let currentUTCTime = new Date().getUTCDate();

		let currentUTCTime = new Date().getTime();
		// var date = new Date();
		// Date.parse(new Date().toISOString());

		console.log(startTime, endTime, currentUTCTime);

		let xMultiplier = Math.abs(map(currentUTCTime, startTime, endTime, -1, 1));
		let skewVal = map(currentUTCTime, startTime, endTime, 70, -70);
		let translateVal = map(currentUTCTime, startTime, endTime, -10, 10) * xMultiplier * 12;

		if (currentUTCTime > startTime && currentUTCTime < endTime){
			console.log("day")
			shadow.style.transform = `scaleY(-1) skew(${skewVal}deg) translateX(${translateVal}px)`;
			document.body.classList.remove("night");
		} else {
			console.log("night")
			document.body.classList.add("night");
		}
		
		
	})
	.catch(err => console.error(err));



// document.addEventListener("mousemove", function(e){
//     let xMultiplier = Math.abs(map(e.clientX, 0, window.innerWidth, -1, 1));

//     let skewVal = map(e.clientX, 0, window.innerWidth, 70, -70);
//     let translateVal = map(e.clientX, 0, window.innerWidth, -10, 10) * xMultiplier * 12;
//     shadow.style.transform = `scaleY(-1) skew(${skewVal}deg) translateX(${translateVal}px)`;
// })  



function map(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}