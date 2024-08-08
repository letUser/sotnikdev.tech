<script setup lang="ts">
import { reactive } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useI18n } from 'petite-vue-i18n'
import { handleSlowNetworkAlert } from '../utils/networkAlert'
import { Loading } from '@element-plus/icons-vue'

// use translation
const { t } = useI18n({ useScope: 'global' })

const router = useRouter()

// loading statements
const loading = reactive<{ [index: string]: boolean }>({
  '/portfolio#ai': false,
  '/portfolio#bi': false,
  '/portfolio#map': false
})

// timerId of handleSlowNetworkAlert
let timerId = 0

/**
 * Function to set all data to default state
 */
const toDefault = () => {
  if (timerId) clearTimeout(timerId) // clear timer

  for (const key of Object.keys(loading)) {
    loading[key] = false
  }
}

/**
 * Mobile touch event handler
 */
const onClickHandler = async (to: string) => {
  toDefault()

  timerId = handleSlowNetworkAlert() // set timerId
  loading[to] = true

  try {
    await router.push(to)
  } finally {
    toDefault()
  }
}
</script>

<template>
  <div class="summary-wrapper">
    <h2 class="summary-wrapper-title">{{ t('info-title') }}</h2>

    <div class="summary">
      <div class="summary-cards">
        <el-card shadow="hover" class="summary-cards-item" @click="onClickHandler('/portfolio#ai')">
          <template #header>
            <div v-if="loading['/portfolio#ai']" class="summary-cards-item-header">
              <el-icon class="is-loading" :size="24" color="var(--el-color-primary)"
                ><Loading
              /></el-icon>
              <h3>{{ t('info-cloud-title') }}</h3>
            </div>
            <h3 v-else>{{ t('info-cloud-title') }}</h3>
          </template>

          <div class="summary-cards-item-content">
            <el-timeline class="card-custom-list">
              <el-timeline-item>{{ t('info-cloud-item-1') }}</el-timeline-item>
              <el-timeline-item>{{ t('info-cloud-item-2') }}</el-timeline-item>
              <el-timeline-item>{{ t('info-cloud-item-3') }}</el-timeline-item>
            </el-timeline>
          </div>

          <template #footer>
            <router-link :class="{ loading: loading['/portfolio#ai'] }" to="/portfolio#ai">{{
              t('info-cards-button')
            }}</router-link>
          </template>
        </el-card>

        <el-card shadow="hover" class="summary-cards-item" @click="onClickHandler('/portfolio#bi')">
          <template #header>
            <div v-if="loading['/portfolio#bi']" class="summary-cards-item-header">
              <el-icon class="is-loading" :size="24" color="var(--el-color-primary)"
                ><Loading
              /></el-icon>
              <h3>{{ t('info-fintech-title') }}</h3>
            </div>
            <h3 v-else>{{ t('info-fintech-title') }}</h3>
          </template>

          <div class="summary-cards-item-content">
            <el-timeline class="card-custom-list">
              <el-timeline-item>{{ t('info-fintech-item-1') }}</el-timeline-item>
              <el-timeline-item>{{ t('info-fintech-item-2') }}</el-timeline-item>
              <el-timeline-item>{{ t('info-fintech-item-3') }}</el-timeline-item>
            </el-timeline>
          </div>

          <template #footer>
            <router-link :class="{ loading: loading['/portfolio#bi'] }" to="/portfolio#bi">{{
              t('info-cards-button')
            }}</router-link>
          </template>
        </el-card>

        <el-card
          shadow="hover"
          class="summary-cards-item"
          @click="onClickHandler('/portfolio#map')"
        >
          <template #header>
            <div v-if="loading['/portfolio#map']" class="summary-cards-item-header">
              <el-icon class="is-loading" :size="24" color="var(--el-color-primary)"
                ><Loading
              /></el-icon>
              <h3>{{ t('info-GIS-title') }}</h3>
            </div>
            <h3 v-else>{{ t('info-GIS-title') }}</h3>
          </template>

          <div class="summary-cards-item-content">
            <el-timeline class="card-custom-list">
              <el-timeline-item>{{ t('info-GIS-item-1') }}</el-timeline-item>
              <el-timeline-item>{{ t('info-GIS-item-2') }}</el-timeline-item>
              <el-timeline-item>{{ t('info-GIS-item-3') }}</el-timeline-item>
            </el-timeline>
          </div>

          <template #footer>
            <router-link :class="{ loading: loading['/portfolio#map'] }" to="/portfolio#map">{{
              t('info-cards-button')
            }}</router-link>
          </template>
        </el-card>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.summary-wrapper {
  &-title {
    margin-bottom: 2rem;
  }

  .summary {
    width: 100%;

    &-cards {
      display: grid;
      justify-content: center;
      grid-template-columns: repeat(auto-fit, minmax(360px, 480px));
      gap: 24px 48px;

      &-item {
        max-width: 480px;
        transition: transform 0.5s;
        cursor: pointer;

        &:hover {
          transform: translateY(-10px);
        }

        &-header {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          height: 20px;

          > h3 {
            padding: 0 32px 0 8px;
          }
        }

        &-content {
          text-align: justify;
          display: flex;
          flex-direction: column;

          .card-custom-list {
            max-width: 480px;
            padding: 0;

            .el-timeline-item {
              padding-bottom: 4px;
            }
          }
        }

        .el-card__footer {
          a {
            display: block;
            width: 100%;
            height: 100%;
            color: var(--el-color-text-primary);
            text-decoration: none;
            line-height: 48px;
            transition: background-color 0.5s;

            &.loading {
              color: var(--el-color-white);
              background-color: var(--el-color-primary-light-3);
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 770px) {
  .summary-cards-item {
    &:hover {
      transform: none !important;
    }
  }
}
</style>

<style lang="scss">
.summary-cards-item {
  .el-card__footer {
    padding: 0;
  }

  .el-timeline {
    text-align: left;
  }

  &:hover {
    .el-timeline {
      &-item {
        &__tail {
          border-color: var(--el-color-primary-light-7);
          transition: border-color 0.5s;
        }

        &__node {
          background-color: var(--el-color-primary-light-3);
          transition: background-color 0.5s;
        }
      }
    }

    .el-card__footer {
      color: var(--el-color-white);
      background-color: var(--el-color-primary-light-3);
    }
  }
}

@media screen and (max-width: 430px) {
  .summary-cards-item {
    .el-card__body {
      padding: 20px 8px;
    }
  }
}

@media screen and (max-width: 388px) {
  .summary-cards-item {
    .el-timeline {
      font-size: 0.85rem;
    }
  }
}
</style>
