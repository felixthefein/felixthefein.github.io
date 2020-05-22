let table;
let row;
let r = 0;
let time;
let sensorx;
let sensory;
let sensorz;
let dataForward = 0;
let red = 100;
let green;
let x = 0;
let scaled_blue = 255;
let autoPlay = false;
var INClight, fontReady = false;
var INCregular, fontReady = false;
var INCblack, fontReady = false;
var INC_LGCitalic, fontReady = false;

function fontRead(){
  fontReady = true;
}

function preload() {
  table = loadTable("assets/breeze_data_gs.csv", "csv", "noHeader");
<<<<<<< HEAD
  INClight = loadFont('assets/Inconsolata-light.ttf', fontRead);
=======
  INClight = loadFont('assets/Inconsolata-light.ttf', fontRead);
>>>>>>> 6c4a7dd70a55b586b21d635b9013a4893abf9278
  INCregular = loadFont('assets/Inconsolata-Regular.ttf', fontRead);
  INCblack = loadFont('assets/Inconsolata-Black.ttf', fontRead);
  INC_LGCitalic = loadFont('assets/Inconsolata-LGC-Italic.otf', fontRead);
}

function setup() {

  createCanvas(600, 600);
  frameRate(10000);
}

function draw() {

 let scaled_red = map(dataForward, 0, 43905, 230, 0);
 let scaled_green = map(dataForward, 0, 43905, 236, 12);
  
  if (scaled_green <= 50){
    scaled_blue = map(dataForward, 36000, 43905, 255, 10);
  }
  else {
    scaled_blue = 255;
  }

  background(scaled_red, scaled_green, scaled_blue, 255);
  
  if (r >= table.getRowCount()) {
    r = 0;
    background(50); //clear animation
  }
  row = table.getRow(dataForward);
  time = row.getString(0);
  sensorx = row.getNum(1);
  sensory = row.getNum(2);
  sensorz = row.getNum(3);
 
  print(time);
  print(dataForward);

  let scaled_sensorx = map(sensorx, 0, 1.5, 0, 5); //remap the sensor variable 
  let scaled_sensory = map(sensory, 0, 3, 0, 5);
  let scaled_sensorz = map(sensorz, 0, 5, 0, 5);

  let intensity_x = map(sensorx, 0, 1.5, 0, 100);
  let intensity_y = map(sensory, 0, 3, 0, 100);
  let intensity_z = map(sensory, 0, 5, 0, 100);

  noStroke();
  textAlign(CENTER);
  textStyle(NORMAL);
  fill(scaled_red, scaled_green, scaled_blue, 255);
  rect(scaled_red, scaled_green, scaled_blue, 255);
  rect(scaled_red, scaled_green, scaled_blue, 255);
 if (dataForward <= 20000){
   fill(75);
 }
 else {
   fill (225);
 }
  textSize(14);
  textFont(INCregular);
  text("time: " + time, 80, 40);
  text("intensity x: " + round(intensity_x), 80, 70);
  text("intensity y: " + round(intensity_y), 80, 88);
  text("intensity z: " + round(intensity_z), 80, 106);
  
  if (dataForward == 0){
    text("press left or right arrows to navigate data", width / 2, 542);
    stroke(255);
    noStroke();
  }
  else{
    noStroke();
    text(" ", width / 2, 550);
  }
  textSize(11);
  text("37° 45' 38.0556'' N", 300, 74);
  text("122° 25' 51.8448'' W", 300, 86);
  textSize(10);
  textFont(INCblack);
  text("FELIX FEIN 2020", width - 50, 20);
  textSize(30);
  textFont(INC_LGCitalic);
  text("BREEZE", 300, 55);
  fill(150);
  ellipse(532, 573, 30, 30); //play button
  ellipse(572, 573, 30, 30); //stop button
  ellipse(27, 573, 30 ,30); //14
  ellipse(67, 573, 30 ,30); //15
  ellipse(107, 573, 30 ,30); //16
  ellipse(147, 573, 30 ,30); //17
  ellipse(187, 573, 30 ,30); //18
  ellipse(227, 573, 30 ,30); //19
  ellipse(267, 573, 30 ,30); //20
  ellipse(307, 573, 30 ,30); //21
  ellipse(347, 573, 30 ,30); //22
  ellipse(387, 573, 30 ,30); //23
  fill(0);
  textStyle(NORMAL);
  textSize(10);
  textFont(INClight);
  text("PLAY", 532, 576);
  text("STOP", 572, 576);
  text("14:05", 26, 576);
  text("15:00", 66, 576);
  text("16:00", 106, 576);
  text("17:00", 146, 576);
  text("18:00", 186, 576);
  text("19:00", 226, 576);
  text("20:00", 266, 576);
  text("21:04", 306, 576);
  text("22:13", 346, 576);
  text("23:04", 386, 576);

  stroke(255);
  translate(width / 2, height / 2);

        fill(250);  
        smooth();
        beginShape();
        curveVertex(-150 + (scaled_sensorx * 200),0);
        curveVertex(-150 + (scaled_sensorx * 200),0);
        curveVertex(-150 + (scaled_sensory * 200),scaled_sensorz * 15);
        curveVertex(0,scaled_sensorz * 100);
        curveVertex(150 - (scaled_sensory * 200),scaled_sensorz * 15);
        curveVertex(150 - (scaled_sensorx * 200),0);
        curveVertex(150 - (scaled_sensorx * 200),0);
        endShape();

   

  r++;
  x++;

  if (autoPlay == true) {       //this tests to see if "autoplay" is on or off             
    dataForward++;
    if (dataForward >= table.getRowCount() - 1) {    //data will loop so it doesn't stop at the end of the rows
      dataForward = 0;
    }
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW && dataForward > 0) {
    dataForward--;
  } else if (keyCode === RIGHT_ARROW && dataForward < table.getRowCount() - 1) {
    dataForward++;
  }
}

function mousePressed() { 
  // Check if mouse is inside the circle
  let p = dist(mouseX, mouseY, 532, 576);
  if (p < 20) {
    fill(100);
    ellipse(532, 576, 30, 30); //play button
    autoPlay = true;
  }

  let s = dist(mouseX, mouseY, 572, 576);
    if (s < 20) {
      fill(100);
      ellipse(572, 576, 30, 30); //stop button
      autoPlay = false;
    }

  let a = dist(mouseX, mouseY, 26, 576);
    if (a < 20) {
      fill(100);
      ellipse(26, 576, 30, 30);
      dataForward = 0;
    }

  let b = dist(mouseX, mouseY, 66, 576);
    if (b < 20) {
      fill(100);
      ellipse(66, 576, 30, 30);
      dataForward = 6472;
    }

  let d = dist(mouseX, mouseY, 106, 576);
    if (d < 20) {
      fill(100);
      ellipse(106, 576, 30, 30);
      dataForward = 9032;
    }

  let f = dist(mouseX, mouseY, 146, 576);
    if (f < 20) {
      fill(100);
      ellipse(146, 576, 30, 30);
      dataForward = 13080;
    }

  let g = dist(mouseX, mouseY, 186, 576);
    if (g < 20) {
      fill(100);
      ellipse(186, 576, 30, 30);
      dataForward = 19325;
    }
  let h = dist(mouseX, mouseY, 226, 576);
    if (h < 20) {
      fill(100);
      ellipse(226, 576, 30, 30);
      dataForward = 26467;
      } 
      let i = dist(mouseX, mouseY, 266, 576);
      if (i < 20) {
        fill(100);
        ellipse(266, 576, 30, 30);
        dataForward = 33608;
        }    
  let j = dist(mouseX, mouseY, 306, 576);
        if (j < 20) {
          fill(100);
          ellipse(306, 576, 30, 30);
          dataForward = 39849;
          }          
  let k = dist(mouseX, mouseY, 346, 576);
          if (k < 20) {
            fill(100);
            ellipse(346, 576, 30, 30);
            dataForward = 40701;
            }     
  let l = dist(mouseX, mouseY, 386, 576);
            if (l < 20) {
              fill(100);
              ellipse(386, 576, 30, 30);
              dataForward = 41330;
              }                              
  }
