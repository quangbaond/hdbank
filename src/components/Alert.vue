<template>
    <div class="text-center ma-2">
        <v-snackbar v-model="snackbar.type" :color="snackbar.color" location="top" timer="3000">
            {{ snackbar.message }}
            <template v-slot:actions>
                <v-btn :color="snackbar.colorBtn" variant="text" @click="closeSnackbar">
                    Đóng
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const snackbar = computed(() => store.state.snackbar)

const closeSnackbar = () => {
    store.commit('setSnackbar', {
        type: false,
        message: '',
    })
}

</script>