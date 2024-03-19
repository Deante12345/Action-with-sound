let osc;
let lfo;
let isPlaying = false;

function preload() {
  laser = loadImage('Assests/amber.jpeg');
}

function setup() {
  createCanvas(400, 400);

  osc = new Tone.Synth({
    oscillator: {
      type: 'sine'
    },
    envelope: {
      attack: 0.01,
      decay: 0.2,
      sustain: 0.5,
      release: 0.1
    }
  }).toDestination();

  // Initialize the LFO and connect it to the oscillator's frequency
  lfo = new Tone.LFO({
    frequency: 900,
    min: 60,
    max: 120
  });
  lfo.connect(osc.oscillator.frequency);
  lfo.start();
}

function draw() {
  if (mouseIsPressed) {
    background(laser);
    if (!isPlaying) {
      playSound();
      isPlaying = true;
    }
  } else {
    background(240);
    text('Press left click for amber alert', 125, height / 2);
    if (isPlaying) {
      stopSound();
      isPlaying = false;
    }
  }
}

function playSound() {
  osc.triggerAttack("C4");
}

function stopSound() {
  osc.triggerRelease();
}

function mouseReleased() {
  if (isPlaying) {
    stopSound();
    isPlaying = false;
  }
}
