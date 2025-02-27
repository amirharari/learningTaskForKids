
var stimuli = null;   // We pick which set in pickStimuliSet()
var MRST    = [];     // We build this array after we pick stimuli


function pickStimuliSet() {
  // If userStimuliChoice is "2", we pick stimuli2; else stimuli1
  console.log("pickStimuliSet() called. userStimuliChoice =", window.userStimuliChoice);

  if (window.userStimuliChoice === "2") {
    stimuli = stimuli2;
  } else {
    stimuli = stimuli1;
  }
  console.log("Chosen stimuli set => stimuli =", stimuli);
}

/***********************************************
 * buildMRST()
 * Builds the main MRST array AFTER we've picked
 * 'stimuli'
 ***********************************************/
function buildMRST() {

  console.log("buildMRST() called. Building the main experiment array...");

  // globalTrialIndex tracks overall progress
  var globalTrialIndex = 0;

  // This tracks how many times each global bandit index (0..15) has appeared so far.
  var banditExposures = Array(N_mini_blocks * N_bandits).fill(0);

  // We'll build a local array of trials
  var newMRST = [];

  // Shuffle helper: avoid any triple repeats
  function shuffleNoTriple(originalArray) {
    let shuffled = jsPsych.randomization.shuffle(originalArray);
    while (hasTriple(shuffled)) {
      shuffled = jsPsych.randomization.shuffle(originalArray);
    }
    return shuffled;

    function hasTriple(arr) {
      for (let i = 2; i < arr.length; i++) {
        if (arr[i] === arr[i - 1] && arr[i] === arr[i - 2]) {
          return true;
        }
      }
      return false;
    }
  }

  // Main loop over the 4 mini-blocks
  for (let miniBlockIndex = 0; miniBlockIndex < N_mini_blocks; miniBlockIndex++) {

    // (1) Build a local array of bandit indices for this mini-block.
    let banditOrderThisBlock = [];
    for (let repeatIndex = 0; repeatIndex < repeatsPerMiniBlock; repeatIndex++) {
      for (let localBanditIndex = 0; localBanditIndex < N_bandits; localBanditIndex++) {
        let globalBanditIndex = miniBlockIndex * N_bandits + localBanditIndex;
        banditOrderThisBlock.push(globalBanditIndex);
      }
    }

    // Shuffle so there are no triple repeats in a row
    banditOrderThisBlock = shuffleNoTriple(banditOrderThisBlock);

    // Track frequency and positive outcomes for each global bandit
    let freqCounter    = {};
    let positiveCounts = {};
    let banditProbMap  = {};

    // (2) Create trials for each global bandit index
    banditOrderThisBlock.forEach((globalBanditIndex) => {

      // Probability for this bandit (use mod 4, since we have 4 bandit probabilities)
      let currentBanditProb = banditProbabilities[ globalBanditIndex % N_bandits ];

      // Decide points for this draw
      const currentDrawPoints = (Math.random() < currentBanditProb)
        ? high_card_points
        : low_card_points;

      // Update frequency / positive counts
      freqCounter[globalBanditIndex] = (freqCounter[globalBanditIndex] || 0) + 1;
      if (currentDrawPoints === high_card_points) {
        positiveCounts[globalBanditIndex] = (positiveCounts[globalBanditIndex] || 0) + 1;
      }
      banditProbMap[globalBanditIndex] = currentBanditProb;

      // localBanditIndex helps pick the correct stimulus
      let localBanditIndex = globalBanditIndex - (miniBlockIndex * N_bandits);

      // Build a jsPsych trial
      var singleTrial = {
        type: jsPsychMRSTTrial,
        stimulus: stimuli[miniBlockIndex][localBanditIndex],  // use the chosen stimuli
        card_color: colors[ globalBanditIndex ], 
        card_points: currentDrawPoints,
        certain_points: face_up_points,
        choice_duration: choice_duration,
        randomize: true,
        confirmation_duration: confirmation_duration,
        feedback_duration: feedback_duration,
        valid_responses: trial_keys,
        data: {
          bandit: globalBanditIndex + 1,
          probability: currentBanditProb,
          miniBlock: miniBlockIndex + 1,
          trialNumberOverall: globalTrialIndex + 1,
          exposureCount: banditExposures[globalBanditIndex] + 1,
          phase: 'experiment'
        },
        on_finish: function(trialData) {
          // Update progress bar
          var currProgressBarValue = jsPsych.getProgressBarCompleted();
          if (miniBlockIndex < 2) {
            jsPsych.setProgressBar(currProgressBarValue + (1 / N_trials_first_part));
          } else {
            jsPsych.setProgressBar(currProgressBarValue + (1 / (total_trials - N_trials_first_part)));
          }

          // Log the number of browser interactions
          trialData.browser_interactions = jsPsych.data
            .getInteractionData()
            .filter({ trial: trialData.trial_index })
            .count();

          // Mark trial as missed if no choice was made
          trialData.missing = (trialData.choice == null);
        }
      };

      // Looping node to repeat if missed
      const singleTrialNode = {
        timeline: [ singleTrial ],
        loop_function: function(finishedData) {
          return finishedData.values()[0].missing;
        }
      };

      newMRST.push(singleTrialNode);

      // Increment counters
      globalTrialIndex++;
      banditExposures[ globalBanditIndex ]++;
    });

    // (Optional) log summary to console
    console.log(`MINI-BLOCK ${miniBlockIndex + 1} (Test mode? ${testMode})`);
    let banditsInBlock = Object.keys(freqCounter).map(Number).sort((a,b) => a - b);
    banditsInBlock.forEach((banditKey) => {
      let totalCount   = freqCounter[banditKey];
      let positiveHits = positiveCounts[banditKey] || 0;
      let zeroHits     = totalCount - positiveHits;
      let probValue    = banditProbMap[banditKey];
      console.log(`   Bandit ${banditKey}, p=${probValue}, total:${totalCount}, +10:${positiveHits}, +0=${zeroHits}`);
    });
  }


  return newMRST;
}


// Screen before Part 1
var READY_01 = {
  type: jsPsychMRSTInstructions,
  pages: [
    { prompt: instructions23 },
    { prompt: instructions24 },
    { prompt: instructions25 },
    { prompt: instructions25a },
    { prompt: instructions26 }
  ],
  key_forward: next_key,
  key_backward: previous_key,
  button_labels: [previous_label, next_label],
  left_to_right: reading_dir_left_to_right,
  on_start: function(){
    jsPsych.setProgressBar(0);
  },
  on_finish: function(){
    jsPsych.setProgressBar(0);
  }
};

// Optional intermediate screen
var PRE_READY_02 = {
  type: jsPsychMRSTInstructions,
  pages: [ { prompt: instructions27a } ],
  key_forward: next_key,
  key_backward: previous_key,
  button_labels: [previous_label, next_label],
  left_to_right: reading_dir_left_to_right,
  on_start: function() {
    jsPsych.setProgressBar(0);
  }
};

// Screen before Part 2
var READY_02 = {
  type: jsPsychMRSTInstructions,
  pages: [
    { prompt: instructions28 }
  ],
  key_forward: next_key,
  key_backward: previous_key,
  button_labels: [previous_label, next_label],
  left_to_right: reading_dir_left_to_right,
  on_start: function(){
    jsPsych.setProgressBar(0);
  }
};

// Finish screen
var FINISHED = {
  type: jsPsychMRSTInstructions,
  pages: [
    { prompt: instructions31 }
  ],
  key_forward: next_key,
  key_backward: previous_key,
  button_labels: [previous_label, next_label],
  left_to_right: reading_dir_left_to_right,
  on_start: function(){
    jsPsych.setProgressBar(1);
  }
};
