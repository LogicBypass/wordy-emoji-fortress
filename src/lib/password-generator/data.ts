
// Word list for generating passwords (shortened for brevity, would be expanded in production)
export const dicewareWords = [
  "apple", "beach", "chair", "dance", "email", "fruit", "globe", "house", "igloo", "juice",
  "kiosk", "lemon", "mango", "night", "ocean", "paper", "quiet", "river", "snake", "tiger",
  "umbra", "vocal", "water", "xenon", "yacht", "zebra", "actor", "baker", "candy", "dolly",
  "eagle", "fable", "goose", "happy", "inbox", "jolly", "kite", "light", "music", "nylon",
  "opera", "piano", "queen", "radio", "sword", "table", "uncle", "video", "wagon", "xylophone",
  "young", "zesty", "amber", "bloom", "cloud", "delta", "earth", "flame", "grass", "heart",
  "image", "jewel", "knife", "laser", "metal", "north", "onion", "peach", "quilt", "robot",
  "sugar", "tulip", "unity", "voice", "whale", "xerox", "yield", "zoned", "angel", "blink",
  "coral", "dream", "event", "flute", "grape", "honey", "ivory", "joker", "karma", "linen",
  "maple", "noble", "olive", "plum", "quark", "ruler", "storm", "tower", "urban", "visor",
  "waltz", "xenon"
];

// Emoji list for emoji mode (sample - would be expanded in production)
export const emojis = [
  "😀", "😁", "😂", "🤣", "😃", "😄", "😅", "😆", "😉", "😊", "😋", "😎", "😍", "😘", "😗",
  "😙", "😚", "🙂", "🤗", "🤔", "😐", "😑", "😶", "🙄", "😏", "😣", "😥", "😮", "🤐", "😯",
  "😪", "😫", "😴", "😌", "🤓", "😛", "😜", "😝", "🤤", "😒", "😓", "😔", "😕", "🙃", "🤑",
  "😲", "☹️", "🙁", "😖", "😞", "😟", "😤", "😢", "😭", "😦", "😧", "😨", "😩", "😬", "😰",
  "😱", "😳", "😵", "😡", "😠", "🥺", "🤧", "🤮", "🤢", "🤠", "🤡", "🤥", "🤫", "🤭", "🧐",
  "🤘", "🦊", "🐱", "🐶", "🦁", "🐯", "🐻", "🐼", "🦌", "🐮", "🐷", "🐸", "🦄", "🐝", "🦋",
  "🌈", "🌟", "🌙", "⭐", "☀️", "🌤", "🌦", "🌧", "⛈", "🌩"
];

// Word to emoji mapping
export const wordToEmoji: Record<string, string> = {
  "apple": "🍎", "beach": "🏖️", "chair": "🪑", "dance": "💃", "email": "📧",
  "fruit": "🍇", "globe": "🌎", "house": "🏠", "igloo": "🧊", "juice": "🧃",
  "kiosk": "🏪", "lemon": "🍋", "mango": "🥭", "night": "🌃", "ocean": "🌊",
  "paper": "📄", "quiet": "🤫", "river": "🏞️", "snake": "🐍", "tiger": "🐯",
  "umbra": "🌑", "vocal": "🎤", "water": "💧", "xenon": "⚗️", "yacht": "⛵",
  "zebra": "🦓", "actor": "🎭", "baker": "🍞", "candy": "🍬", "dolly": "🧸",
  "eagle": "🦅", "fable": "📚", "goose": "🦢", "happy": "😊", "inbox": "📥",
  "jolly": "😄", "kite": "🪁", "light": "💡", "music": "🎵", "nylon": "🧵",
  "opera": "🎭", "piano": "🎹", "queen": "👑", "radio": "📻", "sword": "⚔️",
  "table": "🪟", "uncle": "👨", "video": "📹", "wagon": "🚃", "xylophone": "🎵",
  "young": "👶", "zesty": "🍊", "amber": "🔶", "bloom": "🌸", "cloud": "☁️",
  "delta": "🔼", "earth": "🌍", "flame": "🔥", "grass": "🌿", "heart": "❤️",
  "image": "🖼️", "jewel": "💎", "knife": "🔪", "laser": "📡", "metal": "🔩",
  "north": "⬆️", "onion": "🧅", "peach": "🍑", "quilt": "🛏️", "robot": "🤖",
  "sugar": "🍯", "tulip": "🌷", "unity": "🤝", "voice": "🔊", "whale": "🐳",
  "xerox": "📠", "yield": "⚠️", "zoned": "💤", "angel": "👼", "blink": "👁️",
  "coral": "🪸", "dream": "💭", "event": "📅", "flute": "🎵", "grape": "🍇",
  "honey": "🍯", "ivory": "🦷", "joker": "🃏", "karma": "☯️", "linen": "🧵",
  "maple": "🍁", "noble": "👑", "olive": "🫒", "plum": "🟣", "quark": "⚛️",
  "ruler": "📏", "storm": "⛈️", "tower": "🗼", "urban": "🏙️", "visor": "🕶️",
  "waltz": "💃", "xenon": "⚗️"
};

// Common English templates for sentence construction
export const sentenceTemplates = [
  "[subject] [verb] [object] [location]",
  "[subject] [verb] with [object] [time]",
  "[subject] and [object] [verb] [location]",
  "[time] [subject] [verb] [object]",
  "[location] [subject] [verb] [object]"
];

// Part-of-speech categorization
export const wordCategories: Record<string, string[]> = {
  subject: [
    "apple", "tiger", "robot", "eagle", "queen", "angel", "actor", "zebra", "whale", "uncle",
    "amber", "bloom", "coral", "dolly", "earth", "flame", "globe", "heart", "image", "jewel",
    "karma", "lemon", "maple", "noble", "olive", "peach", "quilt", "sword", "tulip", "unity"
  ],
  verb: [
    "dance", "blink", "yield", "voice", "dream", "happy", "jolly", "light", "quiet", "waltz",
    "vocal", "zesty", "zoned", "email", "event", "fruit", "goose", "honey", "inbox", "joker"
  ],
  object: [
    "chair", "candy", "kite", "knife", "laser", "metal", "music", "nylon", "onion", "paper",
    "piano", "plum", "quark", "radio", "ruler", "sugar", "table", "tower", "urban", "video"
  ],
  location: [
    "beach", "house", "igloo", "ocean", "river", "yacht", "cloud", "delta", "grass", "north",
    "storm", "visor", "wagon", "xenon", "night", "opera", "fable", "kiosk", "mango", "water"
  ],
  time: [
    "night", "young", "delta", "event"
  ]
};

// Leet speak transformations
export const leetTransformations = [
  { from: "a", to: "@", condition: (before: string, after: string) => /[^aeiou]/.test(after) },
  { from: "e", to: "3", condition: (before: string, after: string) => before !== "" },
  { from: "i", to: "!", condition: (before: string, after: string) => /[aeiou]/.test(before) && /[aeiou]/.test(after) },
  { from: "o", to: "0", condition: (before: string, after: string) => true },
  { from: "s", to: "$", condition: (before: string, after: string) => after === "" },
  { from: "t", to: "7", condition: (before: string, after: string) => true },
  { from: "b", to: "8", condition: (before: string, after: string) => true },
  { from: "g", to: "9", condition: (before: string, after: string) => true },
  { from: "l", to: "1", condition: (before: string, after: string) => true },
  { from: "z", to: "2", condition: (before: string, after: string) => true }
];

// Common passwords to block (just a small sample - would be much larger in production)
export const commonPasswords = [
  "password", "123456", "123456789", "12345678", "12345", "1234567", "1234567890", "qwerty",
  "abc123", "password1", "admin", "welcome", "monkey", "login", "princess", "admin123", 
  "sunshine", "master", "hottie", "loveme", "hello", "freedom", "whatever", "batman", "trustno1"
];
