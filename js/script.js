
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


// Authentication
/* 
  Floating Labels , Messages, Role Param, Password Strength & Validation
 */

document.addEventListener('DOMContentLoaded', () => {

    const floatingInputs = document.querySelectorAll('.input-wrapper .form-control');
    floatingInputs.forEach(input => {
        if (input.value.trim() !== '') input.parentElement.classList.add('has-value');
        const handleLabelState = () => {
            input.value.trim() !== ''
                ? input.parentElement.classList.add('has-value')
                : input.parentElement.classList.remove('has-value');
        };
        input.addEventListener('blur', handleLabelState);
        input.addEventListener('input', handleLabelState);
    });

    const valSummary = document.querySelector('.validation-summary');
    if (valSummary && valSummary.textContent.trim()) valSummary.style.display = 'block';
    const successMsg = document.querySelector('.success-message');
    if (successMsg && successMsg.textContent.trim()) successMsg.style.display = 'block';


    const params = new URLSearchParams(window.location.search);
    const roleInput = document.getElementById('Role');
    if (roleInput && params.get('role')) roleInput.value = params.get('role');


    function initConditions(inputId, reqIds) {
        const pwdInput = document.getElementById(inputId);
        if (!pwdInput) return null;

        const reqs = {};
        for (const [key, id] of Object.entries(reqIds)) {
            const el = document.getElementById(id);
            if (el) reqs[key] = el;
        }

    
        const container = pwdInput.closest('.input-wrapper')?.nextElementSibling;
        if(container && container.classList.contains('password-strength-meter')) {
            pwdInput.addEventListener('focus', () => container.style.display = 'block');
        }

        pwdInput.addEventListener('input', () => {
            const val = pwdInput.value;
            

            if(container && container.classList.contains('password-strength-meter') && val.length === 0) {
                container.style.display = 'none';
            } else if (container) {
                container.style.display = 'block';
            }

            const checks = {
                length: val.length >= 8,
                lower: /[a-z]/.test(val),
                upper: /[A-Z]/.test(val),
                number: /[0-9]/.test(val),
                special: /[^A-Za-z0-9]/.test(val)
            };

            for (const [key, el] of Object.entries(reqs)) {
                if (el && checks.hasOwnProperty(key)) {
                    if (checks[key]) {
                        el.className = 'req-item valid';
                    } else {
                        el.className = 'req-item invalid';
                    }
                }
            }
        });

        return { input: pwdInput, reqs };
    }

    function showPasswordError(input, msg) {
        if (!input) return;
        input.classList.add('field-error');
        let err = input.parentElement.querySelector('.error-text');
        if (!err) {
            err = document.createElement('small');
            err.className = 'error-text';
            input.parentElement.appendChild(err);
        }
        err.textContent = msg;
    }

    function clearPasswordError(input) {
        if (!input) return;
        input.classList.remove('field-error');
        const err = input.parentElement.querySelector('.error-text');
        if (err) err.remove();
    }

    const regData = initConditions('Password', {
        length: 'req-length', lower: 'req-lower', upper: 'req-upper',
        number: 'req-number', special: 'req-special'
    });

    if (regData) {
        const confirm = document.getElementById('ConfirmPassword');
        const form = document.querySelector('form[action="/Account/Register"]');

        if (form) {
            form.addEventListener('submit', e => {
                const val = regData.input.value;
                const isStrong = val.length >= 8 && /[a-z]/.test(val) && /[A-Z]/.test(val) && /[0-9]/.test(val) && /[^A-Za-z0-9]/.test(val);
                const isMatch = confirm && val === confirm.value;

                if (!isStrong || !isMatch) {
                    e.preventDefault();
                    if (!isStrong) {
                        regData.input.focus();

                    } else {
                        showPasswordError(confirm, '⚠️ Passwords do not match');
                        confirm.focus();
                    }
                }
            });
        }

        if (confirm) {
            confirm.addEventListener('input', () => {
                confirm.value === regData.input.value ? clearPasswordError(confirm) : showPasswordError(confirm, '⚠️ Passwords do not match');
            });
        }
    }

    const resetData = initConditions('NewPassword', {
        length: 'req-length', lower: 'req-lower', upper: 'req-upper',
        number: 'req-number', special: 'req-special'
    });

    if (resetData) {
        const confirm = document.getElementById('ConfirmPassword');
        const form = document.querySelector('form[action="/Account/ResetPassword"]');

        if (form) {
            form.addEventListener('submit', e => {
                const val = resetData.input.value;
                const isStrong = val.length >= 8 && /[a-z]/.test(val) && /[A-Z]/.test(val) && /[0-9]/.test(val) && /[^A-Za-z0-9]/.test(val);
                const isMatch = confirm && val === confirm.value;

                if (!isStrong || !isMatch) {
                    e.preventDefault();
                    if (!isStrong) resetData.input.focus();
                    else {
                        showPasswordError(confirm, '⚠️ Passwords do not match');
                        confirm.focus();
                    }
                }
            });
        }

        if (confirm) {
            confirm.addEventListener('input', () => {
                confirm.value === resetData.input.value ? clearPasswordError(confirm) : showPasswordError(confirm, '⚠️ Passwords do not match');
            });
        }
    }
});


////////////////////////////// OTP Verification Code Validation///////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
    const otpInputs = document.querySelectorAll('.otp-input');
    
  
    if (otpInputs.length === 0) return;

    const hiddenInput = document.getElementById('fullCode');
    const form = document.getElementById('verifyForm');
    const errorMsg = document.getElementById('codeError');
    const submitBtn = form?.querySelector('button[type="submit"]');
    const resendBtn = document.getElementById('resendBtn');
    const countdownEl = document.getElementById('countdown');
    const timerContainer = document.getElementById('timerDisplay');

    if (countdownEl) {
        let timeLeft = 120;
        const timerInterval = setInterval(() => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            countdownEl.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

            if (timeLeft <= 30) {
                countdownEl.style.color = '#dc2626';
                timerContainer?.classList.add('urgent');
            }

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                countdownEl.textContent = '00:00';
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.textContent = 'Code Expired';
                    submitBtn.style.opacity = '0.6';
                    submitBtn.style.cursor = 'not-allowed';
                }
                if (resendBtn) {
                    resendBtn.style.pointerEvents = 'auto';
                    resendBtn.style.opacity = '1';
                }
                if (errorMsg) {
                    errorMsg.textContent = 'Code expired. Please request a new one.';
                    errorMsg.style.display = 'block';
                }
            }
            timeLeft--;
        }, 1000);
    }

    const params = new URLSearchParams(window.location.search);
    const email = params.get('email');
    if (email) {
        const emailSpan = document.getElementById('userEmail');
        const hiddenEmail = document.getElementById('hiddenEmail');
        if (emailSpan) emailSpan.textContent = email;
        if (hiddenEmail) hiddenEmail.value = email;
    }

    function updateFullCode() {
        let code = '';
        otpInputs.forEach(inp => code += inp.value);
        if (hiddenInput) hiddenInput.value = code;
        if (errorMsg) errorMsg.style.display = 'none';
        otpInputs.forEach(inp => inp.classList.remove('error'));
    }

    otpInputs.forEach((input, index) => {
        input.addEventListener('keydown', (e) => {
            if (['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return;
            if (!/^\d$/.test(e.key)) e.preventDefault();
        });

        input.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
            if (e.target.value) {
                e.target.classList.add('filled');
                if (index < otpInputs.length - 1) otpInputs[index + 1].focus();
            } else {
                e.target.classList.remove('filled');
            }
            updateFullCode();
        });

        input.addEventListener('focus', () => input.select());

        input.addEventListener('paste', (e) => {
            e.preventDefault();
            const pasteData = (e.clipboardData || window.clipboardData).getData('text').replace(/[^0-9]/g, '');
            if (!pasteData) return;
            pasteData.split('').forEach((char, i) => {
                if (otpInputs[index + i]) {
                    otpInputs[index + i].value = char;
                    otpInputs[index + i].classList.add('filled');
                }
            });
            const nextIdx = Math.min(index + pasteData.length, otpInputs.length - 1);
            otpInputs[nextIdx].focus();
            updateFullCode();
        });
    });

    if (form) {
        form.addEventListener('submit', (e) => {
            const code = hiddenInput?.value || '';
            if (code.length !== 6 || !/^\d{6}$/.test(code)) {
                e.preventDefault();
                if (errorMsg) {
                    errorMsg.textContent = 'Please enter a valid 6-digit code.';
                    errorMsg.style.display = 'block';
                }
                otpInputs.forEach(inp => inp.classList.add('error'));
                otpInputs[0].focus();
            }
        });
    }

    if (resendBtn) {
        resendBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Verification code resent!'); 
        });
    }
});
 /////////////////////////////////////////////////////////////
