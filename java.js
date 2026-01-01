/* Hive Builder JS
   - Bee list is based on the Bee Swarm Simulator wiki list (source linked in UI).
   - Each bee object contains: name, rarity, color, description, and abilities
*/

const beeData = [
  /* Common */
  {
    name: "Basic Bee",
    rarity: "Common",
    color: "Colorless",
    description: "A basic bee with no special abilities.",
    abilities: ["Basic Pollen Collection", "Basic Attack"]
  },
  
  /* Rare */
  {
    name: "Bomber Bee",
    rarity: "Rare",
    color: "Colorless",
    description: "Drops bombs that damage all enemies.",
    abilities: ["Bomb Ability: Damages all enemies in range", "Gifted: +25% Bomb Damage"]
  },
  {
    name: "Brave Bee",
    rarity: "Rare",
    color: "Colorless",
    description: "Grants a temporary attack boost when your health is low.",
    abilities: ["Last Stand: +50% Attack when below 25% health", "Gifted: +10% Attack"]
  },
  {
    name: "Bumble Bee",
    rarity: "Rare",
    color: "Colorless",
    description: "Has a chance to convert pollen to honey.",
    abilities: ["Honey Producer: Chance to convert pollen to honey", "Gifted: +10% Honey Per Pollen"]
  },
  
  /* Epic */
  {
    name: "Bubble Bee",
    rarity: "Epic",
    color: "Colorless",
    description: "Creates bubbles that collect pollen automatically.",
    abilities: ["Bubble Blast: Creates pollen bubbles", "Gifted: +10% Bubble Blast Pollen"]
  },
  {
    name: "Bucko Bee",
    rarity: "Epic",
    color: "Red",
    description: "A red bee that boosts red pollen collection.",
    abilities: ["Red Pollen: +25% Red Pollen", "Gifted: +5% Red Pollen"]
  },
  {
    name: "Fire Bee",
    rarity: "Epic",
    color: "Red",
    description: "Burns enemies and boosts critical power.",
    abilities: ["Scorching: Burns enemies", "Gifted: +10% Critical Power"]
  },
  
  /* Legendary */
  {
    name: "Baby Bee",
    rarity: "Legendary",
    color: "Colorless",
    description: "Gives a boost to all your bees' stats.",
    abilities: ["Baby Love: +10% Bee Ability Rate", "Gifted: +5% Bee Ability Rate"]
  },
  {
    name: "Carpenter Bee",
    rarity: "Legendary",
    color: "Colorless",
    description: "Gives a chance for instant conversion.",
    abilities: ["Carpenter's Wisdom: Chance for instant conversion", "Gifted: +5% Instant Conversion"]
  },
  
  /* Mythic */
  {
    name: "Spicy Bee",
    rarity: "Mythic",
    color: "Red",
    description: "Boosts critical chance and red pollen.",
    abilities: ["Spicy Pollen: +25% Red Pollen", "Fire Starter: +10% Critical Chance", "Gifted: +5% Critical Chance"]
  },
  {
    name: "Tadpole Bee",
    rarity: "Mythic",
    color: "Blue",
    description: "Creates blue bombs and boosts blue pollen.",
    abilities: ["Blue Bomb: Creates blue bombs", "Blue Boost: +25% Blue Pollen", "Gifted: +5% Blue Pollen"]
  },
  
  /* Event */
  {
    name: "Photon Bee",
    rarity: "Event",
    color: "Colorless",
    description: "Shoots powerful photon blasts at enemies.",
    abilities: ["Photon Blast: Fires a powerful beam", "Gifted: +25% Photon Blast Damage"]
  },
  {
    name: "Tabby Bee",
    rarity: "Event",
    color: "Colorless",
    description: "Has a chance to scratch enemies for massive damage.",
    abilities: ["Tabby Love: Scratch attack", "Gifted: +50% Critical Power"]
  },
  {
    name: "Gummy Bee",
    rarity: "Event",
    color: "Colorless",
    description: "Creates gummy tokens that boost conversion.",
    abilities: ["Gummy Star: Creates gummy tokens", "Gifted: +10% Gummy Star Duration"]
  }
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
const detailModal = document.createElement('div');
detailModal.className = 'modal';
detailModal.innerHTML = `
  <div class="modal-content">
    <span class="close">&times;</span>
    <h2 id="modal-bee-name"></h2>
    <div class="bee-details">
      <div class="bee-icon-large" id="modal-bee-icon"></div>
      <div class="bee-info">
        <div class="bee-rarity" id="modal-bee-rarity"></div>
        <div class="bee-color" id="modal-bee-color"></div>
      </div>
    </div>
    <p id="modal-bee-description"></p>
    <h3>Abilities:</h3>
    <ul id="modal-bee-abilities"></ul>
  </div>
`;
document.body.appendChild(detailModal);

const rarityToSlotClass = {
  "Common":"slot-common",
  "Rare":"slot-rare",
  "Epic":"slot-epic",
  "Legendary":"slot-legendary",
  "Mythic":"slot-mythic",
  "Event":"slot-event"
};

const colorToHex = {
  "Red": "#ffb3b3",
  "Blue": "#bfe8ff",
  "White": "#fff3d9",
  "Colorless": "#f0f0f0"
};

function wikiUrlFor(name){
  return "https://bee-swarm-simulator.fandom.com/wiki/" + encodeURIComponent(name.replace(/ /g,'_'));
}

function shortInitial(name){
  return name.split(' ').map(s=>s[0]).slice(0,2).join('').toUpperCase();
}

function showBeeDetails(bee) {
  document.getElementById('modal-bee-name').textContent = bee.name;
  document.getElementById('modal-bee-description').textContent = bee.description;
  document.getElementById('modal-bee-rarity').textContent = bee.rarity;
  document.getElementById('modal-bee-color').textContent = bee.color;
  
  const icon = document.getElementById('modal-bee-icon');
  icon.textContent = shortInitial(bee.name);
  icon.style.background = colorToHex[bee.color] || colorToHex["Colorless"];
  
  const abilitiesList = document.getElementById('modal-bee-abilities');
  abilitiesList.innerHTML = bee.abilities.map(ability => 
    `<li>${ability}</li>`
  ).join('');
  
  detailModal.style.display = 'block';
}

// Close modal when clicking the X
const closeBtn = document.querySelector('.close');
closeBtn.onclick = function() {
  detailModal.style.display = 'none';
}

// Close modal when clicking outside the content
window.onclick = function(event) {
  if (event.target === detailModal) {
    detailModal.style.display = 'none';
  }
}

function createBeeCard(bee) {
  const el = document.createElement('div');
  el.className = 'bee-card';
  el.dataset.name = bee.name;
  
  const icon = document.createElement('div');
  icon.className = 'bee-icon';
  icon.textContent = shortInitial(bee.name);
  icon.style.background = colorToHex[bee.color] || colorToHex["Colorless"];
  
  const nameEl = document.createElement('div');
  nameEl.className = 'bee-name';
  nameEl.textContent = bee.name;
  
  el.appendChild(icon);
  el.appendChild(nameEl);
  
  // Show details on click
  el.addEventListener('click', () => showBeeDetails(bee));
  
  return el;
}

function placeBeeInHive(bee) {
  const slot = firstEmptySlot();
  if (!slot) return;
  
  const beeName = typeof bee === 'string' ? bee : bee.name;
  const beeInfo = beeData.find(b => b.name === beeName) || {rarity: 'Common', color: 'Colorless'};
  
  slot.dataset.bee = beeName;
  slot.className = `hive-slot ${rarityToSlotClass[beeInfo.rarity] || ''}`;
  slot.title = beeName;
  
  const icon = document.createElement('div');
  icon.className = 'bee-icon';
  icon.textContent = shortInitial(beeName);
  icon.style.background = colorToHex[beeInfo.color] || colorToHex["Colorless"];
  
  slot.innerHTML = '';
  slot.appendChild(icon);
  
  slot.onclick = function() {
    slot.innerHTML = '';
    slot.className = 'hive-slot';
    delete slot.dataset.bee;
  };
  
  // Show details on double click
  slot.ondblclick = function() {
    showBeeDetails(beeInfo);
  };
}

function firstEmptySlot(){
  const slots = [...document.querySelectorAll('.hive-slot')];
  return slots.find(s => (s.querySelector('.slot-bee').textContent === 'Empty'));
}

function renderBeeList(){
  const searchTerm = searchInput.value.toLowerCase();
  const colorFilterVal = colorFilter.value;
  const rarityFilterVal = rarityFilter.value;
  
  const filteredBees = beeData.filter(bee => {
    const matchesSearch = bee.name.toLowerCase().includes(searchTerm);
    const matchesColor = colorFilterVal === 'all' || bee.color === colorFilterVal;
    const matchesRarity = rarityFilterVal === 'all' || bee.rarity === rarityFilterVal;
    return matchesSearch && matchesColor && matchesRarity;
  });
  
  beeListEl.innerHTML = '';
  filteredBees.forEach(bee => {
    beeListEl.appendChild(createBeeCard(bee));
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
