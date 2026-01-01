/* Hive Builder JS
   - Bee list is based on the Bee Swarm Simulator wiki list (source linked in UI).
   - Each bee object contains: name, rarity, color, description, and abilities
*/

const beeData = [
  /* Common */
  {
    name: "Basic Bee",
    rarity: "Common",
    color: "White",
    description: "A basic bee with no special abilities.",
    abilities: ["Basic Pollen Collection", "Basic Attack"],
    stats: {
      "Speed": 10,
      "Attack": 10,
      "Gather": 10,
      "Conversion": 10
    }
  },

  /* Rare */
  {
    name: "Bomber Bee",
    rarity: "Rare",
    color: "White",
    description: "Drops bombs that damage all enemies.",
    abilities: ["Bomb Ability: Damages all enemies in range", "Gifted: +25% Bomb Damage"],
    stats: {
      "Speed": 15,
      "Attack": 25,
      "Gather": 12,
      "Conversion": 10
    }
  },
  {
    name: "Brave Bee",
    rarity: "Rare",
    color: "White",
    description: "Grants a temporary attack boost when your health is low.",
    abilities: ["Last Stand: +50% Attack when below 25% health", "Gifted: +10% Attack"],
    stats: {
      "Speed": 12,
      "Attack": 30,
      "Gather": 15,
      "Conversion": 8
    }
  },
  {
    name: "Bumble Bee",
    rarity: "Rare",
    color: "Blue",
    description: "Has a chance to convert pollen to honey.",
    abilities: ["Honey Producer: Chance to convert pollen to honey", "Gifted: +10% Honey Per Pollen"],
    stats: {
      "Speed": 10,
      "Attack": 12,
      "Gather": 18,
      "Conversion": 25
    }
  },
  {
    name: "Cool Bee",
    rarity: "Rare",
    color: "Blue",
    description: "Has a chance to freeze enemies.",
    abilities: ["Freeze: Chance to freeze enemies", "Gifted: +10% Freeze Duration"],
    stats: {
      "Speed": 20,
      "Attack": 18,
      "Gather": 14,
      "Conversion": 12
    }
  },
  {
    name: "Hasty Bee",
    rarity: "Rare",
    color: "White",
    description: "Increases movement speed.",
    abilities: ["Haste: +10% Movement Speed", "Gifted: +5% Movement Speed"],
    stats: {
      "Speed": 30,
      "Attack": 10,
      "Gather": 12,
      "Conversion": 8
    }
  },
  {
    name: "Looker Bee",
    rarity: "Rare",
    color: "White",
    description: "Has a chance to gather extra pollen.",
    abilities: ["Looker: Chance for extra pollen", "Gifted: +10% Pollen"],
    stats: {
      "Speed": 12,
      "Attack": 14,
      "Gather": 22,
      "Conversion": 10
    }
  },
  {
    name: "Rad Bee",
    rarity: "Rare",
    color: "Red",
    description: "Increases attack power.",
    abilities: ["Rad Power: +15% Attack", "Gifted: +5% Attack"],
    stats: {
      "Speed": 14,
      "Attack": 28,
      "Gather": 16,
      "Conversion": 10
    }
  },
  {
    name: "Rascal Bee",
    rarity: "Rare",
    color: "Red",
    description: "Steals honey from enemies.",
    abilities: ["Honey Steal: Chance to steal honey", "Gifted: +10% Honey Steal"],
    stats: {
      "Speed": 18,
      "Attack": 20,
      "Gather": 15,
      "Conversion": 20
    }
  },
  {
    name: "Stubborn Bee",
    rarity: "Rare",
    color: "White",
    description: "Refuses to die, giving extra health.",
    abilities: ["Stubborn: +20% Health", "Gifted: +5% Health"],
    stats: {
      "Speed": 8,
      "Attack": 16,
      "Gather": 14,
      "Conversion": 12
    }
  },

  /* Epic */
  {
    name: "Bubble Bee",
    rarity: "Epic",
    color: "Blue",
    description: "Creates bubbles that collect pollen automatically.",
    abilities: ["Bubble Blast: Creates pollen bubbles", "Gifted: +10% Bubble Blast Pollen"]
  },
  {
    name: "Bucko Bee",
    rarity: "Epic",
    color: "Blue",
    description: "A blue bee that boosts blue pollen collection.",
    abilities: ["Blue Pollen: +25% Blue Pollen", "Gifted: +5% Blue Pollen"]
  },
  {
    name: "Commander Bee",
    rarity: "Epic",
    color: "White",
    description: "Boosts the attack of nearby bees.",
    abilities: ["Commanding Presence: +15% Attack to nearby bees", "Gifted: +5% Attack Boost"]
  },
  {
    name: "Demo Bee",
    rarity: "Epic",
    color: "White",
    description: "Drops bombs that damage all enemies.",
    abilities: ["Bomb Ability: Damages all enemies in range", "Gifted: +25% Bomb Damage"]
  },
  {
    name: "Exhausted Bee",
    rarity: "Epic",
    color: "White",
    description: "Moves slowly but gathers lots of pollen.",
    abilities: ["Exhaustion: +30% Pollen", "Gifted: +5% Pollen"]
  },
  {
    name: "Fire Bee",
    rarity: "Epic",
    color: "Red",
    description: "Burns enemies and boosts critical power.",
    abilities: ["Scorching: Burns enemies", "Gifted: +10% Critical Power"]
  },
  {
    name: "Frosty Bee",
    rarity: "Epic",
    color: "Blue",
    description: "Freezes enemies and boosts blue pollen.",
    abilities: ["Frostbite: Freezes enemies", "Gifted: +5% Blue Pollen"]
  },
  {
    name: "Honey Bee",
    rarity: "Epic",
    color: "White",
    description: "Converts pollen to honey more efficiently.",
    abilities: ["Honey Maker: +20% Honey Per Pollen", "Gifted: +5% Honey Per Pollen"]
  },
  {
    name: "Rage Bee",
    rarity: "Epic",
    color: "Red",
    description: "Increases attack power when angry.",
    abilities: ["Rage: +25% Attack", "Gifted: +5% Attack"]
  },
  {
    name: "Riley Bee",
    rarity: "Epic",
    color: "Red",
    description: "Has a chance to gather bonus pollen.",
    abilities: ["Riley's Luck: Chance for bonus pollen", "Gifted: +10% Pollen"]
  },
  {
    name: "Shocked Bee",
    rarity: "Epic",
    color: "White",
    description: "Shocks enemies and boosts blue pollen.",
    abilities: ["Shock: Damages enemies", "Gifted: +5% Blue Pollen"]
  },

  /* Legendary */
  {
    name: "Baby Bee",
    rarity: "Legendary",
    color: "White",
    description: "Gives a boost to all your bees' stats.",
    abilities: ["Baby Love: +10% Bee Ability Rate", "Gifted: +5% Bee Ability Rate"]
  },
  {
    name: "Carpenter Bee",
    rarity: "Legendary",
    color: "White",
    description: "Gives a chance for instant conversion.",
    abilities: ["Carpenter's Wisdom: Chance for instant conversion", "Gifted: +5% Instant Conversion"]
  },
  {
    name: "Demon Bee",
    rarity: "Legendary",
    color: "Red",
    description: "Boosts red pollen and critical chance.",
    abilities: ["Demonic Descent: +30% Red Pollen", "Gifted: +5% Critical Chance"]
  },
  {
    name: "Diamond Bee",
    rarity: "Legendary",
    color: "Blue",
    description: "Converts pollen to diamonds.",
    abilities: ["Diamond Maker: Converts pollen to diamonds", "Gifted: +10% Diamond Rate"]
  },
  {
    name: "Lion Bee",
    rarity: "Legendary",
    color: "White",
    description: "Increases attack and critical chance.",
    abilities: ["Roar: +20% Attack", "Gifted: +5% Critical Chance"]
  },
  {
    name: "Music Bee",
    rarity: "Legendary",
    color: "White",
    description: "Boosts ability rate and movement speed.",
    abilities: ["Harmony: +15% Ability Rate", "Gifted: +5% Movement Speed"]
  },
  {
    name: "Ninja Bee",
    rarity: "Legendary",
    color: "Blue",
    description: "Has a chance to deal massive damage.",
    abilities: ["Assassinate: Chance for 10x damage", "Gifted: +5% Critical Power"]
  },
  {
    name: "Shy Bee",
    rarity: "Legendary",
    color: "Red",
    description: "Hides from enemies but gathers pollen.",
    abilities: ["Shy: +25% Pollen", "Gifted: +5% Pollen"]
  },

  /* Mythic */
  {
    name: "Buoyant Bee",
    rarity: "Mythic",
    color: "Blue",
    description: "Floats above water and gathers pollen.",
    abilities: ["Buoyancy: +20% Pollen", "Gifted: +5% Pollen"]
  },
  {
    name: "Fuzzy Bee",
    rarity: "Mythic",
    color: "White",
    description: "Converts white pollen to honey.",
    abilities: ["Fuzzy Bubble: Converts white pollen", "Gifted: +10% Conversion Rate"]
  },
  {
    name: "Precise Bee",
    rarity: "Mythic",
    color: "Red",
    description: "Increases critical chance and power.",
    abilities: ["Precision: +15% Critical Chance", "Gifted: +10% Critical Power"]
  },
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
  {
    name: "Vector Bee",
    rarity: "Mythic",
    color: "White",
    description: "Increases critical power and white pollen.",
    abilities: ["Vector Strike: +20% Critical Power", "Gifted: +5% White Pollen"]
  },

  /* Event */
  {
    name: "Bear Bee",
    rarity: "Event",
    color: "White",
    description: "Boosts all stats and has a chance to drop honey.",
    abilities: ["Bear Morph: Temporary stat boost", "Gifted: +10% Honey Per Pollen"]
  },
  {
    name: "Cobalt Bee",
    rarity: "Event",
    color: "Blue",
    description: "Creates a blue field that boosts blue bees.",
    abilities: ["Cobalt Field: Boosts blue bees", "Gifted: +5% Blue Pollen"]
  },
  {
    name: "Crimson Bee",
    rarity: "Event",
    color: "Red",
    description: "Creates a red field that boosts red bees.",
    abilities: ["Crimson Field: Boosts red bees", "Gifted: +5% Red Pollen"]
  },
  {
    name: "Digital Bee",
    rarity: "Event",
    color: "White",
    description: "Has a chance to create digital honey tokens.",
    abilities: ["Digital Honey: Creates digital tokens", "Gifted: +10% Digital Honey"]
  },
  {
    name: "Festive Bee",
    rarity: "Event",
    color: "White",
    description: "Has a chance to drop presents that contain random items.",
    abilities: ["Festive Spirit: Drops presents", "Gifted: +10% Present Drop Rate"]
  },
  {
    name: "Gummy Bee",
    rarity: "Event",
    color: "White",
    description: "Creates gummy tokens that boost conversion.",
    abilities: ["Gummy Star: Creates gummy tokens", "Gifted: +10% Gummy Star Duration"]
  },
  {
    name: "Photon Bee",
    rarity: "Event",
    color: "White",
    description: "Shoots powerful photon blasts at enemies.",
    abilities: ["Photon Blast: Fires a powerful beam", "Gifted: +25% Photon Blast Damage"]
  },
  {
    name: "Puppy Bee",
    rarity: "Event",
    color: "White",
    description: "Has a chance to fetch items for you.",
    abilities: ["Fetch: Chance to find items", "Gifted: +10% Fetch Chance"]
  },
  {
    name: "Tabby Bee",
    rarity: "Event",
    color: "White",
    description: "Has a chance to scratch enemies for massive damage.",
    abilities: ["Tabby Love: Scratch attack", "Gifted: +50% Critical Power"]
  },
  {
    name: "Vicious Bee",
    rarity: "Event",
    color: "Blue",
    description: "Deals massive damage to enemies.",
    abilities: ["Vicious Swarm: Area damage", "Gifted: +10% Attack"]
  },
  {
    name: "Windy Bee",
    rarity: "Event",
    color: "White",
    description: "Creates a tornado that collects pollen and damages enemies.",
    abilities: ["Tornado: Collects pollen and damages", "Gifted: +5% Blue Pollen"]
  }
];

// Verify we have all 50 bees
console.log(`Total bees in beeData: ${beeData.length}`);

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
    <h3>Stats:</h3>
    <div id="modal-bee-stats" class="bee-stats"></div>
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
  "White": "#fff3d9"
};

function wikiUrlFor(name){
  return "https://bee-swarm-simulator.fandom.com/wiki/" + encodeURIComponent(name.replace(/ /g,'_'));
}

function shortInitial(name){
  return name.split(' ').map(s=>s[0]).slice(0,2).join('').toUpperCase();
}

function showBeeDetails(bee, fromHive = false) {
  document.getElementById('modal-bee-name').textContent = bee.name;
  document.getElementById('modal-bee-description').textContent = bee.description;
  document.getElementById('modal-bee-rarity').textContent = bee.rarity;
  document.getElementById('modal-bee-color').textContent = bee.color;
  
  const icon = document.getElementById('modal-bee-icon');
  icon.textContent = shortInitial(bee.name);
  icon.style.background = colorToHex[bee.color] || colorToHex["White"];
  
  const abilitiesList = document.getElementById('modal-bee-abilities');
  abilitiesList.innerHTML = bee.abilities.map(ability => 
    `<li>${ability}</li>`
  ).join('');
  
  // Display stats in a column format with gifted bonus
  const statsContainer = document.getElementById('modal-bee-stats');
  
  // Check if this bee is gifted in the hive
  let isGifted = false;
  if (fromHive) {
    // If clicked from hive, check if the slot is marked as gifted
    const hiveSlot = document.querySelector(`.hive-slot[data-bee="${bee.name}"]`);
    isGifted = hiveSlot ? hiveSlot.classList.contains('gifted') : false;
  } else {
    // If clicked from bee library, use the toggle state
    isGifted = giftedToggle.checked;
  }
  
  if (bee.stats) {
    statsContainer.innerHTML = Object.entries(bee.stats).map(([stat, value]) => {
      const giftedBonus = Math.floor(value * 0.2); // 20% gifted bonus
      const totalValue = isGifted ? value + giftedBonus : value;
      const bonusText = isGifted ? ` (+${giftedBonus})` : '';
      
      return `<div class="stat-row">
        <span class="stat-name">${stat}:</span>
        <span class="stat-value">${totalValue}${bonusText}</span>
      </div>`;
    }).join('');
    statsContainer.style.display = 'block';
  } else {
    statsContainer.style.display = 'none';
  }
  
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
  icon.style.background = colorToHex[bee.color] || colorToHex["White"];
  
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
  const beeInfo = beeData.find(b => b.name === beeName) || {rarity: 'Common', color: 'White'};
  
  slot.dataset.bee = beeName;
  slot.className = `hive-slot ${rarityToSlotClass[beeInfo.rarity] || ''}`;
  slot.title = beeName;
  
  const icon = document.createElement('div');
  icon.className = 'bee-icon';
  icon.textContent = shortInitial(beeName);
  icon.style.background = colorToHex[beeInfo.color] || colorToHex["White"];
  
  slot.innerHTML = '';
  slot.appendChild(icon);
  
  slot.onclick = function() {
    slot.innerHTML = '';
    slot.className = 'hive-slot';
    delete slot.dataset.bee;
  };
  
  // Show details on double click
  slot.ondblclick = function() {
    showBeeDetails(beeInfo, true); // true = from hive
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
  
  // Refresh modal if it's open to update stats with gifted bonus
  if (detailModal.style.display === 'block') {
    const modalBeeName = document.getElementById('modal-bee-name').textContent;
    const bee = beeData.find(b => b.name === modalBeeName);
    if (bee) {
      showBeeDetails(bee);
    }
  }
};

// initial render
buildHiveSlots(50);
renderBeeList();
