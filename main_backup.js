let mainColor = "lightgrey";
let bgColor = "lightgreen";

// TEXT VARIABLES
let font;
let points = [];
let progress = 0;
let minGap = 1;
let maxGap = 1;
let gap = 1;
const fontSize = 240;

let totalPoints = [];

// let words = [
//     { letter: "▢", points: [], maxGap: undefined, gap: undefined },
// ];

// let words = [
// { letter: "CULTUREHUB", points: [] },
// { letter: "C", points: [], width: undefined },
// { letter: "U", points: [], width: undefined },
// { letter: "L", points: [], width: undefined },
// { letter: "T", points: [], width: undefined },
// { letter: "U", points: [], width: undefined },
// { letter: "R", points: [], width: undefined },
// { letter: "E", points: [], width: undefined },
// { letter: "H", points: [], width: undefined },
// { letter: "U", points: [], width: undefined },
// { letter: "B", points: [], width: undefined },
// ];

let words = [
    // { letter: "Resident", points: [] },
    // { letter: "Artists", points: [] },
    { letter: "2024-2025", points: [] },
];

// let words = [
// { letter: "A", points: [], width: undefined },
// { letter: "r", points: [], width: undefined },
// { letter: "t", points: [], width: undefined },
// { letter: "i", points: [], width: undefined },
// { letter: "s", points: [], width: undefined },
// { letter: "t", points: [], width: undefined },
// { letter: "s", points: [], width: undefined },
// ];

// DRAW VARIABLES
let strokeValueThin = 2;
let strokeValueThick = 10;

// IMAGE VARIABLES
let p;
let particles = [];
let res = 3;
let img;

const particleSize = 10;

function preload() {
    // Make sure to have a font file in your project directory or adjust the path accordingly
    font = loadFont("assets/fonts/replicaStdRegular.otf");
    // img = loadImage("/assets/imgs/InaChen.jpg");
    // img = loadImage("/assets/imgs/CaylaMaeSimpson.png");
    // img = loadImage("/assets/imgs/CatherineChen_GeorgiosCherouvim.jpg");
    img = loadImage("/assets/imgs/ArtJones.jpg");
}

function setup() {
    mainColor = color("#f0f0f0");
    createCanvas(windowWidth, windowHeight);
    spawnParticles();

    // ?? Trying to save as gif
    // frameRate(30);
    // createLoop(1, { duration: 3, gifFileName: "noiseLoop2d.gif", gif: true });

    fill("black");
    textSize(fontSize);

    // Clear the background once
    background(bgColor);

    // Generate points for each character in words
    let xOffset = 50;
    let yOffset = fontSize * 0.8;
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
        totalPoints.push(...charPoints);
        // console.log(charPoints);
        // word.maxGap = Math.floor(charPoints.length / 2);
        word.maxGap = 4;

        // word.gap = getRandomInteger(minGap, word.maxGap);
        word.gap = 1;

        // points = points.concat(charPoints);
        word.width = textWidth(word.letter);
        // if (word.letter === "L") {
        //     word.width = textWidth(word.letter) * 0.8;
        // } else if (word.letter === "E") {
        //     word.width = textWidth(word.letter) * 0.95;
        // }
        if (word.letter === "r") {
            word.width = textWidth(word.letter) * 1.2;
        }
        xOffset += word.width; // Offset for the next character
        // }
    });
}

function draw() {
    // background(bgColor); // Clear the screen each frame

    // THICK LINES
    totalPoints.forEach((point1, index) => {
        if (index >= totalPoints.length - gap) {
            return;
        }

        let maxIndex = Math.min(index + gap, totalPoints.length - gap);
        let randomIndex = getRandomInteger(index + gap, maxIndex);
        let point2 = totalPoints[randomIndex];

        // Interpolate between point1 and point2 based on progress
        let x = lerp(point1.x, point2.x, progress);
        let y = lerp(point1.y, point2.y, progress);

        stroke("black");
        strokeWeight(strokeValueThick);

        // Draw the line from point1 to the current interpolated point
        line(point1.x, point1.y, x, y);
    });

    // THIN LINES
    totalPoints.forEach((point1, index) => {
        if (index >= totalPoints.length - gap) {
            return;
        }

        let maxIndex = Math.min(index + gap, totalPoints.length - gap);
        let randomIndex = getRandomInteger(index + gap, maxIndex);
        let point2 = totalPoints[randomIndex];

        // Interpolate between point1 and point2 based on progress
        let x = lerp(point1.x, point2.x, progress);
        let y = lerp(point1.y, point2.y, progress);

        stroke(mainColor);
        strokeWeight(strokeValueThin);

        // Draw the line from point1 to the current interpolated point
        line(point1.x, point1.y, x, y);
    });

    // // THICK LINES
    // words.forEach((word) => {
    //     // Draw all lines gradually
    //     word.points.forEach((point1, index) => {
    //         // Draw ellipses at each point
    //         // fill("blue");
    //         // strokeWeight(1);
    //         // ellipse(point1.x, point1.y, 20, 20);

    //         // Draw text at each point
    //         // textSize(8);
    //         // text("M", point1.x, point1.y);

    //         let point2;
    //         if (index >= word.points.length - word.gap) {
    //             point2 = word.points[index - word.gap];
    //         } else {
    //             point2 = word.points[index + word.gap];
    //         }

    //         // Interpolate between point1 and point2 based on progress
    //         let x = lerp(point1.x, point2.x, progress);
    //         let y = lerp(point1.y, point2.y, progress);

    //         stroke("black");
    //         strokeWeight(strokeValueThick);

    //         // Draw the line from point1 to the current interpolated point
    //         // line(point1.x, point1.y, x, y);
    //     });
    // });

    // // THIN LINES
    // stroke("mainColor");
    // strokeWeight(strokeValueThin);

    // // Draw all lines gradually
    // words.forEach((word) => {
    //     word.points.forEach((point1, index) => {
    //         let point2;
    //         if (index >= word.points.length - word.gap) {
    //             point2 = word.points[index - word.gap];
    //         } else {
    //             point2 = word.points[index + word.gap];
    //         }

    //         // Interpolate between point1 and point2 based on progress
    //         let x = lerp(point1.x, point2.x, progress);
    //         let y = lerp(point1.y, point2.y, progress);

    //         // Draw the line from point1 to the current interpolated point
    //         line(point1.x, point1.y, x, y);
    //     });
    // });

    // Increment progress for smooth animation
    progress += 0.007; // Adjust this value for smoother/slower animation

    // Stop the animation when all lines are fully drawn
    if (progress >= 1) {
        // Stop the animation
        // noLoop();
        progress = 0;
        // words.forEach((word) => {
        //     word.gap = getRandomInteger(minGap, word.maxGap);
        // });
    }
}

// IMAGE TO PARTICLES
function drawImage() {
    // PLACE AND MANIPULATE IMAGE
    for (let i = 0; i < particles.length; i++) {
        if (Math.random() < 0.1) {
            let particleGap = getRandomInteger(1, 10);
            let particle2;
            if (i >= particles.length - particleGap) {
                particle2 = particles[i - particleGap];
            } else {
                particle2 = particles[i + particleGap];
            }

            stroke(mainColor);
            strokeWeight(0.2);
            line(particles[i].x, particles[i].y, particle2.x, particle2.y);

            // particles[i].update();
            particles[i].draw();
        }
    }
}

// setInterval(() => {
//     drawImage();
// }, 50);

function spawnParticles() {
    //Respect the image's original aspect ratio
    // Calculate the aspect ratio of the image
    let imgAspectRatio = img.width / img.height;
    let canvasAspectRatio = width / height;

    // Determine the scaling factors based on the aspect ratio
    let scaleX, scaleY;
    if (canvasAspectRatio > imgAspectRatio) {
        scaleY = height / img.height;
        scaleX = scaleY;
    } else {
        scaleX = width / img.width;
        scaleY = scaleX;
    }

    for (let i = 0; i < width; i += res) {
        for (let j = 0; j < height; j += res) {
            let x = i / scaleX;
            let y = j / scaleY;
            let c = img.get(x, y);

            // if(c[3] != 0) {
            if (c[0] + c[1] + c[2] != 255 * 3) {
                particles.push(new Particle(i, j, c));
            }
        }
    }
}

class Particle {
    constructor(x, y, c) {
        this.x = x;
        this.y = y;

        this.c = c;

        this.homeX = x;
        this.homeY = y;
    }

    update() {
        // mouse stuff
        let mouseD = dist(this.x, this.y, mouseX, mouseY);
        let mouseA = atan2(this.y - mouseY, this.x - mouseX);
        // home
        let homeD = dist(this.x, this.y, this.homeX, this.homeY);
        let homeA = atan2(this.homeY - this.y, this.homeX - this.x);
        // forces
        let mouseF = constrain(map(mouseD, 0, 100, 10, 0), 0, 10);
        let homeF = map(homeD, 0, 100, 0, 10);
        let vx = cos(mouseA) * mouseF;
        vx += cos(homeA) * homeF;
        let vy = sin(mouseA) * mouseF;
        vy += sin(homeA) * homeF;
        this.x += vx;
        this.y += vy;
    }

    draw() {
        // ellipse(this.homeX, this.homeY, 5, 5);
        // line(this.x, this.y, this.homeX, this.homeY);
        noStroke();
        fill(this.c);
        const resizeValue = 0.7;
        ellipse(
            this.x * resizeValue + 100,
            this.y * resizeValue + 100,
            res,
            res
        );
    }
}

// GENERAL FUNCTIONS
function getRandomInteger(x, y) {
    return Math.floor(Math.random() * (y - x + 1)) + x;
}

function keyPressed() {
    if (key === "s") {
        console.log("Saving gif...");
        let options = {
            units: "frames",
            delay: 0,
            duration: 5,
            loopLimit: 0,
        };
        saveGif("animation.gif", 5, options);
    }
}

//IMAGE FILTER
var blurSlider = document.querySelector("#gaussianBlurSlider");
var blur = document.querySelector("#gaussianBlur");
var sharpenSlider = document.querySelector("#sharpenSlider");
var sharpen = document.querySelector("#sharpen");
sharpenSlider.value = 17.47;
blurSlider.value = 2.677;

blurSlider.oninput = blurSlider.onchange = function () {
    blur.setAttribute("stdDeviation", this.value);
    console.log("blur", this.value);
};

sharpenSlider.oninput = sharpenSlider.onchange = function () {
    sharpen.setAttribute(
        "kernelMatrix",
        `-1 -1 -1 -1 ${28.5 - this.value} -1 -1 -1 -1`
    );
    console.log("sharpen", this.value);
};

const filteredImg = document.querySelector(".img");

filteredImg.onclick = function () {
    this.classList.toggle("line-art");
};

var lnks = document.querySelectorAll(".changeImage");

for (var i = 0; i < lnks.length; i++) {
    lnks[i].onclick = function () {
        filteredImg.src = this.getAttribute("data");
    };
}
