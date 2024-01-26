<template>
  <div class="questions">
    <div class="survey-intro flex flex-center full-page">
     <div class="column items-center">
      <div class="survey-title">
        <p class="text-h4">Encuesta de satisfaccion empleados</p>
      </div>
      <div class="survey-desc">
        <p>Nos interesa saber tu opinion</p>
      </div>
      <q-btn 
        label="Inicar" 
        color="primary" 
        size="md" 
        style="width: 120px;" 
        class="self-start q-ma-md"
        @click="nextQuestion"
        ></q-btn>
     </div>
    </div>
    <div class="survey-question full-page flex flex-center">
      <div class="survey-question-open question column">
        <p class="survey-question-order text-h5">1</p>
        <div class="survey-question-text column">
          <p ype="text" placeholder="Ingresa la pregunta" class="survey-question-text-input" cols="750">
            Super large question to answer for the client asfsafasdfsadfsadfas
          </p>
          <div class="survey-question-answer q-mt-sm column">
            <input type="text" class="survey-question-answer-input" placeholder="Ingresa aqui tu respuesta">
            <q-btn square color="primary" class="survey-question-answer-button q-mt-md" @click="nextQuestion">OK</q-btn>
          </div>
        </div>
      </div>
    </div>
    <div class="survey-question full-page flex flex-center">
      <div class="survey-question-multiple question column">
        <p class="survey-question-order text-h5">1</p>
        <div class="survey-question-text column">
          <p ype="text" placeholder="Ingresa la pregunta" class="survey-question-text-input" cols="750">
            Super large question to answer for the client asfsafasdfsadfsadfas
          </p>
          <div class="survey-question-multiple-options q-mt-sm column">
            <div class="survey-question-multiple-options-option row items-center" v-for="i in 10" :key="i">
              <p class="survey-question-multiple-options-option-text">asfasfassdaffdsaaa</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const nextQuestion = () => {
  const targetPosition = 2 * window.innerHeight 
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  })
}

</script>

<style lang="scss" scoped>
.full-page {
  width: 100vw;
  height: 100vh;
}

.questions {
  overflow-x: hidden;
}

.question {
  width: 95%;

  @media screen and (min-width: $breakpoint-md-min) {
    width: 700px;
  }
  
}
.survey {
  &-title {
    width: 95%;

    p {
      overflow-wrap: anywhere;
    }
  }

  &-question {
    position: relative;


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
