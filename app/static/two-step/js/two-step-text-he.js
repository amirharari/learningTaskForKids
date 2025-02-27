//
// //colors must be determined to display in the text
//
var fullscreen =[`<p>הניסוי ימשיך במצב מסך מלא. לחצו על הכפתור למטה כדי להמשיך</p>`];
var preload_msg = 'המשחק טוען מדיה. כבר נתחיל';

var continue_label = 'הבא';
//
var next_label = 'הבא'; // Next button label
//
var previous_label = 'הקודם'; // Previous button label

var reading_dir_left_to_right = false
//---------------------------------------//
// Define language parameters.
//---------------------------------------//



const color_text = ['ירוק','סגול','אדום','כחול'];

const trial_keys_left = 'מקש המספר 1' ; //'מקש החץ השמאלי';  
const trial_keys_right = 'מקש המספר 0' ;// 'מקש החץ הימני';

//[`מקש המספר 1`,`מקש המספר 0`]


var instructions_00_a = [`<p>ברוכים הבאים למשחק <b>אוצרות החלל</b></p><p> נתחיל עם הוראות המשחק - במהלך ההוראות, תוכלו להשתמש במקשי החיצים כדי להתקדם קדימה או לחזור אחורה</p>`];

var instructions_00_b = [`<p>.ההוראות מחולקות לשלושה חלקים. שימו לב - בסוף כל חלק נשאל אתכם כמה שאלות</p>`]

var instructions_01 = [`במשחק <b>אוצרות החלל</b> תחפשו אוצרות בחלל החיצון`]

var instructions_02 = [` תוכלו לחפש אוצר באחד משני כוכבים`];

var instructions_03_a = [` בכל כוכב גרים שני חייזרים. לכל חייזר יש מערה משלו שבה הוא יחפש אוצר`];

var instructions_03_b = [`בכל כוכב, תבקשו אוצר מחייזר אחד. אם יש לחייזר אוצר, הוא יחלוק אותו איתכם`];

var instructions_04_a = [`תוכלו לבחור את החייזר השמאלי על ידי לחיצה על <b>${trial_keys_left}</b> או את החייזר הימני על ידי לחיצה על <b>${trial_keys_right}</b>.`];

var instructions_04_aa = [` בואו ננסה להתאמן בבחירת חייזר. שימו לב, החייזר שבחרתם יזוז למרכז המסך. לחצו ״הבא״ כדי להתחיל בתרגול !`];




var instructions_04_b = [`כל הכבוד! הבנתם כיצד לבחור בין החייזרים`];

var instructions_05_a = [`אוצר נראה ככה`];

// var instructions_05_b = [`!כך נראות אבני החן בחלל`];

var instructions_05_c = [`אם אין לחייזר אוצר - תראו על המסך עיגול ריק.`];

var instructions_05_d = [`לפעמים חייזר מחפש באזור טוב של המערה. ואז הוא כנראה ימצא אוצר ויוכל לתת אותו לכם. `];

var instructions_05_e = [`לפעמים חייזר מחפש באזור פחות טוב, ולא יהיה לו אוצר לתת לכם.`];

var instructions_05_f = [`לדוגמא, החייזר הזה מחפש עכשיו באזור טוב. בואו ננסה לבקש ממנו אוצר על ידי לחיצה על ${trial_keys_left} .`];

var instructions_05_g = [`כמו שאולי שמתם לב, החייזר נתן לכם אוצר ברוב הפעמים שבקשתם. אבל לא בכל פעם.`];

var instructions_05_h = [`לכל חייזר יש מערה. המערות גדולות ויש בהן אזורים טובים יותר וטובים פחות. כמו שלמדתם, חייזרים שכרגע מחפשים באזורים טובים יתנו לכם יותר אוצר מחייזרים שמחפשים באזורים פחות טובים`];

var instructions_06_a = [`עכשיו נתאמן בבחירה בין שני חייזרים. תנסו להבין איזה חייזר מחפש עכשיו באזור טוב יותר, ולכן נותן יותר אוצר.`];

var instructions_06_b = [`הקישו על ${trial_keys_right} כדי לבחור בחייזר הימני ועל ${trial_keys_left} כדי לבחור בחייזר השמאלי. לחצו ״הבא״ כדי להתחיל.`];

var instructions_06_c = [`כמו שאולי שמתם לב, אם בחרתם בחייזר הזה- הסיכוי שלכם לקבל אוצר היה גבוה יותר. ועדיין, לא בכל פעם קבלתם אוצר.`];

var instructions_06_d = [`הסיכוי של כל חייזר לתת אוצר ישתנה במהלך המשחק`];

var instructions_06_e = [`החייזרים זזים לאט לאט במערה. לפעמים יחפשו באזור עם יותר אוצר ולפעמים באזור עם פחות אוצר`];

var instructions_06_f = [`תנסו להתרכז וללמוד איזה חייזר נמצא כרגע באזור עם הרבה אוצר, כדי להרוויח כמה שיותר אוצר.`];

var instructions_06_g = [`אם עכשיו אחד החייזרים נמצא באזור עם הרבה אוצר, הוא יתן לכם אוצר בסבירות גבוהה בזמן הקרוב. ואם הוא כרגע באזור במערה עם מעט אוצר, הוא ימשיך לתת אותו רק לעיתים רחוקות בזמן הקרוב`];

var instructions_07_a = [` לפני שתוכלו לבקש מחייזר אוצר, תצטרכו להגיע אל הכוכב שבו הוא גר`];

var instructions_07_b = [` במשחק לכל כוכב צבע אחר. לדוגמא כאן למטה`];

var instructions_07_c = [`כדי להגיע לכוכבים, תטוסו בחללית. במשחק יש שתי חלליות, כל חללית טסה לכוכב אחד ולפעמים היא טועה וטסה לכוכב האחר. במהלך המשחק תלמדו מה הכוכב שאליו טסה כל חללית`];

var instructions_07_d = [` בחרו את החללית שאתם חושבים שתקח אתכם אל החייזר עם הכי הרבה אוצר, אבל זכרו, לפעמים החללית תטוס לכוכב האחר`];

var instructions_07_e = [`עכשיו ננסה את המשחק. בכל תור תבחרו באיזו חללית לטוס. לאחר שתנחתו בכוכב, תפגשו את שני החייזרים שגרים בו ותבקשו מאחד מהם אוצר`];

var instructions_07_f = [`זכרו, הסיכוי שלכם לקבל אוצר מושפע רק מהאזור במערה שהחייזר עכשיו מחפש בו. ואם חייזר אחד נותן מעט אוצר זה לא אומר שחייזר אחר ייתן הרבה.`];

var instructions_07_g = [`יהיו לכם שלוש שניות לבחור חללית ולאחר מכן שלוש שניות לבחור חייזר. אל תדאגו 3 שניות זה מלא זמן!`];

var instructions_07_i = [`בהצלחה בתרגול. זכרו, הקישו על ${trial_keys_right} כדי לבחור בחייזר, או בחללית, שבצד ימין ועל ${trial_keys_left} כדי לבחור בחייזר,או בחללית, שבצד שמאל`];

var instructions_08_a = [`כל הכבוד! סיימתם עם ההוראות, מיד נתחיל במשחק`];

var instructions_08_b = [`במשחק עצמו, אתם תראו כוכבים, חייזרים, וחלליות חדשים. חוקי המשחק לא השתנו. שימו לב לרמזים הבאים:`];

var instructions_08_c = [`רמז מס'1: חייזר שיש לו הרבה אוצר לתת עכשיו, כנראה יוכל להמשיך לתת הרבה אוצר. שימו לב מתי נגמר לחייזר האוצר ואז תוכלו לעבור לחייזר אחר`];

var instructions_08_d = [`רמז מס' 2: זכרו, כמות האוצר שיש לכל חייזר לא תלוייה בחייזרים האחרים, אלא רק בכמות אוצר שיש במערה שלו כרגע. בנוסף, חייזרים תמיד יתנו לכם את האוצר שיש להם (אם יש להם לתת) - בלי קשר לכמה פעמים בקשתם, או באיזו חללית טסתם.`]

var instructions_08_e = [`רמז מס' 3: לפעמים המערות על כוכב אחד יהיו טובות יותר מאשר בכוכב השני. לכן, תוכלו למצוא יותר אוצר על ידי בחירת החללית שתטוס לכוכב הזה. `];

var instructions_08_f = [`<p>לפני שנתחיל במשחק, נשאל אתכם כמה שאלות על חוקי המשחק</p><p>עליכם לענות נכון על כל השאלות כדי להמשיך`];


var quiz_00 = [`<p כדי להמשיך, אנא ענו על השאלות הבאות </p>`];

var quiz1_prompt_a = `נכון או לא נכון: לכל חללית יש כוכב שאליו היא תמיד נוסעת`;
var quiz1_review_a = `כל חללית טסה רוב הזמן לכוכב אחד ברב הזמן ובשאר הזמן לכוכב האחר`;

var quiz1_prompt_b = `נכון או לא נכון: אם לחייזר יש הרבה אוצר לתת עכשיו, אז כנראה שיהיה לו הרבה אוצר לתת בעתיד הקרוב.`;
var quiz1_review_b = `כמות האוצר שיש לחייזר במערה משתנה לאט, אז חייזר שיש לו הרבה אוצר לתת עכשיו, כנראה יוכל להמשיך לתת הרבה אוצר בעתיד הקרוב.`;

var quiz1_prompt_c = `נכון או לא נכון: יהיה לכם כמה זמן שתרצו לבחור חללית או חייזר.`;
var quiz1_review_c = `יהיו לכם שלוש שניות לבחור חללית ולאחר מכן שלוש שניות לבחור חייזר. שלוש שניות זה מלא זמן!`;

var quiz_options_true_false = [`נכון`, `לא נכון`];

var feedback_quiz = [`כל הכבוד. עניתם נכון לכל השאלות`];
var feedback_pos = [` תשובה נכונה! כל הכבוד`];


var timeouterr = [`<p>לא בחרתם בפעולה והזמן אזל. אנא נסו לבחור יותר מהר בתור הבא. </p>`]
var feedback_err = [`זו לא התשובה הנכונה. שימו לב לרמז הבא`];

var instructions_09_a = [`נתחיל עם המשחק. למשחק שני חלקים. בין החלקים תוכלו לקחת הפסקה.`]

var pre_ready_02 = [`<p>סיימתם עם החלק הראשון! שימו לב, . לחצו הבא כדי לשמור ולהתחיל בהפסקה</p>`];


var instructions_09 = [`נתחיל עם החלק הראשון (מתוך שניים) של המשחק. חלק זה יארך כ 10 דקות. לחצו  'הבא' כשאתם מוכנים`];

var instructions_10 = [`נתחיל עם החלק השני (מתוך שניים) של המשחק. חלק זה יארך כ 10 דקות. לחצו  'הבא' כשאתם מוכנים`];



var block_end = [`זמן לקחת הפסקה. לחצו 'הבא' כשאתם מוכנים`];

var game_end = [`כל הכבוד! סיימתם עם משחק אוצרות החלל. לחצו 'הבא' כדי לסיים ולשמור את נתוני המשחק`];
