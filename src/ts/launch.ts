import API from "./api";

let userId = document.cookie.split('; ').find(row => row.startsWith('userId='))?.split('=')[1];
let quizSelect = document.querySelector('#quiz-select') as HTMLSelectElement;
let data = await API.get(`quizzes/${userId}`) as { id: number, ownerId: number , title: string }[];
data.forEach(element => {
    let option = document.createElement('option');
    option.value = element.id.toString();
    option.textContent = element.title;
    if (element.id.toString() === new URLSearchParams(window.location.search).get('quizId')) {
        option.selected = true;
    }
    quizSelect.appendChild(option);
});


document.querySelector('#launch-btn')?.addEventListener('click', async () => {
    let quizId = quizSelect.value;
    let timeLimit = (document.querySelector('#time-limit') as HTMLInputElement).value || '30'; // Default to 30 seconds if not provided
    if (!quizId) {
        alert("Please select a quiz to launch.");
        return;
    }
    try {
        window.location.href = `host.html?quizId=${quizId}&timeLimit=${timeLimit}`;
    } catch (error) {
        console.error("Error launching quiz:", error);
        alert("Failed to launch quiz. Please try again.");
    }
});
