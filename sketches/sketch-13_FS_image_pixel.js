/* ************************************************************ */
/*                                                              */
/*   Creative Coding: Making Visuals with JavaScript course     */
/*   By: Bruno Imbrizi, Creative Coder                          */
/*                                                              */
/*   Created by: Filipa Silva                                   */
/*   Title: Using image pixels creatively                       */
/*   January 2022                                               */
/*                                                              */
/* ************************************************************ */

const canvasSketch = require("canvas-sketch");
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
const Color = require("canvas-sketch-util/color");
const palettes = require("nice-color-palettes");

const settings = {
  dimensions: [1080, 1080],
  animate: true,
  fps: 15,
};

// ----- Get 1 Random Int from list [] ----- //

const colors = ["gold", "darkturquoise", "darkviolet", "deeppink", "orange"];

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
};

// ----- create random color palette from list ----- //

const colorCount = 10; // Set max number of colors from palette
const palette = random.pick(palettes).slice(0, colorCount);
const color = random.pick(palette);

// ----- variables ----- //

let manager, image;

let text = "A";
let fontSize = 1200;
let fontFamily = "serif";

// ----- create typeCanvas to read data ----- //

const typeCanvas = document.createElement("canvas");
const typeContext = typeCanvas.getContext("2d");

// ----- Start Sketch ----- //

const sketch = ({ context, width, height, frame }) => {
  // ----- Properties of typeCanvas ----- //

  return ({ context, width, height, frame }) => {
    console.log("frame");
    console.log(frame);
    // ----- Divide in cells/pixels ----- //
    let cell = 120 - frame; // range 3 - 120
    if (cell < 3) cell = 3;
    const cols = Math.floor(width / cell);
    const rows = Math.floor(height / cell);
    const numCells = cols * rows;
    cell = width / cols;
    // ----- Start Sketch ----- //
    typeCanvas.width = cols;
    typeCanvas.height = rows;
    typeContext.fillStyle = "Midnight blue"; // background
    typeContext.fillRect(0, 0, cols, rows); // background

    // ----- Draw image !!! ----- //
    typeContext.save();
    typeContext.drawImage(image, 0, 0, cols, rows); // draw image
    typeContext.restore();

    const typeData = typeContext.getImageData(0, 0, cols, rows).data; // get image data

    context.fillStyle = "Midnight blue";
    context.fillRect(0, 0, width, height);

    context.textBaseline = "middle";
    context.textAlign = "center";

    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      //const x = col * cell + random.range(-cell, cell) * 0.5;
      //const y = row * cell + random.range(-cell, cell) * 0.5;
      const x = col * cell;
      const y = row * cell;

      const r = typeData[i * 4 + 0];
      const g = typeData[i * 4 + 1];
      const b = typeData[i * 4 + 2];
      const a = typeData[i * 4 + 3];

      const glyph = getGlyph(r); // r = red chanel (works good with black/white images)

      context.fillStyle = `rgb(${r}, ${g}, ${b}, ${a})`;

      // ----- Fill with Square Pixel ----- //
      
      context.save();
      context.translate(x, y);
      context.fillRect(0, 0, cell, cell); // fill whith pixel
      context.restore();

      // ----- Fill with Circle ----- //
      /*
      context.save();
      context.translate(x, y);
      context.translate(cell * 0.5, cell * 0.5);
      context.beginPath();
      context.arc(0, 0, cell * 0.5, 0, Math.PI * 2); // fill whith circle
      context.fill();
      //context.stroke();
      context.restore();
      */
      // ----- Fill with Strings ----- //
      /*
      context.font = `${cell * 2}px ${fontFamily}`;
      if (Math.random() < 0.1) {
        context.font = `${cell * 6}px ${fontFamily}`;
      }
      
      context.save();
      context.translate(x, y);
      context.fillText(glyph, 0, 0);
      context.restore();
      */

      //context.drawImage(typeCanvas, 0, 0);
    }
  };
};

// ----- Set different strings to different colors_range  ----- //

const getGlyph = (v) => {
  // v is between 0-255 that is the range of red channel
  if (v < 50) return ".";
  if (v < 100) return ":";
  if (v < 150) return "-";
  if (v < 200) return "_";

  const glyphs = "*#/+".split("");

  return random.pick(glyphs);
};

// ----- Function Get Image from folder ----- //

const loadMeSomeImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject();
    img.src = url;
  });
};

// ----- Async Function ----- //

const start = async () => {
  const url = "./img/img_02.jpg"; //image src
  //const url = "https://picsum.photos/200";
  image = await loadMeSomeImage(url);
  manager = await canvasSketch(sketch, settings);
};

start();
