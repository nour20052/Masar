const STORAGE_KEY = "masar_resources";


function loadResources() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}

function saveResources(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}


function renderResources() {
  const list = loadResources();
  const container = document.getElementById("resourceList");
  if (!container) return;

 
  if (list.length === 0) {
    const staticItems = container.querySelectorAll(".resource-item[data-static]");
    if (staticItems.length > 0) return; 
    return;
  }

  container.innerHTML = "";
  list.forEach(res => {
    const item = document.createElement("div");
    item.className = "resource-item";
    item.dataset.id = res.id;

    const href = res.fileData ? res.fileData : (res.link || "#");
    const target = res.fileData ? "_blank" : (res.link && res.link !== "#" ? "_blank" : "_self");

    item.innerHTML = `
      <a href="${href}" target="${target}" class="resource-name col-8">${escHtml(res.name)}</a>
      <span class="tag col-2">${escHtml(res.type)}</span>
      <div class="resource-actions col-2">
        <button class="res-action-btn edit-btn" title="Edit" onclick="openEditModal('${res.id}')">
          <i class="fa-regular fa-pen-to-square"></i>
        </button>
        <button class="res-action-btn delete-btn" title="Delete" onclick="deleteResource('${res.id}')">
          <i class="fa-regular fa-trash-can"></i>
        </button>
      </div>
    `;
    container.appendChild(item);
  });
}

function escHtml(str) {
  return String(str).replace(/[&<>"']/g, c =>
    ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
}


function deleteResource(id) {
  const list = loadResources().filter(r => r.id !== id);
  saveResources(list);
  renderResources();
  showToast("Resource deleted 🗑️");
}


let editingId = null;

function openAddModal() {
  editingId = null;
  document.querySelector(".modal-content h4").textContent = "Add Resource";
  resetModal();
  showModal();
}

function openEditModal(id) {
  const res = loadResources().find(r => r.id === id);
  if (!res) return;
  editingId = id;
  document.querySelector(".modal-content h4").textContent = "Edit Resource";
  document.getElementById("m-name").value = res.name || "";
  document.getElementById("m-type").value = res.type || "YT";
  updateModalInputs(res.type);
  document.getElementById("m-link").value = res.link || "";
  showModal();
}

function resetModal() {
  document.getElementById("m-name").value = "";
  document.getElementById("m-link").value = "";
  document.getElementById("m-type").value = "YT";
  document.getElementById("m-file-name").textContent = "";
  updateModalInputs("YT");
}

function showModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "flex";
}

function hideModal() {
  document.getElementById("modal").style.display = "none";
  editingId = null;
}


function updateModalInputs(type) {
  const linkRow  = document.getElementById("m-link-row");
  const fileRow  = document.getElementById("m-file-row");
  const isFile   = (type === "PDF" || type === "FILE" || type === "DOC");

  if (isFile) {
    linkRow.style.display = "none";
    fileRow.style.display = "block";
  } else {
    linkRow.style.display = "block";
    fileRow.style.display = "none";
  }

  const linkInput = document.getElementById("m-link");
  const placeholders = {
    YT:  "YouTube URL (https://youtube.com/...)",
    WEB: "Website URL (https://...)",
  };
  linkInput.placeholder = placeholders[type] || "URL";
}


let droppedFileData = null;

function initDropZone() {
  const zone = document.getElementById("m-dropzone");
  if (!zone) return;

  zone.addEventListener("click", () => document.getElementById("m-file-input").click());

  zone.addEventListener("dragover", e => {
    e.preventDefault();
    zone.classList.add("drag-over");
  });

  zone.addEventListener("dragleave", () => zone.classList.remove("drag-over"));

  zone.addEventListener("drop", e => {
    e.preventDefault();
    zone.classList.remove("drag-over");
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  });

  document.getElementById("m-file-input").addEventListener("change", e => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  });
}

function handleFile(file) {
  const reader = new FileReader();
  reader.onload = ev => {
    droppedFileData = ev.target.result; // base64 data URL
    document.getElementById("m-file-name").textContent = file.name;
    if (!document.getElementById("m-name").value) {
      document.getElementById("m-name").value = file.name.replace(/\.[^.]+$/, "");
    }
  };
  reader.readAsDataURL(file);
}


function saveResource() {
  const name = document.getElementById("m-name").value.trim();
  const type = document.getElementById("m-type").value;
  const link = document.getElementById("m-link").value.trim();
  const isFile = (type === "PDF" || type === "FILE");

  if (!name) { alert("Please enter a resource name."); return; }
  if (!isFile && !link) { alert("Please enter a URL."); return; }
  if (isFile && !droppedFileData && !editingId) { alert("Please select a file."); return; }

  const list = loadResources();

  if (editingId) {
    const idx = list.findIndex(r => r.id === editingId);
    if (idx !== -1) {
      list[idx] = {
        ...list[idx],
        name,
        type,
        link: isFile ? "" : link,
        fileData: isFile && droppedFileData ? droppedFileData : list[idx].fileData,
      };
    }
    showToast("Resource updated ✅");
  } else {
    list.push({
      id: uid(),
      name,
      type,
      link: isFile ? "" : link,
      fileData: isFile ? droppedFileData : null,
    });
    showToast("Resource added ✅");
  }

  saveResources(list);
  droppedFileData = null;
  hideModal();
  renderResources();
}


function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.style.display = "block";
  setTimeout(() => { toast.style.display = "none"; }, 2500);
}

document.addEventListener("DOMContentLoaded", () => {
 
  const addBtn = document.getElementById("addBtn");
  if (addBtn) addBtn.addEventListener("click", openAddModal);

 
  const cancelBtn = document.getElementById("cancel");
  if (cancelBtn) cancelBtn.addEventListener("click", hideModal);


  const saveBtn = document.getElementById("save");
  if (saveBtn) saveBtn.addEventListener("click", saveResource);

  
  const typeSelect = document.getElementById("m-type");
  if (typeSelect) typeSelect.addEventListener("change", e => {
    droppedFileData = null;
    document.getElementById("m-file-name").textContent = "";
    updateModalInputs(e.target.value);
  });

  
  const modal = document.getElementById("modal");
  if (modal) modal.addEventListener("click", e => {
    if (e.target === modal) hideModal();
  });

  initDropZone();
  renderResources();
});
