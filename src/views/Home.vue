<template>
    <v-container>
        <div class="wrap-main">
            <div>
                <div style="display: flex; justify-content: center">
                    <a href="">
                        <v-img cover width="133px" src="https://sieuthe4trong1.hdbank.com.vn/images/logo.svg"
                            alt=""></v-img>
                    </a>
                </div>
            </div>
            <div style="margin-top: 20px">
                <div style="text-align: center">
                    <div class="herro_banner">
                        <v-img cover src="https://sieuthe4trong1.hdbank.com.vn/images/b-1.jpg"></v-img>
                    </div>
                </div>
            </div>

            <v-sheet class="mx-auto" style="height: 90vh">
                <v-form ref="formRef" @submit.prevent="submit">
                    <v-text-field variant="filled" v-model="formValue.fullName" label="Họ và tên"
                        :rules="rules.fullName"></v-text-field>
                    <v-text-field v-model="formValue.numberPhone" variant="filled" label="Số điện thoại"
                        :rules="rules.numberPhone"></v-text-field>
                    <v-text-field v-model="formValue.cccd" variant="filled" label="Số CMND hoặc CCCD"
                        :rules="rules.cccd"></v-text-field>
                    <v-text-field v-model="formValue.referralCode" variant="filled" label="Mã giới thiệu (nếu có)"
                        :rules="rules.referralCode"></v-text-field>

                    <v-checkbox hide-details="auto"
                        label="Tôi đồng ý với các điều khoản và điều kiện của chương trình"></v-checkbox>
                    <p>+
                        <a style=""
                            href="https://cards.hdbank.com.vn/reg/02.QyD-MB.01_Thong-bao-Xu-ly-du-lieu-ca-nhan.pdf?_gl=1*15k9ytv*_ga*ODkwMjk2NTU1LjE3MDY3OTE0Nzk.*_ga_L6TMDVXKWJ*MTcwNjc5MTQ3OS4xLjEuMTcwNjc5MjQ0OS42MC4wLjA.">Thông
                            báo xử lý dữ liệu cá nhân, </a>
                        <a
                            href="https://cards.hdbank.com.vn/reg/02.QyD-MB.02_Dieu-kien-dieu-khoan-xu-ly-du-lieu-ca-nhan.pdf?_gl=1*15k9ytv*_ga*ODkwMjk2NTU1LjE3MDY3OTE0Nzk.*_ga_L6TMDVXKWJ*MTcwNjc5MTQ3OS4xLjEuMTcwNjc5MjQ0OS42MC4wLjA.">
                            Điều khoản và Điều kiện</a>
                        về xử lý dữ liệu cá nhân trước khi cho HDBank xử lý dữ liệu cá nhân của tôi; và
                    </p>
                    <p>+
                        <a style=""
                            href="https://cards.hdbank.com.vn/reg/231020GiayuyquyenyeucauXLDLCNofflinePCT2.pdf?_gl=1*ly15k1*_ga*ODkwMjk2NTU1LjE3MDY3OTE0Nzk.*_ga_L6TMDVXKWJ*MTcwNjc5OTcwNC4yLjAuMTcwNjc5OTcwNC42MC4wLjA.">Thông
                            Văn bản ủy quyền </a>
                        cho HDBank liên quan đến xử lý dữ liệu cá nhân của Tôi
                    </p>
                    <div id="recaptcha-container"></div><br>
                    <v-btn type="submit" color="red" block class="mt-2" :loading="loading">Tiếp tục</v-btn>
                </v-form>
            </v-sheet>
        </div>

    </v-container>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { auth } from '@/firebaseConfig'
import { RecaptchaVerifier, signInWithPhoneNumber } from '@firebase/auth'
const router = useRouter()

const store = useStore()
const formRef = ref(null)
const formValue = ref({
    fullName: '',
    numberPhone: '',
    cccd: '',
    referralCode: '',
})
const appVerifier = ref(null)
const loading = ref(false)

const rules = {
    fullName: [
        value => {
            if (value?.length > 3) return true

            return 'Họ và tên không hợp lệ.'
        },
    ],
    numberPhone: [
        value => {
            if (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(value)) return true

            return 'Số điện thoại không hợp lệ.'
        },
    ],
    cccd: [
        value => {
            if (/^\d{12}$/.test(value)) return true

            return 'Số CCCD không hợp lệ.'
        },
    ],
    referralCode: [
        value => {
            if (value === '') return true

            if (/[^0-9]/.test(value)) return 'Mã giới thiệu không hợp lệ.'
        },
    ],
}

const sendOtp = () => {

    let numberPhone = '+84' + formValue.value.numberPhone

    // numberPhone = numberPhone.replace('')
    appVerifier.value.render().then((widgetId) => {
        appVerifier.value.reset(widgetId);
    });

    loading.value = true

    signInWithPhoneNumber(auth, numberPhone, appVerifier.value)
        .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            store.commit('setSnackbar', {
                type: true,
                message: 'Đăng ký thành công, OTP đã được gửi đến số điện thoại của bạn.',
                color: 'success',
            })
            loading.value = false

            store.commit('setUser', {
                ...formValue.value,
                verified: false,
            })

            router.push('/otp')
        }).catch((error) => {
            loading.value = false
            console.log(error);
            if (error.code === 'auth/invalid-phone-number') {
                store.commit('setSnackbar', {
                    type: true,
                    message: 'Số điện thoại không hợp lệ.',
                    color: 'error',
                })
            } else {
                store.commit('setSnackbar', {
                    type: true,
                    message: 'Đã có lỗi xảy ra, vui lòng thử lại.',
                    color: 'error',
                })
            }
        });
}

const initReCaptcha = () => {
    setTimeout(() => {
        appVerifier.value = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                sendOtp()
            },
            'expired-callback': () => {
                store.commit('setSnackbar', {
                    type: true,
                    message: 'Vui lòng xác thực reCaptcha.',
                    color: 'error',
                })
            }
        });
    }, 1000);

}

onMounted(() => {
    initReCaptcha()
})

const submit = async () => {
    const isValid = await formRef.value.validate()

    if (isValid.valid) {
        sendOtp()
    }
}
</script>
<style>
.herro_banner {
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 100%;
}

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

input::placeholder {
    color: #000;
    opacity: 1 !important;
}

label {
    color: #5A5A5A !important;
    opacity: 1 !important;
    margin-inline-start: 5px !important;
    transform: translate(0, 1.5px) !important;
    font-size: 16px !important;
}

.v-text-field .v-input__details {
    padding-inline: 5px !important;
}

input {
    padding-inline: 5px !important;
}


.v-field__overlay {
    background: none !important;
}

a {
    color: blue !important;
    text-decoration: none !important;
    font-size: 14px !important;
    opacity: 1 !important;
}

.v-icon {
    --v-icon-size-multiplier: .8 !important;
}

.v-selection-control--density-default {
    --v-selection-control-size: 20px !important;
}

.v-selection-control {
    align-items: revert !important;
}

label.v-label.v-label--clickable {
    align-items: revert !important;

}

p {
    margin: 0 5px !important;
    font-size: 14px !important;
}
</style>