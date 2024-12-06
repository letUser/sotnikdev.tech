<script setup lang="ts">
import { useI18n } from 'petite-vue-i18n'
import VueLogo from './icons/VueLogo.vue'
import ReactLogo from './icons/ReactLogo.vue'
import TypeScriptLogo from './icons/TypeScriptLogo.vue'
import NodeLogo from './icons/NodeLogo.vue'
import AwsLogo from './icons/AwsLogo.vue'
import DockerLogo from './icons/DockerLogo.vue'

// use translation
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <div class="skills-wrapper">
    <h2 class="skills-wrapper-title">{{ t('skills-title') }}</h2>

    <div class="skills">
      <div class="skills-item">
        <el-icon :size="48">
          <vue-logo />
        </el-icon>
        <div class="skills-item-info">
          <h4 class="skills-item-info-name">Vue</h4>
          <p class="skills-item-info-text">{{ t('skills-vue-text') }}</p>
        </div>
      </div>

      <div class="skills-item">
        <el-icon :size="48">
          <react-logo />
        </el-icon>
        <div class="skills-item-info">
          <h4 class="skills-item-info-name">React</h4>
          <p class="skills-item-info-text">{{ t('skills-react-text') }}</p>
        </div>
      </div>

      <div class="skills-item">
        <el-icon :size="48">
          <type-script-logo />
        </el-icon>
        <div class="skills-item-info">
          <h4 class="skills-item-info-name">TypeScript</h4>
          <p class="skills-item-info-text">{{ t('skills-ts-text') }}</p>
        </div>
      </div>

      <div class="skills-item">
        <el-icon :size="48">
          <node-logo />
        </el-icon>
        <div class="skills-item-info">
          <h4 class="skills-item-info-name">Node.js</h4>
          <p class="skills-item-info-text">{{ t('skills-python-text') }}</p>
        </div>
      </div>

      <div class="skills-item">
        <el-icon :size="48">
          <aws-logo />
        </el-icon>
        <div class="skills-item-info">
          <h4 class="skills-item-info-name">AWS</h4>
          <p class="skills-item-info-text">{{ t('skills-aws-text') }}</p>
        </div>
      </div>

      <div class="skills-item">
        <el-icon :size="48">
          <docker-logo />
        </el-icon>
        <div class="skills-item-info">
          <h4 class="skills-item-info-name">Docker</h4>
          <p class="skills-item-info-text">{{ t('skills-docker-text') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.skills-wrapper {
  width: 100%;
  position: relative;

  &-title {
    margin-bottom: 2rem;
  }

  .skills {
    display: grid;
    justify-content: center;
    justify-items: start;
    grid-template-columns: repeat(auto-fit, minmax(120px, 420px));
    gap: 0.25rem;

    &-item {
      display: flex;
      align-items: center;
      margin: 0 20px var(--page-padding-small);

      &-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: start;
        margin: 0 0 0 16px;
        height: 80px;

        &-name {
          font-weight: 700;
        }
      }
    }
  }
}
</style>
