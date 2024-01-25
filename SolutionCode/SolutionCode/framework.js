"use strict";

let excersiceInfo;

function initialiseWebpage(params) {
    // setup webpage with all needed elements, e.g. creating the title and the canvas to draw on etc.
    const main = document.getElementById("main");
    excersiceInfo = getExcerciseInfo();

    const title = document.createElement("h1");
    title.style.fontFamily = "Avenir";
    title.style.textAlign = "center";
    title.textContent = "Designuebung";
    main.appendChild(title);

    const subTitle = document.createElement("h2");
    subTitle.style.fontFamily = "Avenir";
    subTitle.style.textAlign = "center";
    subTitle.textContent = "Kemal Yazgan";
    main.appendChild(subTitle);
    document.title = "Vis WS 21/22 Übung " + excersiceInfo.excerciseNumber;

    const source = document.createElement("div");
    source.id = "source";
    source.style.fontFamily = "inherit";
    source.style.textAlign = "center";
    source.textContent = "source: " + getExcerciseInfo().source;
    main.appendChild(source);

    const canvas = document.createElement("div");
    canvas.id = "canvas";
    canvas.style.width = params.width + "px";
    canvas.style.height = params.height + "px";
    canvas.style.margin = "4rem auto";
    canvas.fill = "None"
    main.appendChild(canvas);

    return canvas;
}

function main() {
    if (document.getElementById("canvas")) return; // already initialised

    const params = {
        width: 1,
        height: 1,
        xRangeMin: 0,
        xRangeMax: 100,
        yRangeMin: 0,
        yRangeMax: 100,
        margin: 0,
    };

    const canvas = initialiseWebpage(params);

    // this is how to setup two.js for further information look into https://two.js.org/
    const two = new Two(params);
    two.appendTo(canvas);
    draw(two); // drawing action happening in app.js
    if (excersiceInfo.isAnimated) two.play();
    else two.update();
}

// call main function so something actually happens
main();