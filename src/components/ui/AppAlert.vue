<template>
  <Teleport to="body">
    <Transition name="eco-alert">
      <div
        v-if="alertState.current"
        class="fixed inset-0 z-[60] flex items-center justify-center bg-[#10251a]/40 p-4 backdrop-blur-sm"
        @click.self="dismissAlert()"
        @keydown.esc="dismissAlert()"
      >
        <section
          aria-modal="true"
          role="alertdialog"
          aria-labelledby="eco-alert-title"
          aria-describedby="eco-alert-message"
          class="w-full max-w-sm rounded-3xl border border-white/70 bg-white p-6 text-center shadow-[0_24px_80px_rgba(23,33,27,0.22)] sm:p-7"
        >
          <div
            class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl"
            :class="iconContainerClass"
          >
            <component :is="alertIcon" class="h-7 w-7" />
          </div>

          <h2
            id="eco-alert-title"
            class="mt-4 text-lg font-bold text-[#17211B]"
          >
            {{ alertState.current.title || alertTitle }}
          </h2>

          <p
            id="eco-alert-message"
            class="mt-2 whitespace-pre-line text-sm leading-6 text-[#66736A]"
          >
            {{ alertState.current.message }}
          </p>

          <div class="mt-6 flex flex-col-reverse gap-2 sm:flex-row">
            <button
              v-if="alertState.current.confirm"
              type="button"
              class="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl border border-[#DCEBE0] bg-white px-5 py-2.5 text-sm font-semibold text-[#66736A] transition hover:bg-[#F4F8F4]"
              @click="dismissAlert()"
            >
              Batal
            </button>

            <button
              ref="closeButton"
              type="button"
              class="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#22C55E] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#16A34A] focus-visible:outline-offset-4 active:scale-[0.98]"
              @click="dismissAlert(alertState.current.confirm)"
            >
              {{ alertState.current.confirm ? 'Ya, lanjutkan' : 'Mengerti' }}
              <Check v-if="alertState.current.type === 'success'" class="h-4 w-4" />
            </button>
          </div>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { Check, Info, Leaf, TriangleAlert } from 'lucide-vue-next'
import { alertState, dismissAlert } from '@/services/notifications'

const closeButton = ref(null)

const alertTitle = computed(() => {
  const titles = {
    error: 'Ada kendala',
    warning: 'Periksa kembali',
    success: 'Berhasil!',
    info: 'Informasi'
  }

  return titles[alertState.current?.type] || titles.info
})

const alertIcon = computed(() => {
  const icons = {
    error: TriangleAlert,
    warning: Info,
    success: Check,
    info: Leaf
  }

  return icons[alertState.current?.type] || Leaf
})

const iconContainerClass = computed(() => {
  const classes = {
    error: 'bg-rose-50 text-rose-600',
    warning: 'bg-amber-50 text-amber-600',
    success: 'bg-emerald-50 text-emerald-600',
    info: 'bg-green-50 text-green-600'
  }

  return classes[alertState.current?.type] || classes.info
})

watch(
  () => alertState.current,
  async (current) => {
    if (current) {
      await nextTick()
      closeButton.value?.focus()
    }
  }
)
</script>
