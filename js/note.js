const SECTIONS = [
  { id:'programming-basics', label:'Programming Basics' },
  { id:'oop',                label:'OOP' },
  { id:'csharp',             label:'C# Fundamentals' },
  { id:'databases',          label:'Databases & SQL' },
  { id:'entity-framework',   label:'Entity Framework' },
  { id:'aspnet',             label:'ASP.NET Core' },
  { id:'algorithms',         label:'Algorithms' },
  { id:'design-patterns',    label:'Design Patterns' },
  { id:'general',            label:'General' },
];

const SMAP     = Object.fromEntries(SECTIONS.map(s => [s.id, s]));
const P_ICONS  = { high:'fa-circle-exclamation', medium:'fa-circle-minus', low:'fa-circle-check' };

let notes = [], editId = null, chosenPri = 'high';


function load() {
  try { notes = JSON.parse(localStorage.getItem('masar_notes_v5') || '[]'); } catch { notes = []; }
  if (!notes.length) seed();
  populateSectionFilter();
}

function save() { localStorage.setItem('masar_notes_v5', JSON.stringify(notes)); }

function seed() {
  notes = [
    { id:uid(), title:'Types of JOINs in SQL',     content:'INNER JOIN: matching rows only.\nLEFT JOIN: all left + matching right.\nRIGHT JOIN: all right + matching left.\nFULL OUTER JOIN: all rows from both.',      section:'databases',        priority:'high',   date:ago(33) },
    { id:uid(), title:'When to Use an INDEX?',      content:'INDEX speeds up SELECT but slows INSERT/UPDATE.\nUse on: WHERE, JOIN, ORDER BY columns.\nAvoid on small tables or low-cardinality columns.', section:'databases',        priority:'medium', date:ago(33) },
    { id:uid(), title:'LINQ — Key Methods',         content:'Where() — filter\nSelect() — project\nOrderBy() / OrderByDescending()\nGroupBy()\nFirstOrDefault() / Any() / All()',                      section:'csharp',           priority:'high',   date:ago(34) },
    { id:uid(), title:'SOLID Principles',           content:'S — Single Responsibility\nO — Open/Closed\nL — Liskov Substitution\nI — Interface Segregation\nD — Dependency Inversion',                 section:'oop',              priority:'high',   date:ago(35) },
    { id:uid(), title:'Big-O Cheat Sheet',          content:'O(1) Constant · O(log n) Binary search\nO(n) Linear · O(n log n) Merge sort\nO(n²) Bubble sort · O(2ⁿ) Exponential',                     section:'algorithms',       priority:'medium', date:ago(20) },
    { id:uid(), title:'EF Core — DbContext Basics', content:'DbContext bridges your domain and the database.\nUse DbSet<T> for each entity.\nCall SaveChanges() to persist.',                           section:'entity-framework', priority:'low',    date:ago(15) },
  ];
  save();
}

function uid()      { return Math.random().toString(36).slice(2,10) + Date.now().toString(36); }
function ago(d)     { return new Date(Date.now() - d*86400000).toISOString(); }
function secObj(id) { return SMAP[id] || SMAP['general']; }


function getFiltered() {
  const q  = document.getElementById('search-input').value.toLowerCase();
  const fs = document.getElementById('filter-section').value;
  const fp = document.getElementById('filter-priority').value;
  return notes.filter(n => {
    const ms = fs === 'all' || n.section === fs;
    const mp = fp === 'all' || n.priority === fp;
    const mq = !q || n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q);
    return ms && mp && mq;
  });
}

function resetFilters() {
  document.getElementById('filter-section').value  = 'all';
  document.getElementById('filter-priority').value = 'all';
  document.getElementById('search-input').value    = '';
  renderAll();
}

function populateSectionFilter() {
  document.getElementById('filter-section').innerHTML =
    '<option value="all">All Sections</option>' +
    SECTIONS.map(s => `<option value="${s.id}">${s.label}</option>`).join('');
}


function renderAll() { renderStats(); renderNotes(); }

function renderStats() {
  const t = notes.length;
  const h = notes.filter(n => n.priority==='high').length;
  const m = notes.filter(n => n.priority==='medium').length;
  const l = notes.filter(n => n.priority==='low').length;

  document.getElementById('stats-row').innerHTML = `
    <div class="stat-card">
      <div class="stat-icon" style="background:var(--bg-grid);color:var(--primary)"><i class="fa-regular fa-note-sticky fa-lg"></i></div>
      <div><div class="stat-value">${t}</div><div class="stat-label">Total Notes</div></div>
    </div>
    <div class="stat-card">
      <div class="stat-icon" style="background:var(--high-soft);color:var(--high)"><i class="fa-solid fa-circle-exclamation fa-lg"></i></div>
      <div><div class="stat-value">${h}</div><div class="stat-label">High Priority</div></div>
    </div>
    <div class="stat-card">
      <div class="stat-icon" style="background:var(--med-soft);color:var(--med)"><i class="fa-solid fa-circle-minus fa-lg"></i></div>
      <div><div class="stat-value">${m}</div><div class="stat-label">Medium Priority</div></div>
    </div>
    <div class="stat-card">
      <div class="stat-icon" style="background:var(--low-soft);color:var(--low)"><i class="fa-solid fa-circle-check fa-lg"></i></div>
      <div><div class="stat-value">${l}</div><div class="stat-label">Low Priority</div></div>
    </div>`;
}

function renderNotes() {
  const area     = document.getElementById('notes-area');
  const list     = getFiltered();
  const fsVal    = document.getElementById('filter-section').value;
  const isAllSec = fsVal === 'all';

  if (!list.length) {
    area.innerHTML = `
      <div class="empty-state-wrap">
        <div class="empty-state">
          <i class="fa-regular fa-folder-open"></i>
          <h3>No notes found</h3>
          <p>Adjust your filters or add a new note.</p>
        </div>
        <div class="add-note-card add-note-card--centered" onclick="openModal()">
          <div class="add-icon"><i class="fa-solid fa-plus"></i></div>
          <span>Add Note</span>
        </div>
      </div>`;
    return;
  }

  if (isAllSec) {
    const cards = list.map(cardHTML).join('');
    area.innerHTML = `
      <div class="notes-grid">
        ${cards}
        <div class="add-note-card" onclick="openModal()">
          <div class="add-icon"><i class="fa-solid fa-plus"></i></div>
          <span>Add Note</span>
        </div>
      </div>`;
    return;
  }

  const grouped = {};
  list.forEach(n => { if (!grouped[n.section]) grouped[n.section] = []; grouped[n.section].push(n); });

  let html = '';
  Object.entries(grouped).forEach(([sid, sNotes]) => {
    const s = secObj(sid);
    html += `
      <div class="section-group">
        <div class="section-group-header">
          <div class="section-group-name"><i class="fa-solid fa-layer-group"></i>${s.label}</div>
          <div class="section-group-line"></div>
          <div class="section-group-count">${sNotes.length} note${sNotes.length!==1?'s':''}</div>
        </div>
        <div class="notes-grid">
          ${sNotes.map(cardHTML).join('')}
          <div class="add-note-card" onclick="openModal('${sid}')">
            <div class="add-icon"><i class="fa-solid fa-plus"></i></div>
            <span>Add Note</span>
          </div>
        </div>
      </div>`;
  });

  area.innerHTML = html;
}

function cardHTML(n) {
  const s       = secObj(n.section);
  const preview = n.content.length > 150 ? n.content.slice(0,150)+'…' : n.content;
  const cont    = preview.replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>');
  const pIcon   = P_ICONS[n.priority] || 'fa-circle-minus';
  const pLabel  = n.priority.charAt(0).toUpperCase() + n.priority.slice(1);

  return `
    <div class="note-card ${n.priority}" id="card-${n.id}">
      <div class="note-inner">
        <div class="note-card-top">
          <div class="note-title">${n.title.replace(/</g,'&lt;')}</div>
          <button class="note-delete-btn" onclick="deleteNote('${n.id}')" title="Delete">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
        <div class="note-content">${cont}</div>
      </div>
      <div class="note-footer">
        <div class="note-section-badge"><i class="fa-solid fa-layer-group"></i>${s.label}</div>
        <span class="priority-badge ${n.priority}">
          <i class="fa-solid ${pIcon}"></i>${pLabel}
        </span>
      </div>
    </div>`;
}


function openModal(prefill) {
  editId = null; chosenPri = 'high';
  document.getElementById('form-title').value   = '';
  document.getElementById('form-content').value = '';
  const ps = prefill || document.getElementById('filter-section').value;
  const def = (ps && ps !== 'all') ? ps : 'programming-basics';
  document.getElementById('form-section').innerHTML =
    SECTIONS.map(s => `<option value="${s.id}"${s.id===def?' selected':''}>${s.label}</option>`).join('');
  updatePBtns();
  document.getElementById('modal-title').innerHTML = '<i class="fa-regular fa-note-sticky"></i> New Note';
  document.getElementById('modal-overlay').classList.add('open');
  setTimeout(() => document.getElementById('form-title').focus(), 280);
}

function closeModal() { document.getElementById('modal-overlay').classList.remove('open'); editId = null; }
function overlayClick(e) { if (e.target === document.getElementById('modal-overlay')) closeModal(); }

function selPri(p) { chosenPri = p; updatePBtns(); }
function updatePBtns() {
  ['high','medium','low'].forEach(p => {
    document.getElementById('pb-'+p).className = 'p-btn' + (chosenPri===p ? ' sel-'+p : '');
  });
}

function saveNote() {
  const title   = document.getElementById('form-title').value.trim();
  const content = document.getElementById('form-content').value.trim();
  const section = document.getElementById('form-section').value;
  if (!title)   { shake('form-title');   return; }
  if (!content) { shake('form-content'); return; }

  if (editId) {
    const i = notes.findIndex(n => n.id === editId);
    if (i !== -1) { notes[i] = { ...notes[i], title, content, section, priority: chosenPri }; toast('✏️ Note updated'); }
  } else {
    notes.unshift({ id:uid(), title, content, section, priority:chosenPri, date:new Date().toISOString() });
    toast('✅ Note added');
  }
  save(); closeModal(); renderAll();
}

function deleteNote(id) {
  const card = document.getElementById('card-'+id);
  if (card) {
    card.classList.add('removing');
    setTimeout(() => { notes = notes.filter(n => n.id !== id); save(); renderAll(); toast('🗑️ Note deleted'); }, 280);
  }
}

function shake(id) {
  const el = document.getElementById(id);
  el.style.animation = 'none'; el.offsetHeight;
  el.style.animation = 'shake .4s ease';
  el.style.borderColor = 'var(--high)'; el.focus();
  setTimeout(() => { el.style.borderColor=''; el.style.animation=''; }, 600);
}

function toast(msg) {
  const w  = document.getElementById('toast-wrap');
  const el = document.createElement('div');
  el.className = 'toast'; el.innerHTML = msg; w.appendChild(el);
  setTimeout(() => { el.classList.add('removing'); setTimeout(() => el.remove(), 280); }, 2800);
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
  if ((e.ctrlKey||e.metaKey) && e.key==='k') { e.preventDefault(); openModal(); }
});


load();


(function applyUrlFilter() {
  const params = new URLSearchParams(window.location.search);
  const sec    = params.get('section');
  if (sec && SECTIONS.some(s => s.id === sec)) {
    // Update page title
    const match = SECTIONS.find(s => s.id === sec);
    const titleEl = document.getElementById('page-title');
    if (titleEl) titleEl.textContent = match.label;

    const sel = document.getElementById('filter-section');
    if (sel) sel.value = sec;
  }
})();


renderAll();
