const resultsContainer = document.getElementById('results-container');
const searchBox = document.getElementById('search-box');
let loadedCount = 0;
const loadIncrement = 50;

function createTable(item) {
    const container = document.createElement('div');
    container.className = 'combo-container';

    const summary = document.createElement('div');
    summary.className = 'combo-summary';
    summary.textContent = `#${item['#']} Combination: ${item.umas.join(', ')} (Total: ${item.total})`;
    
    const details = document.createElement('div');
    details.className = 'combo-details';

    const table = document.createElement('table');
    const headerRow = table.insertRow();
    item.umas.forEach(uma => {
        const th = document.createElement('th');
        th.textContent = uma;
        headerRow.appendChild(th);
    });

    const imgRow = table.insertRow();
    item.umas.forEach(uma => {
        const cell = imgRow.insertCell();
        const img = document.createElement('img');
        const img_filename = uma.toLowerCase().replace(/ /g, '_') + '.png';
        img.src = `img/${img_filename}`;
        img.alt = uma;
        cell.appendChild(img);
    });

    const scoreRow = table.insertRow();
    item.scores.forEach((score, index) => {
        const cell = scoreRow.insertCell();
        cell.innerHTML = `Session ${index + 1}: <strong>${score}</strong>`;
    });

    details.appendChild(table);
    container.appendChild(summary);
    container.appendChild(details);

    summary.addEventListener('click', () => {
        details.style.display = details.style.display === 'none' ? 'block' : 'none';
    });

    return container;
}

function loadMore(filter = '') {
    const filteredData = window.combinationsData.filter(item => 
        item.umas.some(uma => uma.toLowerCase().includes(filter.toLowerCase()))
    );

    const fragment = document.createDocumentFragment();
    const limit = Math.min(loadedCount + loadIncrement, filteredData.length);

    for (let i = loadedCount; i < limit; i++) {
        fragment.appendChild(createTable(filteredData[i]));
    }
    resultsContainer.appendChild(fragment);
    loadedCount = limit;
}

function handleSearch() {
    loadedCount = 0;
    resultsContainer.innerHTML = '';
    loadMore(searchBox.value);
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        loadMore(searchBox.value);
    }
});

searchBox.addEventListener('input', handleSearch);

// Initial load
loadMore();
