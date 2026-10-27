<template>
  <div class="landing-island" aria-label="Ilustrasi pulau ekosistem hijau">
    <div class="landing-island__halo"></div>
    <svg
      class="landing-island__art"
      viewBox="0 0 640 520"
      role="img"
      aria-labelledby="island-title island-description"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="island-title">Pulau ekosistem EcoQuest</title>
      <desc id="island-description">Pulau kecil dengan pepohonan, aliran air, jalur setapak, dan turbin angin.</desc>
      <defs>
        <linearGradient id="island-ground" x1="140" y1="170" x2="490" y2="430" gradientUnits="userSpaceOnUse">
          <stop stop-color="#B9E6B9" />
          <stop offset="1" stop-color="#5CA66E" />
        </linearGradient>
        <linearGradient id="island-side" x1="214" y1="325" x2="418" y2="470" gradientUnits="userSpaceOnUse">
          <stop stop-color="#528D60" />
          <stop offset="1" stop-color="#286044" />
        </linearGradient>
        <linearGradient id="island-water" x1="305" y1="340" x2="420" y2="395" gradientUnits="userSpaceOnUse">
          <stop stop-color="#C3E8DA" />
          <stop offset="1" stop-color="#83C9B3" />
        </linearGradient>
        <filter id="island-shadow" x="48" y="52" width="546" height="452" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="17" />
        </filter>
      </defs>
      <ellipse cx="321" cy="408" rx="226" ry="43" fill="#548C67" opacity=".17" filter="url(#island-shadow)" />
      <path d="M92 276c13-25 34-40 67-49 14-50 71-70 113-48 24-54 99-63 136-19 42-11 84 16 87 56 39 5 66 34 61 67-8 53-103 91-239 96-140 6-237-28-241-67-2-14 3-25 16-36Z" fill="url(#island-ground)" />
      <path d="M91 303c42 38 134 61 244 56 98-5 179-28 218-62l-8 54c-48 61-153 83-244 82-105-1-189-28-211-65l1-65Z" fill="url(#island-side)" />
      <path d="M125 286c28-37 70-41 103-29 31 12 38 43 10 54-35 14-75-3-88 20-10 18 2 38 22 48 30 14 67 4 77-13 9-16-3-28-19-28" fill="none" stroke="#E8D9A6" stroke-width="13" stroke-linecap="round" />
      <path d="M380 303c-6 28-35 39-41 57-7 20 18 31 43 21 24-10 45-10 61 0" fill="none" stroke="url(#island-water)" stroke-width="19" stroke-linecap="round" />
      <path d="M391 308c-5 24-29 38-34 51" fill="none" stroke="#ECFFF7" stroke-width="3" stroke-linecap="round" opacity=".75" />
      <ellipse cx="170" cy="251" rx="33" ry="23" fill="#76B97C" />
      <ellipse cx="216" cy="225" rx="31" ry="22" fill="#8CCB89" />
      <ellipse cx="265" cy="252" rx="28" ry="20" fill="#74B87D" />
      <ellipse cx="447" cy="262" rx="38" ry="22" fill="#74B87D" />
      <ellipse cx="491" cy="282" rx="29" ry="18" fill="#8BC989" />
      <g>
        <path d="M182 240v-50" stroke="#7D5B3F" stroke-width="8" stroke-linecap="round" />
        <circle cx="181" cy="178" r="26" fill="#357B50" />
        <circle cx="163" cy="185" r="18" fill="#4B965D" />
        <circle cx="198" cy="188" r="19" fill="#68AC6E" />
      </g>
      <g>
        <path d="M246 230v-42" stroke="#7D5B3F" stroke-width="7" stroke-linecap="round" />
        <circle cx="246" cy="179" r="23" fill="#438955" />
        <circle cx="229" cy="185" r="16" fill="#65A96A" />
        <circle cx="263" cy="186" r="16" fill="#75B975" />
      </g>
      <g>
        <path d="M442 246v-48" stroke="#7D5B3F" stroke-width="8" stroke-linecap="round" />
        <circle cx="442" cy="185" r="25" fill="#34794D" />
        <circle cx="424" cy="192" r="18" fill="#4A945A" />
        <circle cx="460" cy="194" r="17" fill="#70B574" />
      </g>
      <g>
        <path d="M493 270v-38" stroke="#7D5B3F" stroke-width="6" stroke-linecap="round" />
        <circle cx="493" cy="224" r="20" fill="#4B9257" />
        <circle cx="479" cy="230" r="14" fill="#70B575" />
        <circle cx="507" cy="231" r="14" fill="#80C27D" />
      </g>
      <g>
        <path d="M336 272v-88" stroke="#F8FAF7" stroke-width="5" stroke-linecap="round" />
        <circle cx="336" cy="181" r="6" fill="#F8FAF7" />
        <path d="m336 181-28-15m28 15 26-19m-26 19 2 31" stroke="#F8FAF7" stroke-width="5" stroke-linecap="round" />
        <circle cx="306" cy="164" r="4" fill="#F8FAF7" />
        <circle cx="365" cy="160" r="4" fill="#F8FAF7" />
        <circle cx="364" cy="212" r="4" fill="#F8FAF7" />
      </g>
      <g fill="#4E865B">
        <path d="m285 293 9-17 9 17h-18Z" />
        <path d="m305 300 7-13 8 13h-15Z" />
        <path d="m461 328 8-14 8 14h-16Z" />
      </g>
      <g fill="#D9C79A">
        <ellipse cx="126" cy="309" rx="10" ry="6" />
        <ellipse cx="519" cy="319" rx="11" ry="7" />
        <ellipse cx="346" cy="377" rx="9" ry="5" />
      </g>
      <g fill="#F5FFF6" opacity=".7">
        <circle cx="139" cy="267" r="3" />
        <circle cx="399" cy="238" r="2.5" />
        <circle cx="289" cy="214" r="2" />
        <circle cx="532" cy="268" r="2.5" />
      </g>
    </svg>
  </div>
</template>
