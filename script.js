// ----- Constants -----
const symbols = ['🍒', '💎', '🍋', '🔔', '🍇', '7️⃣'];
// const betAmount = 10;

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
const betSelect = document.getElementById('bet-select'); //Bet Dropdown
const spinBtn = document.getElementById('spin-btn');
const resetBtn = document.getElementById('reset-btn');

// ----- Event Listeners -----
spinBtn.addEventListener('click', handleSpin);
resetBtn.addEventListener('click', init);

// ----- Functions -----
function init() {
  credits = 100;
  reels = ['', '', ''];
  updateMessage("Press Spin to play!", "");
  isGameOver = false;
  render();
};

// function handleSpin() {
//  if (isGameOver || credits < betAmount) return;


//  credits -= betAmount;
//  message = "Spinning...";

//    // Trigger animation on each reel
//   reelEls.forEach(reel => reel.classList.add('spinning'));

//   // After 600ms, show results
//   setTimeout(() => {
 
//  // Randomly assign symbols to each reel
//  reels = reels.map(() => {
//    const randIndex = Math.floor(Math.random() * symbols.length);
//    return symbols[randIndex];
//  });
function handleSpin() {
  const bet = parseInt(betSelect.value);
  if (isGameOver || credits < bet) return;

  credits -= bet;
  updateMessage("Spinning...", "");

  const spinIntervals = [];
  const spinDuration = [700, 2000, 3300]; // each reel stops after a different delay

  // Start each reel cycling
  reelEls.forEach((el, idx) => {
    spinIntervals[idx] = setInterval(() => {
      const randSymbol = symbols[Math.floor(Math.random() * symbols.length)];
      el.textContent = randSymbol;
    }, 75); // fast cycling
  });

  // Stop each reel in sequence
  reelEls.forEach((el, idx) => {
    setTimeout(() => {
      clearInterval(spinIntervals[idx]);
      const resultSymbol = symbols[Math.floor(Math.random() * symbols.length)];
      el.textContent = resultSymbol;
      reels[idx] = resultSymbol;

      // Once the last reel stops, evaluate result
      if (idx === 2) {
        evaluateSpin(bet);
      }
    }, spinDuration[idx]);
  });
}



// // Check matches
// const [r1, r2, r3] = reels;
//  if (r1 === r2 && r2 === r3) {
//    credits += bet * 5;
//    message = `🎉 JACKPOT! +$${bet * 5}`;
//  } else if (r1 === r2 || r2 === r3 || r1 === r3) {
//    credits += bet * 2;
//    message = `✅ Nice Match! +$${bet * 2}`;
//  } else {
//    message = "❌ No match. Try again!";
//  }

 /* // Check for game over
 if (credits <= 0) {
   isGameOver = true;
   message = "💀 Game Over! Out of credits.";
 }


 render(); */
//      // Step 4: Remove animation class
//     reelEls.forEach(reel => reel.classList.remove('spinning'));
// }, 600);}


function render() {
 creditDisplay.textContent = credits;
//  messageEl.textContent = message;
 reelEls.forEach((el, idx) => el.textContent = reels[idx] || '❓');


 spinBtn.disabled = isGameOver;
}
function updateMessage(staticText, animatedAmount = "") {
  const messageTextEl = document.getElementById('message-text');
  const messageAmountEl = document.getElementById('message-amount');

  // Set static message text
  messageTextEl.textContent = staticText;

  // Reset animation
  messageAmountEl.classList.remove('show');
  void messageAmountEl.offsetWidth; // force reflow

  // Set and animate amount
  messageAmountEl.textContent = animatedAmount;
  if (animatedAmount !== "") {
    messageAmountEl.classList.add('show');
  }
}

/* function evaluateSpin(bet) {
  const [r1, r2, r3] = reels;

  if (r1 === r2 && r2 === r3) {
    credits += bet * 5;
    message = `🎉 JACKPOT! +$${bet * 5}`;
  } else if (r1 === r2 || r2 === r3 || r1 === r3) {
    credits += bet * 2;
    message = `✅ Nice Match! +$${bet * 2}`;
  } else {
    message = `❌ No match. -$${bet}`;
  }

  if (credits <= 0) {
    isGameOver = true;
    message = "💀 Game Over! You're out of credits.";
  }

  render();
} */

function evaluateSpin(bet) {
  const [r1, r2, r3] = reels;

  if (r1 === r2 && r2 === r3) {
    const win = bet * 5;
    credits += win;
    updateMessage("🎉 JACKPOT!", `+$${win}`);
  } else if (r1 === r2 || r2 === r3 || r1 === r3) {
    const win = bet * 2;
    credits += win;
    updateMessage("✅ Nice Match!", `+$${win}`);
  } else {
    updateMessage("❌ No match.", `-$${bet}`);
  }

  if (credits <= 0) {
    isGameOver = true;
    updateMessage("💀 Game Over!", "");
  }

  render();
};

// ----- Start Game -----
init();
