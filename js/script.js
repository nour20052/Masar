fetch("../Shared/_Nav.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("nav-container").innerHTML = data;

    setActiveLink();
  });

function setActiveLink() {
  let links = document.querySelectorAll(".nav-links a");
  let currentPath = window.location.pathname; 

  links.forEach(link => {
    let linkPath = link.getAttribute("href"); 

    
    if (currentPath.endsWith(linkPath)) {
      link.classList.add("active");
    }
  });
}




 



