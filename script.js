"use strict";

/* ==========================================================================
   Vocabulary data
   ========================================================================== */

// [id, label, lesson] for the word-group chips
const CATEGORIES = [
  ["greet", "Greetings", 1],
  ["expr", "Expressions", 1],
  ["school", "School & people", 1],
  ["time", "Time", 1],
  ["num", "Numbers", 1],
  ["basics", "Nationality & phone", 1],
  ["country", "Countries", 1],
  ["major", "Majors", 1],
  ["job", "Jobs", 1],
  ["family", "Family", 1],

  ["point", "Words that point", 2],
  ["food", "Food", 2],
  ["things", "Things", 2],
  ["places", "Places", 2],
  ["money", "Money", 2],
  ["shop", "Shopping expressions", 2],
];

const LESSONS = [...new Set(CATEGORIES.map((c) => c[2]))];

// [romaji, kana, English, category]
const WORD_DATA = [
  ["Ohayoo.", "おはよう", "Good morning.", "greet"],
  ["Ohayoo gozaimasu.", "おはようございます", "Good morning. (polite)", "greet"],
  ["Konnichiwa.", "こんにちは", "Good afternoon.", "greet"],
  ["Konbanwa.", "こんばんは", "Good evening.", "greet"],
  ["Sayoonara.", "さようなら", "Good-bye.", "greet"],
  ["Oyasumi (nasai).", "おやすみ(なさい)", "Good night.", "greet"],
  ["Arigatoo.", "ありがとう", "Thank you.", "greet"],
  ["Arigatoo gozaimasu.", "ありがとうございます", "Thank you. (polite)", "greet"],
  ["Sumimasen.", "すみません", "Excuse me.; I'm sorry.", "greet"],
  ["Iie.", "いいえ", "No.; Not at all.", "greet"],
  ["Itte kimasu.", "いってきます", "I'll go and come back.", "greet"],
  ["Itterasshai.", "いってらっしゃい", "Please go and come back.", "greet"],
  ["Tadaima.", "ただいま", "I'm home.", "greet"],
  ["Okaeri (nasai).", "おかえり(なさい)", "Welcome home.", "greet"],
  ["Itadakimasu.", "いただきます", "Thank you for the meal. (before eating)", "greet"],
  ["Gochisoosama (deshita).", "ごちそうさま(でした)", "Thank you for the meal. (after eating)", "greet"],
  ["Hajimemashite.", "はじめまして", "How do you do?", "greet"],
  ["… desu.", "～です", "I am ….", "greet"],
  ["Yoroshiku onegai shimasu.", "よろしくおねがいします", "Nice to meet you.", "greet"],

  ["anoo", "あのう", "um …", "expr"],
  ["hai", "はい", "yes", "expr"],
  ["soo desu", "そうです", "That's right.", "expr"],
  ["soo desu ka", "そうですか", "I see.; Is that so?", "expr"],

  ["daigaku", "だいがく", "college; university", "school"],
  ["kookoo", "こうこう", "high school", "school"],
  ["gakusee", "がくせい", "student", "school"],
  ["daigakusee", "だいがくせい", "college student", "school"],
  ["ryuugakusee", "りゅうがくせい", "international student", "school"],
  ["sensee", "せんせい", "teacher; Professor …", "school"],
  ["… nensee", "～ねんせい", "… year student", "school"],
  ["ichinensee", "いちねんせい", "first-year student", "school"],
  ["senkoo", "せんこう", "major", "school"],
  ["watashi", "わたし", "I", "school"],
  ["tomodachi", "ともだち", "friend", "school"],
  ["… san", "～さん", "Mr./Ms. …", "school"],
  ["… jin", "～じん", "… people", "school"],
  ["nihonjin", "にほんじん", "Japanese people", "school"],

  ["ima", "いま", "now", "time"],
  ["gozen", "ごぜん", "A.M.", "time"],
  ["gogo", "ごご", "P.M.", "time"],
  ["… ji", "～じ", "o'clock", "time"],
  ["ichiji", "いちじ", "one o'clock", "time"],
  ["han", "はん", "half", "time"],
  ["niji han", "にじはん", "half past two", "time"],

  ["zero/rei", "ゼロ/れい", "0", "num"],
  ["ichi", "いち", "1", "num"],
  ["ni", "に", "2", "num"],
  ["san", "さん", "3", "num"],
  ["yon/shi", "よん/し", "4", "num"],
  ["go", "ご", "5", "num"],
  ["roku", "ろく", "6", "num"],
  ["nana/shichi", "なな/しち", "7", "num"],
  ["hachi", "はち", "8", "num"],
  ["kyuu/ku", "きゅう/く", "9", "num"],
  ["juu", "じゅう", "10", "num"],
  ["hyaku", "ひゃく", "100", "num"],
  ["sen", "せん", "1,000", "num"],
  ["ichiman", "いちまん", "10,000", "num"],

  ["Nihon", "にほん", "Japan", "basics"],
  ["Amerika", "アメリカ", "U.S.A.", "basics"],
  ["… go", "～ご", "… language", "basics"],
  ["nihongo", "にほんご", "Japanese language", "basics"],
  ["… sai", "～さい", "… years old", "basics"],
  ["denwa", "でんわ", "telephone", "basics"],
  ["… ban", "～ばん", "number …", "basics"],
  ["bangoo", "ばんごう", "number", "basics"],
  ["namae", "なまえ", "name", "basics"],
  ["nan/nani", "なん/なに", "what", "basics"],

  ["Igirisu", "イギリス", "Britain", "country"],
  ["Oosutoraria", "オーストラリア", "Australia", "country"],
  ["Kankoku", "かんこく", "Korea", "country"],
  ["Kanada", "カナダ", "Canada", "country"],
  ["Chuugoku", "ちゅうごく", "China", "country"],
  ["Indo", "インド", "India", "country"],
  ["Ejiputo", "エジプト", "Egypt", "country"],
  ["Firipin", "フィリピン", "Philippines", "country"],
  ["Cheko", "チェコ", "Czech Republic", "country"],

  ["ajia kenkyuu", "アジアけんきゅう", "Asian studies", "major"],
  ["keezai", "けいざい", "economics", "major"],
  ["koogaku", "こうがく", "engineering", "major"],
  ["kokusaikankee", "こくさいかんけい", "international relations", "major"],
  ["konpyuutaa", "コンピューター", "computer", "major"],
  ["seeji", "せいじ", "politics", "major"],
  ["seebutsugaku", "せいぶつがく", "biology", "major"],
  ["bijinesu", "ビジネス", "business", "major"],
  ["bungaku", "ぶんがく", "literature", "major"],
  ["eego", "えいご", "English (language)", "major"],
  ["rekishi", "れきし", "history", "major"],

  ["isha", "いしゃ", "doctor", "job"],
  ["kaishain", "かいしゃいん", "office worker", "job"],
  ["kangoshi", "かんごし", "nurse", "job"],
  ["kookoosee", "こうこうせい", "high school student", "job"],
  ["shufu", "しゅふ", "housewife", "job"],
  ["daigakuinsee", "だいがくいんせい", "graduate student", "job"],
  ["bengoshi", "べんごし", "lawyer", "job"],

  ["okaasan", "おかあさん", "mother", "family"],
  ["otoosan", "おとうさん", "father", "family"],
  ["oneesan", "おねえさん", "older sister", "family"],
  ["oniisan", "おにいさん", "older brother", "family"],
  ["imooto", "いもうと", "younger sister", "family"],
  ["otooto", "おとうと", "younger brother", "family"],

  // Lesson 2
  ["kore", "これ", "this one", "point"],
  ["sore", "それ", "that one", "point"],
  ["are", "あれ", "that one (over there)", "point"],
  ["dore", "どれ", "which one", "point"],
  ["kono", "この", "this …", "point"],
  ["sono", "その", "that …", "point"],
  ["ano", "あの", "that … (over there)", "point"],
  ["dono", "どの", "which …", "point"],
  ["koko", "ここ", "here", "point"],
  ["soko", "そこ", "there", "point"],
  ["asoko", "あそこ", "over there", "point"],
  ["doko", "どこ", "where", "point"],
  ["dare", "だれ", "who", "point"],

  ["oishii", "おいしい", "delicious", "food"],
  ["sakana", "さかな", "fish", "food"],
  ["tonkatsu", "とんかつ", "pork cutlet", "food"],
  ["niku", "にく", "meat", "food"],
  ["menyuu", "メニュー", "menu", "food"],
  ["yasai", "やさい", "vegetable", "food"],

  ["kasa", "かさ", "umbrella", "things"],
  ["kaban", "かばん", "bag", "things"],
  ["kutsu", "くつ", "shoes", "things"],
  ["saifu", "さいふ", "wallet", "things"],
  ["jiinzu", "ジーンズ", "jeans", "things"],
  ["jitensha", "じてんしゃ", "bicycle", "things"],
  ["shinbun", "しんぶん", "newspaper", "things"],
  ["sumaho", "スマホ", "smartphone; mobile", "things"],
  ["tiishatsu", "Tシャツ", "T-shirt", "things"],
  ["tokee", "とけい", "watch; clock", "things"],
  ["nooto", "ノート", "notebook", "things"],
  ["pen", "ペン", "pen", "things"],
  ["booshi", "ぼうし", "hat; cap", "things"],
  ["hon", "ほん", "book", "things"],

  ["ginkoo", "ぎんこう", "bank", "places"],
  ["konbini", "コンビニ", "convenience store", "places"],
  ["toire", "トイレ", "toilet; restroom", "places"],
  ["toshokan", "としょかん", "library", "places"],
  ["yuubinkyoku", "ゆうびんきょく", "post office", "places"],

  ["ikura", "いくら", "how much", "money"],
  ["… en", "～えん", "… yen", "money"],
  ["takai", "たかい", "expensive; high", "money"],

  ["irasshaimase", "いらっしゃいませ", "Welcome (to our store).", "shop"],
  ["(… o) onegaishimasu", "(～を)おねがいします", "…, please.", "shop"],
  ["(… o) kudasai", "(～を)ください", "Please give me …", "shop"],
  ["jaa", "じゃあ", "then …; if that is the case, …", "shop"],
  ["doozo", "どうぞ", "Please.; Here it is.", "shop"],
  ["doomo", "どうも", "Thank you.", "shop"],
];

// [situation, the romaji of the expected expression (must match WORD_DATA)]
const SITUATIONS = [
  ["You're leaving home in the morning.", "Itte kimasu."],
  ["Your roommate is heading out the door.", "Itterasshai."],
  ["You walk in the door after class.", "Tadaima."],
  ["Someone in your family just got home.", "Okaeri (nasai)."],
  ["The food is on the table and you're about to eat.", "Itadakimasu."],
  ["You've just finished eating at a friend's house.", "Gochisoosama (deshita)."],
  ["You meet someone for the very first time.", "Hajimemashite."],
  ["You've finished introducing yourself.", "Yoroshiku onegai shimasu."],
  ["You see your professor at 9 a.m.", "Ohayoo gozaimasu."],
  ["You see a close friend at 9 a.m.", "Ohayoo."],
  ["You run into a neighbour at 2 p.m.", "Konnichiwa."],
  ["You meet someone at 8 p.m.", "Konbanwa."],
  ["You're about to go to bed.", "Oyasumi (nasai)."],
  ["Your teacher helped you with your homework.", "Arigatoo gozaimasu."],
  ["A friend passes you the salt.", "Arigatoo."],
  ["You bump into someone on the train.", "Sumimasen."],
  ["Someone thanks you and you want to say \"not at all\".", "Iie."],
  ["Class is over and you're saying good-bye to the teacher.", "Sayoonara."],
  ["You hesitate before asking a stranger something.", "anoo"],
  ["Someone checks a fact with you and they're correct.", "soo desu"],
  ["A friend tells you something you didn't know.", "soo desu ka"],
  ["A customer walks into the shop where you work.", "irasshaimase"],
  ["You hand a guest the menu.", "doozo"],
];

// en: prompt, jp: the correct word order, extra: distractor tiles
const SENTENCES = [
  { en: "I'm a college student.", jp: "watashi wa daigakusee desu", extra: ["gakusee", "ka"] },
  { en: "I'm an international student.", jp: "watashi wa ryuugakusee desu", extra: ["sensee", "no"] },
  { en: "My major is computers.", jp: "watashi no senkoo wa konpyuutaa desu", extra: ["koogaku", "ka"] },
  { en: "It's half past two now.", jp: "ima niji han desu", extra: ["ichiji", "gogo"] },
  { en: "It's one p.m.", jp: "gogo ichiji desu", extra: ["gozen", "han"] },
  { en: "Is Mr. Tanaka Japanese?", jp: "Tanaka san wa nihonjin desu ka", extra: ["nihongo", "no"] },
  { en: "Is Takeshi a first-year student?", jp: "Takeshi san wa ichinensee desu ka", extra: ["sensee", "no"] },
  { en: "My friend is a Japanese language teacher.", jp: "tomodachi wa nihongo no sensee desu", extra: ["nihonjin", "ka"] },
  { en: "What is your name?", jp: "namae wa nan desu ka", extra: ["nani", "no"] },
  { en: "Yes, that's right.", jp: "hai soo desu", extra: ["ka", "iie"] },
  { en: "What is the telephone number?", jp: "denwa bangoo wa nan desu ka", extra: ["namae", "nani"] },
  { en: "Mary is American.", jp: "Mearii san wa amerikajin desu", extra: ["amerika", "nihonjin"] },
  { en: "Is your older sister a nurse?", jp: "oneesan wa kangoshi desu ka", extra: ["oniisan", "isha"] },
  { en: "Um, excuse me. What time is it now?", jp: "anoo sumimasen ima nanji desu ka", extra: ["nani", "han"] },
  { en: "Is it 1 a.m. in Japan now?", jp: "Nihon wa ima gozen ichiji desu ka", extra: ["gogo", "no"] },
  { en: "Professor Yamashita is a history teacher.", jp: "Yamashita sensee wa rekishi no sensee desu", extra: ["san", "bungaku"] },
  { en: "How much is this?", jp: "kore wa ikura desu ka", extra: ["sore", "doko"] },
  { en: "That one is 3,000 yen.", jp: "sore wa sanzen en desu", extra: ["sanbyaku", "kono"] },
  { en: "Where is the restroom?", jp: "toire wa doko desu ka", extra: ["dare", "asoko"] },
  { en: "Whose umbrella is this?", jp: "kore wa dare no kasa desu ka", extra: ["kono", "doko"] },
  { en: "This watch is expensive.", jp: "kono tokee wa takai desu", extra: ["kore", "oishii"] },
  { en: "The library is over there.", jp: "toshokan wa asoko desu", extra: ["are", "doko"] },
  { en: "Pork cutlet, please.", jp: "tonkatsu o onegaishimasu", extra: ["wa", "doozo"] },
  { en: "Then, please give me this one.", jp: "jaa kore o kudasai", extra: ["kono", "wa"] },
  { en: "That over there is a Japanese newspaper.", jp: "are wa nihongo no shinbun desu", extra: ["ano", "nihonjin"] },
];


/* ==========================================================================
   UI text and constants
   ========================================================================== */

// Modes that drill the vocabulary list (and so show the word-group chips)
const WORD_MODES = ["flash", "quiz", "type"];

const MODE_HINTS = {
  flash: "Flip the card, then mark whether you knew it.",
  quiz: "Pick the matching answer.",
  type: "Read the English and type the Japanese, in romaji or kana.",
  sit: "Pick what you would say in each situation.",
  sen: "Tap the words in the right order to build the sentence.",
};

const NUMBER_HINTS = {
  say: "Type how you say it in Japanese, in romaji or kana.",
  read: "Type the number in digits.",
  listen: "Listen, then type the number in digits.",
};

const NUMBER_SETS = [
  ["small", "0–10"],
  ["tens", "11–100"],
  ["big", "100–99,999"],
  ["time", "Time"],
  ["minutes", "Minutes"],
  ["age", "Ages"],
  ["phone", "Phone numbers"],
];

const KANA_HINTS = {
  read: "Type the romaji for the hiragana.",
  find: "Pick the hiragana for the romaji.",
};

// [id, chip label, "kana romaji|alternative ..." entries].
// The first romaji is the one shown; the others are also accepted.
const KANA_SETS = [
  ["a", "あ row", "あ a,い i,う u,え e,お o"],
  ["k", "か row", "か ka,き ki,く ku,け ke,こ ko"],
  ["s", "さ row", "さ sa,し shi|si,す su,せ se,そ so"],
  ["t", "た row", "た ta,ち chi|ti,つ tsu|tu,て te,と to"],
  ["n", "な row", "な na,に ni,ぬ nu,ね ne,の no"],
  ["h", "は row", "は ha,ひ hi,ふ fu|hu,へ he,ほ ho"],
  ["m", "ま row", "ま ma,み mi,む mu,め me,も mo"],
  ["y", "や row", "や ya,ゆ yu,よ yo"],
  ["r", "ら row", "ら ra,り ri,る ru,れ re,ろ ro"],
  ["w", "わ を ん", "わ wa,を o|wo,ん n|nn"],
  ["dakuten", "が ざ だ ば", "が ga,ぎ gi,ぐ gu,げ ge,ご go,ざ za,じ ji|zi,ず zu,ぜ ze,ぞ zo,だ da,ぢ ji|di,づ zu|du,で de,ど do,ば ba,び bi,ぶ bu,べ be,ぼ bo"],
  ["handakuten", "ぱ row", "ぱ pa,ぴ pi,ぷ pu,ぺ pe,ぽ po"],
  ["combo", "きゃ combinations", "きゃ kya,きゅ kyu,きょ kyo,しゃ sha|sya,しゅ shu|syu,しょ sho|syo,ちゃ cha|tya|cya,ちゅ chu|tyu|cyu,ちょ cho|tyo|cyo,にゃ nya,にゅ nyu,にょ nyo,ひゃ hya,ひゅ hyu,ひょ hyo,みゃ mya,みゅ myu,みょ myo,りゃ rya,りゅ ryu,りょ ryo,ぎゃ gya,ぎゅ gyu,ぎょ gyo,じゃ ja|jya|zya,じゅ ju|jyu|zyu,じょ jo|jyo|zyo,びゃ bya,びゅ byu,びょ byo,ぴゃ pya,ぴゅ pyu,ぴょ pyo"],
];

// Characters that are easy to mix up; "Find it" prefers these as wrong options
const LOOKALIKES = ["あおめぬ", "ねれわ", "るろ", "はほけ", "さきち", "いりこに", "しつ", "ちらさ", "うつ", "くへ", "まも", "たな", "ゆよ", "そん"];

const ROUND_SIZE = { words: 20, numbers: 15, situations: 12, sentences: 10, kana: 20 };

const MARU_SVG =
  '<svg viewBox="0 0 100 100"><path d="M52 14C76 13 90 31 88 53C86 76 66 89 45 87C24 85 11 67 13 46C15 27 31 15 56 16"/></svg>';
const BATSU_SVG =
  '<svg viewBox="0 0 100 100"><path d="M26 26L74 74"/><path d="M74 26L26 74"/></svg>';


/* ==========================================================================
   Small helpers
   ========================================================================== */

const $ = (selector) => document.querySelector(selector);

// localStorage wrapper that never throws (private mode, blocked storage, ...)
const store = {
  get(key, fallback) {
    try {
      const value = localStorage.getItem("l1drill:" + key);
      return value ? JSON.parse(value) : fallback;
    } catch (e) {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem("l1drill:" + key, JSON.stringify(value));
    } catch (e) {}
  },
};

function shuffle(array) {
  const a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Random integer in [min, max]
const randInt = (min, max) => min + Math.floor(Math.random() * (max - min + 1));

function escapeHTML(s) {
  return s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
}

// Normalise an answer so that spacing, punctuation, macrons and
// "ou"/"oo", "ei"/"ee" spelling differences don't matter.
function normalize(s) {
  s = s.toLowerCase().normalize("NFC");
  s = s
    .replace(/[āâ]/g, "aa")
    .replace(/[īî]/g, "ii")
    .replace(/[ūû]/g, "uu")
    .replace(/[ēê]/g, "ee")
    .replace(/[ōô]/g, "oo");
  s = s.replace(/[\s.…,!?'’\-~～。、「」()（）]/g, "");
  return s.replace(/ou/g, "oo").replace(/ei/g, "ee");
}

// "Oyasumi (nasai)." -> ["Oyasumi .", "Oyasumi nasai."]
function expandOptional(s) {
  const m = s.match(/\(([^)]*)\)/);
  return m ? [s.replace(m[0], ""), s.replace(m[0], m[1])] : [s];
}

// Every accepted (normalised) spelling of a word, in romaji and kana
function acceptedForms(word) {
  const out = [];
  for (const source of [word.jp, word.kana]) {
    for (const variant of source.split("/")) out.push(...expandOptional(variant));
  }
  return out.map(normalize);
}

// "hai soo desu" -> "Hai soo desu."; questions ending in "ka" get "?"
function formatSentence(s) {
  return s.charAt(0).toUpperCase() + s.slice(1) + (/ ka$/.test(s) ? "?" : ".");
}


/* ==========================================================================
   State (persisted in localStorage)
   ========================================================================== */

const words = WORD_DATA.map(([jp, kana, en, cat]) => ({ jp, kana, en, cat }));

// Candidate answers for the Situations mode. Some expressions are left out
// because they would also be a right answer to another situation
// (e.g. "doomo" for any "thank you" situation).
const NOT_IN_SITUATIONS = ["… desu.", "doomo", "(… o) onegaishimasu", "(… o) kudasai", "jaa"];
const GREETING_POOL = words.filter(
  (w) => ["greet", "expr", "shop"].includes(w.cat) && !NOT_IN_SITUATIONS.includes(w.jp)
);

// { [romaji]: number of times missed }
let missed = store.get("missed", {});
if (typeof missed !== "object" || !missed) missed = {};

function loadSet(key, defaults, validEntries) {
  const valid = new Set(validEntries.map((entry) => entry[0]));
  const saved = (store.get(key, defaults) || []).filter((k) => valid.has(k));
  return new Set(saved.length ? saved : defaults);
}

const settings = {
  mode: store.get("mode", "quiz"),
  cats: loadSet("cats", ["greet", "school"], CATEGORIES),
  dir: store.get("dir", "jp"),           // "jp" or "en": which side is shown first
  kana: !!store.get("kana", false),
  onlyMissed: false,
  numSets: loadSet("numSets", ["small", "tens"], NUMBER_SETS),
  numDir: store.get("numDir", "say"),    // "say", "read" or "listen"
  kanaSets: loadSet("kanaSets", ["a", "k", "s"], KANA_SETS),
  kanaDir: store.get("kanaDir", "read"), // "read" or "find"
};
if (!KANA_HINTS[settings.kanaDir]) settings.kanaDir = "read";
if (!NUMBER_HINTS[settings.numDir]) settings.numDir = "say";
if (!MODE_HINTS[settings.mode] && settings.mode !== "num" && settings.mode !== "kana") settings.mode = "quiz";

// The round in progress (see startRound)
let round = null;

const stage = $("#stage");
const live = $("#live");

function saveSettings() {
  store.set("mode", settings.mode);
  store.set("cats", [...settings.cats]);
  store.set("dir", settings.dir);
  store.set("kana", settings.kana);
  store.set("numSets", [...settings.numSets]);
  store.set("numDir", settings.numDir);
  store.set("kanaSets", [...settings.kanaSets]);
  store.set("kanaDir", settings.kanaDir);
}

function markMissed(word) {
  missed[word.jp] = (missed[word.jp] || 0) + 1;
  store.set("missed", missed);
}

function clearMissed(word) {
  if (missed[word.jp]) {
    delete missed[word.jp];
    store.set("missed", missed);
  }
}


/* ==========================================================================
   Speech
   ========================================================================== */

const canSpeak = "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;

function hasJapaneseVoice() {
  try {
    return canSpeak && speechSynthesis.getVoices().some((v) => /^ja/i.test(v.lang));
  } catch (e) {
    return false;
  }
}

function speak(text) {
  if (!canSpeak) return;
  try {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";
    const voice = speechSynthesis.getVoices().find((v) => /^ja/i.test(v.lang));
    if (voice) utterance.voice = voice;
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  } catch (e) {}
}


/* ==========================================================================
   Controls
   ========================================================================== */

function renderControls() {
  document.body.classList.toggle("kana-on", settings.kana);

  document.querySelectorAll("#modes button").forEach((b) =>
    b.setAttribute("aria-pressed", b.dataset.mode === settings.mode)
  );

  const isNum = settings.mode === "num";
  const isKana = settings.mode === "kana";
  $("#hint").textContent = isNum
    ? NUMBER_HINTS[settings.numDir]
    : isKana
      ? KANA_HINTS[settings.kanaDir]
      : MODE_HINTS[settings.mode];

  // Hiragana options
  $("#kanaOpts").hidden = !isKana;
  $("#kanaSeg").hidden = !isKana;
  $("#kanaChips").innerHTML = KANA_SETS.map(
    ([key, label]) =>
      `<button class="chip" data-set="${key}" lang="ja" aria-pressed="${settings.kanaSets.has(key)}">${label}</button>`
  ).join("");
  document.querySelectorAll("#kanaSeg button").forEach((b) =>
    b.setAttribute("aria-pressed", b.dataset.kd === settings.kanaDir)
  );
  // "Show kana" means nothing when the drill is the kana itself
  $("#kanaCheck").hidden = isKana;

  // Number options
  $("#numOpts").hidden = !isNum;
  $("#numSeg").hidden = !isNum;
  $("#numChips").innerHTML = NUMBER_SETS.map(
    ([key, label]) =>
      `<button class="chip" data-set="${key}" aria-pressed="${settings.numSets.has(key)}">${label}</button>`
  ).join("");
  document.querySelectorAll("#numSeg button").forEach((b) => {
    b.setAttribute("aria-pressed", b.dataset.nd === settings.numDir);
    // Only offer "Listen" when a Japanese voice is available
    if (b.dataset.nd === "listen") b.hidden = !hasJapaneseVoice() && settings.numDir !== "listen";
  });

  // Word options
  $("#wordOpts").hidden = !WORD_MODES.includes(settings.mode);
  $("#dirSeg").hidden = !(settings.mode === "flash" || settings.mode === "quiz");
  document.querySelectorAll("#dirSeg button").forEach((b) =>
    b.setAttribute("aria-pressed", b.dataset.dir === settings.dir)
  );
  $("#kana").checked = settings.kana;

  const missedCount = Object.keys(missed).length;
  if (!missedCount) settings.onlyMissed = false;

  // One row of chips per lesson; the lesson label selects just that lesson
  const chipHTML = ([key, label]) =>
    `<button class="chip" data-cat="${key}" aria-pressed="${settings.cats.has(key)}">${label}</button>`;
  const lessonRows = LESSONS.map(
    (lesson) => `<div class="chips">
      <button class="lesson" data-lesson="${lesson}" title="Practise only Lesson ${lesson}">Lesson ${lesson}</button>
      ${CATEGORIES.filter((c) => c[2] === lesson).map(chipHTML).join("")}
    </div>`
  );
  const missedRow = missedCount
    ? `<div class="chips"><button class="chip missed" data-missed="1" aria-pressed="${settings.onlyMissed}">Missed words (${missedCount})</button></div>`
    : "";

  const chips = $("#chips");
  chips.innerHTML = lessonRows.join("") + missedRow;
  chips.classList.toggle("dim", settings.onlyMissed);
}

// Apply a settings change, then restart the round with it
function applyChange() {
  saveSettings();
  renderControls();
  startRound();
}

// Toggle a key in a set, but never leave the set empty
function toggleKeepOne(set, key) {
  if (set.has(key)) {
    if (set.size > 1) set.delete(key);
  } else {
    set.add(key);
  }
}

$("#modes").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  settings.mode = b.dataset.mode;
  applyChange();
});

$("#chips").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  if (b.dataset.missed) {
    settings.onlyMissed = !settings.onlyMissed;
  } else if (b.dataset.lesson) {
    settings.onlyMissed = false;
    settings.cats = new Set(CATEGORIES.filter((c) => c[2] === +b.dataset.lesson).map((c) => c[0]));
  } else {
    settings.onlyMissed = false;
    toggleKeepOne(settings.cats, b.dataset.cat);
  }
  applyChange();
});

$("#dirSeg").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  settings.dir = b.dataset.dir;
  applyChange();
});

$("#numChips").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  toggleKeepOne(settings.numSets, b.dataset.set);
  applyChange();
});

$("#numSeg").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  settings.numDir = b.dataset.nd;
  applyChange();
});

$("#kanaChips").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  toggleKeepOne(settings.kanaSets, b.dataset.set);
  applyChange();
});

$("#kanaSeg").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  settings.kanaDir = b.dataset.kd;
  applyChange();
});

$("#kana").addEventListener("change", (e) => {
  settings.kana = e.target.checked;
  saveSettings();
  document.body.classList.toggle("kana-on", settings.kana);
});

// Voices load asynchronously; re-check whether "Listen" can be offered
if (canSpeak) speechSynthesis.addEventListener("voiceschanged", renderControls);


/* ==========================================================================
   Number readings
   ========================================================================== */

// A reading is a list of accepted romaji spellings plus matching kana spellings.
// The first entry of each is the one shown as the answer.
const reading = (romaji, kana) => ({ r: romaji.split("|"), k: kana.split("|") });

const DIGIT_ROMAJI = ["", "ichi", "ni", "san", "yon", "go", "roku", "nana", "hachi", "kyuu"];
const DIGIT_KANA = ["", "いち", "に", "さん", "よん", "ご", "ろく", "なな", "はち", "きゅう"];

const UNITS = [
  reading("zero|rei", "ゼロ|れい"),
  reading("ichi", "いち"),
  reading("ni", "に"),
  reading("san", "さん"),
  reading("yon|shi", "よん|し"),
  reading("go", "ご"),
  reading("roku", "ろく"),
  reading("nana|shichi", "なな|しち"),
  reading("hachi", "はち"),
  reading("kyuu|ku", "きゅう|く"),
];

// Hundreds and thousands have irregular sound changes
const HUNDREDS = [
  null,
  reading("hyaku", "ひゃく"),
  reading("nihyaku", "にひゃく"),
  reading("sanbyaku", "さんびゃく"),
  reading("yonhyaku", "よんひゃく"),
  reading("gohyaku", "ごひゃく"),
  reading("roppyaku", "ろっぴゃく"),
  reading("nanahyaku", "ななひゃく"),
  reading("happyaku", "はっぴゃく"),
  reading("kyuuhyaku", "きゅうひゃく"),
];

const THOUSANDS = [
  null,
  reading("sen", "せん"),
  reading("nisen", "にせん"),
  reading("sanzen", "さんぜん"),
  reading("yonsen", "よんせん"),
  reading("gosen", "ごせん"),
  reading("rokusen", "ろくせん"),
  reading("nanasen", "ななせん"),
  reading("hassen", "はっせん"),
  reading("kyuusen", "きゅうせん"),
];

const HOURS = [
  reading("ichiji", "いちじ"),
  reading("niji", "にじ"),
  reading("sanji", "さんじ"),
  reading("yoji", "よじ"),
  reading("goji", "ごじ"),
  reading("rokuji", "ろくじ"),
  reading("shichiji", "しちじ"),
  reading("hachiji", "はちじ"),
  reading("kuji", "くじ"),
  reading("juuji", "じゅうじ"),
  reading("juuichiji", "じゅういちじ"),
  reading("juuniji", "じゅうにじ"),
];

// Minutes 1-9; 1, 3, 4, 6, 8 change to ～ぷん
const MINUTES = [
  null,
  reading("ippun", "いっぷん"),
  reading("nifun", "にふん"),
  reading("sanpun", "さんぷん"),
  reading("yonpun", "よんぷん"),
  reading("gofun", "ごふん"),
  reading("roppun", "ろっぷん"),
  reading("nanafun", "ななふん"),
  reading("happun|hachifun", "はっぷん|はちふん"),
  reading("kyuufun", "きゅうふん"),
];

// Digits as read out in phone numbers (2 and 5 may be lengthened)
const PHONE_DIGITS = [
  reading("zero|rei", "ゼロ|れい"),
  reading("ichi", "いち"),
  reading("ni|nii", "に|にい"),
  reading("san", "さん"),
  reading("yon", "よん"),
  reading("go|goo", "ご|ごお"),
  reading("roku", "ろく"),
  reading("nana", "なな"),
  reading("hachi", "はち"),
  reading("kyuu", "きゅう"),
];

const AGES = [
  null,
  reading("issai", "いっさい"),
  reading("nisai", "にさい"),
  reading("sansai", "さんさい"),
  reading("yonsai", "よんさい"),
  reading("gosai", "ごさい"),
  reading("rokusai", "ろくさい"),
  reading("nanasai", "ななさい"),
  reading("hassai|hachisai", "はっさい|はちさい"),
  reading("kyuusai", "きゅうさい"),
];

function tensReading(t) {
  if (t === 7) return reading("nanajuu|shichijuu", "ななじゅう|しちじゅう");
  return reading((t === 1 ? "" : DIGIT_ROMAJI[t]) + "juu", (t === 1 ? "" : DIGIT_KANA[t]) + "じゅう");
}

function numberReadings(n) {
  if (n === 0) return [UNITS[0]];
  const parts = [];
  const man = Math.floor(n / 10000);
  const thousands = Math.floor(n / 1000) % 10;
  const hundreds = Math.floor(n / 100) % 10;
  const tens = Math.floor(n / 10) % 10;
  const units = n % 10;
  if (man) parts.push(reading(DIGIT_ROMAJI[man] + "man", DIGIT_KANA[man] + "まん"));
  if (thousands) parts.push(THOUSANDS[thousands]);
  if (hundreds) parts.push(HUNDREDS[hundreds]);
  if (tens) parts.push(tensReading(tens));
  if (units) parts.push(UNITS[units]);
  return parts;
}

function ageReadings(n) {
  if (n === 20) return [reading("hatachi|nijussai|nijuussai", "はたち|にじゅっさい|にじゅうさい")];
  const tens = Math.floor(n / 10);
  const units = n % 10;
  const prefix = tens === 1 ? "" : DIGIT_ROMAJI[tens];
  const prefixKana = tens === 1 ? "" : DIGIT_KANA[tens];
  if (!units) {
    return [
      reading(
        `${prefix}jussai|${prefix}juussai|${prefix}jissai`,
        `${prefixKana}じゅっさい|${prefixKana}じゅうさい|${prefixKana}じっさい`
      ),
    ];
  }
  return tens ? [tensReading(tens), AGES[units]] : [AGES[units]];
}

// 1-59 minutes as one word, e.g. 18 -> juuhappun, 20 -> nijuppun (30 also "han")
function minuteReading(m) {
  const tens = Math.floor(m / 10);
  const units = m % 10;
  const unit = units ? MINUTES[units] : reading("juppun|jippun", "じゅっぷん|じっぷん");
  const digitR = tens === 1 ? "" : DIGIT_ROMAJI[tens];
  const digitK = tens === 1 ? "" : DIGIT_KANA[tens];
  // 10, 20, ... take the digit directly; 11-59 add juu before the unit
  const prefixR = !tens ? "" : units ? digitR + "juu" : digitR;
  const prefixK = !tens ? "" : units ? digitK + "じゅう" : digitK;
  const r = unit.r.map((x) => prefixR + x);
  const k = unit.k.map((x) => prefixK + x);
  if (m === 30) {
    r.push("han");
    k.push("はん");
  }
  return reading(r.join("|"), k.join("|"));
}

// Build a number exercise item from its readings.
// reR / reK match any combination of accepted romaji / kana spellings.
function makeNumberItem(parts, separator, prompt, digits) {
  const toRegExp = (key) =>
    new RegExp("^" + parts.map((p) => "(?:" + p[key].map(normalize).join("|") + ")").join("") + "$");
  return {
    prompt,
    digits,
    jp: parts.map((p) => p.r[0]).join(separator),
    kana: parts.map((p) => p.k[0]).join(separator),
    reR: toRegExp("r"),
    reK: toRegExp("k"),
  };
}

const NUMBER_GENERATORS = {
  small() {
    const n = randInt(0, 10);
    return makeNumberItem(numberReadings(n), "", String(n), [String(n)]);
  },

  tens() {
    const n = randInt(11, 100);
    return makeNumberItem(numberReadings(n), "", String(n), [String(n)]);
  },

  big() {
    const r = Math.random();
    let n;
    if (r < 0.35) n = randInt(1, 9) * (Math.random() < 0.5 ? 100 : 1000);
    else if (r < 0.6) n = randInt(101, 999);
    else if (r < 0.85) n = randInt(1001, 9999);
    else n = randInt(10000, 99999);
    return makeNumberItem(numberReadings(n), "", n.toLocaleString("en-US"), [String(n)]);
  },

  time() {
    const hour = randInt(1, 12);
    const half = Math.random() < 0.5;
    const ampm = Math.random() < 0.4 ? (Math.random() < 0.5 ? "am" : "pm") : "";

    const parts = [];
    if (ampm) parts.push(ampm === "am" ? reading("gozen", "ごぜん") : reading("gogo", "ごご"));
    parts.push(HOURS[hour - 1]);
    if (half) parts.push(reading("han", "はん"));

    const label = `${hour}:${half ? "30" : "00"}${ampm ? (ampm === "am" ? " a.m." : " p.m.") : ""}`;
    const digits = half ? [`${hour}30`] : [`${hour}00`, `${hour}`];
    return makeNumberItem(parts, " ", label, digits);
  },

  minutes() {
    const hour = randInt(1, 12);
    const minute = randInt(1, 59);
    const mm = String(minute).padStart(2, "0");
    const ampm = Math.random() < 0.4 ? (Math.random() < 0.5 ? "am" : "pm") : "";

    const parts = [];
    if (ampm) parts.push(ampm === "am" ? reading("gozen", "ごぜん") : reading("gogo", "ごご"));
    parts.push(HOURS[hour - 1], minuteReading(minute));

    const label = `${hour}:${mm}${ampm ? (ampm === "am" ? " a.m." : " p.m.") : ""}`;
    return makeNumberItem(parts, " ", label, [`${hour}${mm}`]);
  },

  age() {
    const n = Math.random() < 0.6 ? randInt(1, 30) : randInt(31, 99);
    return makeNumberItem(ageReadings(n), "", `${n} years old`, [String(n)]);
  },

  phone() {
    const a = [randInt(1, 9), randInt(0, 9), randInt(0, 9)];
    const b = [randInt(0, 9), randInt(0, 9), randInt(0, 9), randInt(0, 9)];
    const parts = [...a.map((d) => PHONE_DIGITS[d]), reading("no", "の"), ...b.map((d) => PHONE_DIGITS[d])];
    return makeNumberItem(parts, " ", a.join("") + "-" + b.join(""), [a.join("") + b.join("")]);
  },
};


/* ==========================================================================
   Rounds
   ========================================================================== */

function startRound(pool) {
  let items;

  if (WORD_MODES.includes(settings.mode)) {
    if (!pool || !pool.length) {
      pool = settings.onlyMissed ? words.filter((w) => missed[w.jp]) : [];
      if (!pool.length) {
        settings.onlyMissed = false;
        pool = words.filter((w) => settings.cats.has(w.cat));
      }
    }
    items = shuffle(pool).slice(0, ROUND_SIZE.words);
  } else if (settings.mode === "num") {
    // Generate unique random items from the selected number sets
    const sets = [...settings.numSets];
    const seen = new Set();
    items = [];
    let guard = 0;
    while (items.length < ROUND_SIZE.numbers && guard++ < 400) {
      const item = NUMBER_GENERATORS[sets[randInt(0, sets.length - 1)]]();
      if (seen.has(item.prompt)) continue;
      seen.add(item.prompt);
      items.push(item);
    }
  } else if (settings.mode === "kana") {
    const pool = hiragana.filter((k) => settings.kanaSets.has(k.set));
    // Small selections repeat characters to fill the round, but never back to back
    items = [];
    while (items.length < ROUND_SIZE.kana) {
      for (const k of shuffle(pool)) {
        if (items.length < ROUND_SIZE.kana && items[items.length - 1] !== k) items.push(k);
      }
    }
  } else if (settings.mode === "sit") {
    items = shuffle(SITUATIONS).slice(0, ROUND_SIZE.situations);
  } else {
    items = shuffle(SENTENCES).slice(0, ROUND_SIZE.sentences);
  }

  round = {
    items,
    i: 0,                 // index of the current item
    right: 0,
    wrong: [],
    n: items.length,      // original length (flashcards re-queue "Again" items)
    again: new Set(),     // flashcards already marked "Again" this round
    answered: false,
  };
  render();
}

function render() {
  if (round.i >= round.items.length) return renderEnd();
  round.answered = false;
  const renderers = {
    flash: renderFlashcard,
    quiz: renderQuiz,
    type: renderTyping,
    num: renderNumber,
    sit: renderSituation,
    sen: renderSentence,
    kana: renderKana,
  };
  renderers[settings.mode]();
}

function nextItem() {
  round.i++;
  render();
}


/* ==========================================================================
   Shared rendering pieces
   ========================================================================== */

function progressHTML() {
  return `<div class="prog">
      <span>${round.i + 1} of ${round.items.length}</span>
      <span id="sc">${round.right} correct</span>
    </div>
    <div class="bar"><i style="width:${(round.i / round.items.length) * 100}%"></i></div>`;
}

function japaneseHTML(w) {
  return `<div class="word" lang="ja-Latn">${w.jp}</div><div class="kana" lang="ja">${w.kana}</div>`;
}

function englishHTML(w) {
  return `<div class="meaning">${w.en}</div>`;
}

function answerHTML(w) {
  return `<span class="w">${w.jp}</span><span class="kana-inline" lang="ja">${w.kana}</span>`;
}

function youWroteHTML(value) {
  return `<br><span class="yours">You wrote <s>${escapeHTML(value)}</s></span>`;
}

// Put a ◯ or ✕ stamp on the current card
function stamp(ok) {
  const card = $("#card");
  if (!card) return;
  const el = document.createElement("div");
  el.className = "stamp " + (ok ? "maru" : "batsu");
  el.setAttribute("aria-hidden", "true");
  el.innerHTML = ok ? MARU_SVG : BATSU_SVG;
  card.appendChild(el);
}

// Record the outcome, show feedback and the Next button.
// Pass `word` to update the missed-words list.
function showResult(ok, feedbackHTML, word) {
  stamp(ok);
  if (ok) {
    round.right++;
    if (word) clearMissed(word);
  } else {
    round.wrong.push(round.items[round.i]);
    if (word) markMissed(word);
  }
  live.textContent = ok ? "Correct" : "Not quite";
  $("#sc").textContent = round.right + " correct";

  const isLast = round.i + 1 >= round.items.length;
  $("#fb").innerHTML =
    (feedbackHTML ? `<p class="feedback">${feedbackHTML}</p>` : "") +
    `<div class="actions"><button class="btn" id="next">${isLast ? "See results" : "Next"}</button></div>`;

  const next = $("#next");
  next.onclick = nextItem;
  next.focus({ preventScroll: true });
  next.scrollIntoView({ block: "nearest" });
}

// Handle a multiple-choice pick: lock the buttons and mark right/wrong
function choose(buttons, choices, pickedIndex, answer, onDone) {
  if (round.answered) return;
  round.answered = true;
  const ok = choices[pickedIndex] === answer;
  buttons.forEach((b, i) => {
    b.disabled = true;
    if (choices[i] === answer) b.classList.add("right");
    else if (i === pickedIndex) b.classList.add("wrong");
  });
  onDone(ok);
}

// Pick wrong answers, preferring words from the same category
function distractors(word, pool, count) {
  const same = shuffle(pool.filter((x) => x !== word && x.cat === word.cat));
  const rest = shuffle(pool.filter((x) => x !== word && x.cat !== word.cat));
  return [...same, ...rest].slice(0, count);
}

function optionListHTML(choices, japaneseSide) {
  const buttons = choices.map((c, i) =>
    japaneseSide
      ? `<button class="opt jp" data-i="${i}"><span><span class="t" lang="ja-Latn">${c.jp}</span><span class="k" lang="ja">${c.kana}</span></span></button>`
      : `<button class="opt" data-i="${i}"><span class="t">${c.en}</span></button>`
  );
  return `<div class="opts-list">${buttons.join("")}</div>`;
}

// Wire up a text input + Check + "Show answer" exercise.
// isCorrect(value) decides the result; feedback(ok, value, gaveUp) returns the HTML;
// afterResult (optional) runs once the feedback is on the page.
function setupTypedAnswer(isCorrect, feedback, word, afterResult) {
  const input = $("#inp");
  const check = (gaveUp) => {
    if (round.answered) return;
    const value = input.value.trim();
    if (!gaveUp && !value) {
      input.focus();
      return;
    }
    round.answered = true;
    input.disabled = true;
    $("#chk").disabled = true;
    $("#idk").hidden = true;
    const ok = !gaveUp && isCorrect(value);
    showResult(ok, feedback(ok, value, gaveUp), word);
    if (afterResult) afterResult();
  };
  $("#chk").onclick = () => check(false);
  $("#idk").onclick = () => check(true);
  input.onkeydown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      check(false);
    }
  };
  input.focus({ preventScroll: true });
}

function typedFieldHTML(placeholder, label, extraAttrs = "") {
  return `<div class="field">
      <input id="inp" type="text" ${extraAttrs} autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="${placeholder}" aria-label="${label}">
      <button class="btn" id="chk">Check</button>
    </div>
    <button class="link" id="idk">Show answer</button>
    <div id="fb"></div>`;
}


/* ==========================================================================
   Exercise modes
   ========================================================================== */

function renderFlashcard() {
  const w = round.items[round.i];
  const front = settings.dir === "jp" ? japaneseHTML(w) : englishHTML(w);
  const back = settings.dir === "jp" ? englishHTML(w) : japaneseHTML(w);

  stage.innerHTML =
    progressHTML() +
    `<div class="card flip" id="card" role="button" tabindex="0" aria-expanded="false">
      ${front}
      <div class="back" id="back" hidden>${back}</div>
      <div class="tap" id="tap">Tap to reveal</div>
    </div>
    <div class="actions" id="act" hidden>
      <button class="btn ghost" id="again">Again</button>
      <button class="btn" id="got">Got it</button>
    </div>`;

  const card = $("#card");
  const reveal = () => {
    if (card.getAttribute("aria-expanded") === "true") return;
    card.setAttribute("aria-expanded", "true");
    $("#back").hidden = false;
    $("#tap").hidden = true;
    $("#act").hidden = false;
    $("#got").focus({ preventScroll: true });
  };
  card.onclick = reveal;
  card.onkeydown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      reveal();
    }
  };

  // "Again" re-queues the card once at the end of the round
  $("#again").onclick = () => {
    if (!round.again.has(w.jp)) {
      round.again.add(w.jp);
      round.wrong.push(w);
      round.items.push(w);
    }
    markMissed(w);
    nextItem();
  };

  // Only counts as known if it wasn't marked "Again" earlier this round
  $("#got").onclick = () => {
    if (!round.again.has(w.jp)) {
      round.right++;
      clearMissed(w);
    }
    nextItem();
  };

  card.focus({ preventScroll: true });
}

function renderQuiz() {
  const w = round.items[round.i];
  const choices = shuffle([w, ...distractors(w, words, 3)]);
  const prompt = settings.dir === "jp" ? japaneseHTML(w) : englishHTML(w);

  stage.innerHTML =
    progressHTML() +
    `<div class="card" id="card">${prompt}</div>` +
    optionListHTML(choices, settings.dir === "en") +
    `<div id="fb"></div>`;

  const buttons = [...stage.querySelectorAll(".opt")];
  buttons.forEach((b) => {
    b.onclick = () =>
      choose(buttons, choices, +b.dataset.i, w, (ok) =>
        showResult(ok, ok ? "" : `${answerHTML(w)} means “${w.en}”`, w)
      );
  });
}

function renderTyping() {
  const w = round.items[round.i];
  stage.innerHTML =
    progressHTML() +
    `<div class="card" id="card">${englishHTML(w)}</div>` +
    typedFieldHTML("Romaji or kana", "Your answer in Japanese");

  setupTypedAnswer(
    (value) => acceptedForms(w).includes(normalize(value)),
    (ok, value, gaveUp) =>
      ok ? answerHTML(w) : `Answer: ${answerHTML(w)}${value && !gaveUp ? youWroteHTML(value) : ""}`,
    w
  );
}

function renderNumber() {
  const item = round.items[round.i];
  const mode = settings.numDir;

  let prompt;
  if (mode === "say") prompt = `<div class="word">${item.prompt}</div>`;
  else if (mode === "read") prompt = japaneseHTML(item);
  else prompt = `<button class="btn ghost play" id="play" type="button">▶ Play</button>`;

  stage.innerHTML =
    progressHTML() +
    `<div class="card" id="card">${prompt}</div>` +
    typedFieldHTML(
      mode === "say" ? "Romaji or kana" : "Digits",
      "Your answer",
      mode === "say" ? "" : 'inputmode="numeric"'
    );

  if (mode === "listen") {
    $("#play").onclick = () => speak(item.kana);
    speak(item.kana);
  }

  setupTypedAnswer(
    (value) =>
      mode === "say"
        ? item.reR.test(normalize(value)) || item.reK.test(normalize(value))
        : item.digits.includes(value.replace(/\D/g, "")),
    (ok, value, gaveUp) => {
      const answer = `<span class="w">${item.prompt}</span> = ${answerHTML(item)}`;
      const yours = !ok && value && !gaveUp ? youWroteHTML(value) : "";
      const hear = hasJapaneseVoice() ? `<br><button class="link" id="hear" type="button">Hear it</button>` : "";
      return (ok ? "" : "Answer: ") + answer + yours + hear;
    },
    null,
    () => {
      const hearButton = $("#hear");
      if (hearButton) hearButton.onclick = () => speak(item.kana);
    }
  );
}

function renderSituation() {
  const [situation, expected] = round.items[round.i];
  const answer = words.find((w) => w.jp === expected);
  const choices = shuffle([answer, ...shuffle(GREETING_POOL.filter((w) => w !== answer)).slice(0, 3)]);

  stage.innerHTML =
    progressHTML() +
    `<div class="card" id="card"><div class="situ">${situation}</div></div>` +
    optionListHTML(choices, true) +
    `<div id="fb"></div>`;

  const buttons = [...stage.querySelectorAll(".opt")];
  buttons.forEach((b) => {
    b.onclick = () =>
      choose(buttons, choices, +b.dataset.i, answer, (ok) =>
        showResult(ok, `${answerHTML(answer)} means “${answer.en}”`, null)
      );
  });
}

function renderSentence() {
  const sentence = round.items[round.i];
  const tiles = shuffle([...sentence.jp.split(" "), ...sentence.extra]).map((text, id) => ({ text, id }));
  let picked = []; // tile ids in the order the user tapped them

  stage.innerHTML =
    progressHTML() +
    `<div class="card" id="card">
      <div class="meaning">${sentence.en}</div>
      <div class="slot" id="slot" aria-label="Your sentence"></div>
    </div>
    <div class="bank" id="bank">
      ${tiles.map((t) => `<button class="tile" data-id="${t.id}" lang="ja-Latn">${t.text}</button>`).join("")}
    </div>
    <div class="actions" id="sact">
      <button class="btn ghost" id="clr">Clear</button>
      <button class="btn" id="chk" disabled>Check</button>
    </div>
    <div id="fb"></div>`;

  const slot = $("#slot");
  const bank = $("#bank");

  const draw = () => {
    slot.innerHTML = picked
      .map(
        (id) =>
          `<button class="tile" data-id="${id}" lang="ja-Latn" aria-label="Remove ${tiles[id].text}">${tiles[id].text}</button>`
      )
      .join("");
    bank.querySelectorAll(".tile").forEach((b) => b.classList.toggle("used", picked.includes(+b.dataset.id)));
    $("#chk").disabled = !picked.length;
  };

  bank.onclick = (e) => {
    const b = e.target.closest(".tile");
    if (!b || round.answered) return;
    const id = +b.dataset.id;
    if (!picked.includes(id)) {
      picked.push(id);
      draw();
    }
  };

  slot.onclick = (e) => {
    const b = e.target.closest(".tile");
    if (!b || round.answered) return;
    picked = picked.filter((x) => x !== +b.dataset.id);
    draw();
  };

  $("#clr").onclick = () => {
    if (round.answered) return;
    picked = [];
    draw();
  };

  $("#chk").onclick = () => {
    if (round.answered) return;
    round.answered = true;
    const ok = picked.map((id) => tiles[id].text).join(" ") === sentence.jp;
    stage.querySelectorAll(".tile").forEach((b) => (b.disabled = true));
    $("#sact").hidden = true;
    const answer = `<span class="w">${formatSentence(sentence.jp)}</span>`;
    showResult(ok, ok ? answer : `Answer: ${answer}`, null);
  };
}


/* ==========================================================================
   Hiragana
   ========================================================================== */

// [{ kana, romaji: [accepted spellings], set }]
const hiragana = KANA_SETS.flatMap(([set, , list]) =>
  list.split(",").map((entry) => {
    const [kana, romaji] = entry.split(" ");
    return { kana, romaji: romaji.split("|"), set };
  })
);

// Wrong options for "Find it": lookalikes first, then the same row,
// then anything selected, then anything at all.
function kanaDistractors(item, count) {
  const lookalike = LOOKALIKES.find((group) => item.kana.length === 1 && group.includes(item.kana)) || "";
  const tiers = [
    hiragana.filter((k) => k.kana.length === 1 && lookalike.includes(k.kana)),
    hiragana.filter((k) => k.set === item.set),
    hiragana.filter((k) => settings.kanaSets.has(k.set)),
    hiragana,
  ];
  const out = [];
  for (const tier of tiers) {
    for (const k of shuffle(tier)) {
      // Skip the answer and anything that reads the same (じ/ぢ, ず/づ)
      if (out.length >= count || k === item || k.romaji[0] === item.romaji[0]) continue;
      if (!out.includes(k)) out.push(k);
    }
  }
  return out;
}

function renderKana() {
  const item = round.items[round.i];
  const answer = `<span class="w" lang="ja">${item.kana}</span> = <span class="w">${item.romaji[0]}</span>`;
  const hearHTML = hasJapaneseVoice() ? `<br><button class="link" id="hear" type="button">Hear it</button>` : "";
  const wireHear = () => {
    const hearButton = $("#hear");
    if (hearButton) hearButton.onclick = () => speak(item.kana);
  };

  if (settings.kanaDir === "find") {
    const choices = shuffle([item, ...kanaDistractors(item, 3)]);
    stage.innerHTML =
      progressHTML() +
      `<div class="card" id="card"><div class="word">${item.romaji[0]}</div></div>
      <div class="opts-list kana-grid">
        ${choices.map((c, i) => `<button class="opt kana-opt" data-i="${i}" lang="ja">${c.kana}</button>`).join("")}
      </div>
      <div id="fb"></div>`;

    const buttons = [...stage.querySelectorAll(".opt")];
    buttons.forEach((b) => {
      b.onclick = () =>
        choose(buttons, choices, +b.dataset.i, item, (ok) => {
          showResult(ok, answer + hearHTML, null);
          wireHear();
        });
    });
    return;
  }

  stage.innerHTML =
    progressHTML() +
    `<div class="card" id="card"><div class="word kana-big" lang="ja">${item.kana}</div></div>` +
    typedFieldHTML("Romaji", "Your answer in romaji");

  setupTypedAnswer(
    (value) => item.romaji.includes(value.toLowerCase().replace(/\s+/g, "")),
    (ok, value, gaveUp) => (ok ? "" : "Answer: ") + answer + (!ok && value && !gaveUp ? youWroteHTML(value) : "") + hearHTML,
    null,
    wireHear
  );
}


/* ==========================================================================
   End of round
   ========================================================================== */

function missedItemHTML(item) {
  if (WORD_MODES.includes(settings.mode)) return `<li><span class="w">${item.jp}</span><span>${item.en}</span></li>`;
  if (settings.mode === "num") return `<li><span>${item.prompt}</span><span class="w">${item.jp}</span></li>`;
  if (settings.mode === "kana") return `<li><span class="w" lang="ja">${item.kana}</span><span class="w">${item.romaji[0]}</span></li>`;
  if (settings.mode === "sit") return `<li><span>${item[0]}</span><span class="w">${item[1]}</span></li>`;
  return `<li><span>${item.en}</span><span class="w">${formatSentence(item.jp)}</span></li>`;
}

function renderEnd() {
  const total = round.n;
  const pct = total ? round.right / total : 0;
  const isWordMode = WORD_MODES.includes(settings.mode);
  const note = pct === 1 ? "Perfect round." : pct >= 0.8 ? "Nearly there." : "The ones you missed are listed below.";
  const list = round.wrong.map(missedItemHTML).join("");
  const wrong = round.wrong.slice();

  stage.innerHTML = `<div class="bar"><i style="width:100%"></i></div>
    <div class="card" id="card">
      <div class="score">
        <span class="big">${round.right}</span>of ${total}${settings.mode === "flash" ? " known first time" : " correct"}
      </div>
      <p class="end-note">${note}</p>
    </div>
    ${list ? `<h2>To review</h2><ul class="misslist">${list}</ul>` : ""}
    <div class="actions">
      ${isWordMode && wrong.length ? `<button class="btn ghost" id="redo">Practice these ${wrong.length}</button>` : ""}
      <button class="btn" id="newr">New round</button>
    </div>`;

  if (pct >= 0.8) stamp(true);
  live.textContent = `Round finished: ${round.right} of ${total}`;

  // The missed-words chip count may have changed
  renderControls();

  const redo = $("#redo");
  if (redo) redo.onclick = () => startRound(wrong);
  $("#newr").onclick = () => startRound();
  $("#newr").focus({ preventScroll: true });
}


/* ==========================================================================
   Start
   ========================================================================== */

renderControls();
startRound();
