function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modals = document.querySelectorAll('.modal.active');
        modals.forEach(modal => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
});

document.querySelector('.edit-form')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('editName').value;
    const email = document.getElementById('editEmail').value;
    const location = document.getElementById('editLocation').value;
    const bio = document.getElementById('editBio').value;
    const github = document.getElementById('editGithub').value;
    const linkedin = document.getElementById('editLinkedin').value;
    
    document.querySelector('.profile-name').textContent = name;
    
    const githubCard = document.getElementById('githubCard');
    const githubValue = document.getElementById('githubValue');
    if (github) {
        githubValue.textContent = github;
        githubCard.style.display = 'flex';
    } else {
        githubCard.style.display = 'none';
    }
    
    const linkedinCard = document.getElementById('linkedinCard');
    const linkedinValue = document.getElementById('linkedinValue');
    if (linkedin) {
        linkedinValue.textContent = linkedin;
        linkedinCard.style.display = 'flex';
    } else {
        linkedinCard.style.display = 'none';
    }
    
    closeModal('editProfileModal');
    
    alert('Profile updated successfully!');
});
document.querySelectorAll('.upload-area').forEach(area => {
    area.addEventListener('click', function() {
        console.log('Upload clicked');
    });
});
