<template>
    <div :class="{ isError: error }" class="number_form field__validate" types="required number">
        <label class="label" for="">
            <span class="field__validate__label">{{ label }}</span>
            <span v-if="required" class="label__required">*</span>
        </label>
        <div class="number_form__textfield">
            <label :for="uuid" class="number_form__input">
                <input :disabled="disable" @blur="handleBlur" @input="handleChange" :value="value" :id="uuid" type="text">
                <span class="number_form__value">{{ currrency ? valueCurrenCy : value }}</span>
            </label>
            <label :for="uuid" v-if="icon" class="number_form__control">
                <span @click="increase" class="number_form__button">
                    <div class="icon-up"></div>
                </span>
                <span @click="decrease" class="number_form__button">
                    <div class="icon-down"></div>
                </span>
            </label>
        </div>
        <span class="field__validate__error">{{ error }}</span>
    </div>
</template>

<script>
import { uuid } from 'vue-uuid';
export default {
    data() {
        return {
            uuid: uuid.v1(),
        }
    },
    computed: {
        /**
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: Computed chuyển đổi value của input về dạng tiền tệ vnđ, sử dụng global function toCurrency
         */
        valueCurrenCy() {
            const result = this.toCurrency(this.value)
            return result
        }
    },
    methods: {
        /**
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: khi blur mà value có dạng 9. thì chuyển về 9
         */
        handleBlur(event) {
            this.$emit('blur')
            if (this.step != 1) {
                let value = event.target.value
                if (value[value.length - 1] == '.') {
                    value = value.substring(0, value.length - 1)
                    event.target.value = value
                    this.handleChange(event)
                }
            }
        },
        /**
         * @param {Float} num 
         * @returns {number}
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: Hàm nhận giá trị số thực và trả về số làm tròn 2 chữ số sau dấu phẩy
         */
        rounded(num) {
            return this.step == 1 ? num : this.toRounded(num)
        },

        /**
         * 
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: Hàm sử lý sự kiện khi người dùng ấn nút giảm, giá trị input giảm đi 1 nếu chưa đạt giá trị min
         */
        decrease() {
            let temp = this.value || 0
            if (temp - 1 >= this.min)
                this.$emit('change', { name: this.name, value: this.rounded(Number.parseFloat(temp) - 1) })
        },

        /**
        * 
        * author: Nguyen Quoc Huy
        * created at: 30/04/2023
        * description: Hàm sử lý sự kiện khi người dùng ấn nút giảm, giá trị input tăng lên 1
        */
        increase() {
            let temp = this.value || 0
            this.$emit('change', { name: this.name, value: this.rounded(Number.parseFloat(temp) + 1) })
        },

        /**
       * 
       * author: Nguyen Quoc Huy
       * created at: 30/04/2023
       * @param {Event}
       * description: hàm sử lý sự kiện khi người dùng thay đổi giá trị input, emit giá trị của input lên component cha
       */
        handleChange(event) {
            // trong trường hợp input là số nguyên thì bỏ hết các kí tự khác ngoài số
            if (this.step == 1) {
                const regex = /\D/g;
                event.target.value = event.target.value.replace(regex, "")
            }
            // trong trường hợp input là số thực
            else {
                // xóa hết các kí tự ngoài số và dấu .
                const regex = /[^\d.]/g
                let value = event.target.value.replace(regex, '')
                // nếu chỉ value là '.' thì gán value = ''
                if (value.length == 1 && value[value.length - 1] == '.')
                    value = ''
                // kiểm tra nếu đã tồn tại dấu . thì không ấn được . nữa
                if (value && value.substring(0, value.length - 1).indexOf('.') != -1 && value[value.length - 1] == '.')
                    value = value.substring(0, value.length - 1)
                event.target.value = value
            }
            let value = event.target.value
            // nếu input là số thực thì chỉ lấy 2 số thập phân sau dấu .
            if (this.step != 1) {
                const valueArray = event.target.value.split('.')
                let [, decimal] = valueArray
                if (decimal?.length > 2) {
                    decimal = decimal.substring(0, 2)
                    value = valueArray[0] + '.' + decimal
                    event.target.value = value
                }

            }
            this.$emit('change', { name: this.name, value })
        },

    },

    props: {
        label: String,
        value: [String, Number],
        min: {
            type: [Number, String],
            default: '0'
        },
        error: {
            type: String,
            default: ""
        },
        name: {
            type: String,
            default: ''
        },
        icon: {
            type: Boolean,
            default: true
        },
        required: {
            type: Boolean,
            default: true
        },
        disable: {
            type: Boolean,
            default: false
        },
        currrency: {
            type: Boolean,
            default: false
        },
        step: {
            type: [Number, String],
            default: '1'
        }
    }
}
</script >

<style scoped>
.number_form__value {
    position: absolute;
    inset: 0;
    right: 20px;
    font-size: 13px;
    font-family: mMisa Font;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.number_form__textfield {
    height: 36px;
    outline: none;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-border);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    overflow: hidden;
    position: relative;
}

.number_form.isError .number_form__textfield {
    border-color: rgb(227, 42, 42);
}

.number_form__input {
    height: 100%;
    width: 100%;
    padding-right: 20px;
    position: relative;
}

.number_form__input input {
    width: 100%;
    height: 100%;
    text-align: right;
    border: none;
    outline: none;
    background-color: transparent;
    color: transparent;
    caret-color: black;
}

.number_form__input input::-webkit-inner-spin-button,
.number_form__input input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.number_form .number_form__input:has(input:disabled) {
    background-color: #efefef4d;
}

.number_form__control {
    display: flex;
    flex-direction: column;
    row-gap: 6px;
    padding-right: 12px;
    user-select: none;
}

.number_form__button {
    border: none;
    background-color: transparent;
    outline: none;
    transform: scale(1.1);
    cursor: pointer;
}
</style>