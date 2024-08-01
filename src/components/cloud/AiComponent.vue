<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import SpeakerIcon from '../icons/SpeakerIcon.vue'
import { Loading } from '@element-plus/icons-vue'

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

/**
 * Synthesize text
 */
const synthesizeText = async () => {
  try {
    loading.value = true

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
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="synthesizer-wrapper">
    <div class="synthesizer">
      <h2 class="synthesizer-title">Text to Speech</h2>

      <el-select
        class="synthesizer-select"
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

      <el-input
        class="synthesizer-input"
        v-model="text"
        :rows="2"
        type="textarea"
        maxlength="250"
        show-word-limit
      />

      <div>
        <el-icon
          v-if="!loading"
          class="synthesizer-icon"
          @click="synthesizeText"
          :size="24"
          title="Listen"
        >
          <speaker-icon />
        </el-icon>
        <el-icon
          v-else
          class="is-loading"
          @click="synthesizeText"
          color="var(--el-color-primary)"
          :size="24"
        >
          <Loading />
        </el-icon>
      </div>
    </div>

    <audio v-if="!loading" id="tw-audio" autoplay>
      <source :key="audioFile" :src="audioFile" type="audio/mpeg" />
    </audio>
  </div>
</template>

<style scoped lang="scss">
.synthesizer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &-wrapper {
    padding: 24px;
  }

  &-title {
    margin-bottom: 24px;
  }

  &-select {
    max-width: 140px;
  }

  &-input {
    margin: 24px 0;
  }

  &-icon {
    cursor: pointer;

    &:hover {
      color: var(--el-color-primary);
    }
  }
}
</style>
