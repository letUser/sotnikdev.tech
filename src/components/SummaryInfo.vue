<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from 'petite-vue-i18n'

// use translation
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <div class="summary-wrapper">
    <h2 class="summary-wrapper-title">{{ t('info-title') }}</h2>

    <div class="summary">
      <div class="summary-cards">
        <el-card shadow="hover" class="summary-cards-item">
          <template #header
            ><h3>{{ t('info-cloud-title') }}</h3></template
          >

          <div class="summary-cards-item-content">
            <el-timeline class="card-custom-list">
              <el-timeline-item>{{ t('info-cloud-item-1') }}</el-timeline-item>
              <el-timeline-item>{{ t('info-cloud-item-2') }}</el-timeline-item>
              <el-timeline-item>{{ t('info-cloud-item-3') }}</el-timeline-item>
            </el-timeline>
          </div>

          <template #footer>
            <router-link to="/portfolio#ai">{{ t('info-cards-button') }}</router-link>
          </template>
        </el-card>

        <el-card shadow="hover" class="summary-cards-item">
          <template #header
            ><h3>{{ t('info-fintech-title') }}</h3></template
          >

          <div class="summary-cards-item-content">
            <el-timeline class="card-custom-list">
              <el-timeline-item>{{ t('info-fintech-item-1') }}</el-timeline-item>
              <el-timeline-item>{{ t('info-fintech-item-2') }}</el-timeline-item>
              <el-timeline-item>{{ t('info-fintech-item-3') }}</el-timeline-item>
            </el-timeline>
          </div>

          <template #footer>
            <router-link to="/portfolio#bi">{{ t('info-cards-button') }}</router-link>
          </template>
        </el-card>

        <el-card shadow="hover" class="summary-cards-item">
          <template #header
            ><h3>{{ t('info-GIS-title') }}</h3></template
          >

          <div class="summary-cards-item-content">
            <el-timeline class="card-custom-list">
              <el-timeline-item>{{ t('info-GIS-item-1') }}</el-timeline-item>
              <el-timeline-item>{{ t('info-GIS-item-2') }}</el-timeline-item>
              <el-timeline-item>{{ t('info-GIS-item-3') }}</el-timeline-item>
            </el-timeline>
          </div>

          <template #footer>
            <router-link to="/portfolio#map">{{ t('info-cards-button') }}</router-link>
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

        &:hover {
          transform: translateY(-10px);
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

            &:hover {
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
