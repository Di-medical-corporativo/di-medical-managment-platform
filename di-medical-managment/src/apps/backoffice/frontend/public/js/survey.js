const form = document.getElementById('question-list');

let totalQuestions = 0;

const reorderQuestions = () => {
  const questions = document.getElementsByClassName('question');
  totalQuestions = questions.length;

  Array.from(questions).forEach((question, index) => {
    const questionId = question.id;
    const idquestionInput = question.querySelector(`input[name^="questions["][name$="[id]"]`)
    const questionIndexInput = question.querySelector(`input[name^="questions["][name$="[order]"]`);
    const questionTextInput = question.querySelector(`input[name^="questions["][name$="[text]"]`);
    const questionTypeInput = question.querySelector(`input[name^="questions["][name$="[type]"]`);
    const addButton = question.querySelector('.add-option');

    idquestionInput.name = `questions[${index}][id]`; 

    questionTypeInput.name = `questions[${index}][type]`
    questionIndexInput.name = `questions[${index}][order]`; 
    questionIndexInput.value = `${index}`;

    questionTextInput.name = `questions[${index}][text]`;
    if(addButton) addButton.dataset.indexQuestion = index;

    const options = question.getElementsByClassName(`${questionId}-option`);
    Array.from(options).forEach((option, optionIndex) => {
      const optionIdInput = option.querySelector(`input[name^="questions["][name$="[id]"]`);
      const optionOrderInput = option.querySelector(`input[name^="questions["][name$="[order]"]`);
      const optionValueInput = option.querySelector(`input[name^="questions["][name$="[value]"]`);

      optionIdInput.name = `questions[${index}][options][${optionIndex}][id]`;
      optionOrderInput.name = `questions[${index}][options][${optionIndex}][order]`;
      optionOrderInput.value = optionIndex;
      optionValueInput.name = `questions[${index}][options][${optionIndex}][value]`;
    });
  });
}

const reorderOptions = (optionId = '', questionId = '', indexQuestion = '') => {
  const options = document.getElementsByClassName(`${questionId}-option`);
  Array.from(options).forEach((option, index) => {
    const optionIdInput = option.querySelector(`input[name^="questions["][name$="[id]"]`);
    const optionOrderInput = option.querySelector(`input[name^="questions["][name$="[order]"]`);
    const optionValueInput = option.querySelector(`input[name^="questions["][name$="[value]"]`);

    optionIdInput.name = `questions[${indexQuestion}][options][${index}][id]`;
    optionOrderInput.name = `questions[${indexQuestion}][options][${index}][order]`;
    optionOrderInput.value = index;
    optionValueInput.name = `questions[${indexQuestion}][options][${index}][value]`;
  });
}

const deleteQuestion = (questionId = '') => {
  const question = document.getElementById(questionId);

  question.remove();

  totalQuestions--;

  reorderQuestions();
}

const deleteOption = (optionId = '', questionId = '', indexQuestion = '') => {
  const option = document.getElementById(optionId);

  option.remove();

  reorderOptions(optionId, questionId, indexQuestion);
}

function generateUUID() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

const createOption = (questionId = '', indexQuestion = 0) => {
  const optionId = generateUUID();

  const list = document.getElementById(`${questionId}-options`);

  const totalOptions = document.getElementsByClassName(`${questionId}-option`);
  
  const template = `
    <div class="question-option ${questionId}-option" id="${optionId}">
        <input type="text" hidden name="questions[${indexQuestion}][options][${totalOptions.length}][id]" value="${optionId}">
        <input type="text" hidden name="questions[${indexQuestion}][options][${totalOptions.length}][order]" value="${totalOptions.length}">
        <input type="text" class="input" name="questions[${indexQuestion}][options][${totalOptions.length}][value]" required placeholder="Ingresa tu opción">
        <div class="x" onclick="deleteOption('${optionId}', '${questionId}', '${indexQuestion}')">x</div>
    </div>
  `

  list.insertAdjacentHTML('beforeend', template);
}

const createQuestionMultiple = () => {
  const questionid = generateUUID();

  const firstOptionId = generateUUID();

  const currentIndex = totalQuestions;

  const template = `
  <div class="question multiple" id="${questionid}">
    <div class="question-content">
      <div class="question-x" onclick="deleteQuestion('${questionid}')">x</div>
          <div class="question-type">
            <input type="text" hidden name="questions[${currentIndex}][id]" value="${questionid}">
            <input type="text" hidden name="questions[${currentIndex}][order]" value="${currentIndex}">
            <input type="text" hidden name="questions[${currentIndex}][type]" value="multiple">
            <small>Varias opciones</small>
          </div>
          <input type="text" name="questions[${currentIndex}][text]" class="input" placeholder="Ingresa tu pregunta" required>
          
          <div class="question-options" id="${questionid}-options">
           <div class="question-option ${questionid}-option">
              <input type="text" hidden name="questions[${currentIndex}][options][0][id]" value="${firstOptionId}">
              <input type="text" hidden name="questions[${currentIndex}][options][0][order]" value="0">
              <input type="text" class="input" name="questions[${currentIndex}][options][0][value]" required placeholder="Ingresa tu opción">
            </div>
          </div>
          <button class="button add-option" type="button" data-question-id="${questionid}" data-index-question="${currentIndex}">Agrega opción</button>
      </div>
    </div>
  `;

  form.insertAdjacentHTML('beforeend', template);
  totalQuestions++;
}

const createQuestionOpen = () => {
  const questionid = generateUUID();

  const template = `
  <div class="question open" id="${questionid}">
     <div class="question-content">
        <div class="question-x" onclick="deleteQuestion('${questionid}')">x</div>
          <div class="question-type">
            <input type="text" hidden name="questions[${totalQuestions}][id]" value="${questionid}">
            <input type="number" hidden name="questions[${totalQuestions}][order]" value="${totalQuestions}">
            <input type="text" hidden name="questions[${totalQuestions}][type]" value="open">
            <small>Respuesta corta</small>
           </div>
       <input type="text" name="questions[${totalQuestions}][text]" class="input" placeholder="Ingresa tu pregunta" required>
    </div>
  </div>
  `;

  form.insertAdjacentHTML('beforeend', template);
  totalQuestions++;
}


document.getElementById('create-option').addEventListener('click', createQuestionMultiple);
document.getElementById('create-open').addEventListener('click', createQuestionOpen);

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('add-option')) {
    const questionId = event.target.dataset.questionId;
    const indexQuestion = event.target.dataset.indexQuestion;
    createOption(questionId, indexQuestion);
  }
});
