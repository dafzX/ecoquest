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
  window.alert('Pengaturan password akan tersedia pada rilis berikutnya.')
}

function logoutDevice() {
  window.alert('Sesi perangkat berhasil diperiksa.')
}

function logoutAll() {
  window.alert('Semua sesi perangkat akan dikeluarkan pada rilis berikutnya.')
}
</script>