<template>
  <q-page>

    <div class="question-info bg-white q-mt-md">
      <div class="row">

      </div>
    </div>

    <div class="row justify-evenly question-creator q-mt-xl">
      <div class="question-list bg-white shadow-1">
        <div class="question-add row justify-between items-center">
          <p class="q-ml-sm">Contendio</p>
          <q-btn class="q-mr-sm question-add-button" flat icon="add" size="md" padding="xs">
            <q-menu>
              <q-list dense style="min-width: 100px">
                <q-item clickable 
                  v-for="type in questionTypes" 
                  :key="type.questionTypeId"
                  @click="addQuestion(type)"
                >
                  <q-item-section>{{type.type}}</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
        <div class="question-preview row items-center justify-between" v-for="(question, i) in questionList" :key="question.questionId">

          <div>
            <q-btn 
              class="q-ml-sm"
              color="secondary"
              size="sm"
              :label="questionTypeLabel(question.type.type)"
              no-caps
            >
              <q-badge color="primary" floating>
                {{ i }}
              </q-badge>
            </q-btn>
            <small class="q-ml-md">Question asfasdfasfasfa...f?</small>
          </div>
          
          <q-btn class="q-mr-sm" flat icon="menu" size="sm" padding="xs">
            <q-menu>
              <q-list dense style="min-width: 100px">
                <q-item clickable v-close-popup>
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
            <div class="question-text row flex flex-center">
              <textarea 
                ype="text" 
                placeholder="Ingresa la pregunta" 
                class="question-text-input" 
                cols="750"></textarea>
            </div>
            <q-btn no-caps unelevated color="secondary">Agregar pregunta</q-btn>
          </div>
          <div v-else>
            <div class="question-text row flex flex-center">
              <textarea 
                ype="text" 
                placeholder="Ingresa la pregunta" 
                class="question-text-input" 
                cols="750"></textarea>
            </div>
            <div>
              <q-btn flat>Agregar opcion</q-btn>
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
import { Question } from 'src/entities/Question'
import { QuestionType } from 'src/entities/QuestionType'
import { openQuestion } from 'src/helpers/questionTypes';
import { UUID } from 'src/helpers/uuid';
import { ref } from 'vue'

const seamless = ref(false)
const ok = ref(false)
const message = ref('')

const surveyApi = new SurveyFacade()
const questionTypes = ref<QuestionType[]>()

const questionList = ref<Question[]>([])

const currentQuestion = ref<Question | null>(null)

const getQuestionTypes = async () => {
  const types = await surveyApi.getQuestionTypes()
  if(types.isLeft()) {
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
    "Agrega un texto",
    1,
    type
  )
  
  questionList.value.push(questionToAdd)
  currentQuestion.value = questionToAdd 
}

getQuestionTypes()


const questionTypeLabel = (type: string) => {
  if(type === openQuestion){
    return "Abierta"
  }

  return "Multiple"
}

</script>


<style lang="scss" scoped>
  .question {

    &-info {
      width: 100%;
      height: 50px;
      border-bottom: 1px solid #dbdbdb;
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
      background: rgb(189,189,189);
      background: linear-gradient(270deg, rgba(189,189,189,1) 0%, rgba(255,255,255,1) 100%);
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
    }

    &-add {
      &-button {
        background-color: #dbdbdb;
      }
    }
  }
</style>
