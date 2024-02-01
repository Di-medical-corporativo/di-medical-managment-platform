<template>
  <q-page>
    <div class="question-info bg-white q-mt-md row items-center justify-between">
      <div class="row q-ml-xl">
        <input type="text" placeholder="Titulo de la encuesta" class="question-info-title" v-model="surveyTitle">
        <input type="text" placeholder="Descripción de la encuesta" class="question-info-title q-ml-xl" v-model="surveyDesc">
      </div>
      <div class="row q-mr-xl">
        <q-btn color="primary" no-caps @click="createSurvey">Crear encuesta</q-btn>
      </div>
    </div>

    <div class="row justify-evenly question-creator q-mt-xl">
      <div class="question-list bg-white shadow-1">
        <div class="question-add row justify-between items-center">
          <p class="q-ml-sm">Contenido</p>
          <q-btn class="q-mr-sm question-add-button" flat icon="add" size="md" padding="xs">
            <q-menu>
              <q-list dense style="min-width: 100px">
                <q-item clickable v-for="type in questionTypes" :key="type.questionTypeId" @click="addQuestion(type)">
                  <q-item-section>{{ type.type }}</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
        <div 
          class="question-preview row items-center justify-between" 
          v-for="(question, i) in questionList"
          :key="question.questionId" 
          @click="selectQuestion(question.questionId!)"
          :class="question.questionId == currentQuestion?.questionId ? 'question-preview-selected' : ''"
          >
          <div>
            <q-btn class="q-ml-sm" color="secondary" size="sm" :label="questionTypeLabel(question.type.type)" no-caps>
              <q-badge color="primary" floating>
                {{ question.order + 1 }}
              </q-badge>
            </q-btn>
            <small class="q-ml-md">{{ questionTextSnipped(question.text) }}</small>
          </div>

          <q-btn class="q-mr-sm" flat icon="menu" size="sm" padding="xs">
            <q-menu>
              <q-list dense style="min-width: 100px">
                <q-item clickable v-close-popup @click="deleteQuestion(question.questionId!)">
                  <q-item-section>Borrar</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>

        </div>
      </div>

      <div class="question-detail shadow-1 flex flex-center">
        <div v-if="currentQuestion !== null">
          <div class="question-detail-open" v-if="currentQuestion.type.type == openQuestion">
            <p class="question-order text-h5">{{ currentQuestion.order + 1 }}</p>

            <div class="question-text row flex flex-center">
              <textarea ype="text" placeholder="Ingresa la pregunta" class="question-text-input" cols="750"
                v-model="currentQuestion.text"></textarea>

              <div class="question-detail-preview q-mt-sm column">
                <input type="text" disabled class="question-detail-preview-input" placeholder="Ingresa aqui tu respuesta">
                <q-btn square color="secondary" class="question-detail-preview-button q-mt-md">OK</q-btn>
              </div>
            </div>
          </div>
          <div v-else>
            <p class="question-order text-h5">{{ currentQuestion.order + 1 }}</p>
            <div class="question-text row flex flex-center">
              <textarea ype="text" placeholder="Ingresa la pregunta" class="question-text-input"
                v-model="currentQuestion.text" cols="750"></textarea>
            </div>
            <div class="question-text-options">
              <div class="q-mt-md question-text-option row" v-for="option in currentQuestion.options">
                <div class="question-text-option-number flex flex-center bg-primary q-ml-sm">{{ option.order + 1 }}</div>
                <input type="text" placeholder="Opcion" v-model="option.value" class="q-ml-sm">
                <q-btn round size="sm" color="secondary" icon="close" class="question-text-option-delete"
                  v-if="option.order > 0" @click="deleteOption(option.id!, currentQuestion.questionId!)"></q-btn>
              </div>
              <q-btn flat no-caps color="secondary" @click="addOption(currentQuestion.questionId!)"
                class="q-mt-md">Agregar opción</q-btn>
            </div>
          </div>
        </div>
      </div>
    </div>

    <q-dialog v-model="seamless" seamless position="top">
      <q-banner inline-actions class="text-white" :class="ok ? 'bg-green' : 'bg-red'">
        {{ message }}
        <template v-slot:action>
          <q-btn flat color="white" label="Cerrar" v-close-popup />
        </template>
      </q-banner>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { SurveyFacade } from 'src/api/SurveyFacade'
import { Option } from 'src/entities/Option';
import { Question } from 'src/entities/Question'
import { QuestionType } from 'src/entities/QuestionType'
import { Survey } from 'src/entities/Survey';
import { multipleOptionQuestion, openQuestion } from 'src/helpers/questionTypes';
import { UUID } from 'src/helpers/uuid';
import { ref } from 'vue'

const seamless = ref(false)
const ok = ref(false)
const message = ref('')

const surveyTitle = ref('')
const surveyDesc = ref('')
const surveyApi = new SurveyFacade()
const questionTypes = ref<QuestionType[]>()

const currentQuestion = ref<Question | null>(null)
const currentOption = ref<Option | null>(null)

const questionIndex = ref(0)
const optionIndex = ref(0)
const questionList = ref<Question[]>([])

const getQuestionTypes = async () => {
  const types = await surveyApi.getQuestionTypes()
  if (types.isLeft()) {
    ok.value = false
    message.value = types.error
    seamless.value = true
    return
  }

  questionTypes.value = types.value
}

const addQuestion = (type: QuestionType) => {
  const questionToAdd = new Question(
    UUID.generate(),
    "Tu pregunta va aquí",
    questionIndex.value,
    type
  )
  questionToAdd.typeId = type.questionTypeId

  optionIndex.value = 0
  currentQuestion.value = questionToAdd
  questionList.value.push(currentQuestion.value)
  if (type.type == multipleOptionQuestion) {
    addOption(questionToAdd.questionId!)
  }

  questionIndex.value++
}

const addOption = (questionId: string) => {
  const optionToAdd = new Option(UUID.generate(), "Tu opcion va aqui", optionIndex.value)
  currentOption.value = optionToAdd
  const questionToFind = questionList.value.find(q => q.questionId == questionId)
  questionToFind?.options.push(currentOption.value)
  optionIndex.value++
}

const selectQuestion = (questionId: string) => {
  const selectedQuestion = questionList.value.find((q) => q.questionId == questionId)
  if (!selectQuestion) return
  currentQuestion.value = selectedQuestion!
  const maxObject = selectedQuestion?.options.reduce((max, obj) => (obj.order > max.order) ? obj : max, selectedQuestion.options[0]);
  optionIndex.value = maxObject?.order! + 1
}

const deleteQuestion = (questionId: string) => {
  const indexToRemove = questionList.value.findIndex((q) => q.questionId === questionId)
  if (indexToRemove == -1) return

  questionList.value.splice(indexToRemove, 1)
  questionIndex.value--
  currentQuestion.value = null
  let order = 0

  // Modify order of questions
  questionList.value.forEach((q) => {
    q.order = order++
  })
}

const deleteOption = (optionId: string, questionId: string) => {
  const selectedQuestion = questionList.value.find((q) => q.questionId == questionId)
  const selectedOptionIndex = selectedQuestion?.options.findIndex(o => o.id == optionId)

  if (!selectedQuestion) return
  if (selectedOptionIndex == -1) return

  selectedQuestion.options.splice(selectedOptionIndex!, 1)
  optionIndex.value--
  let order = 0

  selectedQuestion.options.forEach(o => {
    o.order = order++
  })
}

const questionTextSnipped = (text: string) => {
  if (text.length > 50) return text.substring(0, 50) + "..."
  else return text
}

const createSurvey = async () => {
  if(surveyTitle.value.length == 0 || surveyDesc.value.length == 0) {
    message.value = 'Debes proporcionar todos los datos para crear una encuesta'
    ok.value = false
    seamless.value = true
    return
  }

  if(questionList.value.length === 0) {
    message.value = 'Debes agregar al menos una pregunta para crear una encuesta'
    ok.value = false
    seamless.value = true
    return
  }
  
  const survey = new Survey(
    undefined,
    surveyTitle.value,
    surveyDesc.value,
    new Date(),
    true
  )

  survey.questions = questionList.value as Question[]

  const surveyOrError = await surveyApi.registerSurvey(survey)

  if(surveyOrError.isLeft()) {
    message.value = 'Ocurrio un error al crear la encuesta, intentalo mas tarde'
    ok.value = false
    seamless.value = true
    return
  }

  message.value = 'Se creo la encuesta correctamente'
  ok.value = true
  seamless.value = true
  currentQuestion.value = null
  questionList.value = []
  currentOption.value = null
  optionIndex.value = 0
  questionIndex.value = 0
}

const questionTypeLabel = (type: string) => {
  if (type === openQuestion) {
    return "Abierta"
  }

  return "Multiple"
}


getQuestionTypes()
</script>


<style lang="scss" scoped>
.question {

  &-order {
    position: absolute;
    top: 20px;
    left: 20px;
  }

  &-info {
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #dbdbdb;

    &-title {
      width: 300px;
      outline: none;
      cursor: pointer;
      border: none;
      font-size: 18px;
      border-bottom: 1px solid #000;
    }
  }

  &-text {
    width: 720px;

    &-input {
      width: 100%;
      word-wrap: break-word;
      outline: none;
      font-size: 20px;
      border: none;
      background: transparent;
    }

    &-options {
      width: 100%;
    }

    &-option {
      max-width: 250px;
      border: 1px solid #727272;
      border-radius: 3px;
      display: flex;
      align-items: center;
      position: relative;

      &-number {
        width: 30px;
        height: 30px;
        border-radius: 3px;
      }

      &-delete {
        position: absolute;
        right: -15px;
      }

      input {
        height: 40px;
        outline: none;
        border: none;
        background: none;
      }
    }
  }

  &-creator {
    width: 100%;
    height: 100%;
  }

  &-list {
    width: 18%;
    height: 80vh;
    overflow-y: scroll;
  }

  &-detail {
    width: 75%;
    height: 80vh;

    position: relative;
    &-preview {
      width: 100%;

      &-input {
        width: 100%;
        height: 50px;
        outline: none;
        cursor: pointer;
        border: none;
        border-bottom: 1px solid #000;
        background: none;
        font-size: 25px;
      }

      &-button {
        width: 70px;
        height: 30px;
      }
    }
  }

  &-add {
    width: 100%;
    height: 60px;
  }

  &-preview {
    width: 100%;
    height: 80px;
    transition: .2s;
    cursor: pointer;

    &:hover {
      background-color: #dbdbdb;
    }

    &-number {
      width: 30px;
    }

    &-selected {
      background-color: #dbdbdb;
    }
  }

  &-add {
    &-button {
      background-color: #dbdbdb;
    }
  }
}
</style>
