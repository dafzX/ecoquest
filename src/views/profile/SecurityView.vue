<template>
  <AppLayout>
    <div class="min-h-screen bg-[#F4FBF7]">

      <!-- Mobile View -->
      <SecurityMobile
        @back="goBack"
        @change-password="changePassword"
        @logout-device="logoutDevice"
        @logout-all="logoutAll"
      />

      <!-- Desktop View -->
      <SecurityDesktop
        @back="goBack"
        @change-password="changePassword"
        @logout-device="logoutDevice"
        @logout-all="logoutAll"
      />

    </div>
  </AppLayout>
</template>

<script setup>
import { useRouter } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'
import SecurityMobile from '@/components/security/SecurityMobile.vue'
import SecurityDesktop from '@/components/security/SecurityDesktop.vue'

const router = useRouter()

function goBack() {
  router.back()
}

function changePassword() {
  console.log('Change password')
}

function logoutDevice() {
  console.log('Logout device')
}

function logoutAll() {
  console.log('Logout all devices')
}
</script>