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