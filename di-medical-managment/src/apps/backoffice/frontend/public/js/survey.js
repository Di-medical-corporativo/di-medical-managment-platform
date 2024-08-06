const form = document.getElementById('question-list');

const deleteQuestion = (questionId = '') => {
  const question = document.getElementById(questionId);

  question.remove();
}

function generateUUID() {
  // Generate a UUID using the browser's crypto API
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

const createQuestionMultiple = () => {
  const questionid = generateUUID();

  const template = `
  <div class="question multiple" id="${questionid}">
    <div class="question-content">
      <div class="question-x" onclick="deleteQuestion('${questionid}')">x</div>
          <div class="question-type">
            <small>Varias opciones</small>
          </div>
          <input type="text" name="" class="input" placeholder="Ingresa tu pregunta" required>
            
          <div class="question-option">
            <input type="text" class="input" required placeholder="Ingresa tu opción">
          </div>
          <button class="button" type="button">Agrega opción</button>
      </div>
    </div>
  `;

  form.insertAdjacentHTML('beforeend', template);
}

const createQuestionOpen = () => {
  const questionid = generateUUID();

  const template = `
  <div class="question open" id="${questionid}">
     <div class="question-content">
        <div class="question-x" onclick="deleteQuestion('${questionid}')">x</div>
          <div class="question-type">
            <small>Respuesta corta</small>
            <input type="text" required hidden name="type">
           </div>
       <input type="text" name="" class="input" placeholder="Ingresa tu pregunta" required>
    </div>
  </div>
  `;

  form.insertAdjacentHTML('beforeend', template);
}


document.getElementById('create-option').addEventListener('click', createQuestionMultiple);
document.getElementById('create-open').addEventListener('click', createQuestionOpen);
