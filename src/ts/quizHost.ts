let serverId = new URLSearchParams(window.location.search).get('serverId');
let userId = document.cookie.split('; ').find(row => row.startsWith('userId='))?.split('=')[1];
let questiontitle = document.querySelector('#question-title') as HTMLHeadingElement;
let curQuestion = document.querySelector('#current-question') as HTMLSpanElement;
let allQuestions = document.querySelector('#all-questions') as HTMLSpanElement;
let questionList = document.querySelector('#question-list') as HTMLDivElement;
let nextBtn = document.querySelector('#next-btn') as HTMLButtonElement;

let socket = new WebSocket(`ws://localhost:3002`);
socket.onopen = () => {
    console.log('WebSocket connection established');
    socket.send(JSON.stringify({
        type: 'nextQuestion',
        serverId: serverId
    }));
};

socket.onmessage = (event) => {
    console.log('Message from server:', event.data);
    const data = JSON.parse(event.data);
    if (data.type == 'hostQuestion') {
        displayQuestion(data.numberOfQuestions, data.curQuestionIndex, data.question);
    } else if (data.type == 'result') {
        window.location.href = `results.html?serverId=${serverId}`;
    }
};

nextBtn.onclick = () => {
    socket.send(JSON.stringify({
        type: 'nextQuestion',
        serverId: serverId
    }));
};

function displayQuestion(numberOfQuestions: number, curQuestionIndex: number, question: { question: string, ans1: string, ans2: string, ans3: string, ans4: string }) {
    questionList.innerHTML = ''; // Clear previous options
    questiontitle.textContent = question.question;
    curQuestion.textContent = `${curQuestionIndex + 1}`;
    allQuestions.textContent = `${numberOfQuestions}`;
    
    let answers = [question.ans1, question.ans2, question.ans3, question.ans4];
    questionList.innerHTML = ''; // Clear previous options

    answers.forEach((answer, index) => {
        let label = document.createElement('label');
        label.className = 'flex items-center gap-4 rounded-lg border border-solid border-[#d0dbe7] p-[15px]';
        label.innerHTML = `
            <input type="radio" name="ans" value="${index}" class="w-5 h-5">
            <span>${answer}</span>
        `;
        questionList.appendChild(label);
    });
}