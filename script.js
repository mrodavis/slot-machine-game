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
function init() {
  credits = 100;
  reels = ['', '', ''];
  message = "Press Spin to play!";
  isGameOver = false;
  render();
};

function handleSpin() {
 if (isGameOver || credits < betAmount) return;


 credits -= betAmount;

 // Randomly assign symbols to each reel
 reels = reels.map(() => {
   const randIndex = Math.floor(Math.random() * symbols.length);
   return symbols[randIndex];
 });

// Check matches
const [r1, r2, r3] = reels;
 if (r1 === r2 && r2 === r3) {
   credits += 50;
   message = "🎉 JACKPOT! +$50";
 } else if (r1 === r2 || r2 === r3 || r1 === r3) {
   credits += 20;
   message = "✅ Nice Match! +$20";
 } else {
   message = "❌ No match. Try again!";
 }

 // Check for game over
 if (credits <= 0) {
   isGameOver = true;
   message = "💀 Game Over! Out of credits.";
 }


 render();
}


function render() {
 creditDisplay.textContent = credits;
 messageEl.textContent = message;
 reelEls.forEach((el, idx) => el.textContent = reels[idx] || '❓');


 spinBtn.disabled = isGameOver;
}

// ----- Start Game -----
init();
