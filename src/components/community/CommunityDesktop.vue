<template>
  <main class="hidden md:block">
    <div class="mx-auto max-w-270 px-6 pb-10 pt-8">
      <!-- Header -->
      <section class="mb-8 flex items-end justify-between">
        <div>
          <h1 class="text-[28px] font-bold text-[#17211B]">
            Komunitas
          </h1>
          <p class="mt-1 text-sm text-[#66736A]">
            Berbagi inspirasi dengan sesama Eco Explorer.
          </p>
        </div>
      </section>

      <div class="grid grid-cols-[1.5fr_1fr] gap-8">
        <!-- Feed Section -->
        <div>
          <!-- Post Input -->
          <form
            class="mb-8 rounded-lg border border-[#E8EDE9] bg-white p-5 shadow-sm"
            @submit.prevent="submitPost"
          >
            <div class="flex gap-4">
              <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#22C55E] text-lg font-bold text-white">
                {{ user?.avatar || 'DA' }}
              </div>
              <div class="flex-1">
                <textarea
                  v-model="postContent"
                  class="w-full resize-none border-none bg-transparent p-2 text-sm text-[#17211B] outline-none placeholder:text-[#98A39C]"
                  placeholder="Bagikan aksi eco-mu hari ini..."
                  rows="3"
                ></textarea>
                
                <div class="mt-3 flex items-center justify-between border-t border-[#E8EDE9] pt-3">
                  <button class="flex items-center gap-2 rounded-lg p-2 text-[#66736A] transition hover:bg-[#F8FAF8] hover:text-[#22C55E]">
                    <ImageIcon class="h-5 w-5" />
                    <span class="text-xs font-semibold">Foto/Video</span>
                  </button>
                  <button
                    type="submit"
                    class="rounded-xl bg-[#22C55E] px-6 py-2 text-sm font-semibold text-white transition hover:bg-[#15803D] disabled:cursor-not-allowed disabled:opacity-50"
                    :disabled="!postContent.trim()"
                  >
                    Kirim
                  </button>
                </div>
              </div>
            </div>
          </form>

          <!-- Feed List -->
          <div class="space-y-6">
            <CommunityPost
              v-for="post in communityPosts"
              :key="post.id"
              :post="post"
              @like="emit('like', $event)"
            />
            
            <button class="w-full rounded-lg border border-[#E8EDE9] bg-white py-4 text-sm font-semibold text-[#15803D] transition hover:bg-[#F8FAF8]">
              Muat Lebih Banyak
            </button>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Trending Topics -->
          <div class="rounded-lg border border-[#E8EDE9] bg-white p-6 shadow-sm">
            <h3 class="mb-5 text-base font-bold text-[#17211B]">Topik Populer</h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-sm font-bold text-[#15803D]">#BeachCleanup</h4>
                  <p class="text-xs text-[#98A39C]">1.2k postingan</p>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-sm font-bold text-[#15803D]">#ZeroWaste</h4>
                  <p class="text-xs text-[#98A39C]">850 postingan</p>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-sm font-bold text-[#15803D]">#Composting</h4>
                  <p class="text-xs text-[#98A39C]">640 postingan</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Top Contributors -->
          <div class="rounded-lg border border-[#E8EDE9] bg-white p-6 shadow-sm">
            <h3 class="mb-5 text-base font-bold text-[#17211B]">Kontributor Utama</h3>
            <div class="space-y-4">
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF8EE] text-sm font-bold text-[#15803D]">A</div>
                <div>
                  <h4 class="text-sm font-bold text-[#17211B]">Andi</h4>
                  <p class="text-xs text-[#66736A]">152 postingan</p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF8E1] text-sm font-bold text-[#A16207]">R</div>
                <div>
                  <h4 class="text-sm font-bold text-[#17211B]">Rina</h4>
                  <p class="text-xs text-[#66736A]">134 postingan</p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F6FF] text-sm font-bold text-[#0284C7]">B</div>
                <div>
                  <h4 class="text-sm font-bold text-[#17211B]">Budi</h4>
                  <p class="text-xs text-[#66736A]">98 postingan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { Image as ImageIcon } from 'lucide-vue-next'
import CommunityPost from '@/components/cards/CommunityPost.vue'

const emit = defineEmits(['create-post', 'like'])
const postContent = ref('')

function submitPost() {
  const content = postContent.value.trim()

  if (!content) {
    return
  }

  emit('create-post', content)
  postContent.value = ''
}

defineProps({
  user: Object,
  communityPosts: Array
})
</script>