<template>
  <div class="questions" v-if="!getLoading" ref="questionsDiv">
    <div class="survey-intro flex flex-center full-page">
      <div class="column items-center">
        <div class="survey-title">
          <p class="text-h4">{{ survey?.name }}</p>
        </div>
        <div class="survey-desc">
          <p>{{ survey?.description }}</p>
        </div>
        <q-btn label="Inicar" color="primary" size="md" style="width: 120px;" class="self-start q-ma-md"
          @click="startSurvey"></q-btn>
      </div>
    </div>
    <div class="survey-question full-page flex flex-center" v-if="getQuestions.length > 0">

      <div class="survey-progress">
        <q-linear-progress :value="surveyProgress" class="q-mt-md" :animation-speed="900"/>
      </div>
      <!-- Open question -->
      <div class="survey-question-open question column" v-if="currentQuestion!.type.type === openQuestion">
        <div class="survey-question-order">

        </div>
        <div class="survey-question-text column">
          <p class="survey-question-text-input">
            {{ currentQuestion!.text }}
          </p>
          <div class="survey-question-answer q-mt-sm column">
            <input type="text" class="survey-question-answer-input" placeholder="Ingresa aqui tu respuesta"
              v-model="openQuestionText">
            <q-btn square color="primary" class="survey-question-answer-button q-mt-md"
              @click="answerOpenQuestion(currentQuestion!.questionId!)">OK</q-btn>
          </div>
        </div>
      </div>
      <!-- Multiple quesition -->
      <div class="survey-question-multiple question column" v-else>
        <div class="survey-question-text column">
          <p class="survey-question-text-input">
            {{ currentQuestion!.text }}
          </p>
          <div class="survey-question-multiple-options q-mt-sm column">
            <div class="survey-question-multiple-options-option row items-center"
              v-for="option in currentQuestion!.options" :key="option.id"
              @click="answerMultipleQuestion(option.id!, currentQuestion?.questionId!)"
              >
              <p class="survey-question-multiple-options-option-text">{{ option.value }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="survey-question-controller">
        <q-btn-group outline>
          <q-btn outline color="black" icon="keyboard_arrow_up" :disable="currentQuestion!.order < 1"
            @click="previousQuestion" />
          <q-btn outline color="black" icon="keyboard_arrow_down" @click="nextQuestion"  :disable="currentIndexQuestion == survey?.questions.length! - 1"/>
        </q-btn-group>
      </div>
    </div>
  </div>
  <q-inner-loading :showing="getLoading" color="primary" label="Por favor espera..." label-class="text-black"
    label-style="font-size: 1.1em" />

  <q-dialog v-model="seamless" seamless position="top">
    <q-banner inline-actions class="text-white" :class="ok ? 'bg-green' : 'bg-red'">
      {{ message }}
      <template v-slot:action>
        <q-btn flat color="white" label="Cerrar" v-close-popup />
      </template>
    </q-banner>
  </q-dialog>
</template>

<script setup lang="ts">
import { SurveyFacade } from 'src/api/SurveyFacade'
import { AnswerOption } from 'src/entities/AnswerOption'
import { AnswerQuestion } from 'src/entities/AnswerQuestion'
import { Question } from 'src/entities/Question'
import { Survey } from 'src/entities/Survey'
import { SurveyResponse } from 'src/entities/SurveyResponse'
import { openQuestion } from 'src/helpers/questionTypes'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const seamless = ref(false)
const ok = ref(false)
const message = ref('')
const isLoading = ref(true)
const currentIndexQuestion = ref(0)
const currentQuestion = ref<Question | undefined>()
const openQuestionText = ref('')
const answers = ref<AnswerQuestion[]>([])
const route = useRoute()
const router = useRouter()
const surveyApi = new SurveyFacade()
const survey = ref<Survey>()
const beginDate = new Date()

const getSurvey = async () => {
  isLoading.value = true
  const surveyId = route.params.id as string
  const surveyOrError = await surveyApi.getSurveyById(surveyId)
  if (surveyOrError.isLeft()) {
    isLoading.value = false
    router.push({ name: 'not-found' })
    return
  }
  survey.value = surveyOrError.value
  currentQuestion.value = survey.value.questions[0]
  isLoading.value = false
}

const answerOpenQuestion = (questionId: string) => {
  const alreadyExistsAnswer = answers.value.findIndex(q => q.questionId == questionId)
  const answer = new AnswerQuestion(
    undefined,
    undefined,
    questionId
  )
  answer.answer = openQuestionText.value
  if (alreadyExistsAnswer == -1) {
    answers.value.push(answer)
    return
  }

  answers.value[alreadyExistsAnswer] = answer
  openQuestionText.value = ''
  if(currentIndexQuestion.value == survey.value?.questions.length! - 1) {
    sendResponse()
    return
  }
  nextQuestion()
}

const answerMultipleQuestion = (optionId: string, questionId: string) => {
  const alreadyExistsAnswer = answers.value.findIndex(q => q.questionId == questionId)
  const answer = new AnswerQuestion(
    undefined,
    undefined,
    questionId
  )

  const optionAnswer = new AnswerOption(
    undefined,
    undefined,
    optionId
  )

  answer.option = optionAnswer

  // If no answers exists for that question, then add a answer to array
  if (alreadyExistsAnswer == -1) {
    answers.value.push(answer)
  } else {
    // Otherwise change existing answer to chosen one
    answers.value[alreadyExistsAnswer] = answer
  }

  // If last question, then send response
  if(currentIndexQuestion.value == survey.value?.questions.length! - 1) {
    sendResponse()
    return
  }

  nextQuestion()
}

const sendResponse = async () => {
  isLoading.value = true
  
  const pointId = route.query.pointId as string
  const surveyId = route.params.id as string
  const surveyResponse = new SurveyResponse(undefined, surveyId, beginDate, new Date(), answers.value as AnswerQuestion[])

  if(pointId) {
    surveyResponse.pointId = pointId
  }

  const response = await surveyApi.answerSurveyId(surveyResponse)
  if(response.isLeft()) {
    isLoading.value = false
    return
  }
  isLoading.value = false
  router.push({ name: 'survey-client-thanks' })
}

const nextQuestion = () => {
  // If last quesition dont do anything
  if(currentIndexQuestion.value == survey.value?.questions.length! - 1) return
  
  currentIndexQuestion.value++
  currentQuestion.value = survey.value?.questions[currentIndexQuestion.value]  
}

const surveyProgress = computed(() => {
  const totalQuestions = survey.value?.questions.length!;
  const answeredQuestions = currentIndexQuestion.value + 1;
  
  return Math.min(answeredQuestions / totalQuestions, 1);
})

const previousQuestion = () => {
  currentIndexQuestion.value--
  currentQuestion.value = survey.value?.questions[currentIndexQuestion.value]
}

const startSurvey = () => {
  const targetPosition = 1 * window.innerHeight
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
}

const getLoading = computed(() => isLoading.value)
const getQuestions = computed(() => (survey.value?.questions || []));

onMounted(async () => {
  await getSurvey()
})
</script>

<style lang="scss" scoped>
.full-page {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.questions {
  transition: .3s;
  overflow: hidden;
}

.question {
  width: 95%;
  overflow: hidden;

  @media screen and (min-width: $breakpoint-md-min) {
    width: 700px;
  }

}

.survey {


  &-progress {
    position: absolute;
    width: 90%;
    height: 20px;
    top: 10px;

    @media screen and (min-width: $breakpoint-md-min) {
      width: 700px;
      top: 20px;
    }
  }

  &-title {
    width: 95%;

    p {
      overflow-wrap: anywhere;
    }
  }

  &-question {
    position: relative;

    &-controller {
      width: 200px;
      position: absolute;
      bottom: 20px;
      left: 20px;

      @media screen and (min-width: $breakpoint-md-min) {
        width: 300px;
      }
    }

    &-multiple {
      &-options {
        gap: 20px;

        &-option {
          min-width: 220px;
          min-height: 40px;
          border-radius: 3px;
          border: 1px solid #727272;
          border-radius: 3px;
          cursor: pointer;

          &:hover {
            background-color: #cccaca;
            transition: .2s;
          }

          &-order {
            width: 50px;
            height: 50px;
          }

          &-text {
            overflow-wrap: anywhere;
            margin: 0;
            margin-left: 10px;
          }
        }
      }
    }

    &-order {
      position: absolute;
      top: 20px;
      left: 20px;
    }

    &-text {
      &-input {
        word-wrap: break-word;
        outline: none;
        font-size: 26px;
        border: none;
        background: transparent;
      }
    }

    &-answer {
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
        width: 100px;
        height: 45px;
      }
    }
  }

  &-desc {
    width: 95%;

    p {
      overflow-wrap: anywhere;
    }
  }
}
</style>
