<script setup lang="ts">
import VueLogo from './icons/VueLogo.vue'
import ReactLogo from './icons/ReactLogo.vue'
import TypeScriptLogo from './icons/TypeScriptLogo.vue'
import PythonLogo from './icons/PythonLogo.vue'
import RedisLogo from './icons/RedisLogo.vue'
import PostrgesLogo from './icons/PostgresLogo.vue'
import AwsLogo from './icons/AwsLogo.vue'
import DockerLogo from './icons/DockerLogo.vue'
</script>

<template>
  <div class="skills-wrapper">
    <h2 class="skills-wrapper-title">Skills</h2>

    <div class="skills">
      <div class="skills-item">
        <el-icon :size="48">
          <vue-logo />
        </el-icon>
        <div class="skills-item-info">
          <h4 class="skills-item-info-name">Vue</h4>
          <p class="skills-item-info-text">Expert in Vue, both Composition & Options API</p>
        </div>
      </div>

      <div class="skills-item">
        <el-icon :size="48">
          <react-logo />
        </el-icon>
        <div class="skills-item-info">
          <h4 class="skills-item-info-name">React</h4>
          <p class="skills-item-info-text">Proficiency in React building web applications</p>
        </div>
      </div>

      <div class="skills-item">
        <el-icon :size="48">
          <type-script-logo />
        </el-icon>
        <div class="skills-item-info">
          <h4 class="skills-item-info-name">TypeScript</h4>
          <p class="skills-item-info-text">Senior-level experience in TypeScript</p>
        </div>
      </div>

      <div class="skills-item">
        <el-icon :size="48">
          <python-logo />
        </el-icon>
        <div class="skills-item-info">
          <h4 class="skills-item-info-name">Python</h4>
          <p class="skills-item-info-text">Experience building FinTech with Python</p>
        </div>
      </div>

      <div class="skills-item">
        <el-icon :size="48">
          <redis-logo />
        </el-icon>
        <div class="skills-item-info">
          <h4 class="skills-item-info-name">Redis</h4>
          <p class="skills-item-info-text">Proficiency in Redis for blockchain</p>
        </div>
      </div>

      <div class="skills-item">
        <el-icon :size="48">
          <postrges-logo />
        </el-icon>
        <div class="skills-item-info">
          <h4 class="skills-item-info-name">PostgreSQL</h4>
          <p class="skills-item-info-text">Expertise in PostgreSQL including PostGIS</p>
        </div>
      </div>

      <div class="skills-item">
        <el-icon :size="48">
          <aws-logo />
        </el-icon>
        <div class="skills-item-info">
          <h4 class="skills-item-info-name">AWS</h4>
          <p class="skills-item-info-text">DevOps, Compute, and AI services proficiency</p>
        </div>
      </div>

      <div class="skills-item">
        <el-icon :size="48">
          <docker-logo />
        </el-icon>
        <div class="skills-item-info">
          <h4 class="skills-item-info-name">Docker</h4>
          <p class="skills-item-info-text">Experience with Docker, Packer, and Terraform</p>
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
      margin: 0 20px 10px;

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

        &-text {
        }
      }
    }
  }
}
</style>
