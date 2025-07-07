// ----- Constants -----
const symbols = ['🍒', '💎', '🍋', '🔔', '🍇', '7️⃣'];
const betAmount = 10;

// ----- State Variables -----
let credits;
let reels;
let message;
let isGameOver;

// ----- Cached DOM Elements -----
const creditDisplay = document.getElementById('credit-amount');
const messageEl = document.getElementById('message');
const reelEls = [
  document.getElementById('reel-1'),
  document.getElementById('reel-2'),
  document.getElementById('reel-3')
];
const spinBtn = document.getElementById('spin-btn');
const resetBtn = document.getElementById('reset-btn');

// ----- Event Listeners -----
spinBtn.addEventListener('click', handleSpin);
resetBtn.addEventListener('click', init);

// ----- Functions -----

