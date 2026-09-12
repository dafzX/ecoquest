<template>
  <article
    class="rounded-2xl border border-[#E8EDE9] bg-white p-5"
  >

    <!-- Header -->
    <div class="flex items-center gap-3">

      <div
        class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EAF8EE] text-sm font-bold text-[#15803D]"
      >
        {{ post.avatar }}
      </div>

      <div class="min-w-0 flex-1">
        <div class="flex items-center gap-2">
          <p class="text-sm font-semibold text-[#17211B]">
            {{ post.name }}
          </p>

          <span class="text-xs text-[#98A39C]">
            ·
          </span>

          <span class="text-xs text-[#98A39C]">
            {{ post.time }}
          </span>
        </div>

        <div class="mt-1 flex items-center gap-2">
          <span
            class="rounded-full px-2 py-1 text-[10px] font-semibold"
            :class="categoryStyle"
          >
            {{ post.category }}
          </span>

          <span class="text-[10px] font-medium text-[#15803D]">
            {{ post.impact }}
          </span>
        </div>
      </div>

      <button
        type="button"
        class="flex h-8 w-8 items-center justify-center rounded-lg text-[#98A39C] hover:bg-[#F5F8F5] hover:text-[#66736A]"
      >
        <MoreHorizontal class="h-4 w-4" />
      </button>

    </div>

    <!-- Content -->
    <div class="mt-5">
      <h3 class="text-base font-bold text-[#17211B]">
        {{ post.title }}
      </h3>

      <p class="mt-2 text-sm leading-6 text-[#66736A]">
        {{ post.content }}
      </p>
    </div>

    <!-- Actions -->
    <div class="mt-5 flex items-center justify-between border-t border-[#E8EDE9] pt-4">

      <div class="flex items-center gap-5">

        <button
          type="button"
          @click="toggleLike"
          class="flex items-center gap-2 text-xs font-medium transition"
          :class="
            post.liked
              ? 'text-[#E11D48]'
              : 'text-[#66736A] hover:text-[#E11D48]'
          "
        >
          <Heart
            class="h-4 w-4"
            :fill="post.liked ? 'currentColor' : 'none'"
          />

          {{ post.likes }}
        </button>

        <button
          type="button"
          class="flex items-center gap-2 text-xs font-medium text-[#66736A] hover:text-[#15803D]"
        >
          <MessageCircle class="h-4 w-4" />

          {{ post.comments }}
        </button>

      </div>

      <button
        type="button"
        class="flex items-center gap-2 text-xs font-medium text-[#66736A] hover:text-[#15803D]"
      >
        <Share2 class="h-4 w-4" />

        Share
      </button>

    </div>

  </article>
</template>

<script setup>
import { computed } from 'vue'

import {
  Heart,
  MessageCircle,
  MoreHorizontal,
  Share2
} from 'lucide-vue-next'

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const categoryStyle = computed(() => {
  if (props.post.category === 'Transport') {
    return 'bg-[#EEF5FF] text-[#2563EB]'
  }

  if (props.post.category === 'Energy') {
    return 'bg-[#FEF9C3] text-[#A16207]'
  }

  if (props.post.category === 'Waste') {
    return 'bg-[#F3E8FF] text-[#9333EA]'
  }

  return 'bg-[#EAF8EE] text-[#15803D]'
})

function toggleLike() {
  props.post.liked = !props.post.liked

  if (props.post.liked) {
    props.post.likes += 1
  } else {
    props.post.likes -= 1
  }
}
</script>