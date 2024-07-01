<script setup lang="ts">
const props = defineProps<{
  isDark: boolean
}>()
</script>

<template>
  <svg
    width="667"
    height="415"
    viewBox="0 0 667 415"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="{ 'brand-image': true, dark: props.isDark }"
  >
    <g filter="url(#filter0_dddddd_35_2)">
      <rect
        x="7"
        y="7"
        width="159"
        height="98"
        rx="2"
        fill="var(--bi-brand-color)"
        :class="{ shadowbox: !props.isDark }"
      />
    </g>
    <path
      d="M7 8.57898C7 7.47441 7.89543 6.57898 9 6.57898H164.033C165.138 6.57898 166.033 7.47441 166.033 8.57898V103C166.033 104.105 165.138 105 164.033 105H9C7.89543 105 7 104.105 7 103V8.57898Z"
      fill="var(--bi-side-components-color)"
    />
    <path
      d="M57.6015 20.1579C57.6015 19.0533 58.4969 18.1579 59.6015 18.1579H113.432C114.536 18.1579 115.432 19.0533 115.432 20.1579V30.6316C115.432 31.7362 114.536 32.6316 113.432 32.6316H59.6015C58.4969 32.6316 57.6015 31.7362 57.6015 30.6316V20.1579Z"
      fill="var(--bi-header-text-color)"
    />
    <path
      d="M92.2995 86.1842C92.2995 82.1874 95.5395 78.9474 99.5363 78.9474H119.761C123.758 78.9474 126.998 82.1874 126.998 86.1842C126.998 90.181 123.758 93.4211 119.761 93.4211H99.5363C95.5395 93.4211 92.2995 90.181 92.2995 86.1842Z"
      fill="var(--bi-brand-color)"
    />
    <path
      d="M46.0353 86.1842C46.0353 82.1874 49.2753 78.9474 53.2721 78.9474H73.4965C77.4933 78.9474 80.7334 82.1874 80.7334 86.1842C80.7334 90.181 77.4933 93.4211 73.4965 93.4211H53.2721C49.2753 93.4211 46.0353 90.181 46.0353 86.1842Z"
      fill="var(--bi-text-color)"
    />
    <path
      d="M28.6863 40.421C28.6863 39.3165 29.5818 38.421 30.6863 38.421H142.347C143.451 38.421 144.347 39.3165 144.347 40.421V48C144.347 49.1045 143.451 50 142.347 50H30.6863C29.5818 50 28.6863 49.1045 28.6863 48V40.421Z"
      fill="var(--bi-text-color)"
    />
    <path
      d="M43.1439 57.7895C43.1439 56.6849 44.0394 55.7895 45.1439 55.7895H127.889C128.994 55.7895 129.889 56.6849 129.889 57.7895V65.3684C129.889 66.473 128.994 67.3684 127.889 67.3684H45.1439C44.0393 67.3684 43.1439 66.473 43.1439 65.3684V57.7895Z"
      fill="var(--bi-text-color)"
    />
    <defs v-if="props.isDark">
      <filter
        id="filter0_dddddd_35_2"
        x="0.204776"
        y="0.204776"
        width="172.59"
        height="111.59"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="0.0808955" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.247059 0 0 0 0 0.521569 0 0 0 0 0.929412 0 0 0 1 0"
        />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_35_2" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="0.161791" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.247059 0 0 0 0 0.521569 0 0 0 0 0.929412 0 0 0 1 0"
        />
        <feBlend mode="normal" in2="effect1_dropShadow_35_2" result="effect2_dropShadow_35_2" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="0.566269" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.247059 0 0 0 0 0.521569 0 0 0 0 0.929412 0 0 0 1 0"
        />
        <feBlend mode="normal" in2="effect2_dropShadow_35_2" result="effect3_dropShadow_35_2" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="1.13254" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.247059 0 0 0 0 0.521569 0 0 0 0 0.929412 0 0 0 1 0"
        />
        <feBlend mode="normal" in2="effect3_dropShadow_35_2" result="effect4_dropShadow_35_2" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="1.94149" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.247059 0 0 0 0 0.521569 0 0 0 0 0.929412 0 0 0 1 0"
        />
        <feBlend mode="normal" in2="effect4_dropShadow_35_2" result="effect5_dropShadow_35_2" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="3.39761" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.247059 0 0 0 0 0.521569 0 0 0 0 0.929412 0 0 0 1 0"
        />
        <feBlend mode="normal" in2="effect5_dropShadow_35_2" result="effect6_dropShadow_35_2" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect6_dropShadow_35_2" result="shape" />
      </filter>
    </defs>
  </svg>
</template>
