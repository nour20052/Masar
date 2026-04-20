// Tracks Filtering---- Search------  Buttons

document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('searchInput');
    const trackCards = document.querySelectorAll('.track-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            trackCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();

            trackCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                const tags = Array.from(card.querySelectorAll('.track-tags span'))
                    .map(tag => tag.textContent.toLowerCase())
                    .join(' ');

                if (title.includes(searchTerm) || description.includes(searchTerm) || tags.includes(searchTerm)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    }

    //  Read More Button → track-details.html
    document.querySelectorAll('.read-more-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const trackCard = this.closest('.track-card');
            const trackCategory = trackCard.getAttribute('data-category');
            window.location.href = `track-details.html?track=${trackCategory}`;
        });
    });

    // Read About Button → about-roadmap.html
    document.querySelectorAll('.btn-read-about').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const trackCard = this.closest('.track-card');
            const trackCategory = trackCard.getAttribute('data-category');
            window.location.href = `about-roadmap.html?track=${trackCategory}`;
        });
    });

    // Start Track Button → start-quiz.html
    document.querySelectorAll('.btn-start-track').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const trackCard = this.closest('.track-card');
            const trackCategory = trackCard.getAttribute('data-category');
            window.location.href = `../Quiz/start-quiz.html?track=${trackCategory}`;
        });
    });
});