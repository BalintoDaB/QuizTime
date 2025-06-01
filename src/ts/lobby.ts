let serverId = new URLSearchParams(window.location.search).get('serverId');
let mode = new URLSearchParams(window.location.search).get('mode')?.trim() || 'joinServer';
let userId = document.cookie.split('; ').find(row => row.startsWith('userId='))?.split('=')[1];



if (!serverId || !userId) {
    alert("Invalid server or user ID.");
    window.location.href = 'quizes.html';
}

let playerList = document.querySelector('#player-list') as HTMLDivElement;
let buttoncont = document.querySelector('#button-cont') as HTMLDivElement;

if(mode == "hostJoin"){
    let btn = document.createElement('button');
    btn.className = "fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-colors duration-200";
    btn.textContent = "Start Quiz";
    btn.onclick = () => {
        socket.send(JSON.stringify({
            type: 'startServer',
            serverId: serverId,
            userId: userId
        }));
    };
    buttoncont.appendChild(btn);
}

let socket = new WebSocket(`ws://localhost:3002`);

socket.onopen = () => {
    console.log('WebSocket connection established');
    socket.send(JSON.stringify({
        type: mode,
        serverId: serverId,
        userId: userId
    }));
};

socket.onmessage = (event) => {
    console.log('Message from server:', event.data);
    const data = JSON.parse(event.data);
    if (data.type === 'playerJoined') {
        document.querySelector('#title')!.textContent = `Quiz: ${data.quizName}`;
        document.querySelector('#host-name')!.textContent = `Hosted by ${data.hostname}`;
        updatePlayerList(data.players);
    }
    else if(data.type === 'serverStarted' && data.serverId == serverId){
        if( mode == 'hostJoin') {window.location.href = `quizHost.html?serverId=${data.serverId}`;}
        else{window.location.href = `quiz.html?serverId=${data.serverId}`;}
    }
};

function updatePlayerList(playerNames: string[]) {
    playerList.innerHTML = "";
    playerNames.forEach(player => {
        let div = document.createElement('div');
        div.className = 'flex items-center gap-4 bg-slate-50 px-4 min-h-14';
        div.innerHTML = `
            <div
                class="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-10 w-fit"
                style='background-image: url("../img/default-avatar-icon-of-social-media-user-vector.jpg");'>
            </div>
            <p class="text-[#0e141b] text-base font-normal leading-normal flex-1 truncate">${player}</p>
        `;
        playerList.appendChild(div);
    });
    
};