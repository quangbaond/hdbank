<template>
    <h1>information</h1>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const router = useRouter()

const store = useStore()

const loading = ref(false)

const user = computed(() => store.state.user)

if (!user.value.verified) {
    router.push({ name: 'Home' })
}
</script>