<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import SpeakerIcon from '../../icons/SpeakerIcon.vue'
import { Loading } from '@element-plus/icons-vue'
import { handleSlowNetworkAlert } from '../../../utils/networkAlert'

const BUCKET_URL = 'https://storage.yandexcloud.net/aibucket'

const defaultTexts: { [index: string]: string } = {
  'en-US': 'Try writing something here and press "Convert" button to hear the synthesized speech.',
  'de-DE':
    'Versuchen Sie hier etwas zu schreiben und drücken Sie die "Convert"-Taste, um die synthetisierte Sprache anzuhören.',
  'ru-RU':
    'Попробуйте написать что-нибудь здесь и нажмите кнопку "Convert", чтобы услышать синтезированную речь.',
  'kk-KK':
    'Мұнда бірдеңе жазып көріңіз және синтезделген сөзді тыңдау үшін "Convert" түймесін басыңыз.',
  'uz-UZ':
    'Bu yerda biror narsa yozishga harakat qiling va sintezlangan nutqni eshitish uchun "Convert" tugmasini bosing.'
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

// flag of IOS devices
const isIOS = /iPhone|iPod|iPad/.test(navigator.userAgent)

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

    loading.value = false
    playing.value = true
  } catch (err) {
    loading.value = false

    console.error(err)
  } finally {
    clearTimeout(timerId) // clear timer
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
          :disabled="loading || !text.length"
        >
          <span>Convert</span>
        </el-button>
      </div>

      <el-input
        class="synthesizer-input"
        v-model="text"
        :placeholder="defaultTexts[lang]"
        type="textarea"
        :autosize="{ minRows: 1, maxRows: 10 }"
        maxlength="250"
        show-word-limit
      />
    </div>

    <div v-if="!isIOS">
      <audio v-if="!loading" id="tw-audio" @ended="onAudioEnd" autoplay>
        <source :src="audioFile" type="audio/mpeg" />
      </audio>
    </div>
    <div v-else>
      <audio :key="+loading" id="tw-audio" @ended="onAudioEnd" controls>
        <source :src="audioFile" type="audio/mpeg" />
      </audio>
    </div>
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

@media screen and (max-width: 640px) {
  #tw-audio {
    width: 100%;
  }
}
</style>

<style lang="scss">
.synthesizer {
  &-input {
    .el-textarea__inner {
      padding: 5px 11px 1.5rem;
    }
  }
}
</style>
