const ICONS = {
  rock:     '<img src="./fist.png" class="hand-img" alt="rock">',
  paper:    '<img src="./hand.png" class="hand-img" alt="paper">',
  scissors: '<img src="./peace.png" class="hand-img" alt="scissors">'
};
const CHOICES = ['rock', 'paper', 'scissors'];

// Load persisted scores
let pScore = Number(localStorage.getItem('rps_p') || 0);
let cScore = Number(localStorage.getItem('rps_c') || 0);
renderScores();

function renderScores() {
  document.getElementById('sc-p').textContent = pScore;
  document.getElementById('sc-pc').textContent = cScore;
}

function persist() {
  localStorage.setItem('rps_p', pScore);
  localStorage.setItem('rps_c', cScore);
}

// Determine winner
function getOutcome(p, c) {
  if (p === c) return 'tie';
  if (
    (p === 'rock' && c === 'scissors') ||
    (p === 'scissors' && c === 'paper') ||
    (p === 'paper' && c === 'rock')
  ) return 'player';
  return 'pc';
}

// Player picks a choice
function choose(pick) {
  const cpick = CHOICES[Math.floor(Math.random() * 3)];
  const outcome = getOutcome(pick, cpick);

  if (outcome === 'player') pScore += 1;
  else if (outcome === 'pc') cScore += 1;

  persist();
  renderScores();
  showResult(pick, cpick, outcome);
}

function showResult(pick, cpick, outcome) {
  // Set emoji icons
  document.getElementById('p-ic').innerHTML = ICONS[pick];
  document.getElementById('c-ic').innerHTML = ICONS[cpick];

  // Clear all ripple animations
  ['pr1', 'pr2', 'pr3', 'cr1', 'cr2', 'cr3'].forEach(function (id) {
    document.getElementById(id).classList.remove('go');
  });

  var pEl = document.getElementById('p-ic');
  var cEl = document.getElementById('c-ic');
  var head = document.getElementById('r-head');
  var sub = document.getElementById('r-sub');
  var pab = document.getElementById('pab');
  var nxt = document.getElementById('next-btn');

  if (outcome === 'tie') {
    pEl.style.borderColor = '#0074B6';
    cEl.style.borderColor = '#0074B6';
    head.textContent = 'TIE UP';
    sub.textContent = '';
    pab.textContent = 'REPLAY';
    nxt.style.display = 'none';
    document.getElementById('rules-btn').style.right = '22px';

  } else if (outcome === 'player') {
    pEl.style.borderColor = '#c040d8'; // winner = purple
    cEl.style.borderColor = '#f5a623'; // loser  = orange
    ['pr1', 'pr2', 'pr3'].forEach(function (id) {
      document.getElementById(id).classList.add('go');
    });
    head.textContent = 'YOU WIN';
    sub.textContent = 'AGAINST PC';
    pab.textContent = 'PLAY AGAIN';
    nxt.style.display = 'block';
    document.getElementById('rules-btn').style.right = '145px';

  } else {
    cEl.style.borderColor = '#c040d8';
    pEl.style.borderColor = '#f5a623';
    ['cr1', 'cr2', 'cr3'].forEach(function (id) {
      document.getElementById(id).classList.add('go');
    });
    head.textContent = 'YOU LOST';
    sub.textContent = 'AGAINST PC';
    pab.textContent = 'PLAY AGAIN';
    nxt.style.display = 'none';
    document.getElementById('rules-btn').style.right = '22px';
  }

  showScreen('screen-result');
}

function goSelect() {
  document.getElementById('rules-btn').style.right = '22px';
  showScreen('screen-select');
}

function goHurray() {
  document.getElementById('rules-btn').style.right = '22px';
  showScreen('screen-hurray');
}

// ── Screen switching ──
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(function (s) {
    s.classList.remove('show');
  });
  document.getElementById(id).classList.add('show');

  // Hide header on hurray screen
  document.getElementById('hdr').style.display =
    (id === 'screen-hurray') ? 'none' : 'flex';
}

// ── Rules ──
function toggleRules() {
  document.getElementById('rules-overlay').classList.toggle('open');
}
function closeRules() {
  document.getElementById('rules-overlay').classList.remove('open');
}