<template>
  <AppLayout>
    <div class="min-h-screen overflow-x-hidden bg-[#F4FBF7]">
      <ProfileMobile />
      <ProfileDesktop />
    </div>
  </AppLayout>
</template>

<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import ProfileMobile from '@/components/profile/ProfileMobile.vue'
import ProfileDesktop from '@/components/profile/ProfileDesktop.vue'
</script>