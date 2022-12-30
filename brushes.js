const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;

// Current tool settings
let p; // Processing object, accessible from anywhere
let color0 = [330, 70, 55];
let color1 = [40, 100, 95];
let brushSize = 0.3;

function startDrawing(p) {
  // Change if you want to start with a different background,
  // or even *no background!*
  p.background("rgb(240, 230, 250)");
}

let brushes = [
  // Your brushes here!
  {
    label: "✖",
    isActive: true,
    description: "eraser for unhappy accidents",

    setup() {
      //       When the user clicks erase, what happens?
    },

    mouseDragged() {
      let x = p.mouseX;
      let y = p.mouseY;
      let s = brushSize * 50 + 1;

      p.noStroke();
      p.fill("rgb(240, 230, 250)")
      p.circle(x,y, s)
    }
  },
  
  
      //======================================================
    {
      label: "✎",
      isActive: true,
      description: "step one: draw a rotund body for the bun",
  
      mousePressed() {
        //       We need to store the points
        this.points = [];
        // We can start storing a new set of points when the mouse is pressed
      },
  
      mouseDragged() {
        let x = p.mouseX;
        let y = p.mouseY;
        // Add a new point to the beginning of this list
        this.points.unshift([x, y]);
  
        p.stroke(color0);
        p.fill(color1)
        p.strokeWeight(brushSize * 2 + 5);
        p.beginShape();
  
        // Take every...10th? point
        // What happens if you change this
        this.points
          .forEach(([x, y]) => {
            let dx = 0;
            let dy = 0;
  
            p.vertex(x + dx, y + dy);
            p.curveVertex(x + dx, y + dy);
      
          });
        p.endShape();
      },
    },

  
  //======================================================

  {
    label: "ᕱᕱ",
    isActive: true,
    description:
      "step two: click on top of bun's head and drag",

      mousePressed() {
        //       We need to store the points
        this.points = [];
        // We can start storing a new set of points when the mouse is pressed
      },
  
      mouseDragged() {
        let x = p.mouseX;
        let y = p.mouseY;
        // Add a new point to the end of this list
        this.points.push([x, y]);

        p.beginShape();
        this.points

          .filter((pt, index) => index > 4)
          .forEach(([x, y]) => {
  
          // outline
          p.stroke(color0[0], color0[1], color0[2]);
          p.noFill();
          p.strokeWeight(brushSize * 22 + 20);
          p.curveVertex(x, y);});
        p.endShape();

        p.beginShape();
        this.points
          .forEach(([x, y]) => {
  
        // ear outside
        p.stroke(color1[0], color1[1], color1[2]);
        p.strokeWeight(brushSize * 20 + 10);
        p.curveVertex(x,y)});
        p.endShape();

        p.beginShape();
        this.points
          .filter((pt, index) => index > 4)
          .forEach(([x, y]) => {
  
        // ear inside
        let y2 = y+5+brushSize*3
        p.stroke(color0[0], color0[1], color0[2]);
        p.strokeWeight(brushSize * 12 + 5);
        p.curveVertex(x,y2)});
        p.endShape();
    },
  },
  //======================================================
  {
    label: "•ᴥ•",
    description: "step three: click to make bun's face",
    isActive: true,

    mousePressed() {
      let eyes = ["｡","⁃","‸","•"];
      let mouths = ["ﻌ","ᆽ","ᴥ","ｪ","ᆺ"];
      console.log("Mouse clicked");
      let x = p.mouseX;
      let y = p.mouseY;

      let size = brushSize * 20 + 20;
      let count = 1;

      p.fill(color0[0], color0[1], color0[2]);

      for (var i = 0; i < count; i++) {
        p.textSize(size);
        let eye = p.random(eyes);
        let mouth = p.random(mouths);
        let spaces = Math.round(brushSize*2);
        let singlespace = " ";
        let space = singlespace.repeat(spaces+5);
        p.strokeWeight(1);
        p.text(eye + space + eye, x - 10 - brushSize*60, y);
        p.text(mouth, x - brushSize*30+5, y + brushSize*10 + 5);
      }
    },
  },
    //======================================================
    {
      label: "˶ᵔᵕᵔ˶",
      isActive: true,
      description:
        "step four: shade bun or make bun blush (˃ㅅ˂)",
  
      // Using "draw" because pmouseX only remembers the mouse pos
      // each "frame" which is slightly different than
      // each time we drag the mouse
      draw() {
        console.log("draw");
        let x = p.mouseX;
        let y = p.mouseY;
        let x1 = p.pmouseX;
        let y1 = p.pmouseY;
  
        if (p.mouseIsPressed) {
          p.stroke(color0[0], 70, 80, 0.05);
          p.strokeWeight(brushSize * 25 + 10);
          p.line(x, y, x1, y1);
        }
      },
    }
];
