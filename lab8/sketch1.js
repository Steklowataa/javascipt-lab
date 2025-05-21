//do urochomienia: npm install
//canvas-sketch sketch1.js

const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

function randomRange(a, b) {
    return Math.random() * (a - b) + b
}

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    getDistanse(dis) {
        const dx = this.x - dis.x
        const dy = this.y - dis.y
        return Math.sqrt(dx*dx + dy*dy)
    }
}

class Agent {
    constructor(x, y) {
        this.pos = new Point(x, y);
        this.vel = new Point(randomRange(-1, 1), randomRange(-1, 1))
        this.radius = randomRange(4, 12)
    }

    bounce(width, height) {
        if(this.pos.x <= 0 || this.pos.x >= width) this.vel.x *= -1
        if(this.pos.y <= 0 || this.pos.y >= height) this.vel.y *= -1
    }
    update() {
        this.pos.x += this.vel.x
        this.pos.y += this.vel.y
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

const settings = {
    dimensions: [1080, 1080],
    animate: true
};

const sketch = ({ context, width, height }) => {
    const dots = [];
    for (let i = 0; i < 40; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        dots.push(new Agent(x, y));
    }

    return ({ context, width, height }) => {
        context.fillStyle = "white";
        context.fillRect(0, 0, width, height);

        for(let i = 0; i < dots.length; i++) {
            const dot1 = dots[i]
            for(let j = 0; j < dots.length; j++) {
                const dot2 = dots[j]
                const dis = dot1.pos.getDistanse(dot2.pos)

                if(dis > 200 ) continue;
                context.beginPath()
                context.moveTo(dot1.pos.x, dot1.pos.y)
                context.lineTo(dot2.pos.x, dot2.pos.y)
                context.stroke()
                
            }
        }
        dots.forEach(dot => {
            dot.update()
            dot.draw(context);
            dot.bounce(width, height)
        });
    };
};

canvasSketch(sketch, settings);
