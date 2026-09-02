const symbols = [
  { icon: '✦', name: 'STAR', multiplier: 2 },
  { icon: '◈', name: 'GEM', multiplier: 3 },
  { icon: '♛', name: 'CROWN', multiplier: 5 },
  { icon: '☠', name: 'DAGGER', multiplier: 0 },
  { icon: '✹', name: 'SUN', multiplier: 8 }
];
const enemies = [
  { name: 'THE WARDEN', art: '☠', hp: 3, bounty: 80 },
  { name: 'IRON SHADE', art: '♞', hp: 4, bounty: 110 },
  { name: 'THE RED KNIGHT', art: '⚔', hp: 5, bounty: 150 }
];
const state = { coins: 100, best: 100, spins: 0, enemies: 0, charge: 0, bet: 5, round: 1, locked: false, enemy: null, enemyHp: 0, guarding: false };
const $ = (id) => document.getElementById(id);
const reels = [...document.querySelectorAll('.reel')];

function updateUI() {
  $('coins').textContent = state.coins;
  $('bestRun').textContent = state.best;
  $('spins').textContent = state.spins;
  $('enemiesDefeated').textContent = state.enemies;
  $('chargeValue').textContent = `${state.charge} / 3`;
  $('chargeBar').style.width = `${state.charge / 3 * 100}%`;
  $('betValue').textContent = state.bet;
  $('roundBadge').textContent = `ROUND ${String(state.round).padStart(2, '0')}`;
  $('runNumber').textContent = String(state.round).padStart(2, '0');
}
function addLog(message, result = 'log-neutral') {
  const entry = document.createElement('div'); entry.className = 'log-entry';
  entry.innerHTML = `<span class="log-time">${String(state.round).padStart(2, '0')}</span><span>${message}</span><b class="${result}">${result === 'log-loss' ? 'LOSS' : result === 'log-win' ? 'WIN' : 'NOTE'}</b>`;
  $('eventLog').prepend(entry);
  while ($('eventLog').children.length > 5) $('eventLog').lastElementChild.remove();
}
function toast(message) { const element = $('toast'); element.textContent = message; element.classList.add('show'); setTimeout(() => element.classList.remove('show'), 2100); }
function randomSymbol() { return symbols[Math.floor(Math.random() * symbols.length)]; }
function showSymbols(result) { reels.forEach((reel, index) => { reel.querySelector('span').textContent = result[index].icon; reel.querySelector('span').setAttribute('aria-label', result[index].name); }); }
function spin() {
  if (state.locked) return;
  if (state.coins < state.bet) { toast('Not enough coins for that wager.'); $('autoSpin').checked = false; return; }
  state.locked = true; state.coins -= state.bet; state.spins += 1; updateUI(); $('spinButton').disabled = true;
  reels.forEach((reel) => { reel.classList.remove('win'); reel.classList.add('spinning'); });
  const result = [randomSymbol(), randomSymbol(), randomSymbol()];
  setTimeout(() => { reels.forEach((reel) => reel.classList.remove('spinning')); showSymbols(result); resolveSpin(result); }, 760);
}
function resolveSpin(result) {
  const daggers = result.filter((symbol) => symbol.name === 'DAGGER').length;
  const names = result.map((symbol) => symbol.name);
  let payout = 0; let message = 'No match. The house keeps its edge.'; let resultClass = 'log-loss';
  if (names.every((name) => name === 'DAGGER')) { payout = 100; message = 'TRIPLE DAGGER. The den doors swing open.'; resultClass = 'log-win'; }
  else if (names[0] === names[1] && names[1] === names[2]) { payout = state.bet * result[0].multiplier; message = `TRIPLE ${names[0]}. The reels pay ${payout} coins.`; resultClass = 'log-win'; }
  else if (names[0] === names[1] || names[1] === names[2] || names[0] === names[2]) { payout = state.bet; message = `A pair of ${names.find((name, index) => names.indexOf(name) !== index)} returns your wager.`; resultClass = 'log-win'; }
  if (payout) { state.coins += payout; reels.forEach((reel) => reel.classList.add('win')); }
  if (daggers) { state.charge = Math.min(3, state.charge + daggers); message += ` +${daggers} dagger charge.`; }
  state.best = Math.max(state.best, state.coins); state.round += 1; $('machineMessage').textContent = message; addLog(message, resultClass);
  if (state.charge >= 3 && !state.enemy) unlockEnemy();
  state.locked = false; $('spinButton').disabled = false; updateUI();
  if ($('autoSpin').checked && state.coins >= state.bet && !state.enemy) setTimeout(spin, 650);
}
function unlockEnemy() {
  state.enemy = enemies[state.enemies % enemies.length]; state.enemyHp = state.enemy.hp;
  $('combatPanel').classList.add('ready'); $('combatState').textContent = 'TARGET LOCKED'; $('enemyArt').textContent = state.enemy.art; $('enemyName').textContent = state.enemy.name; $('combatCopy').textContent = `${state.enemy.name} blocks the way. Strike before it strikes back.`; $('attackButton').disabled = false; $('guardButton').disabled = false; $('enemyHealthBar').style.width = '100%'; toast(`${state.enemy.name} entered the Dagger Den.`); addLog(`${state.enemy.name} is waiting in the den.`);
}
function combatTurn(action) {
  if (!state.enemy) return;
  if (action === 'attack') { state.enemyHp -= 1; $('combatCopy').textContent = state.enemyHp > 0 ? 'Clean hit. The target is still standing.' : 'The target falls. Collect your bounty.'; }
  else { state.guarding = true; state.coins += 10; $('combatCopy').textContent = 'Guard raised. You salvage 10 coins, but the target advances.'; }
  $('enemyHealthBar').style.width = `${Math.max(0, state.enemyHp / state.enemy.hp * 100)}%`;
  if (state.enemyHp <= 0) { const defeated = state.enemy; state.coins += defeated.bounty; state.enemies += 1; state.charge = 0; state.enemy = null; state.guarding = false; $('combatPanel').classList.remove('ready'); $('combatState').textContent = 'CLEARED'; $('enemyName').textContent = 'NO TARGET'; $('enemyArt').textContent = '☠'; $('combatCopy').textContent = `Bounty collected: +${defeated.bounty} coins. Spin again.`; $('attackButton').disabled = true; $('guardButton').disabled = true; addLog(`${defeated.name} defeated. Bounty +${defeated.bounty}.`, 'log-win'); toast(`Den cleared. +${defeated.bounty} coins.`); updateUI(); return; }
  updateUI();
}
$('spinButton').addEventListener('click', spin); $('attackButton').addEventListener('click', () => combatTurn('attack')); $('guardButton').addEventListener('click', () => combatTurn('guard'));
$('betDown').addEventListener('click', () => { if (!state.locked) { state.bet = Math.max(1, state.bet - 1); updateUI(); } });
$('betUp').addEventListener('click', () => { if (!state.locked) { state.bet = Math.min(25, state.bet + 1); updateUI(); } });
document.addEventListener('keydown', (event) => { if (event.code === 'Space' && state.enemy && !state.locked) { event.preventDefault(); combatTurn('attack'); } });
$('resetButton').addEventListener('click', () => { Object.assign(state, { coins: 100, best: 100, spins: 0, enemies: 0, charge: 0, bet: 5, round: 1, locked: false, enemy: null, enemyHp: 0 }); $('eventLog').innerHTML = '<div class="log-entry"><span class="log-time">NOW</span><span>Run reset. The house is waiting.</span><b class="log-neutral">READY</b></div>'; $('combatPanel').classList.remove('ready'); $('combatState').textContent = 'LOCKED'; $('enemyArt').textContent = '☠'; $('enemyName').textContent = 'NO TARGET'; $('combatCopy').textContent = 'Land three daggers on the reels to unlock a target.'; $('attackButton').disabled = true; $('guardButton').disabled = true; updateUI(); });
const dialog = $('helpDialog'); $('helpButton').addEventListener('click', () => dialog.showModal()); $('footerHelp').addEventListener('click', () => dialog.showModal()); $('closeHelp').addEventListener('click', () => dialog.close());
updateUI();
