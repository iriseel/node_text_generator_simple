let mainColor;
let bgColor = "orange";
let CultureHubBlue = "#1eb5f5";

// TEXT VARIABLES
let resultTextArray;
let resultTextArrayDefault;

let font;
let points = [];
let progress = 0;
let endPoints = [];
let minGap = 1;
let xOffset;
let yOffset;
let words;

// BOOLEANS
let firstRun = true;
let linesDrawn = false;
let allCaps_set = false;
let mixedCaps_set = false;
let quotes_set = false;

// SAVE GIF VARIABLES
let capturer;
let isRecording = false;
let captureDuration = 2; // seconds
let fps = 30;
let frameLimit = fps * captureDuration;
const saveButton = document.querySelector(".saveGIF");

function preload() {
    font = loadFont("assets/fonts/replicaStdRegular.otf");
    img = loadImage("/assets/imgs/ArtJones.jpg");
}

function setup() {
    mainColor = color("#f0f0f0");
    createCanvas(windowWidth, windowHeight);
    // frameRate(fps); // Set frame rate fps

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
    generateTextArray("your text");
    updateSettings("default");

    // Add event listener to the settings dropdown
    document
        .getElementById("settingsDropdown")
        .addEventListener("change", function () {
            updateSettings(this.value);
        });

    // Add event listener to the text input button
    document
        .querySelector(".convertText")
        .addEventListener("click", function () {
            // Get the user input
            let inputText = document.getElementById("textInput").value;
            generateTextArray(inputText);
        });
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

    //set default to reset back to when updateSettings()
    resultTextArray = [...resultTextArrayDefault];

    // Need this condition so that it doesn't restart the animation on first load, beofre updateSettings() sets the fontsize etc. that restartAnimation() relies on
    if (!firstRun) {
        restartAnimation();
    }

    firstRun = false;
}

// Function to update drawing settings based on selection
function updateSettings(selection) {
    allCaps_set = false;
    mixedCaps_set = false;
    quotes_set = false;

    strokeValueThin = 4;
    strokeValueThick = 12;
    fontSize = 240;
    // smaller fontsize (for Dennis Redmoon)
    // fontSize = 216;
    // smaller fontsize (for Valerie McCann)
    // fontSize = 228;
    sampleFactor = 0.06;

    if (selection === "default") {
        mixedCaps_set = true;
    } else if (selection === "allCaps") {
        allCaps_set = true;
    } else if (selection === "quotationMarks") {
        sampleFactor = 0.06 * 2;
        fontSize = 240 * 2;
        mixedCaps_set = true;
    } else if (selection === "quote") {
        // strokeValueThin = 4 * 1.5;
        // strokeValueThick = 12 * 1.5;
        // sampleFactor = 0.06;

        quotes_set = true;
        strokeValueThin = 3;
        strokeValueThick = 8;
        let changeFactor = 0.44;
        sampleFactor = (0.06 * 1) / changeFactor;
        fontSize = 240 * changeFactor;
    } else {
        console.log("Invalid selection");
    }

    textSize(fontSize);

    restartAnimation();
}

function restartAnimation() {
    // clear/reset canvas
    noLoop(); // Stop the draw loop
    clear();
    capturer.stop();
    isRecording = false;
    background(bgColor);
    words = [...resultTextArrayDefault];

    words.forEach((word) => {
        word.points = []; // Clear points array
    });

    // Generate points for each character in words
    xOffset = 50;
    yOffset = fontSize;
    words.forEach((word) => {
        // for (let i = 0; i < word.length; i++) {
        let charPoints = font.textToPoints(
            word.letter,
            xOffset,
            yOffset,
            fontSize,
            {
                sampleFactor: sampleFactor, // Adjust for point density
                simplifyThreshold: 0.0, // Adjust to simplify points
            }
        );
        word.points.push(...charPoints);
        word.gap = minGap;

        // need spacing wider for thicker outlined text
        if (quotes_set) {
            word.width = textWidth(word.letter) * 1.05;
            if (word.letter === "V") {
                word.width = word.width * 1.1;
            }
        } else {
            word.width = textWidth(word.letter);
        }

        setWordSpace(word);
    });

    linesDrawn = false;
    restartProgress();

    draw(); // Restart the draw loop
    loop();
    frameCount = 0;
}

function setWordSpace(word) {
    // change spacing for all-caps text (e.g. CULTUREHUB)
    if (allCaps_set) {
        if (word.letter === "L") {
            word.width = word.width * 0.8;
        } else if (word.letter === "E") {
            word.width = word.width * 0.95;
        }
        xOffset += word.width; // Offset for the next character
    } else if (mixedCaps_set || quotes_set) {
        if (word.letter === "T") {
            word.width = word.width * 0.8;
        } else if (word.letter === "E" || word.letter === "V") {
            word.width = word.width * 0.85;
        } else if (word.letter === "R") {
            word.width = word.width * 0.9;
        } else if (
            word.letter === "e" ||
            word.letter === "s" ||
            word.letter === "G" ||
            word.letter === "a" ||
            word.letter === "S" ||
            word.letter === "D"
        ) {
            word.width = word.width * 0.95;
        } else if (word.letter === "A" || word.letter === "C") {
            word.width = word.width * 0.952;
        } else if (word.letter === "p" || word.letter === "M") {
            word.width = word.width * 1.05;
        } else if (word.letter === "i" || word.letter === "c") {
            word.width = word.width * 1.1;
        } else if (word.letter === "r") {
            word.width = word.width * 1.2;
        } else if (word.letter === "f" || word.letter === "-") {
            word.width = word.width * 1.38;
        } else if (word.letter === "t") {
            word.width = word.width * 1.5;
        }
        xOffset += word.width; // Offset for the next character
    } else {
        xOffset += word.width; // Offset for the next character
    }
}

function draw() {
    if (frameCount === 1 && !isRecording) {
        // Start recording only once
        // isRecording = true;
        // capturer.start(); // Start capturing frames
    }

    // THICK LINES (outline stroke)
    stroke("black");
    strokeWeight(strokeValueThick);

    if (!linesDrawn) {
        drawLinesWithinLetter();
    }
    drawLinesBetweenLetters();

    // THIN LINES (main stroke)
    stroke("mainColor");
    strokeWeight(strokeValueThin);

    if (!linesDrawn) {
        drawLinesWithinLetter();
    }
    stroke(CultureHubBlue);
    drawLinesBetweenLetters();

    // Increment progress for smooth animation
    progress += 0.007; // Adjust this value for smoother/slower animation

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

function drawLinesBetweenLetters() {
    for (let i = 0; i < endPoints.length - 1; i++) {
        let point1 = endPoints[i];
        let point2 = endPoints[i + 1];
        let x = lerp(point1.x, point2.x, progress);
        let y = lerp(point1.y, point2.y, progress);
        line(point1.x, point1.y, x, y);
    }
}

// GENERAL FUNCTIONS
function getRandomInteger(x, y) {
    return Math.floor(Math.random() * (y - x + 1)) + x;
}

function saveGIF() {
    if (!isRecording) {
        capturer.save(); // Trigger download only if not recording
        saveButton.setAttribute("disabled", ""); // Disable the save button after saving
        saveButton.style.opacity = 0.5;
    }
}
