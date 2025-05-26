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
                <button class="text-[#0e141b] flex size-7 items-center justify-center" data-icon="PencilSimple" data-size="24px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"></path>
                  </svg>
                </button>
              </div>
            </div>
    `;
    fulldiv?.appendChild(div);
})