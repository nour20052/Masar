let addBtn = document.getElementById("addBtn");
let modal = document.getElementById("modal");
let cancel = document.getElementById("cancel");
let save = document.getElementById("save");

let nameInput = document.getElementById("name");
let linkInput = document.getElementById("link");
let typeInput = document.getElementById("type");

let list = document.getElementById("resourceList");
let toast = document.getElementById("toast");


function loadCustomResources() {
  let data = JSON.parse(localStorage.getItem("customResources")) || [];

  data.forEach(res => addToUI(res));
}


function addToUI(res) {
  let div = document.createElement("div");
  div.classList.add("resource-item");

  div.innerHTML = `
    <a href="${res.link}" target="_blank" class="resource-name col-lg-10 col-9">${res.name}</a>
    <span class="tag col-lg-2 col-3">${res.type}</span>
  `;

  list.appendChild(div);
}

addBtn.onclick = () => {
  modal.style.display = "flex";
};


cancel.onclick = () => {
  modal.style.display = "none";
};


save.onclick = () => {
  let name = nameInput.value.trim();
  let link = linkInput.value.trim();
  let type = typeInput.value;

  if (!name || !link) return;

  let data = JSON.parse(localStorage.getItem("customResources")) || [];

  
  let allNames = [
    ...data.map(r => r.name.toLowerCase()),
    ...Array.from(document.querySelectorAll(".resource-name")).map(el => el.textContent.toLowerCase())
  ];

  if (allNames.includes(name.toLowerCase())) {
    alert("Resource already exists ❌");
    return;
  }

  let newRes = { name, link, type };

  data.push(newRes);
  localStorage.setItem("customResources", JSON.stringify(data));

  addToUI(newRes);

  // Reset
  nameInput.value = "";
  linkInput.value = "";
  modal.style.display = "none";

  // Toast
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 2000);
};


loadCustomResources();



addBtn.onclick = () => {
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
};

cancel.onclick = () => {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
};
window.onclick = function(e) {
  if (e.target === modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
};