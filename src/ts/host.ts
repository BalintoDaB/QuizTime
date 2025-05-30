let hostId = document.cookie.split('; ').find(row => row.startsWith('userId='))?.split('=')[1];
let quizId = new URLSearchParams(window.location.search).get('quizId');
let timeLimit = new URLSearchParams(window.location.search).get('timeLimit') || '30'; // Default to 60 seconds if not provided
let serverId= null;
if (!hostId || !quizId) {
    alert("Invalid host or quiz ID.");
    window.location.href = 'manager.html';
}

const socket = new WebSocket(`ws://localhost:3002`);
socket.onopen = () => {
    socket.send(JSON.stringify({
        type: 'createServer',
        hostId: hostId,
        quizId: quizId,
        timeLimit: parseInt(timeLimit, 10)
    }));
}
socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    serverId = data.serverId;
    window.location.href = `lobby.html?mode=host&serverId=${serverId}`;
}