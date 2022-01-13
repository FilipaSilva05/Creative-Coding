/* ************************************************************ */
/*                                                              */
/*   Creative Coding: Making Visuals with JavaScript course     */
/*   By: Bruno Imbrizi, Creative Coder                          */
/*                                                              */
/*   Created by: Filipa Silva                                   */
/*   Title: Using noise and Teakpane tool                       */
/*   January 2022                                               */
/*                                                              */
/* ************************************************************ */

/*
Animate Reference:
https://github.com/mikepeiman/creative-coding-domestika/blob/master/src/routes/sketch-02-animate.js
*/

const canvasSketch = require("canvas-sketch");
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
const Tweakpane = require("tweakpane");

const settings = {
  dimensions: [1080, 1080],
  //animate: true,
};

// ----- Get 1 Random Int from list [] ----- //

const colors = ["gold", "darkturquoise", "darkviolet", "deeppink", "orange"];

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
};

// ----- Params Tweakpane ----- //

const params = {
  rows: 10,
  cols: 10,
  scaleMin: 1,
  scaleMax: 30,
  freq: 0.001,
  amp: 0.2,
  animate: true,
  frame: 0,
  lineCap: "butt",
  //background: "white",
  color: "#ff7f00",
  line: true,
  circle: true,
  speed: 10,
};

// ----- Start Sketch ----- //

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = "Midnight blue"; // background
    context.fillRect(0, 0, width, height); // background

    // Create gradient
    const gradient = context.createLinearGradient(0, 0, 10, 0);
    gradient.addColorStop(0, "cyan");
    gradient.addColorStop(1, "green");

    const cols = params.cols;
    const rows = params.rows;
    const numCells = cols * rows;

    const gridw = width * 0.8;
    const gridh = height * 0.8;
    const cellw = gridw / cols;
    const cellh = gridh / rows;
    const margx = (width - gridw) * 0.5;
    const margy = (height - gridh) * 0.5;

    for (let i = 0; i < numCells; i++) {
      const col = i % cols; // 0,1,2,3,0,1,2,3,0,1,2,3...
      const row = Math.floor(i / cols); // 0,0,0,0,1,1,1,1,2,2,2,2...

      const x = col * cellw;
      const y = row * cellh;
      const w = cellw * 0.8;
      const h = cellh * 0.8;

      const f = params.animate ? frame : params.frame; // when params.animate is true = frame, when is false = params.frame

      //const n = random.noise2D(x + frame * 10, y, params.freq); // number between -1 to 1; frequency
      const n = random.noise3D(x, y, f * params.speed, params.freq);
      const angle = n * Math.PI * params.amp; // number between -180 to 180
      const scale = math.mapRange(n, -1, 1, params.scaleMin, params.scaleMax); // const scale = ((n + 1) / 2) *30;

      context.save();
      context.translate(x, y);
      context.translate(margx, margy);
      context.translate(cellw * 0.5, cellh * 0.5);
      context.rotate(angle);

      //context.strokeStyle = params.color;
      //colors[getRandomInt(0, 5)];
      //context.strokeStyle = colors.slice(1, 2);
      context.strokeStyle = colors[getRandomInt(0, 5)];
      context.lineWidth = scale;
      context.lineCap = params.lineCap;
      context.beginPath();

      if (params.circle) {
        context.arc(w * 0.01, h * 0.01, w * 0.5, 0, 2 * Math.PI);
      }

      if (params.line) {
        context.moveTo(w * -0.5, 0);
        context.lineTo(w * 0.5, 0);
      }
      context.stroke();
      context.restore();
    }
  };;
};


// --- Create UI with Tweakpane --- //

const createPane = () => {
  const pane = new Tweakpane.Pane();
  let folder;

  folder = pane.addFolder({ title: "Style" });
  //folder.addInput(params, "background", {options: { white: "white", black: "black" },});

  //folder.addInput(params, "color");
  folder.addInput(params, "line");
  folder.addInput(params, "circle");
  folder.addInput(params, "lineCap", {
    options: { butt: "butt", round: "round", square: "square" },
  });

  folder = pane.addFolder({ title: "Grid" });
  folder.addInput(params, "cols", { min: 2, max: 50, step: 1 });
  folder.addInput(params, "rows", { min: 2, max: 50, step: 1 });
  folder.addInput(params, "scaleMin", { min: 1, max: 100 });
  folder.addInput(params, "scaleMax", { min: 1, max: 100 });

  folder = pane.addFolder({ title: "Noise" });
  folder.addInput(params, "freq", { min: -0.01, max: 0.01 });
  folder.addInput(params, "amp", { min: 0, max: 1 });
  folder.addInput(params, "speed", { min: 1, max: 100 });
  folder.addInput(params, "animate");
  folder.addInput(params, "frame", { min: 0, max: 999 });
};

createPane();

canvasSketch(sketch, settings);
