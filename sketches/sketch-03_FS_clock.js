/* ************************************************************ */
/*                                                              */
/*   Creative Coding: Making Visuals with JavaScript course     */
/*   By: Bruno Imbrizi, Creative Coder                          */
/*                                                              */
/*   Created by: Filipa Silva                                   */
/*   Title: The shape of a clock                                */
/*   January 2022                                               */
/*                                                              */
/* ************************************************************ */

const canvasSketch = require("canvas-sketch");
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080, 1080],
  animate: true,
  fps: 30,
};

// ----- Get 1 Random Int from list [] ----- //

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
};

const colors = ["gold", "darkturquoise", "darkviolet", "deeppink", "orange"];

// ----- Start Sketch ----- //

const sketch = () => {
  return ({ context, width, height, frame }) => {
    let grd = context.createRadialGradient(
      width * 0.5,
      height * 0.5,
      0,
      width * 0.5,
      height * 0.5,
      width * 0.7
    );
    grd.addColorStop(0, "grey");
    grd.addColorStop(1, "white");

    context.fillStyle = grd;
    context.fillRect(0, 0, width, height);

    context.fillStyle = "black";

    const cx = width * 0.5;
    const cy = height * 0.5;
    const w = width * 0.01;
    const h = height * 0.1;
    let x, y;

    const hours = 12;
    const minuts = 60;
    const radiusMax = width * 0.32;
    const radiusMin = width * 0.2;
    const sliceHours = math.degToRad(360) / hours;
    const sliceMinuts = math.degToRad(360) / minuts;
    const radius = width * 0.4;
    //const numbers = "1 2 3 4 5 6 7 8 9 10 11 12".split(" ");
    const numbers = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
    ];

    let text = "A";
    let fontSize = 1200;
    let fontFamily = "serif";

    let velocityRadius = (radiusMax - radiusMin) / minuts;

    // ----- Spiral ----- //

    context.save();
    context.beginPath();
    context.moveTo(cx, cy);
    for (let i = 0; i < frame; i++) {
      const angle = 0.1 * i;
      a = 5;
      b = 5;
      x = cx + (a + b * angle) * Math.cos(angle);
      y = cy + (a + b * angle) * Math.sin(angle);

      context.lineTo(x, y);
      context.lineWidth = 2;
      context.strokeStyle = "Midnight blue";
      context.stroke();
      context.restore();
    }

    // ----- Arc ----- //
    context.save();
    context.translate(cx, cy);
    context.beginPath();
    context.arc(0, 0, radius, 0, Math.PI * 2);
    context.lineWidth = width * 0.1;
    context.strokeStyle = "Midnight blue";
    context.stroke();
    context.restore();

    // ----- Rect 12 ----- //
    /*
    for (let i = 0; i < hours; i++) {
      const angle = sliceHours * i;

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);

      context.save();
      context.translate(x, y);
      context.rotate(-angle);
      context.fillStyle = colors[getRandomInt(0, colors.length)];
      //context.scale(random.range(1, 3), 1);
      context.beginPath();
      context.rect(-w * 0.5, -h * 0.5, 30, 50);
      context.fill();
      context.restore();
    }
*/
    // ----- 12 Numbers ----- //
    for (let i = 1; i < 13; i++) {
      const angle = sliceHours * i;

      x = cx + radius * Math.sin(angle);
      y = cy - radius * Math.cos(angle);

      context.save();
      context.translate(x, y);
      context.fillStyle = colors[getRandomInt(0, colors.length)];
      context.font = "80px Helvetica";
      context.textBaseline = "middle";
      context.textAlign = "center";
      context.beginPath();
      //context.fillText(numbers.slice(i - 1, i), 0, 0);
      context.fillText(i.toString(), 0, 0);
      context.fill();
      context.restore();
    }

    // ----- Hours ----- //
    const angle = (Math.PI * frame) / (minuts * 12);

    x = Math.sin(angle);
    y = Math.cos(angle);

    context.save();
    context.translate(cx, cy);
    context.rotate(angle);
    context.beginPath();
    context.strokeStyle = "darkturquoise";
    context.lineWidth = 60;
    context.lineCap = "round";
    context.moveTo(0, 0);
    context.lineTo(1, -radiusMin);
    context.stroke();
    context.restore();

    // ----- Minuts----- //
    const angle2 = (Math.PI * frame) / minuts;

    context.save();
    context.translate(cx, cy);
    context.rotate(angle2);
    context.beginPath();
    context.strokeStyle = "deeppink";
    context.lineWidth = 30;
    context.lineCap = "round";
    context.moveTo(0, 0);
    context.lineTo(1, -radiusMax);
    context.stroke();
    context.restore();

    // ----- Circle ----- //
    context.save();
    context.translate(cx, cy);
    context.beginPath();
    context.arc(0, 0, 15, 0, Math.PI * 2);
    context.lineWidth = width * 0.1;
    context.strokeStyle = "Midnight blue";
    context.fill();
    context.restore();

    /*
    // ----- Paulino ----- //
    let n_min = 0;
    if (frame > 5) n_min = frame - 5;
    const n_max = frame;

    // ----- Arc Soft Animation ----- //
    for (let i = n_min; i < frame; i++) {
      const angle = sliceHours * i;

      x = Math.sin(angle);
      y = Math.cos(angle);

      context.save();
      context.translate(cx, cy);
      context.beginPath();
      context.arc(0, 0, 20 * i, 0, Math.PI * 2);
      context.stroke();
      context.restore();
    }
    */
  };
};

canvasSketch(sketch, settings);
