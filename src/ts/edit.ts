import API from "./api";
import NotificationComponent from "./notifications";

let titlep = document.querySelector('#title-p') as HTMLParagraphElement;
let titleInput = document.querySelector('#title-inp') as HTMLInputElement;
let quizId = new URLSearchParams(window.location.search).get('quizId');
let fulldiv = document.querySelector('#QuestionDiv');
let questionsSaved:{  quizId:number, question:string, correct:number, ans1:string, ans2:string, ans3:string, ans4:string}[] = [];
let isNew = false;
if (!quizId) {
    alert("Quiz ID is required");
    window.location.href = "manager.html";
}
if(quizId == "NEW"){
    titlep.innerText = "New Quiz";
    isNew = true;
}

if(isNew){
  document.querySelector('#save-btn')?.addEventListener('click', New);
}
else{
  document.querySelector('#save-btn')?.addEventListener('click', Edit);
  let res: { quiz: {id:number, ownerId:number, title:string}, questions: { id: number, quizId:number, question:string, correct:number, ans1:string, ans2:string, ans3:string, ans4:string}[] } = {};
  try{
    res = await API.get(`quiz/${quizId}`) as { quiz: {id:number, ownerId:number, title:string}, questions: { id: number, quizId:number, question:string, correct:number, ans1:string, ans2:string, ans3:string, ans4:string}[] };
  }
  catch (error) {
    console.error("Error fetching quiz data:", error);
    alert("Failed to load quiz data. Please try again.");
    window.location.href = "manager.html";
  }
  
  console.log(res);
  titleInput.value = res.quiz.title;
  res.questions.forEach(element => {
    renderQuestion(element);
  });

}

async function New(){
  let title = titleInput.value.trim();
  if (!title) {
      NotificationComponent.error("Title is required, please enter a title for the quiz.");
      return;
  }
  if (questionsSaved.length === 0) {
      NotificationComponent.error("At least one question is required, please add a question to the quiz.");
      return;
  }
  
  let data = {
      title: title,
      ownerId: parseInt(document.cookie.split('; ').find(row => row.startsWith('userId='))?.split('=')[1]!),
      questions: questionsSaved
  };
  
  try {
      let res = await API.post(`quizzes`, data);
      console.log(res);
      window.location.href = "manager.html";
  } catch (error) {
      console.error("Error saving quiz:", error);
      NotificationComponent.error("Failed to save quiz. Please try again.");
  }
}

async function Edit(){

}

function renderQuestion(question: { id: number, quizId:number, question:string, correct:number, ans1:string, ans2:string, ans3:string, ans4:string}){
  console.log(question);
  let div = document.createElement('div');
    div.innerHTML = `
        <div class="flex gap-4 bg-slate-50 px-4 py-3 justify-between">
              <div class="flex flex-1 flex-col justify-center">
                <p class="text-[#0e141b] text-base font-medium leading-normal">${question.question}</p>
                <p class="text-[#4e7097] text-sm font-normal leading-normal">A.   ${question.ans1}   B.   ${question.ans2}   C.   ${question.ans3}   D.   ${question.ans4}   </p>
                <p class="text-[#4e7097] text-sm font-normal leading-normal">Correct number: ${question.correct}</p>
              </div>
              <div class="shrink-0">
                <button class="text-[#0e141b]  size-7" data-icon="PencilSimple" data-size="24px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="red" viewBox="0 0 256 256">
                    <path d="M216,48H176V40a16,16,0,0,0-16-16H96A16,16,0,0,0,80,40v8H40A8,8,0,0,0,40,64H48V208a24,24,0,0,0,24,24H184a24,24,0,0,0,24-24V64h8a8,8,0,0,0,0-16ZM96,48h64v8H96Zm88,160a8,8,0,0,1-8,8H80a8,8,0,0,1-8-8V64H184ZM104,104a8,8,0,0,1,16,0v72a8,8,0,0,1-16,0Zm32,0a8,8,0,0,1,16,0v72a8,8,0,0,1-16,0Z"></path>
                  </svg>
                </button>
                <button class="text-[#0e141b]  size-7" data-icon="PencilSimple" data-size="24px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"></path>
                  </svg>
                </button>
              </div>
            </div>
    `;
    fulldiv?.appendChild(div);
}



document.querySelector('#QuestionBTN')?.addEventListener('click', async => {
    let questionText = prompt("Enter the question text:");
    let ans1 = prompt("Enter answer A:");
    let ans2 = prompt("Enter answer B:");
    let ans3 = prompt("Enter answer C:");
    let ans4 = prompt("Enter answer D:");
    let correct = prompt("Enter the correct answer number (1-4):");
    if (!questionText || !ans1 || !ans2 || !ans3 || !ans4 || !correct) {
        NotificationComponent.error("All fields are required. Please fill in all the fields.");
        return;
    }
    questionsSaved.push({
        quizId: parseInt(quizId!),
        question: questionText,
        correct: parseInt(correct),
        ans1: ans1,
        ans2: ans2,
        ans3: ans3,
        ans4: ans4
    });
    let div = document.createElement('div');
    div.innerHTML = `
        <div class="flex gap-4 bg-slate-50 px-4 py-3 justify-between">
              <div class="flex flex-1 flex-col justify-center">
                <p class="text-[#0e141b] text-base font-medium leading-normal">${questionText}</p>
                <p class="text-[#4e7097] text-sm font-normal leading-normal">A.  ${ans1}    B.   ${ans2}   C.   ${ans3}   D.   ${ans4}   </p>
                <p class="text-[#4e7097] text-sm font-normal leading-normal">Correct number: ${correct}</p>
              </div>
              <div class="shrink-0">
                <button class="text-[#0e141b]  size-7" data-icon="PencilSimple" data-size="24px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="red" viewBox="0 0 256 256">
                    <path d="M216,48H176V40a16,16,0,0,0-16-16H96A16,16,0,0,0,80,40v8H40A8,8,0,0,0,40,64H48V208a24,24,0,0,0,24,24H184a24,24,0,0,0,24-24V64h8a8,8,0,0,0,0-16ZM96,48h64v8H96Zm88,160a8,8,0,0,1-8,8H80a8,8,0,0,1-8-8V64H184ZM104,104a8,8,0,0,1,16,0v72a8,8,0,0,1-16,0Zm32,0a8,8,0,0,1,16,0v72a8,8,0,0,1-16,0Z"></path>
                  </svg>
                </button>
                <button class="text-[#0e141b]  size-7" data-icon="PencilSimple" data-size="24px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"></path>
                  </svg>
                </button>
              </div>
            </div>
    `;
    fulldiv?.appendChild(div);
})