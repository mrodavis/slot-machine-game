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
const testBtn = document.getElementById('test-btn')

// ----- Event Listeners -----
spinBtn.addEventListener('click', handleSpin);
resetBtn.addEventListener('click', init);
testBtn.addEventListener('click', test);

// ----- Functions -----

/*function init() {
  credits = 100;
  reels = ['', '', ''];
  updateMessage("Press Spin to play!", "");
  isGameOver = false;
  render();
}; */
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
/* function handleSpin() {
  const bet = parseInt(betSelect.value);
  if (isGameOver || credits < bet) return;
     // Reset all win classes
  reelEls.forEach(reel => reel.classList.remove('win'));

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
} */
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
// 🎆 Fireworks
   function test(){ confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
    });
        // Play sound
  const jackpotSound = document.getElementById('win-sound');
  if (jackpotSound) jackpotSound.play();
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
  }

  if (credits <= 0) {
    isGameOver = true;
    updateMessage("💀 Game Over!", "");
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
