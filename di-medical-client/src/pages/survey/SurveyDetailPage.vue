<template>
  <q-page class="column items-center summary">
    <div class="survey-details bg-grey-2 row justify-around items-center">
      <div class="survey-name">
        <p>{{survey?.name}}</p>
        <small>{{survey?.description}}</small>
      </div>

      <div class="survey-responses column items-center align-center">
        <p class="text-body1 q-mt-sm">{{survey?.totalAnswers}} respuestas</p>
        <p class="text-body2">{{getStatus}}</p>
      </div>

      <div class="survey-actions">
        <q-btn label="Terminar encuesta" color="secondary" size="md" no-caps></q-btn>
        <q-btn label="Enlace de encuesta" size="md" no-caps color="secondary" class="q-ml-md" flat @click="pasteUrlToClip"></q-btn>
      </div>
    </div>
    <div class="survey-summary row items-center q-mt-xl">
      <div v-for="question in getQuestions" :key="question.questionId" class="row survey-summary-question">
        <div class="survey-summary-question multiple bg-white row items-center shadow-1" v-if="question.type.type === multipleOptionQuestion">
          <div class="text q-mt-md">
            <p class="order text-body2">{{question.order}}</p>
            <div class="column question">
              <p class="text-body2 text-bold">{{question.text}}</p>
              <small class="text-grey">{{question.totalAnswers}} respuestas</small>
            </div>
          </div>
          <div class="options column items-center q-mt-md q-mb-md">
            <div class="option" v-for="option in question.options" :key="option.id">
              <p class="no-margin">{{option.value}} <small class="text-grey">{{option.totalAnswers}}</small></p>
              <q-linear-progress size="20px" :value="getPercentage(question.totalAnswers, option.totalAnswers).number" color="primary">
                <div class="absolute-full flex flex-center">
                  <q-badge color="white" text-color="accent" :label="getPercentage(question.totalAnswers, option.totalAnswers).string" />
                </div>
              </q-linear-progress>
            </div>
          </div>
        </div>
        <div class="survey-summary-question open bg-white row items-center shadow-1" v-else>
          <div class="text q-mt-md">
            <p class="order text-body2">{{question.order}}</p>
            <div class="column question">
              <p class="text-body2 text-bold">{{question.text}}</p>
              <small class="text-grey">{{question.totalAnswers}} respuestas</small>
            </div>
          </div>
          <div class="answers column items-center q-mt-md q-mb-md">
            <div class="answer" v-for="answer in question.answers" :key="answer.answerId">
              <p class="q-ml-sm q-mt-sm text-body2">{{ answer.answer }}</p>
              <small class="q-ml-sm text-grey">12/08/24 24:32:31</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <q-inner-loading :showing="isLoading" 
    color="primary"
    label="Por favor espera..."
    label-class="text-black"
    label-style="font-size: 1.1em" />

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
import { SurveyFacade } from 'src/api/SurveyFacade';
import { useClipboard } from 'src/composables/useClipboard';
import { Survey } from 'src/entities/Survey';
import { multipleOptionQuestion } from 'src/helpers/questionTypes';
import { computed, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';


const seamless = ref(false)
const ok = ref(false)
const message = ref('')

const clipboard = useClipboard()
const surveyApi = new SurveyFacade()
const route = useRoute()
const router = useRouter()
const loading = ref(true)

const survey = ref<Survey | null>(null)

const getSurvey = async () => {
  loading.value = true
  const surveyId = route.params.id as string
  const surveyOrError = await surveyApi.getSurveyinsights(surveyId)
  if(surveyOrError.isLeft()) {
    ok.value = false
    message.value = surveyOrError.error
    seamless.value = true
    loading.value = false
    router.push({ name: 'not-found' })
    return
  }
  loading.value = false
  survey.value = surveyOrError.value
}

const getPercentage = (totalAnswer: number, optionAnswers: number) => {
  if(totalAnswer === 0) return { string: '0%', number: 0 }
  return {
    string: (optionAnswers / totalAnswer).toFixed(2) + '%',
    number: Number((optionAnswers / totalAnswer).toFixed(2))
  }
}

const pasteUrlToClip = async () => {
  const url = `localhost:3050/#/survey/${survey.value?.surveyId}/answer`
  await clipboard.paste(url)
  ok.value = true
  message.value = 'Se ha copiado al portapapeles'
  seamless.value = true
}


const isLoading = computed(() => loading.value)
const getQuestions = computed(() => survey.value?.questions || [])
const getStatus = computed(() => survey.value?.active ? 'En curso' : 'Encuesta terminada')

getSurvey()
</script>

<style lang="scss" scoped>

  .summary {
    height: 100%;
  }
  .survey {
    &-details { 
      width: 100%;
      height: 80px;
    }

    &-summary {
      width: 100%;
      height: 100px;
      gap: 35px;
      margin-bottom: 100px;
      @media screen and (min-width: $breakpoint-md-min) {
        width: 750px;
        top: 20px;
      }

      &-question {
        width: 100%;
      }
    }
  }

  .text {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
  }

  .question {
    width: 90%;
  }

  .options {
    width: 100%;
    gap: 20px;
    .option {
      width: 95%;
    }
  }

  .open {
    max-height: 400px;
    overflow-y: scroll;

  }

  .answers {
    width: 100%;
    gap: 20px;
  }

  .answer {
    width: 90%;
    word-wrap: break-word;
    border-bottom: 1px solid #8f8f8f;
  }
</style>
