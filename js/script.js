
function loadComponent(id, file, callback) {
  fetch(file)
    .then(res => res.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;

      
      requestAnimationFrame(() => {
        if (callback) callback();
      });
    });
}


loadComponent('navbar', '../Shared/_Nav.html', setActiveLink);
loadComponent('footer', '../Shared/_Footer.html');
loadComponent('chat-icon', '../Shared/_ChatbotWidget.html');



function getPageName(path) {
  return path.split("/").pop().split("?")[0];
}



function setActiveLink() {
  const currentPage = getPageName(location.pathname);

  document.querySelectorAll(".nav-link").forEach(link => {
    const linkPage = getPageName(link.getAttribute("href"));

    if (linkPage === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}
function toggleChat() {
  const chat = document.getElementById("chatPopup");
  chat.style.display = chat.style.display === "flex" ? "none" : "flex";
}


function sendMessage() {
  const input = document.getElementById("chatInput");
  const message = input.value.trim();
  const chatBody = document.getElementById("chatBody");

  if (message === "") return;


  const userMsg = document.createElement("p");
  userMsg.textContent = message;
  userMsg.style.textAlign = "right";
  chatBody.appendChild(userMsg);

  input.value = "";

  
  setTimeout(() => {
    const botMsg = document.createElement("p");
    botMsg.textContent = "I'm just a demo 🤖";
    chatBody.appendChild(botMsg);
  }, 500);
}


const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {

    if (entry.isIntersecting) {

      const counter = entry.target;
      const target = +counter.getAttribute("data-target");

      let count = 0;

      const updateCounter = () => {

        const increment = target / 200;

        if (count < target) {
          count += increment;
          counter.innerText = Math.floor(count).toLocaleString();
          requestAnimationFrame(updateCounter);
        } else {
          counter.innerText = target.toLocaleString();
        }

      };

      updateCounter();

      observer.unobserve(counter);

    }

  });
});

counters.forEach(counter => observer.observe(counter));



const sliders = document.querySelectorAll(".slider");

sliders.forEach((slider) => {
  const track = slider.querySelector(".cardsTrack");
  const nextBtn = slider.querySelector(".nextBtn");
  const prevBtn = slider.querySelector(".prevBtn");
  const cards = slider.querySelectorAll(".custom-card");

  let currentIndex = 0;
  let visibleCards = getVisibleCards();
  let maxIndex = cards.length - visibleCards;

  function getVisibleCards() {
    if (window.innerWidth < 768) {
      return 1;
    } else if (window.innerWidth < 992) {
      return 2;
    } else {
      return 3;
    }
  }

  function updateSlider() {
    visibleCards = getVisibleCards();
    maxIndex = cards.length - visibleCards;

    const cardWidth = cards[0].offsetWidth;
    const gap = 16;

    track.style.transform =
      `translateX(-${currentIndex * (cardWidth + gap)}px)`;
  }

  function nextSlide() {
    currentIndex++;

    if (currentIndex > maxIndex) {
      currentIndex = 0; 
    }

    updateSlider();
  }

  function prevSlide() {
    currentIndex--;

    if (currentIndex < 0) {
      currentIndex = maxIndex;
    }

    updateSlider();
  }

  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  
  setInterval(nextSlide, 4000);

  window.addEventListener("resize", updateSlider);

  updateSlider();
});





 



