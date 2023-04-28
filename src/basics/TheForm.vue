<template>
    <form @submit.prevent="handleSubmit" class="form">
        <div class="form__top">
            <div class="form__head">
                <h3 class="form__title">Thêm tài sản</h3>
            </div>
            <div class="form__body">
                <div class="form__body__item form__body__item--1">
                    <TextfieldForm @blur="validateLegacyCode" :error="errors.legacyCode" @input="setValue"
                        :value="form.legacyCode" name="legacyCode" label="Mã tài sản" placeholder="Nhập mã tài sản">
                    </TextfieldForm>
                </div>
                <div class="form__body__item form__body__item--2">
                    <TextfieldForm @blur="validateLegacyName" :error="errors.legacyName" @input="setValue"
                        :value="form.legacyName" name="legacyName" label="Tên tài sản" placeholder="Nhập tên tài sản">
                    </TextfieldForm>
                </div>
                <div class="form__body__item form__body__item--1">
                    <MyCombobox @blurcombobox="validateDepartmentCode" :error="errors.departmentCode" @select="setValue"
                        :value="form.departmentCode" name="departmentCode" label="Mã bộ phận sử dụng"
                        placeholder="Chọn mã bộ phận sử dụng"></MyCombobox>
                </div>
                <div class="form__body__item form__body__item--2">
                    <TextfieldForm :disable="true" label="Tên bộ phận sử dụng" :required="false"
                        placeholder="Nhập tên bộ phận sử dụng">
                    </TextfieldForm>
                </div>
                <div class="form__body__item form__body__item--1">
                    <MyCombobox @blurcombobox="validateLegacyTypeCode" :error="errors.legacyTypeCode" @select="setValue"
                        :value="form.legacyTypeCode" name="legacyTypeCode" label="Mã loại tài sản"
                        placeholder="Chọn mã loại tài sản"></MyCombobox>
                </div>
                <div class="form__body__item form__body__item--2">
                    <TextfieldForm :disable="true" :required="false" label="Tên loại tài sản"
                        placeholder="Nhập tên loại tài sản">
                    </TextfieldForm>
                </div>
                <div class="form__body__item form__body__item--1">
                    <NumberForm @blur="validateQuantity" :error="errors.quantity" @change="setValue" label="Số lượng"
                        name="quantity" :value="form.quantity" min="1">
                    </NumberForm>
                </div>
                <div class="form__body__item form__body__item--1">
                    <NumberForm @blur="validatePrice" :error="errors.price" :currrency="true" @change="setValue"
                        :icon="false" name="price" label="Nguyên giá" :value="form.price" min="0"></NumberForm>

                </div>
                <div class="form__body__item form__body__item--1">
                    <NumberForm @blur="validateUseDuration" :error="errors.useDuration" @change="setValue" :icon="false"
                        name="useDuration" label="Số năm sử dụng" :value="form.useDuration" min="0">
                    </NumberForm>
                </div>
                <div class="form__body__item form__body__item--1">
                    <NumberForm :float="true" @blur="validateLooseRate" :error="errors.looseRate" @change="setValue"
                        label="Tỷ lệ hao mòn (%)" name="looseRate" :value="form.looseRate" min="0"></NumberForm>
                </div>
                <div class="form__body__item form__body__item--1">
                    <NumberForm :float="true" @blur="validateLooseRateYear" :error="errors.looseRateYear" @change="setValue"
                        :icon="false" name="looseRateYear" label="Giá trị hao mòn năm" :value="form.looseRateYear" min="0">
                    </NumberForm>
                </div>
                <div class="form__body__item form__body__item--1">
                    <NumberForm @change="setValue" :icon="false" :disable="true" name="currentYear" label="Năm theo dõi"
                        :required="false" :value="form.currentYear" min="1">
                    </NumberForm>
                </div>
                <div class="form__body__item form__body__item--1">
                    <InputDate @blurdate="validateBuyDate" @select="setValue" :error="errors.buyDate" :value="form.buyDate"
                        name="buyDate" label="Ngày mua"></InputDate>
                </div>
                <div class="form__body__item form__body__item--1">
                    <InputDate @blurdate="validateUseDate" @select="setValue" :error="errors.useDate" :value="form.useDate"
                        name="useDate" label="Ngày bắt đầu sử dụng">
                    </InputDate>
                </div>
            </div>
        </div>
        <div class="form__bottom">
            <MyButton :isSub="true" text="Hủy"></MyButton>
            <MyButton type="submit" text="Lưu"></MyButton>
        </div>
    </form>
</template>

<script>
import NumberForm from '@/components/NumberForm.vue';
import TextfieldForm from '@/components/TextfieldForm.vue';
import InputDate from '@/components/InputDate.vue';
import MyButton from '@/components/MyButton.vue';
import MyCombobox from '@/components/MyCombobox.vue';

export default {
    data() {
        return {
            form: {
                legacyCode: 'TS00001',
                legacyName: '',
                departmentCode: '',
                legacyTypeCode: '',
                quantity: '1',
                price: '1000',
                useDuration: '1',
                looseRate: '6,67',
                looseRateYear: '0',
                currentYear: new Date().getFullYear(),
                buyDate: new Date().toISOString().substring(0, 10),
                useDate: new Date().toISOString().substring(0, 10),
            },
            errors: {}
        }
    },
    methods: {
        setValue({ name, value }) {
            this.form[name] = value
        },
        handleSubmit() {
            this.validateLegacyCode()
            this.validateLegacyName()
            this.validateDepartmentCode()
            this.validateLegacyTypeCode()
            this.validateBuyDate()
            this.validateUseDate()
            this.validateQuantity()
            this.validatePrice()
            this.validateUseDuration()
            this.validateLooseRate()
            this.validateLooseRateYear()
            console.log(this.form);
        },
        validateLegacyCode() {
            this.errors.legacyCode = ''
            if (!this.validateRequired(this.form.legacyCode))
                this.errors.legacyCode = 'Cần nhập mã tài sản'
        },
        validateLegacyName() {
            this.errors.legacyName = ''
            if (!this.validateRequired(this.form.legacyName))
                this.errors.legacyName = 'Cần nhập tên tài sản'
        },
        validateDepartmentCode() {
            this.errors.departmentCode = ''
            if (!this.validateRequired(this.form.departmentCode))
                this.errors.departmentCode = 'Cần nhập tên bộ phận sử dụng'
        },
        validateLegacyTypeCode() {
            this.errors.legacyTypeCode = ''
            if (!this.validateRequired(this.form.legacyTypeCode))
                this.errors.legacyTypeCode = 'Cần nhập mã loại tài sản'
        },
        validateBuyDate() {
            this.errors.buyDate = ''
            if (!this.validateRequired(this.form.buyDate))
                this.errors.buyDate = 'Cần nhập ngày mua'
        },
        validateUseDate() {
            this.errors.useDate = ''
            if (!this.validateRequired(this.form.useDate))
                this.errors.useDate = 'Cần nhập ngày sử dụng'
            else if (this.form.buyDate && this.form.useDate && this.form.buyDate > this.form.useDate)
                this.errors.useDate = 'Ngày bắt đầu sử dụng phải sau ngày mua'
        },
        validateQuantity() {
            this.errors.quantity = ''
            if (!this.validateRequired(this.form.quantity))
                this.errors.quantity = 'Cần nhập số lượng'
            else if (!Number.isInteger(Number.parseInt(this.form.quantity)))
                this.errors.quantity = 'Cần nhập số nguyên'
        },
        validatePrice() {
            this.errors.price = ''
            if (!this.validateRequired(this.form.price))
                this.errors.price = 'Cần nhập nguyên giá'
            else if (!Number.isInteger(Number.parseInt(this.form.price)))
                this.errors.price = 'Cần nhập số nguyên'
        },
        validateUseDuration() {
            this.errors.useDuration = ''
            if (!this.validateRequired(this.form.useDuration))
                this.errors.useDuration = 'Cần nhập số năm sử dụng'
            else if (!Number.isInteger(Number.parseInt(this.form.useDuration)))
                this.errors.useDuration = 'Cần nhập số nguyên'
        },
        validateLooseRate() {
            this.errors.looseRate = ''
            if (!this.validateRequired(this.form.looseRate))
                this.errors.looseRate = 'Cần nhập tỷ lệ hao mòn'
        },
        validateLooseRateYear() {
            this.errors.looseRateYear = ''
            if (!this.validateRequired(this.form.looseRateYear))
                this.errors.looseRateYear = 'Cần nhập giá trị hao mòn năm'
        },
        validateRequired(value) {
            if (typeof value == 'string' && !value.trim() || value == null || value == undefined)
                return false
            return true
        }
    },
    components: { TextfieldForm, NumberForm, InputDate, MyButton, MyCombobox }
}
</script>

<style scoped>
.form {
    border-radius: var(--radius-border);
    overflow: hidden;
}

.form__top {
    background-color: #fff;
    padding: 20px 16px;
}

.form__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
}

.form__title {
    font-size: 18px;
    font-family: mMisa Font;
}

.form__body {
    display: flex;
    flex-wrap: wrap;
    align-items: start;
    width: 812px;
    column-gap: 16px;
    row-gap: 20px;
}

.form__body__item--1 {
    width: calc(calc(100% - 32px) / 3);
}

.form__body__item--2 {
    width: calc(calc(100% - calc(calc(100% - 32px) / 3) - 16px));
}

.form__bottom {
    background-color: #eee;
    height: 52px;
    display: flex;
    column-gap: 10px;
    padding: 0 16px;
    align-items: center;
    justify-content: flex-end;
}
</style>