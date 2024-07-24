import trails from "./trails.mjs";

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const trailInfo = document.getElementById('trailinfo');

    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        const filteredTrails = trails.filter(trail => trail.title.toLowerCase().includes(query));
        displayTrails(filteredTrails);
    });

    function displayTrails(trails) {
        if (trails.length === 0) {
            trailInfo.innerHTML = "<p>No trails found</p>";
            return;
        }

        trailInfo.innerHTML = trails.map(trail => `
            <div class="trail-card">
                <img src="${trail.image}" alt="${trail.title} image">
                <h1 class="title">${trail.title}</h1>
                <div class="details">
                    <div class="left">
                        <p class="difficulty">Difficulty: ${trail.difficulty}</p>
                        <p class="elevation">Elevation: ${trail.elevation}</p>
                        <p class="terrain">Terrain: ${trail.terrain}</p>
                    </div>
                    <div class="right">
                        <p class="rating">${trail.rating} Rating</p>
                    </div>
                </div>
                <button class="report-btn" data-trail="${trail.title}">Report Trail</button>
            </div>
        `).join('');

        document.querySelectorAll('.report-btn').forEach(button => {
            button.addEventListener('click', handleReport);
        });
    }

    function handleReport(event) {
        const trailName = event.target.getAttribute('data-trail');
        console.log(`Trail reported: ${trailName}`);
        alert(`Thank you for reporting ${trailName}. Our team will review it shortly.`);
    }

    displayTrails(trails);
});