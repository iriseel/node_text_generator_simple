let mainColor;
let bgColor = "orange";
let CultureHubBlue = "#1eb5f5";

// DRAW VARIABLES
let strokeValueThin_Quotes = 4;
let strokeValueThick_Quotes = 12;
let strokeValueThin = 4 * 1.5;
let strokeValueThick = 12 * 1.5;
let sampleFactor_default = 0.06;
let sampleFactor_Quotes = sampleFactor_default * 2;

// TEXT VARIABLES
let font;
let points = [];
let progress = 0;
let endPoints = [];

let minGap = 1;
// let maxGap = 4;
// let gap = 1;
let fontSize = 240;
fontSize_Quotes = fontSize * 2;

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

let ResidentDefault = [
    { letter: "R", points: [], width: undefined },
    { letter: "e", points: [], width: undefined },
    { letter: "s", points: [], width: undefined },
    { letter: "i", points: [], width: undefined },
    { letter: "d", points: [], width: undefined },
    { letter: "e", points: [], width: undefined },
    { letter: "n", points: [], width: undefined },
    { letter: "t", points: [], width: undefined },
];
let Resident = [...ResidentDefault];

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

let CatherineChen_GeorgiosCherouvim = [
    // { letter: "C", points: [], width: undefined },
    // { letter: "a", points: [], width: undefined },
    // { letter: "t", points: [], width: undefined },
    // { letter: "h", points: [], width: undefined },
    // { letter: "e", points: [], width: undefined },
    // { letter: "r", points: [], width: undefined },
    // { letter: "i", points: [], width: undefined },
    // { letter: "n", points: [], width: undefined },
    // { letter: "e", points: [], width: undefined },
    // { letter: " ", points: [], width: undefined },
    // { letter: "C", points: [], width: undefined },
    // { letter: "h", points: [], width: undefined },
    // { letter: "e", points: [], width: undefined },
    // { letter: "n", points: [], width: undefined },
    // { letter: " ", points: [], width: undefined },
    // { letter: "&", points: [], width: undefined },
    // { letter: " ", points: [], width: undefined },
    { letter: "G", points: [], width: undefined },
    { letter: "e", points: [], width: undefined },
    { letter: "o", points: [], width: undefined },
    { letter: "r", points: [], width: undefined },
    { letter: "g", points: [], width: undefined },
    { letter: "i", points: [], width: undefined },
    { letter: "o", points: [], width: undefined },
    { letter: "s", points: [], width: undefined },
    { letter: " ", points: [], width: undefined },
    { letter: "C", points: [], width: undefined },
    { letter: "h", points: [], width: undefined },
    { letter: "e", points: [], width: undefined },
    { letter: "r", points: [], width: undefined },
    { letter: "o", points: [], width: undefined },
    { letter: "u", points: [], width: undefined },
    { letter: "v", points: [], width: undefined },
    { letter: "i", points: [], width: undefined },
    { letter: "m", points: [], width: undefined },
];

let CaylaMaeSimpson = [
    { letter: "C", points: [], width: undefined },
    { letter: "a", points: [], width: undefined },
    { letter: "y", points: [], width: undefined },
    { letter: "l", points: [], width: undefined },
    { letter: "a", points: [], width: undefined },
    { letter: " ", points: [], width: undefined },
    { letter: "M", points: [], width: undefined },
    { letter: "a", points: [], width: undefined },
    { letter: "e", points: [], width: undefined },
    { letter: " ", points: [], width: undefined },
    { letter: "S", points: [], width: undefined },
    { letter: "i", points: [], width: undefined },
    { letter: "m", points: [], width: undefined },
    { letter: "p", points: [], width: undefined },
    { letter: "s", points: [], width: undefined },
    { letter: "o", points: [], width: undefined },
    { letter: "n", points: [], width: undefined },
];

let ChiaAmisola = [
    { letter: "C", points: [], width: undefined },
    { letter: "h", points: [], width: undefined },
    { letter: "i", points: [], width: undefined },
    { letter: "a", points: [], width: undefined },
    { letter: " ", points: [], width: undefined },
    { letter: "A", points: [], width: undefined },
    { letter: "m", points: [], width: undefined },
    { letter: "i", points: [], width: undefined },
    { letter: "s", points: [], width: undefined },
    { letter: "o", points: [], width: undefined },
    { letter: "l", points: [], width: undefined },
    { letter: "a", points: [], width: undefined },
];

let DennisRedMoonDarkeem = [
    { letter: "D", points: [], width: undefined },
    { letter: "e", points: [], width: undefined },
    { letter: "n", points: [], width: undefined },
    { letter: "n", points: [], width: undefined },
    { letter: "i", points: [], width: undefined },
    { letter: "s", points: [], width: undefined },
    { letter: " ", points: [], width: undefined },
    { letter: "R", points: [], width: undefined },
    { letter: "e", points: [], width: undefined },
    { letter: "d", points: [], width: undefined },
    { letter: "M", points: [], width: undefined },
    { letter: "o", points: [], width: undefined },
    { letter: "o", points: [], width: undefined },
    { letter: "n", points: [], width: undefined },
    { letter: " ", points: [], width: undefined },
    { letter: "D", points: [], width: undefined },
    { letter: "a", points: [], width: undefined },
    { letter: "r", points: [], width: undefined },
    { letter: "k", points: [], width: undefined },
    { letter: "e", points: [], width: undefined },
    { letter: "e", points: [], width: undefined },
    { letter: "m", points: [], width: undefined },
];

let EvaDavidova = [
    { letter: "E", points: [], width: undefined },
    { letter: "v", points: [], width: undefined },
    { letter: "a", points: [], width: undefined },
    { letter: " ", points: [], width: undefined },
    { letter: "D", points: [], width: undefined },
    { letter: "a", points: [], width: undefined },
    { letter: "v", points: [], width: undefined },
    { letter: "i", points: [], width: undefined },
    { letter: "d", points: [], width: undefined },
    { letter: "o", points: [], width: undefined },
    { letter: "v", points: [], width: undefined },
    { letter: "a", points: [], width: undefined },
];

let TemitopeOlujobi = [
    { letter: "T", points: [], width: undefined },
    { letter: "e", points: [], width: undefined },
    { letter: "m", points: [], width: undefined },
    { letter: "i", points: [], width: undefined },
    { letter: "t", points: [], width: undefined },
    { letter: "o", points: [], width: undefined },
    { letter: "p", points: [], width: undefined },
    { letter: "e", points: [], width: undefined },
    { letter: " ", points: [], width: undefined },
    { letter: "O", points: [], width: undefined },
    { letter: "l", points: [], width: undefined },
    { letter: "u", points: [], width: undefined },
    { letter: "j", points: [], width: undefined },
    { letter: "o", points: [], width: undefined },
    { letter: "b", points: [], width: undefined },
    { letter: "i", points: [], width: undefined },
];

// let words = [
//     // { letter: "Resident", points: [] },
//     // { letter: "Artists", points: [] },
//     // { letter: "2024-2025", points: [] },
// ];

// SET TEXT TO ANIMATE
// words = CULTUREHUB;
words = Resident;
// words = Artists;

// words = ArtJones;
// words = BigArtGroup;
// words = CatherineChen_GeorgiosCherouvim;
// words = DennisRedMoonDarkeem;
// words = CaylaMaeSimpson;
// words = ChiaAmisola;
// words = EvaDavidova;
// words = TemitopeOlujobi;

let leftQuote = [
    { letter: "‘", points: [], width: undefined },
    { letter: "‘", points: [], width: undefined },
];

let rightQuote = [
    { letter: "’", points: [], width: undefined },
    { letter: "’", points: [], width: undefined },
];

let ArtJones_Quote1 = [
    //Transmitting
    // { letter: "T", points: [], width: undefined },
    // { letter: "r", points: [], width: undefined },
    // { letter: "a", points: [], width: undefined },
    // { letter: "n", points: [], width: undefined },
    // { letter: "s", points: [], width: undefined },
    // { letter: "m", points: [], width: undefined },
    // { letter: "i", points: [], width: undefined },
    // { letter: "t", points: [], width: undefined },
    // { letter: "t", points: [], width: undefined },
    // { letter: "i", points: [], width: undefined },
    // { letter: "n", points: [], width: undefined },
    // { letter: "g", points: [], width: undefined },
    //Live
    // { letter: "L", points: [], width: undefined },
    // { letter: "i", points: [], width: undefined },
    // { letter: "v", points: [], width: undefined },
    // { letter: "e", points: [], width: undefined },
    //from
    // { letter: "f", points: [], width: undefined },
    // { letter: "r", points: [], width: undefined },
    // { letter: "o", points: [], width: undefined },
    // { letter: "m", points: [], width: undefined },
    //Babylon
    { letter: "B", points: [], width: undefined },
    { letter: "a", points: [], width: undefined },
    { letter: "b", points: [], width: undefined },
    { letter: "y", points: [], width: undefined },
    { letter: "l", points: [], width: undefined },
    { letter: "o", points: [], width: undefined },
    { letter: "n", points: [], width: undefined },
];

let ArtJones_Quote2 = [
    //multi-screen, multichannel audio, and virtual environment
    //multiscreen
    // { letter: "m", points: [], width: undefined },
    // { letter: "u", points: [], width: undefined },
    // { letter: "l", points: [], width: undefined },
    // { letter: "t", points: [], width: undefined },
    // { letter: "i", points: [], width: undefined },
    // { letter: "-", points: [], width: undefined },
    // { letter: "s", points: [], width: undefined },
    // { letter: "c", points: [], width: undefined },
    // { letter: "r", points: [], width: undefined },
    // { letter: "e", points: [], width: undefined },
    // { letter: "e", points: [], width: undefined },
    // { letter: "n", points: [], width: undefined },
    //multichannel
    // { letter: "m", points: [], width: undefined },
    // { letter: "u", points: [], width: undefined },
    // { letter: "l", points: [], width: undefined },
    // { letter: "t", points: [], width: undefined },
    // { letter: "i", points: [], width: undefined },
    // { letter: "-", points: [], width: undefined },
    // { letter: "c", points: [], width: undefined },
    // { letter: "h", points: [], width: undefined },
    // { letter: "a", points: [], width: undefined },
    // { letter: "n", points: [], width: undefined },
    // { letter: "n", points: [], width: undefined },
    // { letter: "e", points: [], width: undefined },
    // { letter: "l", points: [], width: undefined },
    //audio
    // { letter: "a", points: [], width: undefined },
    // { letter: "u", points: [], width: undefined },
    // { letter: "d", points: [], width: undefined },
    // { letter: "i", points: [], width: undefined },
    // { letter: "o", points: [], width: undefined },
    //virtual
    // { letter: "v", points: [], width: undefined },
    // { letter: "i", points: [], width: undefined },
    // { letter: "r", points: [], width: undefined },
    // { letter: "t", points: [], width: undefined },
    // { letter: "u", points: [], width: undefined },
    // { letter: "a", points: [], width: undefined },
    // { letter: "l", points: [], width: undefined },
    //environment
    // { letter: "e", points: [], width: undefined },
    // { letter: "n", points: [], width: undefined },
    // { letter: "v", points: [], width: undefined },
    // { letter: "i", points: [], width: undefined },
    // { letter: "r", points: [], width: undefined },
    // { letter: "o", points: [], width: undefined },
    // { letter: "n", points: [], width: undefined },
    // { letter: "m", points: [], width: undefined },
    // { letter: "e", points: [], width: undefined },
    // { letter: "n", points: [], width: undefined },
    // { letter: "t", points: [], width: undefined },
];

let BigArtGroup_Quote = [
    // AI-driven performance techniques and community action
    // AI-driven
    // { letter: "A", points: [], width: undefined },
    // { letter: "I", points: [], width: undefined },
    // { letter: "-", points: [], width: undefined },
    // { letter: "d", points: [], width: undefined },
    // { letter: "r", points: [], width: undefined },
    // { letter: "i", points: [], width: undefined },
    // { letter: "v", points: [], width: undefined },
    // { letter: "e", points: [], width: undefined },
    // { letter: "n", points: [], width: undefined },
    // performance
    // { letter: "p", points: [], width: undefined },
    // { letter: "e", points: [], width: undefined },
    // { letter: "r", points: [], width: undefined },
    // { letter: "f", points: [], width: undefined },
    // { letter: "o", points: [], width: undefined },
    // { letter: "r", points: [], width: undefined },
    // { letter: "m", points: [], width: undefined },
    // { letter: "a", points: [], width: undefined },
    // { letter: "n", points: [], width: undefined },
    // { letter: "c", points: [], width: undefined },
    // { letter: "e", points: [], width: undefined },
    // techniques
    { letter: "t", points: [], width: undefined },
    { letter: "e", points: [], width: undefined },
    { letter: "c", points: [], width: undefined },
    { letter: "h", points: [], width: undefined },
    // { letter: "-", points: [], width: undefined },
    { letter: "n", points: [], width: undefined },
    { letter: "i", points: [], width: undefined },
    { letter: "q", points: [], width: undefined },
    { letter: "u", points: [], width: undefined },
    { letter: "e", points: [], width: undefined },
    { letter: "s", points: [], width: undefined },
    // and
    // { letter: "a", points: [], width: undefined },
    // { letter: "n", points: [], width: undefined },
    // { letter: "d", points: [], width: undefined },
    // community
    // { letter: "c", points: [], width: undefined },
    // { letter: "o", points: [], width: undefined },
    // { letter: "m", points: [], width: undefined },
    // { letter: "m", points: [], width: undefined },
    // { letter: "u", points: [], width: undefined },
    // { letter: "n", points: [], width: undefined },
    // { letter: "i", points: [], width: undefined },
    // { letter: "t", points: [], width: undefined },
    // { letter: "y", points: [], width: undefined },
    // action
    // { letter: "a", points: [], width: undefined },
    // { letter: "c", points: [], width: undefined },
    // { letter: "t", points: [], width: undefined },
    // { letter: "i", points: [], width: undefined },
    // { letter: "o", points: [], width: undefined },
    // { letter: "n", points: [], width: undefined },
];
// BOOLEANS
let linesDrawn = false;

// CAP SETTINGS
let mixedCaps_set = true;

// QUOTE SETTINGS
// strokeValueThin = strokeValueThin_Quotes;
// strokeValueThick = strokeValueThick_Quotes;
// fontSize = fontSize_Quotes;

// SET WHICH TEXT TO ANIMATE
let words;
// words = leftQuote;
// words = rightQuote;

// words = ArtJones_Quote1;
// words = ArtJones_Quote2;
words = BigArtGroup_Quote;

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
                sampleFactor: sampleFactor_Quotes, // Adjust for point density
                // sampleFactor: sampleFactor_default,
                simplifyThreshold: 0.0, // Adjust to simplify points
            }
        );
        word.points.push(...charPoints);

        word.gap = minGap;

        word.width = textWidth(word.letter);

        // change spacing for CULTUREHUB
        if (mixedCaps_set) {
            // change spacing for Resident
            if (word.letter === "R") {
                word.width = textWidth(word.letter) * 0.9;
            } else if (word.letter === "T") {
                word.width = textWidth(word.letter) * 0.8;
            } else if (
                word.letter === "e" ||
                word.letter === "s" ||
                word.letter === "G" ||
                word.letter === "a"
            ) {
                word.width = textWidth(word.letter) * 0.95;
            } else if (word.letter === "A") {
                word.width = textWidth(word.letter) * 0.952;
            } else if (word.letter === "p") {
                word.width = textWidth(word.letter) * 1.05;
            } else if (word.letter === "i" || word.letter === "c") {
                word.width = textWidth(word.letter) * 1.1;
            } else if (word.letter === "r") {
                word.width = textWidth(word.letter) * 1.2;
            } else if (word.letter === "f" || word.letter === "-") {
                word.width = textWidth(word.letter) * 1.38;
            } else if (word.letter === "t") {
                word.width = textWidth(word.letter) * 1.5;
            }
            xOffset += word.width; // Offset for the next character
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
