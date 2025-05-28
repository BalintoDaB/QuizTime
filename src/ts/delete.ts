import API from "./api";

let quizId = new URLSearchParams(window.location.search).get('quizId');
if (!quizId) {
    alert("Quiz ID is required");
    window.location.href = "manager.html";
}
let res = await API.delete(`quizzes/${quizId}`);
console.log(res);
window.location.href = "manager.html";