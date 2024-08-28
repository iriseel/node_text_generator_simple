let mainColor;
let bgColor = "orange";
let CultureHubBlue = "#1eb5f5";

// DRAW VARIABLES
let strokeValueThin = 4;
let strokeValueThick = 12;

// TEXT VARIABLES
let font;
let points = [];
let progress = 0;
let endPoints = [];

let minGap = 1;
// let maxGap = 4;
// let gap = 1;
const fontSize = 240;

let CULTUREHUB = [
    { letter: "C", points: [], width: undefined },
    { letter: "U", points: [], width: undefined },
    { letter: "L", points: [], width: undefined },
    { letter: "T", points: [], width: undefined },
    { letter: "U", points: [], width: undefined },
    { letter: "R", points: [], width: undefined },
    { letter: "E", points: [], width: undefined },
    { letter: "H", points: [], width: undefined },
    { letter: "U", points: [], width: undefined },
    { letter: "B", points: [], width: undefined },
];

let Resident = [
    { letter: "R", points: [], width: undefined },
    { letter: "e", points: [], width: undefined },
    { letter: "s", points: [], width: undefined },
    { letter: "i", points: [], width: undefined },
    { letter: "d", points: [], width: undefined },
    { letter: "e", points: [], width: undefined },
    { letter: "n", points: [], width: undefined },
    { letter: "t", points: [], width: undefined },
];

let Artists = [
    { letter: "A", points: [], width: undefined },
    { letter: "r", points: [], width: undefined },
    { letter: "t", points: [], width: undefined },
    { letter: "i", points: [], width: undefined },
    { letter: "s", points: [], width: undefined },
    { letter: "t", points: [], width: undefined },
    { letter: "s", points: [], width: undefined },
];

let year = [
    { letter: "2", points: [], width: undefined },
    { letter: "0", points: [], width: undefined },
    { letter: "2", points: [], width: undefined },
    { letter: "4", points: [], width: undefined },
    { letter: "-", points: [], width: undefined },
    { letter: "2", points: [], width: undefined },
    { letter: "0", points: [], width: undefined },
    { letter: "2", points: [], width: undefined },
    { letter: "5", points: [], width: undefined },
];

let ArtJones = [
    { letter: "A", points: [], width: undefined },
    { letter: "r", points: [], width: undefined },
    { letter: "t", points: [], width: undefined },
    { letter: " ", points: [], width: undefined },
    { letter: "J", points: [], width: undefined },
    { letter: "o", points: [], width: undefined },
    { letter: "n", points: [], width: undefined },
    { letter: "e", points: [], width: undefined },
    { letter: "s", points: [], width: undefined },
];

let BigArtGroup = [
    { letter: "B", points: [], width: undefined },
    { letter: "i", points: [], width: undefined },
    { letter: "g", points: [], width: undefined },
    { letter: " ", points: [], width: undefined },
    { letter: "A", points: [], width: undefined },
    { letter: "r", points: [], width: undefined },
    { letter: "t", points: [], width: undefined },
    { letter: " ", points: [], width: undefined },
    { letter: "G", points: [], width: undefined },
    { letter: "r", points: [], width: undefined },
    { letter: "o", points: [], width: undefined },
    { letter: "u", points: [], width: undefined },
    { letter: "p", points: [], width: undefined },
];

// let words = [
//     // { letter: "Resident", points: [] },
//     // { letter: "Artists", points: [] },
//     // { letter: "2024-2025", points: [] },
// ];

// BOOLEANS
let linesDrawn = false;
let allCaps_set = false;
let mixedCaps_set = false;
let Artists_set = false;

// SET TEXT TO ANIMATE
let words = CULTUREHUB;
// let words = Resident;
// let words = Artists;

// let words = ArtJones;
// let words = BigArtGroup;

allCaps_set = true;
// mixedCaps_set = true;

function preload() {
    font = loadFont("assets/fonts/replicaStdRegular.otf");
    img = loadImage("/assets/imgs/ArtJones.jpg");
}

function setup() {
    mainColor = color("#f0f0f0");
    createCanvas(windowWidth, windowHeight);

    fill("black");
    textSize(fontSize);

    // Clear the background once
    background(bgColor);

    // Generate points for each character in words
    let xOffset = 50;
    let yOffset = fontSize;
    words.forEach((word) => {
        // for (let i = 0; i < word.length; i++) {
        let charPoints = font.textToPoints(
            word.letter,
            xOffset,
            yOffset,
            fontSize,
            {
                sampleFactor: 0.06, // Adjust for point density
                simplifyThreshold: 0.0, // Adjust to simplify points
            }
        );
        word.points.push(...charPoints);
        // console.log(charPoints);

        // word.maxGap = Math.floor(charPoints.length / 2);
        // word.maxGap = maxGap;

        // word.gap = getRandomInteger(minGap, word.maxGap);
        word.gap = minGap;

        // points = points.concat(charPoints);
        word.width = textWidth(word.letter);

        // change spacing for CULTUREHUB
        if (allCaps_set) {
            if (word.letter === "L") {
                word.width = textWidth(word.letter) * 0.8;
            } else if (word.letter === "E") {
                word.width = textWidth(word.letter) * 0.95;
            }
            xOffset += word.width; // Offset for the next character
        } else if (mixedCaps_set) {
            // change spacing for Resident
            if (word.letter === "R") {
                word.width = textWidth(word.letter) * 0.9;
            } else if (
                word.letter === "e" ||
                word.letter === "s" ||
                word.letter === "G"
            ) {
                word.width = textWidth(word.letter) * 0.95;
            } else if (word.letter === "i") {
                word.width = textWidth(word.letter) * 1.1;
            } else if (word.letter === "A") {
                word.width = textWidth(word.letter) * 0.952;
            } else if (word.letter === "r") {
                word.width = textWidth(word.letter) * 1.26;
            }
            xOffset += word.width; // Offset for the next character
        } else if (Artists_set) {
            // change spacing for Artists
            // if (word.letter === "A") {
            //     word.width = textWidth(word.letter) * 0.68;
            // } else if (word.letter === "r") {
            //     word.width = textWidth(word.letter) * 0.9;
            // } else if (word.letter === "i") {
            //     word.width = textWidth(word.letter) * 0.8;
            // } else if (word.letter === "s") {
            //     word.width = textWidth(word.letter) * 0.7;
            // }
            // xOffset += word.width * 1.4; // Offset for the next character
        } else {
            xOffset += word.width; // Offset for the next character
        }
    });

    generateEndPointsBetweenLetters();
    // console.log(endPoints);
}

function draw() {
    // background(bgColor); // Clear the screen each frame

    // THICK LINES
    stroke("black");
    strokeWeight(strokeValueThick);

    if (linesDrawn) {
        // console.log("Lines already drawn");
    } else {
        drawLinesWithinLetter();
    }
    drawLinesBetweenLetters();

    // THIN LINES
    stroke("mainColor");
    strokeWeight(strokeValueThin);

    if (linesDrawn) {
        // console.log("Lines already drawn");
    } else {
        drawLinesWithinLetter();
    }

    stroke(CultureHubBlue);
    drawLinesBetweenLetters();

    // Increment progress for smooth animation
    progress += 0.007; // Adjust this value for smoother/slower animation

    // Stop the animation when all lines are fully drawn
    if (progress >= 1) {
        // Stop the animation
        // noLoop();
        progress = 0;
        linesDrawn = true;

        // Generate new end points
        endPoints = [];
        generateEndPointsBetweenLetters();
    }
}

// GENERAL FUNCTIONS
function getRandomInteger(x, y) {
    return Math.floor(Math.random() * (y - x + 1)) + x;
}

function generateEndPointsBetweenLetters() {
    words.forEach((word) => {
        if (word.letter === " ") {
            console.log("Space detected");
            return;
        }
        endPoints.push(
            word.points[getRandomInteger(0, word.points.length - 1)]
        );
    });
}

//Connecting points within a letter
function drawLinesWithinLetter() {
    words.forEach((word) => {
        // Draw all lines gradually
        word.points.forEach((point1, index) => {
            let point2;
            if (index >= word.points.length - word.gap) {
                point2 = word.points[index - word.gap];
            } else {
                point2 = word.points[index + word.gap];
            }

            // Interpolate between point1 and point2 based on progress
            let x = lerp(point1.x, point2.x, progress);
            let y = lerp(point1.y, point2.y, progress);

            // Draw the line from point1 to the current interpolated point
            line(point1.x, point1.y, x, y);
        });
    });
}

//Connecting points between letters
function drawLinesBetweenLetters() {
    for (let i = 0; i < endPoints.length - 1; i++) {
        let point1 = endPoints[i];
        let point2 = endPoints[i + 1];
        let x = lerp(point1.x, point2.x, progress);
        let y = lerp(point1.y, point2.y, progress);
        line(point1.x, point1.y, x, y);
    }
}
