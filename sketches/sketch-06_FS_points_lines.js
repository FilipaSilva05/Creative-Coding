/* ************************************************************ */
/*                                                              */
/*   Creative Coding: Making Visuals with JavaScript course     */
/*   By: Bruno Imbrizi, Creative Coder                          */
/*                                                              */
/*   Created by: Filipa Silva                                   */
/*   Title: Using classes to get multiple points and lines      */
/*   January 2022                                               */
/*                                                              */
/* ************************************************************ */

const canvasSketch = require("canvas-sketch");
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

// ----- Get 1 Random Int from list [] ----- //

const colors = ["gold", "darkturquoise", "darkviolet", "deeppink", "orange"];

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
};

// ----- Start Sketch ----- //

const sketch = ({ context, width, height, frame }) => {
  const agents = [];

  for (let i = 0; i < 30; i++) {
    const x = random.range(0, width);
    const y = random.range(0, height);

    agents.push(new Agent(x, y));
  }

  return ({ context, width, height, frame }) => {
    context.fillStyle = "Midnight blue"; // background
    context.fillRect(0, 0, width, height); // background

    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];

      for (let j = i + 1; j < agents.length; j++) {
        const other = agents[j];

        /*const dist = Math.sqrt(
          Math.pow(agent.pos.x - other.pos.x, 2) +
          Math.pow(agent.pos.y - other.pos.y, 2));
        */
        const dist = agent.pos.getdistance(other.pos);
        if (dist > 300) continue;

        context.save();
        context.lineWidth = math.mapRange(dist, 0, 300, 20, 1); // when dist = 300 line =12 || when dist = 0 line =1
        context.strokeStyle = "white";
        context.globalAlpha = math.mapRange(dist, 0, 300, 1, 0.1); // when dist = 300 line =white || when dist = 0 line =alpha0.1
        context.beginPath();
        context.moveTo(agent.pos.x, agent.pos.y);
        context.lineTo(other.pos.x, other.pos.y);
        context.stroke();
        context.restore();
      }
    }

    agents.forEach((agent) => {
      agent.update();
      agent.draw(context);
      agent.wrap(width, height);
      //agent.bounce(width, height);
    });
  };
};

canvasSketch(sketch, settings);


// ----- Classes ----- //

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  getdistance(v) {
    // hipotenusa
    return Math.sqrt(Math.pow(this.x - v.x, 2) + Math.pow(this.y - v.y, 2));
  }
}

class Agent {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(random.range(-1, 1), random.range(-1, 1));
    this.radius = random.range(6, 20);
  }

  update() {
    // animation
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  bounce(width, height) {
    // invert direction of velocity when arrive to the canvas limits
    if (this.pos.x <= 0 || this.pos.x >= width) this.vel.x *= -1;
    if (this.pos.y <= 0 || this.pos.y >= height) this.vel.y *= -1;
  }

  wrap(width, height) {
    // acroos the canvas limits
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.y < 0) this.pos.y = height;
    if (this.pos.y > height) this.pos.y = 0;
  }

  draw(context) {
    context.fillStyle = colors[getRandomInt(0, colors.length)];
    context.lineWidth = 4;

    context.save();
    context.translate(this.pos.x, this.pos.y);

    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fill();
    context.restore();
  }
}
