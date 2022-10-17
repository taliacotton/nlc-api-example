let shadow = document.getElementById("shadow");

document.addEventListener("mousemove", function(e){
    let xMultiplier = Math.abs(map(e.clientX, 0, window.innerWidth, -1, 1));
    console.log(xMultiplier);


    let skewVal = map(e.clientX, 0, window.innerWidth, 70, -70);
    let translateVal = map(e.clientX, 0, window.innerWidth, -10, 10) * xMultiplier * 12;
    shadow.style.transform = `scaleY(-1) skew(${skewVal}deg) translateX(${translateVal}px)`;
})  



function map(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}