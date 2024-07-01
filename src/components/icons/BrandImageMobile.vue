<script setup lang="ts">
const props = defineProps<{
  isDark: boolean
}>()
</script>

<template>
  <svg
    width="94"
    height="167"
    viewBox="0 0 94 167"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="{ 'brand-image': true, dark: props.isDark }"
  >
    <g filter="url(#filter0_dddddd_35_3)">
      <rect
        x="7"
        y="7"
        width="80"
        height="153"
        rx="4"
        fill="var(--bi-brand-color)"
        :class="{ shadowbox: !props.isDark }"
      />
    </g>
    <path
      d="M7 11C7 8.79086 8.79086 7 11 7H83C85.2091 7 87 8.79086 87 11V19C87 21.2091 85.2091 23 83 23H11C8.79086 23 7 21.2091 7 19V11Z"
      fill="var(--bi-brand-color)"
    />
    <path
      d="M7 152C7 149.791 8.79086 148 11 148H83C85.2091 148 87 149.791 87 152V156C87 158.209 85.2091 160 83 160H11C8.79086 160 7 158.209 7 156V152Z"
      fill="var(--bi-background-color)"
    />
    <path d="M7 19H87V151H7V19Z" fill="var(--bi-side-components-color)" />
    <path
      d="M83 13C83 14.1046 82.1046 15 81 15C79.8954 15 79 14.1046 79 13C79 11.8954 79.8954 11 81 11C82.1046 11 83 11.8954 83 13Z"
      fill="#FD873B"
    />
    <path
      d="M77 13C77 14.1046 76.1046 15 75 15C73.8954 15 73 14.1046 73 13C73 11.8954 73.8954 11 75 11C76.1046 11 77 11.8954 77 13Z"
      fill="#FFCD8A"
    />
    <path
      d="M71 13C71 14.1046 70.1046 15 69 15C67.8954 15 67 14.1046 67 13C67 11.8954 67.8954 11 69 11C70.1046 11 71 11.8954 71 13Z"
      fill="#91DD9D"
    />
    <path
      d="M11 25C11 23.8954 11.8954 23 13 23H81C82.1046 23 83 23.8954 83 25V31C83 32.1046 82.1046 33 81 33H13C11.8954 33 11 32.1046 11 31V25Z"
      fill="var(--bi-background-color)"
    />
    <path d="M71 25H79V27H71V25Z" fill="var(--bi-text-color)" />
    <path d="M71 29H79V31H71V29Z" fill="var(--bi-text-color)" />
    <path
      d="M11 39C11 37.8954 11.8954 37 13 37H81C82.1046 37 83 37.8954 83 39V95C83 96.1046 82.1046 97 81 97H13C11.8954 97 11 96.1046 11 95V39Z"
      fill="var(--bi-components-color)"
    />
    <path
      d="M15 107C15 105.895 15.8954 105 17 105H77C78.1046 105 79 105.895 79 107V115C79 116.105 78.1046 117 77 117H17C15.8954 117 15 116.105 15 115V107Z"
      fill="var(--bi-header-text-color)"
    />
    <path
      d="M41 45C41 43.8954 41.8954 43 43 43H77C78.1046 43 79 43.8954 79 45V49C79 50.1046 78.1046 51 77 51H43C41.8954 51 41 50.1046 41 49V45Z"
      fill="var(--bi-header-text-color)"
    />
    <path
      d="M15 67C15 65.8954 15.8954 65 17 65H77C78.1046 65 79 65.8954 79 67V69C79 70.1046 78.1046 71 77 71H17C15.8954 71 15 70.1046 15 69V67Z"
      fill="var(--bi-header-text-color)"
    />
    <path
      d="M19 123C19 121.895 19.8954 121 21 121H73C74.1046 121 75 121.895 75 123V129C75 130.105 74.1046 131 73 131H21C19.8954 131 19 130.105 19 129V123Z"
      fill="var(--bi-text-color)"
    />
    <path
      d="M27 137C27 135.895 27.8954 135 29 135H65C66.1046 135 67 135.895 67 137V141C67 142.105 66.1046 143 65 143H29C27.8954 143 27 142.105 27 141V137Z"
      fill="var(--bi-text-color)"
    />
    <path
      d="M19 77C19 75.8954 19.8954 75 21 75H73C74.1046 75 75 75.8954 75 77V79C75 80.1046 74.1046 81 73 81H21C19.8954 81 19 80.1046 19 79V77Z"
      fill="var(--bi-text-color)"
    />
    <path
      d="M24 87C24 85.8954 24.8954 85 26 85H68C69.1046 85 70 85.8954 70 87V89C70 90.1046 69.1046 91 68 91H26C24.8954 91 24 90.1046 24 89V87Z"
      fill="var(--bi-text-color)"
    />
    <path
      d="M15 27C15 25.8954 15.8954 25 17 25H37C38.1046 25 39 25.8954 39 27V29C39 30.1046 38.1046 31 37 31H17C15.8954 31 15 30.1046 15 29V27Z"
      fill="var(--bi-text-color)"
    />
    <path
      d="M35 51C35 56.5228 30.5228 61 25 61C19.4772 61 15 56.5228 15 51C15 45.4772 19.4772 41 25 41C30.5228 41 35 45.4772 35 51Z"
      fill="var(--bi-brand-color)"
    />
    <defs v-if="props.isDark">
      <filter
        id="filter0_dddddd_35_3"
        x="0.460611"
        y="0.460611"
        width="93.0788"
        height="166.079"
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
        <feGaussianBlur stdDeviation="0.0778499" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.247059 0 0 0 0 0.521569 0 0 0 0 0.929412 0 0 0 1 0"
        />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_35_3" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="0.1557" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.247059 0 0 0 0 0.521569 0 0 0 0 0.929412 0 0 0 1 0"
        />
        <feBlend mode="normal" in2="effect1_dropShadow_35_3" result="effect2_dropShadow_35_3" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="0.544949" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.247059 0 0 0 0 0.521569 0 0 0 0 0.929412 0 0 0 1 0"
        />
        <feBlend mode="normal" in2="effect2_dropShadow_35_3" result="effect3_dropShadow_35_3" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="1.0899" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.247059 0 0 0 0 0.521569 0 0 0 0 0.929412 0 0 0 1 0"
        />
        <feBlend mode="normal" in2="effect3_dropShadow_35_3" result="effect4_dropShadow_35_3" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="1.8684" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.247059 0 0 0 0 0.521569 0 0 0 0 0.929412 0 0 0 1 0"
        />
        <feBlend mode="normal" in2="effect4_dropShadow_35_3" result="effect5_dropShadow_35_3" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="3.26969" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.247059 0 0 0 0 0.521569 0 0 0 0 0.929412 0 0 0 1 0"
        />
        <feBlend mode="normal" in2="effect5_dropShadow_35_3" result="effect6_dropShadow_35_3" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect6_dropShadow_35_3" result="shape" />
      </filter>
    </defs>
  </svg>
</template>
