/* ************************************************************ */
/*                                                              */
/*   Creative Coding: Making Visuals with JavaScript course     */
/*   By: Bruno Imbrizi, Creative Coder                          */
/*                                                              */
/*   Created by: Filipa Silva                                   */
/*   Title: Get letter from keyboard and pixel them creatively */
/*   January 2022                                               */
/*                                                              */
/* ************************************************************ */

const canvasSketch = require("canvas-sketch");
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080, 1080],
  //animate:true,
};

// ----- Get 1 Random Int from list [] ----- //

const colors = ["gold", "darkturquoise", "darkviolet", "deeppink", "orange"];

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
};

let manager;
let text = "F";
let fontFamily = "Georgia";
let fontSize = 1000;

// ----- create typeCanvas to read data ----- //

const typeCanvas = document.createElement("canvas");
const typeContext = typeCanvas.getContext("2d");

// ----- Start Sketch ----- //

const sketch = ({ context, width, height }) => {
  // ----- Properties of typeCanvas ----- //
  // ----- Divide in cells/pixels ----- //
  const cell = 20;
  const cols = Math.floor(width / cell);
  const rows = Math.floor(height / cell);
  const numCells = cols * rows;

  typeCanvas.width = cols;
  typeCanvas.height = rows;

  // ----- Start Sketch ----- //
  
  return ({ context, width, height }) => {
    typeContext.fillStyle = "Midnight blue"; // background
    typeContext.fillRect(0, 0, cols, rows); // background
    
    // ----- Draw letter style !!! ----- //
    fontSize = cols * 1.1;
    typeContext.fillStyle = colors[getRandomInt(0, 5)]; // color fill
    typeContext.font = `bold ${fontSize}px ${fontFamily}`;
    typeContext.textBaseline = "top";
    
    // ----- Find letter bounders ----- //
    const metrics = typeContext.measureText(text);
    console.log(metrics);
    const mx = metrics.actualBoundingBoxLeft * -1;
    const my = metrics.actualBoundingBoxAscent * -1;
    const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const mh =
    metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    
    // ----- Draw letter ----- //
    const tx = (cols - mw) * 0.5 - mx;
    const ty = (rows - mh) * 0.5 - my;

    typeContext.save();
    typeContext.translate(tx, ty);
    typeContext.beginPath();
    typeContext.rect(mx, my, mw, mh);
    typeContext.fillText(text, 0, 0);
    typeContext.restore();

    const typeData = typeContext.getImageData(0, 0, cols, rows).data; // get image data

    // context.drawImage(typeCanvas, 0, 0); // show typeCanvas
    context.fillStyle = "Midnight blue";
    context.fillRect(0, 0, width, height);

    context.textBaseline = "middle";
    context.textAlign = "center";

    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cell;
      const y = row * cell;

      const r = typeData[i * 4 + 0];
      const g = typeData[i * 4 + 1];
      const b = typeData[i * 4 + 2];
      const a = typeData[i * 4 + 3];

      const glyph = getGlyph(r); // r = red chanel (works good with black/white images)

      context.fillStyle = `rgb(${r}, ${g}, ${b}, ${a})`;

      // ----- Fill with Square Pixel ----- //
      /*
      context.save();
      context.translate(x, y);
      context.fillRect(0, 0, cell, cell); // fill whith pixel
      context.restore();
      */
      // ----- Fill with Circle ----- //
      /*
      context.save();
      context.translate(x, y);
      context.translate(cell * 0.5, cell * 0.5);
      context.beginPath();
      context.arc(0, 0, cell * 0.5, 0, Math.PI * 2); // fill whith circle
      context.fill();
      context.restore();
      */

      // ----- Fill with Strings ----- //

      context.font = `${cell * 2}px ${fontFamily}`;
      if (Math.random() < 0.1) {
        context.font = `${cell * 6}px ${fontFamily}`;
      }

      context.save();
      context.translate(x, y);
      context.fillText(glyph, 0, 0);
      context.restore();
    }
  };;
};

// ----- Set different strings to different colors_range  ----- //

const getGlyph = (v) => {
  // v is between 0-255 that is the range of red channel
  if (v < 50) return "";
  if (v < 100) return ".";
  if (v < 150) return "-";
  if (v < 200) return "+";

  const glyphs = "_/=|".split("");
  return random.pick(glyphs);
};

// ----- Event: keyboard click ----- //

const onKeyUp = (e) => {
  text = e.key.toUpperCase();
  manager.render();
};
document.addEventListener("keyup", onKeyUp);

const start = async () => {
  manager = await canvasSketch(sketch, settings);
};

start();
