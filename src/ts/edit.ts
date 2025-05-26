let fulldiv = document.querySelector('#QuestionDiv');

document.querySelector('#QuestionBTN')?.addEventListener('click', async => {
    let div = document.createElement('div');
    div.innerHTML = `
        <div class="flex gap-4 bg-slate-50 px-4 py-3 justify-between">
              <div class="flex flex-1 flex-col justify-center">
                <p class="text-[#0e141b] text-base font-medium leading-normal">New Question</p>
                <p class="text-[#4e7097] text-sm font-normal leading-normal">A.      B.      C.      D.      </p>
                <p class="text-[#4e7097] text-sm font-normal leading-normal">Text</p>
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