const ranks = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];
const suits = ['♠', '♥', '♣', '♦'];

function randomizeCards() {
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    const rank = ranks[Math.floor(Math.random() * ranks.length)];
    const suit = suits[Math.floor(Math.random() * suits.length)];
    
    // Create pseudo-elements content
    const content = `${rank}${suit}`;
    
    // Apply to both pseudo-elements using CSS Custom Properties
    section.style.setProperty('--card-content', `'${content}'`);
  });
}

// Run on page load
randomizeCards();

