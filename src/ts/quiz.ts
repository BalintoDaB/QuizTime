let serverId = new URLSearchParams(window.location.search).get('serverId');
let userId = document.cookie.split('; ').find(row => row.startsWith('userId='))?.split('=')[1];
let questiontitle = document.querySelector('#question-title') as HTMLHeadingElement;
let submitButton = document.querySelector('#submit-btn') as HTMLButtonElement;
let optionsContainer = document.querySelector('#options-container') as HTMLDivElement;
let timeString = document.querySelector('#time-str') as HTMLSpanElement;
let timeBar = document.querySelector('#time-bar') as HTMLDivElement;

let timeLimit = 30; // Default time limit in seconds
let curTime = 999;
let timerInterval: number | undefined;

let socket = new WebSocket(`ws://localhost:3002`);
socket.onopen = () => {
    console.log('WebSocket connection established');
    socket.send(JSON.stringify({
        type: 'getQuestion',
        serverId: serverId
    }));
};

socket.onmessage = (event) => {
    console.log('Message from server:', event.data);
    const data = JSON.parse(event.data);
    if (data.type == 'question') {
        timeLimit = data.timeLimit; // Set time limit from server or default to 30 seconds
        displayQuestion(data.question);
    } else if (data.type == 'result') {
        window.location.href = `results.html?serverId=${serverId}`;
    } else if (data.type == 'answerReceived') {
        displayAnswer(data.answer);
    }
};

submitButton.onclick = () => {
    let selectedOption = document.querySelector('input[name="ans"]:checked') as HTMLInputElement;
    if (selectedOption) {
        socket.send(JSON.stringify({
            type: 'playerAnswer',
            serverId: serverId,
            playerId: userId,
            answer: parseInt(selectedOption.value, 10)
        }));
    } else {
        alert('Please select an answer before submitting.');
    }
};

function displayAnswer(answer: number){
    optionsContainer.innerHTML = ''; // Clear previous options
    let label = document.createElement('label');
    label.className = 'flex items-center gap-4 rounded-lg border border-solid border-[#d0dbe7] p-[15px]';
    label.innerHTML = `Your answer number: ${answer}`;
    optionsContainer.appendChild(label);
}


function displayQuestion(question: { question: string, ans1: string, ans2: string, ans3: string, ans4: string, correct: number }) {
    questiontitle.textContent = question.question;
    let answers = [question.ans1, question.ans2, question.ans3, question.ans4];
    optionsContainer.innerHTML = ''; // Clear previous options
    for (let i = 0; i < 4; i++) {
        let label = document.createElement('label');
        label.className = 'flex items-center gap-4 rounded-lg border border-solid border-[#d0dbe7] p-[15px]';
        label.innerHTML = `
            <input
                    type="radio"
                    class="h-5 w-5 border-2 border-[#d0dbe7] bg-transparent text-transparent checked:border-[#1978e5] checked:bg-[image:--radio-dot-svg] focus:outline-none focus:ring-0 focus:ring-offset-0 checked:focus:border-[#1978e5]"
                    name="ans"
                    value="${i + 1}"
            />
            <div class="flex grow flex-col"><p class="text-[#0e141b] text-sm font-medium leading-normal">${answers[i]}</p></div>
        `;
        optionsContainer.appendChild(label);
    }

    // Ensure timeLimit is a valid number
    if (!Number.isFinite(timeLimit) || timeLimit <= 0) {
        timeLimit = 30;
    }
    curTime = timeLimit;
    timeString.textContent = timeLimit.toString();
    timeBar.style.width = '100%';

    // Clear any previous timer
    if (timerInterval !== undefined) {
        clearInterval(timerInterval);
    }
    timerInterval = window.setInterval(() => {
        if (curTime > 0) {
            curTime--;
            timeString.textContent = curTime.toString();
            timeBar.style.width = `${(curTime / timeLimit) * 100}%`;
        } else {
            clearInterval(timerInterval);
            // Only auto-submit if an option is selected
            let selectedOption = document.querySelector('input[name="ans"]:checked') as HTMLInputElement;
            if (selectedOption) {
                submitButton.click();
            } else {
                // Optionally, you can send a "no answer" or just disable the button
                submitButton.disabled = true;
            }
        }
    }, 1000);
}