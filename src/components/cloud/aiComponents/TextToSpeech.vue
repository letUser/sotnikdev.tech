<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import SpeakerIcon from '../../icons/SpeakerIcon.vue'
import { Loading } from '@element-plus/icons-vue'
import { handleSlowNetworkAlert } from '../../../utils/networkAlert'

const BUCKET_URL = 'https://storage.yandexcloud.net/aibucket'

const defaultTexts: { [index: string]: string } = {
  'en-US':
    'Hello! Try writing something here and press "Speaker" button to hear the synthesized speech.',
  'de-DE':
    'Hallo! Versuchen Sie hier etwas zu schreiben und drücken Sie die "Speaker"-Taste, um die synthetisierte Sprache anzuhören.',
  'ru-RU':
    'Привет! Попробуйте написать что-нибудь здесь и нажмите кнопку «Воспроизвести», чтобы услышать синтезированную речь.',
  'kk-KK':
    'Сәлем! Мұнда бірдеңе жазып көріңіз және синтезделген сөзді тыңдау үшін «Ойнату» түймесін басыңыз.',
  'uz-UZ':
    'Salom! Bu yerda biror narsa yozishga harakat qiling va sintezlangan nutqni eshitish uchun "Play" tugmasini bosing.'
}
const text = ref(defaultTexts['en-US'])

const lang = ref('en-US')
const languages = [
  {
    value: 'en-US',
    label: 'English'
  },
  {
    value: 'de-DE',
    label: 'German'
  },
  {
    value: 'ru-RU',
    label: 'Russian'
  },
  {
    value: 'kk-KK',
    label: 'Kazakh'
  },
  {
    value: 'uz-UZ',
    label: 'Uzbek'
  }
]

// link to synthesized audio file
const audioFile = ref('')

const loading = ref(false)
const playing = ref(false)

const isMobile = ref(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))

/**
 * Synthesize text
 */
const synthesizeText = async () => {
  // set timerId
  const timerId = handleSlowNetworkAlert()

  try {
    loading.value = true
    playing.value = false

    // handle empty value
    if (text.value.length < 1) throw new Error('Empty text value.')

    // make API request
    const response: { data: { bucketKey: string } } = await axios({
      method: 'post',
      url: '/ai/synthesize',
      data: JSON.stringify({
        text: text.value,
        lang: lang.value
      })
    })

    // update src attribute for audio tag
    audioFile.value = `${BUCKET_URL}/${response.data.bucketKey}.mp3`

    playing.value = true
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false

    // clear timer
    clearTimeout(timerId)
  }
}

/**
 * Audio playing end event handler
 */
const onAudioEnd = () => {
  playing.value = false
  audioFile.value = ''
}
</script>

<template>
  <div class="synthesizer-wrapper">
    <div class="synthesizer">
      <h2 class="synthesizer-title">Text to Speech</h2>

      <div class="synthesizer-controls">
        <el-select
          class="synthesizer-controls-select"
          v-model="lang"
          placeholder="Select language"
          @change="(lang: string) => (text = defaultTexts[lang])"
        >
          <el-option
            v-for="item in languages"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <div class="synthesizer-controls-icon-wrapper">
          <el-icon
            v-if="!loading"
            :class="{
              'synthesizer-controls-icon': true,
              'is-ready': audioFile.length,
              'is-playing': playing
            }"
            :size="24"
          >
            <speaker-icon />
          </el-icon>
          <el-icon v-else class="is-loading" color="var(--el-color-primary)" :size="24">
            <Loading />
          </el-icon>
        </div>

        <el-button
          class="synthesizer-controls-button"
          type="primary"
          @click="synthesizeText"
          :disabled="loading"
        >
          <span>Convert</span>
        </el-button>
      </div>

      <el-input
        class="synthesizer-input"
        v-model="text"
        :rows="2"
        type="textarea"
        maxlength="250"
        show-word-limit
      />
    </div>

    <audio
      v-if="!loading"
      id="tw-audio"
      @ended="onAudioEnd"
      :controls="isMobile"
      :autoplay="!isMobile"
    >
      <source :key="audioFile" :src="audioFile" type="audio/mpeg" />
    </audio>
  </div>
</template>

<style scoped lang="scss">
.synthesizer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &-title {
    margin-bottom: 24px;
  }

  &-controls {
    display: flex;
    align-items: center;
    width: 100%;

    &-select {
      max-width: 140px;
    }

    &-icon {
      background: -moz-linear-gradient(
        90deg,
        var(--el-color-primary) 45%,
        var(--el-text-color-primary) 50%
      );
      background: -webkit-linear-gradient(
        90deg,
        var(--el-color-primary) 45%,
        var(--el-text-color-primary) 50%
      );
      background: linear-gradient(
        90deg,
        var(--el-color-primary) 45%,
        var(--el-text-color-primary) 50%
      );
      background-size: 200% 100%;
      background-position-x: 90%;
      clip-path: url(#speaker-icon-clip);

      &-wrapper {
        margin-left: 24px;
        height: 24px;
      }

      &.is-ready {
        background-position-x: 45%;
      }

      &.is-playing {
        background-position-x: 45%;
        animation: speaker-playing 1s ease-in infinite;
      }
    }

    &-button {
      margin-left: 24px;
    }
  }

  &-input {
    margin: 24px 0;
  }
}

@keyframes speaker-playing {
  0% {
    background-position-x: 45%;
  }
  25% {
    background-position-x: 45%;
  }
  40% {
    background-position-x: 0%;
  }
  100% {
    background-position-x: 45%;
  }
}
</style>
