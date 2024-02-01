<template>
  <v-app>
    <v-main>
      <router-view />
      <Alert />
    </v-main>
  </v-app>
</template>

<script setup>
import Alert from '@/components/Alert.vue'
</script>
