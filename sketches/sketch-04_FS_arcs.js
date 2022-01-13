/* ************************************************************ */
/*                                                              */
/*   Creative Coding: Making Visuals with JavaScript course     */
/*   By: Bruno Imbrizi, Creative Coder                          */
/*                                                              */
/*   Created by: Filipa Silva                                   */
/*   Title: Drawing rectangles, circles and arcs around         */
/*   January 2022                                               */
/*                                                              */
/* ************************************************************ */

const canvasSketch = require("canvas-sketch");
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
const Color = require("canvas-sketch-util/color");

const settings = {
  dimensions: [1080, 1080],
  //animate: true,
};

// ----- Get 1 Random color Int from list [] ----- //

const colors = ["gold", "darkturquoise", "darkviolet", "deeppink", "orange"];

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
};

// ----- Start Sketch ----- //

const sketch = (context, width, height, playhead, frame) => {
  return ({ context, width, height, playhead, frame }) => {
    context.fillStyle = "Midnight blue"; // background
    context.fillRect(0, 0, width, height); // background

    let x, y;
    const cx = width * 0.5; //center of circle
    const cy = height * 0.5; //center of circle
    const w = width * 0.01;
    const h = height * 0.5;
    const num = 20;
    const radius = width * 0.3;

    const t = Math.sin(playhead * Math.PI);
    const rotation = playhead * Math.PI;

    // ----- Loop "num" times ----- //

    for (let i = 0; i < num; i++) {
      const slice = math.degToRad(360) / num;
      const angle = slice * i;

      // ----- Starts at a point(x,y) far from the center(cx,cy) ----- //
      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);

      // ----- Draw a stroke arc ----- //
      context.save();
      context.translate(cx, cy);
      context.beginPath();
      context.strokeStyle = "white";
      context.arc(0, 0, radius * random.range(0, 10), 0, 360);
      context.stroke();
      context.restore();

      // ----- Draw a fill rectangle with different w, h ----- //
      context.save();
      context.translate(x, y);
      context.rotate(-angle); // negative directon
      context.scale(random.range(1, 10), random.range(0.1, 0.5)); // random scale
      context.fillStyle = colors[getRandomInt(0, colors.length)];
      context.beginPath();
      context.rect(-w * 0.5, -h * 0.5, w, h);
      context.fill();
      context.restore();

      // ----- Draw a stroke arc ----- //
      context.save();
      context.translate(cx, cy);
      context.rotate(-angle);
      context.lineWidth = width * 0.02;
      context.strokeStyle = colors[getRandomInt(0, colors.length)];
      context.lineCap = "round";
      context.beginPath();
      context.arc(
        0,
        0,
        radius * random.range(0, 2),
        slice * random.range(1, -8),
        slice * random.range(1, 8)
      ); 
      //arc(center x, center y, radius, start angle, end angle)
      context.stroke();
      context.restore();
    }
  };
};

canvasSketch(sketch, settings);
