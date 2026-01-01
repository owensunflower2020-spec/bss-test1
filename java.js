/* Hive Builder JS
   - Bee list is based on the Bee Swarm Simulator wiki list (source linked in UI).
   - Each bee object: {name, rarity, color, wiki}
*/

const bees = [
  /* Common */
  {name:"Basic Bee", rarity:"Common", color:"Colorless"},
  /* Rare */
  {name:"Bomber Bee", rarity:"Rare", color:"Colorless"},
  {name:"Brave Bee", rarity:"Rare", color:"Colorless"},
  {name:"Bumble Bee", rarity:"Rare", color:"Colorless"},
  {name:"Cool Bee", rarity:"Rare", color:"Colorless"},
  {name:"Hasty Bee", rarity:"Rare", color:"Colorless"},
  {name:"Looker Bee", rarity:"Rare", color:"Colorless"},
  {name:"Rad Bee", rarity:"Rare", color:"Colorless"},
  {name:"Rascal Bee", rarity:"Rare", color:"Colorless"},
  {name:"Stubborn Bee", rarity:"Rare", color:"Colorless"},
  /* Epic */
  {name:"Bubble Bee", rarity:"Epic", color:"Colorless"},
  {name:"Bucko Bee", rarity:"Epic", color:"Red"},
  {name:"Commander Bee", rarity:"Epic", color:"Colorless"},
  {name:"Demo Bee", rarity:"Epic", color:"Colorless"},
  {name:"Exhausted Bee", rarity:"Epic", color:"Colorless"},
  {name:"Fire Bee", rarity:"Epic", color:"Red"},
  {name:"Frosty Bee", rarity:"Epic", color:"Blue"},
  {name:"Honey Bee", rarity:"Epic", color:"Colorless"},
  {name:"Rage Bee", rarity:"Epic", color:"Red"},
  {name:"Riley Bee", rarity:"Epic", color:"Colorless"},
  {name:"Shocked Bee", rarity:"Epic", color:"Blue"},
  /* Legendary */
  {name:"Baby Bee", rarity:"Legendary", color:"Colorless"},
  {name:"Carpenter Bee", rarity:"Legendary", color:"Colorless"},
  {name:"Demon Bee", rarity:"Legendary", color:"Colorless"},
  {name:"Diamond Bee", rarity:"Legendary", color:"Colorless"},
  {name:"Lion Bee", rarity:"Legendary", color:"Red"},
  {name:"Music Bee", rarity:"Legendary", color:"Colorless"},
  {name:"Ninja Bee", rarity:"Legendary", color:"White"},
  {name:"Shy Bee", rarity:"Legendary", color:"Blue"},
  /* Mythic */
  {name:"Buoyant Bee", rarity:"Mythic", color:"Colorless"},
  {name:"Fuzzy Bee", rarity:"Mythic", color:"Colorless"},
  {name:"Precise Bee", rarity:"Mythic", color:"White"},
  {name:"Spicy Bee", rarity:"Mythic", color:"Red"},
  {name:"Tadpole Bee", rarity:"Mythic", color:"Blue"},
  {name:"Vector Bee", rarity:"Mythic", color:"White"},
  /* Event */
  {name:"Bear Bee", rarity:"Event", color:"Colorless"},
  {name:"Cobalt Bee", rarity:"Event", color:"Blue"},
  {name:"Crimson Bee", rarity:"Event", color:"Red"},
  {name:"Digital Bee", rarity:"Event", color:"Colorless"},
  {name:"Festive Bee", rarity:"Event", color:"Colorless"},
  {name:"Gummy Bee", rarity:"Event", color:"Colorless"},
  {name:"Photon Bee", rarity:"Event", color:"Colorless"},
  {name:"Puppy Bee", rarity:"Event", color:"Colorless"},
  {name:"Tabby Bee", rarity:"Event", color:"Colorless"},
  {name:"Vicious Bee", rarity:"Event", color:"Colorless"},
  {name:"Windy Bee", rarity:"Event", color:"Blue"}
];

// helpers
const beeListEl = document.getElementById('beeList');
const hiveGrid = document.getElementById('hiveGrid');
const searchInput = document.getElementById('search');
const colorFilter = document.getElementById('colorFilter');
const rarityFilter = document.getElementById('rarityFilter');
const giftedToggle = document.getElementById('giftedToggle');
const clearHiveBtn = document.getElementById('clearHive');
const exportBtn = document.getElementById('exportHive');
const exportArea = document.getElementById('exportArea');

const rarityToSlotClass = {
  "Common":"slot-common",
  "Rare":"slot-rare",
  "Epic":"slot-epic",
  "Legendary":"slot-legendary",
  "Mythic":"slot-mythic",
  "Event":"slot-event"
};

function wikiUrlFor(name){
  return "https://bee-swarm-simulator.fandom.com/wiki/" + encodeURIComponent(name.replace(/ /g,'_'));
}

function shortInitial(name){
  // make a 2-letter code for the icon
  return name.split(' ').map(s=>s[0]).slice(0,2).join('').toUpperCase();
}

function createBeeCard(bee){
  const el = document.createElement('div');
  el.className = 'bee-card';
  el.dataset.name = bee.name;
  const icon = document.createElement('div');
  icon.className = 'bee-icon';
  icon.textContent = shortInitial(bee.name);
  // color the icon by bee.color
  if(bee.color === 'Red') icon.style.background = '#ffb3b3';
  else if(bee.color === 'Blue') icon.style.background = '#bfe8ff';
  else if(bee.color === 'White') icon.style.background = '#fff3d9';
  else icon.style.background = '#f2d9b3';

  const info = document.createElement('div');
  info.className = 'bee-info';
  info.innerHTML = `<div class="bee-name">${bee.name}</div>
    <div class="bee-meta">${bee.rarity} • ${bee.color}
      <a class="more-link" href="${wikiUrlFor(bee.name)}" target="_blank" rel="noopener">More</a>
    </div>`;
  el.appendChild(icon);
  el.appendChild(info);

  el.onclick = () => placeBeeInHive(bee);
  return el;
}

function renderBeeList(){
  beeListEl.innerHTML = '';
  const q = (searchInput.value||'').toLowerCase();
  const cf = colorFilter.value;
  const rf = rarityFilter.value;
  bees.forEach(b=>{
    if(cf !== 'all' && b.color !== cf) return;
    if(rf !== 'all' && b.rarity !== rf) return;
    if(q && !b.name.toLowerCase().includes(q)) return;
    beeListEl.appendChild(createBeeCard(b));
  });
}

function buildHiveSlots(n=45){
  hiveGrid.innerHTML = '';
  for(let i=0;i<n;i++){
    const slot = document.createElement('div');
    slot.className = 'hive-slot';
    slot.innerHTML = `<div class="slot-label">Slot ${i+1}</div><div class="slot-bee">Empty</div><div class="slot-star">★</div>`;
    slot.dataset.index = i;
    slot.onclick = (ev) => {
      // remove bee if any
      const beeName = slot.querySelector('.slot-bee').dataset.name||'';
      slot.querySelector('.slot-bee').dataset.name = '';
      slot.querySelector('.slot-bee').textContent = 'Empty';
      slot.classList.remove('gifted');
      slot.classList.remove(...Object.values(rarityToSlotClass));
      ev.stopPropagation();
    };
    hiveGrid.appendChild(slot);
  }
}

function firstEmptySlot(){
  const slots = [...document.querySelectorAll('.hive-slot')];
  return slots.find(s => (s.querySelector('.slot-bee').textContent === 'Empty'));
}

function placeBeeInHive(bee){
  const slot = firstEmptySlot();
  if(!slot){
    alert('No empty hive slots — clear one first.');
    return;
  }
  slot.querySelector('.slot-bee').textContent = bee.name;
  slot.querySelector('.slot-bee').dataset.name = bee.name;
  // add rarity coloring
  slot.classList.remove(...Object.values(rarityToSlotClass));
  const cls = rarityToSlotClass[bee.rarity]||'slot-rare';
  slot.classList.add(cls);
  // gifted
  if(giftedToggle.checked) slot.classList.add('gifted');
  else slot.classList.remove('gifted');
}

clearHiveBtn.onclick = () => {
  [...document.querySelectorAll('.hive-slot')].forEach(s=>{
    s.querySelector('.slot-bee').textContent = 'Empty';
    s.querySelector('.slot-bee').dataset.name = '';
    s.classList.remove(...Object.values(rarityToSlotClass));
    s.classList.remove('gifted');
  });
};

exportBtn.onclick = () => {
  const slots = [...document.querySelectorAll('.hive-slot')].map(s=>{
    return {
      slot: Number(s.dataset.index)+1,
      bee: s.querySelector('.slot-bee').dataset.name || null,
      gifted: s.classList.contains('gifted') || false
    };
  });
  exportArea.value = JSON.stringify(slots.filter(x=>x.bee), null, 2);
};

// interactions
searchInput.oninput = renderBeeList;
colorFilter.onchange = renderBeeList;
rarityFilter.onchange = renderBeeList;
giftedToggle.onchange = () => {
  const gifted = giftedToggle.checked;
  document.querySelectorAll('.hive-slot').forEach(s=>{
    // if a slot has a bee, toggle gifted marker
    if(s.querySelector('.slot-bee').dataset.name) {
      if(gifted) s.classList.add('gifted'); else s.classList.remove('gifted');
    }
  });
};

// initial render
buildHiveSlots(45);
renderBeeList();
