let serverId = new URLSearchParams(window.location.search).get('serverId');
let tbody = document.querySelector('#leaderboard-body') as HTMLTableElement;

let socket = new WebSocket(`ws://localhost:3002`);
socket.onopen = () => {
    console.log('WebSocket connection established');
    socket.send(JSON.stringify({
        type: 'getResults',
        serverId: serverId
    }));
};

socket.onmessage = (event) => {
    console.log('Message from server:', event.data);
    const data = JSON.parse(event.data);
    if (data.type === 'results') {
        displayResults(data.results);
    }
};

function displayResults(results: { playerName: string, score: number }[]) {
    tbody.innerHTML = ''; // Clear previous results
    results.forEach((result, index) => {
        let row = document.createElement('tr');
        row.className = 'border-t border-t-[#d0dbe7]';
        row.innerHTML = `
            <td class="table-2b476970-4659-48e9-b92e-e4366a8f1250-column-120 h-[72px] px-4 py-2 w-[400px] text-[#4e7097] text-sm font-normal leading-normal">${index+1}</td>
            <td class="table-2b476970-4659-48e9-b92e-e4366a8f1250-column-240 h-[72px] px-4 py-2 w-[400px] text-[#0e141b] text-sm font-normal leading-normal">
                ${result.playerName}
            </td>
            <td class="table-2b476970-4659-48e9-b92e-e4366a8f1250-column-360 h-[72px] px-4 py-2 w-[400px] text-[#4e7097] text-sm font-normal leading-normal">${result.score}</td>
        `;
        tbody.appendChild(row);
    });
}