<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'petite-vue-i18n'
import axios from 'axios'
import SpeakerIcon from '../../icons/SpeakerIcon.vue'
import { Loading } from '@element-plus/icons-vue'
import { handleSlowNetworkAlert } from '../../../utils/networkAlert'

const BUCKET_URL = 'https://storage.yandexcloud.net/aibucket'

// use translation
const { t } = useI18n({ useScope: 'global' })

const defaultTexts: { [index: string]: string } = {
  'en-US': `Try writing something here and press "${t('synthesizer-bttn')}" button to hear the synthesized speech.`,
  'de-DE': `Versuchen Sie hier etwas zu schreiben und drücken Sie die "${t('synthesizer-bttn')}"-Taste, um die synthetisierte Sprache anzuhören.`,
  'ru-RU': `Попробуйте написать что-нибудь здесь и нажмите кнопку "${t('synthesizer-bttn')}", чтобы услышать синтезированную речь.`,
  'kk-KK': `Мұнда бірдеңе жазып көріңіз және синтезделген сөзді тыңдау үшін "${t('synthesizer-bttn')}" түймесін басыңыз.`,
  'uz-UZ': `Bu yerda biror narsa yozishga harakat qiling va sintezlangan nutqni eshitish uchun "${t('synthesizer-bttn')}" tugmasini bosing.`
}
const text = ref('en-US')

const lang = ref('en-US')
const languages = [
  {
    value: 'en-US',
    label: t('synthesizer-lang-options-en')
  },
  {
    value: 'de-DE',
    label: t('synthesizer-lang-options-de')
  },
  {
    value: 'ru-RU',
    label: t('synthesizer-lang-options-ru')
  },
  {
    value: 'kk-KK',
    label: t('synthesizer-lang-options-kk')
  },
  {
    value: 'uz-UZ',
    label: t('synthesizer-lang-options-uz')
  }
]

// define default text
for (const i of languages) {
  if (i.value.includes(navigator.language ?? 'en')) {
    text.value = defaultTexts[i.value]
    lang.value = i.value
  }
}

// link to synthesized audio file
const audioFile = ref('')

const loading = ref(false)
const playing = ref(false)

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
      <h2 class="synthesizer-title">{{ t('synthesizer-title') }}</h2>

      <div class="synthesizer-controls">
        <el-select
          class="synthesizer-controls-select"
          v-model="lang"
          :placeholder="t('synthesizer-lang-placeholder')"
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
          <span>{{ t('synthesizer-bttn') }}</span>
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

    <audio v-if="!loading" id="tw-audio" @ended="onAudioEnd" autoplay>
      <source :src="audioFile" type="audio/mpeg" />
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

@media screen and (max-width: 770px) {
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
