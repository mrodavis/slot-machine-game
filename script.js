/* All code was collaboratively created by human, chatGPT, Coursera, MDN & stackOverflow */

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
const reelEls = Array.from(document.querySelectorAll('.reel'));
const betSelect = document.getElementById('bet-select'); //Bet Dropdown
const spinBtn = document.getElementById('spin-btn');
const resetBtn = document.getElementById('reset-btn');


// ----- Event Listeners -----
spinBtn.addEventListener('click', handleSpin);
resetBtn.addEventListener('click', init);
document.getElementById("toggle-instructions").addEventListener("click", function () {
    const el = document.getElementById("instructions");
    el.classList.toggle("collapse");
  });

// ----- Functions -----


function init() {
  credits = 100;
  reels = ['', '', ''];
  updateMessage("Press Spin to play!", "");
  isGameOver = false;

  for (let i = 1; i <= 3; i++) {
    const strip = document.getElementById(`strip-${i}`);
    if (strip) {
      strip.innerHTML = '<div>❓</div>';
      strip.style.transition = 'none';
      strip.style.transform = 'translateY(0)';
    }
  }

  render();
}

function handleSpin() {
  const bet = parseInt(betSelect.value);
  if (isGameOver || credits < bet) return;

  credits -= bet;
  updateMessage("Spinning...", "");
  reelEls.forEach(reel => reel.classList.remove('win'));

  reels = [];

  const delays = [1000, 1500, 2000]; // different stop times

  reelEls.forEach((el, idx) => {
    const finalSymbol = symbols[Math.floor(Math.random() * symbols.length)];
    reels[idx] = finalSymbol;
    spinReel(`strip-${idx + 1}`, finalSymbol, delays[idx]);

    // Evaluate after last reel
    if (idx === 2) {
      setTimeout(() => evaluateSpin(bet), delays[idx] + 100);
    }
  });

  render();
}




function render() {
 creditDisplay.textContent = credits;
//  messageEl.textContent = message;
//  reelEls.forEach((el, idx) => el.textContent = reels[idx] || '❓');


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



function evaluateSpin(bet) {
  const [r1, r2, r3] = reels;

    // Reset all win classes
  reelEls.forEach(reel => reel.classList.remove('win'));

  if (r1 === r2 && r2 === r3) {
    const win = bet * 5;
    credits += win;
    updateMessage("🎉 JACKPOT!", `+$${win}`);
    // Play sound
  const jackpotSound = document.getElementById('win-sound');
  if (jackpotSound) jackpotSound.play();

// All match
    reelEls.forEach(reel => reel.classList.add('win'));

// 🎆 Fireworks
    confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
    });

  } else if (r1 === r2 || r2 === r3 || r1 === r3) {
    const win = bet * 2;
    credits += win;
    updateMessage("✅ Nice Match!", `+$${win}`);
    // Play sound
  const secondWinSound = document.getElementById('2nd-win-sound');
  if (secondWinSound) secondWinSound.play();
        // Add .win to matching reels only
    if (r1 === r2) {
      reelEls[0].classList.add('win');
      reelEls[1].classList.add('win');
    } else if (r2 === r3) {
      reelEls[1].classList.add('win');
      reelEls[2].classList.add('win');
    } else if (r1 === r3) {
      reelEls[0].classList.add('win');
      reelEls[2].classList.add('win');
    }

  } else {
    updateMessage("❌ No match.", `-$${bet}`);
        // Play sound
  const loseSound = document.getElementById('lose-sound');
  if (loseSound) loseSound.play();
  }

  if (credits <= 0) {
    isGameOver = true;
    updateMessage("💀 Game Over!", "");
        // Play sound
  const noCredSound = document.getElementById('no-credit-sound');
  if (noCredSound) noCredSound.play();
  }

  render();
};

function spinReel(stripId, stopSymbol, duration = 1000) {
  const strip = document.getElementById(stripId);
  if (!strip) return;

  strip.innerHTML = '';

  const symbolCount = 20;
  const symbolHeight = 100; // make sure this matches your actual CSS height

  // Step 1: Add random symbols
  for (let i = 0; i < symbolCount; i++) {
    const div = document.createElement('div');
    div.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    strip.appendChild(div);
  }

  // Step 2: Add the final winning symbol in the center
  const final = document.createElement('div');
  final.textContent = stopSymbol;
  strip.appendChild(final);

  // Step 3: Add padding symbols after the final (optional but helps smooth scroll)
  for (let i = 0; i < 3; i++) {
    const div = document.createElement('div');
    div.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    strip.appendChild(div);
  }

  // Step 4: Animate the scroll to show the winning symbol centered
  const totalOffset = symbolHeight * (symbolCount); // scroll just enough to show the final symbol
  strip.style.transition = 'none';
  strip.style.transform = 'translateY(0)';
  void strip.offsetWidth;

  strip.style.transition = `transform ${duration}ms ease-out`;
  strip.style.transform = `translateY(-${totalOffset}px)`;
}

// ----- Start Game -----
init();

// ===========================================
// 💀 JS CODE GRAVEYARD
// ===========================================

// OLD spin handler without animation or delay
/*
function spin() {
  const symbol1 = getRandomSymbol();
  const symbol2 = getRandomSymbol();
  const symbol3 = getRandomSymbol();

  reel1.innerText = symbol1;
  reel2.innerText = symbol2;
  reel3.innerText = symbol3;

  checkWin(symbol1, symbol2, symbol3);
}
*/

// 🧪 Experimental delay-based spin (non-working)
/*
function spinWithDelay() {
  setTimeout(() => {
    const result = symbols[Math.floor(Math.random() * symbols.length)];
    reel1.innerText = result;
    reel2.innerText = result;
    reel3.innerText = result;
  }, 500);
}
*/

// Previous checkWin logic (old reward system)
/*
function checkWin(r1, r2, r3) {
  if (r1 === r2 && r2 === r3) {
    credits += 100;
    showMessage("Jackpot!", "+100");
  } else if (r1 === r2 || r2 === r3 || r1 === r3) {
    credits += 20;
    showMessage("Close call!", "+20");
  } else {
    credits -= 10;
    showMessage("No match.", "-10");
  }
}
*/

// Unused credit update function
/*
function addCredits(amount) {
  currentCredits += amount;
  updateCreditsDisplay();
}
*/

// Legacy symbol randomizer
/*
function getRandomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}
*/

// 🧹 Legacy reset behavior (no confirmation)
/*
resetBtn.addEventListener("click", () => {
  credits = 100;
  updateCreditsDisplay();
});
*/

// Emoji-only win test (no logic)
/*
function isEmojiWin(a, b, c) {
  return a === b && b === c;
}
*/

// Testing different symbol sets
/*
const testSymbols = ['🥥', '🍌', '🍎', '💰', '💣', '💀'];
*/

// 💥 Animated explosion (never integrated)
/*
function explodeWin() {
  const explosion = document.createElement('div');
  explosion.classList.add('explode');
  document.body.appendChild(explosion);
  setTimeout(() => explosion.remove(), 800);
}
*/

// ===========================================

