// canvas-sketch sketch1.js
// Uruchom: npm install && canvas-sketch sketch1.js
const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const divContiner = document.createElement("div")
const buttonReset = document.createElement("button")
buttonReset.id = "reset"
buttonReset.textContent = "RESET"
buttonReset.onclick = () => {
    agents.length = 0
    const {width, height} = canvasElement
    for(let i = 0; i < 30; i++){
        agents.push(new Agent(randomRange(0, width), randomRange(0, height)))
    }
}

divContiner.id = "container"
divContiner.appendChild(buttonReset)
document.body.appendChild(divContiner)


const agents = [];
const settings = {
  dimensions: [1080, 1080],
  animate: true
};

const mouse = { x: null, y: null };
const mouseRadius = 100; //zeby bylo lepiej widoczne musi byc na 500 
let mouseStrength = 5;
const forceMode = "repel"; // "attract"
const pitagorasa = (dx, dy) => {
    return Math.sqrt(dx * dx + dy * dy)
}

function randomRange(a, b) {
  return Math.random() * (b - a) + a;
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  getDistance(other) {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    return pitagorasa(dx, dy)
  }
}

class Velocity {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Agent {
  constructor(x, y) {
    this.pos = new Point(x, y);
    this.vel = new Velocity(randomRange(-2, 2), randomRange(-2, 2));
    this.radius = randomRange(4, 12);
  }
  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }
  bounce(width, height) {
    if (this.pos.x <= 0 || this.pos.x >= width) this.vel.x *= -1;
    if (this.pos.y <= 0 || this.pos.y >= height) this.vel.y *= -1;
  }
  draw(context) {
    context.save()
    context.translate(this.pos.x, this.pos.y)
    context.lineWidth = 4
    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fillStyle = 'black';
    context.stroke();
    context.restore()
  }
}

let canvasElement;

const sketch = ({ context, width, height, canvas }) => {
  canvasElement = canvas;
  for (let i = 0; i < 30; i++) {
    agents.push(new Agent(randomRange(0, width), randomRange(0, height)));
  }
  if (canvas && !canvas.hasClickListener) {
    canvas.hasClickListener = true; 
    
    canvas.addEventListener("mousemove", e => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    
    canvas.addEventListener("mouseleave", () => {
      mouse.x = null;
      mouse.y = null;
    });
    
    canvas.addEventListener("click", e => {
    //   console.log("Canvas clicked!"); 
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      
    //   console.log(`pozycja : ${clickX}, ${clickY}`); 
      agents.shift() // jednego usuwa :)
      for(let j = 0; j < 2; j++) {
        agents.push(new Agent(clickX + Math.random(), clickY + Math.random())); // i dwa dodaje
      }
      console.log(`nowa kulka: ${agents.length}`); 
    });
  }

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    for (let i = 0; i < agents.length; i++) {
      const a = agents[i];
      for (let j = i + 1; j < agents.length; j++) {
        const b = agents[j];
        const dist = a.pos.getDistance(b.pos);
        if (dist > 200) continue;
        context.beginPath();
        context.moveTo(a.pos.x, a.pos.y);
        context.lineTo(b.pos.x, b.pos.y);
        // context.strokeStyle = "black"
        context.stroke();
      }
    }

    agents.forEach(agent => {
      if (mouse.x !== null && mouse.y !== null) {
        const dx = agent.pos.x - mouse.x;
        const dy = agent.pos.y - mouse.y;
        const dist = pitagorasa(dx, dy)
        if (dist < mouseRadius && dist > 0.0001) {
          const force = {
            x: dx / dist,
            y: dy / dist
          };
          const effect = mouseStrength * (1 - dist / mouseRadius);
          if (forceMode === "repel") {
            force.x *= -effect;
            force.y *= -effect;
          } else {
            force.x *= effect;
            force.y *= effect;
          }
          agent.vel.x += force.x;
          agent.vel.y += force.y;
        }
      }
      
      agent.update();
      agent.bounce(width, height);
      agent.draw(context);
    });
  };
};

canvasSketch(sketch, settings);