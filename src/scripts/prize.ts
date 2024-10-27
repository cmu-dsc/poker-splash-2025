interface PrizeElements {
  prizeBox: HTMLElement | null;
  slotMachine: HTMLElement | null;
  slotDisplay: HTMLElement | null;
  lever: HTMLElement | null;
  prizeValue: HTMLElement | null;
}

const moneySymbols = ["💵", "💰", "💸", "$"];
const symbols = ["🎰", "💎", "7️⃣", "🎲", "🍀", "⭐"];

const formatNumber = (num: number): string => {
  return num.toLocaleString('en-US');
};

function createMoneyParticle (x: number, y: number) {
  const particle = document.createElement("div");
  particle.className = "money-particle";
  particle.textContent = moneySymbols[Math.floor(Math.random() * moneySymbols.length)];

  const angle = Math.random() * Math.PI * 2;
  const distance = 100 + Math.random() * 100;
  const xMove = Math.cos(angle) * distance;
  const yMove = Math.sin(angle) * distance;
  const rotation = Math.random() * 360;

  particle.style.setProperty("--x-move", `${xMove}px`);
  particle.style.setProperty("--y-move", `${yMove}px`);
  particle.style.setProperty("--rotation", `${rotation}deg`);

  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;

  document.body.appendChild(particle);
  setTimeout(() => particle.remove(), 1000);
}

export function initializePrize () {
  const elements: PrizeElements = {
    prizeBox: document.getElementById("prize-box"),
    slotMachine: document.getElementById("slot-machine"),
    slotDisplay: document.querySelector(".slot-display"),
    lever: document.querySelector('.lever'),
    prizeValue: document.getElementById("prize-value")
  };

  let clickCount = 0;
  let currentPrize = 100000;
  let isSpinning = false;

  // Update initial display with formatting
  if (elements.prizeValue) {
    elements.prizeValue.textContent = formatNumber(currentPrize);
  }

  function spinSlots () {
    if (isSpinning || currentPrize < 1) return;

    currentPrize -= 1;
    if (elements.prizeValue) {
      elements.prizeValue.textContent = formatNumber(currentPrize);
    }

    isSpinning = true;

    let spins = 0;
    const maxSpins = 20;
    const interval = setInterval(() => {
      const randomSymbols = Array(3).fill(0).map(() =>
        symbols[Math.floor(Math.random() * symbols.length)]
      );
      if (elements.slotDisplay) {
        elements.slotDisplay.textContent = randomSymbols.join(" ");
      }

      spins++;
      if (spins >= maxSpins) {
        clearInterval(interval);
        isSpinning = false;

        if (elements.slotDisplay && elements.prizeValue && elements.lever) {
          const finalSymbols = elements.slotDisplay.textContent?.split(" ") || [];
          if (new Set(finalSymbols).size === 1) {
            elements.slotDisplay!.classList.add("winner");
            setTimeout(() => elements.slotDisplay!.classList.remove("winner"), 1000);

            currentPrize += 100000;
            elements.prizeValue.classList.add("prize-increase");
            elements.prizeValue.textContent = formatNumber(currentPrize);
            setTimeout(() => elements.prizeValue!.classList.remove("prize-increase"), 1000);
          }

          if (currentPrize < 1) {
            elements.lever.classList.add('disabled');
            elements.slotDisplay.textContent = "💸 💸 💸";
          }
        }
      }
    }, 100);
  }

  // Event Listeners
  elements.prizeBox?.addEventListener("click", (e) => {
    clickCount++;
    const rect = elements.prizeBox!.getBoundingClientRect();
    elements.prizeBox!.classList.add("pop");

    for (let i = 0; i < 12; i++) {
      setTimeout(() => {
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        createMoneyParticle(x, y);
      }, i * 50);
    }

    setTimeout(() => {
      elements.prizeBox?.classList.remove("pop");
    }, 300);

    if (clickCount === 10 && elements.slotMachine && elements.prizeBox) {
      elements.slotMachine.style.display = "block";
      elements.prizeBox.style.marginBottom = "2rem";
    }
  });

  elements.lever?.addEventListener('mousedown', () => {
    if (isSpinning || currentPrize < 1) return;
    elements.lever?.classList.add('pulled');
    spinSlots();

    setTimeout(() => {
      elements.lever?.classList.remove('pulled');
    }, 1000);
  });

  elements.lever?.addEventListener('touchstart', (e) => {
    e.preventDefault();
    if (isSpinning || currentPrize < 1) return;
    elements.lever?.classList.add('pulled');
    spinSlots();

    setTimeout(() => {
      elements.lever?.classList.remove('pulled');
    }, 1000);
  });
}
