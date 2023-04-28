<template>
    <div class="number_form field__validate" types="required number">
        <label class="label" for="">
            <span class="field__validate__label">{{ label }}</span>
            <span v-if="required" class="label__required">*</span>
        </label>
        <div class="number_form__textfield">
            <input @blur="$emit('blur')" ref="input" @input="handleChange" :disabled="disable" class="number_form__input"
                :value="currrency ? valueCurrenCy : value" type="text">
            <div v-if="icon" class="number_form__control">
                <span @click="increase" class="number_form__button">
                    <div class="icon-up"></div>
                </span>
                <span @click="decrease" class="number_form__button">
                    <div class="icon-down"></div>
                </span>
            </div>
        </div>
        <span class="field__validate__error">{{ error }}</span>
    </div>
</template>

<script>
export default {
    computed: {
        valueCurrenCy() {
            if (Number.parseInt(this.value)) {
                return Number.parseInt(this.value).toLocaleString('vi-VN')
            }
            return this.value
        }
    },
    methods: {
        decrease() {
            if (this.value - 1 >= this.min) {
                this.$emit('change', { name: this.name, value: Number.parseFloat(this.value.toString().replace(',', '.')) - 1 })
            }
        },
        increase() {
            this.$emit('change', { name: this.name, value: Number.parseFloat(this.value.toString().replace(',', '.')) + 1 })
        },
        handleChange(event) {
            let regex = this.float ? /[^0-9,]/g : /\D/g
            if (event.target.value)
                this.$refs.input.value = event.target.value.slice(0, event.target.value.length - 1) + event.target.value[event.target.value.length - 1].replace(regex, '')
            this.$emit('change', { name: this.name, value: event.target.value.replace(regex, '') })
        }
    },
    props: {
        label: String,
        value: [String, Number],
        min: String,
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
        float: {
            type: Boolean,
            default: false
        },
        disable: {
            type: Boolean,
            default: false
        },
        currrency: {
            type: Boolean,
            default: false
        }
    }
}
</script >

<style scoped>
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

.number_form[data-error] .number_form__textfield {
    border-color: rgba(255, 0, 0, 0.673);
}

.number_form__input {
    border: none;
    outline: none;
    text-align: right;
    height: 100%;
    width: 100%;
    padding-right: 20px;
    background-color: #fff;
}

.number_form .number_form__input:disabled {
    background-color: #efefef4d;
}

.number_form__control {
    display: flex;
    flex-direction: column;
    row-gap: 6px;
    padding-right: 6px;
}

.number_form__button {
    border: none;
    background-color: transparent;
    outline: none;
    transform: scale(1.1);
    cursor: pointer;
}
</style>