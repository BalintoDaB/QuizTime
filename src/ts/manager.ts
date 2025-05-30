import API from "./api";

let tableB = document.querySelector('#table-b') as HTMLTableElement;

async function init(){
    tableB.innerHTML = "";
    //fetch http://localhost:3001/api/quizzes/{coockie user id}
    let userId = document.cookie.split('; ').find(row => row.startsWith('userId='))?.split('=')[1];
    let data = await API.get(`quizzes/${userId}`) as { id: number, ownerId: number , title: string }[];
    data.forEach(element => {
        renderQuiz(element.id, element.title);
    });
}
export function renderQuiz(id:Number, title:string){
    let tr = document.createElement('tr');
    tr.className = 'border-t border-t-[#d0dbe7]';
    tr.innerHTML = `
        <td class="table-a60aacce-b9bd-4103-a1c8-4d1c124f5e18-column-120 h-[72px] px-4 py-2 w-[400px] text-[#0e141b] text-sm font-normal leading-normal">
            ${title}
        </td>
        <td class="table-a60aacce-b9bd-4103-a1c8-4d1c124f5e18-column-240 h-[72px] px-4 py-2 w-60 text-[#4e7097] text-sm font-bold leading-normal tracking-[0.015em]">
            <a href="edit.html?quizId=${id}">Edit</a> | <a href="delete.html?quizId=${id}">Delete</a>
        </td>
        <td class="table-a60aacce-b9bd-4103-a1c8-4d1c124f5e18-column-240 h-[72px] px-4 py-2 w-60 text-[#4e7097] text-sm font-bold leading-normal tracking-[0.015em]">
            <button class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 flex-1 bg-[#1978e5] text-slate-50 text-sm font-bold leading-normal tracking-[0.015em]">
                <a class="truncate" href="launch.html?quizId=${id}">Host</a>
            </button>
        </td>
    `;
    tableB.appendChild(tr);
}

init();