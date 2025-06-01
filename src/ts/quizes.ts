import API from "./api";

let quizList = document.querySelector('#quiz-list') as HTMLDivElement;
let data = await API.get<{serverId: number, quizName: string, numberOfPlayers: number, hostName: string}[]>('servers');
data.forEach(quiz => {
    createQuizElement(quiz);
});

function createQuizElement(quiz: {serverId: number, quizName: string, numberOfPlayers: number, hostName: string}) {
    let div = document.createElement('div');
    div.className = 'flex gap-4 bg-slate-50 px-4 py-3 justify-between';
    div.innerHTML = `
        <div class="flex flex-1 flex-col justify-center">
            <p class="text-[#0e141b] text-base font-medium leading-normal">${quiz.quizName}</p>
            <p class="text-[#4e7097] text-sm font-normal leading-normal">${quiz.numberOfPlayers} number of participants</p>
            <p class="text-[#4e7097] text-sm font-normal leading-normal">Hosted by ${quiz.hostName}</p>
        </div>
        <div class="shrink-0">
            <button
                class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#e7edf3] text-[#0e141b] text-sm font-medium leading-normal w-fit"
            >
                <a class="truncate" href="lobby.html?serverId=${quiz.serverId}">Join</a>
            </button>
        </div>
    `;
    quizList.appendChild(div);
}