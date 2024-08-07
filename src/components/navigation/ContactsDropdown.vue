<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'petite-vue-i18n'
import type { DropdownInstance } from 'element-plus'
import { ArrowDown, ArrowUp, PhoneFilled, Promotion, Message } from '@element-plus/icons-vue'

// use translation
const { t } = useI18n({ useScope: 'global' })

// curr state for contacts dropdown
const contactsExpanded = ref(false)
const dropdown = ref<DropdownInstance>()

/**
 * Contacts dropdown hover handler
 * @param {boolean} state - flag "is hover"
 */
const handleContactsHover = (state: boolean) => {
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
    <span> {{ t('nav-contact') }} </span>

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
          <el-dropdown-item :title="t('nav-contact-call')"
            ><el-icon><phone-filled /></el-icon>
            <a href="tel:+16042451101" class="dropdown-link"> +1 604-245-1101 </a></el-dropdown-item
          >
          <el-dropdown-item :title="t('nav-contact-tg')"
            ><el-icon><promotion /></el-icon>
            <a target="_blank" href="https://t.me/letUser" class="dropdown-link">
              @letUser
            </a></el-dropdown-item
          >
          <el-dropdown-item :title="t('nav-contact-email')"
            ><el-icon style="padding-top: 3px"><message /></el-icon>
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
  -webkit-user-select: none;
  user-select: none;

  &:hover {
    color: var(--el-color-primary);

    .contacts-arrow {
      color: var(--el-color-primary);
    }
  }

  > span {
    margin-right: 5px;
  }

  &-arrow {
    outline: none;
  }

  .contacts-list {
    .dropdown-link {
      text-decoration: none;
      color: inherit;
      padding-left: 8px;
    }
  }
}
</style>
