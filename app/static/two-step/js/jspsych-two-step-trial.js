/**
* jspsych-two-step
* Sam Zorowitz, Branson Byers, Gili Karni
*
* Plug-in to run two-step task trial
**/

function noenter() {
	  return !(window.event && window.event.keyCode == 13);
	}

var jsPsychTwoStepTrial = (function (jspsych) {
  'use strict';
  const info = {
      name: 'two-step-trial',
    description: '',
    parameters: {
      transition: {
        type: jspsych.ParameterType.INT,
        pretty_name: 'Transition',
        description: 'State transition (common = 1, uncommon = 0).'
      },
      outcomes: {
        type: jspsych.ParameterType.INT,
        array: true,
        pretty_name: 'Outcomes',
        description: 'Reward outcome for each bandit (reward = 1, no reward = 0).'
      },
      rocket_colors: {
        type: jspsych.ParameterType.HTML_STRING,
        array: true,
        pretty_name: 'Rocket colors',
        description: 'Colors of the state 1 left/right rockets.'
      },
      planet_colors: {
        type: jspsych.ParameterType.HTML_STRING,
        array: true,
        pretty_name: 'Planet colors',
        description: 'Colors of the state 2 planets.'
      },
      aliens: {
        type: jspsych.ParameterType.HTML_STRING,
        array: true,
        pretty_name: 'Aliens',
        description: 'Paths to alien images (length 4 array).'
      },
      randomize_s1: {
        type: jspsych.ParameterType.BOOL,
        pretty_name: 'Randomize (state 1)',
        default: true,
        description: 'Randomize left/right positions of state 1 rockets.'
      },
      randomize_s2: {
        type: jspsych.ParameterType.BOOL,
        pretty_name: 'Randomize (state 2)',
        default: true,
        description: 'Randomize left/right positions of state 2 aliens.'
      },
      valid_responses_s1: {
        type: jspsych.ParameterType.KEYCODE,
        array: true,
        pretty_name: 'Valid responses',
        default: ['arrowleft', 'arrowright'],
        description: 'The keys the subject is allowed to press to respond during the first state.'
      },
      valid_responses_s2: {
        type: jspsych.ParameterType.KEYCODE,
        array: true,
        pretty_name: 'Valid responses',
        default: ['arrowleft', 'arrowright'],
        description: 'The keys the subject is allowed to press to respond during the second state.'
      },
      choice_duration: {
        type: jspsych.ParameterType.INT,
        pretty_name: 'Choice duration',
        default: null,
        description: 'How long to listen for responses before trial ends.'
      },
      feedback_duration: {
        type: jspsych.ParameterType.INT,
        pretty_name: 'Trial duration',
        default: 1000,
        description: 'How long to show feedback before it ends.'
      },
      animation: {
        type: jspsych.ParameterType.BOOL,
        pretty_name: 'Animation',
        default: true,
        desscription: 'Display animations during trial (true / false).'
      }
    }
  }

  class TwoStepTrialPlugin {
    constructor(jsPsych) {
        this.jsPsych = jsPsych;
    }
    trial(display_element, trial, on_load) {


    //---------------------------------------//
    // Section 1: Define HTML.
    //---------------------------------------//

    // Initialize HTML.
    var new_html = '';

    // Insert CSS (window animation).
		var new_html_style = '';
    new_html_style += `<style>
    body {
      height: 100vh;
      max-height: 100vh;
      overflow: hidden;
      position: fixed;
    }
    .jspsych-content-wrapper {
      background: #606060;
      z-index: -1;
    }
		.instructions-box {
      position: absolute;
      bottom: calc(0.60 * var(--height));
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, 0%);
      width: 600px;
      height: 150px;
      background: white;
      border: 2px solid grey;
      border-radius: 12px;
    }
		.instructions {
			position: absolute;
			top: 50%;
			left: 50%;
			-webkit-transform: translate(-50%, -50%);
			transform: translate(-50%, -50%);
			width: 95%;
		}
		.instructions p {
			font-size: 17px;
			line-height: 1.5em;
			margin-block-start: 0.5em;
			margin-block-end: 0.5em;
		}
    </style>`;

		new_html += new_html_style;
    // Open two-step container.
    new_html += '<div class="two-step-container">';

    // Draw sky & stars.
    new_html += '<div class="landscape-sky" state="1">';
    new_html += '<div class="stars"></div>';
    new_html += '</div>';

    // Draw ground.
    new_html += '<div class="landscape-ground" state="1"></div>';

    // Define mapping of rockets to sides.
    var state_1_ids = [0,1];
    if ( trial.randomize_s1 ) { state_1_ids = jsPsych.randomization.shuffle(state_1_ids); }

    // Draw rockets
    state_1_ids.forEach((j, i) => {
      new_html += `<div class="tower" id="tower-${i}" side="${i}"><div class="arm"></div></div>`;
      new_html += `<div class="platform" id="platform-${i}" side="${i}"></div>`;
      new_html += `<div class="rocket" id="rocket-${i}" state="1" side="${i}">`;
      new_html += '<div class="rocket-body">';
      new_html += `<div class="rocket-window" style="background: ${trial.rocket_colors[j]}"></div>`;
      new_html += '<div class="rocket-studs"></div>';
      new_html += `<div class="rocket-fin" side="0" style="background: ${trial.rocket_colors[j]}"></div>`;
      new_html += `<div class="rocket-fin" side="1" style="background: ${trial.rocket_colors[j]}"></div>`;
      new_html += `<div class="rocket-fire" id="fire-${i}"></div>`;
      new_html += '</div></div>';
    });

    // Define mapping of aliens to sides.
    var state_2_ids = [0,1];
    if ( trial.randomize_s2 ) { state_2_ids = jsPsych.randomization.shuffle(state_2_ids); }

    // Draw aliens
    state_2_ids.forEach((j, i) => {
      new_html += `<div class="alien" id="alien-${i}" state="1" side="${i}">`;
      new_html += `<img id="alien-${i}-img"></img>`;
      new_html += '</div>';
      new_html += `<div class="diamond" id="diamond-${i}" state="1" side="${i}"></div>`;
      new_html += `<div class="rock" id="rock-${i}" state="1" side="${i}"></div>`;
    });

    // Close wrapper.
    new_html += '</div>';

    // Draw HTML.
    display_element.innerHTML = new_html;

    //---------------------------------------//
    // Section 2: Response handling.
    //---------------------------------------//

    // confirm screen resolution
    const screen_resolution = [window.innerWidth, window.innerHeight];
    if (screen_resolution[0] < 540 || screen_resolution[1] < 400) {
      var minimum_resolution = 0;
    } else {
      var minimum_resolution = 1;
    }

    // Preallocate space
    var response = {
      state_1_key: null,
      state_1_choice: null,
      state_1_rt: null,
      state_2: null,
      state_2_key: null,
      state_2_choice: null,
      state_2_rt: null,
      outcome: null,
    }

    // function to handle missed responses
    var missed_response = function() {

      // Kill all setTimeout handlers.
      jsPsych.pluginAPI.clearAllTimeouts();
      jsPsych.pluginAPI.cancelAllKeyboardResponses();

			// Display warning message.
			const div0 = `<div class="instructions">`;

			const msg = timeouterr;//`<p style="position: absolute; left: 50%; top: 50%; -webkit-transform: translate(-50%, -50%); transform: translate(-50%, -50%); font-size: 20px; line-height: 1.5em; color: white">`+ timeouterr+`</p>`;
			const div1 = `</div>`;

			display_element.innerHTML = new_html_style + div0 + msg + div1;

      jsPsych.pluginAPI.setTimeout(function() {
        end_trial();
      }, 5000);

    }

    // handle responses during state 1
    var after_first_response = function(info) {

      // Kill all setTimeout handlers.
      jsPsych.pluginAPI.clearAllTimeouts();
      jsPsych.pluginAPI.cancelAllKeyboardResponses();

      // Record responses.
      response.state_1_rt = info.rt;
      response.state_1_key = trial.valid_responses_s1.indexOf(info.key);
      response.state_1_choice = state_1_ids[response.state_1_key];
      // console.log('s1 key:' , response.state_1_key, 's1 response:', state_1_ids[response.state_1_key])

      // Handle animations
      // If animation = true, then the rocket blast off animation will play.
      // Otherwise, the next state of the trial will present immediately.
      if ( trial.animation ) {

        display_element.querySelector('#fire-' + response.state_1_key).style['display'] = 'inherit';
        setTimeout(function() { state_transition(); }, 800);

      } else {

        state_transition();

      }

    };

    // Intermediate function to update screen objects from state 1 to state 2.
    var state_transition = function() {

      // Define second state.
      response.state_2 = ( trial.transition == 1 ) ? response.state_1_choice : 1 - response.state_1_choice;

      // Define second state ids.
      state_2_ids = state_2_ids.map(function(k) {return k + 2 * response.state_2});

      // Update background.
      display_element.querySelector('.landscape-sky').setAttribute('state', '2');
      display_element.querySelector('.landscape-ground').setAttribute('state', '2');
      display_element.querySelector('.landscape-ground').style['background'] = trial.planet_colors[response.state_2];

      // Hide rocket elements.
      display_element.querySelector('#platform-0').setAttribute('state', '2');
      display_element.querySelector('#platform-1').setAttribute('state', '2');
      display_element.querySelector('#tower-0').setAttribute('state', '2');
      display_element.querySelector('#tower-1').setAttribute('state', '2');

      // Re-position chosen rocket.
      display_element.querySelector('#rocket-' + response.state_1_key).setAttribute('state', '2');
			display_element.querySelector('#rocket-' + response.state_1_key).setAttribute('side', response.state_1_key);
      display_element.querySelector('#fire-' + response.state_1_key).style['display'] = 'none';
      display_element.querySelector('#rocket-' + (1 - response.state_1_key)).style['display'] = 'none';


      // Display aliens.
      display_element.querySelector('#alien-0-img').setAttribute('src', trial.aliens[state_2_ids[0]]);
      display_element.querySelector('#alien-0').setAttribute('state', '2');
      display_element.querySelector('#alien-1-img').setAttribute('src', trial.aliens[state_2_ids[1]]);
      display_element.querySelector('#alien-1').setAttribute('state', '2');

      // start the response listener
      var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: after_second_response,
        valid_responses: trial.valid_responses_s2,
        rt_method: 'performance',
        persist: false,
        allow_held_key: false
      });

      // end trial if no response.
      if (trial.choice_duration !== null) {
        jsPsych.pluginAPI.setTimeout(function() {
          missed_response();
        }, trial.choice_duration);
      }

    };

    // function to handle responses by the subject
    var after_second_response = function(info) {

      // Kill all setTimeout handlers.
      jsPsych.pluginAPI.clearAllTimeouts();
      jsPsych.pluginAPI.cancelAllKeyboardResponses();

      // Record responses.
      response.state_2_rt = info.rt;
      response.state_2_key = trial.valid_responses_s2.indexOf(info.key);
      response.state_2_choice = state_2_ids[response.state_2_key];
      response.outcome = trial.outcomes[response.state_2_choice];
      // console.log('s2 key:' , response.state_2_key, 's2 response:', state_2_ids[response.state_2_key])

      // console.log('outcome:',response.outcome)

			// Handle animations
      // If animation = true, then the rocket blast off animation will play.
      // Otherwise, the next state of the trial will present immediately.
			// if ( trial.animation ) {
			// 	console.log(response.state_2_key)
      //   display_element.querySelector('#alien-' + response.state_2_key).setAttribute('status', 'chosen');
			//
			// 	setTimeout(800);
			//
			// }
      state_2_feedback(response.state_2_key, response.outcome);


      // Present feedback.
      // state_2_feedback(response.state_2_key, response.outcome)

      // Pause for animation (2s).
      setTimeout(function() { end_trial(); }, trial.feedback_duration);

    };

    // function to present second state feedback.
    var state_2_feedback = function(side, outcome) {
      // display_element.querySelector('#alien-' + side).setAttribute('status', 'chosen');
      if (outcome == 1) {
        display_element.querySelector('#diamond-' + side).setAttribute('status', 'chosen');
      } else {
        display_element.querySelector('#rock-' + side).setAttribute('status', 'chosen');
      }
    }

    // function to end trial
    var end_trial = function() {

      // kill any remaining setTimeout handlers
      jsPsych.pluginAPI.clearAllTimeouts();

      // kill keyboard listeners
      if (typeof keyboardListener !== 'undefined') {
        jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
      }

      // gather the data to store for the trial
      var trial_data = {
        state_1_ids: state_1_ids,
        state_1_key: response.state_1_key,
        state_1_choice: response.state_1_choice,
        state_1_rt: response.state_1_rt,
        transition: trial.transition,
        state: response.state_2,
        state_2_ids: state_2_ids,
        state_2_key: response.state_2_key,
        state_2_choice: response.state_2_choice,
        state_2_rt: response.state_2_rt,
        outcome: response.outcome,
        rocket_colors: trial.rocket_colors,
        planet_colors: trial.planet_colors,
        screen_resolution: screen_resolution,
        minimum_resolution: minimum_resolution
      };

      // clear the display
      display_element.innerHTML = '';

      // move on to the next trial
      jsPsych.finishTrial(trial_data);
    };

    // start the response listener
    var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
      callback_function: after_first_response,
      valid_responses: trial.valid_responses_s1,
      rt_method: 'performance',
      persist: false,
      allow_held_key: false
    });

    // end trial if no response.
    if (trial.choice_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        missed_response();
      }, trial.choice_duration);
    }

  };

}
TwoStepTrialPlugin.info = info;

return TwoStepTrialPlugin;

})(jsPsychModule);
