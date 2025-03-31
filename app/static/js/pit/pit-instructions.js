
const color_win = "#0000FF";  // כחול
const color_lose = "#FF0000"; // אדום


const str_color_win = "כחול"; 
const str_color_lose = "אדום";

//------------------------------------//
// ספי מבחן הבנה
//------------------------------------//
const max_comp_loops = 10;
const max_errors = 0;

//------------------------------------//
// הוראות
//------------------------------------//

var instructions_01 = {
  type: 'pit-instructions',
  pages: [
    "ברוכים הבאים למשחק <b>מפעל הרובוטים</b>!",
    "במשחק זה תבדקו רובוטים כשהם מתקדמים לאורך פס הייצור אל תוך ה<b>סורק</b>.",
    "לעיתים רובוט במפעל יזדקק לתיקון.<br>באיזו תדירות רובוט יצטרך תיקון <b>תלויה בסוג שלו.</b>",
    "קיימים סוגים רבים של רובוטים. כל סוג של רובוט<br>ניתן לזיהוי באמצעות ה<b>סמל הייחודי</b> שעל לוח החזה שלו.",
    "כאשר רובוט נכנס לסורק, עליכם להחליט אם:<br><b>לתקן</b> את הרובוט (לחצו על מקש הרווח) <br><b>להתעלם</b> מהרובוט (לא ללחוץ כלל)",
    "תקבלו את מירב הנקודות על תיקון רובוטים שבאמת זקוקים לתיקון, והתעלמות מרובוטים שאינם זקוקים לתיקון.",
    `חשוב לזכור, כמות הנקודות שתוכלו להרוויח או להפסיד תלויה<br>בשאלה האם הרובוט הוא <b><font color=${color_win}>בטוח</font></b> או <b><font color=${color_lose}>מסוכן</font></b>.`,
    `אם הסורק בצבע <b><font color=${color_win}>${str_color_win}</font></b>, הרובוט הוא <b><font color=${color_win}>בטוח</font></b>.<br>תרוויחו +10 נקודות על פעולה נכונה (תיקון או התעלמות נכונים)<br>ותקבלו +1 נקודה בלבד על פעולה שגויה.`,
    "עכשיו נתאמן עם רובוט בטוח. נסו ללמוד אם<br>כדאי לתקן (מקש הרווח) או להתעלם ממנו (לא ללחוץ כלל).<br><b>זכרו:</b> תרוויחו +10 נקודות על הפעולה הנכונה.",
    "<b>רמז:</b> לחצו רק לאחר שהרובוט נכנס לסורק<br>ואור הסורק נדלק."
  ],
  robot_runes: [
    '', '', '', 'O', '', '', '', '', ''
  ],
  scanner_colors: [
    '#FFFFFF00', '#FFFFFF00', '#FFFFFF00', '#FFFFF080', '#FFFFFF00', '#FFFFFF00',
    '#FFFFFF00', color_win, color_win, color_win
  ],
  show_clickable_nav: true,
  button_label_previous: "הקודם",
  button_label_next: "הבא"
}

var instructions_02 = {
  type: 'pit-instructions',
  pages: [
    "עכשיו נתאמן עם סוג אחר של רובוט בטוח.<br>נסו ללמוד אם כדאי לתקן רובוט זה (מקש הרווח)<br>או להתעלם ממנו (לא ללחוץ כלל).",
    "<b>זכרו:</b> לא כל רובוט זקוק לתיקון,<br>ותרוויחו +10 נקודות על הפעולה הנכונה."
  ],
  show_clickable_nav: true,
  button_label_previous: "הקודם",
  button_label_next: "הבא"
}

var instructions_03 = {
  type: 'pit-instructions',
  pages: [
    `אם הסורק בצבע <b><font color=${color_lose}>${str_color_lose}</font></b>, הרובוט הוא <b><font color=${color_lose}>מסוכן</font></b>.<br>תפסידו רק -1 נקודה על פעולה נכונה (תיקון או התעלמות נכונים)<br>אבל תפסידו -10 נקודות על פעולה שגויה.`,
    "עכשיו נתאמן עם רובוט מסוכן. נסו ללמוד אם<br>כדאי לתקן אותו (מקש הרווח) או להתעלם ממנו (לא ללחוץ כלל).<br><b>זכרו:</b> תפסידו רק -1 נקודה על הפעולה הנכונה.",
  ],
  show_clickable_nav: true,
  button_label_previous: "הקודם",
  button_label_next: "הבא",
}

var instructions_04 = {
  type: 'pit-instructions',
  pages: [
    "עכשיו נתאמן עם סוג נוסף של רובוט מסוכן.<br>נסו ללמוד אם כדאי לתקן רובוט זה (מקש הרווח)<br>או להתעלם ממנו (לא ללחוץ כלל).",
    "<b>זכרו:</b> חלק מהרובוטים המסוכנים זקוקים לתיקון, ו<br>תפסידו רק -1 נקודה על הפעולה הנכונה."
  ],
  show_clickable_nav: true,
  button_label_previous: "הקודם",
  button_label_next: "הבא",
}

var instructions_05 = {
  type: 'pit-instructions',
  pages: [
    "עבודה מצוינת! אנחנו כמעט מוכנים להתחיל את המשחק.",
    "<b>זכרו:</b> לא כל רובוט מאותו הסוג יזדקק לתיקון,<br>אך יש סוגי רובוטים שיזדקקו לתיקון בתדירות גבוהה יותר מאחרים.",
    "שימו לב היטב לסמל של הרובוט כי הוא יעזור לכם<br>להחליט אם לתקן את הרובוט (מקש הרווח)<br>או להתעלם ממנו (לא ללחוץ כלל).",
    "נסו להרוויח כמה שיותר נקודות, ולהימנע מהפסדים.",
    "בתום המשימה, מספר הנקודות הכולל שצברתם<br>יומר ל<b>בונוס ביצועים</b>.",
    "כעת נבדוק את הבנתכם באמצעות כמה שאלות."
  ]
}

//------------------------------------//
// בלוק אימון #1
//------------------------------------//

var practice_01_counter = 0;

const practice_01_trial = {
  type: 'pit-trial',
  robot_rune: '1',
  scanner_color: color_win,
  outcome_color: color_win,
  outcome_correct: '+10',
  outcome_incorrect: '+1',
  correct: key_go,
  valid_responses: [key_go],
  trial_duration: trial_duration,
  feedback_duration: feedback_duration,
  data: {block: 0, practice: 1},
  on_finish: function(data) {
    if (data.accuracy === 1) {
      practice_01_counter++;
    } else {
      practice_01_counter = 0;
    }
  }
}

const practice_01_node = {
  timeline: [practice_01_trial],
  conditional_function: function() {
    return practice_01_counter < 3;
  }
}

const practice_01_help = {
  type: 'pit-instructions',
  pages: [
    "נראה שאתם מתקשים.",
    "נסו לתקן את הרובוט הזה (לחצו על מקש הרווח).<br>עבור רובוט בטוח, תרוויחו +10 נקודות<br>אם תפעלו נכון."
  ],
  show_clickable_nav: true,
  button_label_previous: "הקודם",
  button_label_next: "הבא",
}

const practice_01_help_node = {
  timeline: [practice_01_help],
  conditional_function: function() {
    return practice_01_counter < 3;
  }
}

const practice_block_01 = {
  timeline: [
    practice_01_node, practice_01_node, practice_01_node,
    practice_01_node, practice_01_node, practice_01_node,
    practice_01_node, practice_01_node, practice_01_help_node
  ],
  loop_function: function() {
    return practice_01_counter < 3;
  }
}

//------------------------------------//
// בלוק אימון #2
//------------------------------------//

var practice_02_counter = 0;

const practice_02_trial = {
  type: 'pit-trial',
  robot_rune: '2',
  scanner_color: color_win,
  outcome_color: color_win,
  outcome_correct: '+10',
  outcome_incorrect: '+1',
  correct: -1,
  valid_responses: [key_go],
  trial_duration: trial_duration,
  feedback_duration: feedback_duration,
  data: {block: 0, practice: 2},
  on_finish: function(data) {
    if (data.accuracy === 1) {
      practice_02_counter++;
    } else {
      practice_02_counter = 0;
    }
  }
}

const practice_02_node = {
  timeline: [practice_02_trial],
  conditional_function: function() {
    return practice_02_counter < 3;
  }
}

const practice_02_help = {
  type: 'pit-instructions',
  pages: [
    "נראה שאתם מתקשים.<br>זכרו, לא כל רובוט צריך תיקון.",
    "נסו להתעלם מהרובוט הזה (לא ללחוץ כלל).<br>עבור רובוט בטוח, תרוויחו +10 נקודות<br>אם תפעלו נכון."
  ],
  show_clickable_nav: true,
  button_label_previous: "הקודם",
  button_label_next: "הבא",
}

const practice_02_help_node = {
  timeline: [practice_02_help],
  conditional_function: function() {
    return practice_02_counter < 3;
  }
}

const practice_block_02 = {
  timeline: [
    practice_02_node, practice_02_node, practice_02_node,
    practice_02_node, practice_02_node, practice_02_node,
    practice_02_node, practice_02_node, practice_02_help_node
  ],
  loop_function: function() {
    return practice_02_counter < 3;
  }
}

//------------------------------------//
// בלוק אימון #3
//------------------------------------//

var practice_03_counter = 0;

const practice_03_trial = {
  type: 'pit-trial',
  robot_rune: '3',
  scanner_color: color_lose,
  outcome_color: color_lose,
  outcome_correct: '-1',
  outcome_incorrect: '-10',
  correct: -1,
  valid_responses: [key_go],
  trial_duration: trial_duration,
  feedback_duration: feedback_duration,
  data: {block: 0, practice: 3},
  on_finish: function(data) {
    if (data.accuracy === 1) {
      practice_03_counter++;
    } else {
      practice_03_counter = 0;
    }
  }
}

const practice_03_node = {
  timeline: [practice_03_trial],
  conditional_function: function() {
    return practice_03_counter < 3;
  }
}

const practice_03_help = {
  type: 'pit-instructions',
  pages: [
    "נראה שאתם מתקשים.",
    "נסו להתעלם מהרובוט הזה (לא ללחוץ כלל).<br>עבור רובוט מסוכן, תפסידו רק -1 נקודה<br>אם תפעלו נכון."
  ],
  show_clickable_nav: true,
  button_label_previous: "הקודם",
  button_label_next: "הבא",
}

const practice_03_help_node = {
  timeline: [practice_03_help],
  conditional_function: function() {
    return practice_03_counter < 3;
  }
}

const practice_block_03 = {
  timeline: [
    practice_03_node, practice_03_node, practice_03_node,
    practice_03_node, practice_03_node, practice_03_node,
    practice_03_node, practice_03_node, practice_03_help_node
  ],
  loop_function: function() {
    return practice_03_counter < 3;
  }
}

//------------------------------------//
// בלוק אימון #4
//------------------------------------//

var practice_04_counter = 0;

const practice_04_trial = {
  type: 'pit-trial',
  robot_rune: '4',
  scanner_color: color_lose,
  outcome_color: color_lose,
  outcome_correct: '-1',
  outcome_incorrect: '-10',
  correct: key_go,
  valid_responses: [key_go],
  trial_duration: trial_duration,
  feedback_duration: feedback_duration,
  data: {block: 0, practice: 4},
  on_finish: function(data) {
    if (data.accuracy === 1) {
      practice_04_counter++;
    } else {
      practice_04_counter = 0;
    }
  }
}

const practice_04_node = {
  timeline: [practice_04_trial],
  conditional_function: function() {
    return practice_04_counter < 3;
  }
}

const practice_04_help = {
  type: 'pit-instructions',
  pages: [
    "נראה שאתם מתקשים.",
    "נסו לתקן את הרובוט הזה (לחצו על מקש הרווח).<br>עבור רובוט מסוכן, תפסידו רק -1 נקודה<br>אם תפעלו נכון."
  ],
  show_clickable_nav: true,
  button_label_previous: "הקודם",
  button_label_next: "הבא",
}

const practice_04_help_node = {
  timeline: [practice_04_help],
  conditional_function: function() {
    return practice_04_counter < 3;
  }
}

const practice_block_04 = {
  timeline: [
    practice_04_node, practice_04_node, practice_04_node,
    practice_04_node, practice_04_node, practice_04_node,
    practice_04_node, practice_04_node, practice_04_help_node
  ],
  loop_function: function() {
    return practice_04_counter < 3;
  }
}

//------------------------------------//
// מבחן הבנה (Quiz)
//------------------------------------//

var n_comp_loops = 0;

var quiz = {
  type: 'pit-comprehension',
  prompts: [
    "כדי <b>לתקן</b> רובוט, מה אתם עושים?",
    `כאשר אור הסורק הוא <b><font color=${color_win}>${str_color_win}</font></b>, כמה נקודות תרוויחו על פעולה נכונה?`,
    `כאשר אור הסורק הוא <b><font color=${color_lose}>${str_color_lose}</font></b>, כמה נקודות תרוויחו (או תפסידו) על פעולה נכונה?`,
    "<i>נכון</i> או <i>לא נכון</i>: יש רובוטים שיזדקקו לתיקון לעיתים תכופות יותר מאחרים.",
    "<i>נכון</i> או <i>לא נכון</i>: הנקודות שאצבור ישפיעו על בונוס הביצועים שלי."
  ],
  options: [
    ["לחיצה על מקש הרווח", "לא ללחוץ כלל", "לחיצה על מקש ENTER"],
    ["+10", "+1", "-1", "-10"],
    ["+10", "+1", "-1", "-10"],
    ["True", "False"],
    ["True", "False"],
  ],
  correct: [
    "לחיצה על מקש הרווח",
    "+10",
    "-1",
    "True",
    "True"
  ],
  on_finish: function(data) {
    if (data.num_errors > max_errors) {
      n_comp_loops++;
      pass_message('pit', 'repeating quiz');
    }
  }
}

var instructions_review = {
  type: 'pit-instructions',
  pages: [
    "<p>לא עניתם נכונה על כל השאלות במבחן.</p><p>נא עברו שוב על ההנחיות שלמטה בקפידה.</p>",
    "כאשר רובוט נכנס לסורק, עליכם להחליט אם:<br><b>לתקן</b> את הרובוט (מקש הרווח) <br><b>להתעלם</b> מהרובוט (לא ללחוץ כלל)",
    "<b>זכרו:</b> לא כל רובוט מאותו הסוג יזדקק לתיקון,<br>אך יש סוגים שדורשים תיקון לעיתים תכופות יותר מאחרים.",
    "תרוויחו הכי הרבה נקודות על תיקון רובוטים שבאמת זקוקים לכך והתעלמות מרובוטים שאינם זקוקים לתיקון.",
    `חשוב לזכור, כמות הנקודות שתוכלו להרוויח או להפסיד תלויה<br>בשאלה האם הרובוט הוא <b><font color=${color_win}>בטוח</font></b> או <b><font color=${color_lose}>מסוכן</font></b>.`,
    `אם הסורק בצבע <b><font color=${color_win}>${str_color_win}</font></b>, הרובוט הוא <b><font color=${color_win}>בטוח</font></b>.<br>תרוויחו +10 נקודות על פעולה נכונה ותשיגו רק +1 על פעולה שגויה.`,
    `אם הסורק בצבע <b><font color=${color_lose}>${str_color_lose}</font></b>, הרובוט הוא <b><font color=${color_lose}>מסוכן</font></b>.<br>תפסידו רק -1 נקודה על פעולה נכונה ותפסידו -10 נקודות על פעולה שגויה.`,
  ],
  show_clickable_nav: true,
  button_label_previous: "הקודם",
  button_label_next: "הבא",
}

var instructions_review_node = {
  timeline: [instructions_review],
  conditional_function: function() {
    const [quiz_data] = jsPsych.data.getLastTrialData().values();
    // אם אין לכם את data הנ"ל, התאימו לפי שיטת האיסוף שלכם
    if (quiz_data.num_errors <= max_errors || n_comp_loops >= max_comp_loops) {
      return false;
    } else {
      return true;
    }
  }
}

const quiz_block = {
  timeline: [
    quiz,
    instructions_review_node
  ],
  loop_function: function() {
    const [quiz_data] = jsPsych.data.get().filter({trial_type: 'pit-comprehension'}).values().slice(-1);
    if (!quiz_data) return false; 
    if (quiz_data.num_errors <= max_errors || n_comp_loops >= max_comp_loops) {
      return false;
    } else {
      return true;
    }
  }
}

//------------------------------------//
// הרצת בלוק ההוראות
//------------------------------------//

var INSTRUCTIONS = {
  timeline: [
    instructions_01,
    practice_block_01,
    instructions_02,
    practice_block_02,
    instructions_03,
    practice_block_03,
    instructions_04,
    practice_block_04,
    instructions_05,
    quiz_block
  ]
}
