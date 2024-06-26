<script setup lang="ts">
import { ref } from 'vue'
import type { DropdownInstance } from 'element-plus'
import { ArrowDown, ArrowUp, PhoneFilled, Promotion, Message } from '@element-plus/icons-vue'

// curr state for contacts dropdown
const contactsExpanded = ref(false)
const dropdown = ref<DropdownInstance>()

/**
 * Contacts dropdown hover handler
 * @param {boolean} state - flag "is hover"
 * @return {void} void
 */
function handleContactsHover(state: boolean): void {
  contactsExpanded.value = state

  if (state) dropdown.value?.handleOpen()
  else dropdown.value?.handleClose()
}
</script>

<template>
  <div
    class="contacts"
    @mouseenter="handleContactsHover(true)"
    @mouseleave="handleContactsHover(false)"
  >
    <span> Contacts </span>

    <el-dropdown
      ref="dropdown"
      trigger="contextmenu"
      :teleported="false"
      popper-class="contacts-list"
    >
      <span class="contacts-arrow"
        ><el-icon v-if="!contactsExpanded">
          <arrow-down />
        </el-icon>
        <el-icon v-else> <arrow-up /> </el-icon
      ></span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item title="Call me"
            ><el-icon><phone-filled /></el-icon>
            <a href="tel:+16042451101" class="dropdown-link"> +1 604-245-1101 </a></el-dropdown-item
          >
          <el-dropdown-item title="DM me"
            ><el-icon><promotion /></el-icon>
            <a target="_blank" href="https://t.me/letUser" class="dropdown-link">
              @letUser
            </a></el-dropdown-item
          >
          <el-dropdown-item title="Email me"
            ><el-icon><message /></el-icon>
            <a href="mailto:work.sotnik@gmail.com" class="dropdown-link">
              work.sotnik@gmail.com</a
            ></el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped lang="scss">
.contacts {
  outline: none;
  cursor: pointer;

  &:hover {
    color: var(--el-color-primary-dark-1);

    .contacts-arrow {
      color: var(--el-color-primary-dark-1);
    }
  }

  > span {
    margin-right: 5px;
  }

  &-arrow {
    outline: none;

    > i {
      animation: fade 0.5s;
    }
  }

  .contacts-list {
    .dropdown-link {
      text-decoration: none;
      color: inherit;
      font-family: Helvetica;
    }
  }
}

@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
