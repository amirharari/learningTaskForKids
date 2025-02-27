/***********************************************
 * Full Second File with Updated Parameters
 ***********************************************/

//---------------------------------------//
// Define parameters.
//---------------------------------------//

// Toggle for testing short blocks vs full blocks
const testMode = true;
// Number of mini-blocks (4) and sequences (15 each by default)
const N_block_sequences = 15;  // 15 repeats => 60 trials/block if test=false
const N_bandits         = 4;   // 4 bandits
const N_mini_blocks = 4;
const repeatsPerMiniBlock = testMode ? 2 : N_block_sequences;

// Now compute total the same way your loop does
const total_trials = N_mini_blocks * repeatsPerMiniBlock * N_bandits;
// Calculate total trials (4 blocks * 15 sequences * 4 bandits = 240 if test=false)
const N_trials_first_part = total_trials/2;
// Define point values
var face_up_points   = 5;
var high_card_points = 10;
var low_card_points  = 0;

// Define bandit probabilities
const banditProbabilities = [0.20, 0.40, 0.60, 0.80];

// Define response parameters
const valid_responses = ['arrowleft', 'arrowright'];

// Define trial timings
const choice_duration   = 6000;  // up to 6000 ms to choose
const confirmation_duration = 450; // short confirmation
const feedback_duration     = 1750; // total feedback/outcome

// Randomization factor for card position (optional)
const card_position_randomization = 0.5;

// Trial keys
const trial_keys = ['0', '1'];

//---------------------------------------//
// Define color array with your "order" logic
//---------------------------------------//
var order = jsPsych.randomization.sampleWithoutReplacement([
  [0,2,1,3], [0,2,3,1], [2,0,1,3], [2,0,3,1],
  [1,3,0,2], [1,3,2,0], [3,1,0,2], [3,1,2,0]
], 1)[0];

// Build a single array of 16 colors in a random arrangement
var colors = [];
order.forEach((i) => {
  if (i==0) {
    colors = colors.concat(
      jsPsych.randomization.shuffle(['#387da2','#993333','#b19e3c','#6e6e6e'])
    );
  } else if (i==1) {
    colors = colors.concat(
      jsPsych.randomization.shuffle(['#245169','#732626','#8b7c2f','#5c5c5c'])
    );
  } else if (i==2) {
    colors = colors.concat(
      jsPsych.randomization.shuffle(['#538348','#bc6d2f','#6a4173','#56391c'])
    );
  } else {
    // i == 3
    colors = colors.concat(
      jsPsych.randomization.shuffle(['#3e6236','#a15417','#4c2f52','#4e3419'])
    );
  }
});

//---------------------------------------//
// Define stimuli (4 groups of 4 images).
//---------------------------------------//

var stimuli1 = jsPsych.randomization.shuffle([
  jsPsych.randomization.shuffle([
    '../static/mrst/img/animals/bird-crane-shape.svg',
    '../static/mrst/img/animals/deer-silhouette.svg',
    '../static/mrst/img/animals/gecko-reptile-shape.svg',
    '../static/mrst/img/animals/seahorse-silhouette.svg'
  ]),
  jsPsych.randomization.shuffle([
    '../static/mrst/img/animals/snail-shape.svg',
    '../static/mrst/img/animals/kangaroo-shape.svg',
    '../static/mrst/img/animals/parrot-shape.svg',
    '../static/mrst/img/animals/frog-shape.svg'
  ]),
  jsPsych.randomization.shuffle([
    '../static/mrst/img/animals/bear-black-shape.svg',
    '../static/mrst/img/animals/bird-shape.svg',
    '../static/mrst/img/animals/crocodile-shape.svg',
    '../static/mrst/img/animals/monkey.svg'
  ]),
  jsPsych.randomization.shuffle([
    '../static/mrst/img/animals/squirrel-shape.svg',
    '../static/mrst/img/animals/bull-silhouette.svg',
    '../static/mrst/img/animals/dolphin-mammal-animal-silhouette.svg',
    '../static/mrst/img/animals/swift-bird-shape.svg'
  ])
]);

var stimuli2 = jsPsych.randomization.shuffle([
  jsPsych.randomization.shuffle([
    '../static/mrst/img/animals/owl-bird-shape.svg',
    '../static/mrst/img/animals/horse-silhouette.svg',
    '../static/mrst/img/animals/chameleon-reptile-shape.svg',
    '../static/mrst/img/animals/shark-shape.svg'
  ]),
  jsPsych.randomization.shuffle([
    '../static/mrst/img/animals/slug-shape.svg',
    '../static/mrst/img/animals/koala-silhouette.svg',
    '../static/mrst/img/animals/grasshopper-insect-side-view-shape.svg',
    '../static/mrst/img/animals/flamingo.svg'
  ]),
  jsPsych.randomization.shuffle([
    '../static/mrst/img/animals/tiger.svg',
    '../static/mrst/img/animals/hawk-bird-animal-shape.svg',
    '../static/mrst/img/animals/snake-silhouette.svg',
    '../static/mrst/img/animals/running-lion.svg'
  ]),
  jsPsych.randomization.shuffle([
    '../static/mrst/img/animals/fox-shape.svg',
    '../static/mrst/img/animals/sheep.svg',
    '../static/mrst/img/animals/orca-silhouette.svg',
    '../static/mrst/img/animals/pigeon-bird-shape.svg'
  ])
]);
//------------------------------------//
// Define instructions / practice config (optional).
//------------------------------------//

var PRACTICE_INFO = {
  colors: ["#3d85c690", "#6aa84f91"],
  img: [
    "../static/mrst/img/animals/rabbit-shape.svg",
    "../static/mrst/img/animals/horse-black-shape.svg"
  ],
  face_up_points : 5,
  face_down_points_prob:[0.85, 0.15],
  outcomes_1:[10, 0, 10, 10, 10, 0, 10, 10],
  outcomes_2:[0, 0, 10, 0, 0, 0, 10, 0]
};

// Define comprehension thresholds, if needed
const max_errors = 0;
const max_loops = 6;

// Screen size parameters
var min_width  = 480;
var min_height = 295;

// Preload images / audio
const preload_images = [
  "../static/mrst/img/instructions/instructions02.png",
  "../static/mrst/img/instructions/instructions03.png",
  "../static/mrst/img/instructions/instructions05.png",
  "../static/mrst/img/instructions/instructions06.png",
  stimuli1.flat(),
  stimuli2.flat()
];

const preload_audio = [
  '../static/pgng/audio/coutndown1.mp3'
];

// Define image scaling CSS
const style = "width:auto; height:auto; max-width:100%; max-height:450px;";
