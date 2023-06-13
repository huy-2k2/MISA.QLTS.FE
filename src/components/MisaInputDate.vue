<template>
    <div :class="{ isError: error }" class="input_date field__validate" types="required date">
        <label class="label" for="">
            <span class="field__validate__label">{{ label }}</span>
            <span class="label__required">*</span>
        </label>
        <div class="input_date__textfield">
            <div class="input_date__value"></div>
            <input v-model="value" class="input_date__input" type="date">
        </div>
        <span v-html="error" class="field__validate__error"></span>
    </div>
</template>

<script>
export default {
    props: {
        label: String,
        required: {
            type: Boolean,
            default: false
        },
        modelValue: {

        },
        error: {
            type: String,
            default: ''
        }
    },
    computed: {
        value: {
            get() {
                return this.modelValue
            },
            set(value) {
                this.$emit('update:modelValue', value)
                this.$emit('blurdate')
            }
        }
    }
}
</script>

<style scoped>
.input_date__textfield {
    height: 36px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-border);
    overflow: hidden;
    position: relative;
}

.input_date.isError .input_date__textfield {
    border-color: rgb(227, 42, 42);
}

.input_date__input {
    border: none;
    background-color: none;
    width: 100%;
    height: 100%;
    padding-left: 12px;
    font-family: mMisa Font;
    font-weight: 400;
    outline: none;
}

.input_date__input::-webkit-calendar-picker-indicator {
    background: url('../assets/icon/qlts-icon.svg') no-repeat -287px -67px;
    width: 18px;
    height: 18px;
    opacity: 1;
    cursor: pointer;
    display: block;
    padding-left: 12px;

}

.input_date__value {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
    left: 12px;
    font-family: mMisa Font;
    font-weight: 400;
}
</style>