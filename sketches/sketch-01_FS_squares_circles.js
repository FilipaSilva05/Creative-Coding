/* ************************************************************ */
/*                                                              */
/*   Creative Coding: Making Visuals with JavaScript course     */
/*   By: Bruno Imbrizi, Creative Coder                          */
/*                                                              */
/*   Created by: Filipa Silva                                   */
/*   Title: Start with squares and circles                      */
/*   January 2022                                               */
/*                                                              */
/* ************************************************************ */

const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [1080, 1080],
  //animation:true,
};

const colors = ["gold", "darkturquoise", "darkviolet", "deeppink", "orange"];
let velocity = 0.1;

// ----- Get 1 Random Int from list [] ----- //
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
};

// ----- Start Sketch ----- //
const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "Midnight blue";
    context.fillRect(0, 0, width, height);
    context.lineWidth = width * 0.02;

    const w = width * 0.1;
    const h = height * 0.1;
    const gap = width * 0.03;
    const iw = width * 0.17; // inicial width
    const ih = height * 0.17; // inicial height
    const offset = width * 0.01;
    const radius = 40;
    let x, y;

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        x = iw + (w + gap) * i;
        y = ih + (h + gap) * j;

        // ----- Draw a fill/stroke square ----- //
        if (Math.random() > 0.5) {
          context.beginPath();
          context.strokeStyle = colors[getRandomInt(0, colors.length)];
          context.fillStyle = colors[getRandomInt(0, colors.length)];
          context.rect(x, y, w - offset, h - offset);
          context.fill();
          context.stroke();
        } else {
          // ----- Draw a fill/stroke arc ----- //
          context.beginPath();
          context.strokeStyle = colors[getRandomInt(0, colors.length)];
          context.fillStyle = colors[getRandomInt(0, colors.length)];
          context.arc(
            x + offset + radius,
            y + offset + radius,
            radius,
            0,
            Math.PI * 2
          );
          context.fill();
          context.stroke();
        }
      }
    }
  };
};

canvasSketch(sketch, settings);
