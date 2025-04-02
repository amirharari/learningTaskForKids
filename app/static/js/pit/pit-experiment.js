
function buildPITExperiment() {

  //------------------------------------//
  // Define experiment parameters.
  //------------------------------------//

  // Shuffle runsheets if desired
  // 1) Read the user’s choice from the global scope:
  var chosenStimuli = window.chosenStimuli;
  console.log("Chosen Stimuli = ", chosenStimuli);

  // 2) Decide which rune_set to use
  let rune_set;
  if (chosenStimuli === "1") {
    rune_set = "elianto";
    runsheets = jsPsych.randomization.shuffle(runsheets1);
  } else if (chosenStimuli === "2") {
    rune_set = "bacs1";
    runsheets = jsPsych.randomization.shuffle(runsheets2);
  } else {
    // fallback
    rune_set = "elianto";
  }

  console.log("Final rune_set:", rune_set);
  console.log("Final rune_sheet:", runsheets);

  // Define aesthetics
  let instr_color_win, scanner_color_win, outcome_color_win;
  let instr_color_lose, scanner_color_lose, outcome_color_lose;

  if (Math.random() < 1) {
    instr_color_win    = 'blue';
    scanner_color_win  = '#3366ff99';
    outcome_color_win  = '#1a3ea7';
    instr_color_lose   = 'red';
    scanner_color_lose = '#f73b6a7A';
    outcome_color_lose = '#930a25';
  } else {
    instr_color_win    = 'red';
    scanner_color_win  = '#f73b6a7A';
    outcome_color_win  = '#930a25';
    instr_color_lose   = 'blue';
    scanner_color_lose = '#3366ff99';
    outcome_color_lose = '#1a3ea7';
  }

  // Define go key

  //------------------------------------//
  // Define rune order
  //------------------------------------//

  // We'll skip random selection code, just rely on `rune_set`.

  if ( rune_set == 'elianto' ) {
  var runes_a = ['U', 'L', 'A', 'G', 'P', 'S', 'W', 'E', 'K', 'D', 'J', 'V'];
  var runes_b = ['M', 'R', 'Y', 'H', 'Z', 'C', 'B', 'T', 'X', 'F', 'N', 'Q'];
} else if ( rune_set == 'bacs1' ) {
  var runes_a = ['B', 'Z', 'J', 'R', 'V', 'E', 'T', 'F', 'A', 'C', 'L', 'Q'];
  var runes_b = ['Y', 'H', 'P', 'M', 'U', 'S', 'K', 'D', 'O', 'I', 'G', 'N'];
  } else if (rune_set === 'bacs2') {
     runes_a = ['J', 'W', 'X', 'Z', 'G', 'O', 'C', 'E', 'H', 'Q', 'T', 'Y'];
     runes_b = ['M', 'B', 'K', 'V', 'R', 'P', 'L', 'S', 'U', 'A', 'F', 'N'];
  }

  // Randomize presentation order
  if (Math.random() < 0.5) { runes_a.reverse(); }
  if (Math.random() < 0.5) { runes_b.reverse(); }
  var runes = (Math.random() < 0.5) ? [runes_a, runes_b] : [runes_b, runes_a];

  //------------------------------------//
  // Define experiment (PIT array).
  //------------------------------------//

  var PIT = [];

  // Build trial structures
  var n = 0;
  for (let i=0; i<runsheets.length; i++) {
    for (let j=0; j<runsheets[i]['robots'].length; j++) {

      jsPsych.randomization.shuffle([0,1,2,3]).forEach(function (k) {

        const robot    = runsheets[i]['robots'][j][k];
        const stimulus = runsheets[i]['stimuli'][j][k];

        // Valence & action
        const valence = (robot < 2) ? 'win' : 'lose';
        const action  = (robot % 2 === 0) ? 'go' : 'no-go';

        // Sham feedback?
        const sham = (Math.random() < 0.8) ? 0 : 1;
        let outcome_correct, outcome_incorrect;

        if (valence === 'win' && sham === 0) {
          outcome_correct   = '+10';
          outcome_incorrect = '+1';
        } else if (valence === 'win') {
          outcome_correct   = '+1';
          outcome_incorrect = '+10';
        } else if (valence === 'lose' && sham === 0) {
          outcome_correct   = '-1';
          outcome_incorrect = '-10';
        } else {
          outcome_correct   = '-10';
          outcome_incorrect = '-1';
        }

        // Screen size check
        const screen_check = {
          timeline: [{
            type: 'screen-check',
            min_width: min_width,
            min_height: min_height
          }],
          conditional_function: function() {
            if (window.innerWidth >= min_width && window.innerHeight >= min_height) {
              return false;
            } else {
              return true;
            }
          }
        }

        // Single trial
        const trial = {
          type: 'pit-trial',
          robot_rune: runes[i][stimulus],
          scanner_color: (valence === 'win') ? scanner_color_win : scanner_color_lose,
          outcome_color: (valence === 'win') ? outcome_color_win : outcome_color_lose,
          outcome_correct: outcome_correct,
          outcome_incorrect: outcome_incorrect,
          correct: (robot % 2 === 0) ? key_go : -1,
          rune_set: rune_set,
          valid_responses: [key_go],
          trial_duration: trial_duration,
          feedback_duration: feedback_duration,
          data: {
            block: i + 1,
            trial: n + 1,
            stimulus: stimulus,
            robot: robot + 1,
            valence: valence,
            action: action,
            sham: sham
          },
          on_finish: function(data) {
            data.browser_interactions = jsPsych.data.getInteractionData()
              .filter({trial: data.trial_index}).count();
          }
        };

        // Node with screen-check & the trial
        const trial_node = {
          timeline: [screen_check, trial]
        };

        // Add to PIT array
        PIT.push(trial_node);
        n++;
      });
    }
  }

  //------------------------------------//
  // Define transition screens
  //------------------------------------//

  var READY_01 = {
    type: 'pit-instructions',
    pages: [
      "כל הכבוד! עברתם בהצלחה את בדיקת ההבנה.",
      "התכוננו להתחיל את <b>בלוק 1/2</b>. זה ייקח כ-7 דקות.<br>לחצו \"הבא\" כאשר תהיו מוכנים להתחיל."
    ],
    show_clickable_nav: true,
    button_label_previous: "הקודם",
    button_label_next: "הבא",
    on_finish: function(trial) {
      pass_message('pit', 'block 1');
    }
  };

  var READY_02 = {
    type: 'pit-instructions',
    pages: [
      "קחו הפסקה של כמה רגעים ולחצו על כל מקש כאשר תהיו מוכנים להמשיך.",
      "התכוננו להתחיל את <b>בלוק 2/2</b>. זה ייקח כ-7 דקות.<br>לחצו \"הבא\" כאשר תהיו מוכנים להתחיל."
    ],
    show_clickable_nav: true,
    button_label_previous: "הקודם",
    button_label_next: "הבא",
    on_finish: function(trial) {
      pass_message('pit', 'block 2');
    }
  };

  var FINISHED = {
    type: 'pit-instructions',
    pages: [
      "כל הכבוד! סיימתם את המשימה."
    ],
    show_clickable_nav: true,
    button_label_previous: "הקודם",
    button_label_next: "הבא"
  };

  // 3) Return the important pieces
  return {
    PIT: PIT,
    READY_01: READY_01,
    READY_02: READY_02,
    FINISHED: FINISHED
  };
}
