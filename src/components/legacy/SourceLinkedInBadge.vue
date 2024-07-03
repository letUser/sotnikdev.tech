<script setup lang="ts">
import { useDark } from '@vueuse/core'
import LIProfilePhoto from '../../assets/LI-profile-photo.jfif'

const isDark = useDark() //true or false
</script>

<template>
  <div class="profile-badge profile-badge--width-330" dir="ltr" style="margin-left: 0px">
    <div
      :class="{
        'profile-badge__header': true,
        'profile-badge__header--dark': isDark,
        'profile-badge__header--light': !isDark
      }"
      style="
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      "
    >
      <div
        :class="{
          'profile-badge__header-logo-icon': true,
          'profile-badge__header-logo-icon--light': !isDark
        }"
        aria-hidden="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 84 21"
          preserveAspectRatio="xMinYMin meet"
          version="1.1"
          focusable="false"
        >
          <g class="inbug" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <path
              d="M19.479,0 L1.583,0 C0.727,0 0,0.677 0,1.511 L0,19.488 C0,20.323 0.477,21 1.333,21 L19.229,21 C20.086,21 21,20.323 21,19.488 L21,1.511 C21,0.677 20.336,0 19.479,0"
              class="bug-text-color"
              transform="translate(63.000000, 0.000000)"
            ></path>
            <path
              d="M82.479,0 L64.583,0 C63.727,0 63,0.677 63,1.511 L63,19.488 C63,20.323 63.477,21 64.333,21 L82.229,21 C83.086,21 84,20.323 84,19.488 L84,1.511 C84,0.677 83.336,0 82.479,0 Z M71,8 L73.827,8 L73.827,9.441 L73.858,9.441 C74.289,8.664 75.562,7.875 77.136,7.875 C80.157,7.875 81,9.479 81,12.45 L81,18 L78,18 L78,12.997 C78,11.667 77.469,10.5 76.227,10.5 C74.719,10.5 74,11.521 74,13.197 L74,18 L71,18 L71,8 Z M66,18 L69,18 L69,8 L66,8 L66,18 Z M69.375,4.5 C69.375,5.536 68.536,6.375 67.5,6.375 C66.464,6.375 65.625,5.536 65.625,4.5 C65.625,3.464 66.464,2.625 67.5,2.625 C68.536,2.625 69.375,3.464 69.375,4.5 Z"
              class="background"
              fill="currentColor"
            ></path>
          </g>
          <g class="linkedin-text">
            <path
              d="M60,18 L57.2,18 L57.2,16.809 L57.17,16.809 C56.547,17.531 55.465,18.125 53.631,18.125 C51.131,18.125 48.978,16.244 48.978,13.011 C48.978,9.931 51.1,7.875 53.725,7.875 C55.35,7.875 56.359,8.453 56.97,9.191 L57,9.191 L57,3 L60,3 L60,18 Z M54.479,10.125 C52.764,10.125 51.8,11.348 51.8,12.974 C51.8,14.601 52.764,15.875 54.479,15.875 C56.196,15.875 57.2,14.634 57.2,12.974 C57.2,11.268 56.196,10.125 54.479,10.125 L54.479,10.125 Z"
              fill="currentColor"
            ></path>
            <path
              d="M47.6611,16.3889 C46.9531,17.3059 45.4951,18.1249 43.1411,18.1249 C40.0001,18.1249 38.0001,16.0459 38.0001,12.7779 C38.0001,9.8749 39.8121,7.8749 43.2291,7.8749 C46.1801,7.8749 48.0001,9.8129 48.0001,13.2219 C48.0001,13.5629 47.9451,13.8999 47.9451,13.8999 L40.8311,13.8999 L40.8481,14.2089 C41.0451,15.0709 41.6961,16.1249 43.1901,16.1249 C44.4941,16.1249 45.3881,15.4239 45.7921,14.8749 L47.6611,16.3889 Z M45.1131,11.9999 C45.1331,10.9449 44.3591,9.8749 43.1391,9.8749 C41.6871,9.8749 40.9121,11.0089 40.8311,11.9999 L45.1131,11.9999 Z"
              fill="currentColor"
            ></path>
            <polygon
              fill="currentColor"
              points="38 8 34.5 8 31 12 31 3 28 3 28 18 31 18 31 13 34.699 18 38.241 18 34 12.533"
            ></polygon>
            <path
              d="M16,8 L18.827,8 L18.827,9.441 L18.858,9.441 C19.289,8.664 20.562,7.875 22.136,7.875 C25.157,7.875 26,9.792 26,12.45 L26,18 L23,18 L23,12.997 C23,11.525 22.469,10.5 21.227,10.5 C19.719,10.5 19,11.694 19,13.197 L19,18 L16,18 L16,8 Z"
              fill="currentColor"
            ></path>
            <path
              d="M11,18 L14,18 L14,8 L11,8 L11,18 Z M12.501,6.3 C13.495,6.3 14.3,5.494 14.3,4.5 C14.3,3.506 13.495,2.7 12.501,2.7 C11.508,2.7 10.7,3.506 10.7,4.5 C10.7,5.494 11.508,6.3 12.501,6.3 Z"
              fill="currentColor"
            ></path>
            <polygon fill="currentColor" points="3 3 0 3 0 18 9 18 9 15 3 15"></polygon>
          </g>
        </svg>
      </div>

      <i
        @click="$emit('onClose')"
        class="el-icon"
        style="font-size: 16px; display: block; width: 16px; height: 16px; cursor: pointer"
        ><svg data-v-f6f16221="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
          <path
            fill="currentColor"
            d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
          ></path></svg
      ></i>
    </div>
    <div class="profile-badge__content">
      <img
        class="artdeco-entity-image artdeco-entity-image--circle-4 profile-badge__content-profile-image"
        alt="Dan Sotnik"
        :src="LIProfilePhoto"
      />

      <h3 class="profile-badge__content-profile-name" itemprop="name">
        <a
          class="profile-badge__content-profile-name-link"
          href="https://ca.linkedin.com/in/sotnik?trk=public-profile-badge-profile-badge-profile-name"
          data-tracking-control-name="public-profile-badge-profile-badge-profile-name"
          data-tracking-will-navigate=""
        >
          Dan Sotnik
        </a>
      </h3>

      <h4 class="profile-badge__content-profile-headline">
        Senior Software Developer @ OTR | LinkedIn Top Voice | Vue, Python, React, AWS
      </h4>

      <h4 class="profile-badge__content-profile-company-school-info">
        <a
          href="https://www.linkedin.com/company/otr?trk=public-profile-badge-profile-badge_company-name"
          class="profile-badge__content-profile-company-school-info-link"
          data-tracking-control-name="public-profile-badge-profile-badge_company-name"
          data-tracking-will-navigate="true"
          >OTR - IT Solutions</a
        >
        |
        <a
          href="https://www.linkedin.com/school/rsuh-rggu/?trk=public-profile-badge-profile-badge_school-name"
          class="profile-badge__content-profile-company-school-info-link"
          data-tracking-control-name="public-profile-badge-profile-badge_school-name"
          data-tracking-will-navigate="true"
          >Russian State University for the Humanities</a
        >
      </h4>
    </div>
    <a
      :class="{
        'profile-badge__cta-btn': true,
        'profile-badge__cta-btn--dark': isDark,
        'profile-badge__cta-btn--light': !isDark
      }"
      href="https://ca.linkedin.com/in/sotnik?trk=public-profile-badge-profile-badge-view-profile-cta"
      target="_blank"
      data-tracking-control-name="public-profile-badge-profile-badge-view-profile-cta"
      data-tracking-will-navigate=""
    >
      View profile
    </a>
  </div>
</template>

<style scoped lang="scss">
.profile-badge {
  width: 330px;
  font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
    'Fira Sans', Ubuntu, Oxygen, 'Oxygen Sans', Cantarell, 'Droid Sans', 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Lucida Grande', Helvetica, Arial,
    sans-serif;
  font-weight: 400;
  line-height: 1;
  direction: ltr;
  margin: 0 4px 0 0;
  font-size: 100%;
  vertical-align: baseline;
  background: transparent;
  overflow: hidden;
  box-shadow:
    0px -1px 1px rgba(0, 0, 0, 0.08),
    1px 0px 1px rgba(0, 0, 0, 0.08),
    -1px 0px 1px rgba(0, 0, 0, 0.08),
    0px 1px 1px rgba(0, 0, 0, 0.08);
  padding: 0;
  background-color: inherit;
  color: inherit;
  width: 100%;
  height: 100%;
  backdrop-filter: saturate(50%) blur(4px);
  -webkit-backdrop-filter: saturate(50%) blur(4px);

  &__header {
    padding: 12px 16px;

    &--dark {
      background-color: #38434f;
    }

    &--light {
      background-color: #e9e5df;
    }

    &-logo-icon {
      width: 84px;
      height: 21px;
      display: inline-block;
      color: inherit;

      &--light {
        color: #0a66c2;
      }
    }
  }

  &__content {
    padding: 0 16px;

    &-profile {
      &-image {
        margin: 12px 0 8px;
      }

      &-name {
        padding: 0 0 4px;
        color: inherit;

        &-link {
          font-size: 1rem;
          line-height: 1.5;
          font-weight: 600;
          color: inherit;
          text-decoration: none;

          &:hover {
            color: var(--el-color-primary);
          }
        }
      }

      &-headline {
        padding: 0 0 4px;
        font-size: 0.88rem;
        line-height: 1.42857;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.9);
        color: inherit;
      }

      &-company-school-info {
        padding: 0 0 4px;
        font-size: 0.75rem;
        line-height: 1.33333;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.6);
        color: inherit;

        &-link {
          color: inherit;
          text-decoration: none;

          &:hover {
            color: var(--el-color-primary);
          }
        }
      }
    }

    .artdeco-entity-image--circle-4 {
      width: 56px;
      height: 56px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      background-clip: content-box;
      border: 2px solid rgba(0, 0, 0, 0);
      border-radius: 49.9%;
    }
  }

  &__cta-btn {
    margin: 4px 16px 12px;
    background-color: rgba(0, 0, 0, 0);
    border: 0;
    box-sizing: border-box;
    cursor: pointer;
    display: inline-block;
    font-size: 1rem;
    font-weight: 600;
    font-family: inherit;
    height: 32px;
    line-height: 32px;
    overflow: hidden;
    outline-width: 2px;
    padding: 0 16px;
    position: relative;
    text-align: center;
    text-decoration: none;
    -webkit-transition-duration: 167ms;
    transition-duration: 167ms;
    transition-property: background-color, box-shadow, color;
    transition-property:
      background-color,
      box-shadow,
      color,
      -webkit-box-shadow;
    -webkit-transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
    transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
    vertical-align: middle;
    z-index: 0;
    border-radius: 24px;

    &--light {
      color: var(--el-color-primary);
      box-shadow: inset 0 0 0 1px var(--el-color-primary);
    }

    &--dark {
      color: inherit;
      box-shadow: inset 0 0 0 1px #fff;
    }

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
      color: var(--el-color-primary);
      -webkit-box-shadow:
        inset 0 0 0 1px rgba(255, 255, 255, 0.7),
        inset 0 0 0 2px var(--el-color-primary),
        inset 0 0 0 1px rgba(0, 0, 0, 0);
      box-shadow:
        inset 0 0 0 1px rgba(255, 255, 255, 0.7),
        inset 0 0 0 2px var(--el-color-primary),
        inset 0 0 0 1px rgba(0, 0, 0, 0);
    }
  }
}
</style>
