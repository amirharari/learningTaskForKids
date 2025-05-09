const color_win = "#0000FF";  // כחול
const color_lose = "#FF0000"; // אדום

const str_color_win = "כחול";
const str_color_lose = "אדום";

/*––––––––––––––  הגדרות כלליות  ––––––––––––––*/
const max_comp_loops = 10;
const max_errors     = 0;

/*––––––––––––––  בלוק הוראות  ––––––––––––––*/
var instructions_01 = {
  type: 'pit-instructions',
  pages: [
    "ברוכים הבאים למשחק <b>מפעל הרובוטים</b>!",
    "במשחק תראו רובוטים מתקדמים על פס ייצור עד שהם נכנסים לתוך הסורק.",
    "יש רובוטים שזקוקים לתיקון ויש כאלה שלא. אפשר ללמוד אם רובוט צריך תיקון לפי הסמל שיש לו על החזה.",
    "קיימים סוגים רבים של רובוטים. כל סוג ניתן לזיהוי באמצעות <b>הסמל הייחודי</b> שעל לוח החזה שלו.",
    "כשהרובוט נכנס לסורק, תצטרכו להחליט אם לתקן אותו (לחיצה על מקש הרווח), או להתעלם ממנו (לא ללחוץ על שום מקש).",
    "תרוויחו הכי הרבה נקודות אם תתקנו רק את הרובוטים שצריכים תיקון – ותתעלמו מאלה שלא.",
    "שימו לב: כמות הנקודות שתוכלו להרוויח תלויה אם הרובוט <b><font color=${color_win}>בטוח</font></b> או <b><font color=${color_lose}>מסוכן</font></b>.",
`אם הסורק בצבע <b><font color=${color_win}>${str_color_win}</font></b>, הרובוט בטוח. פעולה נכונה תביא לכם +10 נקודות, וטעות תביא 0 נקודות.`,
    "עכשיו נתאמן עם רובוט בטוח. שימו לב לסמל שלו ונסו להבין אם כדאי לתקן אותו (לחיצה על מקש הרווח) או להתעלם ממנו (לא ללחוץ על אף מקש).<br><b>זכרו:</b> תרוויחו +10 נקודות על הפעולה הנכונה.",
    "<b>רמז:</b> לחצו רק לאחר שהרובוט נכנס לסורק ואור הסורק נדלק."
  ],
  show_clickable_nav: true,
  button_label_previous: "הקודם",
  button_label_next:     "הבא"
};

var instructions_02 = {
  type: 'pit-instructions',
  pages: [
    "עכשיו נתאמן עם רובוט בטוח מסוג אחר. שימו לב לסמל שלו ונסו להבין אם כדאי לתקן אותו (לחיצה על מקש הרווח) או להתעלם ממנו (לא ללחוץ על אף מקש).",
    "זכרו: לא כל רובוט בטוח צריך תיקון. אם תפעלו נכון, תרוויחו +10 נקודות."
  ],
  show_clickable_nav: true,
  button_label_previous: "הקודם",
  button_label_next:     "הבא"
};

var instructions_03 = {
  type: 'pit-instructions',
  pages: [
    `אם הסורק בצבע <b><font color=${color_lose}>${str_color_lose}</font></b>, הרובוט מסוכן. פעולה נכונה תניב 0 נקודות, אבל טעות תעלה לכם -10.`,
    "עכשיו נתאמן עם רובוט מסוכן. שימו לב לסמל שלו ונסו ללמוד אם כדאי לתקן אותו (לחיצה על מקש הרווח) או להתעלם ממנו (לא ללחוץ כלל). זכרו: על פעולה נכונה לא תפסידו נקודות."
  ],
  show_clickable_nav: true,
  button_label_previous: "הקודם",
  button_label_next:     "הבא"
};

var instructions_04 = {
  type: 'pit-instructions',
  pages: [
    "עכשיו נתאמן עם רובוט מסוכן מסוג אחר. שימו לב לסמל שלו ונסו להבין אם כדאי לתקן אותו (מקש רווח) או להתעלם ממנו (לא ללחוץ על כלום).",
    "זכרו: לפעמים גם רובוטים מסוכנים צריכים תיקון. על פעולה נכונה לא תפסידו נקודות."
  ],
  show_clickable_nav: true,
  button_label_previous: "הקודם",
  button_label_next:     "הבא"
};

var instructions_05 = {
  type: 'pit-instructions',
  pages: [
    "טוב מאוד! אנחנו כמעט מוכנים להתחיל את המשחק.",
    "שימו לב לסמל שעל החזה של הרובוט: הוא יעזור לכם להחליט אם לתקן אותו (לחיצה על מקש הרווח) או להתעלם ממנו (לא ללחוץ על כלום).",
    "המטרה שלכם היא לצבור כמה שיותר נקודות ולהימנע מהפסדים.",
    "בסיום המשימה, סך כל הנקודות שצברתם יהפוך לבונוס.",
    "לפני שמתחילים, נבדוק את ההבנה שלכם בעזרת כמה שאלות קצרות."
  ],
  show_clickable_nav: true,
  button_label_previous: "הקודם",
  button_label_next:     "הבא"
};

/*––––––––––––––  PRACTICE #1 — בטוח/לתקן  ––––––––––––––*/
var practice_01_counter = 0;

const practice_01_trial = {
  type: 'pit-trial',
  robot_rune: '1',
  scanner_color: color_win,
  outcome_color: color_win,
  outcome_correct: '+10',
  outcome_incorrect: '0',
  correct: key_go,
  valid_responses: [key_go],
  trial_duration:   trial_duration,
  feedback_duration: feedback_duration,
  data: {block: 0, practice: 1},
  on_finish: d => { practice_01_counter = d.accuracy ? practice_01_counter + 1 : 0; }
};

const practice_01_node = { timeline: [practice_01_trial],
  conditional_function: () => practice_01_counter < 3 };

const practice_01_help = {
  type: 'pit-instructions',
  pages: [
    "נראה שאתם מתקשים.",
    "נסו לתקן את הרובוט הזה (לחצו על מקש הרווח). אם הוא רובוט בטוח – תרוויחו +10 נקודות על פעולה נכונה."
  ],
  show_clickable_nav: true,
  button_label_previous: "הקודם",
  button_label_next:     "הבא"
};

const practice_01_help_node = { timeline: [practice_01_help],
  conditional_function: () => practice_01_counter < 3 };

const practice_block_01 = {
  timeline: [
    practice_01_node, practice_01_node, practice_01_node,
    practice_01_node, practice_01_node, practice_01_node,
    practice_01_node, practice_01_node, practice_01_help_node
  ],
  loop_function: () => practice_01_counter < 3
};

/*––––––––––––––  PRACTICE #2 — בטוח/התעלם  ––––––––––––––*/
var practice_02_counter = 0;

const practice_02_trial = {
  type: 'pit-trial',
  robot_rune: '2',
  scanner_color: color_win,
  outcome_color: color_win,
  outcome_correct: '+10',
  outcome_incorrect: '0',
  correct: -1,
  valid_responses: [key_go],
  trial_duration:   trial_duration,
  feedback_duration: feedback_duration,
  data: {block: 0, practice: 2},
  on_finish: d => { practice_02_counter = d.accuracy ? practice_02_counter + 1 : 0; }
};

const practice_02_node = { timeline: [practice_02_trial],
  conditional_function: () => practice_02_counter < 3 };

const practice_02_help = {
  type: 'pit-instructions',
  pages: [
    "נראה שאתם מתקשים. זכרו: לא כל רובוט צריך תיקון.",
    "נסו להתעלם מהרובוט הזה (לא ללחוץ כלל). אם הוא בטוח – תרוויחו +10 נקודות."
  ],
  show_clickable_nav: true,
  button_label_previous: "הקודם",
  button_label_next:     "הבא"
};

const practice_02_help_node = { timeline: [practice_02_help],
  conditional_function: () => practice_02_counter < 3 };

const practice_block_02 = {
  timeline: [
    practice_02_node, practice_02_node, practice_02_node,
    practice_02_node, practice_02_node, practice_02_node,
    practice_02_node, practice_02_node, practice_02_help_node
  ],
  loop_function: () => practice_02_counter < 3
};

/*––––––––––––––  PRACTICE #3 — מסוכן/התעלם  ––––––––––––––*/
var practice_03_counter = 0;

const practice_03_trial = {
  type: 'pit-trial',
  robot_rune: '3',
  scanner_color: color_lose,
  outcome_color: color_lose,
  outcome_correct: '0',
  outcome_incorrect: '-10',
  correct: -1,
  valid_responses: [key_go],
  trial_duration:   trial_duration,
  feedback_duration: feedback_duration,
  data: {block: 0, practice: 3},
  on_finish: d => { practice_03_counter = d.accuracy ? practice_03_counter + 1 : 0; }
};

const practice_03_node = { timeline: [practice_03_trial],
  conditional_function: () => practice_03_counter < 3 };

const practice_03_help = {
  type: 'pit-instructions',
  pages: [
    "נראה שאתם מתקשים.",
    "נסו להתעלם מהרובוט הזה (לא ללחוץ על כלום). אם הוא רובוט מסוכן – לא תפסידו נקודות על פעולה נכונה."
  ],
  show_clickable_nav: true,
  button_label_previous: "הקודם",
  button_label_next:     "הבא"
};

const practice_03_help_node = { timeline: [practice_03_help],
  conditional_function: () => practice_03_counter < 3 };

const practice_block_03 = {
  timeline: [
    practice_03_node, practice_03_node, practice_03_node,
    practice_03_node, practice_03_node, practice_03_node,
    practice_03_node, practice_03_node, practice_03_help_node
  ],
  loop_function: () => practice_03_counter < 3
};

/*––––––––––––––  PRACTICE #4 — מסוכן/לתקן  ––––––––––––––*/
var practice_04_counter = 0;

const practice_04_trial = {
  type: 'pit-trial',
  robot_rune: '4',
  scanner_color: color_lose,
  outcome_color: color_lose,
  outcome_correct: '0',
  outcome_incorrect: '-10',
  correct: key_go,
  valid_responses: [key_go],
  trial_duration:   trial_duration,
  feedback_duration: feedback_duration,
  data: {block: 0, practice: 4},
  on_finish: d => { practice_04_counter = d.accuracy ? practice_04_counter + 1 : 0; }
};

const practice_04_node = { timeline: [practice_04_trial],
  conditional_function: () => practice_04_counter < 3 };

const practice_04_help = {
  type: 'pit-instructions',
  pages: [
    "נראה שאתם מתקשים.",
    "נסו לתקן את הרובוט הזה (לחצו על מקש הרווח). אם הוא מסוכן – לא תפסידו נקודות על פעולה נכונה."
  ],
  show_clickable_nav: true,
  button_label_previous: "הקודם",
  button_label_next:     "הבא"
};

const practice_04_help_node = { timeline: [practice_04_help],
  conditional_function: () => practice_04_counter < 3 };

const practice_block_04 = {
  timeline: [
    practice_04_node, practice_04_node, practice_04_node,
    practice_04_node, practice_04_node, practice_04_node,
    practice_04_node, practice_04_node, practice_04_help_node
  ],
  loop_function: () => practice_04_counter < 3
};

/*––––––––––––––  QUIZ  ––––––––––––––*/
var n_comp_loops = 0;

var quiz = {
  type: 'pit-comprehension',
  prompts: [
    "איך מתקנים רובוט?",
    "כשהסורק בצבע כחול – כמה נקודות תרוויחו על פעולה נכונה?",
    "כשהסורק בצבע אדום – כמה נקודות תרוויחו על פעולה נכונה?",
    "נכון או לא נכון: יש סוגי רובוטים שזקוקים לתיקון לעיתים קרובות יותר מאחרים.",
    "נכון או לא נכון: הנקודות שתצברו ישפיעו על הבונוס שתקבלו על השתתפות בניסוי."
  ],
  options: [
    ["לחיצה על מקש הרווח", "לא ללחוץ כלל", "לחיצה על מקש ENTER"],
    ["+10", "0", "+1", "-10"],
    ["0", "+10", "+1", "-10"],
    ["True", "False"],
    ["True", "False"]
  ],
  correct: [
    "לחיצה על מקש הרווח",
    "+10",
    "0",
    "True",
    "True"
  ],
  on_finish: d => { if (d.num_errors > max_errors) n_comp_loops++; }
};

var instructions_review = {
  type: 'pit-instructions',
  pages: [
    "<p>לא עניתם נכונה על כל השאלות במבחן.</p><p>נא עברו שוב על ההנחיות שלמטה בקפידה.</p>",
    "כאשר רובוט נכנס לסורק, עליכם להחליט אם:<br><b>לתקן</b> אותו (מקש הרווח) או <b>להתעלם</b> ממנו (לא ללחוץ כלל).",
    "תרוויחו הכי הרבה נקודות אם תתקנו רק את הרובוטים שזקוקים לכך ותתעלמו מרובוטים שאינם זקוקים לתיקון.",
    "שימו לב: כמות הנקודות תלויה אם הרובוט <b><font color=${color_win}>בטוח</font></b> או <b><font color=${color_lose}>מסוכן</font></b>.",
    `אם הסורק בצבע <b><font color=${color_win}>${str_color_win}</font></b>, הרובוט בטוח. תקבלו +10 נקודות על פעולה נכונה ו-0 על טעות.`,
    `אם הסורק בצבע <b><font color=${color_lose}>${str_color_lose}</font></b>, הרובוט מסוכן. פעולה נכונה תביא 0 נקודות, אבל טעות תעלה −10.`
  ],
  show_clickable_nav: true,
  button_label_previous: "הקודם",
  button_label_next:     "הבא"
};

var instructions_review_node = {
  timeline: [instructions_review],
  conditional_function: () => {
    const [q] = jsPsych.data.getLastTrialData().values();
    return q.num_errors > max_errors && n_comp_loops < max_comp_loops;
  }
};

const quiz_block = {
  timeline: [quiz, instructions_review_node],
  loop_function: () => {
    const qs = jsPsych.data.get().filter({trial_type: 'pit-comprehension'}).values();
    if (qs.length === 0) return false;
    const last = qs[qs.length - 1];
    return last.num_errors > max_errors && n_comp_loops < max_comp_loops;
  }
};

/*––––––––––––––  צירוף הכול  ––––––––––––––*/
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
};

/*–––   סוף   –––*/
