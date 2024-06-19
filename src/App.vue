<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark() //true or false
const toggleDark = useToggle(isDark)
const darkMode = ref(isDark.value)
const activeIndex = ref('1')
</script>

<template>
  <html>
    <header>
      <div class="menu-wrapper">
        <el-menu :default-active="activeIndex" mode="horizontal" :ellipsis="false">
          <el-menu-item index="1"><RouterLink to="/">About</RouterLink></el-menu-item>
          <el-menu-item index="2"><RouterLink to="/">Item 2</RouterLink></el-menu-item>
          <el-menu-item index="3"><RouterLink to="/">Item 3</RouterLink></el-menu-item>
          <el-sub-menu index="4">
            <template #title>Item four</template>
            <el-menu-item index="4-1">item one</el-menu-item>
            <el-menu-item index="4-2">item two</el-menu-item>
            <el-menu-item index="4-3">item three</el-menu-item>
          </el-sub-menu>
        </el-menu>

        <div>
          <el-switch v-model="darkMode" @change="toggleDark">
            <template #active-action>
              <span class="custom-active-action">D</span>
            </template>
            <template #inactive-action>
              <span class="custom-inactive-action">L</span>
            </template>
          </el-switch>
        </div>

        <div>Contacts</div>
      </div>

      <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->
    </header>

    <RouterView />
  </html>
</template>

<style scoped lang="scss">
.menu-wrapper {
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: hsla(0, 0%, 100%, 0.1);
}
</style>
