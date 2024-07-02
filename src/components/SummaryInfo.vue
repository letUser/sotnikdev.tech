<script setup lang="ts"></script>

<template>
  <div class="summary-wrapper">
    <h2 class="summary-wrapper-title">Summary</h2>

    <div class="summary">
      <p class="summary-text">
        LinkedIn Top Voice Senior Software Developer with 5 years experience in developing SaaS
        FinTech software applications and GIS systems, conducting testing & debugging, and
        spearheading code reviews. Well-versed in implementing cloud microservices, and security
        features, optimizing application performance, and maintaining technical documentation
      </p>
    </div>

    <div class="summary-cards">
      <el-card shadow="hover" class="summary-cards-item">
        <template #header>Cloud Native SaaS & PaaS</template>
      </el-card>
      <el-card shadow="hover" class="summary-cards-item">
        <template #header>FinTech & Blockchain</template>
      </el-card>
      <el-card shadow="hover" class="summary-cards-item">
        <template #header>GIS & spatial systems</template>
      </el-card>
    </div>
  </div>
</template>

<style scoped lang="scss">
.summary-wrapper {
  &-title {
    margin-bottom: 2rem;
  }

  .summary {
    &-text {
      text-align: justify;
      margin-bottom: 2rem;
    }

    &-cards {
      display: grid;
      justify-content: center;
      grid-template-columns: repeat(auto-fit, 480px);
      gap: 24px 48px;

      &-item {
        width: 480px;

        &:hover {
          transform: translateY(-10px);
        }
      }
    }
  }
}
</style>
