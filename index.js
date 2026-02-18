const ICONS = { rock: '✊', paper: '✋', scissors: '✌️' };
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
  document.getElementById('p-ic').textContent = ICONS[pick];
  document.getElementById('c-ic').textContent = ICONS[cpick];

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
  }

  showScreen('screen-result');
}

function goSelect() {
  showScreen('screen-select');
}

function goHurray() {
  showScreen('screen-hurray');
  spawnStars();
}

function spawnStars() {
  // Remove old stars
  document.querySelectorAll('.hstar').forEach(function (s) { s.remove(); });

  var positions = [
    { top: '10%', left: '18%' }, { top: '6%', left: '35%' }, { top: '4%', left: '55%' },
    { top: '10%', left: '72%' }, { top: '28%', left: '83%' }, { top: '55%', left: '80%' },
    { top: '62%', left: '12%' }, { top: '35%', left: '6%' }, { top: '48%', left: '44%' }
  ];

  var container = document.getElementById('screen-hurray');
  positions.forEach(function (p, i) {
    var s = document.createElement('div');
    s.className = 'hstar';
    s.textContent = '★';
    s.style.top = p.top;
    s.style.left = p.left;
    s.style.animationDelay = (i * 0.08) + 's';
    container.appendChild(s);
  });
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
