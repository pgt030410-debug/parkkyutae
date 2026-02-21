// main.js

// DOM Elements
const generateBtn = document.getElementById('generate-btn');
const displayArea = document.getElementById('lotto-display');
const historyList = document.getElementById('history-list');
const themeBtn = document.getElementById('theme-btn');
const modeIcon = themeBtn.querySelector('.mode-icon');

// Configuration
const LOTTO_MAX = 45;
const LOTTO_COUNT = 6;
const MAX_HISTORY = 5;

// State
let history = [];

// --- Theme Logic ---
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  modeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

themeBtn.addEventListener('click', toggleTheme);
initTheme();
// --------------------

// Helper: Generate Random Number between min and max (inclusive)
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Logic: Generate 6 Unique Numbers
function generateLottoNumbers() {
  const numbers = new Set();
  while (numbers.size < LOTTO_COUNT) {
    numbers.add(getRandomInt(1, LOTTO_MAX));
  }
  // Convert to Array and Sort Ascending
  return Array.from(numbers).sort((a, b) => a - b);
}

// Logic: Determine Ball Color Class
function getColorClass(number) {
  if (number <= 10) return 'ball-1-10'; // Yellow
  if (number <= 20) return 'ball-11-20'; // Blue
  if (number <= 30) return 'ball-21-30'; // Red
  if (number <= 40) return 'ball-31-40'; // Gray
  return 'ball-41-45'; // Green
}

// UI: Create Ball Element
function createBallElement(number, index) {
  const ball = document.createElement('div');
  ball.classList.add('lotto-ball');
  ball.classList.add(getColorClass(number));
  ball.textContent = number;
  
  // Stagger animation delay based on index
  ball.style.animationDelay = `${index * 0.1}s`;
  
  return ball;
}

// UI: Render Numbers
function renderNumbers(numbers) {
  displayArea.innerHTML = ''; // Clear previous
  numbers.forEach((num, index) => {
    const ball = createBallElement(num, index);
    displayArea.appendChild(ball);
  });
}

// UI: Add to History
function addToHistory(numbers) {
  history.unshift(numbers); // Add to beginning
  if (history.length > MAX_HISTORY) {
    history.pop(); // Remove oldest
  }
  renderHistory();
}

// UI: Render History List
function renderHistory() {
  historyList.innerHTML = '';
  history.forEach((set, index) => {
    const item = document.createElement('li');
    item.className = 'history-item';
    item.textContent = `${index + 1}. [ ${set.join(', ')} ]`;
    historyList.appendChild(item);
  });
}

// Event Listener
generateBtn.addEventListener('click', () => {
  const newNumbers = generateLottoNumbers();
  renderNumbers(newNumbers);
  addToHistory(newNumbers);
});

// Initial Setup (Optional: Auto-generate on load or just leave welcome msg)
// For now, we leave the welcome message.
console.log('Lotto Generator Initialized');
