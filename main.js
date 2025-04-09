// COLORS
let mainColor = "white";
let bgColor = "black";
let lineColor = "blue";
const colors = [
    "red",
    "orange",
    "green",
    "pink"
];

// BOOLEANS
let firstRun = true;
let linesDrawn = false;

// TEXT STYLE VARIABLES
let sampleFactorValue = 0.1;
let simplifyThresholdValue = 0;
let progressIncrement = .015;
//gapValue determines the distance between each point
let gapValue = 1;
let strokeValueThin = 4; let strokeValueThick = 12;
let fontSize = 240;
let xOffset; let yOffset;
let amplitude = 6; let angle = 0;

// TEXT VARIABLES
let resultTextArray;
let resultTextArrayDefault;
let font;
let points = [];
let endPoints = [];
let characters;

// SAVE GIF VARIABLES
let capturer;
let isRecording = false;
let captureDuration = .000001; // seconds
let fps = 30;
let frameLimit = fps * captureDuration;
const saveButton = document.querySelector(".saveGIF");

function preload() {
    font = loadFont("assets/fonts/MoMA-Sans-Bold.otf");
    // img = loadImage("/assets/imgs/ArtJones.jpg");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(fps); // Set frame rate fps

    // Setup the CCapture object for GIF or MP4
    capturer = new CCapture({
        format: "webm",
        framerate: fps,
        verbose: false,
        quality: 100, // Set quality (optional)
    });

    saveButton.addEventListener("click", () => {
        // Disable the button to prevent multiple clicks
        saveButton.setAttribute("disabled", "");
        saveButton.style.opacity = 0.5;

        // Call the saveGIF function
        saveGIF();
    });

    // Initialize with default settings and text
    generateTextArray("Lines of Belonging");

    // Add event listener to the text input button
    const textInput = document.querySelector(".convertText");
    textInput.addEventListener("click", function () {
        // Get the user input
        let inputText = document.getElementById("textInput").value;
        generateTextArray(inputText);
    });

    // General function to handle slider updates
    function setupSlider(selector, valueSelector, variableName) {
        const slider = document.querySelector(selector);
        slider.addEventListener("input", function() {
            updateSliderValue(this.value, valueSelector, variableName);
        });
    }

    // Set up all sliders
    setupSlider(".amplitudeSlider", ".amplitude", "amplitude");
    setupSlider(".sampleFactorSlider", ".sampleFactorValue", "sampleFactorValue");
    setupSlider(".simplifyThresholdSlider", ".simplifyThresholdValue", "simplifyThresholdValue");
    setupSlider(".progressIncrementSlider", ".progressIncrement", "progressIncrement");
    setupSlider(".gapValueSlider", ".gapValue", "gapValue");
    setupSlider(".strokeValueThinSlider", ".strokeValueThin", "strokeValueThin");
    setupSlider(".fontSizeSlider", ".fontSize", "fontSize");

    angleMode(DEGREES);
}

function generateTextArray(inputText) {
    // Split the input text into an array of letters
    let textArray = inputText.split("");

    // Convert the array of letters into an array of objects
    resultTextArrayDefault = textArray.map((letter) => {
        return {
            letter: letter,
            points: [],
            width: undefined,
        };
    });

    // Log the resulting array to the console
    // console.log(resultTextArrayDefault);

    //set default to reset back to restartAnimation()
    resultTextArray = [...resultTextArrayDefault];

    restartAnimation();
}

function restartAnimation() {
    // clear/reset canvas
    noLoop(); // Stop the draw loop
    // clear();
    capturer.stop();
    isRecording = false;
    // background(bgColor);
    textSize(fontSize);
    //x- and y-Offset just determine the top and left margins of the text; xOffset needs to be reset every restartAnimation since it +=, so that it doesn't add up and then fall off the page
    xOffset = 0;
    yOffset = fontSize;
    characters = [...resultTextArrayDefault];

    characters.forEach((character) => {
        character.points = []; // Clear points array
        // console.log(character); 

        character.width = textWidth(character.letter);

        // Check if character fits in current line
        //width is a built-in p5.js variable — it represents the width of the canvas
        if (xOffset + character.width > width) {
            // Move to next line
            xOffset = 0;
            yOffset += fontSize * 1; // Adjust line height as needed
        }

        // Generate points for this character
        const charPoints = font.textToPoints(
            character.letter,
            xOffset,
            yOffset,
            fontSize,
            {
                sampleFactor: sampleFactorValue,
                simplifyThreshold: simplifyThresholdValue,
            }
        );
        
        //trying to access better kerning values with bounds width, but not very successful
        let bounds = font.textBounds(character.letter, xOffset, yOffset, fontSize);
        let boundsWidth = bounds.w;

        character.points.push(...charPoints);
        character.gap = gapValue;

        setCharacterSpace(character, boundsWidth);
    });

    linesDrawn = false;
    restartProgress();

    // draw(); // Restart the draw loop
    frameCount = 0;
    loop();
}

// This will be useful for kerning
function setCharacterSpace(character, boundsWidth) {
    if (character.letter === "T") {
        // character.width = character.width * 0.8;
    } 
    else {
        xOffset += character.width * 1.1; // Offset for the next character
        // xOffset += boundsWidth * 1.2; // Offset for the next character

    }
}

function draw() {
    if (frameCount === 1 && !isRecording) {
        // Start recording only once
        //!! This enables Save GIF button to be clicked!
        isRecording = true;
        capturer.start(); // Start capturing frames
    }

    function createStroke(strokeColor, strokeW) {
        stroke(strokeColor);
        strokeWeight(strokeW);
    }

    // THICK LINES (outline stroke)
    createStroke("black", strokeValueThick);
    // THIN LINES (main stroke)
    createStroke(mainColor, strokeValueThin);
    if (!linesDrawn) {
        drawLinesWithinLetter();
        // drawDots();
    }
    drawDots();
    drawLinesWithinLetter2();


    createStroke(lineColor, strokeValueThin);
    drawLinesBetweenLetters();

    // Increment progress for smooth animation
    progress += progressIncrement; // Adjust this value for smoother/slower animation

    if (progress >= 1) {
        linesDrawn = true;
        restartProgress();
    }

    if (isRecording) {
        capturer.capture(canvas); // Capture the frame

        // Stop after the specified duration
        if (frameCount >= frameLimit) {
            capturer.stop();
            isRecording = false;
            // noLoop();
            saveButton.removeAttribute("disabled"); // Enable the save button
            saveButton.style.opacity = 1;
        }
    }
}

function restartProgress() {
    progress = 0;
    // Generate new end points
    endPoints = [];
    generateEndPointsBetweenLetters();
    generateEndPointsWithinLetters();
}

function drawDots() {
    // animate the dots
    oscillate();
    
    // just draw the dots, have them be static
    // drawStatic();
}

function oscillate() {
    background(bgColor);
    characters.forEach((character) => {
        const characterPoints = character.points;
        for (let i=0; i < characterPoints.length; i++) {
            circle(characterPoints[i].x + amplitude*sin(angle + i*25), characterPoints[i].y, 1);
        }
        angle += 1;

    });
}

function drawStatic(){
    characters.forEach((character) => {
        const characterPoints = character.points;
        for (let i=0; i < characterPoints.length; i++) {
            circle(characterPoints[i].x, characterPoints[i].y, 1);
        }
        angle += 1;

    });
}

//Connecting points within a letter
function drawLinesWithinLetter() {
    characters.forEach((character) => {
        // Draw all lines gradually
        character.points.forEach((point1, index) => {
            let point2;
            if (index >= character.points.length - character.gap) {
                point2 = character.points[index - character.gap];
            } else {
                point2 = character.points[index + character.gap];
            }

            // Interpolate between point1 and point2 based on progress
            let x = lerp(point1.x, point2.x, progress);
            let y = lerp(point1.y, point2.y, progress);

            // console.log(progress)

            // Draw the line from point1 to the current interpolated point
            line(point1.x, point1.y, x, y);
        });
    });
}

// connect
function drawLinesWithinLetter2() {
    characters.forEach((character) => {
        if (!character.randomPair) return;

        let [i1, i2] = character.randomPair;
        let point1 = character.points[i1];
        let point2 = character.points[i2];

        let x = lerp(point1.x, point2.x, progress);
        let y = lerp(point1.y, point2.y, progress);
        // console.log(progress)

        const randomColor = getRandomItemFromArray(colors);
        stroke(randomColor);

        line(point1.x, point1.y, x, y);
    });
}

//Connecting points between letters
function generateEndPointsBetweenLetters() {
    characters.forEach((character) => {
        if (character.letter === " ") {
            console.log("Space detected");
            return;
        }
        endPoints.push(
            character.points[getRandomInteger(0, character.points.length - 1)]
        );
    });
}

function generateEndPointsWithinLetters() {
    characters.forEach((character) => {
        const points = character.points;
        if (points.length < 2) return;
    
        let i1 = Math.floor(Math.random() * points.length);
        let i2;
        do {
            i2 = Math.floor(Math.random() * points.length);
        } while (i2 === i1);
    
        character.randomPair = [i1, i2];
    });
}

function drawLinesBetweenLetters() {
    for (let i = 0; i < endPoints.length - 1; i++) {
        let point1 = endPoints[i];
        let point2 = endPoints[i + 1];
        let x = lerp(point1.x, point2.x, progress);
        let y = lerp(point1.y, point2.y, progress);
        
        line(point1.x, point1.y, x, y);
    }
}

// SLIDER FUNCTIONS
function updateSliderValue(value, valueSelector, variableName) {
    const valueDisplay = document.querySelector(valueSelector);
    valueDisplay.textContent = parseFloat(value);

    // Update global variable
    if (variableName == "sampleFactorValue") {
        sampleFactorValue = parseFloat(value);
    }  
    else if (variableName == "simplifyThresholdValue") {
        simplifyThresholdValue = parseFloat(value); 
    }
    else if (variableName == "progressIncrement"){
        progressIncrement = parseFloat(value); 
    }
    else if (variableName == "gapValue"){
        gapValue = parseFloat(value); 
    }
    else if (variableName == "strokeValueThin"){
        strokeValueThin = parseFloat(value); 
    }
    else if (variableName == "fontSize"){
        fontSize = parseFloat(value);
    }
    else if (variableName == "amplitude"){
        amplitude = parseFloat(value);
    }

    restartAnimation();
}


// GENERAL FUNCTIONS
function getRandomInteger(x, y) {
    return Math.floor(Math.random() * (y - x + 1)) + x;
}

function getRandomItemFromArray(array) {
   return array[Math.floor(Math.random()*array.length)];
}

function saveGIF() {
    if (!isRecording) {
        capturer.save(); // Trigger download only if not recording
        saveButton.setAttribute("disabled", ""); // Disable the save button after saving
        saveButton.style.opacity = 0.5;
    }
}
